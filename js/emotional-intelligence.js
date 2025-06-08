// Simplified Mood Tracker - Main functionality

// Store selected emotion and data
let selectedEmotion = null;
let moodData = {
    entries: []
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadMoodData();
    setupEmotionButtons();
    setupSaveButton();
    showRandomTip();
});

// Set up emotion buttons with click handlers
function setupEmotionButtons() {
    const emotionButtons = document.querySelectorAll('.emotion-btn');
    
    emotionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active state from all buttons
            emotionButtons.forEach(btn => {
                btn.classList.remove('active', 'btn-primary');
                btn.classList.add('btn-outline-primary');
            });
            
            // Add active state to clicked button
            this.classList.add('active', 'btn-primary');
            this.classList.remove('btn-outline-primary');
            
            // Store selected emotion
            selectedEmotion = this.getAttribute('data-emotion');
        });
    });
}

// Set up save button
function setupSaveButton() {
    const saveButton = document.getElementById('save-emotion');
    if (saveButton) {
        saveButton.addEventListener('click', saveMoodEntry);
    }
}

// Save the current mood entry
function saveMoodEntry() {
    // Validate that an emotion is selected
    if (!selectedEmotion) {
        showAlert('Please select how you\'re feeling first! 😊', 'warning');
        return;
    }
    
    // Get form values
    const intensity = document.getElementById('emotion-intensity').value;
    const note = document.getElementById('emotion-note').value.trim();
    
    // Create entry object
    const entry = {
        date: new Date(),
        emotion: selectedEmotion,
        intensity: parseInt(intensity),
        note: note || 'No additional notes',
        timestamp: Date.now()
    };
    
    // Add to entries array
    moodData.entries.push(entry);
    
    // Keep only last 50 entries to prevent storage bloat
    if (moodData.entries.length > 50) {
        moodData.entries = moodData.entries.slice(-50);
    }
    
    // Save to localStorage
    saveMoodData();
    
    // Show personalized insight
    showPersonalizedInsight(entry);
    
    // Reset form
    resetForm();
    
    // Show success message
    showAlert('Mood saved! Keep tracking to see patterns. 📊', 'success');
}

// Show personalized insight based on the entry
function showPersonalizedInsight(entry) {
    const insightsContainer = document.getElementById('ei-insights');
    if (!insightsContainer) return;
    
    const insight = getEmotionInsight(entry.emotion);
    const pattern = getSimplePattern();
    
    insightsContainer.innerHTML = `
        <div class="mb-2">
            <strong>💡 Insight:</strong> ${insight}
        </div>
        ${pattern ? `<div class="small text-muted">${pattern}</div>` : ''}
    `;
}

// Get insight based on emotion
function getEmotionInsight(emotion) {
    const insights = {
        happy: "Great! Happiness boosts creativity and learning. Try to remember what made you feel this way.",
        sad: "It's okay to feel sad sometimes. Consider talking to someone or doing something that comforts you.",
        anxious: "Anxiety is common among students. Try deep breathing or breaking big tasks into smaller steps.",
        angry: "Anger often signals that something important to you has been affected. Take a moment to cool down.",
        excited: "Excitement is wonderful energy! Channel it into your goals and projects.",
        tired: "Rest is important for mental health. Make sure you're getting enough sleep and taking breaks."
    };
    
    return insights[emotion] || "Every emotion is valid. Acknowledging how you feel is the first step to emotional awareness.";
}

// Get simple pattern insight
function getSimplePattern() {
    if (moodData.entries.length < 3) return null;
    
    const recent = moodData.entries.slice(-5);
    const emotionCounts = {};
    
    recent.forEach(entry => {
        emotionCounts[entry.emotion] = (emotionCounts[entry.emotion] || 0) + 1;
    });
    
    const mostCommon = Object.keys(emotionCounts).reduce((a, b) => 
        emotionCounts[a] > emotionCounts[b] ? a : b
    );
    
    if (emotionCounts[mostCommon] > 1) {
        return `📈 Pattern: You've been feeling ${mostCommon} frequently lately.`;
    }
    
    return null;
}

// Show random tip on page load
function showRandomTip() {
    const tips = [
        "Track your mood daily to identify patterns! 📅",
        "Remember: all emotions are temporary and valid. 🌈",
        "Taking breaks can improve your mood and focus. ⏰",
        "Talking to friends or family can help process emotions. 💬",
        "Physical activity is a great mood booster! 🏃‍♂️",
        "Mindful breathing can help manage intense emotions. 🧘‍♀️"
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    const insightsContainer = document.getElementById('ei-insights');
    
    if (insightsContainer && moodData.entries.length === 0) {
        insightsContainer.innerHTML = `<span class="text-muted">${randomTip}</span>`;
    }
}

// Reset the form after submission
function resetForm() {
    // Reset selected emotion
    selectedEmotion = null;
    
    // Reset emotion buttons
    document.querySelectorAll('.emotion-btn').forEach(button => {
        button.classList.remove('active', 'btn-primary');
        button.classList.add('btn-outline-primary');
    });
    
    // Reset form fields
    document.getElementById('emotion-intensity').value = 3;
    const noteField = document.getElementById('emotion-note');
    if (noteField) noteField.value = '';
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
    
    // Find container and insert alert
    const container = document.querySelector('.ei-card .card-body');
    if (container) {
        container.insertBefore(alertEl, container.firstChild);
        
        // Auto-dismiss after 4 seconds
        setTimeout(() => {
            if (alertEl.parentNode) {
                alertEl.classList.remove('show');
                setTimeout(() => {
                    if (alertEl.parentNode) alertEl.remove();
                }, 150);
            }
        }, 4000);
    }
}

// Save mood data to localStorage
function saveMoodData() {
    try {
        localStorage.setItem('simpleMoodData', JSON.stringify(moodData));
    } catch (error) {
        console.warn('Could not save mood data to localStorage:', error);
    }
}

// Load mood data from localStorage
function loadMoodData() {
    try {
        const savedData = localStorage.getItem('simpleMoodData');
        if (savedData) {
            moodData = JSON.parse(savedData);
            
            // Convert date strings back to Date objects
            moodData.entries.forEach(entry => {
                entry.date = new Date(entry.date);
            });
            
            // Show insight if we have data
            if (moodData.entries.length > 0) {
                const lastEntry = moodData.entries[moodData.entries.length - 1];
                showPersonalizedInsight(lastEntry);
            }
        }
    } catch (error) {
        console.warn('Could not load mood data from localStorage:', error);
        moodData = { entries: [] };
    }
}