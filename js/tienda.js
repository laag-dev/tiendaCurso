//Variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];



cargarEventListeners();



//funciones


function cargarEventListeners() {

    //agregar un curso con el boton agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Al Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);


}


// Función que añade el curso al carrito
function agregarCurso(e) {
    e.preventDefault();

    // condicional para agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;


        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(cursoSeleccionado);
    }

}

// Elimina cursos del carrito
function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por data-id
        articulosCarrito = articulosCarrito.filter(cursoSeleccionado => cursoSeleccionado.id !== cursoId);

        carritoHtml(); // iteramos sobre el carrito y muestra HTML
    }

}


//lee el contenido del HTML al que le dimos click y extrae la info

function leerDatosCurso(cursoSeleccionado) {
    console.log(cursoSeleccionado);

    //Creo un objeto con el contenido del curso
    const infoCurso = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito

    const existe = articulosCarrito.some(cursoSeleccionado => cursoSeleccionado.id === infoCurso.id);
    if (existe) {
        // Incrementa cantidad

        const cursos = articulosCarrito.map(cursoSeleccionado => {

            if (cursoSeleccionado.id === infoCurso.id) {

                cursoSeleccionado.cantidad++;
                return cursoSeleccionado; //retorna el objeto actualizado

            } else {
                return cursoSeleccionado; //retorna los objetos que no están duplicados
            }
        });

        articulosCarrito = [...cursos];

    } else {
        //Agrega elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];

    }


    carritoHtml();
}


//Muestra el carrito de compras en el HTML

function carritoHtml() {

    //Limpiar HTML 
    limpiarHtml();

    //Recorre el carrito y genera el html

    articulosCarrito.forEach(cursoSeleccionado => {

        const { imagen, titulo, precio, cantidad, id } = cursoSeleccionado
        const row = document.createElement('tr');
        row.innerHTML = `  

        <td><img src="${imagen}" width=100></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad} </td>
        <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td> 
         `;


        //Agrega el HTML del carrito en nuestro tbody 
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del Tdody

function limpiarHtml() {

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
    
    articulosCarrito = [];

    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}