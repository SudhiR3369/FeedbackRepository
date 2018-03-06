using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.SageFeature;
using System.Text;

public partial class SageFeature : BaseUserControl
{
    public int userModuleID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        userModuleID = int.Parse(SageUserModuleID);
        IncludeCss("SageFeaturecss", "/Modules/SageFeature/css/SageFeature.css");
        GetAllFeature();
    }
    private void GetAllFeature()
    {
        SageFeatureController objCon = new SageFeatureController();
        List<SageFeatureInfo> lstInfo = objCon.GetallData(userModuleID, GetPortalID, GetCurrentCulture());
        StringBuilder sb = new StringBuilder();
        int counter = 0;
        const string ImagePath = "/Modules/SageFeature/img/ThumbLarge/";
        foreach (SageFeatureInfo objInfo in lstInfo)
        {
            if (objInfo.IsActive)
            {
                if (counter % 2 == 0)
                {
                    sb.Append("<div class=\"feat-row lftImg\">");
                    sb.Append("<div class=\"img-wrp\">");
                    sb.Append("<img src=\"");
                    sb.Append(ImagePath);
                    sb.Append(objInfo.ImageName);
                    sb.Append("\" />");
                    sb.Append("</div>");
                    sb.Append("<div class=\"decp\">");
                    sb.Append("<h3>");
                    sb.Append(objInfo.Title);
                    sb.Append("</h3>");
                    sb.Append("<p>");
                    sb.Append(objInfo.Description);
                    sb.Append("</p>");
                    sb.Append("</div></div>");
            }
            else
            {
                sb.Append("<div class=\"feat-row lftImg\">");
                sb.Append("<div class=\"decp\">");
                sb.Append("<h3>");
                sb.Append(objInfo.Title);
                sb.Append("</h3>");
                sb.Append("<p>");
                sb.Append(objInfo.Description);
                sb.Append("</p>");
                sb.Append("</div>");
                sb.Append("<div class=\"img-wrp\">");
                sb.Append("<img src=\"");
                sb.Append(ImagePath);
                sb.Append(objInfo.ImageName);
                sb.Append("\" />");
                sb.Append("</div>");
                sb.Append("</div>");
            }
            counter++;
            }
        }
        ltrlFeature.Text = sb.ToString();
    }
}