using System.Web;
using System.Web.Mvc;
using IndigoSoft.Reports.App_Start;

namespace IndigoSoft.Reports
{
    public class FilterConfig
    {
        public FilterConfig()
        {
        }

        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new Restricted());
        }
    }
}