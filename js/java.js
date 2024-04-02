//entrada al formulario
const formulario = document.getElementById("formulario1");

//entrada a todos los inputs
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");


let valida ={
    nombre: false,
    apellido: false,
    telefono: false,
    correo: false,
    
}

//validar el nombre
nombre.addEventListener("blur", ()=>{
    let name_re = /^[a-zA-Z ]{3,40}$/;
    
    if(nombre.value == "" || nombre.value == null){
        
        setErrorFor(nombre, "El campo nombre no puede estar en blanco")
        valida.nombre=false;
    }else{
        if(!name_re.exec(nombre.value)){
            valida.nombre= false;
            setErrorFor(nombre,"El nombre debe ser escrito solo con letras y tener entre 3 a 40 caracteres");
            
        }else{
            setSuccessFor(nombre)
            valida.nombre=true;
        }
    }

})


//validar el apellido
apellido.addEventListener("blur", ()=>{
    let apell_re = /^[a-zA-Z ]{4,60}$/;
    
    if(apellido.value == "" || apellido.value == null){
        
        setErrorFor(apellido, "El campo apellido no puede estar en blanco")
        valida.nombre=false;
    }else{
        if(!apell_re.exec(apellido.value)){
            valida.apellido= false;
            setErrorFor(apellido,"El apellido debe ser escrito solo con letras y tener entre 4 a 60 caracteres");
            
        }else{
            setSuccessFor(apellido)
            valida.apellido=true;
        }
    }

})


//validar el correo
correo.addEventListener("blur",()=>{
    let cor_re = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;

    if(correo.value == "" || correo == null){
        valida.correo=false;
        setErrorFor(correo,"El campo correo no puede estar en blanco")

    }else{
        if(!cor_re.exec(correo.value)){
            valida.correo=false;
            setErrorFor(correo,"No ingresó un correo válido")
        }else{
            setSuccessFor(correo)
            valida.correo=true;
        }
    }
})



//validar el telefono
telefono.addEventListener("blur",()=>{
    let telefono_re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}$/;

    if (telefono.value == "" || telefono.value == null) {
        
        setErrorFor(telefono,"No puede dejar este apartado en blanco.");
        valida.telefono = false;
    }else{
        if (!telefono_re.exec(telefono.value)){
        setErrorFor(telefono,"El número de telefono debe tener 9 números.");
        valida.telefono = false;
        }else{
            setSuccessFor(telefono)
            valida.telefono = true;
        }
    }

})



//Mensaje de error
function setErrorFor(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
    

}

//si todo esta correcto
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}


//Envio del formulario

formulario.addEventListener("submit",(e)=>{
    e.preventDefault();

    let errorV = false;

    for(const property in valida){
        if(valida[property] == false){
            errorV = true;
        }
    }

    if(!errorV){
        formulario.submit();
    }
})




//MAPA

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(sucess,error,options);

}else{
    alert("Los servicios de geolocalización no está disponible");
}

var options= {
    enbleHighAccuracy: true,
    timeout:5000,
    maximumAge:0
};

function sucess(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let map = L.map ('map',{
        center: [latitude, longitude],
        zoom: 12
    });


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let control = L.Routing.control({
        waypoints: [
            L.latLng(latitude, longitude),
            L.latLng(36.71165, -4.4288),
        ],
        language: 'es',
        show: false
    }).addTo(map);
    
}


function error(){
    let map = L.map ('map',{
        center:[36.71165,-4.4288],
        zoom: 17
    });


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    let marker = L.marker([36.71165,-4.4288]).bindTooltip('MasterD').addTo(map)


}













