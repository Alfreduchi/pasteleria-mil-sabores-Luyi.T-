function cargarCarrito() {
    const items = JSON.parse(localStorage.getItem('carrito')) || [];
    const tabla = document.getElementById('items-carrito');
    const totalElemento = document.getElementById('total-carrito');
    let total = 0;

    tabla.innerHTML = '';

    if (items.length === 0) {
        tabla.innerHTML = '<tr><td colspan="5" class="text-center">Tu carrito está vacío</td></tr>';
        totalElemento.innerText = '$0';
        return;
    }

    items.forEach((prod, index) => {
        const subtotal = prod.precio * prod.cantidad;
        total += subtotal;

        tabla.innerHTML += `
            <tr>
                <td>${prod.nombre}</td>
                <td>$${prod.precio.toLocaleString()}</td>
                <td>
                    <div class="cantidad-controles">
                        <button class="btn-cantidad" onclick="cambiarCantidad(${index}, -1)">-</button>
                        <span class="mx-2">${prod.cantidad}</span>
                        <button class="btn-cantidad" onclick="cambiarCantidad(${index}, 1)">+</button>
                    </div>
                </td>
                <td>$${subtotal.toLocaleString()}</td>
                <td>
                    <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">❌</button>
                </td>
            </tr>
        `;
    });

    totalElemento.innerText = `$${total.toLocaleString()}`;
}
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', cargarCarrito);

// Función para aumentar o disminuir cantidad
function cambiarCantidad(index, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    
    carrito[index].cantidad += cambio;

    // Si la cantidad llega a 0, lo eliminamos automáticamente
    if (carrito[index].cantidad <= 0) {
        eliminarDelCarrito(index);
    } else {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
    }
}

// Función para vaciar carrito con alerta de confirmación
function vaciarCarrito() {
    const seguro = confirm("¿Estás seguro de que quieres borrar todos los productos de tu carrito?");
    
    if (seguro) {
        localStorage.removeItem('carrito');
        cargarCarrito();
        // Opcional: actualizar contador de la navbar si existe
        if (typeof actualizarContadorCarrito === 'function') actualizarContadorCarrito();
        alert("El carrito ha sido vaciado.");
    }
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
}