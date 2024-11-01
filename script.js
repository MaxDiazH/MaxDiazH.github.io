const aboutMeSection = document.querySelector(".about-me-section");
const arrow = document.querySelector(".arrow-container");

function toggleVisibilityOnScroll() {
    const sectionTop = aboutMeSection.getBoundingClientRect().top;
    const sectionBottom = aboutMeSection.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    // Toggle 'show' class based on visibility within viewport
    if (sectionTop < windowHeight && sectionBottom > 0) {
        aboutMeSection.classList.add("show");
    } else {
        aboutMeSection.classList.remove("show");
    }
}

function toggleArrowVisibility() {
    const sectionTop = aboutMeSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Toggle arrow visibility based on scroll position
    if (sectionTop > windowHeight) {
        arrow.style.opacity = "1"; // Show arrow
    } else {
        arrow.style.opacity = "0"; // Hide arrow
    }
}

// Run the function on scroll
window.addEventListener("scroll", function() {
    toggleVisibilityOnScroll();
    toggleArrowVisibility(); // Call the new function
});

const events = document.querySelectorAll('.event');

function handleScroll() {
    events.forEach(event => {
        const rect = event.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if the event is in the viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
            event.classList.add('visible'); // Make it visible
        } else {
            event.classList.remove('visible'); // Hide it
        }
    });
}

// Listen to scroll events
window.addEventListener('scroll', handleScroll);



handleScroll();

const particleContainer = document.getElementById('particle-container');
particleContainer.style.zIndex = "-1"; // Send it behind other content
const maxParticles = 100; // Limit the number of particles
let currentParticleCount = 0; // Keep track of the current number of particles


function createParticle() {
    if (currentParticleCount >= maxParticles) {
        return; // Exit if the limit has been reached
    }

    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random size for variety
    const size = Math.random() * 4 + 2; // Size between 2px and 6px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Randomly position particles on a narrower range near the left or right border
    const isLeftSide = Math.random() < 0.5;
    particle.style.left = isLeftSide 
        ? `${Math.random() * 20}vw`           // Left border (0–20vw)
        : `${80 + Math.random() * 20}vw`;     // Right border (80–100vw)

    // Starting position below the viewport
    particle.style.top = `100vh`;

    // Random animation duration for varied floating speeds
    const animationDuration = Math.random() * 15 + 5; // Duration between 5s and 20s
    particle.style.animationDuration = `${animationDuration}s`;

    particleContainer.appendChild(particle);
    currentParticleCount++; // Increment the current particle count

    // Remove particle after animation to avoid DOM clutter
    particle.addEventListener('animationend', () => {
        particle.remove();
        currentParticleCount--; // Decrement the count when particle is removed
    });
}

// Generate particles at intervals
setInterval(createParticle, 300); // Adjust for desired density

const detailsElements = document.querySelectorAll('.faq-box details');

detailsElements.forEach(details => {
    details.addEventListener('toggle', () => {
        const content = details.querySelector('.faq-content');
        if (details.open) {
            content.style.maxHeight = content.scrollHeight + 'px'; // Set max height to the scroll height
        } else {
            content.style.maxHeight = '0'; // Set max height to 0 when closed
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('dots-container'); // Create a container for the dots
    document.getElementById('testimonials').appendChild(dotsContainer); // Append it to the testimonials container

    let currentIndex = 0;

    function updateTestimonials() {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.transform = `translateX(-${currentIndex * 100}%)`;
        });

        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Create dot navigation and add click functionality
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');

        dot.addEventListener('click', () => {
            currentIndex = index; // Update currentIndex to the clicked dot's index
            updateTestimonials(); // Update the testimonials display
        });

        dotsContainer.appendChild(dot); // Append the dot to the newly created dots container
    });

    // Move the dots container to be just below the testimonial author's name
    const authorNames = document.querySelectorAll('.testimonial p strong');
    authorNames.forEach((name, index) => {
        const dotContainer = document.createElement('div');
        dotContainer.classList.add('dots-container'); // Create a new dots container for each testimonial
        name.insertAdjacentElement('afterend', dotContainer); // Insert the dots container right after the author's name
        dotContainer.appendChild(dotsContainer.children[index]); // Move the corresponding dot into the new container
    });

    updateTestimonials();

    // Auto-slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonials();
    }, 5000);
});

// Function to check if an element is in the viewport
const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight && // Check if the element is within the viewport
        rect.bottom >= 0
    );
};

// Function to add the 'visible' class when elements are in the viewport
const checkVisibility = () => {
    const boxes = document.querySelectorAll('.olympiad-box, .contact-info, .box, .faq-box');
    boxes.forEach(box => {
        if (isElementInViewport(box) && !box.classList.contains('visible')) {
            box.classList.add('visible'); // Trigger the animation
        } else if (!isElementInViewport(box)) {
            box.classList.remove('visible'); // Allow re-animation on scrolling up
        }
    });
};

// Listen for scroll and resize events
window.addEventListener('scroll', checkVisibility);
window.addEventListener('resize', checkVisibility);

// Initial check when the page loads
window.addEventListener('load', checkVisibility);

document.addEventListener("DOMContentLoaded", () => {
    const aside = document.querySelector('aside');
    const homeSection = document.getElementById('home');

    function animateAside() {
        // Temporarily remove 'appear' to allow re-adding for the animation
        aside.classList.remove('appear');
        void aside.offsetWidth; // Trigger a reflow to restart the animation
        aside.classList.add('appear');
    }

    // Check visibility whenever navigating back to the home section
    function checkHomeSection() {
        if (homeSection.classList.contains('active')) {
            animateAside();
        }
    }

    // Run checkHomeSection every time a section button is clicked
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', checkHomeSection);
    });

    // Trigger the animation initially on page load
    animateAside();
});
