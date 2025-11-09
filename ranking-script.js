/**
 * ranking-script.js
 * FINAL CODE: Contains all dynamic features.
 */

// --- 1. RANKING MANAGEMENT CODE ---

let rankings = [
    { title: "BGMI", players: 3400000, trend: 1, lastChange: 0 },
    { title: "VALORANT", players: 2800000, trend: 0, lastChange: 0 },
    { title: "Free Fire", players: 2500000, trend: -1, lastChange: 0 },
    { title: "Minecraft", players: 1900000, trend: 2, lastChange: 0 }
];

const rankingBody = document.getElementById('liveRankingBody');

function updateRankings() {
    rankings = rankings.map(game => {
        const changePercentage = (Math.random() * 0.01 - 0.005); 
        game.players = Math.round(game.players * (1 + changePercentage));
        if (Math.random() < 0.2) { 
            game.trend = Math.floor(Math.random() * 5) - 2; 
        }
        game.players = Math.round(game.players / 50000) * 50000;
        return game;
    });

    rankings.sort((a, b) => b.players - a.players);

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

updateRankings();
setInterval(updateRankings, 10000);

// --- 2. DYNAMIC GALLERY MANAGEMENT ---

const gameList = [
    { name: "BGMI Game", src: "bgmi.jpg", url: "https://www.battlegroundsmobileindia.com/" },
    { name: "Valorant Game", src: "valorant.jpg", url: "https://playvalorant.com/en-us/" },
    { name: "Minecraft Game", src: "minecraft.jpg", url: "https://www.minecraft.net/en-us" },
    { name: "GTA Game", src: "gta.jpg", url: "https://www.rockstargames.com/gta-v" },
    { name: "FIFA Game", src: "fifa.jpg", url: "https://www.ea.com/games/ea-sports-fc/fc-24" },
    { name: "Fortnite Game", src: "fortnite.jpg", url: "https://www.fortnite.com/" }
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

loadGallery();


// --- 3. SEARCH FUNCTION CODE ---

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (query === "") {
        alert("Please enter something to search.");
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
        alert(`No section found for "${query}". Please try different keywords.`);
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

setupCountdown("Nov 15, 2025 19:00:00 GMT+0530", "bgmi-timer");
setupCountdown("Nov 22, 2025 16:30:00 GMT+0530", "valorant-timer");


// --- 5. BACK TO TOP BUTTON LOGIC ---

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const button = document.getElementById("backToTopBtn");
    // Show button if scrolled more than 20px
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}


// --- 6. THEME TOGGLE (WITH LOCAL STORAGE MEMORY) ---

// Function to check and apply saved theme on load (IIFE removed for about.html compatibility)
function checkSavedTheme() { 
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const button = document.getElementById('themeToggle');
    
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        
        // This check ensures we don't crash on about.html which doesn't have the button
        if (button) { 
            const icon = button.querySelector('i');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            button.title = "Switch to Dark Mode";
        }
    }
}

// Function to handle theme toggle click
function toggleTheme() {
    const body = document.body;
    const button = document.getElementById('themeToggle');
    const icon = button.querySelector('i');

    body.classList.toggle('light-mode');
    
    // Save theme choice to Local Storage
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }

    if (body.classList.contains('light-mode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        button.title = "Switch to Dark Mode";
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        button.title = "Switch to Light Mode";
    }
}


// --- 7. MOBILE MENU TOGGLE ---
// Note: This function is only used on index.html but must remain here for the script to load correctly.

function toggleMenu() {
    const nav = document.getElementById('mainNav');
    // Toggle the 'active' class to show/hide the menu
    nav.classList.toggle('active');
}


// --- 8. COOKIE CONSENT LOGIC ---

document.addEventListener('DOMContentLoaded', (event) => {
    // Show banner if cookies haven't been accepted
    if (localStorage.getItem('cookiesAccepted') !== 'yes') {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.style.display = 'block';
        }
    }
});

function acceptCookieConsent() {
    const banner = document.getElementById('cookieConsent');
    if (banner) {
        banner.style.display = 'none'; // Hide banner
    }
    // Set flag in Local Storage
    localStorage.setItem('cookiesAccepted', 'yes');
}


// --- 9. DYNAMIC FOOTER YEAR LOGIC ---
// Note: This logic is also included in about.html's internal script for redundancy, but the main file is cleaner this way.

document.addEventListener('DOMContentLoaded', () => {
    // Set the current year for the copyright notice
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
});
