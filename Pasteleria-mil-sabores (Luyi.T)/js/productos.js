const productos = [
    {
        codigo: "TC001",
        categoria: "Tortas Cuadradas",
        nombre: "Torta Cuadrada de Chocolate",
        precio: 45000,
        descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes.",
        imagen: "img/tc001.jpg"
    },
    {
        codigo: "TC002",
        categoria: "Tortas Cuadradas",
        nombre: "Torta Cuadrada de Frutas",
        precio: 50000,
        descripcion: "Mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.",
        imagen: "img/tc002.jpg"
    },
    {
        codigo: "TT001",
        categoria: "Tortas Circulares",
        nombre: "Torta Circular de Vainilla",
        precio: 40000,
        descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce.",
        imagen: "img/tt001.jpg"
    },
    {
        codigo: "TT002",
        categoria: "Tortas Circulares",
        nombre: "Torta Circular de Manjar",
        precio: 42000,
        descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para amantes de los sabores clásicos.",
        imagen: "img/tt002.jpg"
    },
    {
        codigo: "PI001",
        categoria: "Postres Individuales",
        nombre: "Mousse de Chocolate",
        precio: 5000,
        descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad.",
        imagen: "img/pi001.jpg"
    },
    {
        codigo: "PI002",
        categoria: "Postres Individuales",
        nombre: "Tiramisú Clásico",
        precio: 5500,
        descripcion: "Postre italiano individual con capas de café, mascarpone y cacao.",
        imagen: "img/pi002.jpg"
    },
    {
        codigo: "PSA001",
        categoria: "Productos Sin Azúcar",
        nombre: "Torta Sin Azúcar de Naranja",
        precio: 48000,
        descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para opciones más saludables.",
        imagen: "img/psa001.jpg"
    },
    {
        codigo: "PSA002",
        categoria: "Productos Sin Azúcar",
        nombre: "Cheesecake Sin Azúcar",
        precio: 47000,
        descripcion: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.",
        imagen: "img/psa002.jpg"
    },
    {
        codigo: "PT001",
        categoria: "Pastelería Tradicional",
        nombre: "Empanada de Manzana",
        precio: 3000,
        descripcion: "Pastelería tradicional rellena de manzanas especiadas, perfecta para desayuno o merienda.",
        imagen: "img/pt001.jpg"
    },
    {
        codigo: "PT002",
        categoria: "Pastelería Tradicional",
        nombre: "Tarta de Santiago",
        precio: 6000,
        descripcion: "Tradicional tarta española hecha con almendras, azúcar y huevos.",
        imagen: "img/pt002.jpg"
    },
    {
        codigo: "PG001",
        categoria: "Productos Sin Gluten",
        nombre: "Brownie Sin Gluten",
        precio: 4000,
        descripcion: "Rico y denso, este brownie es perfecto para evitar el gluten sin sacrificar el sabor.",
        imagen: "img/pg001.jpg"
    },
    {
        codigo: "PG002",
        categoria: "Productos Sin Gluten",
        nombre: "Pan Sin Gluten",
        precio: 3500,
        descripcion: "Suave y esponjoso, ideal para sandwiches o acompañar cualquier comida.",
        imagen: "img/pg002.jpg"
    },
    {
        codigo: "PV001",
        categoria: "Productos Veganos",
        nombre: "Torta Vegana de Chocolate",
        precio: 50000,
        descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal.",
        imagen: "img/pv001.jpg"
    },
    {
        codigo: "PV002",
        categoria: "Productos Veganos",
        nombre: "Galletas Veganas de Avena",
        precio: 4500,
        descripcion: "Crujientes y sabrosas, una excelente opción para un snack saludable y vegano.",
        imagen: "img/pv002.jpg"
    },
    {
        codigo: "TE001",
        categoria: "Tortas Especiales",
        nombre: "Torta Especial de Cumpleaños",
        precio: 55000,
        descripcion: "Diseñada especialmente para celebraciones, personalizable con decoraciones únicas.",
        imagen: "img/te001.jpg"
    },
    {
        codigo: "TE002",
        categoria: "Tortas Especiales",
        nombre: "Torta Especial de Boda",
        precio: 60000,
        descripcion: "Elegante y deliciosa, diseñada para ser el centro de atención en cualquier boda.",
        imagen: "img/te002.jpg"
    }
];

function renderizarProductos() {
    const contenedor = document.getElementById('lista-productos');
    if (!contenedor) return;

    contenedor.innerHTML = "";

    // 1. Obtener todas las categorías únicas del arreglo de productos
    const categorias = [...new Set(productos.map(p => p.categoria))];

    // 2. Recorrer cada categoría para crear su sección
    categorias.forEach(categoria => {
        // Crear el título de la categoría
        const seccion = document.createElement('section');
        seccion.className = 'categoria-section';
        seccion.innerHTML = `<h3 class="titulo-categoria">${categoria}</h3>`;

        const grid = document.createElement('div');
        grid.className = 'product-grid';

        // 3. Filtrar productos que pertenecen a esta categoría
        const productosFiltrados = productos.filter(p => p.categoria === categoria);

        productosFiltrados.forEach(p => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'product-card';
            tarjeta.innerHTML = `
                <div class="product-image-container">
                    <img src="${p.imagen}" alt="${p.nombre}">
                </div>
                <div class="product-info">
                    <h4>${p.nombre}</h4>
                    <p class="descripcion-corta">${p.descripcion}</p>
                    <p class="precio">$${p.precio.toLocaleString('es-CL')}</p>
                    <button class="btn-chocolate" onclick="agregarAlCarrito('${p.codigo}')">
                        Añadir al carrito
                    </button>
                </div>
            `;
            grid.appendChild(tarjeta);
        });

        seccion.appendChild(grid);
        contenedor.appendChild(seccion);
    });
}

// 1. Función para agregar productos al carrito (Requisito: JS y LocalStorage)
function agregarAlCarrito(codigo) {
    // Buscamos el producto en nuestro arreglo
    const producto = productos.find(p => p.codigo === codigo);
    
    // Obtenemos el carrito actual de LocalStorage o creamos uno vacío
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Añadimos el producto al arreglo del carrito
    carrito.push(producto);
    
    // Guardamos de nuevo en LocalStorage (Requisito: cite 555)
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    alert(`¡${producto.nombre} añadido al carrito!`);
    actualizarContadorCarrito();
}

// 2. Función para actualizar el número en el icono del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.getElementById('cart-count');
    if (contador) {
        contador.innerText = `🛒 Cart (${carrito.length})`;
    }
}

// 3. EJECUCIÓN: Esto hace que los productos aparezcan al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarContadorCarrito();
});

function filtrarProductos() {
    const categoriaSeleccionada = document.getElementById('filtro-categoria').value;
    const contenedor = document.getElementById('lista-productos');
    contenedor.innerHTML = ""; // Limpiamos la vista actual

    if (categoriaSeleccionada === "todos") {
        // Si elige "todos", volvemos a llamar a la función original que muestra todo agrupado
        renderizarProductos();
    } else {
        // Si elige una específica, filtramos el arreglo original
        const productosFiltrados = productos.filter(p => p.categoria === categoriaSeleccionada);
        
        // Creamos solo una sección para la categoría elegida
        const seccion = document.createElement('section');
        seccion.className = 'categoria-section';
        seccion.innerHTML = `<h3 class="titulo-categoria">${categoriaSeleccionada}</h3>`;

        const grid = document.createElement('div');
        grid.className = 'product-grid';

        productosFiltrados.forEach(p => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'product-card';
            tarjeta.innerHTML = `
                <div class="product-image-container">
                    <img src="${p.imagen}" alt="${p.nombre}">
                </div>
                <div class="product-info">
                    <h4>${p.nombre}</h4>
                    <p class="descripcion-corta">${p.descripcion}</p>
                    <p class="precio">$${p.precio.toLocaleString('es-CL')}</p>
                    <button class="btn-chocolate" onclick="agregarAlCarrito('${p.codigo}')">
                        Añadir al carrito
                    </button>
                </div>
            `;
            grid.appendChild(tarjeta);
        });

        seccion.appendChild(grid);
        contenedor.appendChild(seccion);
    }
}