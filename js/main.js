const contenedorProductos = document.querySelector("#contenedor-productos")
let botonesAgregar = document.querySelectorAll(".main-product-button")

let URL = 'https://fakestoreapi.com/products/category/electronics';
//usa los datos del primer array para cargar los productos en cards que cree yo


fetch(URL) 
    .then((res) => res.json())
    
    .then(data => cargarProductos(data));




const cargarProductos = (productos) => {
    contenedorProductos.innerHTML = "";
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("main-product");
        div.innerHTML = `
        <div class="main-product-img">
            <img src="${producto.image}" alt="${producto.title}">
        </div>
            <h2 class="main-product-h2">${producto.title}</h2>
            <p class="main-product-p">$${producto.price}</p>

        <div class="button-flex">
            <button class="main-product-button" id="${producto.id}"><p>Agregar al Carrito</p></button>
        </div>
        `

    contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();



    function actualizarBotonesAgregar() {
        botonesAgregar = document.querySelectorAll(".main-product-button")
    
        botonesAgregar.forEach(boton => {
            boton.addEventListener("click", agregarAlCarrito);
        })
    }
    
    let productosEnCarrito;
    
    
    let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
    
    
    if (productosEnCarritoLS) {
        productosEnCarrito = JSON.parse(productosEnCarritoLS);
    } else {
        productosEnCarrito = [];
    }
    
    function agregarAlCarrito(e) {

        Toastify({

            text: "Producto Agregado",
            
            duration: 1500
            
        }).showToast();
        
    
        const idBoton = e.currentTarget.id;
        const productoAgregado = productos.find(producto => producto.id == idBoton);
        
        
    
    
    
        if (productosEnCarrito.some(producto => producto.id == idBoton)) {
            const index = productosEnCarrito.findIndex(producto => producto.id == idBoton);
            productosEnCarrito[index].cantidad++;
            
        } else {
            productoAgregado.cantidad = 1;
            productosEnCarrito.push(productoAgregado);
            
        }
    
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    }


}





