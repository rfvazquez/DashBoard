using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IndigoSoft.Reports.DataBase.DataAccess;

namespace IndigoSoft.Reports.Controllers
{
    public class SupervisaoController : Controller
    {
        //
        // GET: /Supervisao/

        private DataInterface dataInterface = new DataInterface();

        #region SqlCommand
        public ActionResult SqlCommand()
        {
            return base.View();
        }


        //public JsonResult SqlCommandExec(string sql, bool tipo)
        //{
        //    var retorno = "";
        //    try
        //    {
        //        retorno = this.dataInterface.SqlCommand(sql, tipo);
        //    }
        //    catch (Exception ex)
        //    {
        //        retorno = String.Format("Erro: {0}", ex.Message);
        //    }
        //    return base.Json(new { Result = retorno }, 0);

        //}
        #endregion 

    }
}
