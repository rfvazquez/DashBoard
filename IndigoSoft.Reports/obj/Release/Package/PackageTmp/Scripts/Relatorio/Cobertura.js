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
    $.getJSON($("#DetalhamentoCobertura").val(), pdata, function (data) {
        if (data.Result.length > 0) {
            $.each(data.Result, function (index, dados) {
                tabela = "<tr bgColor='" + dados.CorLinha + "'><td>"
                    + "</td><td>" + dados.Codigo
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
        url: $("#BarrasCobertura").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            BarrasCobertura(result);
        }
    });

    $.ajax({
        url: $("#PizzaCoberturaFacilidade").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            PizzaCoberturaFacilidade(result);
        }
    });

    $.ajax({
        url: $("#PizzaCoberturaRecusa").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            PizzaCoberturaRecusa(result);
        }
    });

    $.ajax({
        url: $("#PizzaCoberturaNaoAbertas").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            PizzaCoberturaNaoAbertas(result);
        }
    });
    CarregaDetalhamento();
}


function atualizar() {

    $(".error").slideUp(300);
    $(".wait").slideDown(300);

    $.ajax({
        url: $("#BarrasCobertura").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            BarrasCobertura(result);
        }
    });

    $.ajax({
        url: $("#PizzaCoberturaFacilidade").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            PizzaCoberturaFacilidade(result);
        }
    });

    $.ajax({
        url: $("#PizzaCoberturaRecusa").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            PizzaCoberturaRecusa(result);
        }
    });

    $.ajax({
        url: $("#PizzaCoberturaNaoAbertas").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            PizzaCoberturaNaoAbertas(result);
        }
    });

    CarregaDetalhamento();

    $(".error").slideUp(300);
    $(".wait").slideUp(300);

}


function PizzaCoberturaFacilidade(json) {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {


        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Text');
        data.addColumn('number', 'Value');

        var pjson = JSON.parse(json);
        $(pjson).each(function () {
            data.addRows([[$(this).attr("Descricao"), $(this).attr("Quantidade")]]);
        });

        var options = {
            title: ''
        };

        var chart = new google.visualization.PieChart(document.getElementById('chartPizzaCoberturaSemFacilidade'));

        chart.draw(data, options);
    }
}

function PizzaCoberturaRecusa(json) {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {


        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Text');
        data.addColumn('number', 'Value');

        var pjson = JSON.parse(json);
        $(pjson).each(function () {
            data.addRows([[$(this).attr("Descricao"), $(this).attr("Quantidade")]]);
        });

        var options = {
            title: ''
        };

        var chart = new google.visualization.PieChart(document.getElementById('chartPizzaCoberturaRecusa'));

        chart.draw(data, options);
    }
}

function PizzaCoberturaNaoAbertas(json) {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {


        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Text');
        data.addColumn('number', 'Value');

        var pjson = JSON.parse(json);
        $(pjson).each(function () {
            data.addRows([[$(this).attr("Descricao"), $(this).attr("Quantidade")]]);
        });

        var options = {
            title: ''
        };

        var chart = new google.visualization.PieChart(document.getElementById('chartPizzaCoberturaNaoAbertas'));

        chart.draw(data, options);
    }
}

function BarrasCobertura(json) {

    google.charts.setOnLoadCallback(drawMaterial);

    function drawMaterial() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Total', { role: "style" });
        data.addColumn('number', 'Quantidade', { role: "style" });

        var pjson = JSON.parse(json);
        $(pjson).each(function () {
            data.addRows([[$(this).attr("Descricao"), $(this).attr("Quantidade")]]);
        });


        var options = {
            bars: 'horizontal',
            legend: { position: "none" },
        };
        var material = new google.charts.Bar(document.getElementById('ChartBarraCobertura'));
        material.draw(data, options);
    }
}

function BarrasNormativoAbertura(json) {

    google.charts.setOnLoadCallback(drawMaterial);

    function drawMaterial() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Normativo de Abertura', { role: "style" });
        data.addColumn('number', 'Quantidade', { role: "style" });

        var pjson = JSON.parse(json);
        $(pjson).each(function () {
            data.addRows([[$(this).attr("Descricao"), $(this).attr("Quantidade")]]);
        });


        var options = {
            bars: 'horizontal',
            legend: { position: "none" },
        };
        var material = new google.charts.Bar(document.getElementById('ChartBarraNormativoAbertura'));
        material.draw(data, options);
    }
}
