document.addEventListener('DOMContentLoaded', function() {
    const stressCalculatorForm = document.getElementById('stressCalculatorForm');
    const sleepPatternInput = document.getElementById('sleepPattern');
    const academicWorkloadInput = document.getElementById('academicWorkload');
    const socialLifeInput = document.getElementById('socialLife');
    const emotionalStateInput = document.getElementById('emotionalState');

    const sleepValueSpan = document.getElementById('sleepValue');
    const workloadValueSpan = document.getElementById('workloadValue');
    const socialValueSpan = document.getElementById('socialValue');
    const emotionalValueSpan = document.getElementById('emotionalValue');

    const stressResultDiv = document.getElementById('stressResult');
    const stressScoreSpan = document.getElementById('stressScore');
    const stressTipsParagraph = document.getElementById('stressTips');

    // Update range input values dynamically
    sleepPatternInput.addEventListener('input', () => {
        sleepValueSpan.textContent = sleepPatternInput.value;
    });
    academicWorkloadInput.addEventListener('input', () => {
        workloadValueSpan.textContent = academicWorkloadInput.value;
    });
    socialLifeInput.addEventListener('input', () => {
        socialValueSpan.textContent = socialLifeInput.value;
    });
    emotionalStateInput.addEventListener('input', () => {
        emotionalValueSpan.textContent = emotionalStateInput.value;
    });

    stressCalculatorForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const sleep = parseInt(sleepPatternInput.value);
        const workload = parseInt(academicWorkloadInput.value);
        const social = parseInt(socialLifeInput.value);
        const emotional = parseInt(emotionalStateInput.value);

        // Calculate stress score (example logic)
        // Lower sleep, higher workload, lower social, lower emotional contribute to higher stress
        const stressScore = (10 - sleep) + workload + (10 - social) + (10 - emotional);

        stressScoreSpan.textContent = stressScore;
        stressResultDiv.style.display = 'block';

        let tips = '';
        if (stressScore <= 15) {
            tips = 'Your stress level seems low. Keep up the good habits!';
        } else if (stressScore <= 25) {
            tips = 'You have a moderate stress level. Consider incorporating more relaxation techniques and managing your time effectively.';
        } else {
            tips = 'Your stress level is high. It is recommended to seek support from a counselor or mental health professional. Focus on self-care and stress reduction techniques.';
        }
        stressTipsParagraph.textContent = tips;
    });
});