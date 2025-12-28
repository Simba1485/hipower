// ============================================
// Hi-Power Petroleum - Main JavaScript
// GSAP Animations & Interactions
// ============================================

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ============================================
// Page Loader
// ============================================
const loader = document.getElementById('loader');
const loaderProgress = document.querySelector('.loader-progress');
const loaderPercent = document.querySelector('.loader-percent');

let progress = 0;
const loadingInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        
        // Animate loader out
        gsap.to(loaderPercent, { opacity: 0, duration: 0.3 });
        gsap.to(loaderProgress, { width: '100%', duration: 0.3 });
        
        gsap.to(loader, {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut',
            delay: 0.5,
            onComplete: () => {
                loader.style.display = 'none';
                initAnimations();
            }
        });
    }
    
    loaderProgress.style.width = progress + '%';
    loaderPercent.textContent = Math.floor(progress) + '%';
}, 50);

// ============================================
// Initialize All Animations
// ============================================
function initAnimations() {
    initSplitting();
    initHeroAnimations();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initMagnetic();
    initCursor();
    initParticles();
    initCounters();
    initLPGBackground();
    initFlameEffect();
    initGasFlow();
    init3DCylinder();
    initPlantBackground();
}

// ============================================
// Text Splitting
// ============================================
function initSplitting() {
    Splitting();
}

// ============================================
// Hero Animations
// ============================================
function initHeroAnimations() {
    const heroTl = gsap.timeline({ delay: 0.2 });
    
    // Animate title characters
    const titleChars = document.querySelectorAll('.title-word .char');
    heroTl.to(titleChars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power4.out'
    });
    
    // Animate other hero elements
    heroTl.to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4');
    
    heroTl.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6');
    
    heroTl.to('.hero-location', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6');
    
    heroTl.to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6');
    
    heroTl.to('.hero-stats', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6');
    
    heroTl.to('.hero-scroll', {
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4');
    
    // Parallax on glows
    gsap.to('.glow-1', {
        y: -100,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
    
    gsap.to('.glow-2', {
        y: -50,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
}

// ============================================
// Navbar
// ============================================
function initNavbar() {
    const nav = document.getElementById('nav');
    
    ScrollTrigger.create({
        start: 'top -100',
        onUpdate: (self) => {
            if (self.direction === 1) {
                nav.classList.add('scrolled');
            }
            if (self.scroll() < 100) {
                nav.classList.remove('scrolled');
            }
        }
    });
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (!navToggle || !mobileMenu) return;
    
    const toggleMenu = () => {
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            // Close menu
            gsap.to(mobileLinks, {
                y: 30,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power2.in',
                onComplete: () => {
                    mobileMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        } else {
            // Open menu
            mobileMenu.classList.add('active');
            navToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            gsap.fromTo(mobileLinks, 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
            );
        }
    };
    
    navToggle.addEventListener('click', toggleMenu);
    
    // Close on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            gsap.to(mobileLinks, {
                y: 30,
                opacity: 0,
                duration: 0.2,
                stagger: 0.03,
                ease: 'power2.in',
                onComplete: () => {
                    mobileMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Close on resize to desktop
    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && lastWidth <= 900 && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
        lastWidth = window.innerWidth;
    });
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    // Reveal animations
    gsap.utils.toArray('.reveal-up').forEach(elem => {
        gsap.to(elem, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    gsap.utils.toArray('.reveal-right').forEach(elem => {
        gsap.to(elem, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    gsap.utils.toArray('.reveal-left').forEach(elem => {
        gsap.to(elem, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    gsap.utils.toArray('.reveal-scale').forEach(elem => {
        gsap.to(elem, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Service cards stagger
    gsap.utils.toArray('.services-grid').forEach(grid => {
        const cards = grid.querySelectorAll('.service-card');
        gsap.fromTo(cards, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 80%'
                }
            }
        );
    });
    
    // Advantage cards stagger
    gsap.utils.toArray('.advantages-grid').forEach(grid => {
        const cards = grid.querySelectorAll('.advantage-card');
        gsap.fromTo(cards, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 80%'
                }
            }
        );
    });
    
    // Partner cards stagger
    gsap.utils.toArray('.partner-cards').forEach(grid => {
        const cards = grid.querySelectorAll('.partner-card-mini');
        gsap.fromTo(cards, 
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 80%'
                }
            }
        );
    });
    
    // Parallax effects
    gsap.utils.toArray('.visual-card.main-card').forEach(card => {
        gsap.to(card, {
            y: -30,
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
    
    // Floating card animation
    gsap.to('.floating-card', {
        y: -20,
        scrollTrigger: {
            trigger: '.floating-card',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });
}

// ============================================
// Magnetic Effect
// ============================================
function initMagnetic() {
    // Skip magnetic effect on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(elem, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        elem.addEventListener('mouseleave', () => {
            gsap.to(elem, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// ============================================
// Custom Cursor - DISABLED
// ============================================
function initCursor() {
    // Custom cursor disabled
}

// ============================================
// Particles
// ============================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    // Reduce particles on mobile for better performance
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        container.appendChild(particle);
        
        // Animate each particle
        gsap.to(particle, {
            y: -window.innerHeight,
            x: (Math.random() - 0.5) * (isMobile ? 100 : 200),
            opacity: 0,
            duration: Math.random() * 10 + 10,
            repeat: -1,
            ease: 'none',
            delay: Math.random() * 5
        });
    }
}

// ============================================
// Counter Animation
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: 'power2.out'
                });
            },
            once: true
        });
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                scrollTo: { y: target, offsetY: 80 },
                duration: 1,
                ease: 'power3.inOut'
            });
        }
    });
});

// ============================================
// Page Visibility
// ============================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});

// ============================================
// Resize Handler
// ============================================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 200);
});

// ============================================
// LPG Background Parallax
// ============================================
function initLPGBackground() {
    const tanks = document.querySelectorAll('.lpg-tank');
    const pipelines = document.querySelectorAll('.pipeline');
    
    if (tanks.length === 0) return;
    
    // Mouse parallax effect on tanks
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            
            tanks.forEach((tank, index) => {
                const speed = (index + 1) * 8;
                const x = mouseX * speed;
                const y = mouseY * speed;
                const rotate = mouseX * (index % 2 === 0 ? 2 : -2);
                
                gsap.to(tank, {
                    x: x,
                    y: y,
                    rotation: rotate,
                    duration: 1.5,
                    ease: 'power2.out'
                });
            });
            
            pipelines.forEach((pipeline, index) => {
                const speed = (index + 1) * 5;
                gsap.to(pipeline, {
                    x: mouseX * speed,
                    y: mouseY * speed * 0.5,
                    duration: 2,
                    ease: 'power2.out'
                });
            });
        });
    }
    
    // Scroll parallax
    gsap.to('.tank-1', {
        y: -100,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
    
    gsap.to('.tank-2', {
        y: -60,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
        }
    });
    
    gsap.to('.tank-4', {
        y: -80,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2
        }
    });
}

// ============================================
// Flame Energy Effect (Canvas-based)
// ============================================
function initFlameEffect() {
    const canvas = document.getElementById('flameCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let particles = [];
    let animationId;
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth <= 768;
    
    // Reduce particles on mobile
    const maxParticles = isMobile ? 30 : 60;
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    function createParticle(x, y, isAmbient = false) {
        const colors = [
            'rgba(255, 107, 44, 0.8)',   // Orange
            'rgba(255, 140, 66, 0.7)',   // Light orange
            'rgba(255, 80, 20, 0.6)',    // Deep orange
            'rgba(0, 100, 255, 0.4)',    // Blue (gas flame core)
            'rgba(255, 200, 100, 0.5)'   // Yellow
        ];
        
        return {
            x: x + (Math.random() - 0.5) * 40,
            y: y + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 3 - 1,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 1,
            decay: Math.random() * 0.02 + 0.01,
            isAmbient: isAmbient
        };
    }
    
    function updateParticles() {
        // Add particles near mouse (only on non-touch)
        if (!isTouchDevice && particles.length < maxParticles) {
            if (Math.random() > 0.7) {
                particles.push(createParticle(targetX, targetY));
            }
        }
        
        // Add ambient particles
        if (particles.length < maxParticles / 2 && Math.random() > 0.95) {
            const ambientX = Math.random() * width;
            const ambientY = height * 0.3 + Math.random() * height * 0.5;
            particles.push(createParticle(ambientX, ambientY, true));
        }
        
        // Update and draw particles
        ctx.clearRect(0, 0, width, height);
        
        particles = particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy -= 0.05; // Gravity (upward for flames)
            p.life -= p.decay;
            p.size *= 0.98;
            
            if (p.life <= 0 || p.size < 0.5) return false;
            
            // Draw particle with glow
            ctx.save();
            ctx.globalAlpha = p.life * 0.6;
            ctx.beginPath();
            
            // Glow effect
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Core
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
            
            return true;
        });
    }
    
    function animate() {
        // Smooth mouse following
        targetX += (mouseX - targetX) * 0.1;
        targetY += (mouseY - targetY) * 0.1;
        
        updateParticles();
        animationId = requestAnimationFrame(animate);
    }
    
    // Event listeners
    resize();
    window.addEventListener('resize', resize);
    
    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
    }
    
    // Start animation
    animate();
    
    // Pause when not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// ============================================
// Plant Background Parallax
// ============================================
function initPlantBackground() {
    const plantBg = document.getElementById('heroPlantBg');
    if (!plantBg) return;
    
    const plantImage = plantBg.querySelector('.plant-image');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Mouse parallax
    if (!isTouchDevice && plantImage) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            
            gsap.to(plantImage, {
                x: mouseX * 20,
                y: mouseY * 15,
                scale: 1.05,
                duration: 1.5,
                ease: 'power2.out'
            });
        });
    }
    
    // Scroll parallax
    gsap.to(plantImage, {
        y: 100,
        scale: 1.1,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
}

// ============================================
// 3D Cylinder Interaction
// ============================================
function init3DCylinder() {
    const cylinder = document.getElementById('heroCylinder');
    if (!cylinder) return;
    
    const cylinder3d = cylinder.querySelector('.cylinder-3d');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice && cylinder3d) {
        document.addEventListener('mousemove', (e) => {
            const rect = cylinder.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const angleX = (e.clientY - centerY) / 30;
            const angleY = (e.clientX - centerX) / 20;
            
            gsap.to(cylinder3d, {
                rotateX: -angleX,
                rotateY: angleY + 5,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }
    
    // Scroll parallax
    gsap.to(cylinder, {
        y: -50,
        opacity: 0,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: '50% top',
            scrub: 1
        }
    });
}

// ============================================
// Gas Flow Animation
// ============================================
function initGasFlow() {
    const container = document.getElementById('gasFlow');
    if (!container) return;
    
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 10 : 20;
    
    // Create flowing gas particles
    function createGasParticle() {
        const particle = document.createElement('div');
        particle.className = 'gas-particle' + (Math.random() > 0.6 ? ' blue' : '');
        
        // Random starting position on left side
        const startY = Math.random() * 80 + 10; // 10-90% of height
        particle.style.left = '-10px';
        particle.style.top = startY + '%';
        
        container.appendChild(particle);
        
        // Animate across screen with wave motion
        const duration = Math.random() * 8 + 6;
        const amplitude = Math.random() * 100 + 50;
        
        gsap.to(particle, {
            x: window.innerWidth + 50,
            duration: duration,
            ease: 'none',
            onUpdate: function() {
                const progress = this.progress();
                const wave = Math.sin(progress * Math.PI * 4) * amplitude;
                gsap.set(particle, { y: wave });
            },
            onComplete: () => {
                particle.remove();
                createGasParticle();
            }
        });
        
        // Fade animation
        gsap.to(particle, {
            opacity: 0.3,
            duration: duration / 2,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut'
        });
        
        // Scale animation
        gsap.fromTo(particle, 
            { scale: 0.5 },
            { 
                scale: 1.5, 
                duration: duration / 2, 
                yoyo: true, 
                repeat: 1,
                ease: 'power1.inOut'
            }
        );
    }
    
    // Create initial particles with staggered delays
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createGasParticle(), i * 500);
    }
}


