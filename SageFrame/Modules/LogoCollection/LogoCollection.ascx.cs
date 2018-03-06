#region "Copyright"
/*
FOR FURTHER DETAILS ABOUT LICENSING, PLEASE VISIT "LICENSE.txt" INSIDE THE SAGEFRAME FOLDER
*/
#endregion

#region "References"
using System;
using SageFrame.Web;
using System.Text;
using System.IO;
using SageFrame.Framework;
#endregion

public partial class Modules_LogoCollection_LogoCollection : BaseAdministrationUserControl
{
    const string imageCollectionPath = "/images/logos";
    public int userModuleID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        userModuleID = int.Parse(SageUserModuleID);
        IncludeCss("Logo", "/Modules/LogoCollection/css/module.css");
        IncludeJs("logo", "/js/SageMediaManagement.js");
        LoadLogoImages();
    }

    private void LoadLogoImages()
    {
        try
        {
            string path = Server.MapPath(@"~" + imageCollectionPath);
            DirectoryInfo[] dir = new DirectoryInfo(path).GetDirectories();
            int folderLen = dir.Length;
            string[] note = new string[folderLen];
            for (int i = 0; i < folderLen; i++)
            {
                note[i] = string.Empty;
            }
            note[0] = "image size must be square ";
            note[1] = "image size must be square ";
            StringBuilder html = new StringBuilder();
            html.Append("<ul class='Customize-img'>");
            for (int i = 0; i < folderLen; i++)
            {
                string directoryName = Path.GetFileName(dir[i].Name);
                if (dir[i].GetFiles().Length > 0)
                {
                    string imageName = dir[i].GetFiles()[0].Name;
                    string image = imageCollectionPath + "/" + directoryName + "/" + imageName;
                    html.Append("<li class='wrap-col'>");
                    html.Append("<div class='img-wrap'>");
                    html.Append("<img src='");
                    html.Append(image);
                    html.Append("'>");
                    html.Append("</div>");
                    html.Append("<div class='infos'>");
                    html.Append("<span class='updatenote'>");
                    html.Append(" Update logo of ");
                    html.Append("</span>");
                    html.Append("<span class='dirName'>");
                    html.Append(directoryName);
                    html.Append("</span>");
                    html.Append("<span class='note'>");
                    html.Append(note[i]);
                    html.Append("</span>");
                    html.Append("</div>");
                    html.Append("<span class='changesimage upload-img' data-dirName='");
                    html.Append(directoryName);
                    html.Append("'>");
                    html.Append("Change Image </span>");
                    html.Append("</li>");
                }
            }
            html.Append("</ul>");
            ltrLogoCollection.Text = html.ToString();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    protected void btnChangeImage_Click(object sender, EventArgs e)
    {
        try
        {
            if (hdnFolderName.Value.Trim().Length > 0 && hdnImagePath.Value.Trim().Length > 0)
            {
                string destinationFolder = Server.MapPath(@"~" + imageCollectionPath + "/" + hdnFolderName.Value);
                string srcImagePath = Server.MapPath(@"~" + hdnImagePath.Value);
                string extension = Path.GetExtension(srcImagePath);
                //delete existing image first
                if (new DirectoryInfo(destinationFolder).Exists)
                {
                    DirectoryInfo di = new DirectoryInfo(destinationFolder);
                    foreach (FileInfo file in di.GetFiles())
                    {
                        file.Delete();
                    }
                    string FileName = "Contentder";
                    File.Copy(srcImagePath, destinationFolder + "\\" + FileName + extension, true);
                    LoadLogoImages();
                    ShowMessage("favicon changed", hdnFolderName.Value + " image changed succesfully.", string.Empty, SageMessageType.Success);
                }
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    protected void btnChangeFavicon_Click(object sender, EventArgs e)
    {
        PageBase objPageBase = new PageBase();
        string activeTemplate = objPageBase.GetActiveTemplate;
        string destinationFolder = Server.MapPath(@"~/Templates/" + activeTemplate + "/favicon.ico");
        string srcImagePath = Server.MapPath(@"~" + hdnImagePath.Value);
        //delete existing image first
        File.Copy(srcImagePath, destinationFolder, true);
        ShowMessage("favicon changed", "Favicon changed succesfully.", "Due to Browser Cache it may take take some time to reflect the favicon.", SageMessageType.Success);
    }
}