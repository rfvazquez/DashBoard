$(document).ready(function () {


});

function Executar() {
    var pdata = {};
    pdata["sql"] = $("#comando").val();
    pdata["tipo"] = $("#tipo").val();

    $.getJSON($("#SqlCommandURL").val(), pdata, function (data) {
        $("#retorno").val(data.Result.toString());
    });

}
