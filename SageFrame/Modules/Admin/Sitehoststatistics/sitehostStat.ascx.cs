using SageFrame.Web;
using System;

public partial class Modules_Admin_Sitehoststatistics_sitehostStat : BaseUserControl
{

    public string modulePath = string.Empty;

    protected void Page_Load(object sender, EventArgs e)
    {

        modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);

        IncludeJs("SiteHostStat","/Modules/Admin/Sitehoststatistics/js/SiteHostStats.js");
    }
}