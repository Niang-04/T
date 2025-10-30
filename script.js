// Translation object for French and English
const translations = {
    en: {
        title: "Your 12 Monthly Surprises 🎁",
        subtitle: "Each month unlocks a new puzzle. Solve it to reveal your code!",
        resetBtn: "Reset progress",
        unlocks: "Unlocks",
        dayUntilUnlock: "day until unlock",
        daysUntilUnlock: "days until unlock",
        congratulationsResolved: "🎉 Congratulations! You've already solved this puzzle!",
        codeReady: "Your 3-digit code for {month} is ready to use.",
        timeToSolve: "🎮 Time to solve your puzzle!",
        clickLink: "Click the link below to play the Clues by Sam game for {month}.",
        playGame: "Play Game",
        whatIsRole: "What is the role of {character}?",
        selectRole: "Select a role...",
        innocent: "Innocent",
        criminal: "Criminal",
        submitAnswer: "Submit Answer",
        pleaseSelect: "Please select a role",
        correctAnswer: "🎉 Congratulations! That's correct!",
        characterIs: "{character} is {role}!",
        yourCode: "Your 3-digit code for {month} is: {code}",
        close: "Close",
        incorrectRole: "Incorrect role for {character}. Try again!",
        confirmReset: "Are you sure you want to reset all progress? This cannot be undone.",
        theme: "Theme",
        language: "Language"
    },
    fr: {
        title: "Vos 12 Surprises Mensuelles 🎁",
        subtitle: "Chaque mois débloque un nouveau puzzle. Résolvez-le pour révéler votre code!",
        resetBtn: "Réinitialiser la progression",
        unlocks: "Se débloque",
        dayUntilUnlock: "jour avant le déblocage",
        daysUntilUnlock: "jours avant le déblocage",
        congratulationsResolved: "🎉 Félicitations! Vous avez déjà résolu ce puzzle!",
        codeReady: "Votre code à 3 chiffres pour {month} est prêt à utiliser.",
        timeToSolve: "🎮 Il est temps de résoudre votre puzzle!",
        clickLink: "Cliquez sur le lien ci-dessous pour jouer au jeu Clues by Sam pour {month}.",
        playGame: "Jouer",
        whatIsRole: "Quel est le rôle de {character}?",
        selectRole: "Sélectionnez un rôle...",
        innocent: "Innocent",
        criminal: "Criminel",
        submitAnswer: "Soumettre la réponse",
        pleaseSelect: "Veuillez sélectionner un rôle",
        correctAnswer: "🎉 Félicitations! C'est correct!",
        characterIs: "{character} est {role}!",
        yourCode: "Votre code à 3 chiffres pour {month} est: {code}",
        close: "Fermer",
        incorrectRole: "Rôle incorrect pour {character}. Réessayez!",
        confirmReset: "Êtes-vous sûr de vouloir réinitialiser toute la progression? Cela ne peut pas être annulé.",
        theme: "Thème",
        language: "Langue"
    }
};

// Month names in different languages
const monthNames = {
    en: ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
    fr: ['Octobre', 'Novembre', 'Décembre', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre']
};

// Get current language from localStorage or default to English
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

// Set language
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    updateUILanguage();
}

// Get translated text
function t(key, replacements = {}) {
    const lang = getCurrentLanguage();
    let text = translations[lang][key] || translations['en'][key] || key;
    
    // Replace placeholders
    Object.keys(replacements).forEach(placeholder => {
        text = text.replace(`{${placeholder}}`, replacements[placeholder]);
    });
    
    return text;
}

// Get month name in current language
function getMonthName(index) {
    const lang = getCurrentLanguage();
    return monthNames[lang][index] || monthNames['en'][index];
}

// Get current theme from localStorage or default to light
function getCurrentTheme() {
    return localStorage.getItem('theme') || 'light';
}

// Set theme
function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
}

// Toggle theme
function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Toggle language
function toggleLanguage() {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'en' ? 'fr' : 'en';
    setLanguage(newLang);
}

// Update UI language
function updateUILanguage() {
    // Update title and subtitle
    document.querySelector('h1').textContent = t('title');
    document.querySelector('.subtitle').textContent = t('subtitle');
    document.getElementById('resetBtn').textContent = t('resetBtn');
    
    // Update language button text
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.textContent = getCurrentLanguage().toUpperCase();
    }
    
    // Re-render tiles to update month names and other text
    renderTiles();
}

// Configuration: Clues by Sam game URLs for each month
const gameConfig = [
    { month: 'October', gameUrl: 'https://cluesbysam.com/archive/da879b8359d5/', code: '012', character: 'Cheryl', correctRole: 'innocent' },
    { month: 'November', gameUrl: 'https://cluesbysam.com/archive/ff2ddec591b8/', code: '846', character: 'Vince', correctRole: 'criminal' },
    { month: 'December', gameUrl: 'https://cluesbysam.com/archive/0bc6d21e51d6/', code: '347', character: 'Janet', correctRole: 'innocent' },
    { month: 'January', gameUrl: 'https://cluesbysam.com/archive/9d47b7b1ca7b/', code: '681', character: 'Vicky', correctRole: 'criminal' },
    { month: 'February', gameUrl: 'https://cluesbysam.com/archive/e5a55fb98820/', code: '677', character: 'Rob', correctRole: 'criminal' },
    { month: 'March', gameUrl: 'https://cluesbysam.com/archive/325524b265bc/', code: '924', character: 'Lucy', correctRole: 'criminal' },
    { month: 'April', gameUrl: 'https://cluesbysam.com/s/archive/17b596917377/', code: '698', character: 'Ben', correctRole: 'innocent' },
    { month: 'May', gameUrl: 'https://cluesbysam.com/s/archive/08cab97f0fdb/', code: '346', character: 'Olivia', correctRole: 'criminal' },
    { month: 'June', gameUrl: 'https://cluesbysam.com/s/archive/95a745eb930a/', code: '876', character: 'Laura', correctRole: 'criminal' },
    { month: 'July', gameUrl: 'https://cluesbysam.com/archive/d7d07ec6811d/', code: '914', character: 'Brian', correctRole: 'criminal' },
    { month: 'August', gameUrl: 'https://cluesbysam.com/archive/f14610e1cd4d/', code: '642', character: 'Zara', correctRole: 'innocent' },
    { month: 'September', gameUrl: 'https://cluesbysam.com/archive/534926b17285/', code: '917', character: 'Amy', correctRole: 'criminal' }
];

// Get the year this project started (for calculating which months should be unlocked)
// You can change this to the actual start date
const PROJECT_START_YEAR = 2025;
const PROJECT_START_MONTH = 10; // October (1-indexed)

// Get current date
function getCurrentDate() {
    return new Date();
}

// Check if a month should be unlocked
function isMonthUnlocked(monthIndex) {
    const currentDate = getCurrentDate();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // 0-indexed to 1-indexed

    // Calculate months since project start
    const monthsSinceStart = (currentYear - PROJECT_START_YEAR) * 12 + (currentMonth - PROJECT_START_MONTH);
    
    // Month is unlocked if it's within the months passed since project start
    return monthIndex <= monthsSinceStart;
}

// Get unlock date for a month
function getUnlockDate(monthIndex) {
    const unlockYear = PROJECT_START_YEAR + Math.floor((PROJECT_START_MONTH + monthIndex - 1) / 12);
    const unlockMonth = ((PROJECT_START_MONTH + monthIndex - 1) % 12) + 1;
    return new Date(unlockYear, unlockMonth - 1, 1);
}

// Format date based on current language
function formatUnlockDate(date) {
    const lang = getCurrentLanguage();
    const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
    return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
}

// Load resolved tiles from localStorage
function getResolvedTiles() {
    const stored = localStorage.getItem('resolvedTiles');
    return stored ? JSON.parse(stored) : {};
}

// Save resolved tile to localStorage
function saveResolvedTile(monthIndex, code) {
    const resolved = getResolvedTiles();
    resolved[monthIndex] = code;
    localStorage.setItem('resolvedTiles', JSON.stringify(resolved));
}

// Create a tile element
function createTile(config, index) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    
    const isUnlocked = isMonthUnlocked(index);
    const resolvedTiles = getResolvedTiles();
    const isResolved = resolvedTiles.hasOwnProperty(index);
    
    // Set tile state
    if (isResolved) {
        tile.classList.add('resolved');
    } else if (isUnlocked) {
        tile.classList.add('unlocked');
    } else {
        tile.classList.add('locked');
    }
    
    // Create tile content
    const tileHeader = document.createElement('div');
    tileHeader.className = 'tile-header';
    
    const monthName = document.createElement('div');
    monthName.className = 'month-name';
    monthName.textContent = getMonthName(index);
    
    tileHeader.appendChild(monthName);
    
    const statusIcon = document.createElement('div');
    statusIcon.className = 'status-icon';
    
    if (isResolved) {
        statusIcon.textContent = '✅';
    } else if (isUnlocked) {
        statusIcon.textContent = '🎁';
    } else {
        statusIcon.textContent = '🔒';
    }
    
    const tileContent = document.createElement('div');
    tileContent.className = 'tile-content';
    
    if (isResolved) {
        const codeDisplay = document.createElement('div');
        codeDisplay.className = 'code-display';
        codeDisplay.textContent = resolvedTiles[index];
        tileContent.appendChild(codeDisplay);
    } else if (!isUnlocked) {
        const unlockDate = getUnlockDate(index);
        const unlockDateText = document.createElement('div');
        unlockDateText.className = 'unlock-date';
        unlockDateText.textContent = `${t('unlocks')}: ${formatUnlockDate(unlockDate)}`;
        tileContent.appendChild(unlockDateText);
        // Show days until unlock
        const now = getCurrentDate();
        const msUntil = unlockDate.getTime() - now.getTime();
        if (msUntil > 0) {
            const days = Math.ceil(msUntil / (1000 * 60 * 60 * 24));
            const eta = document.createElement('div');
            eta.className = 'unlock-eta';
            eta.textContent = `${days} ${days > 1 ? t('daysUntilUnlock') : t('dayUntilUnlock')}`;
            tileContent.appendChild(eta);
        }
    }
    
    tile.appendChild(tileHeader);
    tile.appendChild(statusIcon);
    tile.appendChild(tileContent);
    
    // Add click handler
    if (isUnlocked) {
        tile.addEventListener('click', () => openModal(config, index, isResolved));
    }
    
    return tile;
}

// Open modal for a tile
function openModal(config, index, isResolved) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = getMonthName(index);
    
    if (isResolved) {
        const resolvedTiles = getResolvedTiles();
        modalBody.innerHTML = `
            <p>${t('congratulationsResolved')}</p>
            <div class="code-display">${resolvedTiles[index]}</div>
            <p style="margin-top: 20px;">${t('codeReady', { month: getMonthName(index) })}</p>
        `;
    } else {
        modalBody.innerHTML = `
            <p>${t('timeToSolve')}</p>
            <p>${t('clickLink', { month: getMonthName(index) })}</p>
            <a href="${config.gameUrl}" target="_blank" rel="noopener noreferrer" class="modal-link">${t('playGame')}</a>
            <div class="modal-input-group">
                <label for="roleInput">${t('whatIsRole', { character: config.character })}</label>
                <select id="roleInput" style="width: 100%; padding: 10px; font-size: 16px; border-radius: 4px; border: 1px solid #ddd; margin-top: 8px;">
                    <option value="">${t('selectRole')}</option>
                    <option value="innocent">${t('innocent')}</option>
                    <option value="criminal">${t('criminal')}</option>
                </select>
                <button class="btn" id="submitCode" style="width: 100%; margin-top: 15px;">${t('submitAnswer')}</button>
                <div id="errorMessage" style="color: #ff4444; margin-top: 10px; display: none;"></div>
            </div>
        `;
        
        // Add event listener for answer submission
        const submitBtn = document.getElementById('submitCode');
        const roleInput = document.getElementById('roleInput');
        const errorMessage = document.getElementById('errorMessage');
        
        submitBtn.addEventListener('click', () => {
            const selectedRole = roleInput.value.toLowerCase();
            
            if (!selectedRole) {
                errorMessage.textContent = t('pleaseSelect');
                errorMessage.style.display = 'block';
                return;
            }
            
            // Validate the answer
            if (selectedRole === config.correctRole.toLowerCase()) {
                // Correct answer! Save the code
                saveResolvedTile(index, config.code);
                
                // Get translated role name
                const roleName = t(config.correctRole.toLowerCase());
                
                // Show success message with the code
                modalBody.innerHTML = `
                    <p>${t('correctAnswer')}</p>
                    <p>${t('characterIs', { character: config.character, role: roleName })}</p>
                    <div class="code-display" style="font-size: 32px; margin: 20px 0;">${config.code}</div>
                    <p>${t('yourCode', { month: getMonthName(index), code: config.code })}</p>
                    <button class="btn" id="closeModal" style="width: 100%; margin-top: 15px;">${t('close')}</button>
                `;
                
                document.getElementById('closeModal').addEventListener('click', () => {
                    modal.style.display = 'none';
                    renderTiles();
                });
            } else {
                // Wrong answer
                errorMessage.textContent = t('incorrectRole', { character: config.character });
                errorMessage.style.display = 'block';
            }
        });
    }
    
    modal.style.display = 'block';
}

// Render all tiles
function renderTiles() {
    const tilesGrid = document.getElementById('tilesGrid');
    tilesGrid.innerHTML = '';
    
    gameConfig.forEach((config, index) => {
        const tile = createTile(config, index);
        tilesGrid.appendChild(tile);
    });
}

// Close modal
function setupModalClose() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Initialize the application
function init() {
    // Apply saved theme
    setTheme(getCurrentTheme());
    
    // Update language
    updateUILanguage();
    
    renderTiles();
    setupModalClose();
    
    // Wire theme toggle button
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
    
    // Wire language toggle button
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
    
    // Wire reset button (with confirmation)
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            const ok = confirm(t('confirmReset'));
            if (ok) {
                if (typeof window.debugReset === 'function') {
                    window.debugReset();
                } else {
                    localStorage.removeItem('resolvedTiles');
                    renderTiles();
                }
            }
        });
    }
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Debug function to unlock all tiles (remove in production)
window.debugUnlockAll = function() {
    const tiles = {};
    gameConfig.forEach((config, index) => {
        tiles[index] = '0000';
    });
    localStorage.setItem('resolvedTiles', JSON.stringify(tiles));
    renderTiles();
    console.log('All tiles unlocked for testing');
};

// Debug function to reset all progress
window.debugReset = function() {
    localStorage.removeItem('resolvedTiles');
    renderTiles();
    console.log('Progress reset');
};
