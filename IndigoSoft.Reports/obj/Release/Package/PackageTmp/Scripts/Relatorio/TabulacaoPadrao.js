var pdata = {};
var myVar;
var abertaAtual = "";
function atualizaFiltros() {

    if ($("#DT_INICIO").val() === "") {
        pdata["DT_FIM"] = '01/01/1900';
        pdata["DT_INICIO"] = '01/01/1900';
    } else {
        if ($("#DT_FIM").val() === "") {
            pdata["DT_FIM"] = '01/01/1900';
            pdata["DT_INICIO"] = '01/01/1900';
            $(".error").slideDown(300);
            $(".error").html("Obrigatória entrada de Data Inicio e Final do Processo");
            return false;
        } else {
            pdata["DT_INICIO"] = $("#DT_INICIO").val() + " 00:00:00";
            pdata["DT_FIM"] = $("#DT_FIM").val() + " 23:59:59";
        }
    }

    if (new Date(pdata["DT_FIM"]) < new Date(pdata["DT_INICIO"])) {
        $(".error").html("Data inicio deve sem maior ou igual a Data fim");
        $(".error").slideDown(300);
        $(".wait").slideUp(300);
        pdata["DT_FIM"] = '01/01/1900';
        pdata["DT_INICIO"] = '01/01/1900';
        return false;
    }
    //pdata["Matricula"] = '';
    atualizar();
    return false;
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
    //var tab_text = "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><table border='2px'><tr bgcolor='#87AFC6'>";
    //var textRange; var j = 0;
    //tab = document.getElementById('tblDescricaoItens'); // id of table

    //for (j = 0 ; j < tab.rows.length ; j++) {
    //    if (tab.rows[j].innerHTML.indexOf("Total") == -1) {
    //        tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
    //    }
    //    //tab_text=tab_text+"</tr>";
    //}

    //tab_text = tab_text + "</table>";
    //tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    //tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    //tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    //var ua = window.navigator.userAgent;
    //var msie = ua.indexOf("MSIE ");

    //if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    //{
    //    txtArea1.document.open("txt/html", "replace");
    //    txtArea1.document.write(tab_text);
    //    txtArea1.document.close();
    //    txtArea1.focus();
    //    sa = txtArea1.document.execCommand("SaveAs", true, "Arquivo.xls");
    //}
    //else                 //other browser not tested on IE 11
    //    sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

    //return (sa);


    $.ajax({
        url: $("#TabulacaoPadraoExportURL").val(),
        data: pdata,
        type: 'POST',
        success: function (result) {
            return result;
        }
    });

}



function CarregaDetalhamento() {
    var tabela = "";
    var linhas = "";
    $.getJSON($("#TabulacaoPadraoURL").val(), pdata, function (data) {
        if (data.Result.length > 0) {
            $.each(data.Result, function (index, dados) {
                tabela = "<tr bgColor='#FFFFFF'>"
                    + "<td>" + dados.CANALVENDAS
                    + "</td><td>" + dados.DATARECEBIMENTOMAILING
                    + "</td><td>" + dados.FORNECEDOR
                    + "</td><td>" + dados.MAILING
                    + "</td><td>" + dados.SEGMENTOOPERACAO
                    + "</td><td>" + dados.TIPOOPERACAO
                    + "</td><td>" + dados.TIPOCLIENTE
                    + "</td><td>" + dados.ID
                    + "</td><td>" + dados.DATAHORAATENDIMENTO
                    + "</td><td>" + dados.DDDTERMINALA
                    + "</td><td>" + dados.DURACAOCONTATO
                    + "</td><td>" + dados.INTENCAOCOMPRA
                    + "</td><td>" + dados.NUMPROTUNICO
                    + "</td><td>" + dados.TELEFONETERMINALA
                    + "</td><td>" + dados.CALLBACK
                    + "</td><td>" + dados.DDDTERMINALCALLBACK
                    + "</td><td>" + dados.IDATENDIMENTOINICIAL
                    + "</td><td>" + dados.TELEFONETERMINALCALLBACK
                    + "</td><td>" + dados.BAIRRO
                    + "</td><td>" + dados.CEP
                    + "</td><td>" + dados.CIDADE
                    + "</td><td>" + dados.COMPLEMENTO
                    + "</td><td>" + dados.CPFCLIENTESOLICITANTE
                    + "</td><td>" + dados.CPFTITULAR
                    + "</td><td>" + dados.DATANASCIMENTOCLIENTESOLICITANTE
                    + "</td><td>" + dados.DATANASCIMENTOTITULAR
                    + "</td><td>" + dados.DDDCONTATO1
                    + "</td><td>" + dados.DDDCONTATO2
                    + "</td><td>" + dados.DDDTERMINALFIXA
                    + "</td><td>" + dados.DDDTERMINAL
                    + "</td><td>" + dados.EMAIL
                    + "</td><td>" + dados.LOGRADOURO
                    + "</td><td>" + dados.NOMECLIENTESOLICITANTE
                    + "</td><td>" + dados.NOMEMAESOLICITANTE
                    + "</td><td>" + dados.NOMEMAETITULAR
                    + "</td><td>" + dados.NOMETITULAR
                    + "</td><td>" + dados.NUMEROLOGRADOURO
                    + "</td><td>" + dados.REGIONAL
                    + "</td><td>" + dados.TELEFONECONTATO1
                    + "</td><td>" + dados.TELEFONECONTATO2
                    + "</td><td>" + dados.TELEFONETERMINALFIXA
                    + "</td><td>" + dados.TELEFONETERMINAL
                    + "</td><td>" + dados.TIPOLOG
                    + "</td><td>" + dados.UF
                    + "</td><td>" + dados.MATRICULASAPOPERADOR
                    + "</td><td>" + dados.NOMEOPERADOR
                    + "</td><td>" + dados.NOMESUPERVISOROPERACAO
                    + "</td><td>" + dados.REOPERADOR
                    + "</td><td>" + dados.MOTIVOSCOREVERMELHO
                    + "</td><td>" + dados.SCOREV360
                    + "</td><td>" + dados.SCOREVSCORE
                    + "</td><td>" + dados.PRODUTOADQUIRIDO1
                    + "</td><td>" + dados.PRODUTOADQUIRIDO2
                    + "</td><td>" + dados.PRODUTOADQUIRIDO3
                    + "</td><td>" + dados.PRODUTOADQUIRIDO4
                    + "</td><td>" + dados.PRODUTOATUAL1
                    + "</td><td>" + dados.PRODUTOATUAL2
                    + "</td><td>" + dados.PRODUTOATUAL3
                    + "</td><td>" + dados.PRODUTOATUAL4
                    + "</td><td>" + dados.PRODUTOOFERTADO1
                    + "</td><td>" + dados.PRODUTOOFERTADO2
                    + "</td><td>" + dados.PRODUTOOFERTADO3
                    + "</td><td>" + dados.PRODUTOOFERTADO4
                    + "</td><td>" + dados.ADABASEMISSAO
                    + "</td><td>" + dados.DATAHORACONCORDANCIA
                    + "</td><td>" + dados.DTEMISSAO1
                    + "</td><td>" + dados.DTEMISSAO2
                    + "</td><td>" + dados.DTEMISSAO3
                    + "</td><td>" + dados.DTEMISSAO4
                    + "</td><td>" + dados.NUMEROOS1
                    + "</td><td>" + dados.NUMEROOS2
                    + "</td><td>" + dados.NUMEROOS3
                    + "</td><td>" + dados.NUMEROOS4
                    + "</td><td>" + dados.SITE
                    + "</td><td>" + dados.STATUSEMISSAO
                    + "</td><td>" + dados.TIPOPAGTO
                    + "</td><td>" + dados.TROCATITULARIDADE
                    + "</td><td>" + dados.MOTIVOFINALIZADOR
                    + "</td><td>" + dados.RETORNOSIEBEL
                    + "</td><td>" + dados.CONTAONLINE
                    + "</td><td>" + dados.NOMEBANCO
                    + "</td><td>" + dados.AGENCIA
                    + "</td><td>" + dados.CONTA
                    + "</td><td>" + dados.DIGITO
                    + "</td><td>" + dados.DATAVENCIMENTO
                    + "</td><td>" + dados.ACERTIVIDADE
                    + "</td><td>" + dados.SVA1
                    + "</td><td>" + dados.SVA2
                    + "</td><td>" + dados.SVA3
                    + "</td><td>" + dados.SVA4
                    + "</td><td>" + dados.DISPONIBILIDADEDEFIBRA
                    + "</td><td>" + dados.OFERTAFIBRA
                    + "</td><td>" + dados.TRANSFERENCIASAVE
                    + "</td><td>" + dados.APTOADSL
                    + "</td><td>" + dados.TRANSFERENCIAADSL


                                        + "</td><td>" + dados.PACOTEOUTRACHANCE
                    + "</td><td>" + dados.MOTIVOFINALIZADOROUTRACHANCE
                    + "</td><td>" + dados.IDINBOUNDPARAOUTRACHANCE
                    + "</td><td>" + dados.SOLO
                    + "</td><td>" + dados.TRANSFERENCIAFORAESCOPO
                    + "</td><td>" + dados.PERFILCLIENTE

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

