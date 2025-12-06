/* JavaScript Document

Tooplate 2147 Titan Folio

https://www.tooplate.com/view/2147-titan-folio
*/


// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

mobileMenuBtn.addEventListener('click', function() {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-nav a').forEach(function(link) {
    link.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(function(el) {
    observer.observe(el);
});

// Update active menu item based on scroll
function updateActiveMenuItem() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const menuItem = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        const mobileMenuItem = document.querySelector(`.mobile-nav a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Remove active class from all menu items
            document.querySelectorAll('.nav-links a').forEach(item => item.classList.remove('active'));
            document.querySelectorAll('.mobile-nav a').forEach(item => item.classList.remove('active'));
            
            // Add active class to current menu item
            if (menuItem) menuItem.classList.add('active');
            if (mobileMenuItem) mobileMenuItem.classList.add('active');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', updateActiveMenuItem);

// Set initial active state
updateActiveMenuItem();
/* --- NUEVA FUNCIÓN PARA FILTRAR SERVICIOS --- */
function initServiceFilters() {
    const filters = document.querySelectorAll('.service-filter-btn');
    const cards = document.querySelectorAll('.service-card');

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Quitar clase active de todos los botones
            filters.forEach(f => f.classList.remove('active'));
            // 2. Poner active al botón clickeado
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            cards.forEach(card => {
                // 3. Mostrar u ocultar tarjetas
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                    card.classList.add('show');
                } else {
                    card.classList.add('hide');
                    card.classList.remove('show');
                }
            });
        });
    });
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', initServiceFilters);