using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Modules_Registration_RegistrationView : BaseAdministrationUserControl
{
    public int userModuleID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        userModuleID = Int32.Parse(SageUserModuleID);
        IncludeCss("RegistrationViewCss", "/Modules/Registration/js/slick/slick.css",
                                            "/Modules/Testimonials/css/RegistrationView.css");
        IncludeJs("RegistrationViewJs", "/Modules/Registration/js/slick/slick.min.js"
                                        , "/Modules/Registration/js/RegistrationView.js");
            }
}