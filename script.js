// Get the button
let mybutton = document.getElementById("scrollToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


//this is for lazy loading...
let contentDiv = document.getElementById('content');
let loader = document.getElementById('loader');

// Simulate fetching new content
function fetchNewContent() {
    return new Promise((resolve) => {
        setTimeout(() => {
            let newContent = '';
            for (let i = 1; i <= 5; i++) {
                newContent += `<div class="post">New Post ${i}</div>`;
            }
            resolve(newContent);
        }, 1000); // Simulate network delay
    });
}

// Load more content when the user scrolls to the bottom
window.addEventListener('scroll', async () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // Show the loader
        loader.style.display = 'block';

        // Fetch new content
        let newContent = await fetchNewContent();

        // Append new content to the existing content
        contentDiv.insertAdjacentHTML('beforeend', newContent);

        // Hide the loader
        loader.style.display = 'none';
    }
});


//this is for loadedr
document.addEventListener("DOMContentLoaded", function() {
    // When the page is fully loaded, hide the preloader and show the content
    window.onload = function() {
        let preloader = document.getElementById('preloader');
        let content = document.getElementById('content');
        
        preloader.style.display = 'none';
        content.style.display = 'block';
    }
});


document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    fetch('https://script.google.com/macros/s/AKfycbwTt_MVz5hr3_glCJZFtImRqt2OhSxYq0fW1ihQMdQpvcnN5J0Ug9KgGlF9Dlv-OMil/exec', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      if (data === "Success") {
        var popup = document.getElementById('pop');
        popup.classList.add('active');
        setTimeout(() => {
          popup.classList.remove('active');
          document.getElementById('contactForm').reset();
        }, 4000); // Show popup for 4 seconds
      } else {
        alert('There was a problem with the submission. Please try again.');
      }
    })
    .catch(error => console.error('Error:', error));
  });


  document.getElementById('scrollButton').addEventListener('click', function() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});



//this is for plan forms

document.getElementById('closeBtn').addEventListener('click', function() {
    var banner = document.getElementById('banner');
    banner.style.display = 'none';
    
    var header = document.getElementById('header');
    header.style.marginTop = '0';
  });
  