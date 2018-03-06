using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.PageRating;
using System.IO;

public partial class Modules_PageRating_RatingView :BaseUserControl
{
    public int userModuleID = 0;
    public int RatingPoint = 0;
    public string RatingTitle = string.Empty;
    public bool IsRatingChangeable = false;
    public double AverageRating = 0.0;
    public double UserRating = 0.0;
    public string userName = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {
        userModuleID =Int32.Parse(SageUserModuleID);
        userName = GetUsername;
        IncludeJs("PageRatingView", "/Modules/PageRating/js/jstarbox.js"
                , "/Modules/PageRating/js/rating.js"
                , "/js/popup.js");
        IncludeCss("PageRatingView", "/Modules/PageRating/css/jstarbox.css"
            , "/Modules/PageRating/js/ie7.css");
        if (!IsPostBack)
        {
            
            if (userName != "anonymoususer")
            {
                GetUserRating();
            }
            GetRatingSetting();
            GetAverageRating();
        }
    }

    private void GetUserRating() {
        PageRatingController controller = new PageRatingController();
        string pageName = string.Empty;
        pageName = Path.GetFileNameWithoutExtension(Request.Url.AbsolutePath);
        UserRating = controller.GetUserRating(userModuleID, GetPortalID,pageName, userName);
    }
    private void GetRatingSetting()
    {
        PageRatingController controller = new PageRatingController();
        PageRatingSetting settings = controller.GetRatingSettings(userModuleID, GetPortalID, userName);
        if (settings != null)
        {
            RatingPoint = settings.RatingPoint;
            RatingTitle = settings.RatingTitle;
            IsRatingChangeable = settings.IsRatingEditEnable;
        }
    }
    private void GetAverageRating()
    {
        string pageName = string.Empty;
        pageName = Path.GetFileNameWithoutExtension(Request.Url.AbsolutePath);
        PageRatingController controller = new PageRatingController();
        AverageRating= controller.GetAverageRating(userModuleID, GetPortalID,pageName);
    }
}