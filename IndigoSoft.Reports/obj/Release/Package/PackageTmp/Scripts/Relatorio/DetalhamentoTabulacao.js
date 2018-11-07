var pdata = {};
var myVar;
var abertaAtual="";
function atualizaFiltros() {

    if ($("#DtInicio").val() === "") {
        pdata["DtFim"] = '01/01/1900';
        pdata["DtIncio"] = '01/01/1900';
    } else {
        if ($("#DtFim").val() === "") {
            pdata["DtFim"] = '01/01/1900';
            pdata["DtIncio"] = '01/01/1900';
            $(".error").slideDown(300);
            $(".error").html("Obrigatória entrada de Data Inicio e Final do Processo");
            return;
        } else {
            pdata["DtIncio"] = $("#DtInicio").val() + " 00:00:00";
            pdata["DtFim"] = $("#DtFim").val() + " 23:59:59";
        }
    }

    if (new Date(pdata["DtFim"]) < new Date(pdata["DtIncio"])) {
        $(".error").html("Data inicio deve sem maior ou igual a Data fim");
        $(".error").slideDown(300);
        $(".wait").slideUp(300);
        pdata["DtFim"] = '01/01/1900';
        pdata["DtIncio"] = '01/01/1900';
        return;
    }
    pdata["Matricula"] = '';
    atualizar();
}


$(document).ready(function () {

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
    atualizaFiltros();
});


function AtualizarAutomaticamente() {
    var check = $("#Atualizar").is(":checked");
    if (check) {
        atualizaSemSlide();
        setTimeout("AtualizarAutomaticamente()", 15000);
    }
}


function ExportExcel() {
    var tab_text = "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j = 0;
    tab = document.getElementById('tblDescricaoItens'); // id of table

    for (j = 0 ; j < tab.rows.length ; j++) {
        if (tab.rows[j].innerHTML.indexOf("Total") == -1) {
            tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
        }
        //tab_text=tab_text+"</tr>";
    }

    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html", "replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand("SaveAs", true, "Arquivo.xls");
    }
    else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

    return (sa);
}



function CarregaDetalhamento() {
    var tabela = "";
    var linhas = "";
    $.getJSON($("#DetalhamentoTabulacaoURL").val(), pdata, function (data) {

        if (data.Result.length > 0) {
            $.each(data.Result, function (index, dados) {
                tabela = "<tr bgColor='" + dados.CorLinha + "'>"
                    + "<td>" + dados.login_usuario
                    + "</td><td>" + dados.colaborador
                    + "</td><td>" + dados.codigo_tabulacao
                    + "</td><td>" + dados.descricao_tabulacao
                    + "</td><td>" + dados.data_interacao
                    + "</td><td>" + dados.TelevisaoAdiquirida
                    + "</td><td>" + dados.TelefoneAdiquirida
                    + "</td><td>" + dados.InternetAdiquirida
                    + "</td><td>" + dados.AdicionaisAduidida
                    + "</td></tr>";
                linhas = linhas + tabela;
            });
            $("#tblDescricaoItens > tbody").empty();
            $("#tblDescricaoItens > tbody").append(linhas);
        } else {
            $("#tblDescricaoItens > tbody").empty();
        }
    });
}

function atualizaSemSlide() {
    CarregaDetalhamento();
}

function atualizar() {

    $(".error").slideUp(300);
    $(".wait").slideDown(300);


    CarregaDetalhamento();


    $(".error").slideUp(300);
    $(".wait").slideUp(300);
}


