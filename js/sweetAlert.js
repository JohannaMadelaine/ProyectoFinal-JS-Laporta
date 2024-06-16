//EVENTOS

const botonTrivia = document.getElementById("boton");
botonTrivia.addEventListener("click", uso);

async function uso() {
  const primerOpcion = "Me permitiría establecer los objetivos de mi jornada";
  const segundaOpcion = "Mejoraría mi memoria con su utilizacion regular";
  const tercerOpcion = "Obtendría un impulso motivacional al finalizar cada tarea";
  const cuartaOpcion = "Aprovecharía mejor mi tiempo";

  try {
    const { value: opciones } = await Swal.fire({
      title: "¿Para qué utilizarías una app de tareas?",
      text: "Por favor, solo ingrese una opción.",
      icon: "question",
      position: "center",
      allowOutsideClick: false,
      input: "select",
      inputOptions: {
        primerOpcion,
        segundaOpcion,
        tercerOpcion,
        cuartaOpcion
      }
    });

    if (opciones === "primerOpcion") {
      await Swal.fire({
        title: "¡Excelente decisión! Concéntrate en tus objetivos."
      });
    } else if (opciones === "segundaOpcion") {
      await Swal.fire({
        title: "¡Es verdad! Esta herramienta mejoraría gradualmente tu capacidad para recordar y seguir tus tareas diarias."
      });
    } else if (opciones === "tercerOpcion") {
      await Swal.fire({
        title: "¡Tu cuerpo está liberando dopamina!"
      });
    } else if (opciones === "cuartaOpcion") {
      await Swal.fire({
        title: "Despreocúpate de las tareas pendientes porque están totalmente organizadas."
      });
    }
  } catch (error) {
    console.error("Error al mostrar el cuadro de diálogo:", error);
  }
}