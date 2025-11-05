// Function to handle the search action
function performSearch() {
    // 1. Input field ki value (text) lein
    let searchText = document.getElementById('searchInput').value;
    
    // 2. Value ko chota (lowercase) karein taaki search aasan ho
    searchText = searchText.toLowerCase().trim();

    // 3. Check karein ki user ne kuch likha hai ya nahi
    if (searchText === "") {
        alert("Kripya search karne ke liye kuch likhein!");
        return; // Function ko yahin rok do
    }

    // 4. Ek simple message dikhayein
    alert("Aapne search kiya: '" + searchText + "'. Abhi hum yeh feature develop kar rahe hain!");
    
    // Yahaan par hum future mein real search functionality ka code jodenge.
}

// Existing Slideshow Code (Isko bhi yahi rakhein)
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}
