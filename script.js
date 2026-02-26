// ============================================
// Smooth Scroll & Navigation
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // ============================================
    // Scroll Animations
    // ============================================
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all major sections
    const sections = document.querySelectorAll('.expertise-card, .project-card, .publication-item');
    sections.forEach(section => {
        observer.observe(section);
    });

    // ============================================
    // Skills Progress Bar Animation
    // ============================================
    const skillBars = document.querySelectorAll('.skill-fill');
    const skillsSection = document.querySelector('.skills-section');

    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach((bar, index) => {
                    const percent = bar.getAttribute('data-percent');
                    bar.style.setProperty('--fill-width', percent + '%');
                    setTimeout(() => {
                        bar.classList.add('animate');
                    }, index * 100);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    let lastScroll = 0;
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.style.transform = 'translateY(0)';
        } else if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // Active Navigation Link Highlight
    // ============================================
    const navItems = document.querySelectorAll('.nav-links a');
    const sectionElements = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.pageYOffset;

        sectionElements.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // Contact Form Handling
    // ============================================
    // Form submission is handled by FormSpree (https://formspree.io/f/mnjbjqvj)
    // No custom JavaScript needed - FormSpree handles the form POST request

    // ============================================
    // Parallax Effect for Hero Section (desktop only)
    // ============================================
    window.addEventListener('scroll', function() {
        // Disable parallax on mobile to prevent content disappearing
        if (window.innerWidth <= 768) return;

        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    });

    // ============================================
    // Dynamic Year in Footer
    // ============================================
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('.footer-left p');
    if (footerYear) {
        footerYear.textContent = footerYear.textContent.replace('2024', currentYear);
    }

    // ============================================
    // Add hover effect sound/haptic feedback simulation
    // ============================================
    const interactiveElements = document.querySelectorAll('.btn, .project-card, .expertise-card, .contact-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // ============================================
    // Stats Counter Animation
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    
                    // Only animate if it's a number
                    if (text.match(/\d+/)) {
                        const number = parseInt(text.match(/\d+/)[0]);
                        const prefix = text.match(/^\D*/)[0];
                        const suffix = text.match(/\D*$/)[0];
                        let current = 0;
                        const increment = number / 50;
                        const duration = 1500;
                        const stepTime = duration / 50;
                        
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= number) {
                                stat.textContent = prefix + number + suffix;
                                clearInterval(timer);
                            } else {
                                stat.textContent = prefix + Math.floor(current) + suffix;
                            }
                        }, stepTime);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // ============================================
    // Project Card Dynamic Hover Effect
    // ============================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-3px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ============================================
    // Keyboard Navigation Support
    // ============================================
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // ============================================
    // Load Animation Complete
    // ============================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ============================================
    // Prevent Default for Empty Href Links
    // ============================================
    const emptyLinks = document.querySelectorAll('a[href="#"]');
    emptyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    // ============================================
    // Custom Cursor Effect (Optional Enhancement)
    // ============================================
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        const speed = 0.2;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    // Uncomment to enable custom cursor
    // animateCursor();

    console.log('Portfolio website loaded successfully! 🚀');
});
