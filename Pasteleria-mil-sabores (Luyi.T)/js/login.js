document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const correo = document.getElementById('login-correo').value.trim();
        const pass = document.getElementById('login-pass').value;

        // 1. Validaciones de Correo (cite: 527-530)
        if (correo.length > 100) {
            alert("El correo no puede exceder los 100 caracteres.");
            return;
        }

        const dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
        const esDominioValido = dominiosValidos.some(d => correo.toLowerCase().endsWith(d));

        if (!esDominioValido) {
            alert("Acceso denegado. Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
            return;
        }

        // 2. Validaciones de Contraseña (cite: 531-533)
        if (pass.length < 4 || pass.length > 10) {
            alert("La contraseña debe tener entre 4 y 10 caracteres.");
            return;
        }

        // 3. Simulación de inicio de sesión exitoso
        alert("¡Bienvenido a Pastelería Mil Sabores!");
        
        // Redirección opcional según requerimientos
        window.location.href = "index.html"; 
    });
});