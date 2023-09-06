import 'https://rawgit.com/schmich/instascan-builds/master/instascan.min.js';

import config from './storage/config.js';


document.addEventListener('DOMContentLoaded', (e) => {

    let scanner = new Instascan.Scanner({
        video: document.getElementById("preview"),
      });
      scanner.addListener("scan", function (content) {
        const user = JSON.parse(content);
        console.log(user)
        async function postData() {
            try {
              const response = await fetch('https://192.168.130.79:3000/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
              });
              const data = await response.json();
              const str = data.jwt;

              config.data(str);
              console.log(str);
              location.href ='./saludo/index.html';
            } catch (error) {
              alert(error);
            }
          }
          
          postData();
      });
      Instascan.Camera.getCameras()
        .then(function (cameras) {
          if (cameras.length > 0) {
            scanner.start(cameras[0]);
          } else {
            alert("No camara no encontrada.");
          }
        })
        .catch(function (e) {
          alert(e);
        });

})