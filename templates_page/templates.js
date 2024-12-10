document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('#tabs button');
    const grid = document.getElementById('portfolio-grid');
    const items = document.querySelectorAll('.portfolio-item');

    function filterItems(category) {
        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.classList.remove('hidden');
                item.classList.add('fade-in-scale');
            } else {
                item.classList.add('hidden');
                item.classList.remove('fade-in-scale');
            }
        });

        // Force reflow to ensure smooth animation
        void grid.offsetWidth;

        // Move visible items to the start
        const visibleItems = Array.from(items).filter(item => !item.classList.contains('hidden'));
        visibleItems.forEach(item => grid.appendChild(item));
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterItems(tab.dataset.category);
        });
    });

    // Show all items initially
    filterItems('all');
});


// Select all buttons with the class 'templates_tab_list'
const buttons = document.querySelectorAll('.templates_tab_list');

// Loop through each button and add an event listener
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));

    // Add 'active' class to the clicked button
    button.classList.add('active');
  });
});
