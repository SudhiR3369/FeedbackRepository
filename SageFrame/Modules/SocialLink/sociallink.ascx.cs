using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.SocialLinks;

public partial class SocialLink : BaseUserControl
{
    public int userModuleID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        userModuleID = int.Parse(SageUserModuleID);
        IncludeCss("SocialLinks", "/Modules/SocialLink/css/Module.css");
        GetSocialLinks();
    }
    private void GetSocialLinks()
    {
        SocialLinkController objCon = new SocialLinkController();
        List<SocialLinksInfo> lst = objCon.GetSocialLinks(userModuleID, GetPortalID, GetCurrentCultureName);
        StringBuilder sb = new StringBuilder();
        sb.Append("<ul>");
        foreach (SocialLinksInfo objInfo in lst)
        { 
            if (!string.IsNullOrEmpty(objInfo.LinkUrl))
            {
                sb.Append("<li><a target=\"_blank\" href =\"");
                sb.Append(objInfo.LinkUrl);
                sb.Append("\" ><i class=\"");
                sb.Append(objInfo.IconClass);
                sb.Append("\" aria-hidden=\"true\"></i><span class=\"iconName\">");
                if (!string.IsNullOrEmpty(objInfo.LinkTitle))
                    sb.Append(objInfo.LinkTitle);
                sb.Append("</span>");
                sb.Append("</a></li>");
            } 
        }
        sb.Append("</ul>");
        ltrlSocialContact.Text = sb.ToString();
    }
}
