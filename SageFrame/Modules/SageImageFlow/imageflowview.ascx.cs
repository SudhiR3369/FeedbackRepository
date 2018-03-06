using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.ImageFlow;
using System.Text;

public partial class Modules_SageImageFlow_ImageFlowView : BaseUserControl
{
    //default Setting Value are asigned
    public string Style = "coverflow";
    public string Spacing = "-0.5";
    public bool Arrow = true;
    public bool AutoPlay = false;
    public bool Looping = true;
    public bool Clickable = true;
    public bool ScrollWheel = true;
    int UserModuleID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        IncludeCss("SageImageFlow", "/Modules/SageImageFlow/css/jquery.flipster.min.css", "/Modules/SageImageFlow/css/ModuleVIew.css");
        IncludeJs("SageImageFlow", "/Modules/SageImageFlow/js/jquery.flipster.min.js",
                 "/Modules/SageImageFlow/js/SageImageFlow.js");
        UserModuleID = Int32.Parse(SageUserModuleID);
        GetSetting();
        GetAllImages();
    }
    private void GetAllImages()
    {

        ImageFlowController ObjCon = new ImageFlowController();
        List<ImageFlowInfo> ObjLst = ObjCon.GetAllImages(UserModuleID, GetPortalID, GetCurrentCultureName);
        if (ObjLst.Count > 0)
        {
            const string ImagePath = "/Modules/SageImageFlow/images/Thumbnail/large/";
            StringBuilder sb = new StringBuilder();
            sb.Append("<ul class='flip-items'>");
            foreach (ImageFlowInfo objInfo in ObjLst)
            {
                if (objInfo.IsActive)
                {
                    sb.Append("<li><div class='captionWrap'><h3>");
                    sb.Append(objInfo.Title);
                    sb.Append("</h3>");
                    sb.Append("<span>");
                    sb.Append(objInfo.Description);
                    sb.Append("</span></div>");
                    
                    sb.Append("<img src='");
                    sb.Append(ImagePath);
                    sb.Append(objInfo.ImageName);
                    sb.Append("'/> </li>");
                }
            }
            sb.Append("</ul>");
            ltrlFlipItems.Text = sb.ToString();
        }
    }
    private void GetSetting()
    {
        ImageFlowController ObjCon = new ImageFlowController();
        ImageFlowSettingInfo objInfo = ObjCon.GetSetting(UserModuleID, GetPortalID);
        if (objInfo != null)
        {
            Style = objInfo.Style;
            Spacing = objInfo.Spacing;
            Arrow = objInfo.Arrow;
            AutoPlay = objInfo.AutoPlay;
            Looping = objInfo.Looping;
            Clickable = objInfo.Clickable;
            ScrollWheel = objInfo.ScrollWheel;
        }

    }
}