document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const btnClose = document.getElementById("btn-close");
    const cabecera = document.getElementById("cabecera");

    function dibujarCarrito() {
        const carrito = document.createElement("div");
        carrito.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304" /><path d="M9 11v-5a3 3 0 0 1 6 0v5" /></svg>`;

        cabecera.append(carrito);


    };

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

});