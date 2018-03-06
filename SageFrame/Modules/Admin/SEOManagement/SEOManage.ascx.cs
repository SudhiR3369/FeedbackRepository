using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI.WebControls;
using SageFrame.Web;
using System.Text;
using SageFrame.Pages;
using SageFrame.SEOManagement;
public partial class Modules_Admin_SEOManagement_SEOManage : BaseAdministrationUserControl
{
    public int userModuleID = 0;
    public string pageExtension = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {
        userModuleID = int.Parse(SageUserModuleID);
        pageExtension = SageFrameSettingKeys.PageExtension;
        if (!IsPostBack)
        {
            IncludeJs("SEOMeta", "/js/jquery.validate.js", "/Modules/Admin/SEOManagement/js/SEOMetaManage.js","/Modules/Admin/SEOManagement/js/owl.carousel.js");
            IncludeCss("seoMeta", "/Modules/Admin/SEOManagement/css/module.css");
            BindSEOManageLayout();
        }
    }

    public void BindSEOManageLayout()
    {
        StringBuilder pageHTML = new StringBuilder();
        PageController pageController = new PageController();
        List<PageEntity> pages = pageController.GetMenuFront(GetPortalID, false);
        pageHTML.Append("<div><select id='slcPages' name='slcPages'><option value='0'>Select a Page</option>");
        foreach (PageEntity item in pages)
        {
            pageHTML.Append("<option value=\"");
            pageHTML.Append(item.PageID);
            pageHTML.Append("\">");
            pageHTML.Append(item.PageName);
            pageHTML.Append("</option>");
        }
        pageHTML.Append("</select></div>");
        ltrPagenames.Text = pageHTML.ToString();

        SEOController seoContrl = new SEOController();
        List<SEOMetaType> lstMetaTag = seoContrl.GetSEOMetaType().Where(i => i.IsShownFront == true && i.IsSystem == false).ToList();
        if (lstMetaTag.Count > 0)
        {
            StringBuilder layout = new StringBuilder();
            StringBuilder savedData = new StringBuilder();
            foreach (SEOMetaType item in lstMetaTag)
            {

                layout.Append("<div class='metaColection'>");
                layout.Append("<div class='metaKey' >");//<span class='sfFormlabel'>");
                //layout.Append(item.TypeName);
                //layout.Append("</span>");
                layout.Append("<span class=''sfSelectLabel> Select ");
                layout.Append(item.TypeName);
                layout.Append("</span>");
                layout.Append("</div>");
                layout.Append("<div class='metaValue'>");

                if (item.HtmlTag.Trim() == "img")
                {
                    layout.Append("<img id='txt_");
                    layout.Append(item.TypeName);
                    layout.Append("' src='");
                    layout.Append(GetHostURL());
                    layout.Append("/Modules/Admin/SEOManagement/images/no-image.jpg");
                    layout.Append("' class='txtTextBox' height='100px' width='100px' name='txt_");
                    layout.Append(item.TypeName);
                    layout.Append("' data-id='");
                    layout.Append(item.TagTypeID);
                    layout.Append("' data-tag='");
                    layout.Append(item.HtmlTag.Trim());
                    layout.Append("' />");
                }
                else if (item.HtmlTag.Trim() == "text")
                {
                    layout.Append(BuildWebType());
                    layout.Append("<textarea id='txt_");
                    layout.Append(item.TypeName);
                    layout.Append("' class='txtTextBox textareaValidate' name='txt_");
                    layout.Append(item.TypeName);
                    layout.Append("' data-id='");
                    layout.Append(item.TagTypeID);
                    layout.Append("' data-tag='");
                    layout.Append(item.HtmlTag.Trim());
                    layout.Append("'></textarea>");
                }
                else
                {
                    layout.Append("<textarea id='txt_");
                    layout.Append(item.TypeName);
                    layout.Append("' class='txtTextBox textareaValidate' name='txt_");
                    layout.Append(item.TypeName);
                    layout.Append("' data-id='");
                    layout.Append(item.TagTypeID);
                    layout.Append("' data-tag='");
                    layout.Append(item.HtmlTag.Trim());
                    layout.Append("'></textarea>");
                }

                layout.Append("</div>");
                layout.Append("<div class='htmlParseValue'>");
                layout.Append("</div>");
                layout.Append("</div>");

                savedData.Append("<li data-tagid='" + item.TagTypeID + "'>");
                savedData.Append("<span class='tagName  icon-circle-check'>");
                savedData.Append(item.TypeName);
                savedData.Append("</span>");
                savedData.Append("<span class='tagData'>");
                savedData.Append("</span>");
                savedData.Append("</li>");

            }
            ltrTags.Text = layout.ToString();
            ltrStoredSEO.Text = savedData.ToString();
        }
    }
    private string BuildWebType()
    {
        string[] types = { "Article", "Blog", "Personal", "Portfolio", "Report", "News", "Interview", "Music", "Cinema" };
        StringBuilder html = new StringBuilder();
        foreach (string type in types)
        {
            html.Append("<input type='radio' class='webtype' id='webtype_" + type + "' name='webtype' value='" + type + "' />");
            html.Append("<label for ='webtype_" + type + "'>" + type + "</label>");
        }
        html.Append("<label>Others</label>");
        return html.ToString();
    }
}