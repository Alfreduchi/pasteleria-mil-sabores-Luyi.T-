document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('login-form');

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            const correo = document.getElementById('login-correo').value.trim().toLowerCase();
            const pass = document.getElementById('login-pass').value.trim();

            // 1. Definición de dominios permitidos según requerimiento
            const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
            
            // 2. Verificación de si el correo termina con alguno de los dominios autorizados
            const esDominioValido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));

            if (!esDominioValido) {
                // Si el dominio no es válido, se bloquea el acceso inmediatamente
                alert("Acceso denegado. Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
                return;
            }

            // 3. Lógica para validar credenciales (aquí buscarías en tu base de datos o LocalStorage)
            // Por ahora, solo mostramos que pasó la validación de dominio
            alert("Dominio válido. Procesando inicio de sesión...");
        });
    }
});