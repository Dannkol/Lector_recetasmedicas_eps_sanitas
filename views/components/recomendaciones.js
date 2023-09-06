export default{
    printRecomendaciones(){
    
        const ws = new Worker("../storage/wsRecomendaciones.js")
        const token=localStorage.getItem("jwt")
      
        ws.postMessage(token)
        const container=document.querySelector("#containerRecomendaciones")
        ws.addEventListener("message", (e)=>{
          
         //container.insertAdjacentHTML("beforeend", e.data)
        })
    }
}