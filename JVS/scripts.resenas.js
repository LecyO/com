document.addEventListener("DOMContentLoaded", function() {
    // DOM
    const menu = document.getElementById("menu");
    const sidebar = document.querySelector(".sidebar");
    const spans = document.querySelectorAll(".sidebar span:not(.page-name span)");
    const celuBtn = document.querySelector(".celu-btn");
    const overlay = document.querySelector(".sidebar-overlay");
    
    //mini
    function toggleMiniSidebar() {
        sidebar.classList.toggle("mini");
        spans.forEach(span => span.classList.toggle("hidden"));
    }
    
    // menu celu
    function toggleMobileMenu() {
        sidebar.classList.toggle("active");
        overlay.style.display = sidebar.classList.contains("active") ? "block" : "none";
        document.body.style.overflow = sidebar.classList.contains("active") ? "hidden" : "auto";
    }
    
    // Cerrar menú al hacer clic en un enlace
    if (window.innerWidth <= 992) {
        const sidebarLinks = document.querySelectorAll(".sidebar button");
        sidebarLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (sidebar.classList.contains("active")) {
                    toggleMobileMenu();
                }
            });
        });
    }
    
    // Eventos del menú mini 
    if(menu) menu.addEventListener("click", toggleMiniSidebar);
    
    // Eventos del menú celu
    if(celuBtn) {
        celuBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }
    
    if(overlay) overlay.addEventListener("click", toggleMobileMenu);
    
    // Ajustes al cambiar tamaño de pantalla
    window.addEventListener("resize", function() {
        if(window.innerWidth > 992) {
            // Desktop - resetear estilos móviles
            sidebar.classList.remove("active");
            overlay.style.display = "none";
            document.body.style.overflow = "auto";
        } else {
            // sidebar hidden
            sidebar.classList.remove("active");
            overlay.style.display = "none";
        }
    });
    
    // RESEÑAS
    const reviewForm = document.getElementById('reviewForm');
    const testimonialGrid = document.querySelector('.testimonial-grid');
    const stars = document.querySelectorAll('.rating-stars .star');
    const ratingInput = document.getElementById('ratingValue');
    
    let reviews = JSON.parse(localStorage.getItem('productReviews')) || [];

    function renderReviews() {
        const dynamicReviews = document.querySelectorAll('.testimonial-card.dynamic');
        dynamicReviews.forEach(review => review.remove());
        
        if (reviews.length === 0) return;
        
        reviews.forEach((review) => {
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card dynamic';
            
            let starsHTML = '';
            for (let i = 0; i < 5; i++) {
                starsHTML += i < review.rating ? 
                    '<i class="fas fa-star"></i>' : 
                    '<i class="far fa-star"></i>';
            }
            
            testimonialCard.innerHTML = `
                <div class="testimonial-rating">
                    ${starsHTML}
                </div>
                <p class="testimonial-text">"${review.text}"</p>
                <p class="testimonial-author">- ${review.userName}</p>
            `;
            
            testimonialGrid.prepend(testimonialCard);
        });
    }
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            ratingInput.value = value;
            
            stars.forEach((s, i) => {
                s.classList.toggle('active', i < value);
                s.innerHTML = i < value ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
            });
        });
    });
    
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userName = document.getElementById('userName').value.trim();
        const reviewText = document.getElementById('reviewText').value.trim();
        const rating = parseInt(ratingInput.value);
        
        if (!userName || !reviewText || rating === 0) {
            alert('Por favor completa todos los campos y selecciona una calificación');
            return;
        }
        
        const newReview = {
            userName,
            text: reviewText,
            rating,
            date: new Date().toISOString()
        };
        
        reviews.unshift(newReview);
        localStorage.setItem('productReviews', JSON.stringify(reviews));
        
        renderReviews();
        reviewForm.reset();
        ratingInput.value = 0;
        stars.forEach(star => {
            star.classList.remove('active');
            star.innerHTML = '<i class="far fa-star"></i>';
        });
        
        alert('¡Gracias por tu reseña!');
    });
    
    renderReviews();
    
    // scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // LOGIN
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.createElement('div');

    loginModal.innerHTML = `
    <div id="login-modal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2 class="modal-title">Iniciar Sesión</h2>
            <form id="login-form" class="modal-form">
                <div class="form-group">
                    <input type="email" placeholder="Correo electrónico" required>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Contraseña" required>
                </div>
                <button type="submit" class="modal-submit-btn">Ingresar</button>
                <p class="modal-footer-text">¿No tienes cuenta? <a href="#" id="register-link">Regístrate</a></p>
            </form>
        </div>
    </div>`;

    document.body.appendChild(loginModal);

    loginBtn.addEventListener('click', () => {
        document.getElementById('login-modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    document.querySelector('#login-modal .close-modal').addEventListener('click', () => {
        document.getElementById('login-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});
