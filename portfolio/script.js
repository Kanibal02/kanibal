/*
  =================================
  Script for fetching the games in portfolio
  Created by: Kanibal (and Gemini)
  Date: [8.07.2025]
  Description: Maybe it was created with AI, and who cares? I'm not a web designer, im a LuaU coder!
  =================================
*/

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://games.roproxy.com/v2/groups/5273762/gamesV2?accessFilter=2&sort=Updated&sortOrder=Desc&limit=50';
    const grid = document.getElementById('portfolio-grid');
    const totalVisitsContainer = document.getElementById('total-visits-container');

    async function fetchAndDisplayPortfolio() {
        grid.innerHTML = '<p class="loading-text">Loading portfolio...</p>';

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            grid.innerHTML = '';
            let totalVisits = 0;

            if (data.data && data.data.length > 0) {
                data.data.forEach(game => {
                    totalVisits += game.placeVisits;

                    const gameCard = document.createElement('div');
                    gameCard.className = 'game-card';
                    gameCard.innerHTML = `
                        <img src="./images/${game.id}.webp" alt="${game.name} Thumbnail" onerror="this.onerror=null;this.src='./images/placeholder.png';">
                        <div class="card-content">
                            <h3>${game.name}</h3>
                            <p class="description">${game.description}</p>
                            <div class="stats">
                                <span class="visits">Visits: ${game.placeVisits.toLocaleString()}</span>
                            </div>
                            <a href="https://www.roblox.com/games/${game.rootPlace.id}/" target="_blank" rel="noopener noreferrer" class="play-button">Play Now</a>
                        </div>
                    `;
                    grid.appendChild(gameCard);
                });
            } else {
                grid.innerHTML = '<p>No active games found on this group.</p>';
            }

            totalVisitsContainer.textContent = `Total Group Game Visits: ${totalVisits.toLocaleString()}`;

        } catch (error) {
            console.error('Failed to fetch portfolio:', error);
            grid.innerHTML = '<p class="error-text">Could not load portfolio. Please try again later.</p>';
        }
    }

    fetchAndDisplayPortfolio();
});