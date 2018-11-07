
var pdata = {};


$(document).ready(function () {

    google.charts.load("current", { packages: ["corechart", 'bar'] });
    $(".box-sm-c").addClass("animated");
    $(".box-m-c").addClass("animated");
    $(".box-c").addClass("animated");
    $(".box").addClass("animated");

    $(".box-sm-c").addClass("zoomIn");
    $(".box-m-c").addClass("zoomIn");
    $(".box-c").addClass("zoomIn");
    $(".box").addClass("zoomIn");

    $(".box-sm-c").show();
    $(".box-m-c").show();
    $(".box-c").show();
    $(".box").show();

    $(".box-color").addClass("animated");
    $(".box-color").addClass("bounceIn");
    $(".box-color").show();

    setTimeout(function () {
        $(".box-color").addClass("animated");
        $(".box-color").addClass("bounceIn");
        $(".box-color").show();
    }, 800);
    AtualizarAutomaticamente();
});



function AtualizarAutomaticamente() {
        pdata["supervisor"] = "";
        Detalhamento();
        setTimeout("AtualizarAutomaticamente()", 15000);
}

function Detalhamento() {
    var tabela = "";
    var linhas = "";
    $.getJSON($("#VendasPendentesURL").val(), pdata, function (data) {
        if (data.Result.length > 0) {
            $.each(data.Result, function (index, dados) {
                tabela = "<tr bgColor='" + "#ffffff" + "'><td>"
                    + "</td><td>" + dados.pro_login
                    + "</td><td>" + dados.pro_Nome
                    + "</td><td>" + dados.int_cpf
                    + "</td><td>" + dados.int_NomeCompleto
                    + "</td><td>" + dados.int_estado
                    + "</td><td>" + dados.int_cidade
                    + "</td><td>" + dados.int_TelefoneAdiquirida
                    + "</td><td>" + dados.int_InternetAdiquirida
                    + "</td><td>" + dados.int_TelevisaoAdiquirida
                    + "</td><td>" + dados.int_AdicionaisAduidida
                    + "</td><td>" + dados.int_TabelaPreco
                    + "</td><td>" + dados.int_GrupoPreco
                    + "</td><td>" + dados.int_CategoriaOferta
                    + "</td><td>" + dados.int_Ofertas
                    + "</td><td>" + dados.int_GrupoPromocao
                    + "</td><td>" + dados.int_Promocao
                    +"</tr>";
                linhas = linhas + tabela;
            });
            $("#tblDescricaoItens > tbody").empty();
            $("#tblDescricaoItens > tbody").append(linhas);
        } else {
            $("#tblDescricaoItens > tbody").empty();
        }
    });
}
