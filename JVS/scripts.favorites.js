
const menuIcon = document.getElementById("menu");
const sidebar = document.getElementById("sidebar");

menuIcon.addEventListener("click", () => {
    //  mini 
    if(window.innerWidth > 767){
        sidebar.classList.toggle("mini");
    }
});

// boton celu
const mobileMenuBtn = document.getElementById("mobile-menu-toggle");

mobileMenuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

// Cerrar barra lateral móvil al hacer click fuera
document.addEventListener("click", (e) => {
    if(window.innerWidth <= 767){
        if(!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)){
            sidebar.classList.remove("active");
        }
    }
});

// Botón de minimizar barra lateral en compu
const desktopToggle = document.getElementById("desktop-toggle");

desktopToggle.addEventListener("click", () => {
    if(window.innerWidth > 767){
        sidebar.classList.toggle("mini");
    }
});


//LOGIN

const loginBtn = document.getElementById('login-btn');
const loginModalHTML = `
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

document.body.insertAdjacentHTML('beforeend', loginModalHTML);

const loginModal = document.getElementById('login-modal');
const closeModalBtn = loginModal.querySelector('.close-modal');

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeModalBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Cerrar modal si se da click fuera del contenido
loginModal.addEventListener('click', (e) => {
    if(e.target === loginModal){
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
