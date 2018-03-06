using SageFrame.Web;
using System;

public partial class Modules_TwitterSearch_TwitterSearch : BaseUserControl
{
    public string userModuleID = string.Empty;
    public string modulePath = string.Empty;

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            userModuleID = SageUserModuleID;
            modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);

            IncludeCss("TwitterSearch", "/Modules/TwitterSearch/css/TwitterSearch.css");
            IncludeJs("TwitterSearch", "/Modules/TwitterSearch/js/TwitterSearch.js");
        }
    }

}