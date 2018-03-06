
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
    bool isDevelopmentMode = true;
  
    protected void Page_Load(object sender, EventArgs e)
    {
        if (GetUsername.ToLower() == "superuser")
            pnlEditorContainer.Visible = false;
        else
        {
            pnlEditorContainer.Visible = true;
            WorkflowController.RegisterClientWorkflowGobalVariable(GetCurrentRoleIDs, WorkFlowEngineType.News, this.Page);
            ArticleSettingController.RegisterClientArticleSettingGobalVariable(ArticleEngineType.News, this.Page, GetSiteID);
            IncludeCss("ComponentTemplate", "/Modules/WebBuilder/fonts/styles.css",
                    "/Modules/WebBuilder/css/custom.css", "/Modules/ArticleAdmin/CommonCss/ArticleAdmin.css", "/Modules/ArticleAdmin/EditorAdmin/css/module.css");
            IncludeJs("EditorAdmin",
              "/Modules/ArticleAdmin/CommonJs/EasyBuilder/init.js",
              "/Modules/ArticleAdmin/CommonJs/EasyBuilder/Easylibrary.js",
              "/Modules/WebBuilder/js/colors.js",
              "/Modules/WebBuilder/js/tinyColorPicker.js",
             "/js/SageMediaManagement.js",
             "/js/jquery.validate.js",
             "/js/jquery.pagination.js",
           "/Modules/ArticleAdmin/EditorAdmin/js/masonry.js",
             "/Modules/ArticleAdmin/CommonJs/js/commonnews.js",
              "/Modules/ArticleAdmin/EditorAdmin/js/Components.js",
              "/Modules/ArticleAdmin/EditorAdmin/js/ArticleEditor.js",
                 "/Modules/ArticleAdmin/CommonJs/EasyBuilder/WebBuilder.js"
                );
            ReadFontFamily();
            CombineFiles();
            getDefaultArticleTemplate();
        }

    }
    public void CombineFiles()
    {
        if (isDevelopmentMode)
        {

            try
            {
                string extensionPath = Server.MapPath(@"~/Modules/ArticleAdmin/EditorAdmin/js/Components.js");
                if (File.Exists(extensionPath)) File.Delete(extensionPath);
                string fullpath = Server.MapPath(@"~/Modules/ArticleAdmin/EditorAdmin/js/extensions");
                string[] files = Directory.GetFiles(fullpath, "*.js");

                // WAY 1
                if (files.Length > 0)
                {
                    using (StreamWriter writeToFile = new StreamWriter(extensionPath))
                    {
                        writeToFile.WriteLine("var extendedComps = {");
                        foreach (var file in files)
                        {
                            using (StreamReader readFrom = new StreamReader(file))
                            {
                                while (!readFrom.EndOfStream)
                                {
                                    string line = readFrom.ReadLine();
                                    if (!line.StartsWith("var") && !line.StartsWith("}"))
                                    {
                                        writeToFile.WriteLine(line);
                                    }

                                }
                                writeToFile.Write(',');
                            }

                        }
                        writeToFile.WriteLine("}");

                    }

                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }

        }
    }


    private void SaveComponentToJS(string components, string componentPath)
    {
        try
        {
            using (StreamWriter writeToFile = new StreamWriter(componentPath))
            {
                writeToFile.Write(components);
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }

    }
    private void ReadFontFamily()
    {
        FontInjectorController objFontIconController = new FontInjectorController();
        ltrFontFamily.Text = objFontIconController.GetFontDOM();
    }
    private void getDefaultArticleTemplate()
    {
        string SessionKey = "ArticleDefaultTemplate" + false;
        HttpContext.Current.Session[SessionKey] = null;
        ArticleTemplateController tempCon = new ArticleTemplateController();
        ArticleTemplateInfo objInfo = tempCon.GetDefaultTemplate(false, GetSiteID);
        if (objInfo != null)
        {
            dhnDefaultTemplateEditDom.InnerHtml = HttpUtility.HtmlDecode(objInfo.TemplateEditDOM);
            dhnDefaultTemplateRplcDom.InnerHtml = HttpUtility.HtmlDecode(objInfo.DataReplaceFrameDom);
        }
    }


}