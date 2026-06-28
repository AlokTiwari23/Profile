# Alok Tiwari - Portfolio Website

A modern, responsive personal portfolio website showcasing Alok Tiwari's GitHub projects and professional information.

## Features

✨ **Modern Design**
- Dark theme inspired by GitHub's interface
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Beautiful gradient background

👤 **Personal Information**
- Name: Alok Tiwari
- Location: Gorakhpur
- Education: IIT Madras
- Contact email: 24f2007304@ds.study.iitm.ac.in
- Phone: +91 6388562472

📊 **About Section**
- Location and education details
- Development focus and passion
- Personal biography

🗂️ **Project Showcase**
- Recent GitHub repositories from AlokTiwari23
- Repository descriptions
- Programming language indicators with color coding
- Stars and forks count
- License information
- Pagination support (load more button)
- Clickable repository cards

📧 **Contact Information**
- College email with mailto link
- Phone number with tel link
- Direct GitHub profile link

## How to Use

1. **Open in Browser**: Simply open `index.html` in your web browser
2. **Navigation**: Use the sticky navigation bar to scroll to different sections
3. **Load Projects**: The page automatically loads GitHub repositories
4. **View More**: Click "Load More" to see additional projects

## File Structure

```
├── index.html          # Main HTML file with page structure
├── styles.css          # Responsive CSS styling
├── script.js           # GitHub API integration and repository loading
└── README.md          # This file
```

## Setup (Local Development)

### Using Python
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`

### Using Node.js http-server
```bash
npx http-server
```

### Using VS Code Live Server
- Install the "Live Server" extension
- Right-click `index.html` and select "Open with Live Server"

## API Information

- Uses the public GitHub API: `https://api.github.com`
- **Rate Limit** (unauthenticated): 60 requests per hour
- **Rate Limit** (authenticated): 5000 requests per hour
- No authentication required for public user data

## Customization

### Update Personal Information

Edit the HTML in `index.html`:
- Change name in hero section (`.name`)
- Update bio in about section (`.about-text`)
- Modify contact information in contact section

### Change GitHub Username

In `script.js`, modify:
```javascript
const GITHUB_USERNAME = 'AlokTiwari23'; // Change this
```

### Add Authentication (Higher Rate Limits)

For authenticated API access, modify `script.js` and add to fetch headers:
```javascript
'Authorization': 'token YOUR_GITHUB_TOKEN'
```

Get a token from: https://github.com/settings/tokens

### Customize Colors

Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0969da;
    --background-color: #0d1117;
    /* ... other colors ... */
}
```

### Add Language Colors

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

## Sections

### Navigation
- Sticky header with navigation links
- Links to Profile, About, and Contact sections

### Hero Section
- Large personalized greeting
- Professional tagline
- Call-to-action buttons

### About Section
- Key information cards (Location, Education, Focus, Passion)
- Personal biography

### Projects Section
- GitHub repositories showcase
- Repository metadata display
- Load more functionality

### Contact Section
- Email (clickable mailto link)
- Phone (clickable tel link)
- GitHub profile link

## Performance

- Optimized images and resources
- Lazy loading of repositories
- Smooth CSS animations
- Fast GitHub API calls

## Deployment

This website can be deployed to:
- **GitHub Pages**: Push to gh-pages branch
- **Netlify**: Connect repository and auto-deploy
- **Vercel**: Connect GitHub repo for auto-deployment
- **Any static hosting**: AWS S3, Azure Static Web Apps, etc.

## Limitations

- Displays only **public** profile information
- Shows only **public** repositories
- API rate limited to 60 requests/hour without authentication
- Initially shows most-starred repositories

## Future Enhancements

- [ ] Add skills/technologies section
- [ ] Integration with blog
- [ ] Dark/Light theme toggle
- [ ] Animated scroll effects
- [ ] Project filtering by language
- [ ] Blog post display from GitHub

## License

This project is open source and available under the MIT License.

## Contact

- **Email**: 24f2007304@ds.study.iitm.ac.in
- **Phone**: +91 6388562472
- **GitHub**: https://github.com/AlokTiwari23
- **Location**: Gorakhpur

---

Built with ❤️ by Alok Tiwari

