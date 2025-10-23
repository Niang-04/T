// Configuration: Clues by Sam game URLs for each month
const gameConfig = [
    { month: 'October', gameUrl: 'https://cluesbysam.com/archive/da879b8359d5/', code: '0123', character: 'Cheryl', correctRole: 'innocent' },
    { month: 'November', gameUrl: 'https://cluesbysam.com/archive/ff2ddec591b8/', code: '1357', character: 'Vince', correctRole: 'criminal' },
    { month: 'December', gameUrl: 'https://cluesbysam.com/archive/0bc6d21e51d6/', code: '2468', character: 'Janet', correctRole: 'innocent' },
    { month: 'January', gameUrl: 'https://cluesbysam.com/archive/9d47b7b1ca7b/', code: '1234', character: 'Vicky', correctRole: 'criminal' },
    { month: 'February', gameUrl: 'https://cluesbysam.com/archive/e5a55fb98820/', code: '2345', character: 'Rob', correctRole: 'criminal' },
    { month: 'March', gameUrl: 'https://cluesbysam.com/archive/325524b265bc/', code: '3456', character: 'Lucy', correctRole: 'criminal' },
    { month: 'April', gameUrl: 'https://cluesbysam.com/s/archive/17b596917377/', code: '4567', character: 'Ben', correctRole: 'innocent' },
    { month: 'May', gameUrl: 'https://cluesbysam.com/s/archive/08cab97f0fdb/', code: '5678', character: 'Olivia', correctRole: 'criminal' },
    { month: 'June', gameUrl: 'https://cluesbysam.com/s/archive/95a745eb930a/', code: '6789', character: 'Laura', correctRole: 'criminal' },
    { month: 'July', gameUrl: 'https://cluesbysam.com/archive/d7d07ec6811d/', code: '7890', character: 'Brian', correctRole: 'criminal' },
    { month: 'August', gameUrl: 'https://cluesbysam.com/archive/f14610e1cd4d/', code: '8901', character: 'Zara', correctRole: 'innocent' },
    { month: 'September', gameUrl: 'https://cluesbysam.com/archive/534926b17285/', code: '9012', character: 'Amy', correctRole: 'criminal' }
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
        // Show days until unlock
        const now = getCurrentDate();
        const msUntil = unlockDate.getTime() - now.getTime();
        if (msUntil > 0) {
            const days = Math.ceil(msUntil / (1000 * 60 * 60 * 24));
            const eta = document.createElement('div');
            eta.className = 'unlock-eta';
            eta.textContent = `${days} day${days > 1 ? 's' : ''} until unlock`;
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
    
    modalTitle.textContent = config.month;
    
    if (isResolved) {
        const resolvedTiles = getResolvedTiles();
        modalBody.innerHTML = `
            <p>🎉 Congratulations! You've already solved this puzzle!</p>
            <div class="code-display">${resolvedTiles[index]}</div>
            <p style="margin-top: 20px;">Your 4-digit code for ${config.month} is ready to use.</p>
        `;
    } else {
        modalBody.innerHTML = `
            <p>🎮 Time to solve your puzzle!</p>
            <p>Click the link below to play the Clues by Sam game for ${config.month}.</p>
            <a href="${config.gameUrl}" target="_blank" rel="noopener noreferrer" class="modal-link">Play Game</a>
            <div class="modal-input-group">
                <label for="roleInput">What is the role of ${config.character}?</label>
                <select id="roleInput" style="width: 100%; padding: 10px; font-size: 16px; border-radius: 4px; border: 1px solid #ddd; margin-top: 8px;">
                    <option value="">Select a role...</option>
                    <option value="innocent">Innocent</option>
                    <option value="criminal">Criminal</option>
                </select>
                <button class="btn" id="submitCode" style="width: 100%; margin-top: 15px;">Submit Answer</button>
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
                errorMessage.textContent = 'Please select a role';
                errorMessage.style.display = 'block';
                return;
            }
            
            // Validate the answer
            if (selectedRole === config.correctRole.toLowerCase()) {
                // Correct answer! Save the code
                saveResolvedTile(index, config.code);
                
                // Show success message with the code
                modalBody.innerHTML = `
                    <p>🎉 Congratulations! That's correct!</p>
                    <p>${config.character} is ${config.correctRole}!</p>
                    <div class="code-display" style="font-size: 32px; margin: 20px 0;">${config.code}</div>
                    <p>Your 4-digit code for ${config.month} is: <strong>${config.code}</strong></p>
                    <button class="btn" id="closeModal" style="width: 100%; margin-top: 15px;">Close</button>
                `;
                
                document.getElementById('closeModal').addEventListener('click', () => {
                    modal.style.display = 'none';
                    renderTiles();
                });
            } else {
                // Wrong answer
                errorMessage.textContent = `Incorrect role for ${config.character}. Try again!`;
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
    renderTiles();
    setupModalClose();
    // Wire reset button (with confirmation)
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            const ok = confirm('Are you sure you want to reset all progress? This cannot be undone.');
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
