document.addEventListener("DOMContentLoaded", function() {
    // DOM Elements
    const menu = document.getElementById("menu");
    const sidebar = document.querySelector(".sidebar");
    const spans = document.querySelectorAll(".sidebar span:not(.page-name span)");
    const celuBtn = document.querySelector(".celu-btn");
    const overlay = document.querySelector(".sidebar-overlay");
    
    // 1. Versión mini (para desktop)
    function toggleMiniSidebar() {
        if (window.innerWidth > 992) {
            sidebar.classList.toggle("mini");
            spans.forEach(span => span.classList.toggle("hidden"));
        }
    }
    
    // 2. Menú móvil
    function toggleMobileMenu() {
        sidebar.classList.toggle("active");
        overlay.style.display = sidebar.classList.contains("active") ? "block" : "none";
        document.body.style.overflow = sidebar.classList.contains("active") ? "hidden" : "auto";
        
        // Solución específica para iOS
        if (sidebar.classList.contains("active")) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }
    
    // Cerrar menú al hacer clic en un enlace (para móviles)
    const sidebarLinks = document.querySelectorAll(".sidebar button");
    sidebarLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            if (window.innerWidth <= 992) {
                toggleMobileMenu();
            }
        });
    });
    
    // Eventos del menú mini (solo desktop)
    if(menu) menu.addEventListener("click", toggleMiniSidebar);
    
    // Eventos del menú móvil
    if(celuBtn) {
        celuBtn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Evento táctil adicional para iOS
        celuBtn.addEventListener("touchstart", function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });
    }
    
    if(overlay) {
        overlay.addEventListener("click", toggleMobileMenu);
        overlay.addEventListener("touchstart", toggleMobileMenu);
    }
    
    // Ajustes al cambiar tamaño de pantalla
    function handleResize() {
        if(window.innerWidth > 992) {
            // Desktop - resetear estilos móviles
            sidebar.classList.remove("active", "mini");
            overlay.style.display = "none";
            document.body.style.overflow = "auto";
            document.body.classList.remove('menu-open');
            spans.forEach(span => span.classList.remove("hidden"));
        } else {
            // Móvil - asegurar que la barra lateral está oculta inicialmente
            sidebar.classList.remove("active");
            overlay.style.display = "none";
        }
    }
    
    window.addEventListener("resize", handleResize);
    
    // Inicialización
    handleResize();
    
    // ... (Aquí mantén el resto de tu código existente para reseñas y login)
    // RESEÑAS
    const reviewForm = document.getElementById('reviewForm');
    const testimonialGrid = document.querySelector('.testimonial-grid');
    const stars = document.querySelectorAll('.rating-stars .star');
    const ratingInput = document.getElementById('ratingValue');
    
    // ... (todo el código de reseñas que ya tenías)
    
    // LOGIN
    const loginBtn = document.getElementById('login-btn');
    // ... (todo el código de login que ya tenías)
});
