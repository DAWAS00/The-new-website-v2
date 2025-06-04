// Digital clock function
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    // Convert to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const hoursStr = hours.toString().padStart(2, '0');
    
    // Display time in HH:MM:SS AM/PM format
    const clockElements = document.querySelectorAll('.clock-display');
    clockElements.forEach(element => {
        element.textContent = `${hoursStr}:${minutes}:${seconds} ${ampm}`;
    });
}

// Initialize clock
document.addEventListener('DOMContentLoaded', function() {
    updateClock(); // Update immediately when page loads
    setInterval(updateClock, 1000); // Then update every second
});