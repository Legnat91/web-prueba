document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const btnClose = document.getElementById("btn-close");
    const cabecera = document.getElementById("cabecera");



    function dibujarCarrito() {
        const carritoContenedor = document.createElement("div");
        carritoContenedor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304" /><path d="M9 11v-5a3 3 0 0 1 6 0v5" /></svg>`;
        carritoContenedor.className = "hover:cursor-pointer";
        carritoContenedor.id = "carritoContenedor";
        cabecera.append(carritoContenedor);
    };

    function cargarDatosCarro() {
        const cargarCarrito = JSON.parse(localStorage.getItem("carritoGlobal")) || [];
        dibujarCarrito(cargarCarrito);
    }

    // function dibujarCarrito(arrayCarrito) {

    //     arrayCarrito.forEach(articulo => {
    //          const listaCarrito = document.createElement("ul");
    //     const articulosCarrito = document.createElement("li");
    //     });

    // }

    function listaCarrito() {
        const carritoContenedor = document.getElementById("carritoContenedor");
        const carritoLista = document.createElement("div");

        carritoLista.className =
            "fixed top-0 right-0 transform translate-x-full transition-transform duration-500 bg-white shadow-lg h-screen w-full sm:w-72 flex flex-col gap-8 px-6 py-4 text-lime-500 z-50";

        carritoLista.innerHTML = `<svg id="carritoCerrar" class="hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-x">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>`;

        document.body.append(carritoLista);


        carritoContenedor.addEventListener("click", () => {
            carritoLista.classList.remove("translate-x-full");

        });

        document.getElementById("carritoCerrar").addEventListener("click", () => {
            carritoLista.classList.add("translate-x-full");
        });

        document.addEventListener("click", (e) => {

            if (
                !carritoLista.contains(e.target) &&
                !carritoContenedor.contains(e.target)
            ) {
                carritoLista.classList.add("translate-x-full");
            }

        });

        listaCarrito.append(articulosCarrito);
        carritoLista.append(listaCarrito);

    }


    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("translate-x-full");
    });

    btnClose.addEventListener("click", () => {
        mobileMenu.classList.add("translate-x-full");
    });
    document.addEventListener("click", (e) => {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileMenu.classList.add("translate-x-full"); // oculta animado
        }
    });

    dibujarCarrito();
    listaCarrito();

});