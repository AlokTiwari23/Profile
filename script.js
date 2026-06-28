// GitHub API endpoints
const GITHUB_API = 'https://api.github.com';

// Language colors mapping
const LANGUAGE_COLORS = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C': '#555555',
    'C#': '#239120',
    'Ruby': '#cc342d',
    'PHP': '#777bb4',
    'Go': '#00add8',
    'Rust': '#ce422b',
    'Swift': '#fa7343',
    'Kotlin': '#7f52ff',
    'Shell': '#89e051',
    'CSS': '#563d7c',
    'HTML': '#e34c26',
    'Vue': '#2c3e50',
    'React': '#61dafb',
    'SQL': '#336791',
    'YAML': '#cb171e'
};

let currentUser = null;
let repoPage = 1;
const reposPerPage = 6;

// DOM Elements
const usernameInput = document.getElementById('username-input');
const searchBtn = document.getElementById('search-btn');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const profileElement = document.getElementById('profile');
const loadMoreBtn = document.getElementById('load-more-repos');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

loadMoreBtn.addEventListener('click', loadMoreRepositories);

// Initialize
window.addEventListener('load', () => {
    // Try to load user's own profile if authenticated
    loadDefaultProfile();
});

async function loadDefaultProfile() {
    try {
        const response = await fetch(`${GITHUB_API}/user`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (response.status === 401 || response.status === 403) {
            // Not authenticated, prompt for username
            return;
        }
        
        if (response.ok) {
            const userData = await response.json();
            displayProfile(userData);
            loadRepositories(userData.login, true);
        }
    } catch (error) {
        console.log('Could not load authenticated user profile');
    }
}

async function handleSearch() {
    const username = usernameInput.value.trim();
    
    if (!username) {
        showError('Please enter a GitHub username');
        return;
    }

    repoPage = 1;
    await fetchUserProfile(username);
}

async function fetchUserProfile(username) {
    showLoading(true);
    hideError();

    try {
        // Fetch user profile
        const userResponse = await fetch(`${GITHUB_API}/users/${username}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (userResponse.status === 404) {
            showError(`User "${username}" not found on GitHub`);
            showLoading(false);
            return;
        }

        if (!userResponse.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const userData = await userResponse.json();
        currentUser = userData;
        displayProfile(userData);
        loadRepositories(username, true);

    } catch (error) {
        showError(`Error: ${error.message}`);
        showLoading(false);
    }
}

function displayProfile(user) {
    // Header Info
    document.getElementById('avatar').src = user.avatar_url;
    document.getElementById('avatar').alt = user.login;
    document.getElementById('name').textContent = user.name || user.login;
    document.getElementById('login').textContent = `@${user.login}`;
    document.getElementById('bio').textContent = user.bio || 'No bio provided';
    document.getElementById('profile-link').href = user.html_url;

    // Location and Company
    if (user.location) {
        document.getElementById('location').textContent = user.location;
    } else {
        document.getElementById('location').style.display = 'none';
    }

    if (user.company) {
        document.getElementById('company').textContent = user.company;
    } else {
        document.getElementById('company').style.display = 'none';
    }

    // Stats
    document.getElementById('followers').textContent = formatNumber(user.followers);
    document.getElementById('following').textContent = formatNumber(user.following);
    document.getElementById('repos').textContent = formatNumber(user.public_repos);
    document.getElementById('gists').textContent = formatNumber(user.public_gists);

    // Additional Details
    if (user.twitter_username) {
        document.getElementById('twitter-item').style.display = 'block';
        document.getElementById('twitter').href = `https://twitter.com/${user.twitter_username}`;
        document.getElementById('twitter').textContent = `@${user.twitter_username}`;
    } else {
        document.getElementById('twitter-item').style.display = 'none';
    }

    if (user.blog) {
        document.getElementById('blog-item').style.display = 'block';
        document.getElementById('blog').href = user.blog;
        document.getElementById('blog').textContent = user.blog;
    } else {
        document.getElementById('blog-item').style.display = 'none';
    }

    if (user.created_at) {
        document.getElementById('created').textContent = formatDate(user.created_at);
    }

    if (user.updated_at) {
        document.getElementById('updated').textContent = formatDate(user.updated_at);
    }

    profileElement.style.display = 'block';
    showLoading(false);
}

async function loadRepositories(username, reset = false) {
    if (reset) {
        repoPage = 1;
        document.getElementById('repositories').innerHTML = '';
        loadMoreBtn.style.display = 'none';
    }

    try {
        const perPage = reposPerPage;
        const response = await fetch(
            `${GITHUB_API}/users/${username}/repos?sort=stars&order=desc&per_page=${perPage}&page=${repoPage}`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const repos = await response.json();

        if (repos.length === 0) {
            if (repoPage === 1) {
                document.getElementById('repositories').innerHTML = 
                    '<div class="no-repos">No public repositories found</div>';
            }
            loadMoreBtn.style.display = 'none';
            return;
        }

        // Add repositories to the DOM
        const reposContainer = document.getElementById('repositories');
        repos.forEach(repo => {
            const repoElement = createRepositoryElement(repo);
            reposContainer.appendChild(repoElement);
        });

        // Show load more button if we got a full page of repos
        if (repos.length === reposPerPage) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }

    } catch (error) {
        console.error('Error loading repositories:', error);
    }
}

async function loadMoreRepositories() {
    repoPage++;
    await loadRepositories(currentUser.login, false);
}

function createRepositoryElement(repo) {
    const repoDiv = document.createElement('div');
    repoDiv.className = 'repository';

    const nameLink = document.createElement('a');
    nameLink.href = repo.html_url;
    nameLink.target = '_blank';
    nameLink.className = 'repo-name';
    nameLink.textContent = repo.name;

    const description = document.createElement('p');
    description.className = 'repo-description';
    description.textContent = repo.description || 'No description';

    const meta = document.createElement('div');
    meta.className = 'repo-meta';

    // Language
    if (repo.language) {
        const langDiv = document.createElement('div');
        langDiv.className = 'repo-language';

        const langColor = document.createElement('span');
        langColor.className = 'language-color';
        langColor.style.backgroundColor = LANGUAGE_COLORS[repo.language] || '#858585';

        const langName = document.createElement('span');
        langName.textContent = repo.language;

        langDiv.appendChild(langColor);
        langDiv.appendChild(langName);
        meta.appendChild(langDiv);
    }

    // Stars
    if (repo.stargazers_count > 0) {
        const starsDiv = document.createElement('div');
        starsDiv.className = 'repo-stat';
        starsDiv.innerHTML = `⭐ ${formatNumber(repo.stargazers_count)}`;
        meta.appendChild(starsDiv);
    }

    // Forks
    if (repo.forks_count > 0) {
        const forksDiv = document.createElement('div');
        forksDiv.className = 'repo-stat';
        forksDiv.innerHTML = `🔀 ${formatNumber(repo.forks_count)}`;
        meta.appendChild(forksDiv);
    }

    // License
    if (repo.license) {
        const licenseDiv = document.createElement('div');
        licenseDiv.className = 'repo-stat';
        licenseDiv.textContent = repo.license.name;
        meta.appendChild(licenseDiv);
    }

    repoDiv.appendChild(nameLink);
    repoDiv.appendChild(description);
    repoDiv.appendChild(meta);

    // Open repo in new tab on click
    repoDiv.addEventListener('click', (e) => {
        if (e.target !== nameLink && !e.target.closest('a')) {
            window.open(repo.html_url, '_blank');
        }
    });

    return repoDiv;
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showLoading(show) {
    loadingElement.style.display = show ? 'block' : 'none';
}

function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    profileElement.style.display = 'none';
}

function hideError() {
    errorElement.style.display = 'none';
}
