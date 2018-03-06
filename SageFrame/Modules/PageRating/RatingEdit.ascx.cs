using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.PageRating;
using System.Text;

public partial class Modules_PageRating_RatingEdit :BaseAdministrationUserControl
{
    public int RatingPoint = 0;
    protected void Page_Load(object sender, EventArgs e)
    {        
        if (!IsPostBack)
        {
            IncludeJs("PageRatingEdit", "/Modules/PageRating/js/jstarbox.js");
            IncludeCss("PageRatingEdit", "/Modules/PageRating/css/jstarbox.css"
                , "/Modules/PageRating/js/ie7.css");
            GetRating();
        }

    }
    private void GetRating() {
        int userModuleID = Int32.Parse(SageUserModuleID);
        string pageName = string.Empty;
        pageName = System.IO.Path.GetFileNameWithoutExtension(Request.Url.AbsolutePath);
        PageRatingController controller = new PageRatingController();
        PageRatingSetting settings = controller.GetRatingSettings(userModuleID, GetPortalID, GetUsername);
        if (settings != null)
        {
            RatingPoint = settings.RatingPoint;            
        }
        List<PageRatingCount> lstRating = controller.GetRatingCountByPage(userModuleID, GetPortalID, pageName);
        StringBuilder html = new StringBuilder();
        if (lstRating.Count > 0) {
            foreach (PageRatingCount item in lstRating)
            {
                html.Append("<div class='divRatingWrap'>");
                html.Append("<div class='divRatingPoint' data-id='");
                html.Append(item.RatingPoint);
                html.Append("'></div>");
                html.Append("<span class='divRatingCount'>(");
                html.Append(item.RatingCount);
                html.Append(" votes)</span>");
                html.Append("</div>");
            }
        }
        ltrRating.Text = html.ToString();
    }
}