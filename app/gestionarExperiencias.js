document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTOS
  const btnGestionar = document.getElementById("btnGestionar");
  const btnAgregarModal = document.getElementById("btnAgregarModal");
  const lista = document.getElementById("lista-experiencias");
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

  // ID ÚNICO
  function obtenerNuevoId() {
    let contador = parseInt(localStorage.getItem("contadorExperiencias")) || 0;
    contador++;
    localStorage.setItem("contadorExperiencias", contador);
    return contador;
  }

  // CARGAR DATOS
  function cargarDatos() {
    const experiencias = JSON.parse(localStorage.getItem('experienciasGuardaos')) || [];
    mostrarLista(experiencias);
  }

  // MOSTRAR EXPERIENCIAS
  function mostrarLista(datosArray) {
    lista.innerHTML = "";

    datosArray.forEach(datos => {
      const li = document.createElement("li");
      const contenedor = document.createElement("div");
      const contenedorBtn = document.createElement("div");

      li.className = "bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden";
      contenedor.className = "flex flex-col justify-between items-center p-4";
      contenedorBtn.className = "flex gap-2 mt-4 botones-admin";
      contenedorBtn.classList.toggle("hidden", !modoGestion);

      const expImg = document.createElement("img");
      expImg.src = datos.imageURL || "../img/default.webp";
      expImg.className = "h-60 w-full object-cover";

      const expName = document.createElement("p");
      expName.textContent = datos.name;
      expName.className = "text-black text-sm mt-1 font-bold";

      const expDescription = document.createElement("p");
      expDescription.textContent = datos.description;
      expDescription.className = "text-gray-500 text-sm mt-1 text-center";

      const expResumen = document.createElement("p");
      expResumen.textContent = datos.resumen;
      expResumen.className = "text-gray-500 text-sm mt-1";

      const expPrice = document.createElement("p");
      expPrice.textContent = `${datos.price} €/persona`;
      expPrice.className = "mt-3 font-semibold";

      // BOTÓN MODIFICAR
      const btnModificar = document.createElement("button");
      btnModificar.textContent = "Modificar";
      btnModificar.className = "bg-lime-600 text-white px-3 py-2 rounded hover:bg-lime-700";
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

      // BOTÓN ELIMINAR
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.className = "bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700";
      btnEliminar.addEventListener("click", () => {
        if (confirm("¿Seguro que quieres eliminar esta experiencia?")) {
          eliminarExperiencia(datos.id);
        }
      });
      const btnVer = document.createElement("button");
      btnVer.textContent = "Ver más";
      btnVer.className = "bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700";
      btnVer.addEventListener("click", () => {
        window.location.href = `../pages/detalles/verExperiencias.html?id=${datos.id}`;
      })

      contenedorBtn.append(btnModificar, btnEliminar);
      contenedor.append(expImg, expName, expDescription, expResumen, expPrice,btnVer, contenedorBtn);
      li.appendChild(contenedor);
      lista.appendChild(li);
    });
  }

  // ELIMINAR
  function eliminarExperiencia(id) {
    let experiencias = JSON.parse(localStorage.getItem('experienciasGuardaos')) || [];
    experiencias = experiencias.filter(exp => exp.id !== id);
    localStorage.setItem('experienciasGuardaos', JSON.stringify(experiencias));
    cargarDatos();
  }

  // ABRIR MODAL AÑADIR
  function abrirModalAñadir() {
    modoEdicion = false;
    formG.reset();
    tituloModal.textContent = "Añadir experiencia";
    modalForm.classList.remove("hidden");
  }

  btnAgregarModal.addEventListener("click", abrirModalAñadir);

  // CERRAR MODAL
  cerrarModal.addEventListener("click", () => {
    modalForm.classList.add("hidden");
  });

  // GUARDAR FORMULARIO
  formG.addEventListener("submit", (e) => {
    e.preventDefault();

    let experiencias = JSON.parse(localStorage.getItem('experienciasGuardaos')) || [];
    const datos = {
      id: modoEdicion ? idEditar : obtenerNuevoId(),
      name: name.value.trim(),
      imageURL: imageURL.value.trim(),
      description: description.value.trim(),
      resumen: resumen.value.trim(),
      price: price.value.trim()
    };

    if (modoEdicion) {
      experiencias = experiencias.map(exp => exp.id === idEditar ? datos : exp);
      modoEdicion = false;
      idEditar = null;
    } else {
      experiencias.push(datos);
    }

    localStorage.setItem('experienciasGuardaos', JSON.stringify(experiencias));
    formG.reset();
    modalForm.classList.add("hidden");
    cargarDatos();
  });

  // BOTÓN GESTIONAR
  btnGestionar.addEventListener("click", () => {
    modoGestion = !modoGestion;
    btnAgregarModal.classList.toggle("hidden", !modoGestion);
    cargarDatos();
  });

  // INICIALIZAR
  cargarDatos();
});