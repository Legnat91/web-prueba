document.addEventListener("DOMContentLoaded", () => {

  const btnGestionar = document.getElementById("btnGestionar");
  const btnAgregarModal = document.getElementById("btnAgregarModal");

  const lista = document.querySelector("#lista-experiencias");

  const modalForm = document.getElementById("modalForm");
  const cerrarModal = document.getElementById("cerrarModal");

  const formG = document.getElementById("formG");
  const tituloModal = document.getElementById("tituloModal");

  const name = document.getElementById("name");
  const imageURL = document.getElementById("imageURL");
  const description = document.getElementById("description");
  const resumen = document.getElementById("resumen");
  const price = document.getElementById("price");

  let modoGestion = false;
  let modoEdicion = false;
  let idEditar = null;

  /* GENERAR ID */

  function obtenerNuevoId() {

    let contador =
      parseInt(localStorage.getItem("contadorExperiencias")) || 0;

    contador++;

    localStorage.setItem("contadorExperiencias", contador);

    return contador;

  }

  /* CARGAR DATOS */

  function cargarDatos() {

    const experiencias =
      JSON.parse(localStorage.getItem("experienciasGuardaos")) || [];

    mostrarLista(experiencias);

  }

  /* CARRITO */

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
    const listaCarrito = document.getElementById("listaCarrito");

    if (!listaCarrito) return;

    listaCarrito.innerHTML = "";

    carrito.forEach(articulo => {

      const li = document.createElement("li");

      li.className =
        "flex items-center gap-4 p-3 mb-3 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition";

      const img = document.createElement("img");
      img.src = articulo.imageURL || "../img/default.webp";
      img.className = "w-16 h-16 object-cover rounded";

      const info = document.createElement("div");
      info.className = "flex-1 flex flex-col";

      const nombre = document.createElement("span");
      nombre.textContent = articulo.name;
      nombre.className = "font-semibold text-gray-800";

      const precio = document.createElement("span");
      precio.textContent =
        (Number(articulo.price) * Number(articulo.amount)) + " €";
      precio.className = "text-gray-600 text-sm";

      const cantidadDiv = document.createElement("div");
      cantidadDiv.className = "flex items-center gap-2 mt-1";

      const btnMenos = document.createElement("button");
      btnMenos.textContent = "-";
      btnMenos.className =
        "px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600";

      const cantidad = document.createElement("span");
      cantidad.textContent = articulo.amount;
      cantidad.className = "px-2";

      const btnMas = document.createElement("button");
      btnMas.textContent = "+";
      btnMas.className =
        "px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600";

      const btnDelete = document.createElement("button");
      btnDelete.textContent = "Eliminar";
      btnDelete.className =
        "px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-900";

      btnMas.addEventListener("click", () => {

        articulo.amount++;

        let carritoActual =
          obtenerCarrito().map(p =>
            p.id === articulo.id
              ? { ...p, amount: articulo.amount }
              : p
          );

        guardarCarrito(carritoActual);

        dibujarListaCarrito();

      });

      btnMenos.addEventListener("click", () => {

        articulo.amount--;

        if (articulo.amount < 1) articulo.amount = 0;

        let carritoActual =
          obtenerCarrito().map(p =>
            p.id === articulo.id
              ? { ...p, amount: articulo.amount }
              : p
          );

        guardarCarrito(carritoActual);

        dibujarListaCarrito();

      });

      btnDelete.addEventListener("click", () => {

        let carritoActual =
          obtenerCarrito().filter(a => a.id !== articulo.id);

        guardarCarrito(carritoActual);

        dibujarListaCarrito();

      });

      cantidadDiv.append(btnMenos, cantidad, btnMas);

      info.append(nombre, precio, cantidadDiv);

      li.append(img, info, btnDelete);

      listaCarrito.append(li);

    });

    const totalDiv = document.createElement("div");

    totalDiv.className =
      "mt-4 p-3 font-bold text-lg text-right border-t border-gray-300";

    totalDiv.textContent =
      "Total: " + calcularTotal() + " €";

    listaCarrito.append(totalDiv);

  }

  /* MOSTRAR LISTA */

  function mostrarLista(datosArray) {

    lista.innerHTML = "";

    datosArray.forEach(datos => {

      const li = document.createElement("li");
      const contenedor = document.createElement("div");
      const botonesAdmin = document.createElement("div");
      const botonesCont = document.createElement("div");

      li.className =
        "bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden";

      contenedor.className =
        "flex flex-col justify-between items-center p-4";

      botonesAdmin.className =
        "flex gap-2 mt-4 botones-admin";

      botonesCont.className =
        "flex gap-2 mt-4";

      if (!modoGestion) {
        botonesAdmin.classList.add("hidden");
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

      const res = document.createElement("p");
      res.textContent = datos.resumen;
      res.className = "text-gray-500 text-sm";

      const precio = document.createElement("p");
      precio.textContent = `${datos.price} €/persona`;
      precio.className = "font-semibold mt-2";

      /* MODIFICAR */

      const btnModificar = document.createElement("button");

      btnModificar.textContent = "Modificar";

      btnModificar.className =
        "bg-lime-600 text-white px-3 py-2 rounded hover:bg-lime-700";

      btnModificar.addEventListener("click", () => {

        name.value = datos.name;
        imageURL.value = datos.imageURL;
        description.value = datos.description;
        resumen.value = datos.resumen;
        price.value = datos.price;

        modoEdicion = true;

        idEditar = datos.id;

        tituloModal.textContent = "Editar experiencia";

        modalForm.classList.remove("hidden");

      });

      /* ELIMINAR */

      const btnEliminar = document.createElement("button");

      btnEliminar.textContent = "Eliminar";

      btnEliminar.className =
        "bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700";

      btnEliminar.addEventListener("click", () => {

        let experiencias =
          JSON.parse(localStorage.getItem("experienciasGuardaos")) || [];

        experiencias =
          experiencias.filter(exp => exp.id !== datos.id);

        localStorage.setItem(
          "experienciasGuardaos",
          JSON.stringify(experiencias)
        );

        cargarDatos();

      });

      /* VER */

      const btnVer = document.createElement("button");

      btnVer.textContent = "Ver más";

      btnVer.className =
        "bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700";

      btnVer.addEventListener("click", () => {

        window.location.href =
          `../pages/detalles/verExperiencias.html?id=${datos.id}`;

      });

      /* RESERVAR */

      const btnAgregarC = document.createElement("button");

      btnAgregarC.textContent = "Reservar";

      btnAgregarC.className =
        "bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-700";

      btnAgregarC.addEventListener("click", () => {

        let carrito = obtenerCarrito();

        const productoExistente =
          carrito.find(p => p.id === datos.id);

        if (productoExistente) {

          productoExistente.amount =
            Number(productoExistente.amount) + 1;

        } else {

          carrito.push({
            id: datos.id,
            name: datos.name,
            price: datos.price,
            imageURL: datos.imageURL,
            amount: 1
          });

        }

        guardarCarrito(carrito);

        dibujarListaCarrito();

      });

      botonesAdmin.append(btnModificar, btnEliminar);

      botonesCont.append(btnVer, btnAgregarC);

      contenedor.append(
        img,
        titulo,
        des,
        res,
        precio,
        botonesCont,
        botonesAdmin
      );

      li.append(contenedor);

      lista.appendChild(li);

    });

  }

  /* FORMULARIO */

  formG.addEventListener("submit", (e) => {

    e.preventDefault();

    let experiencias =
      JSON.parse(localStorage.getItem("experienciasGuardaos")) || [];

    const datosFormulario = {

      id: modoEdicion ? idEditar : obtenerNuevoId(),

      name: name.value.trim(),

      imageURL: imageURL.value.trim(),

      description: description.value.trim(),

      resumen: resumen.value.trim(),

      price: price.value

    };

    if (modoEdicion) {

      experiencias = experiencias.map(exp =>
        exp.id === idEditar ? datosFormulario : exp
      );

    } else {

      experiencias.push(datosFormulario);

    }

    localStorage.setItem(
      "experienciasGuardaos",
      JSON.stringify(experiencias)
    );

    modalForm.classList.add("hidden");

    formG.reset();

    modoEdicion = false;

    cargarDatos();

  });

  /* ABRIR MODAL */

  btnAgregarModal.addEventListener("click", () => {

    modoEdicion = false;

    formG.reset();

    tituloModal.textContent = "Añadir experiencia";

    modalForm.classList.remove("hidden");

  });

  /* CERRAR MODAL */

  cerrarModal.addEventListener("click", () => {

    modalForm.classList.add("hidden");

  });

  /* MODO GESTION */

  btnGestionar.addEventListener("click", () => {

    modoGestion = !modoGestion;

    btnGestionar.textContent =
      modoGestion ? "Cerrar gestión" : "Gestionar";

    btnAgregarModal.classList.toggle("hidden");

    cargarDatos();

  });

  /* INICIAR */

  cargarDatos();
  dibujarListaCarrito();

});