window.addEventListener("resize",reajustar)
document.getElementById("btn_menu").addEventListener("click", toggleMenu);
let axu=1;


function toggleMenu(){      //cambia el style del menu dependiendo su estado anterior (axu 0 modo desktop, axu 1 modo mobile)
    if (axu == 1){
        document.getElementById("nav").style.display="grid";
        axu = 0;
    }else{
        document.getElementById("nav").style.display="none";
        axu = 1;
    }
}

function reajustar(){   //reajusta la vista del menu dependiendo de la resolucion maxima de la pantalla
    if (window.innerWidth >= 600){
        document.getElementById("nav").style.display="grid";
        axu=0;
    }else{
        document.getElementById("nav").style.display="none";
        axu=1;
    }
}

function Captcha(){         //creación del captcha aleatorio mediante 6 letras aleatorioas dentro de un array (letras)
    let letras= new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
    let i;
    let contenidoCaptcha="";
    for (i = 0; i < 6; i++){
        contenidoCaptcha=contenidoCaptcha+letras[Math.floor(Math.random() * letras.length)];
    }
    document.querySelector("#mainCaptcha").innerHTML=contenidoCaptcha;
}

function ValidCaptcha(){       //valida el captcha generado aleatoriamente, en caso de ingresar el captcha erróneo, avisa al usuario mediante una alerta
    let string1 = document.querySelector("#mainCaptcha").innerHTML;
    let string2 = document.querySelector("#txtInput").value;
    if (string1 == string2){
        alert("Pedido realizado, gracias por su compra!");
        return true; 
    }else{
        Captcha();
        alert("Error al ingresar el Captcha, recuerde usar mayúsculas")
        return false;
    }
}
let arregloCarrito = [
    {"producto" : "Taza", "precio": 0}
]
let arregloProductos = [        //arreglo de productos con nombre y precio
    {"producto" : "Alfajores de Chocolate" ,                                "precio" : 60 },
    {"producto" : "Alfajores de Vainilla y Masa Sabblé" ,                   "precio" : 60 },
    {"producto" : "Crinkles de Canela" ,                                    "precio" : 150 },
    {"producto" : "Crinkles de Chocolate" ,                                 "precio" : 150 },
    {"producto" : "Crinkles de Limón" ,                                     "precio" : 150 },
    {"producto" : "Lemonies" ,                                              "precio" : 60 },
    {"producto" : "Marineras" ,                                             "precio" : 90 },
    {"producto" : "Focaccia de Espinaca" ,                                  "precio" : 150 },
    {"producto" : "Focaccia de Remolacha" ,                                 "precio" : 150 },
    {"producto" : "Focaccia de Zanahoria" ,                                 "precio" : 150 },
    {"producto" : "Grisines" ,                                              "precio" : 90 },
    {"producto" : "Pre Pizzas Caseras" ,                                    "precio" : 150 },
    {"producto" : "Pan de Miel" ,                                           "precio" : 160 },
    {"producto" : "Pan dulce de Trozos de Chocolate" ,                      "precio" : 400 },
    {"producto" : "Pan dulce de Fruta Glaseada con Frutos secos y pasas" ,  "precio" : 400 },
    {"producto" : "Pan dulce de Frutos Secos" ,                             "precio" : 400 },
    {"producto" : "Pan dulce de Frutos Secos con trozos de Chocolate" ,     "precio" : 400 },
    {"producto" : "Pan de Masa Madre" ,                                     "precio" : 400 },
    {"producto" : "masaRica" ,                                     "precio" : 739 }
  ];

function genera_tabla() {       //tabla precargada con 1 dato (promocion de taza por el dia de la madre)
        document.getElementById("tablaprueba").insertRow(-1).innerHTML = '<td>Taza</td> <td>0</td>  <td>1</td>';
}

function validarEspacio() {     //valida el formulario al ingresar una cantidad de productos (no puede ser null), en el caso de ser null avisa al usuario con una alerta
    var x = document.querySelector("#cantidad").value;
    if (x == "") {
      alert("Por Favor elige una Cantidad!");
      return false;
    }else if (x != ""){
        agregarAlCarrito();
    }
  }

function agregarAlCarrito(){     //aumenta el contador del carrito dependiendo la cantidad de productos y su valor  (función verificarPrecio() js:103 )
    let contador = parseInt(document.querySelector("#total").innerHTML);
    let Producto = document.querySelector('#listaProductos').value;
    let precio = verificarPrecio(Producto);
    let cantidad = document.querySelector('#cantidad').value;
    document.getElementById("tablaprueba").insertRow(-1).innerHTML = '<td>'+Producto+'</td> <td>'+precio+'</td>  <td>'+cantidad+'</td>';
    arregloCarrito.push({producto: Producto,precio: precio});
    console.log(arregloCarrito);
    let precioTotal = precio*cantidad;
    document.querySelector("#total").innerHTML= contador + precioTotal;

}

function agregarPromo(){        // agrega 3 items a la tabla (agrega 3 items especificos a la tabla) y agrega el valor de la promocion al total del carrito de compras
    let contador = parseInt(document.querySelector("#total").innerHTML);
    document.getElementById("tablaprueba").insertRow(-1).innerHTML = '<td>Pan dulce de trozos de Chocolate</td> <td>350</td>  <td>1</td>';
    document.getElementById("tablaprueba").insertRow(-1).innerHTML = '<td>Pan dulce de Frutos Secos</td> <td>350</td>  <td>1</td>';
    document.getElementById("tablaprueba").insertRow(-1).innerHTML = '<td>Pan dulce de Fruta Glaseada</td> <td>350</td>  <td>1</td>';
    document.querySelector("#total").innerHTML= contador + 1050;
    arregloCarrito.push({producto:'Pan dulce de trozos de Chocolate' ,precio: 350});
    arregloCarrito.push({producto:'Pan dulce de Frutos Secos' ,precio: 350});
    arregloCarrito.push({producto:'Pan dulce de Fruta Glaseada' ,precio: 350});
    console.log(arregloCarrito);
}

function verificarPrecio(Producto){         //chequea el precio dependiendo el producto seleccionado y devuelve su valor (precio)
    let precio = 0;
    for (let i = 0; i< arregloProductos.length; i++){
        if (arregloProductos[i].producto == Producto){
            precio = arregloProductos[i].precio;
        }
    }
    return precio;
}

function vaciarCarrito(){           //borra todos los elementos del carrito de compras y setea el valor del total del carrito de nuevo a "0"
    let table = document.getElementById("tablaprueba");
    let largoTabla = table.rows.length;
    let largocarrito = arregloCarrito.length;
    arregloCarrito.splice(0,arregloCarrito.length);
    arregloCarrito.push({producto: 'Taza', precio: 0});
    console.log(arregloCarrito);
    for (let i = largoTabla-1; i > 1; i--){
            table.deleteRow(i);
    }
    document.querySelector("#total").innerHTML= 0;
}

let select = document.getElementById("listaProductos");         //variable local para la carga de elementos en el boton despegable SELECT

function cargar(){
    for(let i = 0; i < arregloProductos.length; i++) {  //carga nombres al selector desde el arreglo arregloProductos
        let opt = arregloProductos[i].producto;
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}
