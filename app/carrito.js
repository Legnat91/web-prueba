export function dibujarListaCarrito() {

        const carrito = obtenerCarrito();
        const lista = document.getElementById("listaCarrito");

        lista.innerHTML = "";

        carrito.forEach(articulo => {

            const li = document.createElement("li");
            const contCantidad = document.createElement("div");
            li.className = "flex justify-between items-center gap-2";
            contCantidad.className = "flex items-center gap-2";



            const name = document.createElement("span");
            name.textContent = articulo.name;

            const price = document.createElement("span");
            price.textContent = (Number(articulo.price) * Number(articulo.amount)) + "€";

            const btnMenos = document.createElement("button");
            btnMenos.textContent = "-";

            const cantidad = document.createElement("span");
            cantidad.textContent = articulo.amount;

            const btnMas = document.createElement("button");
            btnMas.textContent = "+";

            const btnDelete = document.createElement("button");
            btnDelete.textContent = "Eliminar";

            //Sumar

            btnMas.addEventListener("click", () => {
                let carritoActual = obtenerCarrito();

                articulo.amount++;

                carritoActual = carritoActual.map(p => {
                    if (p.id === articulo.id) {
                        p.amount = articulo.amount;
                    };
                    return p;
                });
                guardarCarrito(carritoActual);
                dibujarListaCarrito();
            });

            btnMenos.addEventListener("click", () => {
                let carritoActual = obtenerCarrito();
                articulo.amount--;

                carritoActual = carritoActual.map(p => {
                    if (p.id === articulo.id) {
                        p.amount = articulo.amount;
                    };
                    if(p.amount<1){
                        p.amount=0;
                    }
                    return p;
                });
                guardarCarrito(carritoActual);
                dibujarListaCarrito();
            })

            btnDelete.addEventListener("click", () => {

                let carritoActual = obtenerCarrito();

                carritoActual = carritoActual.filter(a => a.id !== articulo.id);

                guardarCarrito(carritoActual);

                dibujarListaCarrito();

            });

            contCantidad.append(btnMas, cantidad, btnMenos);
            li.append(name, price, contCantidad, btnDelete);
            lista.append(li);

        });
    }