//Creacion de fecha

const fecha = document.querySelector("#fecha");
const FECHA = new Date();

const actualizarElementoHTML = (elemento, datos) => {
  elemento.innerHTML = datos.toLocaleDateString("es-AR", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

actualizarElementoHTML(fecha, FECHA);

//Datos del clima

let key = "7c2569e2ecb5595beca9370128ba1c18";
let ciudad = document.getElementById("city");
let boton = document.getElementById("botn");
let resultado = document.getElementById("resultado");
let get_weather;

function tiempo(get_weather) {
  let city_name = ciudad.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${key}&units=metric&lang=sp`;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log("la temperatura es " + data.main.temp + "°");
      console.log(data.weather[0].description);
      resultado.innerHTML = `<h4>${data.name}</h4>
      <h4>${data.main.temp}° </h4>
      <h4>${data.weather[0].description}</h4>`;
      ciudad.value = "";
    });
}

boton.addEventListener("click", tiempo);

//Selección de elementos y constantes para el manejo de tareas
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
let id;
let LIST;
let tareasEliminadas = [];

//Función para agregar una nueva tarea a la lista

function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  }

  let REALIZADO;

  if (realizado) {
    REALIZADO = check;
  } else {
    REALIZADO = uncheck;
  }

  let LINE = "";

  if (realizado) {
    LINE = lineThrough;
  }

  const elemento = document.createElement("div");
  elemento.innerHTML = `<li id = "elemento">
                    <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                    <p class="text ${LINE}">${tarea}</p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                    </li>`;

  lista.appendChild(elemento);
}

//Función para marcar una tarea como realizada o no realizada

function tareaRealizada(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  if (LIST[element.id].realizado) {
    LIST[element.id].realizado = false;
  } else {
    LIST[element.id].realizado = true;
  }
}

// Función para eliminar una tarea de la lista

function tareaEliminada(element) {
  const tareaId = element.id;
  LIST[tareaId].eliminado = true;
  tareasEliminadas.push(LIST[tareaId]);

  // Removemos el elemento del DOM
  element.parentNode.parentNode.removeChild(element.parentNode);
}

// Evento para agregar una tarea al hacer clic en el botón "Enter"

botonEnter.addEventListener("click", () => {
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea, id, false, false);
    LIST.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false,
    });

    localStorage.setItem("TODO", JSON.stringify(LIST));
    id++;
    input.value = "";
  }
});

// Evento para agregar una tarea al presionar la tecla "Enter"

document.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const tarea = input.value;
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });

      localStorage.setItem("TODO", JSON.stringify(LIST));
      input.value = "";
      id++;
      console.log(LIST);
    }
  }
});

// Evento para marcar una tarea como realizada o eliminarla

lista.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;
  if (elementData === "realizado") {
    tareaRealizada(element);
  } else if (elementData === "eliminado") {
    tareaEliminada(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

// Recuperar la lista de tareas del localStorage

let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  cargarLista(LIST);
} else {
  LIST = [];
  id = 0;
}

// Función para cargar la lista de tareas desde el localStorage

function cargarLista(array) {
  array.forEach(function (i) {
    agregarTarea(i.nombre, i.id, i.realizado, i.eliminado);
  });
}
