document.addEventListener("DOMContentLoaded", () => {

    const btnGestionar = document.getElementById("btnGestionar");
    const btnAgregarModal = document.getElementById("btnAgregarModal");

    const lista = document.querySelector("#lista-apartamentos");

    const modalForm = document.getElementById("modalForm");
    const cerrarModal = document.getElementById("cerrarModal");

    const modalEliminar = document.getElementById("modalEliminar");
    const confirmarEliminar = document.getElementById("confirmarEliminar");
    const cancelarEliminar = document.getElementById("cancelarEliminar");

    const formG = document.getElementById("formG");
    const tituloModal = document.getElementById("tituloModal");

    const name = document.getElementById("name");
    const imageURL = document.getElementById("imageURL");
    const description = document.getElementById("description");
    const room = document.getElementById("room");
    const person = document.getElementById("person");
    const price = document.getElementById("price");

    let modoGestion = false;
    let modoEdicion = false;
    let idEditar = null;
    let idEliminar = null;


    /* GENERAR ID */

    function obtenerNuevoId() {

        let contador =
            parseInt(localStorage.getItem("contadorApartamentos")) || 0;

        contador++;

        localStorage.setItem("contadorApartamentos", contador);

        return contador;

    }


    /* CARGAR DATOS */

    function cargarDatos() {

        const apartamentos =
            JSON.parse(localStorage.getItem("apartamentosGuardaos")) || [];

        mostrarLista(apartamentos);


    }
    /*Cargar y GuardarCarrito */
    function obtenerCarrito() {
        return JSON.parse(localStorage.getItem("carritoGlobal")) || [];
    }

    function guardarCarrito(carrito) {
        localStorage.setItem("carritoGlobal", JSON.stringify(carrito));
    }

    /* MOSTRAR APARTAMENTOS */

    function mostrarLista(datosArray) {

        lista.innerHTML = "";

        datosArray.forEach(datos => {

            const li = document.createElement("li");
            const contenedor = document.createElement("div");
            const botonesOcul = document.createElement("div");
            const botonesCont = document.createElement("div");

            li.className =
                "bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden";

            contenedor.className =
                "flex flex-col justify-between items-center p-4";

            botonesOcul.className =
                "flex gap-2 mt-4 botones-admin";


            botonesCont.className = "flex gap-2 mt-4 botones-admin";


            if (!modoGestion) {
                botonesOcul.classList.add("hidden");
            }


            const img = document.createElement("img");
            img.src = datos.imageURL || "../img/default.webp";
            img.className = "h-60 w-full object-cover";


            const titulo = document.createElement("p");
            titulo.textContent = datos.name;
            titulo.className = "font-bold mt-2";


            const des = document.createElement("p");
            des.textContent = datos.description;
            des.className = "text-gray-500 text-center text-sm";


            const info = document.createElement("p");
            info.textContent =
                `${datos.room} habitaciones - Hasta ${datos.person} personas`;

            info.className = "text-gray-500 text-sm";


            const precio = document.createElement("p");
            precio.textContent = `${datos.price} €/noche`;
            precio.className = "font-semibold mt-2";


            /* BOTON MODIFICAR */

            const btnModificar = document.createElement("button");

            btnModificar.textContent = "Modificar";

            btnModificar.className =
                "bg-lime-600 text-white px-3 py-2 rounded hover:bg-lime-700";

            btnModificar.addEventListener("click", () => {

                name.value = datos.name;
                imageURL.value = datos.imageURL;
                description.value = datos.description;
                room.value = datos.room;
                person.value = datos.person;
                price.value = datos.price;

                modoEdicion = true;
                idEditar = datos.id;

                tituloModal.textContent = "Editar apartamento";

                modalForm.classList.remove("hidden");

            });


            /* BOTON ELIMINAR */

            const btnEliminar = document.createElement("button");

            btnEliminar.textContent = "Eliminar";

            btnEliminar.className =
                "bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700";

            btnEliminar.addEventListener("click", () => {

                idEliminar = datos.id;

                modalEliminar.classList.remove("hidden");

            });

            /*BOTON VER MAS */

            const btnVer = document.createElement("button");
            btnVer.textContent = "Ver más";
            btnVer.className = "bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 hover:cursor-pointer";
            btnVer.addEventListener("click", () => {
                window.location.href = `../pages/detalles/verApartamento.html?id=${datos.id}`;
            });

            /*Boton Carrito */

            const btnAgregarC = document.createElement("button");
            btnAgregarC.textContent = "Reservar";
            btnAgregarC.className = "bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-700 hover:cursor-pointer";
            btnAgregarC.addEventListener("click", () => {
                let carrito = obtenerCarrito();


                const productoExistente = carrito.find(p => p.id === datos.id);

                if (productoExistente) {
                    // Si ya existe, solo sumamos la cantidad
                    productoExistente.amount = Number(productoExistente.amount) + 1;
                } else {

                    carrito.push({
                        id: datos.id,
                        name: datos.name,
                        price: datos.price,
                        room: datos.room,
                        person: datos.person,
                        imageURL: datos.imageURL,
                        amount: 1
                    });

                }
                guardarCarrito(carrito);


            });


            botonesOcul.append(btnModificar, btnEliminar);
            botonesCont.append(btnVer, btnAgregarC);

            contenedor.append(
                img,
                titulo,
                des,
                info,
                precio,
                botonesCont,
                botonesOcul
            );

            li.append(contenedor);

            lista.appendChild(li);

        });

    }


    /* FORMULARIO GUARDAR */

    formG.addEventListener("submit", (e) => {

        e.preventDefault();

        let listaGuardada =
            JSON.parse(localStorage.getItem("apartamentosGuardaos")) || [];

        const datosFormulario = {

            id: modoEdicion ? idEditar : obtenerNuevoId(),

            name: name.value.trim(),

            imageURL: imageURL.value.trim(),

            description: description.value.trim(),

            room: room.value,

            person: person.value,

            price: price.value

        };

        if (modoEdicion) {

            listaGuardada = listaGuardada.map(ap =>
                ap.id === idEditar ? datosFormulario : ap
            );

        } else {

            listaGuardada.push(datosFormulario);

        }

        localStorage.setItem(
            "apartamentosGuardaos",
            JSON.stringify(listaGuardada)
        );

        modalForm.classList.add("hidden");

        formG.reset();

        modoEdicion = false;

        cargarDatos();

    });


    /* CONFIRMAR ELIMINAR */

    confirmarEliminar.addEventListener("click", () => {

        let listaGuardada =
            JSON.parse(localStorage.getItem("apartamentosGuardaos")) || [];

        listaGuardada =
            listaGuardada.filter(ap => ap.id !== idEliminar);

        localStorage.setItem(
            "apartamentosGuardaos",
            JSON.stringify(listaGuardada)
        );

        modalEliminar.classList.add("hidden");

        cargarDatos();

    });


    /* CANCELAR ELIMINAR */

    cancelarEliminar.addEventListener("click", () => {

        modalEliminar.classList.add("hidden");

    });


    /* ABRIR MODAL AÑADIR */

    btnAgregarModal.addEventListener("click", () => {

        modoEdicion = false;

        formG.reset();

        tituloModal.textContent = "Añadir apartamento";

        modalForm.classList.remove("hidden");

    });


    /* CERRAR MODAL */

    cerrarModal.addEventListener("click", () => {

        modalForm.classList.add("hidden");

    });


    /* ACTIVAR MODO GESTION */

    btnGestionar.addEventListener("click", () => {

        modoGestion = !modoGestion;

        btnGestionar.textContent =
            modoGestion ? "Cerrar gestión" : "Gestionar";

        document
            .querySelectorAll(".botones-admin")
            .forEach(div => {

                div.classList.toggle("hidden");

            });

        btnAgregarModal.classList.toggle("hidden");

    });


    /* INICIAR */

    cargarDatos();

});