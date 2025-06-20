const menu = document.getElementById("menu");
const sidebar = document.querySelector(".sidebar");
const spans = document.querySelectorAll(".sidebar span:not(.page-name span)");


menu.addEventListener("click", () => {
    sidebar.classList.toggle("mini");
    
    spans.forEach(span => {
        span.classList.toggle("hidden");
    });
});

//scroll
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const aboutButton = document.querySelector('.sidebar button[onclick*="about"]') || 
                       document.querySelector('.sidebar button:has(span:contains("About"))');
    
    if (aboutButton) {
        aboutButton.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollTo('#about-section'); 
        });
    }
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

// Control del login
loginBtn.addEventListener('click', () => {
    document.getElementById('login-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Cerrar login
document.querySelector('#login-modal .close-modal').addEventListener('click', () => {
    document.getElementById('login-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Enlace a registro
document.getElementById('register-link').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('register-modal').style.display = 'block';

});


// Control del menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById(".celu.btn");
    const sidebar = document.querySelector(".sidebar");
    
    menuBtn.addEventListener("click", function() {
        sidebar.classList.toggle("mini");
    });
});
// Controlar cambios de tamaño de pantalla
window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
        sidebar.style.transform = '';
    }
});
