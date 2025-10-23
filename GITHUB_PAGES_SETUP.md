# GitHub Pages Setup Guide

This document explains how to enable GitHub Pages for this project.

## Automatic Deployment

This repository is configured with GitHub Actions to automatically deploy to GitHub Pages whenever changes are pushed to the `main` branch.

## One-Time Setup Required

After merging the Pull Request that added the GitHub Actions workflow, follow these steps:

### Step 1: Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/Niang-04/T`
2. Click on **Settings** (top navigation bar)
3. In the left sidebar, click on **Pages**
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions" from the dropdown
   - This tells GitHub to use the workflow file we created instead of the legacy branch-based deployment

### Step 2: Verify Deployment
1. Go to the **Actions** tab in your repository
2. You should see the "Deploy to GitHub Pages" workflow
3. Wait for it to complete (green checkmark)
4. Once complete, your site will be live at: `https://Niang-04.github.io/T/`

### Step 3: Manual Deployment (Optional)
If you need to redeploy manually:
1. Go to **Actions** tab
2. Click on "Deploy to GitHub Pages" in the left sidebar
3. Click the "Run workflow" button
4. Select the `main` branch
5. Click "Run workflow"

## What Was Added

1. **`.github/workflows/deploy.yml`** - GitHub Actions workflow that:
   - Triggers on every push to `main` branch
   - Can be manually triggered from the Actions tab
   - Uses official GitHub Pages actions to deploy
   - Requires proper permissions (already configured)

2. **`.nojekyll`** - Empty file that tells GitHub Pages to:
   - Skip Jekyll processing
   - Serve files directly as-is
   - Maintain file structure exactly as in repository

3. **Updated README.md** - Added clear instructions for GitHub Pages setup

## Troubleshooting

### Site not loading
- Ensure "Source" is set to "GitHub Actions" in Settings > Pages
- Check the Actions tab for any failed workflow runs
- Wait a few minutes after the workflow completes (DNS propagation)

### Workflow failing
- Check the workflow logs in the Actions tab
- Ensure repository has Pages enabled
- Verify permissions are set correctly in the workflow file

### 404 errors
- Verify the site URL matches your repository name
- For this repo, it should be: `https://Niang-04.github.io/T/`
- Clear browser cache and try again

## Technical Details

### Workflow Triggers
- **Push to main**: Automatic deployment on every commit to main branch
- **Manual**: Via Actions tab > "Deploy to GitHub Pages" > "Run workflow"

### Permissions
The workflow has:
- `contents: read` - Read repository files
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - Required for OIDC authentication

### Deployment Process
1. Checkout repository code
2. Configure GitHub Pages settings
3. Upload all files as an artifact
4. Deploy artifact to GitHub Pages environment

## Next Steps

After your site is live:
1. Share the URL: `https://Niang-04.github.io/T/`
2. Customize the game URLs and codes in `script.js`
3. Test all 12 monthly tiles to ensure they work correctly
4. Any future commits to `main` will automatically redeploy the site
