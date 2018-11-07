using System;
using IndigoSoft.Reports.DataBase;
using IndigoSoft.Reports.DataBase.DataAccess;
using System.Web.Mvc;

namespace IndigoSoft.Reports.Controllers
{
    public class UsuarioController : Controller
    {
        private DataInterface dataInterface = new DataInterface();

        public UsuarioController()
        {
            //Log.Log.GeraLog("Iniciando a Aplicação");
        }

        public ActionResult Login()
        {
            //Log.Log.GeraLog("Retornando a Página");
            return base.View();
        }

        [HttpPost]
        public string Login(string login, string senha)
        {
            //Log.Log.GeraLog(String.Format("Realizando o Login: {0} | {1}", login, senha));
            UsuarioResult usuarioResult = this.dataInterface.LoginUsuario(login, senha);
            if (usuarioResult == null)
            {
                //Log.Log.GeraLog(String.Format("UsuarioResult == null"));
                return "Erro Login";
            }
            //Log.Log.GeraLog(String.Format("Login realizado com sucesso"));
            Session["USUARIO"] = usuarioResult;
            return base.Url.Action("Index", "Home");
        }

        public ActionResult Logout()
        {
            Session["USUARIO"] = null;
            return base.RedirectToAction("Login");
        }
    }
}