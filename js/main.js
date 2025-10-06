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

setInterval(nextHeroSlide, 3000);

// Animated button text rotation
const buttonTexts = document.querySelectorAll('.btn-text');

buttonTexts.forEach(btnText => {
    const texts = JSON.parse(btnText.getAttribute('data-texts'));
    let currentIndex = 0;
    
    setInterval(() => {
        // Fade out
        btnText.classList.add('fade-out');
        
        // Change text after fade out
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            btnText.textContent = texts[currentIndex];
            btnText.classList.remove('fade-out');
        }, 300);
    }, 3000);
});

// Carousel functionality
const carouselCards = document.querySelectorAll('.service-card');
const carouselIndicators = document.querySelectorAll('.carousel-indicator');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const carousel = document.querySelector('.services-carousel');
let currentCarouselSlide = 0;

function showCarouselSlide(newIndex, direction) {
    const oldIndex = currentCarouselSlide;
    
    // Remove all classes
    carouselCards.forEach(card => {
        card.classList.remove('active', 'slide-left', 'slide-right');
    });
    carouselIndicators.forEach(ind => ind.classList.remove('active'));

    // Calculate new index (infinite loop)
    currentCarouselSlide = (newIndex + carouselCards.length) % carouselCards.length;

    // Set the old card's exit direction
    if (direction === 'next') {
        carouselCards[oldIndex].classList.add('slide-left');
        carouselCards[currentCarouselSlide].classList.add('slide-right');
    } else {
        carouselCards[oldIndex].classList.add('slide-right');
        carouselCards[currentCarouselSlide].classList.add('slide-left');
    }

    // Activate new card after a brief moment
    setTimeout(() => {
        carouselCards[currentCarouselSlide].classList.remove('slide-left', 'slide-right');
        carouselCards[currentCarouselSlide].classList.add('active');
    }, 50);

    carouselIndicators[currentCarouselSlide].classList.add('active');
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        showCarouselSlide(currentCarouselSlide - 1, 'prev');
    });

    nextBtn.addEventListener('click', () => {
        showCarouselSlide(currentCarouselSlide + 1, 'next');
    });
}

carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        const direction = index > currentCarouselSlide ? 'next' : 'prev';
        showCarouselSlide(index, direction);
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        showCarouselSlide(currentCarouselSlide - 1, 'prev');
    } else if (e.key === 'ArrowRight') {
        showCarouselSlide(currentCarouselSlide + 1, 'next');
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
            showCarouselSlide(currentCarouselSlide + 1, 'next');
        }
        if (touchEndX > touchStartX + 50) {
            showCarouselSlide(currentCarouselSlide - 1, 'prev');
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