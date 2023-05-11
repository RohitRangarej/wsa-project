// Toggle the menu
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', function() {
  menu.classList.toggle('active');
});

// Smooth scrolling to section when clicking on navigation links
const menuLinks = document.querySelectorAll('.menu-link');

menuLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Form validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Validate form fields
  if (nameInput.text.trim() === '') {
    alert('Please enter your name.');
    nameInput.focus();
    return;
  }

  if (emailInput.text.trim() === '') {
    alert('Please enter your email.');
    emailInput.focus();
    return;
  }

  if (messageInput.text.trim() === '') {
    alert('Please enter your message.');
    messageInput.focus();
    return;
  }

  // Form submission logic here
  // ...
});
// Scroll to top button
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('active');
  } else {
    scrollToTopBtn.classList.remove('active');
  }
});

scrollToTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Donation counter
const donationCounter = document.getElementById('donation-counter');
let totalDonation = 0;

// Function to update the donation counter
function updateDonationCounter(amount) {
  totalDonation += amount;
  donationCounter.textContent = 'TOTAL DONATION: $${totalDonation.toFixed(2)}';
}

// Example usage
// Call the updateDonationCounter() function whenever a new donation is made
updateDonationCounter(50.00); // Example donation of $50.00
updateDonationCounter(25.00); // Example donation of $25.00
