document.addEventListener("DOMContentLoaded", () => {

  const lista = document.getElementById("lista-servicios");
  const btnGestionar = document.getElementById("btnGestionar");
  const btnAgregarModal = document.getElementById("btnAgregarModal");
  const modalForm = document.getElementById("modalForm");
  const cerrarModal = document.getElementById("cerrarModal");
  const formServicios = document.getElementById("formG");
  const tituloModal = document.getElementById("tituloModal");

  const modalConfirm = document.createElement("div");
  modalConfirm.className = "hidden fixed inset-0 bg-black/40 flex items-center justify-center z-50";

  modalConfirm.innerHTML = `
    <div class="bg-white p-6 rounded-xl text-center">
      <p class="mb-6 font-semibold">¿Seguro que quieres eliminar este servicio?</p>
      <div class="flex justify-center gap-4">
        <button id="confirmYes" class="bg-red-600 text-white px-4 py-2 rounded">Sí</button>
        <button id="confirmNo" class="bg-gray-400 text-white px-4 py-2 rounded">No</button>
      </div>
    </div>
  `;

  document.body.appendChild(modalConfirm);

  const confirmYes = modalConfirm.querySelector("#confirmYes");
  const confirmNo = modalConfirm.querySelector("#confirmNo");

  let modoGestion = false;
  let modoEdicion = false;
  let idEditar = null;
  let idEliminar = null;

  function obtenerNuevoId() {
    let contador = parseInt(localStorage.getItem("contadorServicios")) || 0;
    contador++;
    localStorage.setItem("contadorServicios", contador);
    return contador;
  }

  function cargarDatos() {
    const servicios = JSON.parse(localStorage.getItem("servicioGuardaos")) || [];
    mostrarLista(servicios);
  }

  function mostrarLista(servicios) {

    lista.innerHTML = "";

    servicios.forEach(servicio => {

      const li = document.createElement("li");
      li.className = "bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden";

      const contenedor = document.createElement("div");
      contenedor.className = "flex flex-col justify-between items-center p-4";

      const img = document.createElement("img");
      img.src = servicio.imageURL || "../img/default.webp";
      img.className = "h-60 w-full object-cover";

      const nombre = document.createElement("p");
      nombre.textContent = servicio.name;
      nombre.className = "text-black text-sm mt-1 font-bold";

      const descripcion = document.createElement("p");
      descripcion.textContent = servicio.description;
      descripcion.className = "text-gray-500 text-sm mt-1 text-center";

      const resumen = document.createElement("p");
      resumen.textContent = servicio.resumen;
      resumen.className = "text-gray-500 text-sm mt-1";

      const precio = document.createElement("p");
      precio.textContent = `${servicio.price} €/hora`;
      precio.className = "mt-3 font-semibold";

      const contenedorBtn = document.createElement("div");
      contenedorBtn.className = "flex gap-2 mt-4 botones-admin";

      if (!modoGestion) contenedorBtn.classList.add("hidden");

      const btnModificar = document.createElement("button");
      btnModificar.textContent = "Modificar";
      btnModificar.className = "bg-lime-600 text-white px-3 py-2 rounded hover:bg-lime-700";

      btnModificar.addEventListener("click", () => {

        inputName.value = servicio.name;
        inputImage.value = servicio.imageURL;
        inputDescription.value = servicio.description;
        inputResumen.value = servicio.resumen;
        inputPrice.value = servicio.price;

        modoEdicion = true;
        idEditar = servicio.id;

        tituloModal.textContent = "Editar servicio";

        modalForm.classList.remove("hidden");

      });

      const btnEliminar = document.createElement("button");

      btnEliminar.textContent = "Eliminar";

      btnEliminar.className = "bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700";

      btnEliminar.addEventListener("click", () => {

        idEliminar = servicio.id;

        modalConfirm.classList.remove("hidden");

      });

      const btnVer = document.createElement("button");

      btnVer.textContent = "Ver más";

      btnVer.className = "bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700";

      btnVer.addEventListener("click", () => {

        alert(servicio.description);

      });

      const btnReservar = document.createElement("button");

      btnReservar.textContent = "Reservar";

      btnReservar.className = "bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-700";

      btnReservar.addEventListener("click", () => agregarAlCarrito(servicio));

      contenedorBtn.append(btnModificar, btnEliminar);

      contenedor.append(
        img,
        nombre,
        descripcion,
        resumen,
        precio,
        btnVer,
        btnReservar,
        contenedorBtn
      );

      li.appendChild(contenedor);

      lista.appendChild(li);

    });

  }

  function eliminarServicio() {

    let servicios = JSON.parse(localStorage.getItem("servicioGuardaos")) || [];

    servicios = servicios.filter(s => s.id !== idEliminar);

    localStorage.setItem("servicioGuardaos", JSON.stringify(servicios));

    idEliminar = null;

    modalConfirm.classList.add("hidden");

    cargarDatos();

  }

  confirmYes.addEventListener("click", eliminarServicio);

  confirmNo.addEventListener("click", () => {

    idEliminar = null;

    modalConfirm.classList.add("hidden");

  });

  btnAgregarModal.addEventListener("click", () => {

    modoEdicion = false;

    formServicios.reset();

    tituloModal.textContent = "Añadir servicio";

    modalForm.classList.remove("hidden");

  });

  cerrarModal.addEventListener("click", () => modalForm.classList.add("hidden"));

  formServicios.addEventListener("submit", (e) => {

    e.preventDefault();

    let servicios = JSON.parse(localStorage.getItem("servicioGuardaos")) || [];

    const datos = {

      id: modoEdicion ? idEditar : obtenerNuevoId(),

      name: inputName.value.trim(),

      imageURL: inputImage.value.trim(),

      description: inputDescription.value.trim(),

      resumen: inputResumen.value.trim(),

      price: parseFloat(inputPrice.value)

    };

    if (modoEdicion) {

      servicios = servicios.map(s => s.id === idEditar ? datos : s);

    } else {

      servicios.push(datos);

    }

    localStorage.setItem("servicioGuardaos", JSON.stringify(servicios));

    modalForm.classList.add("hidden");

    formServicios.reset();

    modoEdicion = false;

    cargarDatos();

  });

  btnGestionar.addEventListener("click", () => {

    modoGestion = !modoGestion;

    btnAgregarModal.classList.toggle("hidden", !modoGestion);

    cargarDatos();

  });

  function obtenerCarrito() {

    return JSON.parse(localStorage.getItem("carritoGlobal")) || [];

  }

  function guardarCarrito(carrito) {

    localStorage.setItem("carritoGlobal", JSON.stringify(carrito));

    document.dispatchEvent(new Event("actualizarCarrito"));

  }

  function agregarAlCarrito(servicio) {

    let carrito = obtenerCarrito();

    const existente = carrito.find(p => p.id === servicio.id);

    if (existente) {

      existente.amount++;

    } else {

      carrito.push({

        id: servicio.id,

        name: servicio.name,

        price: servicio.price,

        imageURL: servicio.imageURL,

        amount: 1

      });

    }

    guardarCarrito(carrito);

    if (typeof dibujarListaCarrito === "function") {

      dibujarListaCarrito();

    }

  }

  cargarDatos();

});