document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const btnClose = document.getElementById("btn-close");

  if (menuBtn && mobileMenu && btnClose) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-full");
    });

    btnClose.addEventListener("click", () => {
      mobileMenu.classList.add("translate-x-full");
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
    

    const cabecera = document.getElementById("cabecera");

    function dibujarIconoCarrito() {
        const carritoContenedor = document.createElement("div");

        carritoContenedor.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                class="icon icon-tabler icon-tabler-shopping-bag">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304" />
                <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
            </svg>
        `;
        carritoContenedor.id = "carritoContenedor";
        carritoContenedor.className = "hover:cursor-pointer";

        cabecera.append(carritoContenedor);
    }

    function obtenerCarrito() {
        return JSON.parse(localStorage.getItem("carritoGlobal")) || [];
    }

    function guardarCarrito(carrito) {
        localStorage.setItem("carritoGlobal", JSON.stringify(carrito));
    }

    function calcularTotal() {
        let carrito = obtenerCarrito();
        let total = 0;

        carrito.forEach(item => {
            total += Number(item.price) * Number(item.amount);
        });

        return total;
    }

    function dibujarListaCarrito() {
    const carrito = obtenerCarrito();
    const lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";

    carrito.forEach(articulo => {
        const li = document.createElement("li");
        li.className = "flex items-center gap-4 p-3 mb-3 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition";

        // Imagen
        const img = document.createElement("img");
        img.src = articulo.imageURL || "../img/default.webp";
        img.alt = articulo.name;
        img.className = "w-16 h-16 object-cover rounded";

        // Info del producto
        const info = document.createElement("div");
        info.className = "flex-1 flex flex-col";

        const name = document.createElement("span");
        name.textContent = articulo.name;
        name.className = "font-semibold text-gray-800";

        const price = document.createElement("span");
        price.textContent = (Number(articulo.price) * Number(articulo.amount)) + " €";
        price.className = "text-gray-600 text-sm";

        // Contador de cantidad
        const cantidadDiv = document.createElement("div");
        cantidadDiv.className = "flex items-center gap-2 mt-1";

        const btnMenos = document.createElement("button");
        btnMenos.textContent = "-";
        btnMenos.className = "px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600";

        const cantidad = document.createElement("span");
        cantidad.textContent = articulo.amount;
        cantidad.className = "px-2";

        const btnMas = document.createElement("button");
        btnMas.textContent = "+";
        btnMas.className = "px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600";

        cantidadDiv.append(btnMenos, cantidad, btnMas);

        // Botón eliminar
        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Eliminar";
        btnDelete.className = "px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-900";

        // Eventos
        btnMas.addEventListener("click", () => {
            articulo.amount++;
            let carritoActual = obtenerCarrito().map(p => p.id === articulo.id ? { ...p, amount: articulo.amount } : p);
            guardarCarrito(carritoActual);
            dibujarListaCarrito();
        });

        btnMenos.addEventListener("click", () => {
            articulo.amount--;
            if (articulo.amount < 1) articulo.amount = 0;
            let carritoActual = obtenerCarrito().map(p => p.id === articulo.id ? { ...p, amount: articulo.amount } : p);
            guardarCarrito(carritoActual);
            dibujarListaCarrito();
        });

        btnDelete.addEventListener("click", () => {
            let carritoActual = obtenerCarrito().filter(a => a.id !== articulo.id);
            guardarCarrito(carritoActual);
            dibujarListaCarrito();
        });

        info.append(name, price, cantidadDiv);
        li.append(img, info, btnDelete);
        lista.append(li);
    });

    // Total
    const totalDiv = document.createElement("div");
    totalDiv.className = "mt-4 p-3 font-bold text-lg text-right border-t border-gray-300";
    totalDiv.textContent = "Total: " + calcularTotal() + " €";
    lista.append(totalDiv);
}

    function crearPanelCarrito() {
        const panel = document.createElement("div");
        panel.className = "fixed top-0 right-0 w-full md:w-1/2 h-screen bg-white shadow-lg p-6 translate-x-full transition-transform";

        panel.innerHTML = `
            <button id="cerrarCarrito">X</button>
            <ul id="listaCarrito" class="mt-4"></ul>
        `;

        document.body.append(panel);

        const carritoBtn = document.getElementById("carritoContenedor");
        carritoBtn.addEventListener("click", () => {
            panel.classList.remove("translate-x-full");
            dibujarListaCarrito();
        });

        document.getElementById("cerrarCarrito").addEventListener("click", () => {
            panel.classList.add("translate-x-full");
        });
    }
document.addEventListener("actualizarCarrito", () => {
    dibujarListaCarrito();
});
    dibujarIconoCarrito();
    crearPanelCarrito();
});