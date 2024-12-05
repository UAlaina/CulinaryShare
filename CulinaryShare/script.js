// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to each "View the recipe" button
    document.querySelectorAll('.view-recipe-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Get the parent recipe card and extract the URL
            const card = this.closest('.recipe-card');
            const url = card.getAttribute('data-url');
            
            // Check if the URL exists and navigate to it
            if (url) {
                window.location.href = url;
            } else {
                console.log('No URL found for this recipe card');
            }
        });
    });
});







document.querySelector('select').addEventListener('change', (e) => {
    const sortBy = e.target.value;
    const recipeGrid = document.querySelector('.recipe-grid');
    const recipes = Array.from(recipeGrid.children);
    
    if (sortBy === "A-Z") {
        recipes.sort((a, b) => {
            return a.querySelector('.recipe-title').textContent.localeCompare(b.querySelector('.recipe-title').textContent);
        });
    } else if (sortBy === "Most Popular") {
        // Implement logic for most popular (for now, it could be sorted by time as a placeholder)
        recipes.sort((a, b) => {
            return parseInt(a.querySelector('.recipe-time').textContent) - parseInt(b.querySelector('.recipe-time').textContent);
        });
    }
    
    recipeGrid.innerHTML = '';
    recipes.forEach(recipe => recipeGrid.appendChild(recipe));
});