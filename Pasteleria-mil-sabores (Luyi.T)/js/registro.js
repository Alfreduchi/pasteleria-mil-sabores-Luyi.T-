document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('registro-form');

    if (formulario) {
        formulario.addEventListener('submit', function (e) {
            e.preventDefault();

            // Captura de datos del formulario
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const confCorreo = document.getElementById('confirmar-correo').value;
            const pass = document.getElementById('password').value;
            const confPass = document.getElementById('confirmar-password').value;
            const fechaNacInput = document.getElementById('fecha-nac').value;
            const codigo = document.getElementById('codigo-promocional').value;

            // 1. Validar coincidencia de correos
            if (correo !== confCorreo) {
                alert("Los correos electrónicos no coinciden.");
                return;
            }

            // 2. Validación de Correo Institucional (Requisito: cite 530, 633)
            const dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
            const esValido = dominiosValidos.some(d => correo.toLowerCase().endsWith(d));
            if (!esValido) {
                alert("Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
                return;
            }

            // 3. Validación de Contraseña (Requisito: 4-10 caracteres, cite 533)
            if (pass.length < 4 || pass.length > 10) {
                alert("La contraseña debe tener entre 4 y 10 caracteres.");
                return;
            }
            if (pass !== confPass) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            // 4. Cálculo de edad para beneficios (Requisito: 50 años, cite 25)
            const fechaNac = new Date(fechaNacInput);
            const hoy = new Date();
            let edad = hoy.getFullYear() - fechaNac.getFullYear();
            const mesActual = hoy.getMonth();
            const mesNac = fechaNac.getMonth();

            if (mesActual < mesNac || (mesActual === mesNac && hoy.getDate() < fechaNac.getDate())) {
                edad--;
            }

            let beneficios = [];

            // Regla: Mayores de 50 años tienen 50% de descuento 
            if (edad >= 50) {
                beneficios.push("50% de descuento por Aniversario");
            }

            // Regla: Código FELICES50 otorga 10% 
            if (codigo.trim().toUpperCase() === "FELICES50") {
                beneficios.push("10% de descuento de por vida");
            }

            // Regla: Estudiantes Duoc torta gratis 
            if (correo.toLowerCase().endsWith("@duoc.cl")) {
                beneficios.push("Torta gratis en tu cumpleaños");
            }

            // Resultado Final
            const resumen = beneficios.length > 0
                ? "Registro Exitoso.\nBeneficios Aplicados:\n- " + beneficios.join("\n- ")
                : "Registro Exitoso sin beneficios adicionales.";

            alert(resumen);
        });
    }
});