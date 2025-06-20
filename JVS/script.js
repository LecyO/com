// Elementos del DOM
const menu = document.getElementById("menu");
const sidebar = document.querySelector(".sidebar");
const spans = document.querySelectorAll(".sidebar span:not(.page-name span)");
const celuBtn = document.querySelector(".celu-btn");
const overlay = document.querySelector(".sidebar-overlay");

// Función para alternar el sidebar (versión mini)
function toggleMiniSidebar() {
    sidebar.classList.toggle("mini");
    
    spans.forEach(span => {
        span.classList.toggle("hidden");
    });
}

// Función para alternar el sidebar en móviles
function toggleMobileSidebar() {
    sidebar.classList.toggle("active");
    
    // Bloquear el scroll del body cuando el menú está abierto
    document.body.style.overflow = sidebar.classList.contains("active") ? "hidden" : "auto";
}

// Cerrar menú al hacer clic en el overlay
overlay.addEventListener("click", toggleMobileSidebar);

// Event Listeners
menu.addEventListener("click", toggleMiniSidebar);
celuBtn.addEventListener("click", toggleMobileSidebar);

// Cerrar menú al cambiar tamaño de pantalla
window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
        sidebar.classList.remove("active");
        document.body.style.overflow = "auto";
    } else {
        sidebar.classList.remove("mini");
    }
});

// Smooth Scroll
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

document.querySelector('.about-btn').addEventListener('click', function(e) {
    e.preventDefault();
    smoothScrollTo('#about-section');
});

// LOGIN MODAL
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
});
