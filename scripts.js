// Throttle scroll events for performance and scroll direction detection
let lastScrollTop = 0;
let isScrolling = false;

// Throttle scroll event
window.addEventListener('scroll', () => {
    if (isScrolling) return;
    isScrolling = true;

    requestAnimationFrame(() => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Detect scroll direction
        if (currentScroll < lastScrollTop) {
            document.body.classList.add('scrolling-up');
            document.body.classList.remove('scrolling-down');
        } else {
            document.body.classList.add('scrolling-down');
            document.body.classList.remove('scrolling-up');
        }

        // Update active link in the navbar based on current scroll position
        updateActiveLink(currentScroll);

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll values
        isScrolling = false;
    });
}, false);

function changeHeroImage() {
    const heroSection = document.querySelector('.hero');
    heroSection.style.backgroundImage = `url(${heroImages[currentImageIndex]})`;

    // Fallback: Add console logging for debugging
    console.log(`Setting hero background to: ${heroImages[currentImageIndex]}`);
    currentImageIndex = (currentImageIndex + 1) % heroImages.length;
}

// Array of image URLs for the hero section
const heroImages = [
    "portfolioimages/5b34c8f981c7ec6c5e95500e67301ebb.jpg",
    "portfolioimages/554e9f86d4e6300774cbe2990d0be745.jpg",
    "portfolioimages/4005ff17cd50e22d7834ab907b04ecd2.jpg",
    "portfolioimages/bc622a880ea8dd41611c78348b9f91aa.jpg",
    "portfolioimages/ce948b18a0adc1964b022622f38c8db6.png"
];



let currentImageIndex = 0;

// Function to change the hero background image
function changeHeroImage() {
    const heroSection = document.querySelector('.hero');

    // Add a transition-out effect (fade out)
    heroSection.classList.add('transition-out');

    // Wait for the transition-out to complete, then change the image
    setTimeout(() => {
        // Change the background image
        heroSection.style.backgroundImage = `url(${heroImages[currentImageIndex]})`;

        // Move to the next image in the array
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;

        // Add the transition-in effect (fade in)
        heroSection.classList.remove('transition-out');
        heroSection.classList.add('transition-in');
    }, 1000); // 1000ms timeout to match the transition duration
}

// Change image every 5 seconds
setInterval(changeHeroImage, 5000);

// Set initial image
changeHeroImage();
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
}

window.addEventListener('load', function() {
    document.getElementById("loading").style.display = "none";
    document.getElementById("content").style.display = "block";
});

function debounce(func, wait = 20, immediate = false) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

window.addEventListener('scroll', debounce(() => {
    // Scroll logic here

    const scrollProgress = document.createElement('div');
scrollProgress.id = 'scroll-progress';
document.body.appendChild(scrollProgress);
}));

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.id = 'scroll-progress';
document.body.appendChild(scrollProgress);

// Update scroll progress as the user scrolls
window.onscroll = function () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById("scroll-progress").style.width = scrollPercent + "%";
};

// Optional: Initialize the scroll progress bar if the page is already scrolled
window.onload = function () {
    window.onscroll(); // Trigger the scroll event handler to initialize progress
};
document.addEventListener("DOMContentLoaded", () => {
    const hackingText = document.getElementById("hacking-text");

    // Simulate a hacking effect
    let fullText = "Hi, I'm Guru Viswas";
    let currentText = "";
    let index = 0;

    const typingEffect = setInterval(() => {
        if (index < fullText.length) {
            currentText += fullText.charAt(index);
            hackingText.textContent = currentText;
            index++;
        } else {
            clearInterval(typingEffect);
        }
    }, 100); // Adjust typing speed here
});

function changeHeroImage() {
    const heroSection = document.querySelector('.hero');
    const newImage = new Image();

    // Preload image to avoid flashing or overlapping
    newImage.src = heroImages[currentImageIndex];
    newImage.onload = () => {
        heroSection.style.backgroundImage = `url(${newImage.src})`;
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
    };
}

// Pop-Up Functionality
const openPopupButtons = document.querySelectorAll('.open-popup'); // The buttons to open the pop-up
const popup = document.querySelector('#project-popup'); // Target the popup modal by its ID
const overlay = document.querySelector('.overlay'); // The overlay behind the pop-up

// Function to open the pop-up
function openPopup(event) {
    const projectCard = event.target.closest('.project-card'); // Get the parent project card of the clicked button
    const title = projectCard.getAttribute('data-title');
    const image = projectCard.getAttribute('data-image');
    const description = projectCard.getAttribute('data-description');

    // Set the popup content based on the clicked project card
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-image').src = image;
    document.getElementById('popup-description').textContent = description;

    // Show the popup and overlay
    popup.classList.add('active');
    overlay.classList.add('active');

    console.log("RUN");
}

// Hero Section Cursor Interaction
document.querySelectorAll(".hero-title span").forEach(letter => {
    letter.addEventListener("mousemove", event => {
        const rect = event.target.getBoundingClientRect();
        const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
        const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
        letter.style.transform = `translate(${offsetX * 20}px, ${offsetY * 20}px) scale(1.3)`;
    });

    letter.addEventListener("mouseleave", () => {
        letter.style.transform = "translate(0, 0) scale(1)";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector(".about-container");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible"); // Add animation class
                    observer.unobserve(entry.target); // Stop observing once animation is triggered
                }
            });
        },
        {
            threshold: 0.2, // Trigger when 20% of the section is visible
        }
    );

    observer.observe(aboutSection);
});
window.addEventListener('scroll', function() {
    // Get the About section element
    const aboutContainer = document.querySelector('.about-container');
    
    // Check if the About section is in the viewport
    const rect = aboutContainer.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        aboutContainer.classList.add('visible');
    }
});
const projectsSection = document.querySelector('.projects');
document.addEventListener('DOMContentLoaded', function () {
    const projectsSection = document.querySelector('.projects');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectsSection.classList.add('visible');
            }
        });
    });

    observer.observe(projectsSection);
});
// Function to check if the section is in the viewport
function checkVisibility() {
    const rect = projectsSection.getBoundingClientRect();
    const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
    
    if (isInView) {
        projectsSection.classList.add('visible');
    } else {
        projectsSection.classList.remove('visible');
    }
}

// Listen for scroll events
window.addEventListener('scroll', checkVisibility);

const projectSection = document.querySelector('.projects');

function checkVisibility() {
    const rect = projectSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
        projectSection.classList.add('visible');
    }
}

window.addEventListener('scroll', checkVisibility);
document.addEventListener('DOMContentLoaded', checkVisibility);
// Initial check to handle section visibility when the page loads
checkVisibility();

// Function to close the pop-up
function closePopup() {
    popup.classList.remove('active');
    overlay.classList.remove('active');
}

// Add event listeners for all pop-up buttons
openPopupButtons.forEach(button => {
    button.addEventListener('click', openPopup);
});

// Close the pop-up if the overlay is clicked
overlay.addEventListener('click', closePopup);

// Close the pop-up with the ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
        closePopup();
    }
});

