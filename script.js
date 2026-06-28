// GitHub API endpoints
const GITHUB_API = 'https://api.github.com';
const GITHUB_USERNAME = 'AlokTiwari23';

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

let repoPage = 1;
const reposPerPage = 6;

// DOM Elements
const repositoriesContainer = document.getElementById('repositories');
const loadMoreBtn = document.getElementById('load-more-repos');

// Event Listeners
loadMoreBtn.addEventListener('click', loadMoreRepositories);

// Initialize
window.addEventListener('load', () => {
    loadRepositories(GITHUB_USERNAME, true);
});

async function loadRepositories(username, reset = false) {
    if (reset) {
        repoPage = 1;
        repositoriesContainer.innerHTML = '';
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
                repositoriesContainer.innerHTML = 
                    '<div class="no-repos">No public repositories found</div>';
            }
            loadMoreBtn.style.display = 'none';
            return;
        }

        // Add repositories to the DOM
        repos.forEach(repo => {
            const repoElement = createRepositoryElement(repo);
            repositoriesContainer.appendChild(repoElement);
        });

        // Show load more button if we got a full page of repos
        if (repos.length === reposPerPage) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }

    } catch (error) {
        console.error('Error loading repositories:', error);
        if (repoPage === 1) {
            repositoriesContainer.innerHTML = 
                '<div class="no-repos">Could not load repositories</div>';
        }
    }
}

async function loadMoreRepositories() {
    repoPage++;
    await loadRepositories(GITHUB_USERNAME, false);
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
