<%@ WebService Language="C#" Class="MembershipService" %>
using System.Web.Services;
using SageFrame.MediaManagement;
using SageFrame.Web;
/// <summary>
/// Summary description for CurrencyManagementService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class MembershipService : SageFrame.Services.AuthenticateService
{

    public MembershipService()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod]
    public int AddUpdate(MediaSettingInfo objMediaSetting, string userName, string secureToken)
    {
        int mediaSettingID = 0;
        MediaSettingController objDataProvider = new MediaSettingController();
        if (IsPostAuthenticatedView(objMediaSetting.PortalID, objMediaSetting.UserModuleID, userName, secureToken))
        {
            objMediaSetting.UserModuleID = 0;
            objMediaSetting.MediaSettingID = 1;
            mediaSettingID = objDataProvider.AddUpdate(objMediaSetting);
        }
        return mediaSettingID;
    }

    [WebMethod]
    public MediaSettingInfo GetSettings(MediaSettingInfo objMediaSetting, string userName, string secureToken)
    {
        MediaSettingInfo objsettingInfo = new MediaSettingInfo();
        if (IsPostAuthenticatedView(objMediaSetting.PortalID, objMediaSetting.UserModuleID, userName, secureToken))
        {
            MediaSettingController objDataProvider = new MediaSettingController();
            objsettingInfo = objDataProvider.GetByID(objMediaSetting.MediaSettingID);
        }
        return objsettingInfo;
    }
    [WebMethod]
    public bool CreateCategory(MediaCategory objMediaCategory)
    {
        bool created = false;
        if (IsPostAuthenticatedView(objMediaCategory.PortalID, objMediaCategory.UserModuleID, objMediaCategory.UserName, objMediaCategory.secureToken))
        {
            string basePath = "/";
            if (objMediaCategory.ParentCategory.Length > 0)
            {
                basePath += objMediaCategory.ParentCategory + "/";
            }
            basePath += objMediaCategory.BaseCategory;
            created = MediaHelper.CreateCategory(basePath);
        }
        return created;
    }
    [WebMethod]
    public bool RenameCategory(MediaCategory objMediaCategory, string newCategory)
    {
        bool created = false;
        if (IsPostAuthenticatedView(objMediaCategory.PortalID, objMediaCategory.UserModuleID, objMediaCategory.UserName, objMediaCategory.secureToken))
        {
            string basePath = "/";
            if (objMediaCategory.ParentCategory.Length > 0)
            {
                basePath += objMediaCategory.ParentCategory + "/";
            }
            created = MediaHelper.RenameCategory(objMediaCategory.ParentCategory + "/" + objMediaCategory.BaseCategory, objMediaCategory.ParentCategory + "/" + newCategory);
        }
        return created;
    }
    [WebMethod]
    public bool RenameFileName(MediaCategory objMediaCategory, string newCategory)
    {
        bool created = false;
        if (IsPostAuthenticatedView(objMediaCategory.PortalID, objMediaCategory.UserModuleID, objMediaCategory.UserName, objMediaCategory.secureToken))
        {
            //string basePath = "/";
            //if (objMediaCategory.ParentCategory.Length > 0)
            //{
            //    basePath += objMediaCategory.ParentCategory + "/";
            //}
            created = MediaHelper.RenameFileName(objMediaCategory.ParentCategory + "/" + objMediaCategory.BaseCategory, objMediaCategory.ParentCategory + "/" + newCategory);
        }
        return created;
    }

    [WebMethod]
    public string[] GetMediaCategory(MediaCategory objMediaCategory)
    {
        if (IsPostAuthenticatedView(objMediaCategory.PortalID, objMediaCategory.UserModuleID, objMediaCategory.UserName, objMediaCategory.secureToken))
        {
            string[] extensions = { };
            string rootPath = GetRootPath(objMediaCategory, out extensions);
            //string[] categotyList = MediaHelper.ReadDirectoryAndFiles(rootPath);
            string[] categotyList = MediaHelper.ReadDirectoryAndFiles(rootPath, string.Empty, extensions);
            return categotyList;
        }
        else
            return new string[0];
    }

    private string GetRootPath(MediaCategory objMedaicategory, out string[] extensions)
    {
        MediaSettingKeys objsettingInfo = new MediaSettingKeys();
        MediaSettingController objController = new MediaSettingController();
        objsettingInfo = objController.GetMediaSettingKeyValue();
        string rootPath = string.Empty;
        if (objsettingInfo != null)
        {
            extensions = filterExtensions(objMedaicategory, objsettingInfo);
            if (objsettingInfo.MediaReadLocation == "system")
            {
                rootPath = string.Empty;
            }
            else
            {
                rootPath = objsettingInfo.FolderName;
            }
            if (objsettingInfo.MediaVisibility == "userwise")
            {
                rootPath += "/" + objMedaicategory.UserName;
            }
        }
        else
        {
            extensions = null;
        }
        return rootPath;
    }



    [WebMethod]
    public string[] GetMediaCategoryByPath(MediaCategory objMedaicategory)
    {
        if (IsPostAuthenticatedView(objMedaicategory.PortalID, objMedaicategory.UserModuleID, objMedaicategory.UserName, objMedaicategory.secureToken))
        {
            if (objMedaicategory != null)
            {
                MediaSettingKeys objsettingInfo = new MediaSettingKeys();
                MediaSettingController objController = new MediaSettingController();
                objsettingInfo = objController.GetMediaSettingKeyValue();
                string[] extensions = filterExtensions(objMedaicategory, objsettingInfo);
                string[] categotyList = MediaHelper.ReadDirectoryAndFiles(objMedaicategory.BaseCategory, string.Empty, extensions);
                return categotyList;
            }
            else
                return new string[0];
        }
        else
            return new string[0];
    }
    [WebMethod]
    public string[] FilterMediaByPath(MediaCategory objMedaicategory)
    {
        if (IsPostAuthenticatedView(objMedaicategory.PortalID, objMedaicategory.UserModuleID, objMedaicategory.UserName, objMedaicategory.secureToken))
        {
            if (objMedaicategory != null)
            {
                string[] categotyList = MediaHelper.FileterDirectoryAndFiles(objMedaicategory.BaseCategory, objMedaicategory.Filter);
                return categotyList;
            }
            else
                return new string[0];
        }
        else
            return new string[0];
    }

    [WebMethod]
    public string SaveCroppedImage(ImageInfo objImageInfo)
    {
        string filePath = string.Empty;
        if (IsPostAuthenticatedView(objImageInfo.PortalID, objImageInfo.UserModuleID, objImageInfo.UserName, objImageInfo.secureToken))
        {
            objImageInfo = ParseImagePath(objImageInfo);
            filePath = PictureManager.SaveBase64Image(objImageInfo.ImagePath, objImageInfo.ImageName, objImageInfo.Image64Bit.Replace("data:image/jpeg;base64,", ""));
        }
        return filePath;
    }

    private ImageInfo ParseImagePath(ImageInfo objImageInfo)
    {
        if (objImageInfo != null)
        {
            objImageInfo.ImagePath = GetFilePath(objImageInfo.ImageFullPath);
            objImageInfo.ImageName = GetFileName(objImageInfo.ImageFullPath, objImageInfo.ImagePath);
        }
        return objImageInfo;
    }

    private string GetFilePath(string fullPath)
    {
        string[] filePath = fullPath.Split('/');
        int filePathLength = filePath.Length;
        string fileName = filePath[filePathLength - 1];
        fileName = fullPath.Replace(fileName, "");
        return fileName;
    }

    private string GetFileName(string fullPath, string basePath)
    {
        string[] filePath = fullPath.Split('/');
        int filePathLength = filePath.Length;
        string fileName = filePath[filePathLength - 1];
        fileName = PictureManager.NewFileName(fileName, basePath);
        return fileName;
    }

    private string[] filterExtensions(MediaCategory objMedaicategory, MediaSettingKeys objsettingInfo)
    {
        string ext = string.Empty;
        switch (objMedaicategory.UploadType)
        {
            case "image":
                ext = objsettingInfo.ImageExtension;
                break;
            case "video":
                ext = objsettingInfo.VideoExtension;
                break;
            case "document":
                ext = objsettingInfo.DocumentExtension;
                break;
            default:
                ext = objsettingInfo.ImageExtension + "," + objsettingInfo.VideoExtension + "," + objsettingInfo.DocumentExtension;
                break;
        }
        string[] extensions = ext.Split(',');
        return extensions;
    }
    [WebMethod]
    public int DownloadAndSaveImage(string downloadUrl, string downloadPath)
    {
        MediaHelper helper = new MediaHelper();
        return helper.DownloadAndSaveImage(downloadUrl, downloadPath);
    }

    [WebMethod]
    public string GetMediaFolderList(MediaCategory objMediaCategory)
    {
        string folderlist = string.Empty;
        if (IsPostAuthenticatedView(objMediaCategory.PortalID, objMediaCategory.UserModuleID, objMediaCategory.UserName, objMediaCategory.secureToken))
        {
            string[] extensions = { };
            string rootPath = GetRootPath(objMediaCategory, out extensions);
            folderlist = MediaHelper.GetDirHerarchy(rootPath);
        }
        return folderlist;
    }

    [WebMethod]
    public string DeleteMedia(MediaCategory objMediaCategory)
    {
        string message = string.Empty;
        if (IsPostAuthenticatedView(objMediaCategory.PortalID, objMediaCategory.UserModuleID, objMediaCategory.UserName, objMediaCategory.secureToken))
        {
            string[] extensions = { };
            string rootPath = GetRootPath(objMediaCategory, out extensions);
            if (objMediaCategory.UploadType == "category")
            {
                if (objMediaCategory.BaseCategory.ToLower().IndexOf(rootPath.ToLower()) > -1)
                    message = MediaHelper.DeleteMediaCategory(objMediaCategory.BaseCategory);
            }
            else
            {
                if (objMediaCategory.BaseCategory.ToLower().IndexOf(rootPath.ToLower()) > -1)
                    message = MediaHelper.DeleteMediaFile(objMediaCategory.BaseCategory);
            }
        }
        return message;
    }
    [WebMethod]
    public string CopyMedia(MediaCategory objMediaCategory)
    {
        string message = string.Empty;
        if (IsPostAuthenticatedView(objMediaCategory.PortalID, objMediaCategory.UserModuleID, objMediaCategory.UserName, objMediaCategory.secureToken))
        {
            string[] extensions = { };
            string rootPath = GetRootPath(objMediaCategory, out extensions);
            if (objMediaCategory.UploadType == "category")
            {
                if (objMediaCategory.BaseCategory.ToLower().IndexOf(rootPath.ToLower()) > -1 && objMediaCategory.ParentCategory.ToLower().IndexOf(rootPath.ToLower()) > -1)
                    message = MediaHelper.CopyMediaCategory(objMediaCategory.BaseCategory, objMediaCategory.ParentCategory);
            }
            else
            {
                if (objMediaCategory.BaseCategory.ToLower().IndexOf(rootPath.ToLower()) > -1 && objMediaCategory.ParentCategory.ToLower().IndexOf(rootPath.ToLower()) > -1)
                    message = MediaHelper.CopyMediaFile(objMediaCategory.BaseCategory, objMediaCategory.ParentCategory);
            }
        }
        return message;
    }
    [WebMethod]
    public string MoveMedia(MediaCategory objMediaCategory)
    {
        string message = string.Empty;
        if (IsPostAuthenticatedView(objMediaCategory.PortalID, objMediaCategory.UserModuleID, objMediaCategory.UserName, objMediaCategory.secureToken))
        {
            string[] extensions = { };
            string rootPath = GetRootPath(objMediaCategory, out extensions);
            if (objMediaCategory.BaseCategory.ToLower() != objMediaCategory.ParentCategory.ToLower())
            {
                if (objMediaCategory.UploadType == "category")
                {
                    if (objMediaCategory.BaseCategory.ToLower().IndexOf(rootPath.ToLower()) > -1 && objMediaCategory.ParentCategory.ToLower().IndexOf(rootPath.ToLower()) > -1)
                        message = MediaHelper.MoveMediaCategory(objMediaCategory.BaseCategory, objMediaCategory.ParentCategory);
                }
                else
                {
                    if (objMediaCategory.BaseCategory.ToLower().IndexOf(rootPath.ToLower()) > -1 && objMediaCategory.ParentCategory.ToLower().IndexOf(rootPath.ToLower()) > -1)
                        message = MediaHelper.MoveMediaFile(objMediaCategory.BaseCategory, objMediaCategory.ParentCategory);
                }
            }
        }
        return message;
    }
}