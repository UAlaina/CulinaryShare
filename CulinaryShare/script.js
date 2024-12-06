//home page
// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Video background functionality
    const videoContainer = document.getElementById('videoContainer');
    const closeBtn = document.getElementById('closeBtn');
    
    // Close the video when the close button is clicked
    closeBtn.addEventListener('click', function () {
        videoContainer.style.display = 'none';
    });

    // Event listener for recipe cards to view the recipe
    const viewRecipeBtns = document.querySelectorAll('.view-recipe-btn');
    viewRecipeBtns.forEach(button => {
        button.addEventListener('click', function () {
            const recipeUrl = this.closest('.recipe-card').getAttribute('data-url');
            window.location.href = recipeUrl;
        });
    });

    // Search functionality for recipes
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const recipeCards = document.querySelectorAll('.recipe-card');
        
        recipeCards.forEach(card => {
            const recipeTitle = card.querySelector('h3').textContent.toLowerCase();
            if (recipeTitle.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});



//recipes page
document.addEventListener('DOMContentLoaded', function () {
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const recipeCards = document.querySelectorAll('.recipe-card');
        
        recipeCards.forEach(card => {
            const recipeTitle = card.querySelector('.recipe-title').textContent.toLowerCase();
            if (recipeTitle.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Sorting functionality (A-Z and Popularity)
    const sortSelect = document.querySelector('select');
    sortSelect.addEventListener('change', function () {
        const sortValue = sortSelect.value;
        const recipeGrid = document.querySelector('.recipe-grid');
        const recipeCards = Array.from(recipeGrid.getElementsByClassName('recipe-card'));
        
        if (sortValue === 'A-Z') {
            // Sort by title (A-Z)
            recipeCards.sort((a, b) => {
                const titleA = a.querySelector('.recipe-title').textContent.toLowerCase();
                const titleB = b.querySelector('.recipe-title').textContent.toLowerCase();
                return titleA.localeCompare(titleB);
            });
        } else if (sortValue === 'Most Popular') {
            // Sort by time (ascending)
            recipeCards.sort((a, b) => {
                const timeA = parseInt(a.querySelector('.recipe-time').textContent);
                const timeB = parseInt(b.querySelector('.recipe-time').textContent);
                return timeA - timeB;
            });
        }
        
        // Reorder recipe cards in the grid
        recipeCards.forEach(card => {
            recipeGrid.appendChild(card);
        });
    });
});


// Shared Function: Update Navigation
function updateNavigation() {
    const loggedInUser = sessionStorage.getItem('user');
    const navLinks = document.querySelector('.nav-links');

    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        const userName = user?.username || 'Guest';
        navLinks.innerHTML = `
            <a href="home.html">Home</a>
            <a href="recipes.html">Recipes</a>
            <a href="about.html">About Us</a>
            <a href="#" id="logout">Logout (${userName})</a>
        `;

        // Handle logout
        const logoutLink = document.getElementById('logout');
        logoutLink.addEventListener('click', function () {
            sessionStorage.removeItem('user');
            alert('You have logged out.');
            updateNavigation();
            window.location.href = 'home.html';
        });
    } else {
        navLinks.innerHTML = `
            <a href="home.html">Home</a>
            <a href="recipes.html">Recipes</a>
            <a href="about.html">About Us</a>
            <a href="login.html">Login</a>
            <a href="register.html">Register</a>
        `;
    }
}

// Register Page Script
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('registerForm')) {
        const registerForm = document.getElementById('registerForm');
        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();

            if (!username || !email || !password || !confirmPassword) {
                alert('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            const user = { username, email, password };
            localStorage.setItem('user', JSON.stringify(user));

            alert('Registration successful! You can now log in.');
            window.location.href = 'login.html';
        });
    }

    updateNavigation();
});

// Login Page Script
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('login-form')) {
        const loginForm = document.getElementById('login-form');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                alert('Please fill in all fields.');
                return;
            }

            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser && storedUser.email === email && storedUser.password === password) {
                sessionStorage.setItem('user', JSON.stringify(storedUser));
                alert(`Welcome back, ${storedUser.username}!`);
                window.location.href = 'home.html';
            } else {
                alert('Invalid email or password.');
            }
        });
    }
    updateNavigation();
});

//cookie

// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}

// Function to get a cookie by name
function getCookie(name) {
    const nameEq = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEq) === 0) {
            return cookie.substring(nameEq.length, cookie.length);
        }
    }
    return null;
}

// Function to check if cookie exists and show a message
function checkCookie() {
    const user = getCookie("username");
    if (user != "") {
        alert("Welcome back, " + user);
    } else {
        // If cookie doesn't exist, ask for the user's name and set it in the cookie
        const username = prompt("Please enter your name:");
        if (username != "" && username != null) {
            setCookie("username", username, 30); // Store for 30 days
            alert("Welcome, " + username);
        }
    }
}

// Run checkCookie on page load
window.onload = checkCookie;
