function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setRandomColor() {
    const backgroundType = document.getElementById('backgroundType').value;
    if (backgroundType === 'color') {
        const color = getRandomColor();
        document.body.style.backgroundColor = color;
        document.getElementById('colorCode').textContent = `${color}`;
    }
}

function fetchRandomImage() {
    const backgroundType = document.getElementById('backgroundType').value;
    if (backgroundType === 'image') {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const isMorning = currentHour === 4 && currentMinute >= 30 || currentHour > 4 && currentHour < 7 || currentHour === 7 && currentMinute <= 18;
        const imageUrl = isMorning ? 'https://source.unsplash.com/1600x900/?morning' : 'https://source.unsplash.com/1600x900/?nature';

        fetch(imageUrl)
            .then(response => {
                document.body.style.backgroundImage = `url(${response.url})`;
                document.getElementById('colorCode').textContent = ''; // Hide color code when background is set to image
            })
            .catch(error => console.error('Fehler beim Laden des Hintergrundbilds:', error));
    }
}

function setBackground(type) {
    if (type === 'color') {
        setRandomColor();
    } else if (type === 'image') {
        fetchRandomImage();
    }
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

function openSettingsModal() {
    document.getElementById('settingsModal').style.display = 'block';
}

function saveSettings() {
    const fontSelector = document.getElementById('fontSelector');
    const selectedFont = fontSelector.options[fontSelector.selectedIndex].value;
    document.body.style.fontFamily = selectedFont;

    const backgroundType = document.getElementById('backgroundType');
    const selectedBackgroundType = backgroundType.options[backgroundType.selectedIndex].value;
    setBackground(selectedBackgroundType);

    // Hier wird die Gültigkeitsdauer des Cookies auf 10 Jahre gesetzt
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 10);

    document.cookie = `selectedFont=${selectedFont}; expires=${expirationDate.toUTCString()}`;
    document.cookie = `selectedBackgroundType=${selectedBackgroundType}; expires=${expirationDate.toUTCString()}`;

    closeSettingsModal();
}


function closeSettingsModal() {
    document.getElementById('settingsModal').style.display = 'none';
}

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

const savedFont = getCookie('selectedFont');
if (savedFont) {
    document.body.style.fontFamily = savedFont;
    document.getElementById('fontSelector').value = savedFont;
}

const savedBackgroundType = getCookie('selectedBackgroundType');
if (savedBackgroundType) {
    setBackground(savedBackgroundType);
    document.getElementById('backgroundType').value = savedBackgroundType;
}

function openWebsiteOnDoubleClick(event) {
    if (event.detail === 2) {
        window.open('http://homeassistant.local:8123', '_blank');
    }
}

document.addEventListener('dblclick', openWebsiteOnDoubleClick);

setRandomColor();
updateClock();

setInterval(() => {
    setRandomColor();
    updateClock();
}, 10 * 1000); // Change color every 30 seconds

setInterval(fetchRandomImage, 60 * 1000); // Änderung: Das Bild wird alle 60 Sekunden automatisch geändert

setInterval(updateClock, 1000);

window.addEventListener('resize', () => {
    document.getElementById('clock').style.fontSize = '8vw';
});

document.getElementById('settingsButton').addEventListener('click', openSettingsModal);
document.getElementById('saveButton').addEventListener('click', saveSettings);
document.getElementById('closeButton').addEventListener('click', closeSettingsModal);
document.getElementById('backgroundType').addEventListener('change', event => {
    setBackground(event.target.value);
});
