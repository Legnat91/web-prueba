carrito.forEach((producto) => {

    const li = document.createElement("li");
    li.className = "flex justify-between items-center gap-2";

    const nombre = document.createElement("span");
    nombre.textContent = producto.name;

    const contCantidad = document.createElement("div");
    contCantidad.className = "flex items-center gap-2";

    const btnMenos = document.createElement("button");
    btnMenos.textContent = "-";

    const cantidad = document.createElement("span");
    cantidad.textContent = producto.amount;

    const btnMas = document.createElement("button");
    btnMas.textContent = "+";

    const precio = document.createElement("span");
    precio.textContent = (producto.price * producto.amount).toFixed(2) + " €";

    const eliminar = document.createElement("button");
    eliminar.textContent = "❌";

    contCantidad.append(btnMenos, cantidad, btnMas);

    // SUMAR
    btnMas.addEventListener("click", () => {

        producto.amount++;

        let carritoActual = obtenerCarrito();

        carritoActual = carritoActual.map(p => {
            if (p.id === producto.id) {
                p.amount = producto.amount;
            }
            return p;
        });

        guardarCarrito(carritoActual);

        dibujarCarrito();
    });

    // RESTAR
    btnMenos.addEventListener("click", () => {

        if (producto.amount > 1) {
            producto.amount--;
        }

        let carritoActual = obtenerCarrito();

        carritoActual = carritoActual.map(p => {
            if (p.id === producto.id) {
                p.amount = producto.amount;
            }
            return p;
        });

        guardarCarrito(carritoActual);

        dibujarCarrito();
    });

    // ELIMINAR
    eliminar.addEventListener("click", () => {

        let carritoActual = obtenerCarrito();

        carritoActual = carritoActual.filter(
            p => p.id !== producto.id
        );

        guardarCarrito(carritoActual);

        dibujarCarrito();
    });

    li.append(nombre, contCantidad, precio, eliminar);

    lista.append(li);

});