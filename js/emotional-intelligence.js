// Emotional Intelligence Builder - Main functionality

// Store selected emotions and their data
let selectedEmotions = [];
let emotionData = {
    lastEntry: null,
    entries: []
};

// Initialize the component when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load saved emotion data from localStorage
    loadEmotionData();
    
    // Set up emotion buttons
    setupEmotionButtons();
    
    // Set up save button
    const saveButton = document.getElementById('save-emotion');
    if (saveButton) {
        saveButton.addEventListener('click', saveEmotionEntry);
    }
    
    // Set up active buttons for emotion selection
    setupActiveButtons();
});

// Set up emotion buttons with click handlers
function setupEmotionButtons() {
    const emotionButtons = document.querySelectorAll('.emotion-btn');
    
    emotionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const emotion = this.getAttribute('data-emotion');
            
            // Toggle selection
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.classList.remove('btn-primary');
                this.classList.add('btn-outline-primary');
                
                // Remove from selected emotions
                selectedEmotions = selectedEmotions.filter(e => e !== emotion);
            } else {
                this.classList.add('active');
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary');
                
                // Add to selected emotions
                selectedEmotions.push(emotion);
            }
        });
    });
}

// Set up active buttons for other interactive elements
function setupActiveButtons() {
    // For physical sensation checkboxes
    const sensationCheckboxes = document.querySelectorAll('input[id^="sensation-"]');
    sensationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.classList.add('fw-bold');
            } else {
                label.classList.remove('fw-bold');
            }
        });
    });
}

// Save the current emotion entry
function saveEmotionEntry() {
    // Validate that at least one emotion is selected
    if (selectedEmotions.length === 0) {
        showAlert('Please select at least one emotion', 'warning');
        return;
    }
    
    // Get form values
    const intensity = document.getElementById('emotion-intensity').value;
    const trigger = document.getElementById('emotion-trigger').value;
    const strategy = document.getElementById('response-strategy').value;
    
    // Get selected physical sensations
    const sensations = [];
    document.querySelectorAll('input[id^="sensation-"]:checked').forEach(checkbox => {
        sensations.push(checkbox.nextElementSibling.textContent);
    });
    
    // Create entry object
    const entry = {
        date: new Date(),
        emotions: selectedEmotions,
        intensity: intensity,
        trigger: trigger,
        sensations: sensations,
        strategy: strategy
    };
    
    // Add to entries array
    emotionData.entries.push(entry);
    emotionData.lastEntry = entry;
    
    // Save to localStorage
    saveEmotionData();
    
    // Generate and display insights
    generateInsights();
    
    // Reset form
    resetForm();
    
    // Show success message
    showAlert('Your emotional intelligence entry has been saved!', 'success');
}

// Generate insights based on emotion data
function generateInsights() {
    const insightsContainer = document.getElementById('ei-insights');
    if (!insightsContainer) return;
    
    // Clear previous insights
    insightsContainer.innerHTML = '';
    
    if (emotionData.entries.length === 0) {
        insightsContainer.innerHTML = '<span class="text-muted">Complete your first entry to receive personalized insights</span>';
        return;
    }
    
    // Get most recent entry
    const latestEntry = emotionData.entries[emotionData.entries.length - 1];
    
    // Create insights HTML
    let insightsHtml = '';
    
    // Primary emotion insight
    if (latestEntry.emotions.length > 0) {
        const primaryEmotion = latestEntry.emotions[0];
        insightsHtml += `<p class="mb-2"><strong>Primary emotion:</strong> ${primaryEmotion}</p>`;
        
        // Add emotion-specific insight
        insightsHtml += `<p class="mb-3">${getEmotionInsight(primaryEmotion)}</p>`;
    }
    
    // Strategy recommendation
    insightsHtml += `<p class="mb-2"><strong>Recommended practice:</strong> ${getStrategyRecommendation(latestEntry.strategy)}</p>`;
    
    // Pattern recognition (if multiple entries exist)
    if (emotionData.entries.length > 1) {
        insightsHtml += `<p class="mb-2"><strong>Pattern observed:</strong> ${getPatternInsight()}</p>`;
    }
    
    // Add a growth tip
    insightsHtml += `<div class="alert alert-info mt-3 mb-0 py-2 small">
        <i class="fas fa-lightbulb me-2"></i><strong>Growth tip:</strong> ${getGrowthTip()}
    </div>`;
    
    // Update insights container
    insightsContainer.innerHTML = insightsHtml;
}

// Get insight based on emotion
function getEmotionInsight(emotion) {
    const insights = {
        joy: "Joy can enhance learning and creativity. Try to identify what activities bring you joy and incorporate them into your study routine.",
        sadness: "Sadness often signals a need for reflection or rest. Consider what might need your attention or what loss you may be processing.",
        fear: "Fear is your brain's way of protecting you. Break down what's causing your fear into smaller, manageable steps.",
        anger: "Anger often masks other emotions like hurt or fear. Try to identify what boundary might have been crossed.",
        disgust: "Disgust can be a strong moral or physical reaction. Consider what values this emotion might be protecting.",
        surprise: "Surprise indicates something unexpected. This can be an opportunity to reassess your expectations and adapt.",
        anticipation: "Anticipation can be channeled into productive planning. Use this energy to prepare effectively.",
        trust: "Trust in yourself and others is foundational for wellbeing. Nurture relationships where this emotion is present.",
        anxiety: "Anxiety is often about future uncertainties. Breaking tasks into smaller steps can help manage this feeling.",
        overwhelm: "Feeling overwhelmed is a sign to prioritize and possibly eliminate non-essential tasks.",
        pride: "Pride in your accomplishments builds confidence. Acknowledge your strengths and achievements.",
        shame: "Shame often involves feeling inadequate. Remember that making mistakes is part of being human and learning."
    };
    
    return insights[emotion] || "Recognizing and naming your emotions is the first step toward emotional intelligence.";
}

// Get recommendation based on selected strategy
function getStrategyRecommendation(strategy) {
    const recommendations = {
        breathe: "Practice 4-7-8 breathing: Inhale for 4 seconds, hold for 7, exhale for 8. Repeat 3-5 times when emotions are intense.",
        reframe: "Challenge negative thoughts by asking: 'What evidence supports this? Is there another way to view this situation?'",
        express: "Find a healthy outlet for expression such as journaling, talking with a trusted friend, or creative activities.",
        distract: "Engage in a positive activity that requires focus, like exercise, reading, or a hobby, to give your mind a break.",
        support: "Reach out to someone you trust or consider professional support if emotions feel overwhelming."
    };
    
    return recommendations[strategy] || "Select a response strategy to receive personalized recommendations.";
}

// Generate pattern insight based on emotion history
function getPatternInsight() {
    // This would be more sophisticated with more data analysis
    // For now, we'll provide a simple insight
    const entries = emotionData.entries;
    const recentEmotions = entries.slice(-3).flatMap(entry => entry.emotions);
    
    // Count emotion frequencies
    const emotionCounts = {};
    recentEmotions.forEach(emotion => {
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
    });
    
    // Find most frequent emotion
    let mostFrequent = '';
    let highestCount = 0;
    
    for (const emotion in emotionCounts) {
        if (emotionCounts[emotion] > highestCount) {
            mostFrequent = emotion;
            highestCount = emotionCounts[emotion];
        }
    }
    
    if (mostFrequent && highestCount > 1) {
        return `You've experienced ${mostFrequent} frequently in your recent entries. This may be an area to explore further.`;
    } else {
        return "Your emotional experiences have been varied. Continue tracking to identify patterns.";
    }
}

// Get a random growth tip
function getGrowthTip() {
    const tips = [
        "Regular emotional check-ins can improve your academic performance by helping you manage stress more effectively.",
        "Research shows that naming emotions reduces their intensity in the brain's amygdala.",
        "Try the 90-second rule: Allow yourself to feel an emotion fully for 90 seconds before deciding how to respond.",
        "Emotional intelligence is a stronger predictor of academic success than IQ alone.",
        "Practice self-compassion when experiencing difficult emotions - treat yourself as you would a good friend.",
        "The ability to identify and manage emotions improves decision-making and problem-solving skills."
    ];
    
    return tips[Math.floor(Math.random() * tips.length)];
}

// Reset the form after submission
function resetForm() {
    // Reset selected emotions
    selectedEmotions = [];
    
    // Reset emotion buttons
    document.querySelectorAll('.emotion-btn').forEach(button => {
        button.classList.remove('active');
        button.classList.remove('btn-primary');
        button.classList.add('btn-outline-primary');
    });
    
    // Reset form fields
    document.getElementById('emotion-intensity').value = 3; // Middle value
    document.getElementById('emotion-trigger').value = '';
    document.getElementById('response-strategy').value = '';
    
    // Reset checkboxes
    document.querySelectorAll('input[id^="sensation-"]').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.nextElementSibling.classList.remove('fw-bold');
    });
}

// Show alert message
function showAlert(message, type = 'info') {
    // Create alert element
    const alertEl = document.createElement('div');
    alertEl.className = `alert alert-${type} alert-dismissible fade show`;
    alertEl.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Find a good place to show the alert
    const container = document.querySelector('.ei-card .card-body');
    if (container) {
        container.insertBefore(alertEl, container.firstChild);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            alertEl.classList.remove('show');
            setTimeout(() => alertEl.remove(), 150);
        }, 5000);
    }
}

// Save emotion data to localStorage
function saveEmotionData() {
    localStorage.setItem('emotionData', JSON.stringify(emotionData));
}

// Load emotion data from localStorage
function loadEmotionData() {
    const savedData = localStorage.getItem('emotionData');
    if (savedData) {
        emotionData = JSON.parse(savedData);
        
        // Convert date strings back to Date objects
        emotionData.entries.forEach(entry => {
            entry.date = new Date(entry.date);
        });
        
        if (emotionData.lastEntry) {
            emotionData.lastEntry.date = new Date(emotionData.lastEntry.date);
        }
        
        // Generate insights if we have data
        if (emotionData.entries.length > 0) {
            generateInsights();
        }
    }
}