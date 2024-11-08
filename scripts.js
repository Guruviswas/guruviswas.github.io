// Smooth Scroll and Scroll Direction Detection with Throttle and Active Link Highlighting

let lastScrollTop = 0; // To keep track of the last scroll position
let isScrolling = false; // Flag to prevent too many events from firing at once

// Throttle scroll event for performance
window.addEventListener('scroll', function() {
    if (isScrolling) return;
    isScrolling = true;

    requestAnimationFrame(() => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Check if user is scrolling up or down
        if (currentScroll < lastScrollTop) {
            // Scrolling up
            document.body.classList.add('scrolling-up');
            document.body.classList.remove('scrolling-down');
        } else {
            // Scrolling down
            document.body.classList.add('scrolling-down');
            document.body.classList.remove('scrolling-up');
        }

        // Update active nav link
        updateActiveLink(currentScroll);

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll values
        isScrolling = false;
    });
}, false);

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Get the target section ID
        const targetElement = document.getElementById(targetId);
        
        // Offset for fixed navbar height if necessary
        const offset = 70; // Adjust this to your navbar height
        const targetPosition = targetElement.offsetTop - offset;

        // Smooth scroll animation to the target section
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Function to update the active link based on scroll position
function updateActiveLink(currentScroll) {
    document.querySelectorAll('nav a').forEach(anchor => {
        const targetId = anchor.getAttribute('href').substring(1); // Get the section ID from the link
        const section = document.getElementById(targetId);

        // Check if the section is currently in view
        if (section.offsetTop <= currentScroll + 100 && section.offsetTop + section.offsetHeight > currentScroll + 100) {
            anchor.classList.add('active');
        } else {
            anchor.classList.remove('active');
        }
    });


    // Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav ul');

// Toggle the navigation menu when the hamburger icon is clicked
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.id = 'scroll-progress';
document.body.appendChild(scrollProgress);

// Update scroll progress as the user scrolls
window.onscroll = function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById("scroll-progress").style.width = scrollPercent + "%";
};

// Optional: Ensure the progress bar updates as the page is loaded (if scrolled already)
window.onload = function () {
    window.onscroll(); // Trigger the scroll event handler to initialize progress
};

}
