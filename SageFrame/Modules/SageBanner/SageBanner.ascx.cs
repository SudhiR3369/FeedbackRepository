using SageFrame.SageBanner;
using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Modules_SageBanner_SageBanner : BaseUserControl
{
    int userModuleID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        IncludeCss("SageBannerCss", "/Modules/SageBanner/css/animate.min.css",
            "/Modules/SageBanner/css/Banner_main.css");
            //"/Modules/SageBanner/css/bootstrap.min.css",
            //"/Modules/SageBanner/css/font-awesome.min.css");
        IncludeJs("SageBannerJs", "/Modules/SageBanner/js/bootstrap.min.js"
                    , "/Modules/SageBanner/js/main.js");
        userModuleID = int.Parse(SageUserModuleID);
        BindBannerview();
    }
    private void BindBannerview()
    {
        StringBuilder html = new StringBuilder();
        SageBannerController objCon = new SageBannerController();
        List<SageBannerInfo> listInfo = objCon.GetallBanner(GetPortalID, userModuleID, GetCurrentCultureName);
      if(listInfo.Count>0)
        {
            bool isFirstItem = true;
            html.Append("<div id=\"home-slider\" class=\"carousel slide carousel-fade\" data-ride=\"carousel\">");
            html.Append(" <div class=\"carousel-inner\">");
            foreach (SageBannerInfo objinfo in listInfo)
            {
                if (objinfo.IsActive)
                {
                    if (isFirstItem)
                    {
                        html.Append("  <div class=\"item active\" style=\"background-image: url(/Modules/SageBanner/images/Thumbnail/large/");
                        html.Append(objinfo.BannerImageName);
                        html.Append(")\">");
                        html.Append("<div class=\"caption\">");
                        html.Append("<h1 class=\"animated fadeInLeftBig\">");
                        html.Append(objinfo.BannerSloganTitle);
                        html.Append("</h1>");
                        html.Append(" <p class=\"animated fadeInRightBig\">");
                        html.Append(objinfo.BannerSlogan);
                        html.Append("</p>");
                        if (objinfo.LinkButtonName != string.Empty)
                        {
                            html.Append("<a data-scroll class=\"btn btn-start animated fadeInUpBig\" href=\"");
                            html.Append(objinfo.LinkUrl);
                            html.Append("\">");
                            html.Append(objinfo.LinkButtonName);
                            html.Append("</a>");
                        }
                        html.Append("</div></div>");
                        isFirstItem = false;
                    }
                    else
                    {
                        html.Append("  <div class=\"item\" style=\"background-image: url(/Modules/SageBanner/images/Thumbnail/large/");
                        html.Append(objinfo.BannerImageName);
                        html.Append(")\">");
                        html.Append("<div class=\"caption\">");
                        html.Append("<h1 class=\"animated fadeInLeftBig\">");
                        html.Append(objinfo.BannerSloganTitle);
                        html.Append("</h1>");
                        html.Append(" <p class=\"animated fadeInRightBig\">");
                        html.Append(objinfo.BannerSlogan);
                        html.Append("</p>");
                        if (objinfo.LinkButtonName != string.Empty)
                        {
                            html.Append("<a data-scroll class=\"btn btn-start animated fadeInUpBig\" href=\"");
                            html.Append(objinfo.LinkUrl);
                            html.Append("\">");
                            html.Append(objinfo.LinkButtonName);
                            html.Append("</a>");
                        }
                        html.Append("</div></div>");

                    }
                }
            }
            html.Append("</div>");
            html.Append("<a class=\"left-control\" href=\"#home-slider\" data-slide=\"prev\"><i class=\"fa fa-angle-left\"></i></a>");
            html.Append("<a class=\"right-control\" href =\"#home-slider\" data-slide=\"next\"><i class=\"fa fa-angle-right\"></i></a>");
            html.Append("</div>");
            ltrlBannerView.Text = html.ToString();
        }
       else
        {
            ltrlBannerView.Text ="<h3>No banner to display.</h3>";
        }
    }
}