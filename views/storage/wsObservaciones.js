const url = "http://10.32.34.58:5000/api/formula";

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

    console.log(JSON.parse(rta[0]).data.observaciones);
    JSON.parse(rta[0]).data.observaciones.forEach((item) => {
      html += `  <p>${item.fecha}</p>
      <p>${item.observacion}</p>
      <p><input type="checkbox">${item.observacion}</p>`;
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
