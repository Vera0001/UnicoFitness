// Session data management
// Ensure logs have valid dates, default to now if not
let sessionLogs = (JSON.parse(localStorage.getItem('workoutLogs')) || []).map(log => {
    if (!log.date || isNaN(new Date(log.date))) {
        console.warn("Log found with invalid date, setting to current date:", log);
        log.date = new Date().toISOString(); // Use ISO string for consistency
    }
    log.duration = Number(log.duration) || 0;
    log.reps = Number(log.reps) || 0;
    return log;
});

// Initialize profile page
function initializeProfile() {
    updateProfileInfo();
    updateStats();
    renderSessionList(); // Render initial list
}

// Update profile information
function updateProfileInfo() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('username').textContent = user.username || 'User'; // Default username
        const memberSince = user.memberSince ? new Date(user.memberSince).toLocaleDateString() : new Date().toLocaleDateString();
        document.getElementById('member-since').textContent = `Member Since: ${memberSince}`;
        document.getElementById('streak-count').textContent = `${user.streak || 0} Day Streak`; // Default streak
    } else {
        document.getElementById('username').textContent = 'User';
        document.getElementById('member-since').textContent = `Member Since: ${new Date().toLocaleDateString()}`;
        document.getElementById('streak-count').textContent = `0 Day Streak`;
    }
}

// Update statistics
function updateStats() {
    const totalSessions = sessionLogs.length;
    const totalDuration = sessionLogs.reduce((sum, log) => sum + (Number(log.duration) || 0), 0);
    const totalReps = sessionLogs.reduce((sum, log) => sum + (Number(log.reps) || 0), 0);
    const uniqueMoves = new Set(sessionLogs.map(log => log.move).filter(move => move)).size;

    document.getElementById('total-sessions').textContent = totalSessions;
    document.getElementById('total-duration').textContent = `${totalDuration}s`;
    document.getElementById('total-reps').textContent = totalReps;
    document.getElementById('unique-moves').textContent = uniqueMoves;
}

// Render session list
function renderSessionList(logsToRender = sessionLogs) {
    const sessionList = document.getElementById('session-list');
    if (!sessionList) return; // Guard clause if element doesn't exist
    sessionList.innerHTML = ''; // Clear previous list

    if (logsToRender.length === 0) {
        sessionList.innerHTML = '<p class="no-sessions">No sessions found.</p>';
        return;
    }

    const sortedLogs = [...logsToRender].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedLogs.forEach(log => {
        const sessionItem = document.createElement('div');
        sessionItem.className = 'session-item';
        const logDate = new Date(log.date);
        const displayDate = !isNaN(logDate) ? logDate.toLocaleDateString() : 'Invalid Date';

        sessionItem.innerHTML = `
            <div class="session-info">
                <strong>${log.move || 'Unknown Move'}</strong>
                <span class="session-date">${displayDate}</span>
            </div>
            <div class="session-details">
                <span class="session-badge">Duration: ${log.duration || 0}s</span>
                <span class="session-badge">Reps: ${log.reps || 0}</span>
            </div>
        `;
        sessionList.appendChild(sessionItem);
    });
}

// Search functionality
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const filteredLogs = sessionLogs.filter(log =>
            log.move && typeof log.move === 'string' && log.move.toLowerCase().includes(searchTerm)
        );
        renderSessionList(filteredLogs);
    });
} else {
    console.warn("Search input element ('search-input') not found.");
}

// Initialize the profile page when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProfile);