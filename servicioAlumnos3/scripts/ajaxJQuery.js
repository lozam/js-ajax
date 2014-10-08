var borrarTabla = function () {
    //$("#tablaDatos").parent.remove($("#tablaDatos"));
    $("#tablaDatos").remove();
};

var cargarDatos = function(datos) {
    $("#contenido").append("<table id='tablaDatos'></table>");
    $.each(datos, function(i, dato) {
        var fila = "<tr>";
        fila += "<td>" + dato.nombre + "</td>";
        fila += "<td>" + dato.edad + "</td>";
        fila += "<td>" + dato.nota + "</td></tr>";

        $("#tablaDatos").append(fila);
    });
};

var leer = function() {
    var url = "http://localhost:50355/api/alumnos";

    /*
    $.getJSON
    $.get
    $.post
    $.ajax
    $("div").load
    */

    //$.get(url, function (xhr) {
    //    borrarTabla();
    //    cargarDatos(xhr);
    //});

    $.ajax(url, {
        method: "get",
        contentType: "application/json",
        crossDomain: true,
        datatype: "json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("header", "valor");
        },
        success: function(xhr) {
            borrarTabla();
            cargarDatos(xhr);
        },
        error: function(err) {
            alert(err);
        }

    });

};

$(document).ready(function() {
    leer();
});