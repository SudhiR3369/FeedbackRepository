using System;
using SageFrame.Web;
using System.IO;
using System.Text;

public partial class Modules_JsInjector_JsInjectorEdit : BaseAdministrationUserControl
{
    int userModuleID = 0;
    private string directoryPath = string.Empty;
    string fileName = "script_";
    protected void Page_Load(object sender, EventArgs e)
    {
        directoryPath = Server.MapPath("~/Modules/JsInjector/js");
        userModuleID = int.Parse(SageUserModuleID);
        if (!IsPostBack)
        {
            GetFileContentByUserModuleID();
        }
    }
    private void GetFileContentByUserModuleID()
    {
        fileName += userModuleID + ".js";
        string filePath = directoryPath + "\\" + fileName;
        if (filePath != string.Empty)
        {
            if (File.Exists(filePath))
            {
                string fileContents = string.Empty;
                using (StreamReader streamReader = new StreamReader(filePath, Encoding.UTF8))
                {
                    fileContents = streamReader.ReadToEnd();
                }
                txtScript.InnerText = fileContents;
            }
        }
    }
    protected void btnSaveContent_Click(object sender, EventArgs e)
    {
        bool exists = Directory.Exists(directoryPath);

        if (!exists)
            Directory.CreateDirectory(directoryPath);
        fileName += userModuleID + ".js";
        string filePath = directoryPath + "\\" + fileName;        
        string memString = txtScript.InnerText;
        // convert string to stream
        if (memString != string.Empty)
        {
            byte[] buffer = Encoding.ASCII.GetBytes(memString);
            using (MemoryStream ms = new MemoryStream(buffer))
            {
                //write to file
                using (FileStream file = new FileStream(filePath, FileMode.Create, FileAccess.Write))
                {
                    ms.WriteTo(file);
                }
            }
        }
        ShowMessage("", "File Save Successfully.", "", SageMessageType.Success);
    }
}