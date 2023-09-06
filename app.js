import Tesseract from "tesseract.js";

import configureApp from "./src/config/expressconfig.js";

import express from "express";

import https from 'https';

import fs from 'fs';

import cors from 'cors'

const app = express();

app.use(cors());

configureApp(app);


app.get('/', async (req, res) => {
    res.send('Welcome')
})

app.post('/upload', async (req, res) => {
    const base64Image = req.body.image;
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');
    // Aquí puedes procesar la imagen base64 como desees, guardarla en el servidor o realizar cualquier otra acción.
    async function extractTextFromImage(imageBuffer) {
        const { data: { text } } = await Tesseract.recognize(imageBuffer, 'spa');
        return text;
    }

    // Llama a la función con la ruta de la imagen como argumento
    extractTextFromImage(imageBuffer)
        .then(text => {
            const texto = text;

            // Divide el texto en secciones utilizando "Medicamentos posologia observaciones" como separador
            const secciones = texto.split('\n').splice(1);
            const cadenas = ['No. Medicamento y Prescripción Cantidad total', 'No. Medicamento y Prescripción Cantidad Entregas', 'No. Medicamento y Prescripción Cantidad Entregas', 'Medicamento', 'CONSULTA NO PRESENCIAL'];


            // Utilizar el método filter para buscar las cadenas
            const elementosEncontrados = secciones.filter(elemento => cadenas.includes(elemento));

            const inicio = secciones.indexOf(elementosEncontrados[elementosEncontrados.length - 1])
            const arrtext = secciones.splice(inicio)

            const itemsMedicamentos = [];

            for (const elemento of arrtext) {
                if (elemento.includes('Los medicamentos')) {
                    break; // Detenemos el bucle cuando encontramos un elemento que comienza con '*'
                }
                itemsMedicamentos.push(elemento);
            }
            let data = []
            if (itemsMedicamentos[0] === 'CONSULTA NO PRESENCIAL') {
                data = itemsMedicamentos.splice(2);
            } else {
                data = itemsMedicamentos.splice(1);
            }


            const datafiltrada = data.filter((item) => { if (item.length > 20) return item }).map(value => value.replace(/[^a-zA-Z0-9\sáéíóúÁÉÍÓÚ]/g, ''))


            const pares = [];
            for (let i = 0; i < datafiltrada.length; i += 2) {
                const par = [datafiltrada[i], datafiltrada[i + 1]];
                pares.push(par);
            }


            const dataDb = []
            for (let i = 0; i < pares.length; i += 1) {
                try {

                    let data = pares[i][1].split(' ')
                    dataDb.push(
                        {
                            nombre: pares[i][0],
                            via: data[data.indexOf('vía') + 1],
                            dias: data[data.indexOf('por') + 1],
                            horas: data[data.indexOf('cada') + 1],
                            cantidad: `${data[data.indexOf('vía') + 2]} ${data[data.indexOf('vía') + 3]}`
                        }
                    )
                } catch (error) {
                    console.error(error)
                }


            }

            console.log(dataDb)
            console.log(text);
            res.json({ message: 'Imagen recibida y procesada exitosamente.', data: dataDb });
        })
        .catch(error => {
            console.error('Error:', error);
            res.json({ message: 'Error' });
        });

});


const httpsOptions = {
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/cert.pem')
};


https.createServer(httpsOptions, app).listen(3000, () => {
    console.log('Servidor HTTPS en ejecución en el puerto 3000');
});
