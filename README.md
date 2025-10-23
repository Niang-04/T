# 12 Monthly Surprises 🎁

A birthday present project featuring 12 monthly tiles that unlock progressively throughout the year. Each tile links to a puzzle game, and when solved, reveals a 4-digit code.

## Features

- **Progressive Unlocking**: Tiles unlock one month at a time based on the current date
- **Puzzle Integration**: Each tile links to a Clues by Sam game
- **Code Reveal**: Once a puzzle is solved, the tile displays the 4-digit code
- **Progress Tracking**: Uses localStorage to remember which puzzles have been solved
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Visual States**: Three distinct visual states (locked 🔒, unlocked 🎁, resolved ✅)

## Screenshots

### Desktop View
![Desktop View](https://github.com/user-attachments/assets/72f9be2c-ac72-406e-a016-9f1032bbb007)

### Unlocked Puzzle Modal
![Modal View](https://github.com/user-attachments/assets/d5081633-e813-4d3e-87f8-f79a088d0768)

### Resolved Tile
![Resolved Tile](https://github.com/user-attachments/assets/05b90819-168a-4500-addb-2eb3e977a981)

### Mobile View
![Mobile View](https://github.com/user-attachments/assets/52e30b20-8b35-4526-bdc6-911de316cdf8)

## How to Use

1. **Host the Website**: Upload `index.html`, `styles.css`, and `script.js` to any web hosting service (GitHub Pages, Netlify, Vercel, etc.)
2. **Share the Link**: Give the website URL to your friend
3. **Monthly Unlocks**: Each month, a new tile will automatically unlock
4. **Solve Puzzles**: Click on unlocked tiles to access the puzzle game
5. **Enter Codes**: After solving a puzzle, enter the 4-digit code to mark it as complete

## Setup and Customization

### 1. Set the Start Date

Open `script.js` and modify these variables at the top of the file:

```javascript
const PROJECT_START_YEAR = 2025;  // Year when the project starts
const PROJECT_START_MONTH = 1;     // Month when the project starts (1 = January)
```

### 2. Configure Game Links and Codes

In `script.js`, update the `gameConfig` array with your actual Clues by Sam game URLs:

```javascript
const gameConfig = [
    { month: 'January', gameUrl: 'https://cluesbysam.com/your-game-1', code: '1234' },
    { month: 'February', gameUrl: 'https://cluesbysam.com/your-game-2', code: '2345' },
    // ... etc
];
```

**Important**: The `code` field is for your reference only. The app doesn't validate codes - it accepts any 4-digit number. You can check the Clues by Sam archives to know when your friend solves each puzzle.

### 3. Customize Colors and Styling

Edit `styles.css` to change:
- Background gradient (look for `background: linear-gradient(...)`)
- Tile colors for different states (`.tile.locked`, `.tile.unlocked`, `.tile.resolved`)
- Font sizes and spacing

## Local Testing

To test locally:

```bash
# Navigate to the project directory
cd /path/to/project

# Start a simple HTTP server
python3 -m http.server 8080

# Open browser to http://localhost:8080
```

### Debug Commands

Open the browser console and use these commands:

```javascript
// Unlock all tiles for testing
debugUnlockAll();

// Reset all progress
debugReset();
```

## Hosting Options

### GitHub Pages (Free)
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select the main branch and root folder
4. Your site will be available at `https://username.github.io/repository-name/`

### Netlify (Free)
1. Drag and drop your project folder to Netlify
2. Your site will be live instantly

### Vercel (Free)
1. Connect your GitHub repository to Vercel
2. Deploy with one click

## Browser Compatibility

- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- Mobile browsers: ✅ Fully supported

## Privacy

- All data is stored locally in the browser using localStorage
- No data is sent to any server
- Codes are stored client-side only

## License

This is a personal project created as a birthday gift. Feel free to use and modify for your own personal projects!
