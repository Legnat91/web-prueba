document.addEventListener("DOMContentLoaded", () => {

  const btnGestionar = document.getElementById("btnGestionar");
  const btnAgregarModal = document.getElementById("btnAgregarModal");
  const lista = document.getElementById("lista-servicios");
  const modalForm = document.getElementById("modalForm");
  const cerrarModal = document.getElementById("cerrarModal");
  const formServicios = document.getElementById("formG");
  const tituloModal = document.getElementById("tituloModal");

  const inputName = document.getElementById("name");
  const inputImage = document.getElementById("imageURL");
  const inputDescription = document.getElementById("description");
  const inputResumen = document.getElementById("resumen");
  const inputPrice = document.getElementById("price");

  let modoGestion = false;
  let modoEdicion = false;
  let idEditar = null;

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

  function mostrarLista(datosArray) {
    lista.innerHTML = "";

    datosArray.forEach(servicio => {
      const li = document.createElement("li");
      li.className = "bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden";

      const contenedor = document.createElement("div");
      contenedor.className = "flex flex-col justify-between items-center p-4";

      const contenedorBtn = document.createElement("div");
      contenedorBtn.className = "flex gap-2 mt-4 botones-admin";
      contenedorBtn.classList.toggle("hidden", !modoGestion);

      // Imagen
      const img = document.createElement("img");
      img.src = servicio.imageURL || "../img/default.webp";
      img.className = "h-60 w-full object-cover";

      // Nombre
      const nombre = document.createElement("p");
      nombre.textContent = servicio.name;
      nombre.className = "text-black text-sm mt-1 font-bold";

      // Descripción
      const descrip = document.createElement("p");
      descrip.textContent = servicio.description;
      descrip.className = "text-gray-500 text-sm mt-1 text-center";

      // Resumen
      const resumen = document.createElement("p");
      resumen.textContent = servicio.resumen;
      resumen.className = "text-gray-500 text-sm mt-1";

      // Precio
      const precio = document.createElement("p");
      precio.textContent = `${servicio.price} €/hora`;
      precio.className = "mt-3 font-semibold";

      // Botón Modificar
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

      // Botón Eliminar
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.className = "bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700";
      btnEliminar.addEventListener("click", () => {
        if (confirm("¿Seguro que quieres eliminar este servicio?")) {
          eliminarServicio(servicio.id);
        }
      });

      // Botón Ver más
      const btnVer = document.createElement("button");
      btnVer.textContent = "Ver más";
      btnVer.className = "bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700";
      btnVer.addEventListener("click", () => {
        window.location.href = `../pages/detalles/verServicios.html?id=${servicio.id}`;
      });

      contenedorBtn.append(btnModificar, btnEliminar);
      contenedor.append(img, nombre, descrip, resumen, precio, btnVer, contenedorBtn);
      li.appendChild(contenedor);
      lista.appendChild(li);
    });
  }

  function eliminarServicio(id) {
    let servicios = JSON.parse(localStorage.getItem("servicioGuardaos")) || [];
    servicios = servicios.filter(s => s.id !== id);
    localStorage.setItem("servicioGuardaos", JSON.stringify(servicios));
    cargarDatos();
  }

  // Abrir modal añadir
  function abrirModalAñadir() {
    modoEdicion = false;
    formServicios.reset();
    tituloModal.textContent = "Añadir servicio";
    modalForm.classList.remove("hidden");
  }

  btnAgregarModal.addEventListener("click", abrirModalAñadir);

  // Cerrar modal
  cerrarModal.addEventListener("click", () => {
    modalForm.classList.add("hidden");
  });

  // Guardar formulario
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

  // Activar/desactivar modo gestión
  btnGestionar.addEventListener("click", () => {
    modoGestion = !modoGestion;
    btnAgregarModal.classList.toggle("hidden", !modoGestion);
    cargarDatos();
  });

  cargarDatos();
});