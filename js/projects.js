async function getGitHubProjects(username) {
  try {
    const response = await fetch(`https://api.github.com/users/Arioch3d/repos?sort=updated&per_page=6`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    // Map the data to only the fields you likely need
    return data.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
    }));
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}