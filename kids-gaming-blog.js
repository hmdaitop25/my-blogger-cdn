/*
 * KidGameZone Blog JavaScript
 * Main functionality for the children's gaming blog
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ===== MOBILE MENU HANDLING =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            // Create and show mobile menu when toggle is clicked
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                
                // Clone navigation items from main menu
                const menuItems = mainMenu.cloneNode(true);
                mobileMenu.appendChild(menuItems);
                
                // Add search box to mobile menu
                const searchBox = document.querySelector('.search-box').cloneNode(true);
                mobileMenu.appendChild(searchBox);
                
                // Add close button
                const closeBtn = document.createElement('button');
                closeBtn.className = 'mobile-menu-close';
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                closeBtn.addEventListener('click', function() {
                    document.body.classList.remove('menu-open');
                    mobileMenu.classList.remove('active');
                    setTimeout(() => mobileMenu.remove(), 300);
                });
                mobileMenu.appendChild(closeBtn);
                
                // Add mobile menu to page
                document.body.appendChild(mobileMenu);
                
                // Add styling for mobile menu
                const style = document.createElement('style');
                style.textContent = `
                    .mobile-menu {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: #fff;
                        z-index: 2000;
                        display: flex;
                        flex-direction: column;
                        padding: 50px 20px 20px;
                        transform: translateY(-100%);
                        transition: transform 0.3s ease;
                    }
                    
                    .mobile-menu.active {
                        transform: translateY(0);
                    }
                    
                    .mobile-menu .main-menu {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                        margin-bottom: 30px;
                    }
                    
                    .mobile-menu .main-menu a {
                        font-size: 1.5rem;
                        text-align: center;
                    }
                    
                    .mobile-menu .search-box {
                        display: block;
                        width: 100%;
                        margin-bottom: 30px;
                    }
                    
                    .mobile-menu .search-box input {
                        width: 100%;
                    }
                    
                    .mobile-menu-close {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                    }
                    
                    body.menu-open {
                        overflow: hidden;
                    }
                `;
                document.head.appendChild(style);
                
                // Animate menu in
                setTimeout(() => {
                    document.body.classList.add('menu-open');
                    mobileMenu.classList.add('active');
                }, 10);
            } else {
                // Toggle existing menu
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu.classList.contains('active')) {
                    document.body.classList.remove('menu-open');
                    mobileMenu.classList.remove('active');
                    setTimeout(() => mobileMenu.remove(), 300);
                } else {
                    document.body.classList.add('menu-open');
                    mobileMenu.classList.add('active');
                }
            }
        });
    }
    
    // ===== BACK TO TOP BUTTON =====
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== COOKIE CONSENT BANNER =====
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesButton = document.getElementById('accept-cookies');
    
    if (cookieBanner && acceptCookiesButton) {
        // Check if user has already accepted cookies
        if (!localStorage.getItem('cookiesAccepted')) {
            // Show cookie banner with a delay
            setTimeout(function() {
                cookieBanner.classList.add('visible');
            }, 1500);
            
            // Handle accept button click
            acceptCookiesButton.addEventListener('click', function() {
                localStorage.setItem('cookiesAccepted', 'true');
                cookieBanner.classList.remove('visible');
            });
        }
    }
    
    // ===== GAME CARDS ANIMATION =====
    const gameCards = document.querySelectorAll('.game-card');
    
    if (gameCards.length > 0) {
        // Create a staggered entrance animation for game cards
        gameCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
    
    // ===== POST IMAGE LIGHTBOX =====
    const postBodyImages = document.querySelectorAll('.post-body img');
    
    if (postBodyImages.length > 0) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="" alt="Lightbox Image" class="lightbox-img">
                <button class="lightbox-close"><i class="fas fa-times"></i></button>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Add lightbox styles
        const lightboxStyles = document.createElement('style');
        lightboxStyles.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }
            
            .lightbox.active {
                opacity: 1;
                visibility: visible;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            
            .lightbox-img {
                max-width: 100%;
                max-height: 90vh;
                box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5);
                border-radius: 5px;
            }
            
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: #fff;
                font-size: 24px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(lightboxStyles);
        
        // Define lightbox elements as variables
        const lightboxImg = document.querySelector('.lightbox-img');
        const lightboxClose = document.querySelector('.lightbox-close');
        
        // Add click event to post images
        postBodyImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                lightboxImg.src = this.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox on button click
        lightboxClose.addEventListener('click', function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ===== ANIMATED CONFETTI EFFECT FOR ENGAGEMENT =====
    function createConfetti(targetElement, count = 50) {
        // Only run on game cards with the "play-button" class
        const allPlayButtons = document.querySelectorAll('.play-button');
        
        if (allPlayButtons.length > 0) {
            allPlayButtons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    const rect = this.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top;
                    
                    // Create confetti container if it doesn't exist
                    if (!document.querySelector('.confetti-container')) {
                        const confettiContainer = document.createElement('div');
                        confettiContainer.className = 'confetti-container';
                        confettiContainer.style.cssText = `
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            pointer-events: none;
                            z-index: 1000;
                        `;
                        document.body.appendChild(confettiContainer);
                    }
                    
                    const colors = [
                        '#4CAF50', // Green
                        '#2196F3', // Blue
                        '#FF9800', // Orange
                        '#E91E63', // Pink
                        '#9C27B0'  // Purple
                    ];
                    
                    // Generate confetti particles
                    for (let i = 0; i < count; i++) {
                        const confetti = document.createElement('div');
                        const size = Math.random() * 10 + 5; // Random size between 5-15px
                        
                        confetti.style.cssText = `
                            position: fixed;
                            top: ${centerY}px;
                            left: ${centerX}px;
                            width: ${size}px;
                            height: ${size}px;
                            background-color: ${colors[Math.floor(Math.random() * colors.length)]};
                            border-radius: ${Math.random() < 0.5 ? '50%' : '0'};
                            opacity: ${Math.random() * 0.5 + 0.5};
                            pointer-events: none;
                            animation: confetti-fall ${Math.random() * 2 + 1}s ease forwards;
                            transform: rotate(${Math.random() * 360}deg);
                        `;
                        
                        document.querySelector('.confetti-container').appendChild(confetti);
                        
                        // Remove confetti after animation is complete
                        setTimeout(() => {
                            if (confetti.parentNode) {
                                confetti.parentNode.removeChild(confetti);
                            }
                        }, 3000);
                    }
                    
                    // Confetti animation keyframes
                    if (!document.getElementById('confetti-keyframes')) {
                        const keyframes = document.createElement('style');
                        keyframes.id = 'confetti-keyframes';
                        keyframes.textContent = `
                            @keyframes confetti-fall {
                                0% {
                                    transform: translateY(0) translateX(0) rotate(0);
                                    opacity: 1;
                                }
                                100% {
                                    transform: translateY(${Math.random() * 100 + 50}px) 
                                                translateX(${(Math.random() - 0.5) * 200}px) 
                                                rotate(${Math.random() * 720 - 360}deg);
                                    opacity: 0;
                                }
                            }
                        `;
                        document.head.appendChild(keyframes);
                    }
                });
            });
        }
    }
    
    // Call the confetti effect
    createConfetti();
    
    // ===== RANDOM TIPS FOR PARENTS SECTION =====
    const parentTips = [
        "Limitez le temps d'écran à 1-2 heures par jour pour les enfants.",
        "Jouez avec vos enfants pour partager l'expérience de jeu.",
        "Encouragez les pauses régulières pendant les sessions de jeu.",
        "Discutez des jeux avec vos enfants pour valoriser leur intérêt.",
        "Utilisez les jeux comme récompense plutôt que comme activité par défaut.",
        "Équilibrez le temps de jeu avec des activités physiques extérieures.",
        "Choisissez des jeux adaptés à l'âge et au niveau de développement de votre enfant."
    ];
    
    // Create a random tip box if we're on the homepage
    if (document.querySelector('.games-grid') && parentTips.length > 0) {
        const randomTip = parentTips[Math.floor(Math.random() * parentTips.length)];
        
        const tipBox = document.createElement('div');
        tipBox.className = 'parent-tip';
        tipBox.innerHTML = `
            <div class="tip-icon"><i class="fas fa-lightbulb"></i></div>
            <div class="tip-content">
                <h4>Conseil pour les Parents</h4>
                <p>${randomTip}</p>
            </div>
        `;
        
        // Insert after the games grid
        const gamesGrid = document.querySelector('.games-grid');
        gamesGrid.parentNode.insertBefore(tipBox, gamesGrid.nextSibling);
        
        // Add styles for the tip box
        const tipStyles = document.createElement('style');
        tipStyles.textContent = `
            .parent-tip {
                background-color: #E8F5E9;
                border-left: 5px solid #4CAF50;
                border-radius: 5px;
                padding: 15px;
                margin: 20px 0 30px;
                display: flex;
                align-items: center;
            }
            
            .tip-icon {
                font-size: 24px;
                color: #4CAF50;
                margin-right: 15px;
            }
            
            .tip-content h4 {
                margin: 0 0 5px;
                color: #2E7D32;
            }
            
            .tip-content p {
                margin: 0;
                color: #424242;
            }
        `;
        document.head.appendChild(tipStyles);
    }
    
    // ===== HANDLE BLOGGER COMMENT SECTION =====
    // Fix for Blogger comment iframe issue
    function fixCommentIframe() {
        const commentIframe = document.getElementById('comment-editor');
        if (commentIframe) {
            // Adjust iframe height based on content
            commentIframe.onload = function() {
                this.style.height = '250px';
            };
        }
    }
    fixCommentIframe();
    
    // ===== AGE RECOMMENDATION LABELS FOR GAMES =====
    // Add age recommendations to game cards
    function addAgeRecommendations() {
        const gameCards = document.querySelectorAll('.game-card');
        
        // Age groups: 4-6, 7-9, 10-12
        const ageGroups = ['4-6 ans', '7-9 ans', '10-12 ans'];
        
        gameCards.forEach(card => {
            // Randomly assign age group for demo purposes
            // In real implementation, this would come from post data
            const randomAgeGroup = ageGroups[Math.floor(Math.random() * ageGroups.length)];
            
            const ageLabel = document.createElement('div');
            ageLabel.className = 'age-recommendation';
            ageLabel.textContent = randomAgeGroup;
            
            // Add before the title
            const gameInfo = card.querySelector('.game-info');
            gameInfo.insertBefore(ageLabel, gameInfo.firstChild);
        });
        
        // Add styles for age labels
        const ageStyles = document.createElement('style');
        ageStyles.textContent = `
            .age-recommendation {
                display: inline-block;
                padding: 3px 10px;
                background-color: #90CAF9;
                color: #0D47A1;
                border-radius: 14px;
                font-size: 0.75rem;
                font-weight: 700;
                margin-bottom: 10px;
            }
        `;
        document.head.appendChild(ageStyles);
    }
    
    // Only run on pages with game cards
    if (document.querySelectorAll('.game-card').length > 0) {
        addAgeRecommendations();
    }
    
    // ===== LAZY LOAD IMAGES =====
    // Simple lazy loading for blog post images
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        
                        // Optional image loading animation
                        image.style.transition = 'opacity 0.5s ease';
                        image.style.opacity = '0';
                        
                        // Set the image src
                        if (image.dataset.src) {
                            image.src = image.dataset.src;
                        }
                        
                        // Animate in
                        setTimeout(() => {
                            image.style.opacity = '1'; 
                        }, 100);
                        
                        // Stop observing after loading
                        imageObserver.unobserve(image);
                    }
                });
            });
            
            // Observe each image
            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver support
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        }
    }
    
    // Run lazy loading
    lazyLoadImages();
});
