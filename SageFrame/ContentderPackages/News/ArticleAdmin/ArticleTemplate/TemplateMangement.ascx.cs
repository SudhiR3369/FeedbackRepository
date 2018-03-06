using Newtonsoft.Json;
using SageFrame.FontIconInjector;
using SageFrame.Web;
using SageFrame.WebBuilder;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using SageFrame.Advertisement;

public partial class Modules_ArticleAdmin_ArticleTemplate_TemplateMangement : BaseUserControl
{
    public string settings = string.Empty;
    bool isDevelopmentMode = true;
    protected void Page_Load(object sender, EventArgs e)
    {
        IncludeCss("ComponentTemplate", "/Modules/WebBuilder/fonts/styles.css",
            "/Modules/WebBuilder/css/custom.css", "/Modules/ArticleAdmin/CommonCss/ArticleAdmin.css", "/Modules/ArticleAdmin/ArticleTemplate/css/module.css");
        IncludeJs("ComponentManagement",
          "/Modules/ArticleAdmin/CommonJs/EasyBuilder/init.js",
          "/Modules/ArticleAdmin/CommonJs/EasyBuilder/Easylibrary.js",
          "/Modules/WebBuilder/js/colors.js",
          "/Modules/WebBuilder/js/tinyColorPicker.js",
         "/js/SageMediaManagement.js",
         "/js/jquery.validate.js",
         "/js/jquery.pagination.js",
         "/Modules/ArticleAdmin/CommonJs/js/commonnews.js",
          "/Modules/ArticleAdmin/ArticleTemplate/js/Components.js",
          "/Modules/ArticleAdmin/ArticleTemplate/js/ComponentTemplateEdit.js",
             "/Modules/ArticleAdmin/CommonJs/EasyBuilder/WebBuilder.js"
            );
        ReadFontFamily();
        CombineFiles();
        GetAllAdvSizes();

    }
    public void GetAllAdvSizes() {
        AdvertisementController objAdvCon = new AdvertisementController();
        List<AdvertisementInfo> lstInfo = objAdvCon.GetAllSizes(GetSiteID);
        ddlhdnAdvSizes.DataSource = lstInfo;
        ddlhdnAdvSizes.DataTextField = "Size";
        ddlhdnAdvSizes.DataValueField = "SizeID";
        ddlhdnAdvSizes.DataBind();

    }
    public void CombineFiles()
    {
        if (isDevelopmentMode)
        {

            try
            {

                string extensionPath = Server.MapPath(@"~/Modules/ArticleAdmin/ArticleTemplate/js/Components.js");

                if (File.Exists(extensionPath)) File.Delete(extensionPath);

                string fullpath = Server.MapPath(@"~/Modules/ArticleAdmin/ArticleTemplate/js/extensions");
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

   
}