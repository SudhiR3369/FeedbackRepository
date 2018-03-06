using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.DashboardLink;
using System.Text;
using SageFrame.UserProfile;

public partial class DashboardLink : BaseUserControl
{
    int userModuleID = 0;
    public string userImage;
    protected void Page_Load(object sender, EventArgs e)
    {
        userModuleID = Int32.Parse(SageUserModuleID);
        IncludeCss("SideMenuDashboard", "/Modules/DashboardSideMenu/css/FrontDashboard.css", "/Modules/Admin/DashboardSideMenu/css/mainStyle.css");
        IncludeJs("SideMenuDashboardJs", "/Modules/Admin/DashboardSideMenu/js/SideMenuModule.js");
        BindLink();
    }
    private void BindLink()
    {
        string ActivePageUrl = "/dashboard/" + GetDashBoardPageName().ToLower();
        DashboardLinkController objCon = new DashboardLinkController();
        List<DashboardLinkInfo> lstInfo = objCon.GetallLinksView(GetCurrentRoleIDs);
        StringBuilder sb = new StringBuilder();
        foreach (DashboardLinkInfo objInfo in lstInfo)
        {
            string herfLink = objInfo.PageID == 0 ? "#" : objInfo.LinkUrl;
            if (objInfo.IsParent && objInfo.ParentLinkID == 0)
            {
                if (objInfo.LinkUrl.ToLower() == ActivePageUrl)
                    sb.Append("<li class='active'>");
                else
                    sb.Append("<li>");
                sb.Append("<a  class='");
                sb.Append(objInfo.LinkTitle.Replace(" ", "-"));
                sb.Append("'><span>");
                sb.Append(objInfo.LinkTitle);
                sb.Append("</span></a>");
                sb.Append("<ul class='sub-item'>");
                sb.Append(CreateMenulist(objInfo.LinkID, lstInfo));
                sb.Append("</ul></li>");            
            }
            else if(objInfo.ParentLinkID==0)
            {
                if (objInfo.LinkUrl.ToLower() == ActivePageUrl)
                    sb.Append("<li class='active'>");
                else
                    sb.Append("<li>");
                sb.Append("<a href='");
                sb.Append(objInfo.LinkUrl);
                sb.Append("' class='");
                sb.Append(objInfo.LinkTitle.Replace(" ", "-"));
                sb.Append("'><span>");
                sb.Append(objInfo.LinkTitle);
                sb.Append("</span></a></li>");

            }

        }

        ltrlLinks.Text = sb.ToString();
    }
    private string CreateMenulist(int ParentID, List<DashboardLinkInfo> lstInfo)
    {
        string ActivePageUrl = "/dashboard/" + GetDashBoardPageName().ToLower();
        StringBuilder sb = new StringBuilder();

        foreach (DashboardLinkInfo objInfo in lstInfo)
        {
            string herfLink = objInfo.PageID == 0 ? "#" : objInfo.LinkUrl;
            if (objInfo.ParentLinkID == ParentID)
            {
                if (objInfo.IsParent)
                {
                    if (objInfo.LinkUrl.ToLower() == ActivePageUrl)
                        sb.Append("<li class='active'>");
                    else
                        sb.Append("<li>");
                    sb.Append("<a class='");
                    sb.Append(objInfo.LinkTitle.Replace(" ", "-"));
                    sb.Append("'><span>");
                    sb.Append(objInfo.LinkTitle);
                    sb.Append("</span></a>");
                    sb.Append("<ul class='sub-item'>");
                    sb.Append(CreateMenulist(objInfo.LinkID, lstInfo));
                    sb.Append("</ul></li>");
                }
                else
                {
                    if (objInfo.LinkUrl.ToLower() == ActivePageUrl)
                        sb.Append("<li class='active'>");
                    else
                        sb.Append("<li>");
                    sb.Append("<a href='");
                    sb.Append(objInfo.LinkUrl);
                    sb.Append("' class='");
                    sb.Append(objInfo.LinkTitle.Replace(" ", "-"));
                    sb.Append("'><span>");
                    sb.Append(objInfo.LinkTitle);
                    sb.Append("</span></a></li>");
                }
            }
        }

        return sb.ToString();
    }
    private string GetDashBoardPageName()
    {
        string path = Request.Url.AbsolutePath;
        string PageName = string.Empty;
        string[] strArr = path.Split('/');
        for (int i = 0; i < strArr.Length; i++)
        {
            if (strArr[i].ToLower() == "dashboard" || strArr[i].ToLower() == "dashboard.aspx")
            {
                try
                {
                    PageName = strArr[i + 1];
                    break;
                }
                catch
                {
                    return PageName;
                }
            }
        }
        return PageName;
    }


}
