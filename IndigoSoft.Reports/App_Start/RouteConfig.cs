﻿using System.Web.Mvc;
using System.Web.Routing;

namespace IndigoSoft.Reports
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                new string[] {"IndigoSoft.Reports.Controllers"}
            );
        }
    }
}