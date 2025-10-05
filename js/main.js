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

// Carousel functionality
const carouselCards = document.querySelectorAll('.service-card');
const carouselIndicators = document.querySelectorAll('.carousel-indicator');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const carousel = document.querySelector('.services-carousel');
let currentCarouselSlide = 0;

function showCarouselSlide(index) {
    carouselCards.forEach(card => {
        card.classList.remove('active', 'prev');
    });
    carouselIndicators.forEach(ind => ind.classList.remove('active'));

    if (carouselCards[currentCarouselSlide]) {
        carouselCards[currentCarouselSlide].classList.add('prev');
    }

    currentCarouselSlide = (index + carouselCards.length) % carouselCards.length;

    carouselCards[currentCarouselSlide].classList.add('active');
    carouselIndicators[currentCarouselSlide].classList.add('active');

    setTimeout(() => {
        carouselCards.forEach(card => card.classList.remove('prev'));
    }, 600);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        showCarouselSlide(currentCarouselSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        showCarouselSlide(currentCarouselSlide + 1);
    });
}

carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showCarouselSlide(index);
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        showCarouselSlide(currentCarouselSlide - 1);
    } else if (e.key === 'ArrowRight') {
        showCarouselSlide(currentCarouselSlide + 1);
    }
});

if (carousel) {
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        
        if (touchEndX < touchStartX - 50) {
            showCarouselSlide(currentCarouselSlide + 1);
        }
        if (touchEndX > touchStartX + 50) {
            showCarouselSlide(currentCarouselSlide - 1);
        }
    });
}

// Image slideshow within cards (hover effect)
const slideshows = document.querySelectorAll('.slideshow-container[data-slideshow]');

slideshows.forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.slide');
    const dots = slideshow.querySelectorAll('.slide-dot');
    
    if (slides.length <= 1) return;
    
    let currentIndex = 0;
    let hoverInterval = null;
    
    function showImageSlide(n) {
        slides[currentIndex].classList.remove('active');
        if (dots[currentIndex]) dots[currentIndex].classList.remove('active');
        
        currentIndex = (n + slides.length) % slides.length;
        
        slides[currentIndex].classList.add('active');
        if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }
    
    function nextImageSlide() {
        showImageSlide(currentIndex + 1);
    }
    
    const parentCard = slideshow.closest('.service-card');
    
    parentCard.addEventListener('mouseenter', function() {
        if (parentCard.classList.contains('active')) {
            if (hoverInterval) clearInterval(hoverInterval);
            hoverInterval = setInterval(nextImageSlide, 1500);
        }
    });
    
    parentCard.addEventListener('mouseleave', function() {
        if (hoverInterval) {
            clearInterval(hoverInterval);
            hoverInterval = null;
        }
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            showImageSlide(index);
        });
    });
});