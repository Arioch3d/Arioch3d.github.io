async function getGitHubProjects(username) {
  try {
    const response = await fetch(`https://api.github.com/users/Arioch3d/repos?sort=updated`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();

    return data.map(repo => repo.fork === false ? {
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
    } : null).filter(repo => repo !== null);
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

async function populateProjects() {
  const projects = await getGitHubProjects('Arioch3d');
  const container = document.getElementById('projects-container');

  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = '<p>No projects found.</p>';
    return;
  }

  projects.forEach(repo => {
    const card = document.createElement('div');
    card.className = 'repo-card';
    card.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description || 'No description provided.'}</p>
      <p>⭐ ${repo.stars} ${repo.language ? '• ' + repo.language : ''}</p>
      <a href="${repo.url}" target="_blank" rel="noopener">View on GitHub</a>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', populateProjects);
