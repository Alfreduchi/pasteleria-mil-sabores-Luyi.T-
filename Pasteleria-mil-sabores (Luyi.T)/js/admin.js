// 1. SINCRONIZACIÓN INICIAL
// Intentamos obtener productos del almacenamiento local
let listaProductos = JSON.parse(localStorage.getItem('productos'));

// Si no hay productos en el almacenamiento, usamos los del archivo productos.js
if (!listaProductos || listaProductos.length === 0) {
    // 'productos' es la variable global definida en tu archivo productos.js
    listaProductos = typeof productos !== 'undefined' ? productos : [];
    localStorage.setItem('productos', JSON.stringify(listaProductos));
}

// 2. INICIALIZACIÓN AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    renderizarTablaProductos();
    
    // Escuchar el envío del formulario (Crear o Editar)
    const formProducto = document.getElementById('form-producto');
    if (formProducto) {
        formProducto.addEventListener('submit', guardarProducto);
    }
});

// 3. FUNCIÓN PARA VER (RENDERIZAR) LOS PRODUCTOS
function renderizarTablaProductos() {
    const container = document.getElementById('tabla-productos-container');
    if (!container) return;

    if (listaProductos.length === 0) {
        container.innerHTML = `
            <div class="alert alert-info text-center m-3">
                No hay productos registrados. ¡Crea el primero!
            </div>`;
        return;
    }

    let html = `
        <table class="table table-hover align-middle shadow-sm bg-white">
            <thead class="table-chocolate text-white">
                <tr>
                    <th>Imagen</th>
                    <th>Cod</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th class="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>`;

    listaProductos.forEach((p, index) => {
        html += `
            <tr>
                <td>
                    <img src="${p.imagen}" class="img-admin-preview" 
                         style="width:50px; height:50px; object-fit:cover; border-radius:5px; border: 1px solid #FFC0CB;">
                </td>
                <td><span class="badge bg-light text-dark border">${p.codigo}</span></td>
                <td class="fw-bold text-chocolate">${p.nombre}</td>
                <td>${p.categoria}</td>
                <td class="text-success fw-bold">$${p.precio.toLocaleString()}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary me-2" onclick="prepararEdicion(${index})" data-bs-toggle="modal" data-bs-target="#modalProducto">
                        ✏️ Editar
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${index})">
                        🗑️ Borrar
                    </button>
                </td>
            </tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

// 4. FUNCIÓN PARA CREAR / EDITAR (GUARDAR)
function guardarProducto(e) {
    e.preventDefault();
    
    // Obtenemos el índice (si es -1 es nuevo, si no, es edición)
    const index = document.getElementById('admin-index').value;

    const productoData = {
        codigo: document.getElementById('admin-codigo').value,
        nombre: document.getElementById('admin-nombre').value,
        categoria: document.getElementById('admin-categoria').value,
        precio: parseInt(document.getElementById('admin-precio').value),
        descripcion: document.getElementById('admin-descripcion').value,
        imagen: document.getElementById('admin-imagen').value || 'img/default.jpg'
    };

    if (index === "-1") {
        // Lógica para CREAR
        listaProductos.push(productoData);
    } else {
        // Lógica para EDITAR
        listaProductos[index] = productoData;
    }

    // Guardar en LocalStorage y actualizar vista
    localStorage.setItem('productos', JSON.stringify(listaProductos));
    renderizarTablaProductos();
    
    // Cerrar el modal de Bootstrap
    const modalElement = document.getElementById('modalProducto');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();
}

// 5. FUNCIÓN PARA PREPARAR LA EDICIÓN (CARGAR DATOS AL MODAL)
window.prepararEdicion = (index) => {
    const p = listaProductos[index];
    document.getElementById('modalTitulo').innerText = "Editando: " + p.nombre;
    document.getElementById('admin-index').value = index;
    document.getElementById('admin-codigo').value = p.codigo;
    document.getElementById('admin-nombre').value = p.nombre;
    document.getElementById('admin-categoria').value = p.categoria;
    document.getElementById('admin-precio').value = p.precio;
    document.getElementById('admin-descripcion').value = p.descripcion;
    document.getElementById('admin-imagen').value = p.imagen;
};

// 6. FUNCIÓN PARA LIMPIAR FORMULARIO (NUEVO PRODUCTO)
window.limpiarFormulario = () => {
    document.getElementById('form-producto').reset();
    document.getElementById('admin-index').value = "-1";
    document.getElementById('modalTitulo').innerText = "Registrar Nuevo Producto";
};

// 7. FUNCIÓN PARA ELIMINAR
window.eliminarProducto = (index) => {
    const p = listaProductos[index];
    if (confirm(`¿Estás seguro de eliminar "${p.nombre}" del catálogo?`)) {
        listaProductos.splice(index, 1);
        localStorage.setItem('productos', JSON.stringify(listaProductos));
        renderizarTablaProductos();
    }
};

//Gestion de Usuarios 

// 1. Inicialización de datos
let listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [
    { nombre: "Admin Mil Sabores", correo: "admin@milsabores.com", rol: "Administrador" }
];

document.addEventListener('DOMContentLoaded', () => {
    renderizarTablaProductos();
    renderizarTablaUsuarios();

    // Escuchar el envío del formulario de usuarios
    const formUser = document.getElementById('form-usuario');
    if (formUser) {
        formUser.addEventListener('submit', guardarUsuario);
    }
});

// 2. FUNCIÓN DE VALIDACIÓN (Regex)
function validarCorreo(correo) {
    // Definimos los dominios permitidos
    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    
    // Convertimos el correo a minúsculas para evitar errores de mayúsculas
    const correoMinusculas = correo.toLowerCase();

    // Verificamos si el correo termina en alguno de los dominios autorizados
    return dominiosPermitidos.some(dominio => correoMinusculas.endsWith(dominio));
}

// 3. FUNCIÓN PARA GUARDAR USUARIO CON VALIDACIÓN
function guardarUsuario(e) {
    e.preventDefault();
    
    const index = document.getElementById('admin-user-index').value;
    const nombre = document.getElementById('user-nombre').value.trim();
    const correo = document.getElementById('user-correo').value.trim();
    const rol = document.getElementById('user-rol').value;

    // Validación de campos vacíos
    if (!nombre || !correo) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    // APLICACIÓN DE LA REGLA DE DOMINIOS
    if (!validarCorreo(correo)) {
        alert("Correo no permitido. Solo se aceptan correos de:\n- @duoc.cl\n- @profesor.duoc.cl\n- @gmail.com");
        document.getElementById('user-correo').focus();
        return;
    }

    // Verificación de duplicados (solo para nuevos registros)
    if (index === "-1") {
        const existe = listaUsuarios.find(u => u.correo.toLowerCase() === correo.toLowerCase());
        if (existe) {
            alert("Este correo electrónico ya está registrado.");
            return;
        }
    }

    // Guardado de datos
    const usuarioData = { nombre, correo, rol };

    if (index === "-1") {
        listaUsuarios.push(usuarioData);
    } else {
        listaUsuarios[index] = usuarioData;
    }

    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
    renderizarTablaUsuarios();
    
    // Cerrar el modal
    const modalElement = document.getElementById('modalUsuario');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();
}

// 4. FUNCIÓN PARA VER LA TABLA DE USUARIOS
function renderizarTablaUsuarios() {
    const container = document.getElementById('tabla-usuarios-container');
    if (!container) return;

    let html = `
        <table class="table table-hover align-middle shadow-sm bg-white">
            <thead class="table-chocolate text-white">
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th class="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>`;

    listaUsuarios.forEach((u, index) => {
        html += `
            <tr>
                <td class="fw-bold text-chocolate">${u.nombre}</td>
                <td>${u.correo}</td>
                <td><span class="badge bg-info text-dark">${u.rol}</span></td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary me-2" onclick="prepararEdicionUsuario(${index})" data-bs-toggle="modal" data-bs-target="#modalUsuario">
                        ✏️
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarUsuario(${index})">
                        🗑️
                    </button>
                </td>
            </tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

// 5. FUNCIONES AUXILIARES (Edición, Limpieza, Borrado)
window.limpiarFormularioUsuario = () => {
    document.getElementById('form-usuario').reset();
    document.getElementById('admin-user-index').value = "-1";
    document.getElementById('modalUsuarioTitulo').innerText = "Registrar Nuevo Usuario";
};

window.prepararEdicionUsuario = (index) => {
    const u = listaUsuarios[index];
    document.getElementById('admin-user-index').value = index;
    document.getElementById('user-nombre').value = u.nombre;
    document.getElementById('user-correo').value = u.correo;
    document.getElementById('user-rol').value = u.rol;
    document.getElementById('modalUsuarioTitulo').innerText = "Editando: " + u.nombre;
};

window.eliminarUsuario = (index) => {
    if (confirm(`¿Estás seguro de eliminar a ${listaUsuarios[index].nombre}?`)) {
        listaUsuarios.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
        renderizarTablaUsuarios();
    }
};