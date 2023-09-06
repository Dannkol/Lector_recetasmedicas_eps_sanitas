

export default{
  printMedicamentos(){
    
      const ws = new Worker("../storage/wsMedicamentos.js")
      const token=localStorage.getItem("jwt")
    
      ws.postMessage(token)
      const container=document.querySelector("#container2")
      ws.addEventListener("message", (e)=>{
        
        container.insertAdjacentHTML("beforeend", e.data)
      })
  },
  botonesss(){
      async function botones() {
          let btns = document.querySelectorAll("#btnMas");
          while (btns.length === 0) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Esperar 100 ms
            btns = document.querySelectorAll("#btnMas");
          }
          
          const card = document.querySelector(".flip-card");
          const pinguino = document.querySelector(".aaaa");
        
          function ocultar() {
            if (card.style.display === "none") {
              card.style.display = "block";
              pinguino.style.display = "block";
            } else {
              card.style.display = "none";
              pinguino.style.display = "none";
            }
          }
          btns.forEach(btn => {
            btn.addEventListener("click", (e)=>{
              ocultar();
            })
          });
        }
        botones();            
      }
}