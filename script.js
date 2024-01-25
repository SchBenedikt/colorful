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
    document.cookie = `selectedFont=${selectedFont}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
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

function changeColorOnKeyPress(event) {
    setRandomColor();
    updateClock();
}

function changeColorOnClick(event) {
    setRandomColor();
    updateClock();
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
}, 24 * 60 * 60 * 1000);

setInterval(updateClock, 1000);

window.addEventListener('resize', () => {
    document.getElementById('clock').style.fontSize = '8vw';
});

document.getElementById('settingsButton').addEventListener('click', openSettingsModal);
document.addEventListener('click', changeColorOnClick);
document.addEventListener('keydown', changeColorOnKeyPress);
