using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IndigoSoft.Reports.Controllers
{
    public class RecuperacaoController : Controller
    {
        public RecuperacaoController()
        {
        }

        public ActionResult Index()
        {
            return base.View();
        }
    }
}