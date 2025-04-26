// BMI Calculator functionality
const bmiForm = document.getElementById('bmi-form');
const bmiResult = document.getElementById('bmi-result');

function calculateBMI(weight, height) {
    // Convert height to meters
    const heightInMeters = height / 100;
    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);
    return parseFloat(bmi.toFixed(1));
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}

function getBMIMessage(category) {
    const messages = {
        'Underweight': 'You are underweight. Consider consulting with a nutritionist for a healthy weight gain plan.',
        'Normal': 'Your weight is within the normal range. Keep up the good work!',
        'Overweight': 'You are overweight. Consider incorporating more physical activity and a balanced diet.',
        'Obese': 'You are in the obese range. It is recommended to consult with a healthcare professional.'
    };
    return messages[category];
}

function getRecommendedWeightRange(height) {
    const heightInMeters = height / 100;
    const minWeight = (18.5 * heightInMeters * heightInMeters).toFixed(1);
    const maxWeight = (24.9 * heightInMeters * heightInMeters).toFixed(1);
    return `${minWeight} - ${maxWeight} kg`;
}

bmiForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    
    if (weight > 0 && height > 0) {
        const bmi = calculateBMI(weight, height);
        const category = getBMICategory(bmi);
        const message = getBMIMessage(category);
        const weightRange = getRecommendedWeightRange(height);
        
        // Update result display
        document.getElementById('bmi-number').textContent = bmi;
        document.getElementById('bmi-category').textContent = category;
        document.getElementById('bmi-message').textContent = message;
        document.getElementById('weight-range').textContent = `Recommended weight range for your height: ${weightRange}`;
        
        // Update BMI indicator position
        const marker = document.querySelector('.marker');
        const position = ((bmi - 15) / (40 - 15)) * 100;
        marker.style.left = `${Math.min(Math.max(position, 0), 100)}%`;
        
        bmiResult.classList.remove('hidden');
    }
});