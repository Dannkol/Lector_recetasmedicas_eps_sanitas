const url = "https://192.168.0.101:3000/api/formula";

const obtenerFormula = async (token) => {
  let html = "";

  console.log(token);

  try {
    const resultado = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*", 
        Authorization: `bearer ${token}`,
      },
    }); 

    const estudiantes = await resultado.json();
    const rta = estudiantes;
    console.log(rta[0].data);
    console.log(JSON.parse(rta[0].data).data);
    JSON.parse(rta[0].data).data.tratamiento.forEach((item) => {
      html += `<div class="barraCircular d-flex justify-content-center align-items-center   ">
        <img class="alerta" src="../img/dangerr.png" alt="" srcset="">
        <div class="contenido">
            <h2>${item.description}</h2>
            <p class="aaa">Duracion: ${item.duracion}</p>
            <p class="aaa">${item.indicacion}</p>
            <p>Dosis: ${item.dosis}</p>
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
