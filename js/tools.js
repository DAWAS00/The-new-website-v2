// Breathing Exercise
// Enhanced Breathing Exercise for Anxiety
let breathingTimeoutId = null; // Store the timeout ID

function startBreathing() {
    const circle = document.getElementById('breathingCircle');
    const instructions = document.getElementById('breathingInstructions');
    let phase = 'inhale';
    
    // Clear any existing timeout
    if (breathingTimeoutId) {
        clearTimeout(breathingTimeoutId);
    }

    function updateBreathing() {
        if (phase === 'inhale') {
            circle.classList.add('inhale');
            instructions.textContent = 'Inhale deeply for 4 seconds...';
            phase = 'hold';
            breathingTimeoutId = setTimeout(updateBreathing, 4000);
        } else if (phase === 'hold') {
            instructions.textContent = 'Hold your breath for 7 seconds...';
            phase = 'exhale';
            breathingTimeoutId = setTimeout(updateBreathing, 7000);
        } else {
            circle.classList.remove('inhale');
            instructions.textContent = 'Exhale slowly for 8 seconds...';
            phase = 'inhale';
            breathingTimeoutId = setTimeout(updateBreathing, 8000);
        }
    }

    updateBreathing();
}

function stopBreathing() {
    if (breathingTimeoutId) {
        clearTimeout(breathingTimeoutId);
        breathingTimeoutId = null;
        
        // Reset the UI
        const circle = document.getElementById('breathingCircle');
        const instructions = document.getElementById('breathingInstructions');
        
        circle.classList.remove('inhale');
        instructions.textContent = 'This 4-7-8 breathing technique is proven to reduce test anxiety';
    }
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

