// Hero Slideshow
const heroSlides = document.querySelectorAll('.hero-slide');
let heroCurrentSlide = 0;

function showHeroSlide(n) {
    heroSlides[heroCurrentSlide].classList.remove('active');
    heroCurrentSlide = (n + heroSlides.length) % heroSlides.length;
    heroSlides[heroCurrentSlide].classList.add('active');
}

function nextHeroSlide() {
    showHeroSlide(heroCurrentSlide + 1);
}

setInterval(nextHeroSlide, 5000);

// Service Card Click to Expand
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't expand if clicking on slideshow dots
        if (e.target.classList.contains('slide-dot')) return;
        
        // Toggle expanded state
        const wasExpanded = this.classList.contains('expanded');
        
        // Close all other cards
        serviceCards.forEach(c => c.classList.remove('expanded'));
        
        // Toggle this card
        if (!wasExpanded) {
            this.classList.add('expanded');
        }
    });
});

// Service Card Slideshows
const slideshows = document.querySelectorAll('.slideshow-container[data-slideshow]');

slideshows.forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.slide');
    const dots = slideshow.querySelectorAll('.slide-dot');
    
    if (slides.length <= 1) return;
    
    let currentIndex = 0;
    
    function showSlide(n) {
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        currentIndex = (n + slides.length) % slides.length;
        
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    
    // Auto advance every 4 seconds
    setInterval(nextSlide, 4000);
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            showSlide(index);
        });
    });
});