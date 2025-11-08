// ======================================
// DYNAMIC GREETING FUNCTION
// ======================================

function updateGreeting() {
    const greetingElement = document.getElementById('welcome-heading');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let greeting;

    if (hour >= 5 && hour < 12) {
        greeting = '☀️ Good Morning, Gamer! 🔥';
    } else if (hour >= 12 && hour < 17) {
        greeting = '☕ Good Afternoon, Legend! 🏆';
    } else if (hour >= 17 && hour < 22) {
        greeting = '🌙 Good Evening, Warrior! 🚀';
    } else {
        greeting = '✨ Late Night Gaming? Welcome! 🎮';
    }

    greetingElement.textContent = greeting;
}

// ======================================
// SEARCH/FILTER FUNCTION
// ======================================

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    
    // Simple alert for demonstration (as actual search functionality is complex)
    if (query.trim() !== '') {
        alert(`Searching for: "${query}". \n\n(In a real site, this would filter articles or redirect to a search results page.)`);
    } else {
        alert("Please enter a search term.");
    }
}

// ======================================
// NEW FEATURE: LIVE RANKING SIMULATOR
// (This simulates real-time data fetching)
// ======================================

function loadLiveRankings() {
    const rankings = [
        { rank: 1, title: 'BGMI', trend: 'up', trendText: '+1 Rank', players: '3.4 Million' },
        { rank: 2, title: 'VALORANT', trend: 'stable', trendText: 'Stable', players: '2.8 Million' },
        { rank: 3, title: 'Free Fire', trend: 'down', trendText: '-1 Rank', players: '2.5 Million' },
        { rank: 4, title: 'Minecraft', trend: 'up', trendText: '+2 Ranks', players: '1.9 Million' },
        { rank: 5, title: 'Apex Legends', trend: 'stable', trendText: 'Stable', players: '1.5 Million' }
    ];

    const tbody = document.getElementById('liveRankingBody');
    if (!tbody) return;

    // Clear existing content
    tbody.innerHTML = '';

    rankings.forEach(game => {
        const row = document.createElement('tr');
        
        // Trend Icon based on status
        let iconClass = '';
        if (game.trend === 'up') {
            iconClass = 'fas fa-arrow-up';
        } else if (game.trend === 'down') {
            iconClass = 'fas fa-arrow-down';
        } else {
            iconClass = 'fas fa-equals';
        }

        row.innerHTML = `
            <td>${game.rank}</td>
            <td>**${game.title}**</td>
            <td class="${game.trend}"><i class="${iconClass}"></i> ${game.trendText}</td>
            <td>${game.players}</td>
        `;
        tbody.appendChild(row);
    });

    // Update the last updated time to give a "live" feel
    const lastUpdateElement = document.querySelector('.last-update');
    if (lastUpdateElement) {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        const formattedDate = now.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
        lastUpdateElement.textContent = `*Data based on community engagement and server load. Last Updated: ${formattedDate} at ${formattedTime}.`;
    }
}

// ======================================
// INITIALIZATION ON PAGE LOAD
// ======================================

document.addEventListener('DOMContentLoaded', () => {
    updateGreeting(); 
    loadLiveRankings(); // Load rankings when the page is fully loaded
    
    // Simulate LIVE updates every 30 seconds (for a truly dynamic feel)
    // Note: In a real site, this would fetch new data from an API.
    setInterval(loadLiveRankings, 30000); 
});
