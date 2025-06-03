// Breathing Exercise
// Enhanced Breathing Exercise for Anxiety
function startBreathing() {
    const circle = document.getElementById('breathingCircle');
    const instructions = document.getElementById('breathingInstructions');
    let phase = 'inhale';

    function updateBreathing() {
        if (phase === 'inhale') {
            circle.classList.add('inhale');
            instructions.textContent = 'Inhale deeply for 4 seconds...';
            phase = 'hold';
            setTimeout(updateBreathing, 4000);
        } else if (phase === 'hold') {
            instructions.textContent = 'Hold your breath for 7 seconds...';
            phase = 'exhale';
            setTimeout(updateBreathing, 7000);
        } else {
            circle.classList.remove('inhale');
            instructions.textContent = 'Exhale slowly for 8 seconds...';
            phase = 'inhale';
            setTimeout(updateBreathing, 8000);
        }
    }

    updateBreathing();
}

// CBT Thought Challenging Tool
function saveThoughtChallenge() {
    const negative = document.getElementById('negativeThought').value;
    const distortion = document.getElementById('distortionType').value;
    const evidence = document.getElementById('evidence').value;
    const balanced = document.getElementById('balancedThought').value;
    const date = new Date().toLocaleDateString();
    
    if (!negative || !distortion || !evidence || !balanced) {
        alert('Please complete all fields of the thought challenge');
        return;
    }
    
    const distortionText = document.getElementById('distortionType').options[document.getElementById('distortionType').selectedIndex].text;
    
    const challengeHtml = `<div class="card mb-2">
        <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
            <p class="mb-1"><strong>Negative thought:</strong> ${negative}</p>
            <p class="mb-1"><strong>Thinking error:</strong> ${distortionText}</p>
            <p class="mb-1"><strong>Evidence:</strong> ${evidence}</p>
            <p class="mb-1"><strong>Balanced perspective:</strong> ${balanced}</p>
        </div>
    </div>`;
    
    document.getElementById('challengeHistory').insertAdjacentHTML('afterbegin', challengeHtml);
    
    // Reset form
    document.getElementById('negativeThought').value = '';
    document.getElementById('distortionType').value = '';
    document.getElementById('evidence').value = '';
    document.getElementById('balancedThought').value = '';
}

// Guided Meditation Player
let meditationTimer;

function playMeditation(type) {
    const player = document.getElementById('meditationPlayer');
    const title = document.getElementById('meditationTitle');
    const progress = document.getElementById('meditationProgress');
    
    // Clear any existing meditation
    if (meditationTimer) {
        clearInterval(meditationTimer);
    }
    
    // Show player
    player.classList.remove('d-none');
    
    // Set meditation details based on type
    let duration = 0;
    switch(type) {
        case 'exam':
            title.textContent = 'Exam Preparation Calm';
            duration = 300; // 5 minutes in seconds
            break;
        case 'sleep':
            title.textContent = 'Student Sleep Aid';
            duration = 600; // 10 minutes in seconds
            break;
        case 'morning':
            title.textContent = 'Morning Motivation';
            duration = 180; // 3 minutes in seconds
            break;
    }
    
    // Simulate meditation progress
    let elapsed = 0;
    progress.style.width = '0%';
    
    meditationTimer = setInterval(() => {
        elapsed++;
        const percent = (elapsed / duration) * 100;
        progress.style.width = `${percent}%`;
        
        if (elapsed >= duration) {
            clearInterval(meditationTimer);
            alert('Meditation complete!');
            player.classList.add('d-none');
        }
    }, 1000);
    
    // Set up control buttons
    document.getElementById('pauseMeditation').addEventListener('click', () => {
        clearInterval(meditationTimer);
    });
    
    document.getElementById('stopMeditation').addEventListener('click', () => {
        clearInterval(meditationTimer);
        player.classList.add('d-none');
    });
}

// View Mood Patterns
// View Mood Patterns
document.getElementById('viewMoodPatterns').addEventListener('click', function() {
    // Get all mood entries
    const moodEntries = document.getElementById('moodHistory').children;
    
    if (moodEntries.length === 0) {
        alert('No mood entries yet. Add some entries to see patterns and quotes.');
        return;
    }
    
    // For debugging - check what entries exist
    console.log('Found ' + moodEntries.length + ' mood entries');
    
    // Create a summary with different quotes for each mood type
    let summary = 'Your Mood Summary:\n\n';
    
    // Always show at least one quote regardless of entries
    const currentMood = document.getElementById('moodSelect').value;
    summary += `Current mood (${currentMood}): ${getRandomQuote(currentMood)}\n\n`;
    
    // Add quotes for other moods
    const otherMoods = ['great', 'good', 'okay', 'low', 'bad'].filter(mood => mood !== currentMood);
    
    // Add 1-2 random quotes from other moods
    const randomMood1 = otherMoods[Math.floor(Math.random() * otherMoods.length)];
    summary += `${randomMood1.charAt(0).toUpperCase() + randomMood1.slice(1)} days: ${getRandomQuote(randomMood1)}\n\n`;
    
    // Randomly add one more quote
    if (Math.random() > 0.5) {
        const remainingMoods = otherMoods.filter(mood => mood !== randomMood1);
        const randomMood2 = remainingMoods[Math.floor(Math.random() * remainingMoods.length)];
        summary += `${randomMood2.charAt(0).toUpperCase() + randomMood2.slice(1)} days: ${getRandomQuote(randomMood2)}\n\n`;
    }
    
    // Add general information about patterns
    summary += '\nIn a full implementation, this feature would display charts showing correlations between your mood and academic events.';
    
    // Show the summary with different quotes
    alert(summary);
});

// Focus Timer
let timerInterval;
let timeLeft;

document.getElementById('startTimer').addEventListener('click', function() {
    if (!timerInterval) {
        timeLeft = parseInt(document.getElementById('timerDuration').value);
        startTimer();
    }
});

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert('Time is up!');
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timerDisplay').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

document.getElementById('pauseTimer').addEventListener('click', function() {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById('resetTimer').addEventListener('click', function() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = parseInt(document.getElementById('timerDuration').value);
    updateTimerDisplay();
});

// Mood quotes for different feelings
const moodQuotes = {
    great: [
        "Your positive energy is contagious! Keep excelling in your studies.",
        "Success comes to those who maintain a great attitude. You're on the right track!",
        "Your hard work is paying off! Celebrate your achievements today.",
        "A positive mindset leads to positive outcomes. Keep up the great work!",
        "You're thriving! Remember this feeling during challenging times."
    ],
    good: [
        "Good days build great futures. Keep moving forward!",
        "A good mood is a perfect foundation for productive study sessions.",
        "You're doing well! Small steps lead to big achievements.",
        "Steady progress is sustainable progress. You're on the right path.",
        "Good vibes lead to good results. Keep nurturing your positive outlook."
    ],
    okay: [
        "Every day doesn't have to be amazing - consistency is key to success.",
        "Neutral days are perfect for reflection and planning your next steps.",
        "Balance is important. Use this steady energy for focused work.",
        "Sometimes 'okay' is exactly where you need to be. Trust the process.",
        "Middle ground is stable ground. Use this stability to build momentum."
    ],
    low: [
        "Even on low days, you're still moving forward. That's what counts.",
        "It's okay to feel down. Take care of yourself today and plan for tomorrow.",
        "Low tides always rise again. This feeling is temporary.",
        "Small steps are still progress. Be kind to yourself today.",
        "Your resilience during difficult times defines your character. You've got this."
    ],
    bad: [
        "Bad days are just data points, not definitions. Tomorrow is a new opportunity.",
        "It's okay to not be okay. Reach out to someone you trust today.",
        "This difficult moment will pass. Focus on one small thing you can control.",
        "Your feelings are valid. Remember that you've overcome difficult days before.",
        "Sometimes the best academic strategy is rest and self-care. Give yourself permission to reset."
    ]
};

// Function to get a random quote based on mood
function getRandomQuote(mood) {
    const quotes = moodQuotes[mood];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Then replace the existing Mood Journal event listener with this:

// Mood Journal
document.getElementById('moodJournalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const mood = document.getElementById('moodSelect').value;
    const note = document.getElementById('moodNote').value;
    const date = new Date().toLocaleDateString();
    
    // Get a motivational quote based on the selected mood
    const quote = getRandomQuote(mood);
    
    const entry = `<div class="card mb-2">
        <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
            <p class="card-text">Mood: ${mood}<br>${note}</p>
            <div class="mt-2 p-2 bg-light rounded">
                <p class="card-text small fst-italic mb-0"><i class="fas fa-quote-left me-1 text-muted"></i> ${quote} <i class="fas fa-quote-right ms-1 text-muted"></i></p>
            </div>
        </div>
    </div>`;
    
    document.getElementById('moodHistory').insertAdjacentHTML('afterbegin', entry);
    this.reset();
});

// Gratitude Journal
document.getElementById('gratitudeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const entry = document.getElementById('gratitudeEntry').value;
    const date = new Date().toLocaleDateString();
    
    const gratitudeHtml = `<div class="card mb-2">
        <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
            <p class="card-text">${entry}</p>
        </div>
    </div>`;
    
    document.getElementById('gratitudeList').insertAdjacentHTML('afterbegin', gratitudeHtml);
    this.reset();
});

// Self-Care Checklist
function resetChecklist() {
    const checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}

// Save data to localStorage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Load data from localStorage
function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load saved data
    const savedMoods = loadFromLocalStorage('moodJournal');
    if (savedMoods) {
        document.getElementById('moodHistory').innerHTML = savedMoods;
    }
    
    const savedGratitude = loadFromLocalStorage('gratitudeJournal');
    if (savedGratitude) {
        document.getElementById('gratitudeList').innerHTML = savedGratitude;
    }
});