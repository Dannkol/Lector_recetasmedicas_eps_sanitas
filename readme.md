
# Procesamiento de imagenes con formulas medicas de la eps sanitas

Se pretende crear un aplicativo web que lea las formulas medicas o recetas medicas de la eps sanitas y devuelva 

* Nombre del medicamento
* Indicaciones de uso 
* Cantidad a tomar




## API Reference

#### POST image

```http
  POST /upload
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `image` | `string` | **Required**. imagen convertida en base 64 |

Response

```json
{
  "message":"Imagen recibida y procesada exitosamente.",
  "data":[
    {
      "nombre":"H I Naproxeno 250 meg Tableta con o sin Recubrimiento  0e ",
      "via":"Oral",
      "dias":"3",
      "horas":"8",
      "cantidad":"1 tableta"
    }
  ]
}
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/Dannkol/Lector_recetasmedicas_eps_sanitas.git
```

Go to the project directory

```bash
  cd Lector_recetasmedicas_eps_sanitas
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Configuracion de sll y https

los certificados del live server se encuentran en 

```bash
localhost.key
localhost.pem
```
Estos tienes que configurarlos en el archivo `.vscode/settings.json`

los certificados para el express estan el la ruta `cert`

```bash
.
├── cert.pem
├── csr.pem
└── key.pem
```
asegurate de tener bien configurados estos certificados en el `app.js`
