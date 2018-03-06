using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.MassMail;
using System.Text;

public partial class Dash_ManageMassMail_ManageMassMail : BaseAdministrationUserControl
{
    public string ModulePath = "";
    public int UserModuleID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        UserModuleID = Int32.Parse(SageUserModuleID);
        ModulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);

        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "ckEditorUserModuleID", " var ckEditorUserModuleID='" + SageUserModuleID + "';", true);

        IncludeJs("ManageMassMailJS","/js/jquery.validate.js"
            ,"/Modules/Admin/ManageMassMail/js/select2.js"
            ,"/js/jquery.pagination.js"
            ,"/Modules/Admin/ManageMassMail/js/jquery.datetimepicker.full.js"
            ,"/Modules/Admin/MessageManagement/js/MessageTemp.js"
            ,"/Modules/Admin/ManageMassMail/js/dash_ManageMassMail.js");
           
        IncludeJs("CKEditor", false, "/Editors/ckeditor/ckeditor.js", "/Editors/ckeditor/adapters/jquery.js");

        IncludeCss("ManageMassMailCSS",
           "/Modules/Admin/ManageMassMail/css/jquery.datetimepicker.css"
           ,"/Modules/Admin/ManageMassMail/css/ManageMassMail.css"
           ,"/Modules/Admin/MessageManagement/css/MessageTemplate.css"
           ,"/Modules/Admin/ManageMassMail/css/select2.css");

        LoadFilterValues();
    }

    private void LoadFilterValues()
    {
        MassMailController objController = new MassMailController();
        List<MassMailFilterTypeInfo> objType = objController.GetFilterValueList(1);

        StringBuilder filterValues = new StringBuilder();
       if (objType.Count > 0)
        {
            foreach (var item in objType)
            {
                filterValues.Append("<option value=\"");
                filterValues.Append(item.TypeID);
                filterValues.Append("\">");
                filterValues.Append(item.TypeName);
                filterValues.Append("</option>");
            }

           
        }
        ltrFilterValue.Text = filterValues.ToString();
    }
}