
using SageFrame.ArticleManagement;
using SageFrame.FontIconInjector;
using SageFrame.Web;
using SageFrame.WorkflowManagement;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Modules_ArticleAdmin_EditorAdmin_ArticleEditorManage : BaseUserControl
{
    public string settings;
    public string roleID = string.Empty;
    public int siteID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        WorkflowController.RegisterClientWorkflowGobalVariable(GetCurrentRoleIDs, WorkFlowEngineType.News, this.Page);
        ArticleSettingController.RegisterClientArticleSettingGobalVariable(ArticleEngineType.News, this.Page,siteID);
        IncludeCss("ArticlePublisher", "/Modules/ArticleAdmin/CommonCss/ArticleAdmin.css", "/Modules/WebBuilder/css/preview.css", "/Modules/ArticleAdmin/Publisher/css/module.css");
        IncludeJs("ArticlePublisherJs",
                 "/js/jquery.validate.js",
                 "/js/jquery.pagination.js",
                 "/Modules/ArticleAdmin/CommonJs/js/commonnews.js",
                 "/Modules/WebBuilder/js/WebBuilderView.js",
                 "/Modules/ArticleAdmin/Publisher/js/ArticlePublisher.js"
            );
        if (GetCurrentRoleIDs.Split(',').Length > 0)
            roleID = GetCurrentRoleIDs.Split(',')[0];
    }







}