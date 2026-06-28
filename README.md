# GitHub Profile Viewer

A modern, responsive GitHub profile page that fetches and displays real GitHub user data using the GitHub API.

## Features

✨ **Modern Design**
- Dark theme inspired by GitHub's modern interface
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Beautiful gradient background

📊 **User Profile Information**
- Avatar display
- Name, username, and bio
- Location and company
- Join date and last update date
- Twitter and blog links (if available)

📈 **Statistics**
- Followers count
- Following count
- Public repositories count
- Public gists count

🗂️ **Repository Listing**
- Displays recent repositories sorted by stars
- Repository description
- Programming language with color coding
- Stars and forks count
- License information
- Pagination support (load more button)
- Click repository card to open on GitHub

🔍 **Search Functionality**
- Search for any GitHub user
- Direct link to user's GitHub profile
- Error handling for non-existent users

## How to Use

1. **Open in Browser**: Simply open `index.html` in your web browser

2. **Search for a User**:
   - Enter a GitHub username in the search box
   - Click "Search" or press Enter
   - View the user's profile information and repositories

3. **View Your Own Profile**:
   - Leave the search box empty
   - Click "Search" to view your own profile (requires GitHub API authentication token)

4. **Load More Repositories**:
   - Click the "Load More" button at the bottom to see additional repositories

## Setup (Optional)

### Using with Authentication (Higher API Rate Limits)

To increase API rate limits from 60 to 5000 requests per hour:

1. Create a GitHub Personal Access Token:
   - Go to https://github.com/settings/tokens
   - Create a new token (no specific scopes needed)
   - Copy the token

2. Modify `script.js` - Find the fetch headers and add:
   ```javascript
   headers: {
       'Accept': 'application/vnd.github.v3+json',
       'Authorization': 'token YOUR_TOKEN_HERE'
   }
   ```

### Running Locally

- **Using Python**:
  ```bash
  python -m http.server 8000
  ```
  Then visit `http://localhost:8000`

- **Using Node.js http-server**:
  ```bash
  npx http-server
  ```

- **Using VS Code Live Server**:
  - Install the "Live Server" extension
  - Right-click `index.html` and select "Open with Live Server"

## API Information

- Uses the public GitHub API: `https://api.github.com`
- **Rate Limit** (unauthenticated): 60 requests per hour
- **Rate Limit** (authenticated): 5000 requests per hour
- No authentication required for public user data

## Customization

### Change Theme Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #0969da;
    --background-color: #0d1117;
    /* ... other colors ... */
}
```

### Add More Language Colors

Edit the `LANGUAGE_COLORS` object in `script.js`:

```javascript
const LANGUAGE_COLORS = {
    'YourLanguage': '#hexcolor',
    // ...
};
```

### Change Repositories Per Page

In `script.js`, modify:

```javascript
const reposPerPage = 6; // Change this number
```

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Limitations

- Displays only **public** profile information and repositories
- API rate limited to 60 requests/hour without authentication
- First 6 most-starred repositories are shown by default
- Uses GitHub's public API endpoints

## License

This project is open source and available under the MIT License.

## Credits

Built with ❤️ using the GitHub API
