const etiqueta_imagen = document.querySelector("img");
/*
fetch("http://localhost:3000/").then(recurso => recurso.blob()).then(archivo => {
    var imagen =  URL.createObjectURL(archivo);
    etiqueta_imagen.src = imagen;
});*/

const input_archivo = document.querySelector("input");
input_archivo.addEventListener("change", function() {
    const archivo = input_archivo.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(archivo);

    

    

    reader.onload = function(){
        console.log(reader.result);
        etiqueta_imagen.src = reader.result;

        const objeto_imagen = {
        nombre: archivo.name,
        imagen: reader.result,
        tipo: archivo.type
        }

        console.log(objeto_imagen);

        fetch("http://localhost:3000", {
            method: "POST",
            body: JSON.stringify(objeto_imagen)
        })
    }

});

