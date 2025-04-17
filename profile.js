function displaySavedLogs() {
    const logs = JSON.parse(localStorage.getItem("workoutLogs")) || [];
    const logsList = document.getElementById('logs-list');
    logsList.innerHTML = ''; // Clear existing list items

    // Sort logs by date (assuming log.date is in ISO format)
    logs.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort descending

    logs.forEach(log => {
        const listItem = document.createElement('li');
        const dateInfo = log.date ? `, Date: ${log.date}` : ''; // Include date if it exists
        listItem.textContent = `Move: ${log.move}, Duration: ${log.duration} seconds, Reps: ${log.reps}${dateInfo}`;
        logsList.appendChild(listItem);
    });
}

function filterLogs() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const logsList = document.getElementById('logs-list');
    const items = logsList.getElementsByTagName('li');

    for (let i = 0; i < items.length; i++) {
        const itemText = items[i].textContent.toLowerCase();
        items[i].style.display = itemText.includes(query) ? '' : 'none';
    }
}

// Call this function when the page loads or when you need to display logs
window.onload = function() {
    displaySavedLogs();
};