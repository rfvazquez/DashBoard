using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IndigoSoft.Reports.DataBase;
using IndigoSoft.Reports.DataBase.DataAccess;
using Newtonsoft.Json;
using System.Text;
using System.Web.UI.WebControls;
using System.Web.UI;

namespace IndigoSoft.Reports.Controllers
{
    public class RelatorioController : Controller
    {
        private DataInterface dataInterface = new DataInterface();

        protected override JsonResult Json(object data, string contentType,
           Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new JsonResult()
            {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior,
                MaxJsonLength = Int32.MaxValue
            };
        }  

        public RelatorioController()
        {
        }

        #region relatorio cobertura
        public ActionResult Cobertura()
        {
            return base.View();
        }

        //[HttpPost]
        //public string BarrasCobertura(DateTime DtIncio, DateTime DtFim)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.BarrasCobertura(DtIncio, DtFim));
        //}

        //[HttpPost]
        //public string BarrasNormativoAbertura(DateTime DtIncio, DateTime DtFim)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.BarrasNormativoAbertura(DtIncio, DtFim));
        //}

        //[HttpPost]
        //public string BarrasNormativoVenda(DateTime DtIncio, DateTime DtFim)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.BarrasNormativoVenda(DtIncio, DtFim));
        //}

        //public JsonResult DetalhamentoCobertura(DateTime DtIncio, DateTime DtFim)
        //{
        //    List<DetalhamentoCobertura> detalhamentoCoberturas = this.dataInterface.DetalhamentoCobertura(DtIncio, DtFim);
        //    return base.Json(new { Result = detalhamentoCoberturas }, 0);
        //}

        //public JsonResult DetalhamentoNormativo(DateTime DtIncio, DateTime DtFim)
        //{
        //    List<DetalhamentoNormativo> detalhamentoNormativos = this.dataInterface.DetalhamentoNormativo(DtIncio, DtFim);
        //    return base.Json(new { Result = detalhamentoNormativos }, 0);
        //}

        #endregion 

        //#region Relatorio Normativo
        //public ActionResult Normativo()
        //{
        //    return base.View();
        //}

        //[HttpPost]
        //public string PizzaCoberturaNaoAbertas(DateTime DtIncio, DateTime DtFim)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.PizzaCoberturaNaoAbertas(DtIncio, DtFim));
        //}

        //[HttpPost]
        //public string PizzaCoberturaRecusa(DateTime DtIncio, DateTime DtFim)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.PizzaCoberturaRecusas(DtIncio, DtFim));
        //}

        //[HttpPost]
        //public string PizzaCoberturaSemFacilidade(DateTime DtIncio, DateTime DtFim)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.PizzaCoberturaSemFacilidade(DtIncio, DtFim));
        //}

        //[HttpPost]
        //public string PizzaNormativoAbertura(DateTime DtIncio, DateTime DtFim)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.PizzaNormativoAbertura(DtIncio, DtFim));
        //}

        //[HttpPost]
        //public string PizzaNormativoVenda(DateTime DtIncio, DateTime DtFim)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.PizzaNormativoVenda(DtIncio, DtFim));
        //}

        //[HttpPost]
        //public string PizzaNormativoVendaAbertura(DateTime DtIncio, DateTime DtFim)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.PizzaNormativoVendaAbertrura(DtIncio, DtFim));
        //}
        //#endregion 

        //#region Relatorio Operador
        //public ActionResult DashBoardOperador()
        //{
        //    return base.View();
        //}

        //public JsonResult ResumoDashBoardOperador(DateTime DtIncio, DateTime DtFim, string Matricula)
        //{
        //    List<DashBoardOperador> dashOperador = this.dataInterface.DashBoardOperador(DtIncio, DtFim, Matricula);
        //    return base.Json(new { Result = dashOperador }, 0);
        //}

        //public JsonResult DetalhadoDashBoardOperador(DateTime DtIncio, DateTime DtFim, string Matricula)
        //{
        //    List<DashBoardDetalhamentoResult> dashDetOperador = this.dataInterface.DashBoardDetalhamentoOperador(DtIncio, DtFim, Matricula);
        //    return base.Json(new { Result = dashDetOperador }, 0);
        //}

        //public JsonResult DetalhadoDashBoardOperadorPorOperacao(DateTime DtIncio, DateTime DtFim, string Matricula, string Tabulacao)
        //{
        //    List<DashBoardDetalhamentoResult> dashDetOperadorPorOperacao = this.dataInterface.DashBoardDetalhamentoOperadorPorOperacao(DtIncio, DtFim, Matricula, Tabulacao);
        //    return base.Json(new { Result = dashDetOperadorPorOperacao }, 0);
        //}

        //[HttpPost]
        //public string DashBoardConversaoAptasOperador(DateTime DtIncio, DateTime DtFim, string Matricula)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.DashBoardConversaoAptasOperador(DtIncio, DtFim, Matricula));
        //}

        //[HttpPost]
        //public string DashBoardConversaoProdutivasOperador(DateTime DtIncio, DateTime DtFim, string Matricula)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.DashBoardConversaoProdutivasOperador(DtIncio, DtFim, Matricula));
        //}

        //[HttpPost]
        //public string DashBoardConversaoTotalOperador(DateTime DtIncio, DateTime DtFim, string Matricula)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.DashBoardConversaoTotalOperador(DtIncio, DtFim, Matricula));
        //}

        //[HttpPost]
        //public string DashBoardTabulacaoOperador(DateTime DtIncio, DateTime DtFim, string Matricula)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.DashBoardTabulacaoOperador(DtIncio, DtFim, Matricula));
        //}

        //[HttpPost]
        //public string DashBoardTabulacaoOperadorTotal(DateTime DtIncio, DateTime DtFim, string Matricula)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.DashBoardTabulacaoOperadorTotal(DtIncio, DtFim, Matricula));
        //}
        //#endregion

        //#region relatorio Movel


        //public ActionResult TransferenciaMovel()
        //{
        //    return base.View();
        //}

        //[HttpPost]
        //public string DashBoardConversaoAptasMovel(DateTime DtIncio, DateTime DtFim)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.DashBoardConversaoAptasMovel(DtIncio, DtFim));
        //}

        //[HttpPost]
        //public string DashBoardConversaoProdutivasMovel(DateTime DtIncio, DateTime DtFim)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.DashBoardConversaoProdutivasMovel(DtIncio, DtFim));
        //}

        //[HttpPost]
        //public string DashBoardConversaoTotalMovel(DateTime DtIncio, DateTime DtFim)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.DashBoardConversaoTotalMovel(DtIncio, DtFim));
        //}

        //public JsonResult DashBoardDetalhamentoMovel(DateTime DtIncio, DateTime DtFim)
        //{
        //    List<DashBoardDetalhamentoResult> dashBoardDetalhamentoResults = this.dataInterface.DashBoardDetalhamentoTabulacaoMovel(DtIncio, DtFim);
        //    return base.Json(new { Result = dashBoardDetalhamentoResults }, 0);
        //}

        //[HttpPost]
        //public string DashBoardTabulacoesMovel(DateTime DtIncio, DateTime DtFim)
        //{
        //    return JsonConvert.SerializeObject(this.dataInterface.DashBoardTabulacaoMovel(DtIncio, DtFim));
        //}


        //#endregion 

        //#region Vendas Pendentes
        //public ActionResult VendasPendentes()
        //{
        //    return base.View();
        //}

        //public JsonResult DetalhamentoVendasPendetes(string supervisor)
        //{
        //    List<VendasPendentesResult> vendasPendetes = this.dataInterface.ListaVendasPendentes(supervisor);
        //    return base.Json(new { Result = vendasPendetes }, 0);
        //}

        //#endregion 

        //#region Relatorio Detalhamento Tabulacao

        //public ActionResult DetalhamentoTabulacao()
        //{
        //    return base.View();
        //}

        //public JsonResult DetalhamentoTabulacaoGrid(DateTime DtIncio, DateTime DtFim, string Matricula)
        //{
        //    List<TabulacaoDetalhada> DetalhamentoOperador = this.dataInterface.TabulacaoDetalhada(DtIncio, DtFim, 0);
        //    return base.Json(new { Result = DetalhamentoOperador }, 0);
        //}
        //#endregion

        //#region TabulacaoPadrao
        //public ActionResult TabulacaoPadrao()
        //{
        //    return base.View();
        //}

        //public JsonResult TabulacaoPadraoGrid(DateTime DT_INICIO, DateTime DT_FIM)
        //{
        //    List<TabulacaoPadraoResult> TabulacaoPadrao = this.dataInterface.TabulacaoPadrao(DT_INICIO, DT_FIM);
        //    return base.Json(new { Result = TabulacaoPadrao }, 0);

        //}
        //[HttpPost]
        //public ActionResult TabulacaoPadraoExport(DateTime DT_INICIO, DateTime DT_FIM)
        //{

        //    DT_FIM = DT_FIM.AddHours(23).AddMinutes(59).AddSeconds(59);
        //    List<TabulacaoPadraoResult> data = null;

        //    GridView gv = new GridView();
        //    data = this.dataInterface.TabulacaoPadrao(DT_INICIO, DT_FIM); ;

        //    gv.DataSource = data;
        //    gv.AutoGenerateColumns = true;
        //    gv.DataBind();

        //    HttpContext curContext = System.Web.HttpContext.Current;
        //    curContext.Response.Clear();
        //    curContext.Response.AddHeader("content-disposition", "attachment;filename=" + "Relatório-" + DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss") + ".xls");
        //    curContext.Response.Charset = "";
        //    curContext.Response.Cache.SetCacheability(HttpCacheability.NoCache);
        //    curContext.Response.ContentType = "application/vnd.ms-excel";

        //    Convert the rendering of the gridview to a string representation
        //    StringWriter sw = new StringWriter();
        //    HtmlTextWriter htw = new HtmlTextWriter(sw);
        //    gv.RenderControl(htw);

        //    Write the stream back to the response
        //    curContext.Response.Write(sw.ToString());
        //    curContext.Response.End();
        //    return View("~/Views/Relatorio/TabulacaoPadrao.cshtml", data);

        //}


        //#endregion
    }
}