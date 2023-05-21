//Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //cuando agregas un cursos presionand "Agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);
  //Elimina cursos del carrito
  carrito.addEventListener('click', elminarCurso);

  carrito.addEventListener('click', (e) => {
    e.preventDefault()
    articulosCarrito = []; //reiniciar array 
    limpiarHTML(); //Eliminamos el html
  });
}

//Funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

//Eliminar curso del carrito

function elminarCurso(e){
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute('data-id')

        //Elimina del array por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !==cursoId)

    }
    carritoHTML()//Iterar sobre el carrito y mostrar su html
}



//Leer el contenido del html y extraer los datos del curso

function leerDatosCurso(curso) {
  //  console.log(curso)

  //Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisa si un elemento ya existe en el carrito

  const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)

  if(existe){
    //Actualizamos la cantidad
    const cursos = articulosCarrito.map(curso=>{
        if(curso.id === infoCurso.id){
            curso.cantidad++;
            return curso; //devuelve el objeto actualizado
        } else {
            return curso; // devuelve los objetos que no son los duplicados
        }
    })
    articulosCarrito = [...cursos]

  }else{

      //Agregar elementos al carrito
  articulosCarrito = [...articulosCarrito, infoCurso];

  }


  console.log(articulosCarrito);
  carritoHTML();
}

//Muestra el carrito de compras en el html
function carritoHTML() {
  limpiarHTML();

  articulosCarrito.forEach((curso) => {
    const {imagen, titulo, precio, id, cantidad} = curso
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        
        `;

    //Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

//Elimina los cursos del body

function limpiarHTML() {
  //Forma lenta
  // contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
