const menu = document.getElementById("menu");
const sidebar = document.querySelector(".sidebar");
const spans = document.querySelectorAll(".sidebar span:not(.page-name span)");


menu.addEventListener("click", () => {
    sidebar.classList.toggle("mini");
    
    spans.forEach(span => {
        span.classList.toggle("hidden");
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    const testimonialGrid = document.querySelector('.testimonial-grid');
    const stars = document.querySelectorAll('.rating-stars .star');
    const ratingInput = document.getElementById('ratingValue');
    
    // Cargar reseñas guardadas
    let reviews = JSON.parse(localStorage.getItem('productReviews')) || [];

    function renderReviews() {
   
        const dynamicReviews = document.querySelectorAll('.testimonial-card.dynamic');
        dynamicReviews.forEach(review => review.remove());
        
        if (reviews.length === 0) return;
        
        reviews.forEach((review) => {
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card dynamic';
            
            // Crear estrellas según la calificación
            let starsHTML = '';
            for (let i = 0; i < 5; i++) {
                starsHTML += i < review.rating ? 
                    '<i class="fas fa-star"></i>' : 
                    '<i class="far fa-star"></i>';
            }
            
            // Agg a HTML con estructura
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
    
    // estrellas
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            ratingInput.value = value;
            
            // Actualizar vista de estrellas
            stars.forEach((s, i) => {
                s.classList.toggle('active', i < value);
                s.innerHTML = i < value ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
            });
        });
    });
    
    // Manejar el envío del formulario
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userName = document.getElementById('userName').value.trim();
        const reviewText = document.getElementById('reviewText').value.trim();
        const rating = parseInt(ratingInput.value);
        
        if (!userName || !reviewText || rating === 0) {
            alert('Por favor completa todos los campos y selecciona una calificación');
            return;
        }
        
        // Crear nueva reseña
        const newReview = {
            userName,
            text: reviewText,
            rating,
            date: new Date().toISOString()
        };
        
        // Agregar a la lista, actualizar y guardar
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
});


//scroll    
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

// Control del modal
loginBtn.addEventListener('click', () => {
    document.getElementById('login-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Cerrar modal
document.querySelector('#login-modal .close-modal').addEventListener('click', () => {
    document.getElementById('login-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
});