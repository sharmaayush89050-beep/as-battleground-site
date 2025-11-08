/**
 * ranking-script.js
 * Is file mein sabhi dynamic features ka logic hai:
 * 1. Auto-Updating Rankings
 * 2. Dynamic Gallery (Easy to Add New Games)
 * 3. Functional Search
 * 4. Tournament Countdown Timer
 */

// --- 1. RANKING MANAGEMENT CODE ---

// Ranking Table ka Data (Initial Values)
let rankings = [
    { title: "BGMI", players: 3400000, trend: 1, lastChange: 0 },
    { title: "VALORANT", players: 2800000, trend: 0, lastChange: 0 },
    { title: "Free Fire", players: 2500000, trend: -1, lastChange: 0 },
    { title: "Minecraft", players: 1900000, trend: 2, lastChange: 0 }
];

// HTML Table Body ka Element
const rankingBody = document.getElementById('liveRankingBody');

function updateRankings() {
    // Player count aur trend ko randomly badalte hain
    rankings = rankings.map(game => {
        const changePercentage = (Math.random() * 0.01 - 0.005); 
        game.players = Math.round(game.players * (1 + changePercentage));
        if (Math.random() < 0.2) { 
            game.trend = Math.floor(Math.random() * 5) - 2; 
        }
        game.players = Math.round(game.players / 50000) * 50000;
        return game;
    });

    // Players ke hisaab se rankings ko sort karte hain
    rankings.sort((a, b) => b.players - a.players);

    // HTML Table ko naye data se render karte hain
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

    if (rankingBody) {
        rankingBody.innerHTML = htmlContent;
    }
    
    const now = new Date();
    const lastUpdateElement = document.querySelector('.last-update');
    if (lastUpdateElement) {
        lastUpdateElement.innerHTML = `*Data updates automatically every 10 seconds. Last Updated: ${now.toLocaleTimeString('en-IN')}`;
    }
}

// Initial call and Interval
updateRankings();
setInterval(updateRankings, 10000);

// --- 2. DYNAMIC GALLERY MANAGEMENT ---

const gameList = [
    // Naya game add karne ke liye, sirf ek naya object yahaan likhein!
    { name: "BGMI Game", src: "bgmi.jpg", url: "https://www.battlegroundsmobileindia.com/" },
    { name: "Valorant Game", src: "valorant.jpg", url: "https://playvalorant.com/en-us/" },
    { name: "Minecraft Game", src: "minecraft.jpg", url: "https://www.minecraft.net/en-us" },
    { name: "GTA Game", src: "gta.jpg", url: "https://www.rockstargames.com/gta-v" },
    { name: "FIFA Game", src: "fifa.jpg", url: "https://www.ea.com/games/ea-sports-fc/fc-24" },
    { name: "Fortnite Game", src: "fortnite.jpg", url: "https://www.fortnite.com/" }
    // { name: "Naya Game", src: "naya-game.jpg", url: "https://naya-game-link.com/" }
];

function loadGallery() {
    const galleryContainer = document.getElementById('gameGallery');
    if (!galleryContainer) return; 

    let galleryHTML = '';
    
    gameList.forEach(game => {
        galleryHTML += `
            <a href="${game.url}" target="_blank" title="Play ${game.name}">
                <img src="${game.src}" alt="${game.name}" loading="lazy">
            </a>
        `;
    });
    
    galleryContainer.innerHTML = galleryHTML;
}

// Gallery ko page load hote hi chalaayein
loadGallery();


// --- 3. SEARCH FUNCTION CODE ---

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (query === "") {
        alert("Kripya search karne ke liye kuch likhein.");
        return;
    }

    const searchMap = {
        "news": "news", "update": "news", "guide": "guides", "tip": "guides",
        "schedule": "schedule", "tournament": "schedule", "rank": "rankings", 
        "video": "video-trailer", "trailer": "video-trailer", "gallery": "gallery", 
        "contact": "contact-us", "community": "community", "about": "about" 
    };

    let targetSection = null;

    for (const keyword in searchMap) {
        if (query.includes(keyword)) {
            targetSection = searchMap[keyword];
            break;
        }
    }

    if (targetSection) {
        if (targetSection === "about") {
            window.location.href = "about.html";
        } else {
            window.location.href = "index.html#" + targetSection;
        }
    } else {
        alert(`"${query}" ke liye koi section nahi mila. Kripya naye keywords try karein.`);
    }
}


// --- 4. COUNTDOWN TIMER CODE ---

function setupCountdown(targetDateString, elementId) {
    const targetDate = new Date(targetDateString).getTime();
    const timerElement = document.getElementById(elementId);

    if (!timerElement) return;

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance > 0) {
            timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            timerElement.style.color = '#FFD700'; 
        } else {
            clearInterval(countdownFunction);
            timerElement.innerHTML = "LIVE NOW! (Started)";
            timerElement.style.color = '#25D366'; 
        }
    }, 1000); 
}

// Target Dates: Current year 2025 ke hisaab se set hain (Target Date aur Current Date se automatically calculate hoga)
// BGMI: 15th Nov 2025, 7:00 PM (IST)
setupCountdown("Nov 15, 2025 19:00:00 GMT+0530", "bgmi-timer");

// Valorant: 22nd Nov 2025, 4:30 PM (IST)
setupCountdown("Nov 22, 2025 16:30:00 GMT+0530", "valorant-timer");
