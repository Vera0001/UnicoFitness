// this is the yes no js
// Character dialogue buttons
document.getElementById("yes-button").addEventListener("click", () => {
    characterDialogue.style.display = "none";
    timerContainer.style.display = "block";
    
    const interval = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown;
        
        if (countdown === 0) {
            clearInterval(interval);
            timerContainer.style.display = "none";
            quizContainer.style.display = "block";
            loadQuestion();
        }
    }, 1000);
});

document.getElementById("no-button").addEventListener("click", () => {
    document.getElementById("character-text").innerText = "Aww, maybe next time! 😔";
    setTimeout(() => {
        window.location.href = "daily_quest.html"; // Replace with your actual Daily Quest URL
    }, 3000);
});
