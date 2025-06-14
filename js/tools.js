// Simple variables for timers
let breathingTimer = null;
let meditationTimer = null;
let focusTimer = null;
let timeLeft = 0;

// Breathing Exercise - Very Simple
function startBreathing() {
    const circle = document.getElementById('breathingCircle');
    const instructions = document.getElementById('breathingInstructions');
    let step = 0;
    
    function breathingCycle() {
        if (step === 0) {
            instructions.textContent = 'Inhale deeply for 4 seconds...';
            circle.classList.add('inhale');
            breathingTimer = setTimeout(breathingCycle, 4000);
        } else if (step === 1) {
            instructions.textContent = 'Hold your breath for 7 seconds...';
            breathingTimer = setTimeout(breathingCycle, 7000);
        } else if (step === 2) {
            instructions.textContent = 'Exhale slowly for 8 seconds...';
            circle.classList.remove('inhale');
            breathingTimer = setTimeout(breathingCycle, 8000);
        }
        step = (step + 1) % 3;
    }
    
    if (breathingTimer) {
        clearTimeout(breathingTimer);
    }
    breathingCycle();
}

function stopBreathing() {
    if (breathingTimer) {
        clearTimeout(breathingTimer);
        breathingTimer = null;
    }
    document.getElementById('breathingCircle').classList.remove('inhale');
    document.getElementById('breathingInstructions').textContent = 'This 4-7-8 breathing technique is proven to reduce test anxiety';
}

// CBT Thought Challenging - Very Simple
function saveThoughtChallenge() {
    const negative = document.getElementById('negativeThought').value;
    const distortion = document.getElementById('distortionType').value;
    const evidence = document.getElementById('evidence').value;
    const balanced = document.getElementById('balancedThought').value;
    
    if (!negative || !distortion || !evidence || !balanced) {
        alert('Please complete all fields');
        return;
    }
    
    const distortionSelect = document.getElementById('distortionType');
    const distortionText = distortionSelect.options[distortionSelect.selectedIndex].text;
    const today = new Date().toLocaleDateString();
    
    const historyDiv = document.getElementById('challengeHistory');
    const newEntry = document.createElement('div');
    newEntry.className = 'card mb-2';
    newEntry.innerHTML = `
        <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">${today}</h6>
            <p class="mb-1"><strong>Negative thought:</strong> ${negative}</p>
            <p class="mb-1"><strong>Thinking error:</strong> ${distortionText}</p>
            <p class="mb-1"><strong>Evidence:</strong> ${evidence}</p>
            <p class="mb-1"><strong>Balanced perspective:</strong> ${balanced}</p>
        </div>
    `;
    historyDiv.insertBefore(newEntry, historyDiv.firstChild);
    
    // Clear form
    document.getElementById('negativeThought').value = '';
    document.getElementById('distortionType').value = '';
    document.getElementById('evidence').value = '';
    document.getElementById('balancedThought').value = '';
}

// Meditation Player - Very Simple
function playMeditation(type) {
    let duration = 0;
    let title = '';
    
    if (type === 'exam') {
        duration = 300;
        title = 'Exam Preparation Calm';
    } else if (type === 'sleep') {
        duration = 600;
        title = 'Student Sleep Aid';
    } else if (type === 'morning') {
        duration = 180;
        title = 'Morning Motivation';
    }
    
    const player = document.getElementById('meditationPlayer');
    const progress = document.getElementById('meditationProgress');
    const titleElement = document.getElementById('meditationTitle');
    
    if (meditationTimer) {
        clearInterval(meditationTimer);
    }
    
    titleElement.textContent = title;
    player.classList.remove('d-none');
    
    let elapsed = 0;
    meditationTimer = setInterval(function() {
        elapsed = elapsed + 1;
        const percentage = (elapsed / duration) * 100;
        progress.style.width = percentage + '%';
        
        if (elapsed >= duration) {
            clearInterval(meditationTimer);
            alert('Meditation complete!');
            player.classList.add('d-none');
        }
    }, 1000);
}

// Focus Timer - Very Simple
function startTimer() {
    if (focusTimer) {
        return;
    }
    
    const durationInput = document.getElementById('timerDuration');
    timeLeft = parseInt(durationInput.value);
    
    focusTimer = setInterval(function() {
        timeLeft = timeLeft - 1;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(focusTimer);
            focusTimer = null;
            alert('Time is up!');
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    let minutesText = minutes.toString();
    let secondsText = seconds.toString();
    
    if (minutes < 10) {
        minutesText = '0' + minutesText;
    }
    if (seconds < 10) {
        secondsText = '0' + secondsText;
    }
    
    const display = document.getElementById('timerDisplay');
    display.textContent = minutesText + ':' + secondsText;
}

function pauseTimer() {
    if (focusTimer) {
        clearInterval(focusTimer);
        focusTimer = null;
    }
}

function resetTimer() {
    pauseTimer();
    const durationInput = document.getElementById('timerDuration');
    timeLeft = parseInt(durationInput.value);
    updateTimerDisplay();
}

// Simple Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Timer buttons
    const startBtn = document.getElementById('startTimer');
    if (startBtn) {
        startBtn.addEventListener('click', startTimer);
    }
    
    const pauseBtn = document.getElementById('pauseTimer');
    if (pauseBtn) {
        pauseBtn.addEventListener('click', pauseTimer);
    }
    
    const resetBtn = document.getElementById('resetTimer');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetTimer);
    }
    
    // Meditation buttons
    const pauseMedBtn = document.getElementById('pauseMeditation');
    if (pauseMedBtn) {
        pauseMedBtn.addEventListener('click', function() {
            if (meditationTimer) {
                clearInterval(meditationTimer);
            }
        });
    }
    
    const stopMedBtn = document.getElementById('stopMeditation');
    if (stopMedBtn) {
        stopMedBtn.addEventListener('click', function() {
            if (meditationTimer) {
                clearInterval(meditationTimer);
            }
            const player = document.getElementById('meditationPlayer');
            player.classList.add('d-none');
        });
    }
    
    // Gratitude form
    const gratitudeForm = document.getElementById('gratitudeForm');
    if (gratitudeForm) {
        gratitudeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const entry = document.getElementById('gratitudeEntry').value;
            const today = new Date().toLocaleDateString();
            
            const listDiv = document.getElementById('gratitudeList');
            const newEntry = document.createElement('div');
            newEntry.className = 'card mb-2';
            newEntry.innerHTML = `
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">${today}</h6>
                    <p class="card-text">${entry}</p>
                </div>
            `;
            listDiv.insertBefore(newEntry, listDiv.firstChild);
            
            gratitudeForm.reset();
        });
    }
});

// Simple utility functions
function resetChecklist() {
    const checkboxes = document.querySelectorAll('.form-check-input');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
}

function saveToLocalStorage(key, data) {
    const jsonString = JSON.stringify(data);
    localStorage.setItem(key, jsonString);
}

function loadFromLocalStorage(key) {
    const jsonString = localStorage.getItem(key);
    if (jsonString) {
        return JSON.parse(jsonString);
    } else {
        return null;
    }
}

