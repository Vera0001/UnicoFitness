// Course filtering and search functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');
const searchInput = document.getElementById('course-search');
const expandButtons = document.querySelectorAll('.expand-btn');

// Filter courses by level
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const level = button.dataset.level;
        
        // Filter courses
        courseCards.forEach(card => {
            if (level === 'all' || card.dataset.level === level) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    courseCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Expand/collapse course details
expandButtons.forEach(button => {
    button.addEventListener('click', () => {
        const details = button.nextElementSibling;
        const isHidden = details.classList.contains('hidden');
        
        details.classList.toggle('hidden');
        button.textContent = isHidden ? 'Hide Details' : 'Show Details';
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize any course-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Update copyright year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});