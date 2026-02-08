/*==================== logout functionality ====================*/
const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Confirm logout
        const confirmLogout = confirm('Are you sure you want to logout from Fidus Family website?');
        
        if (confirmLogout) {
            // Clear any stored session data (if using localStorage/sessionStorage)
            localStorage.removeItem('fidusUser');
            sessionStorage.removeItem('fidusSession');
            
            // Show logout message
            const logoutMessage = document.createElement('div');
            logoutMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #ff6b6b, #ff4757);
                color: white;
                padding: 2rem 3rem;
                border-radius: 15px;
                font-size: 1.8rem;
                font-weight: 600;
                box-shadow: 0 10px 30px rgba(255, 107, 107, 0.5);
                z-index: 10000;
                animation: fadeUp 0.5s ease forwards;
                text-align: center;
            `;
            logoutMessage.innerHTML = `
                <i class='bx bx-log-out-circle' style='font-size: 3rem; margin-bottom: 1rem; display: block;'></i>
                Logging out... Goodbye! 👋
            `;
            
            document.body.appendChild(logoutMessage);
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    });
}

/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

/*==================== scroll section active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    
    /*==================== sticky header ====================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    
    /*==================== back to top button ====================*/
    let backToTop = document.querySelector('.back-to-top');
    backToTop.classList.toggle('show', window.scrollY > 300);
};

/*==================== gallery filter ====================*/
const filterBtns = document.querySelectorAll('.filter-btn');
const photosBoxes = document.querySelectorAll('.photos-box');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        photosBoxes.forEach(box => {
            if(filter === 'all' || box.getAttribute('data-category') === filter) {
                box.style.display = 'block';
                // Add animation
                box.style.animation = 'fadeUp 0.5s ease forwards';
            } else {
                box.style.display = 'none';
            }
        });
    });
});

/*==================== typing animation ====================*/
const typingText = document.querySelector('.typing-text');
const textArray = ['A Harmonious Family', 'Full of Love', 'Always Together', 'Creating Memories'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = textArray[textIndex];
    
    if(isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if(!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if(isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex++;
        typingSpeed = 500; // Pause before next word
        
        if(textIndex >= textArray.length) {
            textIndex = 0;
        }
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start typing animation
if(typingText) {
    typeText();
}

/*==================== scroll reveal animation ====================*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.animation = 'fadeUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.value-card, .family-card, .info-box, .photos-box').forEach(el => {
    observer.observe(el);
});

/*==================== smooth scroll for navigation links ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*==================== form submission ====================*/
const contactForm = document.querySelector('.contact-form form');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if(!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

/*==================== newsletter subscription ====================*/
const newsletterForm = document.querySelector('.newsletter');
if(newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if(!email) {
            alert('Please enter your email address');
            return;
        }
        
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.querySelector('input[type="email"]').value = '';
    });
}