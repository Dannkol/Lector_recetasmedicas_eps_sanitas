const url = "http://127.0.0.1:5000/api/formula";

const obtenerFormula = async (token) => {
  let html = "";

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
    console.log(JSON.parse(rta[0]).data.recomendacion);
 
    JSON.parse(rta[0]).data.recomendacion.forEach((item) => {
        html += `  <div class="barraCircular d-flex justify-content-center align-items-center   ">
                
        <div id="buttonInt">
            <!-- if Tipo !=== fisico {.btn display-none} -->
            <button class="btn d-none" id="cuidar2">
                <a id="a" href="">
                    <img class="svgCamara p-0" src="../img/camaraSVG.png" alt="" id="cImg">

                </a>
            </button>
        </div>
        <div class="contenido">
            <h2>${item.nombre}</h2>
            <p class="aaa">${item.tipo}</p>
            <p class="aaa">${item.descripcion}</p>
            <p class="aaaa">${item.duracion}</p>
        </div>
    </div>`;
      });
      
      return html
    
  } catch (error) {
    console.log(error);
  }
};

self.addEventListener("message", async (e) => {
  const formm = await obtenerFormula(e.data);

  postMessage(formm);
});
