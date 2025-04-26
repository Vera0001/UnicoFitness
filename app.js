// Mobile menu functionality
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// User authentication and streak management
const auth = {
    user: null,
    isLoggedIn: false,
    streak: 0,
    lastLogin: null,

    init() {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            this.user = userData;
            this.isLoggedIn = true;
            this.streak = userData.streak;
            this.lastLogin = new Date(userData.lastLogin);
            this.updateStreak();
        }
    },

    login(username, password) {
        // Simple login logic for demo
        if (username && password) {
            this.user = {
                id: Math.random().toString(36).substr(2, 9),
                username,
                streak: 1,
                lastLogin: new Date()
            };
            this.isLoggedIn = true;
            this.streak = 1;
            this.lastLogin = new Date();
            localStorage.setItem('user', JSON.stringify(this.user));
            return true;
        }
        return false;
    },

    logout() {
        this.user = null;
        this.isLoggedIn = false;
        this.streak = 0;
        this.lastLogin = null;
        localStorage.removeItem('user');
    },

    updateStreak() {
        if (!this.lastLogin) return;

        const today = new Date();
        const lastLogin = new Date(this.lastLogin);
        
        // Reset time parts to compare just the dates
        today.setHours(0, 0, 0, 0);
        lastLogin.setHours(0, 0, 0, 0);
        
        const diffTime = Math.abs(today.getTime() - lastLogin.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            this.streak += 1;
        } else if (diffDays > 1) {
            this.streak = 1;
        }
        
        this.lastLogin = new Date();
        this.user.streak = this.streak;
        this.user.lastLogin = this.lastLogin;
        
        localStorage.setItem('user', JSON.stringify(this.user));
        
        // Update streak display if element exists
        const streakCount = document.getElementById('streak-count');
        if (streakCount) {
            streakCount.textContent = `${this.streak} Day Streak`;
        }
    }
};

// Initialize authentication
auth.init();