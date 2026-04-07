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
