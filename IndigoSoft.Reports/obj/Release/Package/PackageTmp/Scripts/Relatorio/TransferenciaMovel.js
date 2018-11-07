var pdata = {};
var myVar;
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


function CarregaDetalhamento() {
    var tabela = "";
    var linhas = "";
    $.getJSON($("#DashBoardDetalhamentoTabulacoesUrl").val(), pdata, function (data) {
        if (data.Result.length > 0) {
            $.each(data.Result, function (index, dados) {
                tabela = "<tr bgColor='" + dados.CorLinha + "'><td>"
                    + "</td><td>" + dados.Tabulacao
                    + "</td><td>" + dados.Quantidade
                    + "</td><td>" + dados.Percentual;
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
    $.ajax({
        url: $("#DashBoardTabulacoesUrl").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            DashBoardTabulacoes(result);
        }
    });

    $.ajax({
        url: $("#DashBoardConversaoTotalUrl").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            DashBoardConversao1(result);
        }
    });

    $.ajax({
        url: $("#DashBoardConversaoProdutivasUrl").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            DashBoardConversao2(result);
        }
    });

    $.ajax({
        url: $("#DashBoardConversaoAptasUrl").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            DashBoardConversao3(result);
        }
    });

    CarregaDetalhamento();
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
        }
    });

    $.ajax({
        url: $("#DashBoardConversaoTotalUrl").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            DashBoardConversao1(result);
        }
    });

    $.ajax({
        url: $("#DashBoardConversaoProdutivasUrl").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            DashBoardConversao2(result);
        }
    });

    $.ajax({
        url: $("#DashBoardConversaoAptasUrl").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            DashBoardConversao3(result);
        }
    });

    CarregaDetalhamento();

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
        data.addColumn({ type: 'string', role: 'annotation' });


        var pjson = JSON.parse(json);
        $(pjson).each(function () {
            data.addRows([[$(this).attr("Tabulacao"), $(this).attr("Quantidade"), $(this).attr("Quantidade").toString()]]);
        });


        var options = {
            bars: 'horizontal',
            legend: { position: "none" },
        };

        var material = new google.charts.Bar(document.getElementById('ChartTabulacao'));
        material.draw(data, options);
    }
}
