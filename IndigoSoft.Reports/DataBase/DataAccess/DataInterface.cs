using IndigoSoft.Reports.DataBase.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IndigoSoft.Reports.DataBase.DataAccess
{
    public class DataInterface
    {

        #region Login Usuario

        public UsuarioResult LoginUsuario(string login, string senha)
        {
            try
            {
                var context = new Indigosoft_Workflow_WoozaEntities();
                return context.STP_LOGIN_DASHBOARD(login, senha).FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        #endregion 

        //#region dashboard

        public List<TotalTipoResult> DashBoardTotalPorTipo(DateTime dataInicio, DateTime dataFim)
        {
            try
            {
                var context = new Indigosoft_Workflow_WoozaEntities();
                return context.STP_TOTAL_TIPO_DASHBOARD(dataInicio, dataFim).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<ControleFila> DashBoardFila()
        {
            try
            {
                var context = new Indigosoft_Workflow_WoozaEntities();
                return context.STP_CONTROLE_FILA().ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<DetalhamentoResult> Detalhamento(DateTime dataInicio, DateTime dataFim, string modalidade, int tipo)
        {
            try
            {
                var context = new Indigosoft_Workflow_WoozaEntities();
                return context.STP_DETALHAMENTO_DASHBOARD(dataInicio, dataFim, modalidade, tipo).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<DetalhamentoErroSiebelResult> DetalhamentoErroSiebel(DateTime dataInicio, DateTime dataFim, string modalidade, string tabulacao)
        {
            try
            {
                var context = new Indigosoft_Workflow_WoozaEntities();
                return context.STP_DETALHAMENTO_ERROS_SIEBEL(dataInicio, dataFim, modalidade, tabulacao).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }
        
    }


}