var pdata = {};
var dModalidade = {};
var pdata2 = {};
var myVar;
var cont = 1;
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
    atualizar();

}


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
    atualizaFiltros();
});


function AtualizarAutomaticamente() {
    var check = $("#Atualizar").is(":checked");
    if (check) {
        atualizaSemSlide();
        setTimeout("AtualizarAutomaticamente()", 15000);
    }
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function CarregaFila(dados) {
    var tabela = "";
    var linhas = "";
    var data = JSON.parse(dados);

    if (data.length > 0) {
        $.each(data, function (index, dados) {
            tabela = "<tr>"
                + "<td>" + dados.FILA
                + "</td><td align='center'>" + dados.TOTAL_DISPONIVEIS
                + "</td><td align='center'>" + dados.INSTANCIAS
                + "</td><td align='center'>" + dados.EM_USO
                + "</td><td align='center'>" + dados.MAQUINAS + "</td></tr>";
            linhas = linhas + tabela;
        });
        $("#tblControleFila > tbody").empty();
        $("#tblControleFila > tbody").append(linhas);
    } else {
        $("#tblControleFila > tbody").empty();
    }
}





function CarregaDetalhes(modalidade, tipo) {
    var tabela = "";
    var linhas = "";
    var grafico = "";
    pdata2 = pdata;
    pdata2["Modalidade"] = replaceAll(modalidade, "_", " ");
    pdata2["tipo"] = tipo;
    $.getJSON($("#DetalhamentoUrl").val(), pdata2, function (data) {
        if (data.Result.length > 0) {
            $.each(data.Result, function (index, dados) {
                var exec = "'" + replaceAll(modalidade, " ", "_") + "','" + replaceAll(dados.Tabulacao, " ", "_") + "'";
                tabela = "<tr bgColor='" + dados.CorLinha + "'><td>"
                    + "</td><td><a onclick=CarregaDetalhesErro(" + exec + ")>" + dados.Tabulacao
                    + "</td><td align='center'> " + dados.Total
                    + "</td><td align='center'> " + dados.percentual + "</td></tr>"
                linhas = linhas + tabela;
            });
            $("#tblDetalhamento > tbody").empty();
            $("#tblDetalhamento > tbody").append(linhas);
        } else {
            $("#tblDetalhamento > tbody").empty();
        }
    });
    $("#NomeModalidade").html(replaceAll(modalidade, "_", " "));
    $("#dadosDetalhado").modal();
}


function CarregaDetalhesErro(modalidade, tabulacao) {
    var tabela = "";
    var linhas = "";
    var grafico = "";
    pdata2 = pdata;
    pdata2["Modalidade"] = replaceAll(modalidade, "_", " ");
    pdata2["Tabulacao"] = replaceAll(tabulacao, "_", " ");
    $.getJSON($("#DetalhamentoErroUrl").val(), pdata2, function (data) {
        if (data.Result.length > 0) {
            $.each(data.Result, function (index, dados) {
                tabela = "<tr bgColor='" + dados.CorLinha + "'>"
                    + "<td align='center' >" + dados.CPF
                    + "</td><td align='center'> " + dados.Nome
                    + "</td><td align='center' " + dados.nacimento
                    + "</td><td align='center'> " + dados.NomeMae
                    + "</td><td align='center'> " + dados.Sexo
                    + "</td><td align='center'> " + dados.Telefone
                    + "</td><td align='center'> " + dados.Email
                    + "</td><td align='center'> " + dados.Plano
                    + "</td><td align='center'> " + dados.tpPagamento
                    + "</td><td align='center'> " + dados.modeloPagamento
                    + "</td><td align='center'> " + dados.CEP
                    + "</td><td align='center'> " + dados.pais
                    + "</td><td align='center'> " + dados.estado
                    + "</td><td align='center'> " + dados.cidade
                    + "</td><td align='center'> " + dados.rua
                    + "</td><td align='center'> " + dados.numero
                    + "</td><td align='center'> " + dados.complemento
                    + "</td><td align='center'> " + dados.criacao
                    + "</td><td align='center'> " + dados.modificacao
                    + "</td><td align='center'> " + dados.numeroPedido
                    + "</td><td align='center'> " + dados.CodPDV
                    + "</td><td align='center'> " + dados.numeroChip
                    + "</td><td align='center'> " + dados.modalidade
                    + "</td><td align='center'> " + dados.diaPgt
                    + "</td><td align='center'> " + dados.operadora
                    + "</td><td align='center'> " + dados.operadoraAtual
                    + "</td><td align='center'> " + dados.descricao
                    + "</td><td align='center'> " + dados.janelaPortabilidade + "</td></tr>"
                linhas = linhas + tabela;
            });
            $("#tblDetalhamentoErro > tbody").empty();
            $("#tblDetalhamentoErro > tbody").append(linhas);
        } else {
            $("#tblDetalhamentoErro > tbody").empty();
        }
    });
    $("#NomeModalidadeErro").html(replaceAll(modalidade, "_", " ") + " - " + replaceAll(tabulacao, "_", " "));
    $("#dadosDetalhadoErroSiebel").modal();
}

function CarregaConversoes() {
    cont = 1;
    $.getJSON($("#DashBoardDetalhamentoTabulacoesUrl").val(), pdata, function (data) {
        if (data.Result.length > 0) {
            $.each(data.Result, function (index, dados) {
                dModalidade["modalidade"] = dados.Modalidade;
                $.ajax({
                    url: $("#DashBoardProdutivasUrl").val(),
                    data: dModalidade,
                    type: 'POST',
                    success: function (result) {
                        DashBoardConversao(result, "grafico" + dados.Modalidade);
                    }
                });
            });
        } else {
            $("#GraficoAptas").empty();
        }
    });
}

function CarregaDetalhamento() {
    var tabela = "";
    var linhas = "";
    var grafico = "";
    $.getJSON($("#DashBoardDetalhamentoTabulacoesUrl").val(), pdata, function (data) {
        if (data.Result.length > 0) {
            $.each(data.Result, function (index, dados) {
                var exec = "'" + replaceAll(dados.Modalidade, " ", "_") + "','4'";
                var exec1 = "'" + replaceAll(dados.Modalidade, " ", "_") + "','1'";
                var exec2 = "'" + replaceAll(dados.Modalidade, " ", "_") + "','2'";
                var exec3 = "'" + replaceAll(dados.Modalidade, " ", "_") + "','3'";
                tabela = "<tr bgColor='" + dados.CorLinha + "'>"
                    + "<td><a onclick=CarregaDetalhes(" + exec + ")>" + dados.Modalidade + "</a>"
                    + "</td><td align='center'><a onclick=CarregaDetalhes(" + exec1 + ")> " + dados.Sucesso + "</a>"
                    + "</td><td align='center'><a onclick=CarregaDetalhes(" + exec2 + ")>" + (dados.Aptas) + "</a>"
                    + "</td><td align='center'><a onclick=CarregaDetalhes(" + exec3 + ")>" + (dados.Erro - dados.Aptas) + "</a>"
                    + "</td><td align='center'>" + dados.Erro
                    + "</td><td align='center'>" + dados.Total
                    + "</td><td align='center'>" + dados.Resultado
                    + "</td><td align='center'>" + dados.PercentualAptas + "</td></tr>";
                linhas = linhas + tabela;


                grafico = grafico + "<div class='col-sm-4' style='height:400px; width:400px; float:left;position:relative;'>" +
                    "<h4 class='example-title'>Conversão " + dados.Modalidade + " / Aptas</h4>" +
                    "<div id='grafico" + dados.Modalidade + "' style='height:325px;width:100%;'></div>" +
                    "</div>";
            });
            $("#GraficoAptas").empty();
            $("#GraficoAptas").html(grafico);
            $("#tblDescricaoItens > tbody").empty();
            $("#tblDescricaoItens > tbody").append(linhas);
            CarregaConversoes();
        } else {
            $("#tblDescricaoItens > tbody").empty();
        }
    });
}

function atualizaSemSlide() {
    $.ajax({
        url: $("#DashBoardTabulacoesUrl").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            DashBoardTabulacoes(result);
            CarregaDetalhamento();
        }
    });


    $.ajax({
        url: $("#DashBoardFilaUrl").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            DashBoardFila(result);
            CarregaFila(result);
        }
    });


}


function atualizar() {

    $(".error").slideUp(300);
    $(".wait").slideDown(300);

    $.ajax({
        url: $("#DashBoardTabulacoesUrl").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            DashBoardTabulacoes(result);
            CarregaDetalhamento();
        }
    });

    $.ajax({
        url: $("#DashBoardFilaUrl").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            DashBoardFila(result);
            CarregaFila(result);
        }
    });


    $(".error").slideUp(300);
    $(".wait").slideUp(300);

}


function DashBoardConversao(json, div) {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {


        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Text');
        data.addColumn('number', 'Value');

        var pjson = JSON.parse(json);
        $(pjson).each(function () {
            data.addRows([["Vendas", $(this).attr("Sucesso")]]);
            data.addRows([["Não Vendas", ($(this).attr("Aptas"))]]);
        });

        var options = {
            title: ''
        };

        var chart = new google.visualization.PieChart(document.getElementById(div));
        cont = cont + 1;
        chart.draw(data, options);
    }
}



function fnExcelReport(tabela) {
    var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j = 0;
    tab = document.getElementById(tabela); // id of table

    for (j = 0; j < tab.rows.length; j++) {
        tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
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
        sa = txtArea1.document.execCommand("SaveAs", true, tabela + getDate() + ".xls");
    }
    else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));//;

    return (sa);
}

function DashBoardFila(json) {

    google.charts.setOnLoadCallback(drawMaterial);

    function drawMaterial() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'FILA');
        data.addColumn('number', 'TOTAL_DISPONIVEIS');
        data.addColumn({ type: 'string', role: 'annotation' });


        var pjson = JSON.parse(json);
        $(pjson).each(function () {
            data.addRows([[$(this).attr("FILA"), $(this).attr("TOTAL_DISPONIVEIS"), $(this).attr("TOTAL_DISPONIVEIS").toString()]]);
        });


        var options = {
            bars: 'horizontal',
            legend: { position: "none" },
        };

        var material = new google.charts.Bar(document.getElementById('ChartFila'));
        material.draw(data, options);
    }
}

function DashBoardTabulacoes(json) {

    google.charts.setOnLoadCallback(drawMaterial);

    function drawMaterial() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Modalidade');
        data.addColumn('number', 'Resultado');
        data.addColumn({ type: 'string', role: 'annotation' });


        var pjson = JSON.parse(json);
        $(pjson).each(function () {
            data.addRows([[$(this).attr("Modalidade"), $(this).attr("Resultado"), $(this).attr("Resultado").toString()]]);
        });


        var options = {
            bars: 'horizontal',
            legend: { position: "none" },
        };

        var material = new google.charts.Bar(document.getElementById('ChartTabulacao'));
        material.draw(data, options);
    }
}
