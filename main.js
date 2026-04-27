// --- TOAST NOTIFICATION ---
function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('toast-show'), 10);
    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// --- LOADING SCREEN ---
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        loader.classList.add('loaded');
    }
});

// --- SCROLL-TRIGGERED CARD ANIMATIONS ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.char-card, .bike-card, .browser-card').forEach(card => {
    observer.observe(card);
});

// --- SECTION TITLE GLITCH EFFECT ---
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('glitch');
            setTimeout(() => entry.target.classList.remove('glitch'), 300);
        }
    });
}, { threshold: 0.5 });

sectionTitles.forEach(title => titleObserver.observe(title));

// --- NAVBAR HIDE ON SCROLL DOWN, SHOW ON SCROLL UP ---
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// --- IMAGE PARALLAX INSIDE CARDS ---
document.querySelectorAll('.char-card, .bike-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;
        
        const img = card.querySelector('img');
        if (img) {
            img.style.transform = `translate(${percentX * 10}px, ${percentY * 10}px) scale(1.1)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('img');
        if (img) {
            img.style.transform = 'translate(0, 0) scale(1)';
        }
    });
});

// --- BUTTON INTERACTIONS ---
document.querySelectorAll('.neo-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Prepare for Idaten Jump!');
    });
});

// --- HAMBURGER MENU ---
const hamburger = document.querySelector('.hamburger');
const navLinksList = document.querySelector('.nav-links');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinksList.classList.toggle('nav-open');
        hamburger.classList.toggle('open');
    });
}

// --- QUICK LINK SCROLL NAV ---
const qlLinks = {
    'THE RIDERS': '#riders',
    'MTB SPECS': '#bikes',
    'EPISODES': '#xzone',
    'RULES': '#xzone'
};

document.querySelectorAll('.ql-item').forEach(item => {
    item.addEventListener('click', () => {
        const label = item.querySelector('span')?.textContent.trim();
        const target = qlLinks[label];
        if (target) {
            document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// --- PARALLAX ON STACKED CARDS ---
window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) return;
    const scrollY = window.scrollY;
    document.querySelectorAll('.stack-card').forEach((card, index) => {
        const speed = (index + 1) * 0.05;
        card.style.transform = `translateY(${scrollY * speed * -0.5}px)`;
    });
});
