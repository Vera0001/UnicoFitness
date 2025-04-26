// Declare variables for the timer, session duration in seconds, session count, and max sessions allowed
let timer;
let seconds = 0;
let sessionCount = 0;
const maxSessions = 6;

// Define capoeira moves with their video sources and descriptions
const moves = {
    Ginga: {
        video: 'videos/Ginga.mp4',
        timerVideos: ['videos/endurance.mp4', 'videos/endurance2.mp4', 'videos/endurance3.mp4'],
        description: 'The basic movement in capoeira that keeps you in constant motion.',
        currentIndex: 0
    },
    Au: {
        video: 'videos/AU.mp4',
        timerVideos: ['videos/auTimer1.mp4', 'videos/auTimer2.mp4', 'videos/auTimer3.mp4'],
        description: 'A capoeira cartwheel used for evasion and positioning.',
        currentIndex: 0
    },
    Queixada: {
        video: 'videos/Queixada.mp4',
        timerVideos: ['videos/warmup2_1.mp4', 'videos/warmup2_2.mp4', 'videos/warmup2_3.mp4'],
        description: 'A sweeping kick that is circular and powerful.',
        currentIndex: 0
    }
};

// Mobile menu functionality
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    menuToggle.classList.toggle('menu-open');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target) && 
        sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('menu-open');
    }
});

// Function to save session logs to localStorage
function saveLog(data) {
    const logs = JSON.parse(localStorage.getItem("workoutLogs")) || [];
    logs.push(data);
    localStorage.setItem("workoutLogs", JSON.stringify(logs));
    updateSessionHistory(logs);
}

// Function to update the session history display
function updateSessionHistory(logs) {
    const sessionData = document.getElementById('session-data');
    sessionData.innerHTML = '';
    
    logs.forEach(log => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="session-item">
                <div class="move-name">${log.move}</div>
                <div class="session-details">
                    Duration: ${log.duration}s, Reps: ${log.reps}
                </div>
                <div class="session-date">${log.date}</div>
            </div>
        `;
        sessionData.appendChild(li);
    });
}

// Function to display a selected capoeira move
function showMove(move) {
    const moveData = moves[move];
    if (moveData) {
        document.getElementById('move-title').textContent = move;
        document.getElementById('video-source').src = moveData.video;
        document.getElementById('move-video').load();
        document.getElementById('move-info').textContent = moveData.description;
        
        // Close mobile menu after selection
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            menuToggle.classList.remove('menu-open');
        }
    }
}

// Timer functionality
function startTimer() {
    const moveTitle = document.getElementById('move-title').textContent;
    
    if (moveTitle && moves[moveTitle]) {
        const moveData = moves[moveTitle];
        const selectedTimerVideo = moveData.timerVideos[moveData.currentIndex];
        moveData.currentIndex = (moveData.currentIndex + 1) % moveData.timerVideos.length;
        
        document.getElementById('timer-video-source').src = selectedTimerVideo;
        document.getElementById('timer-move-video').load();
        
        document.getElementById('timer-modal').style.display = 'flex';
        document.getElementById('move-info-modal').style.display = 'none';
        
        seconds = 0;
        timer = setInterval(() => {
            seconds++;
            document.getElementById('session-timer-display').textContent = `Time: ${seconds} seconds`;
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    document.getElementById('timer-modal').style.display = 'none';
    showRepsModal();
}

// Modal functionality
function showRepsModal() {
    document.getElementById('reps-modal').style.display = 'flex';
}

function closeRepsModal() {
    document.getElementById('reps-modal').style.display = 'none';
}

function submitSession() {
    const reps = parseInt(document.getElementById('reps-input').value);
    const moveTitle = document.getElementById('move-title').textContent;
    
    if (!isNaN(reps) && moveTitle) {
        const sessionData = {
            move: moveTitle,
            duration: seconds,
            reps: reps,
            date: new Date().toLocaleString()
        };
        
        saveLog(sessionData);
        
        // Update summary
        const summaryItem = document.createElement('li');
        summaryItem.textContent = `Move: ${sessionData.move}, Duration: ${sessionData.duration}s, Reps: ${sessionData.reps}`;
        document.getElementById('session-data-summary').appendChild(summaryItem);
        
        sessionCount++;
        closeRepsModal();
        
        if (sessionCount >= maxSessions) {
            showProfileModal();
        } else {
            startTimer();
        }
    }
}

function showProfileModal() {
    document.getElementById('profile-modal').style.display = 'flex';
}

function closeProfileModal() {
    document.getElementById('profile-modal').style.display = 'none';
    sessionCount = 0;
    document.getElementById('session-data-summary').innerHTML = '';
}

function showMoveInfo() {
    const moveTitle = document.getElementById('move-title').textContent;
    const moveInfo = moves[moveTitle]?.description || "Select a move to begin training.";
    
    document.getElementById('modal-move-title').textContent = moveTitle;
    document.getElementById('modal-move-info').textContent = moveInfo;
    document.getElementById('move-info-modal').style.display = 'flex';
}

function closeMoveInfoModal() {
    document.getElementById('move-info-modal').style.display = 'none';
}



function closeWelcomeModal() {
    document.getElementById('welcome-modal').style.display = 'none';
}

function goBack() {
    window.location.href = '../courses.html';
}