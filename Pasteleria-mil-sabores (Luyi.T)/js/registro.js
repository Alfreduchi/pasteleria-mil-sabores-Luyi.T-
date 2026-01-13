document.getElementById('registro-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores de los inputs
    const correo = document.getElementById('correo').value;
    const pass = document.getElementById('password').value;
    const fechaNacInput = document.getElementById('fecha-nac').value;
    const codigo = document.getElementById('codigo-promocional').value;
    const run = document.getElementById('run').value;

    // 1. Validación de Correo (Requisito: Solo dominios autorizados)
    // Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com [cite: 530, 633]
    const dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    const esValido = dominiosValidos.some(d => correo.endsWith(d));
    
    if (!esValido) {
        alert("Correo no permitido. Use Duoc o Gmail.");
        return;
    }

    // 2. Validación de Contraseña (Requisito: Largo específico)
    // La contraseña debe tener entre 4 y 10 caracteres [cite: 533]
    if (pass.length < 4 || pass.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres.");
        return;
    }

    // 3. Cálculo de Descuento por Edad (Requisito: 50 años)
    const fechaNac = new Date(fechaNacInput);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const m = hoy.getMonth() - fechaNac.getMonth();
    
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }

    let beneficios = [];

    // Usuarios mayores de 50 años reciben un descuento del 50% [cite: 25]
    if (edad >= 50) {
        beneficios.push("50% de descuento por aniversario");
    }

    // 4. Validación de Código Promocional
    // Descuento del 10% de por vida con el código "FELICES50" [cite: 26]
    if (codigo.toUpperCase() === "FELICES50") {
        beneficios.push("10% de descuento de por vida");
    }

    // 5. Validación Estudiante Duoc
    // Tortas gratis para estudiantes Duoc (@duoc.cl) en su cumpleaños [cite: 27]
    if (correo.endsWith("@duoc.cl")) {
        beneficios.push("Torta gratis en tu cumpleaños");
    }

    // Mostrar resultado final
    const mensajeFinal = beneficios.length > 0 
        ? "Registro exitoso. Beneficios: " + beneficios.join(", ") 
        : "Registro exitoso sin beneficios adicionales.";
    
    alert(mensajeFinal);
});