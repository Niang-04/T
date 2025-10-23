// Configuration: Clues by Sam game URLs for each month
const gameConfig = [
    { month: 'January', gameUrl: 'https://cluesbysam.com/', code: '1234' },
    { month: 'February', gameUrl: 'https://cluesbysam.com/', code: '2345' },
    { month: 'March', gameUrl: 'https://cluesbysam.com/', code: '3456' },
    { month: 'April', gameUrl: 'https://cluesbysam.com/', code: '4567' },
    { month: 'May', gameUrl: 'https://cluesbysam.com/', code: '5678' },
    { month: 'June', gameUrl: 'https://cluesbysam.com/', code: '6789' },
    { month: 'July', gameUrl: 'https://cluesbysam.com/', code: '7890' },
    { month: 'August', gameUrl: 'https://cluesbysam.com/', code: '8901' },
    { month: 'September', gameUrl: 'https://cluesbysam.com/', code: '9012' },
    { month: 'October', gameUrl: 'https://cluesbysam.com/', code: '0123' },
    { month: 'November', gameUrl: 'https://cluesbysam.com/', code: '1357' },
    { month: 'December', gameUrl: 'https://cluesbysam.com/', code: '2468' }
];

// Get the year this project started (for calculating which months should be unlocked)
// You can change this to the actual start date
const PROJECT_START_YEAR = 2025;
const PROJECT_START_MONTH = 1; // January (1-indexed)

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

// Load resolved tiles from localStorage
function getResolvedTiles() {
    const stored = localStorage.getItem('resolvedTiles');
    if (!stored) return {};
    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error('Failed to parse resolvedTiles from localStorage:', e);
        return {};
    }
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
    const isResolved = Object.prototype.hasOwnProperty.call(resolvedTiles, index);
    
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
    monthName.textContent = config.month;
    
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
        unlockDateText.textContent = `Unlocks: ${unlockDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
        tileContent.appendChild(unlockDateText);
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
    
    modal.setAttribute('aria-hidden', 'false');
    modalTitle.textContent = config.month;
    
    if (isResolved) {
        const resolvedTiles = getResolvedTiles();
        // Clear previous content
        modalBody.innerHTML = '';
        
        // Create elements safely
        const congrats = document.createElement('p');
        congrats.textContent = '🎉 Congratulations! You\'ve already solved this puzzle!';
        
        const codeDisplay = document.createElement('div');
        codeDisplay.className = 'code-display';
        codeDisplay.textContent = resolvedTiles[index];
        
        const message = document.createElement('p');
        message.style.marginTop = '20px';
        message.textContent = `Your 4-digit code for ${config.month} is ready to use.`;
        
        modalBody.appendChild(congrats);
        modalBody.appendChild(codeDisplay);
        modalBody.appendChild(message);
    } else {
        // Clear previous content
        modalBody.innerHTML = '';
        
        const intro = document.createElement('p');
        intro.textContent = '🎮 Time to solve your puzzle!';
        
        const instructions = document.createElement('p');
        instructions.textContent = `Click the link below to play the Clues by Sam game for ${config.month}.`;
        
        const gameLink = document.createElement('a');
        gameLink.href = config.gameUrl;
        gameLink.target = '_blank';
        gameLink.rel = 'noopener noreferrer';
        gameLink.className = 'modal-link';
        gameLink.textContent = 'Play Game';
        
        const inputGroup = document.createElement('div');
        inputGroup.className = 'modal-input-group';
        
        const label = document.createElement('label');
        label.setAttribute('for', 'codeInput');
        label.textContent = 'Enter the 4-digit code you found:';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'codeInput';
        input.maxLength = 4;
        input.pattern = '[0-9]{4}';
        input.placeholder = 'XXXX';
        
        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn';
        submitBtn.id = 'submitCode';
        submitBtn.style.width = '100%';
        submitBtn.style.marginTop = '15px';
        submitBtn.textContent = 'Submit Code';
        
        inputGroup.appendChild(label);
        inputGroup.appendChild(input);
        inputGroup.appendChild(submitBtn);
        
        modalBody.appendChild(intro);
        modalBody.appendChild(instructions);
        modalBody.appendChild(gameLink);
        modalBody.appendChild(inputGroup);
        
        // Create error message element
        const errorMsg = document.createElement('p');
        errorMsg.style.color = '#d63031';
        errorMsg.style.marginTop = '10px';
        errorMsg.style.display = 'none';
        errorMsg.id = 'errorMessage';
        inputGroup.appendChild(errorMsg);
        
        // Add event listener for code submission
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
        
        submitBtn.addEventListener('click', () => {
            const enteredCode = input.value;
            if (enteredCode.length === 4) {
                // Save the code (in real implementation, you would verify it)
                saveResolvedTile(index, enteredCode);
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
                // Refresh the page to show the updated state
                renderTiles();
            } else {
                errorMsg.textContent = 'Please enter a 4-digit code';
                errorMsg.style.display = 'block';
            }
        });
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.value.length === 4) {
                submitBtn.click();
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
    
    const closeModal = () => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    };
    
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Initialize the application
function init() {
    renderTiles();
    setupModalClose();
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
