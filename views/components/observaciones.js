export default{
    printObservaciones(){
    
        const ws = new Worker("../storage/wsObservaciones.js")
        const token=localStorage.getItem("jwt")
      
        ws.postMessage(token)
        const container=document.querySelector(".observaciones")
        ws.addEventListener("message", (e)=>{
          console.log(e.data);
          container.insertAdjacentHTML("beforeend", e.data)
        })
    }
}