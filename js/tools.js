// Breathing Exercise - Simplified
let breathingTimer = null;

function startBreathing() {
    const circle = document.getElementById('breathingCircle');
    const instructions = document.getElementById('breathingInstructions');
    const phases = [
        { text: 'Inhale deeply for 4 seconds...', duration: 4000, action: () => circle.classList.add('inhale') },
        { text: 'Hold your breath for 7 seconds...', duration: 7000, action: () => {} },
        { text: 'Exhale slowly for 8 seconds...', duration: 8000, action: () => circle.classList.remove('inhale') }
    ];
    
    let currentPhase = 0;
    
    function cycle() {
        const phase = phases[currentPhase];
        instructions.textContent = phase.text;
        phase.action();
        
        breathingTimer = setTimeout(() => {
            currentPhase = (currentPhase + 1) % phases.length;
            cycle();
        }, phase.duration);
    }
    
    if (breathingTimer) clearTimeout(breathingTimer);
    cycle();
}

function stopBreathing() {
    if (breathingTimer) {
        clearTimeout(breathingTimer);
        breathingTimer = null;
        document.getElementById('breathingCircle').classList.remove('inhale');
        document.getElementById('breathingInstructions').textContent = 'This 4-7-8 breathing technique is proven to reduce test anxiety';
    }
}

// CBT Thought Challenging - Simplified
function saveThoughtChallenge() {
    const fields = ['negativeThought', 'distortionType', 'evidence', 'balancedThought'];
    const values = fields.map(id => document.getElementById(id).value);
    
    if (values.some(val => !val)) {
        alert('Please complete all fields');
        return;
    }
    
    const [negative, distortion, evidence, balanced] = values;
    const distortionText = document.getElementById('distortionType').selectedOptions[0].text;
    
    document.getElementById('challengeHistory').insertAdjacentHTML('afterbegin', `
        <div class="card mb-2">
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">${new Date().toLocaleDateString()}</h6>
                <p class="mb-1"><strong>Negative thought:</strong> ${negative}</p>
                <p class="mb-1"><strong>Thinking error:</strong> ${distortionText}</p>
                <p class="mb-1"><strong>Evidence:</strong> ${evidence}</p>
                <p class="mb-1"><strong>Balanced perspective:</strong> ${balanced}</p>
            </div>
        </div>
    `);
    
    // Reset form
    fields.forEach(id => document.getElementById(id).value = '');
}

// Meditation Player - Simplified
let meditationTimer;

function playMeditation(type) {
    const durations = { exam: 300, sleep: 600, morning: 180 };
    const titles = { exam: 'Exam Preparation Calm', sleep: 'Student Sleep Aid', morning: 'Morning Motivation' };
    
    const player = document.getElementById('meditationPlayer');
    const progress = document.getElementById('meditationProgress');
    
    if (meditationTimer) clearInterval(meditationTimer);
    
    document.getElementById('meditationTitle').textContent = titles[type];
    player.classList.remove('d-none');
    
    let elapsed = 0;
    const duration = durations[type];
    
    meditationTimer = setInterval(() => {
        elapsed++;
        progress.style.width = `${(elapsed / duration) * 100}%`;
        
        if (elapsed >= duration) {
            clearInterval(meditationTimer);
            alert('Meditation complete!');
            player.classList.add('d-none');
        }
    }, 1000);
}

// Focus Timer - Simplified
let timerInterval, timeLeft;

function startTimer() {
    if (timerInterval) return;
    
    timeLeft = parseInt(document.getElementById('timerDuration').value);
    
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

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();
    timeLeft = parseInt(document.getElementById('timerDuration').value);
    updateTimerDisplay();
}

// Event Listeners - Simplified
document.addEventListener('DOMContentLoaded', () => {
    // Timer controls
    document.getElementById('startTimer')?.addEventListener('click', startTimer);
    document.getElementById('pauseTimer')?.addEventListener('click', pauseTimer);
    document.getElementById('resetTimer')?.addEventListener('click', resetTimer);
    
    // Meditation controls
    document.getElementById('pauseMeditation')?.addEventListener('click', () => clearInterval(meditationTimer));
    document.getElementById('stopMeditation')?.addEventListener('click', () => {
        clearInterval(meditationTimer);
        document.getElementById('meditationPlayer').classList.add('d-none');
    });
    
    // Gratitude journal
    document.getElementById('gratitudeForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const entry = document.getElementById('gratitudeEntry').value;
        
        document.getElementById('gratitudeList').insertAdjacentHTML('afterbegin', `
            <div class="card mb-2">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">${new Date().toLocaleDateString()}</h6>
                    <p class="card-text">${entry}</p>
                </div>
            </div>
        `);
        
        e.target.reset();
    });
});

// Utility functions
function resetChecklist() {
    document.querySelectorAll('.form-check-input').forEach(cb => cb.checked = false);
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

