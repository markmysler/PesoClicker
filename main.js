const btnPlusClick = document.getElementById('plus-click')
const divBanco = document.getElementById('banco')
const divObjetosTienda = document.getElementById('objetos-tienda')
const spanNumeroSuma = document.getElementById('numero-suma')
const spanNumeroMultiplicador = document.getElementById('numero-multiplicador')
const spanNumeroCPS = document.getElementById('numero-CPS')
const spanNumeroPesosPorSegundo = document.getElementById('numero-pesos-por-segundo')

let banco = 0
let valorPlusClick = 1
let tienda =[]
let spanPrecio
let suma = 1
let multiplicadorPorClick = 1
let clicksPorSegundo = 0
let intervalID2 = window.setInterval(revisarVictoria, 5000);

class Objeto{
    constructor(nombre, id, precio, operador, multiplicador, relacionPrecio = 0, comprados = 0){
        this.nombre = nombre
        this.id = id
        this.precio = precio
        this.operador = operador
        this. multiplicador = multiplicador
        this.relacionPrecio =relacionPrecio
        this.comprados = comprados
    }
}
const masUnClick = new Objeto('Ingresos por click +1','masUnClick', 10, '+', 1)
const masCincoClicks = new Objeto('Ingresos por click +5', 'masCincoClicks', 250, '+', 5)
const masDiezClicks = new Objeto('Ingresos por click +10', 'masDiezClicks', 1500, '+', 10)
const multiplicadorMas20 = new Objeto('Multiplicador +0.2','multiplicadorMas20', 1000, '*', 0.2)
const multiplicadorMas100 = new Objeto('Multiplicador +1','multiplicadorMas100', 10000, '*', 1)
const multiplicadorMas200 = new Objeto('Multiplicador +2','multiplicadorMas200', 300000, '*', 2)
const masCeroPuntoUnoClicksPorSegundo = new Objeto('+0.1 clicks por segundo','masCeroPuntoUnoClicksPorSegundo', 10000, 's', 0.1)
const masMedioClickPorSegundo = new Objeto('+0.5 clicks por segundo','masMedioClickPorSegundo', 500000, 's', 0.5)
const masUnClickPorSegundo = new Objeto('+1 click por segundo','masUnClickPorSegundo', 2000000, 's', 1)

tienda.push(masUnClick, masCincoClicks, masDiezClicks, multiplicadorMas20, multiplicadorMas100, multiplicadorMas200, masCeroPuntoUnoClicksPorSegundo, masMedioClickPorSegundo, masUnClickPorSegundo)

btnPlusClick.addEventListener('click', sumarAlBanco)

function sumarAlBanco(){
    banco = banco + valorPlusClick
    divBanco.innerHTML = `$${Math.round(banco)}`
    desactivarActivarTienda()
}

function crearTienda(){
tienda.forEach(obj=>{
    divObjetosTienda.innerHTML += `
        <button class='objeto-tienda' onclick='comprarObjetoTienda(${obj.id})'>
            <h4>${obj.nombre}</h4>
            <p>$<span class='precio'>${obj.precio}</span></p>
            <p>Comprados: <span id='comprados'>${obj.comprados}</span></p>
        </button>
    `
})
spanPrecio = document.getElementsByClassName('precio')
desactivarActivarTienda()
}
function comprarObjetoTienda(obj){
    if (obj.operador == '+') {
        obj.relacionPrecio = 1
        suma = suma + obj.multiplicador
    }else if (obj.operador == '*'){
        obj.relacionPrecio = obj.multiplicador*2
        multiplicadorPorClick = multiplicadorPorClick + obj.multiplicador
    }else if (obj.operador == 's'){
        obj.relacionPrecio = obj.multiplicador*5
        clicksPorSegundo += obj.multiplicador
    }
    valorPlusClick = Math.round(suma * multiplicadorPorClick)
    obj.comprados++
    btnPlusClick.innerHTML = `
    +$${valorPlusClick}
    `
    banco = banco - obj.precio
    divBanco.innerHTML = `$${Math.round(banco)}`
    obj.precio += Math.round(obj.precio*obj.relacionPrecio+valorPlusClick*obj.relacionPrecio+clicksPorSegundo*10) 
    spanNumeroSuma.innerHTML = `$${suma}`
    spanNumeroMultiplicador.innerHTML = `x${multiplicadorPorClick.toFixed(1)}`
    spanNumeroCPS.innerHTML = clicksPorSegundo.toFixed(1)
    spanNumeroPesosPorSegundo.innerHTML = `$${Math.round(valorPlusClick*clicksPorSegundo)}` 
    if (clicksPorSegundo > 0){
        let intervalID = window.setInterval(CPS, 1000);
    }
    
    desactivarActivarTienda()
    borrarTienda()
    crearTienda()
}
function CPS(){
    banco = banco + (valorPlusClick*clicksPorSegundo)
    divBanco.innerHTML = `$${Math.round(banco)}`
    desactivarActivarTienda()
}
function revisarVictoria(){
    if (banco >= 100000000) {
        alert('Ganaste!')
        window.location.href=window.location.href
    }else{
        return
    }
    
}
function borrarTienda (){
    divObjetosTienda.innerHTML = ''
}

function desactivarActivarTienda(){
    const botonesObjetoTienda = document.querySelectorAll('.objeto-tienda')
    
    for (let i = 0; i < spanPrecio.length; i++) {
            if (banco >= spanPrecio[i].innerHTML) {
                botonesObjetoTienda[i].disabled = false;
                botonesObjetoTienda[i].setAttribute("color", "green")
                
            } else {
                botonesObjetoTienda[i].disabled = true
            }
    }
    
}

window.addEventListener('load', crearTienda)