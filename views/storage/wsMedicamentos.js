const url = "http://127.0.0.1:5000/api/formula";

const obtenerFormula = async (token) => {
  let html = "";

  console.log(token);

  try {
    const resultado = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    const estudiantes = await resultado.json();
    const rta = estudiantes;

    JSON.parse(rta[0]).data.medicamentos.forEach((item) => {
      html += `<div class="barraCircular d-flex justify-content-center align-items-center   ">
        <img class="alerta" src="../img/dangerr.png" alt="" srcset="">
        <div class="contenido">
            <h2>${item.nombre}</h2>
            <p class="aaa">Fecha: dd/mm/aa</p>
            <p class="aaa">Info del tratamiento</p>
            <p>Dosis: 1 c/d 8hr</p>
        </div>
        <img src="../img/complete.png" alt="" srcset="">
    </div>`;
    });

    return html;
  } catch (error) {
    console.log(error);
  }
};

self.addEventListener("message", async (e) => {
  const formm = await obtenerFormula(e.data);

  postMessage(formm);
});
