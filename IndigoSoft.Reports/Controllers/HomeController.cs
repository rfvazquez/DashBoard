using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using IndigoSoft.Reports.DataBase.DataAccess;
using Newtonsoft.Json;

namespace IndigoSoft.Reports.Controllers
{

    public class HomeController : Controller
    {
        private DataInterface dataInterface = new DataInterface();

        public HomeController()
        {

        }

        [HttpPost]
        public string DashBoardFila()
        {
            return JsonConvert.SerializeObject(this.dataInterface.DashBoardFila());
        }

        [HttpPost]
        public string DashBoardTotalPorTipo(DateTime DtIncio, DateTime DtFim)
        {
            Session["DataDadosInic"] = this.dataInterface.DashBoardTotalPorTipo(DtIncio, DtFim);
            return JsonConvert.SerializeObject(Session["DataDadosInic"]);
        }

        public JsonResult DashBoardDetalhamento(DateTime DtIncio, DateTime DtFim)
        {
            List<TotalTipoResult> dashBoardDetalhamentoResults = (List<TotalTipoResult>)Session["DataDadosInic"];
            return base.Json(new { Result = dashBoardDetalhamentoResults }, 0);
        }

        [HttpPost]
        public string DashBoardProdutivas(string modalidade)
        {
            List<TotalTipoResult> dashBoardDetalhamentoResults = (List<TotalTipoResult>)Session["DataDadosInic"];
            var dados = dashBoardDetalhamentoResults.FirstOrDefault(x=> x.Modalidade == modalidade);
            return JsonConvert.SerializeObject(dados);
        }

        public JsonResult Detalhamento(DateTime DtIncio, DateTime DtFim, string Modalidade, int tipo)
        {
            List<DetalhamentoResult> detalhamento = this.dataInterface.Detalhamento(DtIncio, DtFim, Modalidade, tipo);
            return base.Json(new { Result = detalhamento }, 0);
        }

        public JsonResult DetalhamentoErroSiebel(DateTime DtIncio, DateTime DtFim, string Modalidade, string Tabulacao)
        {
            List<DetalhamentoErroSiebelResult> detalhamentoErroSiebel = this.dataInterface.DetalhamentoErroSiebel(DtIncio, DtFim, Modalidade, Tabulacao);
            return base.Json(new { Result = detalhamentoErroSiebel }, 0);
        }

        public ActionResult Index()
        {
            return base.View();
        }
    }

}

