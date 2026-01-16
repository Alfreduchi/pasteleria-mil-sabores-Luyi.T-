// En js/detalle.js
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const idCapturado = params.get('id'); // Atrapa el '101' de la URL

    // Buscamos el producto en tu lista global
    const producto = productos.find(p => p.codigo == idCapturado);

    if (producto) {
        // Llenamos los textos de detalle.html
        document.getElementById('detalle-nombre').innerText = producto.nombre;
        document.getElementById('detalle-precio').innerText = `$${producto.precio.toLocaleString()}`;
        document.getElementById('detalle-img').src = producto.imagen;
        document.getElementById('detalle-descripcion').innerText = producto.descripcion;
    }
});

function agregarDesdeDetalle() {
    const cant = parseInt(document.getElementById('cantidad-detalle').value);
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const producto = productos.find(p => p.codigo == id);

    // Reutilizamos tu lógica de carrito pero con la cantidad del selector
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existe = carrito.find(item => item.codigo == id);

    if (existe) {
        existe.cantidad += cant;
    } else {
        carrito.push({ ...producto, cantidad: cant });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert("¡Añadido al pedido!");
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Capturamos el ID de la URL (ej: ?id=101)
    const params = new URLSearchParams(window.location.search);
    const idCapturado = params.get('id');

    // 2. Buscamos el producto en tu lista global (asegúrate que 'productos' sea visible aquí)
    const producto = productos.find(p => p.codigo == idCapturado);

    if (producto) {
        // Rellenamos los datos en el HTML
        document.getElementById('detalle-img').src = producto.imagen;
        document.getElementById('detalle-nombre').innerText = producto.nombre;
        document.getElementById('detalle-precio').innerText = `$${producto.precio.toLocaleString()}`;
        document.getElementById('detalle-descripcion').innerText = producto.descripcion;
        
        // Actualizamos los Breadcrumbs (opcional)
        const breadcrumb = document.getElementById('breadcrumb-nombre');
        if (breadcrumb) breadcrumb.innerText = producto.nombre;
    } else {
        // Si no existe el producto, redirigimos a la tienda
        window.location.href = 'productos.html';
    }
});

// 3. Función para que el botón "Añadir al carrito" y la cantidad funcionen
function agregarDesdeDetalle() {
    const params = new URLSearchParams(window.location.search);
    const idCapturado = params.get('id');
    const producto = productos.find(p => p.codigo == idCapturado);
    
    // Obtenemos la cantidad del input
    const cantidadInput = document.getElementById('cantidad-detalle');
    const cantidad = parseInt(cantidadInput.value);

    if (producto && cantidad > 0) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        // Revisamos si ya existe para sumar la cantidad
        const existe = carrito.find(item => item.codigo == idCapturado);
        
        if (existe) {
            existe.cantidad += cantidad;
        } else {
            carrito.push({ ...producto, cantidad: cantidad });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`¡Has añadido ${cantidad} unidad(es) de ${producto.nombre} al pedido!`);
        
        // Actualizar contador si tienes la función
        if (typeof actualizarContadorCarrito === 'function') {
            actualizarContadorCarrito();
        }
    }
}