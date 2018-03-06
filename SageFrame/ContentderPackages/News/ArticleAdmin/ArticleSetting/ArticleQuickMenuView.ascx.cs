using SageFrame.ArticleManagement;
using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Modules_ArticleAdmin_ArticleSetting_ArticleQuickMenuView : BaseUserControl
{
    int userModuleID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        IncludeCss("QuickMenuStyle", "/Modules/ArticleAdmin/ArticleSetting/css/module.css");
        userModuleID = Int32.Parse(SageUserModuleID);
        getAllMenuItem();
    }
    private void getAllMenuItem()
    {
        ArticleQuickMenuController objCon = new ArticleQuickMenuController();
        List<ArticleQuickMenuInfo> lstInfo = objCon.GetAllQuickMenu(GetPortalID, GetCurrentCultureName);
        if (lstInfo.Count > 0)
        {
            StringBuilder sb = new StringBuilder();
            string className = String.Empty;
            sb.Append("<ul>");
            foreach (ArticleQuickMenuInfo objInfo in lstInfo)
            {
                if (objInfo.IsActive)
                {
                    className = objInfo.MenuTitle.Replace(" ", String.Empty);
                    sb.Append("<li class=" + className + ">");
                    sb.Append("<a href=\"");
                    sb.Append(objInfo.MenuUrl);
                    sb.Append("\" >");
                    sb.Append(objInfo.MenuTitle);
                    sb.Append("</a>");
                    sb.Append("<p>");
                    sb.Append(objInfo.MenuDescription);
                    sb.Append("</p>");
                    sb.Append("</li>");
                }
            }
            sb.Append("</ul>");
            ltrlUseFulllnk.Text = sb.ToString();
        }
        else
        {
            ltrlUseFulllnk.Text = "<h3>Quick Menu not found </h3>";
        }
    }
}