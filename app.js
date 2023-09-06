import Tesseract from "tesseract.js";

import configureApp from "./src/config/expressconfig.js";

import express from "express";

import https from 'https';

import fs from 'fs';

import cors from 'cors'

import { routes as router_aut } from './src/routes/paciente.routes.js'

import passport from "./src/middlewares/http-passport-bearer.js";
import getConnection from "./src/database/connections.js";

const app = express();

app.use(cors());

configureApp(app);


app.get('/', async (req, res) => {
    res.send('Welcome')
})

app.use('/api', router_aut)

app.post('/upload', passport.authenticate("bearer", { session: false }), async (req, res) => {
    const base64Image = req.body.image;
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const con = await getConnection();

    const [rows] = await con.execute(
        "SELECT data FROM formula WHERE id=?",
        [req.user.formula_id]
    );
    let formula = ''
    if (rows.length >= 1) {
        formula = JSON.parse(rows[0].data)
    } else {
        res.status(400).send("Formula no encontrada.");
    }
    console.log(formula);
    // Aquí puedes procesar la imagen base64 como desees, guardarla en el servidor o realizar cualquier otra acción.
    async function extractTextFromImage(imageBuffer) {
        const { data: { text } } = await Tesseract.recognize(imageBuffer, 'spa');
        return text;
    }

    // Llama a la función con la ruta de la imagen como argumento
    const texto = await extractTextFromImage(imageBuffer)


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

            // {
            //     "data": {
            //       "edad": 20,
            //       "observacion": "Paciente adulto edad 33 años con problemas pulmonares, fumador compulsivo",
            //       "antecendes": [
            //         {
            //           "tipo": "Farmacologicos",
            //           "observaciones": "Acetaminofen 1000 mg...",
            //           "fecha": "28:04:2023 00:00:00"
            //         },
            //         {
            //           "tipo": "Quirurgico",
            //           "observaciones": "herniografia inguial derecha...",
            //           "fecha": "28:04:2023 00:00:00"
            //         },
            //         {
            //           "tipo": "Patologicos",
            //           "observaciones": "hipertension arterial/infarto",
            //           "fecha": "28:04:2023 00:00:00"
            //         }
            //       ],
            //       "tratamiento": [
            //         {
            //           "tipo": "Pastillas",
            //           "Dosis": "3  dosis diaria",
            //           "cantidad": "21",
            //           "duracion": "7 dias",
            //           "indicacion": "despues de cada comida",
            //           "description": "Dolex"
            //         },
            //         {
            //           "tipo": "Gotas",
            //           "dosis": "2 dosis diaria",
            //           "cantidad": "10",
            //           "duracion": "5 dias",
            //           "indicacion": "al levantarse y antes de acostarse",
            //           "description": "nn"
            //         }
            //       ]
            //     }
            //   }

            let data = pares[i][1].split(' ')
            dataDb.push(
                {
                    description: pares[i][0],
                    tipo : data[data.indexOf('vía') + 3],
                    indicacion: 'via' + data[data.indexOf('vía') + 1],
                    duracion: data[data.indexOf('por') + 1],
                    dosis: `${data[data.indexOf('vía') + 2]} ${data[data.indexOf('vía') + 3]} cada ${data[data.indexOf('cada') + 1]} hora(s)`
                }
            )
            formula.data.tratamiento.push(dataDb[0])
            console.log(formula.data.tratamiento);

            console.log(JSON.stringify(formula.data));

            await con.execute(
                "UPDATE formula set data = ? WHERE id=?;",
                [JSON.stringify(formula),req.user.formula_id]
            );
        } catch (error) {
            console.error(error)
        }
    }
    res.json({ message: 'Imagen recibida y procesada exitosamente.', data: dataDb });

});


const httpsOptions = {
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/cert.pem')
};


https.createServer(httpsOptions, app).listen(3000, () => {
    console.log('Servidor HTTPS en ejecución en el puerto 3000');
});
