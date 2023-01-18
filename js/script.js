let mangas = [
    { id: 12, nombre: "Chainsaw Man", categoria: "Accion", precio: 1250, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/chainsawman/chainsawman01.jpg" },
    { id: 25, nombre: "Dragon Ball Super", categoria: "Accion", precio: 1250, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/dragonballsuper/dragonballsuper01.jpg" },
    { id: 31, nombre: "Slam Dunk", categoria: "Deportes", precio: 2500, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/slamdunk/slamdunk01.jpg" },
    { id: 48, nombre: "Blue Lock", categoria: "Deportes", precio: 1250, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/bluelock/bluelock01.jpg" },
    { id: 54, nombre: "Ao No Flag", categoria: "Slice of Life", precio: 1500, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/aonoflag/aonoflag01.jpg" },
    { id: 61, nombre: "Look Back", categoria: "Slice of Life", precio: 1250, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/lookback/lookback.jpg" },
    { id: 64, nombre: "My Hero Academia", categoria: "Accion", precio: 1250, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/myheroacademia/myheroacademia01.jpg" },
    { id: 66, nombre: "Evangelion", categoria: "Accion", precio: 1500, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/evangelion/evangeliondeluxe_01.jpg" },
    { id: 11, nombre: "Oyasumi Pumpum", categoria: "Slice of Life", precio: 1500, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/oyasumipunpun/oyasumipunpun01.jpg" },
    { id: 27, nombre: "Haikyu!!", categoria: "Deportes", precio: 1250, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/haikyu/haikyu01.jpg" },
    { id: 47, nombre: "SpyXFamily", categoria: "Accion", precio: 1250, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/spyxfamily/spyxfamily01.jpg" },
    { id: 47, nombre: "One Piece", categoria: "Accion", precio: 1250, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/onepiece/onepiece01.jpg" },

]


let carro = []

let contenedor = document.getElementById("contenedor")
renderizarmangas(mangas)
let carrito = document.getElementById("carrito")
let buscador = document.getElementById("searchByText")
buscador.addEventListener("input", renderizarMangasFiltradosBuscador)
let contenedorCarritoTotal = document.getElementById("contenedorCarritoTotal")
let filtroAccion = document.getElementById("Accion")
let filtroDeportes = document.getElementById("Deportes")
let filtroSliceOfLife = document.getElementById("Slice of Life")
let todos = document.getElementById("Todos")
let inicio = document.getElementById("Inicio")
let cartNav = document.getElementById("cart-nav")
let botonCarrito = document.getElementById("cart-button")
let modal = document.getElementById("myModal");
botonCarrito.addEventListener("click", esconder)
filtroAccion.addEventListener("click", renderizarmangasFiltrados)
filtroDeportes.addEventListener("click", renderizarmangasFiltrados)
filtroSliceOfLife.addEventListener("click", renderizarmangasFiltrados)
todos.addEventListener("click", renderizarmangasFiltrados)
inicio.addEventListener("click", renderizarmangasFiltrados)

function renderizarmangasFiltrados(e) {
    if (e.target.id == "Todos" || e.target.id == "Inicio") {
        renderizarmangas(mangas)
    } else {
        renderizarmangas(mangas.filter(manga => manga.categoria == e.target.id))
    }
}

function renderizarMangasFiltradosBuscador(e) {
    let mangasFiltrados = mangas.filter(o => { return (o.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || o.categoria.toLowerCase().includes(buscador.value.toLowerCase()) || o.marca.toLowerCase().includes(buscador.value.toLowerCase())) })/* 
    let librosFiltrados = libros.filter(libro => libro.titulo.toLowerCase().includes(buscador.value.toLowerCase())) */
    console.log(mangasFiltrados)
    renderizarmangas(mangasFiltrados)
}

function renderizarmangas(arrayDemangas) {
    contenedor.innerHTML = ""
    for (const manga of arrayDemangas) {
        let tarjeta = document.createElement("div")
        tarjeta.className = "tarjeta"
        tarjeta.innerHTML = `
        <p>${manga.nombre}</p>
        <p>$${manga.precio}</p>
        <img src=${manga.rutaImagen}>
        <button type="button" class="btn btn-outline-success" style= "margin-top: 20px" id=${manga.id}>Agregar al carrito</button>
      `
        contenedor.appendChild(tarjeta)
    }

    let botones = document.getElementsByClassName("btn btn-outline-success")
    for (const boton of botones) {
        boton.addEventListener("click", agregarAlCarrito)
    }
}

function agregarAlCarrito(e) {
    let mangaBuscado = mangas.find(manga => manga.id == e.target.id)
    let chequeoManga = carro.findIndex(manga => manga.id == mangaBuscado.id)
    if (chequeoManga != -1) {
        carro[chequeoManga].cantidad++
        carro[chequeoManga].precioTotalCantidad = carro[chequeoManga].cantidad * carro[chequeoManga].precio
    }
    else {
        carro.push({ id: mangaBuscado.id, nombre: mangaBuscado.nombre, categoria: mangaBuscado.categoria, precio: mangaBuscado.precio, marca: mangaBuscado.marca, cantidad: 1, precioTotalCantidad: mangaBuscado.precio, img: mangaBuscado.rutaImagen})
    }
    totalFinal = carro.reduce((a, b) => a + b.precioTotalCantidad, 0)
    unidades = carro.reduce((a, b) => a + b.cantidad, 0)
    actualizarCarrito(carro)
    totalRender(carro)
    console.log(carro)
}

function eliminarCarrito(e) {
    let mangaBuscado = mangas.find(manga => manga.id == e.target.id)
    let chequeoManga = carro.findIndex(manga => manga.id == mangaBuscado.id)
    if (chequeoManga != -1) {
        if (carro[chequeoManga].cantidad >= 2) {
            carro[chequeoManga].cantidad--
            carro[chequeoManga].precioTotalCantidad = carro[chequeoManga].precioTotalCantidad - carro[chequeoManga].precio
        }
        else {
            carro.splice(chequeoManga, 1)
        }
    }
    totalFinal = carro.reduce((a, b) => a + b.precioTotalCantidad, 0)
    unidades = carro.reduce((a, b) => a + b.cantidad, 0)
    actualizarCarrito(carro)
    totalRender(carro)
    console.log(carro)
}

function actualizarCarrito(array) {
    carrito.innerHTML = ""
    carrito.style.display = "flex";
    for (let manga of array) {
        let { nombre, cantidad, precioTotalCantidad, id, img} = manga
        let div = document.createElement('div')
        div.className = "list-group list-group-horizontal"
        div.innerHTML = `
        <div class = "carrito list-group-item">
        <div style = "flex:2">${nombre}</div>
        <div style="flex:2"><img class="imagenCarrito" src="${img}"></div>
        <div style = "flex:2">Precio: ${precioTotalCantidad}$</div>
        <div style = "flex:2">Cantidad: ${cantidad}</div>
        <button id="${id}"class = "restar list-group-item btn btn-outline-success"> - </button>
        <button id="${id}"class = "sumar list-group-item btn btn-outline-success"> + </button>
        </div>
        `
        carrito.append(div)

        let restar = document.getElementsByClassName("restar list-group-item btn btn-outline-success")
        for (let a of restar) {
            a.addEventListener("click", eliminarCarrito)
        }
        let sumar = document.getElementsByClassName("sumar list-group-item btn btn-outline-success")
        for (let b of sumar) {
            b.addEventListener("click", agregarAlCarrito)
        }
    }
}

function totalRender(array) {
    totalFinal = carro.reduce((a, b) => a + b.precioTotalCantidad, 0)
    unidades = carro.reduce((a, b) => a + b.cantidad, 0)
    total.innerHTML = ""
    let totalResumen = document.createElement("div")
    totalResumen.className = "total"
    totalResumen.innerHTML = `
        <span class="close">&times;</span> 
        <div style = "text-align:center">
        <h6>Items: <strong>${unidades} </strong></h6>
        <h6>Total:<strong> $ ${totalFinal.toFixed(2)}</strong></h6>
        </div>
        `
    total.append(totalResumen)
    let span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }
    cartNav.innerHTML = ""
    if (array.lenght != 0) {
        let parrafo = document.createElement("div")
        parrafo.className = "cart-total"
        parrafo.innerHTML = `<p>${unidades}</p>`
        cartNav.append(parrafo)
    } else {
        let parrafo = document.createElement("div")
        parrafo.className = "cart-total"
        parrafo.innerHTML = `<p>0</p>`
        cartNav.append(parrafo)
    }
}
function totalRenderVacio(array) {
    total.innerHTML = ""
    let totalResumen = document.createElement("div")
    totalResumen.className = "total"
    totalResumen.innerHTML = `
            <span class="close">&times;</span> 
            <h5 class="totalh5">Items: <strong>  0 </strong></h5>
            <h5 class="totalh5">Total:<strong> $ 0.00 </strong></h5>
            `
    total.append(totalResumen)
    cartNav.innerHTML = ""
    let parrafo = document.createElement("div")
    parrafo.className = "cart-total"
    parrafo.innerHTML = `<p>0</p>`
    cartNav.append(parrafo)

    let span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }

}

function esconder(e) {
    modal.style.display = "block";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

