var url = "http://localhost:50355/api/";

var borrarTablaC = function () {
    document.getElementById("contenidoC").removeChild(
    document.getElementById("tablaDatosC"));
}

var cargarTablaC = function (datos) {
    var tabla = document.createElement("table");
    tabla.setAttribute("id", "tablaDatosC");
    tabla.setAttribute("border", 1);

    for (var i = 0; i < datos.length; i++) {
        var fila = document.createElement("tr");
        var c1 = document.createElement("td");
        var c2 = document.createElement("td");
        var c3 = document.createElement("td");

        var c4 = document.createElement("td");
        var btX = document.createElement("button");
         btX.setAttribute("id", datos[i].id);
         btX.setAttribute("onClick", "borraDatosC(this.id)");

        var c5 = document.createElement("td");
        var btM = document.createElement("button");
        btM.setAttribute("id", "Modificar-"+datos[i].id);
        btM.setAttribute("onClick", "modificarC(event)");

        var t1 = document.createTextNode(datos[i].nombre);
        var t2 = document.createTextNode(datos[i].duracion);
        var t3 = document.createTextNode(datos[i].profesor);

        var t4 = document.createTextNode(" Eliminar ");
        var t5 = document.createTextNode(" Modificar ");

        c1.appendChild(t1);
        c2.appendChild(t2);
        c3.appendChild(t3);

        btX.appendChild(t4);
        c4.appendChild(btX);

        btM.appendChild(t5);
        c5.appendChild(btM);

        fila.appendChild(c1);
        fila.appendChild(c2);
        fila.appendChild(c3);
        fila.appendChild(c4);
        fila.appendChild(c5);

        tabla.appendChild(fila);
    }
    document.getElementById("contenidoC").appendChild(tabla);
}

var leerDatosC = function () {
    var urlFinal = url + "cursos";

    var ajax = new XMLHttpRequest();
    ajax.open("GET", urlFinal);
    ajax.onreadystatechange = function () {

        if (ajax.readyState != 4)
            return;

        if (ajax.status >= 200 && ajax.status < 300) {
            borrarTablaC();
            var datos = eval(ajax.responseText);
            cargarTablaC(datos);
        } else {
            alert("error recuperando información");
        }
    };
    ajax.send(null);
};

var escribirDatosC = function () {
    var urlFinal = url + "cursos";
    var ajax = new XMLHttpRequest();

    var id = document.getElementById("hdnId").value;

    var json = {
        nombre: document.getElementById("txtNombreC").value,
        duracion: document.getElementById("txtDuracionC").value,
        profesor: document.getElementById("txtProfesorC").value
    };


    if (isNaN(id) || id == "") {
        ajax.open("POST", urlFinal);


    } else {
        urlFinal += "/" + id;
        json.id = id;
        ajax.open("PUT", urlFinal);
    }

    ajax.setRequestHeader("Content-type", "application/json");
    ajax.onreadystatechange = function () {

        if (ajax.readyState != 4)
            return;

        if (ajax.status >= 200 && ajax.status < 300) {
            document.getElementById("hdnId").value = "";
            leerDatosC();
        } else {
            alert("error escribiendo datos");
        }
    };



    var jsonText = JSON.stringify(json);
    ajax.send(jsonText);

};

var borraDatosC = function (dato) {
    console.log(dato);
    var urlFinal = url + "cursos/"+dato;

    var ajax = new XMLHttpRequest();
    ajax.open("DELETE", urlFinal);
    ajax.setRequestHeader("Content-type", "application/json");
    ajax.onreadystatechange = function () {

        if (ajax.readyState != 4)
            return;

        if (ajax.status >= 200 && ajax.status < 300) {
            leerDatosC();
           
        } else {
            alert("error al borrar datos");
        }
    };

    
    ajax.send();

    leerDatosC();

};

var modificarC = function (evt) {
    var idelemento = evt.target.getAttribute("id");
    var urlFinal = url + "cursos/" + idelemento.split("-")[1];

    var ajax = new XMLHttpRequest();
    ajax.open("GET", urlFinal);
    ajax.onreadystatechange = function () {

        if (ajax.readyState != 4)
            return;

        if (ajax.status >= 200 && ajax.status < 300) {
            var obj = eval('(' + ajax.responseText + ')');
            document.getElementById("hdnId").value = obj.id;
            document.getElementById("txtNombreC").value = obj.nombre;
            document.getElementById("txtDuracionC").value = obj.duracion;
            document.getElementById("txtProfesorC").value = obj.profesor;
        } else {

            alert("Error leyendo datos");
        }

    };

    ajax.send(null);
};


(function () {
    document.getElementById("btnGuardarC").onclick = escribirDatosC;
    leerDatosC();

})();


















