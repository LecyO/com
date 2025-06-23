
const menu = document.getElementById("menu");
const sidebar = document.querySelector(".sidebar");

menu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
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
