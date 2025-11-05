// --- DYNAMIC TIME-BASED GREETING FUNCTION ---
function updateGreeting() {
    const today = new Date();
    const hour = today.getHours();
    let greeting;

    // Time ke hisaab se greeting set karein
    if (hour < 12) {
        greeting = "🌅 Good Morning, Gamer! Let's get the battle started.";
    } else if (hour < 17) {
        greeting = "☀️ Good Afternoon! Time for some intense gaming.";
    } else {
        greeting = "🌙 Good Evening! Time to log in and grind.";
    }

    // Heading element ko update karein
    const welcomeHeading = document.getElementById('welcome-heading');
    if (welcomeHeading) {
        // Heading ko naye greeting se update karein
        welcomeHeading.textContent = greeting; 
    }
}

// Function to handle the search action (Real Filter Feature)
function performSearch() {
    let searchText = document.getElementById('searchInput').value.toLowerCase().trim();
    let articles = document.getElementsByTagName('article');
    let found = false;

    if (searchText === "") {
        // Agar search bar khaali hai, toh saare articles dikhayein
        for (let i = 0; i < articles.length; i++) {
            articles[i].style.display = 'block';
        }
        return;
    }

    // Har Article ko check karein
    for (let i = 0; i < articles.length; i++) {
        let article = articles[i];
        
        // Article ka poora text lein aur chota (lowercase) karein
        let articleText = article.innerText.toLowerCase();

        // Check karein ki search text article mein hai ya nahi
        if (articleText.includes(searchText)) {
            // Agar milta hai toh dikhayein (unhide)
            article.style.display = 'block';
            found = true;
        } else {
            // Agar nahi milta hai toh chhipa dein (hide)
            article.style.display = 'none';
        }
    }

    // Agar kuch nahi mila toh user ko batayein
    if (!found) {
        alert("Maaf kijiye, '" + searchText + "' se related koi article nahi mila. Search bar ko khaali karke dobara SEARCH dabayein.");
    }
}

// Page load hote hi greeting function ko call karein
window.onload = function() {
    updateGreeting();
}
