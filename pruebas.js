const texto = `
EPS SANITAS FÓRMULA MÉDICA USO AGUDO No. 0570 - 39250984

EPS Sanitas Centro Medico Calle 80 - NIT. 800251440 BOGOTAD.C.

Cra. 89 Ad 79-51 4/10 piso.Teléfono: (+571) 5895477 26/08/2021, 15:08:56

Nombre: GEOVANNA BONILLA BASTIDAS Í?;“?lºá'F_"s í%n2';5¿5140;431 E

" NICa:
Identificación: TI 1028485484 - Sexo: Femenino - Edad: 13 Años , h º? ".
Tipo de Usuario: Contributivo
DIAGNÓSTICO(S):
(N922)
CONSULTA NO PRESENCIAL
ENO m Medicamento y.Prescripción — T cantidadiotal
a lDoxiclclina 100mg Tableta con o sin Recubrimiento | 30 (treinta) — |
anaaaana! LOME (vía Oral) 1 tebleta cada 24 hora(s) por 90 dia(s). TOMAR UNA TABLETA ENLAS NOCHES PORTMES | e e e e bl
¡ 2 |Retinoico acido (tretinoina) 0.025% gel , | 1 (uno) tubo :
, Aplicar (tópica o externamente) _ cada 24 hora(s) por 30 día(s). APLICAR SOBRE EL ACNÉ EN LAS NOCHES, 3 VECES A LA SEMANA POR1 MES |
Ibuprofeno 400 mg Tableta con o sin Recubrimiento T !
1 3 ¡Tomar(vía Oral) 1 tableta cada 8 hora(s) por 3 día(s). TOMAR UNA TABLETA CADA 8 HORAS ? 9 (nueve) tableta
[ ] TOMARESTOSDÍASPUTROSDEAGÚA — ZA
“Los medicamentos únicamente deben ser administrados durante el tiempo definido en la formulación
FÓRMULA MÉDICA VÁLIDA POR 30 DÍAS A PARTIR DE LA FECHA DE EXPEDICIÓN

Apreciado usuario: por favor reclame sus medicamentos dentro del tiempo establecido, de lo contrario podría requerir una nueva valoración
médica

MÉDICO DATOS DE LA ENTREGA DE LA FÓRMULA MÉDICA AL PACIENTE

Fecha de entrega de medicamentos (DD/MM/AAAA):
!%C% E Entidad proveedora:
TNAN -
Ea 15007HITDO

Maria Vargas Umaña - Pediatria > .

CC 1020729190 - RM. 1020729190 Firma del paciente

- Impreso: 26/08/2021, 15:12:00 º"9'"a||mpresión realizada por: mvumana Página 1 de 1|
Firmado Electrónicamente
`;

// Divide el texto en secciones utilizando "Medicamentos posologia observaciones" como separador
const secciones = texto.split('\n').splice(1);
const cadenas = ['No. Medicamento y Prescripción Cantidad total',  'No. Medicamento y Prescripción Cantidad Entregas','No. Medicamento y Prescripción Cantidad Entregas', 'Medicamento','CONSULTA NO PRESENCIAL'];



// Función de prueba (callback) para buscar las cadenas
const buscarCadenas = (elemento) => {
  return (
    cadenas.filter(value => elemento.includes(value))
  );
};

// Utilizar el método filter para buscar las cadenas
const elementosEncontrados = secciones.filter(elemento => cadenas.includes(elemento));

const inicio = secciones.indexOf(elementosEncontrados[elementosEncontrados.length -1])
console.log(inicio)
const arrtext = secciones.splice(inicio)

console.log('ar',arrtext)

const itemsMedicamentos = [];

for (const elemento of arrtext) {
  if (elemento.includes('Los medicamentos')) {
    break; // Detenemos el bucle cuando encontramos un elemento que comienza con '*'
  }
  itemsMedicamentos.push(elemento);
}
let data = []
if(itemsMedicamentos[0] = 'CONSULTA NO PRESENCIAL') {
  data = itemsMedicamentos.splice(2);
} else {
  data = itemsMedicamentos.splice(1);
}


const datafiltrada = data.filter((item) => { if (item.length > 20)  return item  } ).map(value => value.replace(/[^a-zA-Z0-9\sáéíóúÁÉÍÓÚ]/g, ''))


const pares = [];
for (let i = 0; i < datafiltrada.length; i += 2) {
  const par = [datafiltrada[i], datafiltrada[i + 1]];
  pares.push(par);
}


const dataDb = []
for (let i = 0; i < pares.length; i += 1) {
    try {
        
        let data = pares[i][1].split(' ')
        console.log(data)
        dataDb.push(
        {
            nombre : pares[i][0],
            via : data[data.indexOf('vía')+1],
            dias : data[data.indexOf('por')+1],
            horas : data[data.indexOf('cada')+1],
            cantidad : `${data[data.indexOf('vía')+2]} ${data[data.indexOf('vía')+3]}` 
        }
        )
    } catch (error) {
        console.error(error)
    }

  
}

console.log(dataDb)

