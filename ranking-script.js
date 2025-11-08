/**
 * ranking-script.js
 * Yeh code ranking table ke data ko JavaScript ki madad se
 * har 10 seconds mein automatically update karta hai.
 */

// 1. Ranking Table ka Data (Initial Values)
let rankings = [
    { title: "BGMI", players: 3400000, trend: 1, lastChange: 0 },
    { title: "VALORANT", players: 2800000, trend: 0, lastChange: 0 },
    { title: "Free Fire", players: 2500000, trend: -1, lastChange: 0 },
    { title: "Minecraft", players: 1900000, trend: 2, lastChange: 0 }
];

// 2. HTML Table Body ka Element
const rankingBody = document.getElementById('liveRankingBody');

// 3. Update Function
function updateRankings() {
    // Player count aur trend ko randomly badalte hain
    rankings = rankings.map(game => {
        // Player count mein 1% ka random badlav
        const changePercentage = (Math.random() * 0.01 - 0.005); // -0.5% to +0.5%
        game.players = Math.round(game.players * (1 + changePercentage));

        // Trend (up, down, stable) ko randomly badalte hain
        if (Math.random() < 0.2) { // 20% chance of trend change
            game.trend = Math.floor(Math.random() * 5) - 2; // -2 to +2 change
        }
        
        // Player count ko 50000 ke multiple mein rakhte hain (clean look ke liye)
        game.players = Math.round(game.players / 50000) * 50000;

        return game;
    });

    // Players ke hisaab se rankings ko sort karte hain (Descending Order)
    rankings.sort((a, b) => b.players - a.players);

    // HTML Table ko naye data se render (update) karte hain
    let htmlContent = '';
    rankings.forEach((game, index) => {
        const rank = index + 1;
        
        let trendIcon = '';
        let trendClass = 'stable';
        let trendText = 'Stable';

        if (game.trend > 0) {
            trendIcon = '<i class="fas fa-arrow-up"></i>';
            trendClass = 'up';
            trendText = `+${Math.abs(game.trend)} Rank`;
        } else if (game.trend < 0) {
            trendIcon = '<i class="fas fa-arrow-down"></i>';
            trendClass = 'down';
            trendText = `${Math.abs(game.trend)} Rank`;
        } else {
            trendIcon = '<i class="fas fa-equals"></i>';
        }

        // Players ko comma separated format mein badalte hain (e.g., 3,400,000)
        const formattedPlayers = game.players.toLocaleString('en-IN');
        
        htmlContent += `
            <tr>
                <td>${rank}</td>
                <td><strong>${game.title}</strong></td>
                <td class="${trendClass}">${trendIcon} ${trendText}</td>
                <td>${formattedPlayers}</td>
            </tr>
        `;
    });

    // Table body mein naya HTML dalte hain
    if (rankingBody) {
        rankingBody.innerHTML = htmlContent;
    }
    
    // Last Update time ko bhi update karte hain
    const now = new Date();
    const lastUpdateElement = document.querySelector('.last-update');
    if (lastUpdateElement) {
        lastUpdateElement.innerHTML = `*Data updates automatically every 10 seconds. Last Updated: ${now.toLocaleTimeString('en-IN')}`;
    }
}

// Initial call to load data when page loads
updateRankings();

// Set up interval to update rankings every 10 seconds (10000 milliseconds)
setInterval(updateRankings, 10000);
// --- NEW SEARCH FUNCTION START ---
function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    
    // Agar search bar khali hai, toh kuch na karein
    if (query === "") {
        alert("Kripya search karne ke liye kuch likhein.");
        return;
    }

    // Keyword aur corresponding section ID ki mapping
    const searchMap = {
        "news": "news",
        "update": "news",
        "guide": "guides",
        "tip": "guides",
        "pro": "guides",
        "schedule": "schedule",
        "tournament": "schedule",
        "rank": "rankings",
        "ranking": "rankings",
        "video": "video-trailer",
        "trailer": "video-trailer",
        "gallery": "gallery",
        "contact": "contact-us",
        "community": "community",
        "about": "about" // About page link
    };

    let targetSection = null;

    // Search query ko map se check karte hain
    for (const keyword in searchMap) {
        if (query.includes(keyword)) {
            targetSection = searchMap[keyword];
            break;
        }
    }

    if (targetSection) {
        if (targetSection === "about") {
            // Agar 'about' keyword mila, toh about.html par jaate hain
            window.location.href = "about.html";
        } else {
            // Baaki keywords ke liye index.html ke section par scroll karte hain
            window.location.href = "index.html#" + targetSection;
        }
    } else {
        // Agar koi keyword match na ho
        alert(`"${query}" ke liye koi section nahi mila. Kripya naye keywords try karein (jaise: News, Guide, Schedule, Contact, About).`);
    }
}
// --- NEW SEARCH FUNCTION END ---
