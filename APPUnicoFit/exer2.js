function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    sidebar.classList.toggle('hide'); // Add/remove the hide class
    content.classList.toggle('shifted'); // Add/remove the shifted class for content
}

// JavaScript for sliding images
let index = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
    // Hide all slides
    slides.forEach((slide) => {
        slide.classList.remove('show');
    });
    // Show the current slide
    slides[index].classList.add('show');
    // Update index and loop back to the start if necessary
    index = (index + 1) % slides.length;
}

// Initialize the slider
document.addEventListener('DOMContentLoaded', () => {
    showSlides(); // Show the first slide initially
    setInterval(showSlides, 3000); // Change slides every 3 seconds
});
