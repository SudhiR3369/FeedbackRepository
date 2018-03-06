/*
FOR FURTHER DETAILS ABOUT LICENSING, PLEASE VISIT "LICENSE.txt" INSIDE THE SAGEFRAME FOLDER
*/
using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Web.Configuration;
using System.Web.Hosting;
using RegisterModule;
using System.IO;
using System.Xml;
using SageFrame.Web;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
using Microsoft.SqlServer.Management.Smo;
using Microsoft.SqlServer.Management.Common;
using System.Collections.Specialized;
using Microsoft.SqlServer.Management.Sdk.Sfc;
using System.ComponentModel;
using SageFrame.Utilities;
using SageFrame.AdminNotification;
using System.Net;

public partial class Modules_Upgrade_SageframeUpgrade : BaseAdministrationUserControl
{
    public int MessageID;
    protected void Page_Load(object sender, EventArgs e)
    {
       
        string[] paramColl = GetUrlParameters;
        if (paramColl != null && paramColl.Length > 0)
        {
            MessageID = int.Parse(paramColl[1]);
            AdminNotificationController controller = new AdminNotificationController();
            AdminNotificationInfo objInfo = controller.GetNotificationDetail(GetPortalID, MessageID);
            lblAdminMessage.Text = objInfo.MessageDetails;
        }

        lblErrorMsg.Text = "";
    }
    public string savePath;
    public string errorMessage;
    public string fileName;
    public void UpgradeSystem(int MessageID)
    {
        AdminNotificationController controller = new AdminNotificationController();
        AdminNotificationInfo objInfo = controller.GetNotificationDetail(GetPortalID, MessageID);
        try
        {
            WebClient client = new WebClient();
            fileName = System.IO.Path.GetFileName(objInfo.PackageLink);
            string tempFolder = HostingEnvironment.ApplicationPhysicalPath + "Upgrade";
            savePath = tempFolder + "\\" + fileName;
            if (!Directory.Exists(tempFolder))
                Directory.CreateDirectory(tempFolder);
            client.DownloadFileCompleted += new System.ComponentModel.AsyncCompletedEventHandler(client_DownloadFileCompleted);
            client.DownloadFileAsync(new Uri(objInfo.PackageLink), savePath, fileName);
            errorMessage = string.Empty;
        }
        catch (Exception ex)
        {
            ShowMessage("", ex.ToString(), "", SageMessageType.Error);
        }
    }
    void client_DownloadFileCompleted(object sender, System.ComponentModel.AsyncCompletedEventArgs e)
    {

        if (!IsZipValid(savePath, ref errorMessage))
        {
            this.lblErrorMsg.Text = errorMessage;
        }
        else
        {
            Server.Transfer(ResolveUrl("~/Modules/Upgrade/upgrade.aspx?zip=" + fileName + "&messageID=" + MessageID + "&userName=" + GetUsername));
        }


    }
    public void WriteToLog(string txt)
    {
        string path = HostingEnvironment.ApplicationPhysicalPath + "log.txt";
        object obj = new object();
        lock (obj)
        {
            using (StreamWriter sw = File.AppendText(path))
            {
                sw.WriteLine(txt);
                sw.Dispose();
            }
        }
    }

    protected void btnUpload_Click(object sender, EventArgs e)
    {
        string[] paramColl = GetUrlParameters;
        if (paramColl != null && paramColl.Length > 0)
        {
            int MessageID = int.Parse(paramColl[1]);
            UpgradeSystem(MessageID);
        }
    }

    /// <summary>
    /// Compares the version of the uploading zip and existing application version.
    /// </summary>
    /// <param name="configFilePath">Config file path.</param>
    /// <returns>True if the uploading version is higher then the current application version.</returns>
    public static bool IsNewVersion(string configFilePath)
    {
        bool flag = false;
        XmlDocument doc = new XmlDocument();
        doc.Load(configFilePath);
        XmlNode versionNode = doc.SelectSingleNode("/CONFIG/SAGEFRAME");
        string installerVersion = versionNode.Attributes["VERSION"].Value;
        string prevVersion = Config.GetSetting("SageFrameVersion");
        if (Convert.ToDecimal(installerVersion) >= Convert.ToDecimal(prevVersion))
        {
            flag = true;
        }
        return flag;
    }

    /// <summary>
    /// Compares the version of the zip being uploaded to the existing application. Also checks if the zip is valid upgrader zip.
    /// </summary>
    /// <param name="filePath"></param>
    /// <param name="errormessage"></param>
    /// <returns></returns>
    public static bool IsZipValid(string filePath, ref string errormessage)
    {
        bool IsValid = false;
        string outputFolder = Path.Combine(HostingEnvironment.ApplicationPhysicalPath, @"Upgrade\UploadedFiles");
        if (!Directory.Exists(outputFolder))
            Directory.CreateDirectory(outputFolder);
        string extractPath = string.Empty;
        string configFileName = "config.xml";
        bool isConfigFileFound = ZipUtil.UnZipConfigFile(filePath, outputFolder, ref extractPath, "", true, configFileName);
        if (isConfigFileFound)
        {
            IsValid = IsNewVersion(outputFolder + @"\SystemFiles\" + configFileName);
            if (!IsValid)
            {
                errormessage = "Your site is already Upgraded with this Version!! Try Another version";
            }
        }
        else
        {
            errormessage = "This is not a valid upgrader zip";
        }
        return IsValid;
    }
}
