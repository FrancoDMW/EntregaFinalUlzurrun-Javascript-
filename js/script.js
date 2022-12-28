let mangas = [
    { id: 12, nombre: "Chainsaw Man", categoria: "Accion", precio: 1250, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/chainsawman/chainsawman01.jpg" },
    { id: 25, nombre: "Dragon Ball Super", categoria: "Accion", precio: 1250, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/dragonballsuper/dragonballsuper01.jpg" },
    { id: 31, nombre: "Slam Dunk", categoria: "Deportes", precio: 2500, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/slamdunk/slamdunk01.jpg" },
    { id: 48, nombre: "Blue Lock", categoria: "Deportes", precio: 1250, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/bluelock/bluelock01.jpg" },
    { id: 54, nombre: "Ao No Flag", categoria: "Slice of Life", precio: 1500, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/aonoflag/aonoflag01.jpg" },
    { id: 61, nombre: "Look Back", categoria: "Slice of Life", precio: 1250, marca: "Ivrea", rutaImagen: "https://www.ivrea.com.ar/lookback/lookback.jpg" },
]

let carro = []

let contenedor = document.getElementById("contenedor")
renderizarmangas(mangas)
let carrito = document.getElementById("carrito")
let buscador = document.getElementById("searchByText")
buscador.addEventListener("input", renderizarMangasFiltradosBuscador)

let filtroAccion = document.getElementById("Accion")
let filtroDeportes = document.getElementById("Deportes")
let filtroSliceOfLife = document.getElementById("Slice of Life")
let todos = document.getElementById("Todos")
let inicio = document.getElementById("Inicio")

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
        <h5>${manga.nombre}</h5>
        <h4>$${manga.precio}</h4>
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
    carro.push(mangaBuscado)
    actualizarCarrito()
    /*for(var i = 0; i<carro.length; i++){
      console.log(carro[i]);
    }*/
    console.log(carro)
}

const actualizarCarrito = () => {
    carrito.innerHTML = "<h3>Carrito</h3>"
    carro.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('list-group')
        div.innerHTML = `
        <li class = "list-group-item">${prod.nombre}</li>
        <li class = "list-group-item">Precio: ${prod.precio}$</li>
        `
        carrito.appendChild(div)
    })
}
