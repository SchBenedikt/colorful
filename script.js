function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setRandomColor() {
    const color = getRandomColor();
    document.body.style.backgroundColor = color;
    document.getElementById('colorCode').textContent = `${color}`;
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

function openSettingsModal() {
    document.getElementById('settingsModal').style.display = 'block';
}

function saveSettings() {
    const fontSelector = document.getElementById('fontSelector');
    const selectedFont = fontSelector.options[fontSelector.selectedIndex].value;
    document.body.style.fontFamily = selectedFont;
    
    // Speichern der Schriftart in einem Cookie
    document.cookie = `selectedFont=${selectedFont}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;

    closeSettingsModal();
}

function closeSettingsModal() {
    document.getElementById('settingsModal').style.display = 'none';
}

// Funktion zum Lesen von Cookies
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

// Initialisierung: Laden der Schriftart aus dem Cookie (falls vorhanden)
const savedFont = getCookie('selectedFont');
if (savedFont) {
    document.body.style.fontFamily = savedFont;
    document.getElementById('fontSelector').value = savedFont;
}

// Initial color setting, clock update, and color code display
setRandomColor();
updateClock();

// Change color every 24 hours
setInterval(() => {
    setRandomColor();
    updateClock();
}, 24 * 60 * 60 * 1000);

// Update clock every second
setInterval(updateClock, 1000);

// Update font size on window resize
window.addEventListener('resize', () => {
    document.getElementById('clock').style.fontSize = '8vw';
});

// Event listener for settings button
document.getElementById('settingsButton').addEventListener('click', openSettingsModal);
