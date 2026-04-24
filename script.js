/* ═══════════════════════════════════════════════════════════════════
   Portfolio — client-side interactions
   ═══════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initMobileNav();
    initSmoothScroll();
    initRevealOnScroll();
    initProjectFilter();
    initYearStamp();
    initFormFeedback();
});

/* Nav shadow on scroll -------------------------------------------------- */
function initNavScroll(){
    const nav = document.getElementById('nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
}

/* Hamburger --------------------------------------------------------------- */
function initMobileNav(){
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
        const isOpen = links.classList.toggle('is-open');
        toggle.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close the menu after a link is tapped
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    }));
    // Close when clicking outside the nav
    document.addEventListener('click', (e) => {
        if (!links.classList.contains('is-open')) return;
        if (toggle.contains(e.target) || links.contains(e.target)) return;
        links.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    });
}

/* Smooth scroll respecting sticky nav ------------------------------------ */
function initSmoothScroll(){
    const nav = document.getElementById('nav');
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const offset = nav ? nav.offsetHeight : 0;
            const y = target.getBoundingClientRect().top + window.scrollY - offset + 1;
            window.scrollTo({ top:y, behavior:'smooth' });
        });
    });
}

/* Scroll reveal + skill bar trigger -------------------------------------- */
function initRevealOnScroll(){
    const candidates = [
        '.section-header',
        '.demo-card',
        '.project-card',
        '.ex-card',
        '.skills-bars',
        '.about-grid',
        '.contact-grid',
    ];
    const nodes = document.querySelectorAll(candidates.join(','));
    nodes.forEach(n => n.classList.add('reveal'));

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                entry.target.classList.add('in-view');
                io.unobserve(entry.target);
            }
        });
    }, { threshold:0.12, rootMargin:'0px 0px -40px 0px' });

    nodes.forEach(n => io.observe(n));

    // Skill bars animate when the skills card comes in
    const skills = document.querySelectorAll('.skill');
    const io2 = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                entry.target.classList.add('in-view');
                io2.unobserve(entry.target);
            }
        });
    }, { threshold:0.4 });
    skills.forEach(s => io2.observe(s));
}

/* Project filter chips --------------------------------------------------- */
function initProjectFilter(){
    const chips = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('.project-card');
    const noMatch = document.getElementById('noMatch');
    if (!chips.length || !cards.length) return;

    // Populate counts
    const count = (cat) => {
        if (cat === 'all') return cards.length;
        return Array.from(cards).filter(c => c.dataset.cat.split(/\s+/).includes(cat)).length;
    };
    document.querySelectorAll('.filter-count').forEach(el => {
        el.textContent = count(el.dataset.count);
    });

    const apply = (filter) => {
        let shown = 0;
        cards.forEach(card => {
            const cats = card.dataset.cat.split(/\s+/);
            const visible = filter === 'all' || cats.includes(filter);
            card.classList.toggle('is-hidden', !visible);
            if (visible) shown++;
        });
        if (noMatch) noMatch.hidden = shown > 0;
    };

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => {
                c.classList.remove('is-active');
                c.setAttribute('aria-selected', 'false');
            });
            chip.classList.add('is-active');
            chip.setAttribute('aria-selected', 'true');
            apply(chip.dataset.filter);
        });
    });
}

/* Copyright year --------------------------------------------------------- */
function initYearStamp(){
    const y = document.getElementById('yr');
    if (y) y.textContent = new Date().getFullYear();
}

/* Lightweight email obfuscation — only reveal on click ------------------- */
// (removed — portfolio uses the Formspree form for direct messages)

/* Contact form feedback -------------------------------------------------- */
function initFormFeedback(){
    const form = document.getElementById('contactForm');
    if (!form) return;
    const btn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!btn) return;
        const label = btn.querySelector('span');
        const original = label ? label.textContent : 'Send message';
        try {
            btn.disabled = true;
            if (label) label.textContent = 'Sending…';
            const res = await fetch(form.action, {
                method:'POST',
                body:new FormData(form),
                headers:{ 'Accept':'application/json' },
            });
            if (res.ok){
                if (label) label.textContent = '✓ Message sent';
                form.reset();
            } else {
                if (label) label.textContent = '⚠ Try again';
            }
        } catch (err){
            if (label) label.textContent = '⚠ Try again';
        } finally {
            setTimeout(() => { btn.disabled = false; if (label) label.textContent = original; }, 2500);
        }
    });
}
