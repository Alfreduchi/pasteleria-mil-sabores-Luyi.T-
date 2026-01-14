document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contacto-form');
    const comentario = document.getElementById('contacto-comentario');
    const charCount = document.getElementById('char-count');

    // Contador dinámico de caracteres para el comentario
    comentario.addEventListener('input', () => {
        charCount.innerText = `${comentario.value.length} / 500`;
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nombre = document.getElementById('contacto-nombre').value;
        const correo = document.getElementById('contacto-correo').value;
        const mensaje = comentario.value;

        // 1. Validación de Correo (Requisito: dominios específicos)
        const dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
        const esCorreoValido = dominiosValidos.some(d => correo.toLowerCase().endsWith(d));

        if (!esCorreoValido) {
            alert("Error: Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com");
            return;
        }

        // 2. Validación de Largo de Comentario (Requisito: Máx 500)
        if (mensaje.length > 500) {
            alert("El comentario no puede exceder los 500 caracteres.");
            return;
        }

        // Si todo está correcto
        alert(`¡Gracias ${nombre}! Hemos recibido tu mensaje correctamente.`);
        form.reset();
        charCount.innerText = "0 / 500";
    });
});