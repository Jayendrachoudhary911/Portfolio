// Get the button
let mybutton = document.getElementById("scrollToTopBtn");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}



// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

<<<<<<< HEAD
//this is for side bar

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");

    if (sidebar.style.width === "100%") {
        sidebar.style.width = "0";
        mainContent.style.marginLeft = "0";
    } else {
        sidebar.style.width = "100%";
        mainContent.style.marginLeft = "0";
    }
}
=======


//this is for plan forms

document.getElementById('closeBtn').addEventListener('click', function() {
    var banner = document.getElementById('banner');
    banner.style.display = 'none';
    
    var header = document.getElementById('header');
    header.style.marginTop = '0';
  });
  
>>>>>>> 3679ada2e39bbb631673db0c7a298e8c857b8bd4
