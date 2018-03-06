using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.WorkflowManagement;
using SageFrame.ArticleManagement;

public partial class Modules_ArticleAdmin_ReporterAdmin_ReporterManangement : BaseUserControl
{
    public int UserModuleId = 0;
    public string roleID = string.Empty;
    //public int siteID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        WorkflowController.RegisterClientWorkflowGobalVariable(GetCurrentRoleIDs, WorkFlowEngineType.News, this.Page);
        ArticleSettingController.RegisterClientArticleSettingGobalVariable(ArticleEngineType.News, this.Page, GetSiteID);
        //CommonController ComCon = new CommonController();
        //List<RoleInfo> lstRole = ComCon.GetRolesByUsername(GetUsername);
        //roleID =lstRole[0].RoleId;
               

        UserModuleId = Int32.Parse(SageUserModuleID);
        IncludeCss("NewsReporterCss", "/Modules/ArticleAdmin/CommonCss/ArticleAdmin.css"
                    ,"/Modules/Admin/MediaManagement/css/cropper.css","/Modules/Admin/MediaManagement/css/module.css"
                    , "/Modules/ArticleAdmin/CommonCss/selectize.css",
                    "/Modules/WebBuilder/css/preview.css"
                    , "/Modules/ArticleAdmin/ReporterAdmin/css/module.css");
        IncludeJs("NewsReporterJs"
                    , "/js/SageMediaManagement.js"
                    , "/Modules/ArticleAdmin/ReporterAdmin/js/NewsReporter.js"
                  //, "Modules/Admin/MediaManagement/js/uploader.js"
                  , "/js/jquery.pagination.js"
                  , "/js/jquery.validate.js"
                  , "/js/jquery.alerts.js"
                  , "/Modules/ArticleAdmin/CommonJs/js/commonnews.js"                  
                  ,"/Modules/ArticleAdmin/ReporterAdmin/js/selectize.js");           
        if (GetCurrentRoleIDs.Split(',').Length > 0)
            roleID = GetCurrentRoleIDs.Split(',')[0];
    }
            
}