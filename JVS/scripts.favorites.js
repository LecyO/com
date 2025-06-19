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
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('ratingValue');
    const reviewsList = document.getElementById('reviewsList');
    
    // Manejar selección de estrellas
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            ratingInput.value = value;
            
            stars.forEach(s => {
                s.classList.toggle('active', parseInt(s.getAttribute('data-value')) <= value);
            });
        });
    });
    
    // Manejar envío del formulario
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userName = document.getElementById('userName').value;
        const rating = ratingInput.value;
        const reviewText = document.getElementById('reviewText').value;
        
        if (rating === "0") {
            alert('Por favor selecciona una calificación');
            return;
        }
        
        addReview(userName, rating, reviewText);
        reviewForm.reset();
        stars.forEach(s => s.classList.remove('active'));
        ratingInput.value = "0";
    });
    
    // Función para agregar reseña
    function addReview(name, rating, text) {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        
        const now = new Date();
        const dateStr = now.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        reviewCard.innerHTML = `
            <div class="review-header">
                <span class="review-author">${name}</span>
                <span class="review-rating">${'★'.repeat(rating)}${'☆'.repeat(5-rating)}</span>
            </div>
            <div class="review-date">${dateStr}</div>
            <div class="review-content">${text}</div>
        `;
        
        reviewsList.prepend(reviewCard);
    }
    
    function loadExistingReviews() {
        const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        savedReviews.forEach(review => {
            addReview(review.name, review.rating, review.text);
        });
    }
    
    function saveReview(name, rating, text) {
        const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        savedReviews.push({ name, rating, text });
        localStorage.setItem('reviews', JSON.stringify(savedReviews));
    }
    
    function addReview(name, rating, text) {
      
        saveReview(name, rating, text);
    }
    
    
    loadExistingReviews();
});

//LOGIN

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