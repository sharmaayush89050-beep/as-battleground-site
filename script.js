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

// Slideshow ka code yahaan se hata diya gaya hai.
