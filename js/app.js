const resultado = document.querySelector('#resultado');
const container = document.querySelector('.container');
const formulario = document.querySelector('#formulario');
const parrafo = document.querySelector('#parrafoResultado');


window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e){
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
//validar formulario
    if(ciudad === '' || pais ===''){
        mostrarError("Ambos campos son obligatorios");
        return;
    }
    //consultar api

    consultarApi(ciudad, pais);
}
function mostrarError(mensaje){
    const alert = document.querySelector('.bg-red-100');

    if(!alert){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700','py-3','px4','rounded', 'max-w-nd', 'mx-auto', 'mt-6' ,'text-center');
        alerta.innerHTML = `
            <strong class= 'font-bold'>ERROR!</strong>
            <span class='block'>${mensaje}</span>
        `;
        container.appendChild(alerta);
        setTimeout(()=>{
            alerta.remove();
        },3000)
    }

    console.log(mensaje);

     
}   
function consultarApi(ciudad, pais){
    const appId = '997e16a7cbb2cac24874d021e16f6766';

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    console.log(url);
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHtml();
            if(datos.cod === '404'){
                mostrarError('Ciudad no encontrada');
            }else{
                mostrarClima(datos);
            }
        });
}

function mostrarClima(datos){
    const {main:{ temp, temp_max, temp_min }}=datos;
    //convierte los datos en celsius
    let tempertaturaCelsius = kelvinACentigrados(temp);
    let tempertaturaCelsiusMax = kelvinACentigrados(temp_max);
    let tempertaturaCelsiusMin = kelvinACentigrados(temp_min);
    console.log(tempertaturaCelsius);

    const resultadoTemp = document.createElement('div');
    resultadoTemp.classList.add('text-center',  'text-white',);
    const tempActual= document.createElement('h1');
    const tempMaxima= document.createElement('h3'); 
    const tempMinima= document.createElement('h3');
    const ciudad = document.querySelector('#ciudad').value;
    resultadoTemp.innerHTML= `
        <h1>La temperatura de la ciudad de ${ciudad} es de:</h1>
        <h1 class="text-6xl font-bold"> ${tempertaturaCelsius}°</h1>
        <h3 class="text-xl">max: ${tempertaturaCelsiusMax}°</h3>
        <h3 class="text-xl">min: ${tempertaturaCelsiusMin}°</h3>
    `
    parrafo.remove();
    resultado.appendChild(resultadoTemp);

}
function kelvinACentigrados(grados){
    return parseInt(grados-273.15);
}
function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}