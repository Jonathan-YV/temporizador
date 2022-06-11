/* Elementos en pantalla */
const horas = document.querySelector(".hours");
const minutos = document.querySelector(".minutes");
const segundos = document.querySelector(".seconds");

/* Botones de inicio */
const btnStart = document.querySelector(".start");
const btnStop = document.querySelector(".stop");
let iniciado = false;

/* Componentes de audio */
const musicaInicio = new Audio("assets/audio/temporizador.mp3");
const musicaFin = new Audio("assets/audio/fin.mp3");
musicaInicio.loop = true;
musicaInicio.volume = 0.5;

musicaFin.volume = 0.5;

/* Botones para aumentar */
const btnHorasMas = document.querySelector("#horasMas");
const btnHorasMenos = document.querySelector("#horasMenos");

const btnMinutosMas = document.querySelector("#minutosMas");
const btnMinutosMenos = document.querySelector("#minutosMenos");

const btnSegundosMas = document.querySelector("#segundosMas");
const btnSegundosMenos = document.querySelector("#segundosMenos");

/* Variable que guardara el setInterval */
let timer;

/* Variables que guardan la cantidad de horas, minutos y segundos */
let tH = 0;
let tM = 0;
let tS = 0;


/* Eventos para cambiar el tiempo en el DOM */
btnHorasMas.addEventListener("click",()=> {
    if(iniciado == false){
        if (tH == 99) tH = 0;
        else if (tH < 99) tH++;
        horas.innerHTML = tH;
    }
})
btnHorasMenos.addEventListener("click",()=>{
    if(iniciado == false){
        if (tH > 0) tH--;
        else tH = 99;
        horas.innerHTML =tH;
    }
})

btnMinutosMas.addEventListener("click",()=>{
    if(iniciado == false){
        if (tM == 59) tM = 0;
        else if (tM < 59) tM++;
        minutos.innerHTML = tM;
    }
})
btnMinutosMenos.addEventListener("click",()=>{
    if(iniciado == false){
        if (tM > 0) tM--;
        else tM = 59;
        minutos.innerHTML = tM;
    }
})

btnSegundosMas.addEventListener("click",()=>{
    if(iniciado == false){
        if (tS == 59) tS = 0;
        else if (tS < 59) tS++;
        segundos.innerHTML = tS;
    }
})
btnSegundosMenos.addEventListener("click",()=>{
    if(iniciado == false){
        if (tS > 0) tS--;
        else tS = 59;
        segundos.innerHTML = tS;
    }
})


/* Funcion para iniciar  */
function iniciarTemporizador(){
    iniciado = true;
    let timeT = (tH * 60 * 60) + (tM * 60) + tS;
    if(timeT != 0) musicaInicio.play();
    timer = setInterval(()=>{
        if (timeT != 0) {
            timeT--;
            horas.innerHTML = parseInt(timeT / 3600);
            minutos.innerHTML = parseInt(timeT / 60);
            segundos.innerHTML = timeT%60;
            if(timeT == 0){
                iniciado = false;
                musicaInicio.pause();
                musicaInicio.currentTime = 0;
                musicaFin.play();
                btnStart.disabled = false;
                btnStop.disabled = true;
                clearInterval(timer);
                tH = 0;
                tM = 0;
                tS = 0;
            }
        }
        else{
            console.log(1);
            btnStart.disabled = false;
            clearInterval(timer);
            iniciado = false;
            musicaInicio.pause();
            musicaInicio.currentTime = 0;
            tH = 0;
            tM = 0;
            tS = 0;
        }
        
    },1000)
}

function terminarTemporizador(){
    clearInterval(timer);
    iniciado = false;
    musicaInicio.pause();
    musicaInicio.currentTime = 0;
    tH = 0;
    tM = 0;
    tS = 0;
    horas.innerHTML = tH;
    minutos.innerHTML = tM;
    segundos.innerHTML = tS;
}

btnStart.addEventListener("click",()=>{
    iniciarTemporizador()
    btnStart.disabled = true;
    btnStop.disabled = false;
    
})

btnStop.addEventListener("click",()=>{
    terminarTemporizador()
    btnStart.disabled = false;
    btnStop.disabled = true;
})