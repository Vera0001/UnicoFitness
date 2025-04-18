// Declare variables for the timer, session duration in seconds, session count, and max sessions allowed.
let timer;
let seconds = 0;
let sessionCount = 0;
const maxSessions = 6;

// Define capoeira moves with their video sources and descriptions for display.
const moves = {
    Ginga: {
        video: 'videos/Ginga.mp4',
        timerVideos: ['https://github.com/Vera0001/UnicoFitness.git/videos/endurance.mp4', 'videos/endurance2.mp4', 'videos/endurance3.mp4'], // Array of different videos for timer
        description: 'The basic movement in capoeira that keeps you in constant motion.',
        currentIndex: 0 // Track the current video index
    },
    Au: {
        video: 'videos/AU.mp4',
        timerVideos: ['videos/auTimer1.mp4', 'videos/auTimer2.mp4', 'videos/auTimer3.mp4'], // Array of different videos for timer
        description: 'A capoeira cartwheel used for evasion and positioning.',
        currentIndex: 0 // Track the current video index
    },
    Queixada: {
        video: 'videos/Queixada.mp4',
        timerVideos: ['videos/warmup2_1.mp4', 'videos/warmup2_2.mp4', 'videos/warmup2_3.mp4'], // Array of different videos for timer
        description: 'A sweeping kick that is circular and powerful.',
        currentIndex: 0 // Track the current video index
    }
};

// Function to save session logs to localStorage
function saveLog(data) {
    const logs = JSON.parse(localStorage.getItem("workoutLogs")) || [];
    logs.push(data);
    localStorage.setItem("workoutLogs", JSON.stringify(logs));
}

// Function to display a selected capoeira move's video and description.
function showMove(move) {
    const moveData = moves[move];
    if (moveData) {
        document.getElementById('move-title').textContent = move;
        document.getElementById('video-source').src = moveData.video;
        document.getElementById('move-video').load();
        document.getElementById('move-info').textContent = moveData.description;
    } else {
        console.error(`Move data not found for: ${move}`);
    }
}

// Starts a timer displayed in the timer modal. The timer updates every second.
function startTimer() {
    const moveTitle = document.getElementById('move-title').textContent;

    if (moveTitle && moves[moveTitle]) {
        const moveData = moves[moveTitle];

        // Select the next timer video in the sequence
        const selectedTimerVideo = moveData.timerVideos[moveData.currentIndex];
        moveData.currentIndex = (moveData.currentIndex + 1) % moveData.timerVideos.length; // Update the index

        // Set the video source for the timer modal
        document.getElementById('timer-video-source').src = selectedTimerVideo; // Use the selected timer video
        document.getElementById('timer-move-video').load(); // Load the new timer video
    } else {
        console.error('Selected move is not valid or moveData is not defined.');
    }

    // Show the timer modal
    document.getElementById('timer-modal').style.display = 'flex';

    seconds = 0; // Reset seconds for a new session
    timer = setInterval(() => {
        seconds++;
        document.getElementById('session-timer-display').textContent = `Time: ${seconds} seconds`;
    }, 1000);
}

// Stops the timer, hides the timer modal, and shows the reps input modal.
function stopTimer() {
    clearInterval(timer);
    document.getElementById('timer-modal').style.display = 'none';
    showRepsModal();
}

// Shows the modal to input reps for the completed session.
function showRepsModal() {
    document.getElementById('reps-modal').style.display = 'flex';
}

// Closes the reps input modal.
function closeRepsModal() {
    document.getElementById('reps-modal').style.display = 'none';
}

// Records session details including the move, duration, and reps; displays them on the page.
function submitSession() {
    const reps = document.getElementById('reps-input').value;
    console.log('Reps:', reps); // Debug reps input

    const moveTitle = document.getElementById('move-title').textContent;
    console.log('Move Title:', moveTitle); // Debug move title

    if (!reps || isNaN(reps)) {
        console.error('Invalid reps input!');
        return; // Prevent saving invalid data
    }

    const sessionData = {
        move: moveTitle,
        duration: seconds,
        reps: parseInt(reps, 10)
    };

    const timestamp = new Date().toLocaleString();
    sessionData.date = timestamp;

    console.log('Session Data:', sessionData); // Debug session data

    // Add the session data to the session history and summary.
    const listItem = document.createElement('li');
    listItem.textContent = `Move: ${sessionData.move}, Duration: ${sessionData.duration} seconds, Reps: ${sessionData.reps}, Date: ${sessionData.date}`;
    document.getElementById('session-data').appendChild(listItem);

    const summaryItem = document.createElement('li');
    summaryItem.textContent = `Move: ${sessionData.move}, Duration: ${sessionData.duration} seconds, Reps: ${sessionData.reps}, Date: ${sessionData.date}`;
    document.getElementById('session-data-summary').appendChild(summaryItem);

    saveLog(sessionData);

    sessionCount++;
    closeRepsModal();

    if (sessionCount === maxSessions) {
        showProfileModal();
    } else {
        startTimer();
    }
}

// Shows the profile modal, which summarizes all completed sessions.
function showProfileModal() {
    document.getElementById('profile-modal').style.display = 'flex';
}

// Closes the profile modal and resets the session count and session summary.
function closeProfileModal() {
    document.getElementById('profile-modal').style.display = 'none';
    sessionCount = 0;
    document.getElementById('session-data-summary').innerHTML = '';
}

// Displays the welcome modal when the page loads.
window.onload = function() {
    document.getElementById('welcome-modal').style.display = 'flex';
};

// Closes the welcome modal.
function closeWelcomeModal() {
    document.getElementById('welcome-modal').style.display = 'none';
}

// Closes the move info modal.
function closeMoveInfoModal() {
    document.getElementById('move-info-modal').style.display = 'none';
    document.querySelector('.close-button').style.display = 'none';
}

// Shows detailed information about the selected move in a modal.
function showMoveInfo() {
    const moveInfo = "Info about the selected move.";
    document.getElementById('move-info').textContent = moveInfo;
    document.getElementById('move-info-modal').style.display = 'flex';
    document.querySelector('.close-button').style.display = 'block';
}

// Redirects the user to the courses page.
function goBack() {
    window.location.href = '../courses.html';
}