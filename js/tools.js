// Breathing Exercise
function startBreathing() {
    const circle = document.getElementById('breathingCircle');
    const instructions = document.getElementById('breathingInstructions');
    let phase = 'inhale';

    function updateBreathing() {
        if (phase === 'inhale') {
            circle.classList.add('inhale');
            instructions.textContent = 'Inhale...';
            phase = 'hold';
            setTimeout(updateBreathing, 4000);
        } else if (phase === 'hold') {
            instructions.textContent = 'Hold...';
            phase = 'exhale';
            setTimeout(updateBreathing, 7000);
        } else {
            circle.classList.remove('inhale');
            instructions.textContent = 'Exhale...';
            phase = 'inhale';
            setTimeout(updateBreathing, 8000);
        }
    }

    updateBreathing();
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

// Mood Journal
document.getElementById('moodJournalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const mood = document.getElementById('moodSelect').value;
    const note = document.getElementById('moodNote').value;
    const date = new Date().toLocaleDateString();
    
    const entry = `<div class="card mb-2">
        <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
            <p class="card-text">Mood: ${mood}<br>${note}</p>
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