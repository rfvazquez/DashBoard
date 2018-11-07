var pdata = {};
var myVar;
var abertaAtual="";
var abertaAtualOperacao="";
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


function CarregaGraficoGeral() {
    $.ajax({
        url: $("#DashBoardTabulacaoOperadorTotalUrl").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            DashBoardTabulacoesGeral(result);
        }
    });
}


// a e b são objetos Date do JS
function dateDiferencaEmDias() {
    // Descartando timezone e horário de verão

    //return a.diff(b, 'days');
    var data1 = new Date(pdata["DtIncio"]).getTime();
    var data2 = new Date(pdata["DtFim"]).getTime();
    var timeDiff = Math.abs(data1 - data2);
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

function CarregaDetalhamento() {
    var tabela = "";
    var linhas = "";
    $.getJSON($("#ResumoDashBoardOperadorUrl").val(), pdata, function (data) {

        var vendas = 2;
        var dif = dateDiferencaEmDias();
        if (!dif == 0) {
            vendas = vendas * dif;
        }
        var corCelula = '';

        if (data.Result.length > 0) {
            $.each(data.Result, function (index, dados) {
                var param = "'" + dados.Login + "','" + replaceAll(dados.Usuario, " ", "_") + "'";

                if (vendas > dados.Vendas) {
                    corCelula = '#FFE4E1';
                } else {
                    corCelula = dados.CorLinha;
                }


                tabela = "<tr bgColor='" + dados.CorLinha + "'><td>" +
                    "<a onclick=Detalhar(" + param + ")><img src='../Images/SetaDireita.png' id='img" + dados.Login + "'></a>"
                    + "</td><td>" + dados.Login
                    + "</td><td>" + dados.Usuario
                    + "</td><td align='center'>" + dados.Inaptas
                    + "</td><td align='center'>" + dados.Negociacao
                    + "</td><td align='center' bgcolor='" + corCelula + "'>" + dados.Vendas
                    + "</td><td align='center'>" + dados.Recusas
                    + "</td><td align='center'>" + dados.Improdutivas
                    + "</td><td align='center'>" + dados.Inconsistencias
                    + "</tr>"
                    + "<tr style='width:0px;height:0px' >"
                    + "<td colspan='9' style='width:0px;height:0px' >"
                    + "<id id='" + dados.Login + "' style='width:0px;height:0px' >"
                    + "</td>"
                    + "</tr>"
                ;
                linhas = linhas + tabela;
            });
            $("#tblDescricaoItens > tbody").empty();
            $("#tblDescricaoItens > tbody").append(linhas);
        } else {
            $("#tblDescricaoItens > tbody").empty();
        }
    });
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function Detalhar(login, nome) {

    $(".error").slideUp(300);
    $(".wait").slideDown(300);

    var tabela = "";
    var linhas = "";
    var imgNum = 1;
   
    if (abertaAtual != "" && abertaAtual != login) {
        document.getElementById(abertaAtual).innerHTML = "";
        document.getElementById("img" + abertaAtual).src = "../Images/SetaDireita.png";
    }
    abertaAtual = login;
    var div = document.getElementById(login);
    if (div.innerHTML != "") {
        div.innerHTML = "";
        document.getElementById("img" + abertaAtual).src = "../Images/SetaDireita.png";
    } else {
        pdata["Matricula"] = login;
        $.getJSON($("#DetalhadoDashBoardOperadorUrl").val(), pdata, function (data) {
            if (data.Result.length > 0) {
                var imgNum = 1;
                var pTabulcao = "";
                var parametros = "";
                document.getElementById("img" + abertaAtual).src = "../Images/SetaBaixo.png";
                $.each(data.Result, function (index, dados) {                   
                    pTabulacao = replaceAll(dados.Tabulacao, "&nbsp;", "");
                    pTabulacao = replaceAll(pTabulacao, "<b>", "");
                    pTabulacao = replaceAll(pTabulacao, "<br>", "");
                    pTabulacao = replaceAll(pTabulacao, "</b>", "");
                    pTabulacao = replaceAll(pTabulacao, "</br>", "");
                    pTabulacao = replaceAll(pTabulacao, "<br/>", "");
                    pTabulacao = replaceAll(pTabulacao, " ", "_");           

                    parametros = "'" + pTabulacao + "','" + imgNum + "'";
                    parametros = replaceAll(parametros, "br", "");
                    parametros = replaceAll(parametros, "<", "");
                    parametros = replaceAll(parametros, ">", "");
                    parametros = replaceAll(parametros, "/", "");
                    if (dados.CorLinha == "#FFFFFF")
                    {
                        tabela = "<tr bgColor='" + dados.CorLinha + "'><td>"
                        + "<a onclick=DetalharPorOperacao(" + parametros + ")><img src='../Images/SetaDireita.png' id='imgoperacao" + imgNum + "'></a>"
                        + "</td><td>" + replaceAll(dados.Tabulacao, "<br/>", "")
                        + "</td><td>" + replaceAll(dados.Quantidade, "<br/>", "")
                        + "</td><td>" + replaceAll(dados.Percentual, "<br/>", "")
                        + "</td></tr>"
                        + "<tr style='width:0px;height:0px' >"
                        + "<td colspan='4' style='width:0px;height:0px' >"
                        + "<id id='" + "i" + imgNum + "' style='width:0px;height:0px' >"
                        + "</td>"
                        + "</tr>";
                    }
                    else
                    {
                        tabela = "<tr bgColor='" + dados.CorLinha + "'><td>"
                        + " "
                        + "</td><td>" + replaceAll(dados.Tabulacao, "<br/>", "")
                        + "</td><td>" + replaceAll(dados.Quantidade, "<br/>", "")
                        + "</td><td>" + replaceAll(dados.Percentual, "<br/>", "")
                        + "</td></tr>"
                        + "<tr style='width:0px;height:0px' >"
                        + "<td colspan='4' style='width:0px;height:0px' >"
                        + "<id id='" + "i" + imgNum + "' style='width:0px;height:0px' >"
                        + "</td>"
                        + "</tr>";
                    }
                    parametros = "";
                    linhas = linhas + tabela;
                    imgNum = imgNum + 1;
                });
                div.innerHTML = "<br/><br/><br/><div class='row'><h4 class='example-title'>Detalhamento - " + login + " - " + replaceAll(nome, "_", " ") + "</h4>" +
                    "<table class='table-internal' style='margin-top:15px;' width='50%'>" +
                                "<thead><tr class='tr-head'><th>#</th><th>Tabulação</th><th>Quantidade</th><th>Percentual</th></tr>" +
                                "</thead>" + linhas + "<tbody></tbody></table></div><br/>" +
                                "<center><div class='row'>" +
                    "<div class='col-sm-12'>" +
                    
                    "<div class='col-sm-12'>" +
                    "<div class='row'>" +
                    "<div class='col-sm-12'>" +
                    
                    "<div id='ChartTabulacao' style='height:350px;width:100%;'>" +
                    "</div></div></div></div>" +
                    "<div class='col-sm-4'>" +
                    
                    "<h4 class='example-title'>Conversão Cliente / Atendidas</h4>" +
                    "<div id='gaudgeConversao1' style='height:325px;width:100%;'>" +
                    "</div></div>" +
                    "<div class='col-sm-4'>" +
                    
                    "<h4 class='example-title'>Conversão Cliente / Produtivas</h4>" +
                    "<div id='gaudgeConversao2' style='height:325px;width:100%;'></div>" +
                    "</div><div class='col-sm-4'>" +
                    "<h4 class='example-title'>Conversão Cliente / Aptas</h4>" +
                    "<div id='gaudgeConversao3' style='height:325px;width:100%;'></div></div></div></div></div><br/><br/><br/></center>";


                $.ajax({
                    url: $("#DashBoardTabulacaoOperadorUrl").val(),
                    data: pdata,
                    type: 'POST',
                    success: function (result) {
                        DashBoardTabulacoes(result);
                    }
                });

                $.ajax({
                    url: $("#DashBoardConversaoTotalOperadorUrl").val(),
                    data: pdata,
                    type: 'POST',
                    success: function (result) {
                        DashBoardConversao1(result);
                    }
                });

                $.ajax({
                    url: $("#DashBoardConversaoProdutivasOperadorUrl").val(),
                    data: pdata,
                    type: 'POST',
                    success: function (result) {
                        DashBoardConversao2(result);
                    }
                });

                $.ajax({
                    url: $("#DashBoardConversaoAptasOperadorUrl").val(),
                    data: pdata,
                    type: 'POST',
                    success: function (result) {
                        DashBoardConversao3(result);
                    }
                });



            } else {
                div.innerHTML = "";
            }
        });
        

    }
    $(".error").slideUp(300);
    $(".wait").slideUp(300);
}

function DetalharPorOperacao(pTabulacao,pImagem)
{
    $(".error").slideUp(300);
    $(".wait").slideDown(300);

    var tabela = "";
    var linhas = "";

    if (abertaAtualOperacao != "" && abertaAtualOperacao != pImagem) {
        document.getElementById("i"+abertaAtualOperacao).innerHTML = "";
        document.getElementById("imgoperacao" + abertaAtualOperacao).src = "../Images/SetaDireita.png";
    }
    abertaAtualOperacao = pImagem;
    var divop = document.getElementById("i"+pImagem);
    if (divop.innerHTML != "") {
        divop.innerHTML = "";
        document.getElementById("imgoperacao" + abertaAtualOperacao).src = "../Images/SetaDireita.png";
    } else {
        pdata["Tabulacao"] = replaceAll(pTabulacao, "_", " ");   
        $.getJSON($("#DetalhadoDashBoardOperadorPorOperacaoUrl").val(), pdata, function (data) {
            if (data.Result.length > 0) {
                document.getElementById("imgoperacao" + abertaAtualOperacao).src = "../Images/SetaBaixo.png";
                $.each(data.Result, function (index, dados) {
                    if (dados.Tabulacao != null)
                    {
                        var arr = dados.Tabulacao.split("&nbsp;&nbsp;");
                        tabela = "<tr bgColor='" + dados.CorLinha + "'><td>"
                        + "</td><td>" + arr[0]
                        + "</td><td>" + arr[1]
                        + "</td><td>" + arr[2] + "</td>";
                    }                       
                    else
                    {
                        var arr = null;
                        tabela = "<tr bgColor='#FFFFFF'><td colspan='3'>sem registros</td>";
                        linhas = "";
                    }
                    
                    linhas = linhas + tabela;
                });
                
                divop.innerHTML = "<br/><div class='row'>" +
                    "<table class='table-internal' style='margin-top:15px;font-size:12px;' width='50%'>" +
                                "<thead><tr class='tr-head'><th>#</th><th>Documento</th><th>Nome</th><th>Data/Hora</th></tr>" +
                                "</thead>" + linhas + "<tbody></tbody></table>";

            } else {
                divop.innerHTML = "";
            }
        });
    }

    $(".error").slideUp(300);
    $(".wait").slideUp(300);
}


function atualizaSemSlide() {
    CarregaDetalhamento();
    CarregaGraficoGeral();
}


function atualizar() {

    $(".error").slideUp(300);
    $(".wait").slideDown(300);


    CarregaDetalhamento();
    CarregaGraficoGeral();

    $(".error").slideUp(300);
    $(".wait").slideUp(300);

}


function DashBoardConversao1(json) {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {


        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Text');
        data.addColumn('number', 'Value');

        var pjson = JSON.parse(json);
        $(pjson).each(function () {
            data.addRows([[$(this).attr("Texto"), $(this).attr("Quantidade")]]);
        });

        var options = {
            title: ''
        };

        var chart = new google.visualization.PieChart(document.getElementById('gaudgeConversao1'));

        chart.draw(data, options);
    }
}

function DashBoardConversao2(json) {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {


        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Text');
        data.addColumn('number', 'Value');

        var pjson = JSON.parse(json);
        $(pjson).each(function () {
            data.addRows([[$(this).attr("Texto"), $(this).attr("Quantidade")]]);
        });

        var options = {
            title: ''
        };

        var chart = new google.visualization.PieChart(document.getElementById('gaudgeConversao2'));

        chart.draw(data, options);
    }
}

function DashBoardConversao3(json) {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {


        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Text');
        data.addColumn('number', 'Value');

        var pjson = JSON.parse(json);
        $(pjson).each(function () {
            data.addRows([[$(this).attr("Texto"), $(this).attr("Quantidade")]]);
        });

        var options = {
            title: ''
        };

        var chart = new google.visualization.PieChart(document.getElementById('gaudgeConversao3'));

        chart.draw(data, options);
    }
}


function DashBoardTabulacoes(json) {

    google.charts.setOnLoadCallback(drawMaterial);

    function drawMaterial() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Tabulacao');
        data.addColumn('number', 'Quantidade');
        data.addColumn({ type: 'string', role: 'style' });


        var pjson = JSON.parse(json);
        $(pjson).each(function () {
            data.addRows([[$(this).attr("Tabulacao"), $(this).attr("Quantidade"), 'color: #00cc00']]);
        });


        var options = {
            bars: 'horizontal',
            legend: { position: "none" },
        };

        var material = new google.charts.Bar(document.getElementById('ChartTabulacao'));
        material.draw(data, options);
    }
}

function DashBoardTabulacoesGeral(json) {

    google.charts.setOnLoadCallback(drawMaterial);

    function drawMaterial() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Operadores');
        data.addColumn('number', 'Chamadas');
        data.addColumn({ type: 'string', role: 'style' });

        
        var chamadas = 40;
        var dif = dateDiferencaEmDias();
        if (!dif == 0) {
            chamadas = chamadas * dif;
        }

        

        var pjson = JSON.parse(json);
        $(pjson).each(function () {
            var cor = 'color: #0000FF';
            if (chamadas > $(this).attr("Quantidade")) {
                cor = 'color: #FFE4E1';
            }

            data.addRows([[$(this).attr("Tabulacao"), $(this).attr("Quantidade"), cor]]);
        });


        var options = {
            //bars: 'horizontal',
            title: "",
            width: '100%',
            height: '100%',
            axisTitlesPosition: 'out',
            'isStacked': true,
            pieSliceText: 'percentage',
            chartArea: {
                left: "10%",
                top: "0%",
                height: "80%",
                width: "100%"
            },
            vAxis: {
                textStyle: { fontName: 'Arial', fontSize: 10, bold: false }
            },
            hAxis: {
                textStyle: { fontName: 'Arial', fontSize: 10, bold: false },
                title: "Total Chamadas",
                gridlines: { count: 5 }
            }
            
 
    };

        var material = new google.visualization.BarChart(document.getElementById('ChartTabulacaoGeral'));
        material.draw(data, options);
    }
}
