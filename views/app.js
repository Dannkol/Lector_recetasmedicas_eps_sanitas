
import config from "./storage/config.js";




document.addEventListener("DOMContentLoaded", (e)=>{

    config.data()
    const qr_scanner = document.querySelector("#qr_reader")
    document.querySelector('#qr_boton').addEventListener('click', (e)=>{
        document.querySelector('.modal-body').children[1].textContent = '';
        qr_scanner.style.display = 'block'
    })


})