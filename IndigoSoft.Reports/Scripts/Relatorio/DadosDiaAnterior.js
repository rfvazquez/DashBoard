var pdata = {};
var myVar;
var abertaAtual = "";
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
        sa = txtArea1.document.execCommand("SaveAs", true, "DadosDiaAnterior.xls");
    }
    else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

    return (sa);
}



function CarregaDetalhamento() {
    var tabela = "";
    var linhas = "";
    $.getJSON($("#PesquisaDadosBaseCompletaURL").val(), pdata, function (data) {

        if (data.Result.length > 0) {
            $.each(data.Result, function (index, dados) {
                tabela = "<tr>"
                    + "<td>" + dados.int_Id
                    + "</td><td>" + dados.int_Tabulacao
                    + "</td><td>" + dados.int_Normativo
                    + "</td><td>" + dados.int_CodigoNormativo
                    + "</td><td>" + dados.int_NormativoSiebel
                    + "</td><td>" + dados.int_TipoLigacao
                    + "</td><td>" + dados.int_ClienteBase
                    + "</td><td>" + dados.int_PreCadastro
                    + "</td><td>" + dados.int_AtualizacaoReceita
                    + "</td><td>" + dados.int_CPF
                    + "</td><td>" + dados.int_NomeCompleto
                    + "</td><td>" + dados.int_NomeMae
                    + "</td><td>" + dados.int_DataNascimento
                    + "</td><td>" + dados.int_TelefoneResidencial
                    + "</td><td>" + dados.int_TelefoneCelular
                    + "</td><td>" + dados.int_TelefoneComercial
                    + "</td><td>" + dados.int_Email
                    + "</td><td>" + dados.int_DesejaSMS
                    + "</td><td>" + dados.int_CEP
                    + "</td><td>" + dados.int_Logradouro
                    + "</td><td>" + dados.int_Estado
                    + "</td><td>" + dados.int_Cidade
                    + "</td><td>" + dados.int_Bairro
                    + "</td><td>" + dados.int_Intervalo
                    + "</td><td>" + dados.int_Numero
                    + "</td><td>" + dados.int_TipoComplemento1
                    + "</td><td>" + dados.int_Complemento1
                    + "</td><td>" + dados.int_TipoComplemento2
                    + "</td><td>" + dados.int_Complemento2
                    + "</td><td>" + dados.int_TipoComplemento3
                    + "</td><td>" + dados.int_Complemento3
                    + "</td><td>" + dados.int_Transversal1
                    + "</td><td>" + dados.int_Transversal2
                    + "</td><td>" + dados.int_CEPCobranca
                    + "</td><td>" + dados.int_LogradouroCobranca
                    + "</td><td>" + dados.int_EstadoCobranca
                    + "</td><td>" + dados.int_CidadeCobranca
                    + "</td><td>" + dados.int_BairroCobranca
                    + "</td><td>" + dados.int_NumeroCobranca
                    + "</td><td>" + dados.int_TipoComplemento1Cobranca
                    + "</td><td>" + dados.int_Complemento1Cobranca
                    + "</td><td>" + dados.int_TipoComplemento2Cobranca
                    + "</td><td>" + dados.int_Complemento2Cobranca
                    + "</td><td>" + dados.int_TipoComplemento3Cobranca
                    + "</td><td>" + dados.int_Complemento3Cobranca
                    + "</td><td>" + dados.int_LiberacaoOpp
                    + "</td><td>" + dados.int_DadosDaPlaca
                    + "</td><td>" + dados.int_DadosDaCobertura
                    + "</td><td>" + dados.int_TelevisaoDisponivel
                    + "</td><td>" + dados.int_TelefoneDisponivel
                    + "</td><td>" + dados.int_InternetDisponivel
                    + "</td><td>" + dados.int_TelevisaoAdiquirida
                    + "</td><td>" + dados.int_TelefoneAdiquirida
                    + "</td><td>" + dados.int_InternetAdiquirida
                    + "</td><td>" + dados.int_AdicionaisAduidida
                    + "</td><td>" + dados.int_ErroDescricao
                    + "</td><td>" + dados.int_DisponibilidadeData
                    + "</td><td>" + dados.int_DataAgendamento
                    + "</td><td>" + dados.int_LoginUsuario
                    + "</td><td>" + dados.int_TMAResumo
                    + "</td><td>" + dados.int_TMAHumano
                    + "</td><td>" + dados.int_TMARobo
                    + "</td><td>" + dados.int_TMAGeral
                    + "</td><td>" + dados.int_DataHora
                    + "</td><td>" + dados.int_StatusPlaca
                    + "</td><td>" + dados.int_Armario
                    + "</td><td>" + dados.int_ClasseDoArmario
                    + "</td><td>" + dados.int_CtrOutraChance
                    + "</td><td>" + dados.int_PontuacaoTelefone
                    + "</td><td>" + dados.int_PontuacaoInternet
                    + "</td><td>" + dados.int_PontuacaoTV
                    + "</td><td>" + dados.int_PontuacaoTotal
                    + "</td><td>" + dados.int_QtdeProdutosDisponiveis
                    + "</td><td>" + dados.int_GrauMaxInternet
                    + "</td><td>" + dados.int_GrauMaxTV
                    + "</td><td>" + dados.int_IntencaoInternet
                    + "</td><td>" + dados.int_IntencaoTelefone
                    + "</td><td>" + dados.int_IntencaoTV
                    + "</td><td>" + dados.int_AceiteOfertaMovel
                    + "</td><td>" + dados.int_RecusaTelevisao
                    + "</td><td>" + dados.int_RecusaCelular
                    + "</td><td>" + dados.int_RecusaInternet
                    + "</td><td>" + dados.int_RecusaTelefone
                    + "</td><td>" + dados.int_Sexo
                    + "</td><td>" + dados.int_TransferenciaMovel
                    + "</td><td>" + dados.int_TabelaPreco
                    + "</td><td>" + dados.int_GrupoPreco
                    + "</td><td>" + dados.int_CategoriaOferta
                    + "</td><td>" + dados.int_Ofertas
                    + "</td><td>" + dados.int_GrupoPromocao
                    + "</td><td>" + dados.int_Promocao
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


