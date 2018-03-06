<%@ WebHandler Language="C#" Class="UploadHandler" %>
using System.Collections.Generic;
using System;
using System.Drawing;
using System.Web;
using System.IO;
using SageFrame.Web;
using SageFrame.Services;
using SageFrame.MediaManagement;
using System.Text.RegularExpressions;
using System.Linq;


public class UploadHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        int userModuleID = int.Parse(HttpContext.Current.Request.QueryString["userModuleId"].ToString());
        int portalID = int.Parse(HttpContext.Current.Request.QueryString["portalID"].ToString());
        string userName = HttpContext.Current.Request.QueryString["userName"].ToString();
        string secureToken = HttpContext.Current.Request.QueryString["sageFrameSecureToken"].ToString();
        string fileextension = HttpContext.Current.Request.QueryString["fileExtension"].ToString();
        string strBaseLocation = HttpContext.Current.Request.QueryString["savaPath"].ToString();
        string enQuality = HttpContext.Current.Request.QueryString["encodeQuality"].ToString();
        string type = HttpContext.Current.Request.QueryString["mediaType"].ToString();
        AuthenticateService objAuthentication = new AuthenticateService();
        if (objAuthentication.IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            bool isValidFile = false;
            string validExtension = string.Empty;
            string retFilePath = string.Empty;
            string dirBaseLocation = string.Empty;
            string retMsg = "0###fail";
            string filename = string.Empty;
            string newFileName = string.Empty;
            HttpRequest Request = HttpContext.Current.Request;
            string fileExt = fileextension.ToString();
            string[] allowExtensions = fileExt.Split(',');
            long encodeQuality = 10L;
            if (enQuality != null && enQuality.ToString().Length > 0)
            {
                long.TryParse(enQuality, out encodeQuality);
            }
            if (Request.Files != null)
            {
                HttpFileCollection files = Request.Files;
                for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFile file = files[i];
                    if (file.ContentLength > 0)
                    {
                        MediaSettingKeys objsettingInfo = new MediaSettingKeys();
                        MediaSettingController objController = new MediaSettingController();
                        objsettingInfo = objController.GetMediaSettingKeyValue();
                        if (objsettingInfo != null)
                        {
                            string ext = string.Empty;
                            switch (type)
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
                            allowExtensions = ext.Split(',');
                        }

                        string extension = GetExtension(file.FileName.ToLower()).ToLower();
                      if (extension == "gif" && strBaseLocation == "/Modules/ArticleAdmin/AdvertisementAdmin/images/original/default/")
                        {
                            strBaseLocation = "/Modules/ArticleAdmin/AdvertisementAdmin/images/cropped/default/";
                        }
                        else if (extension == "gif" && strBaseLocation == "/Modules/ArticleAdmin/AdvertisementAdmin/images/original/mobile/")
                        {
                            strBaseLocation = "/Modules/ArticleAdmin/AdvertisementAdmin/images/cropped/mobile/";
                        }   
                        if (IsValidExtension(allowExtensions, extension))
                        {
                            isValidFile = true;
                            retMsg = "0###Valid file Extension";
                        }
                        else
                        {
                            isValidFile = false;
                            retMsg = "0###Not valid file Extension";
                        }
                        if (isValidFile)
                        {
                            try
                            {
                                //if (allowExtensions[0] != "zip")
                                //{
                                //    System.Drawing.Image img = System.Drawing.Image.FromStream(file.InputStream, true, true);
                                //}
                            }
                            catch (Exception)
                            {
                                retMsg = "0###Large Image Pixel";
                                context.Response.ContentType = "text/plain";
                                context.Response.Write(retMsg);
                                return;
                            }

                            filename = Path.GetFileName(file.FileName.Replace(" ", "_"));
                            newFileName = PictureManager.NewFileName(filename.ToLower(), strBaseLocation);
                            dirBaseLocation = HttpContext.Current.Server.MapPath("~/" + strBaseLocation);
                            string originalPath = string.Empty;
                            string screenshotPath = string.Empty;

                            if (!Directory.Exists(dirBaseLocation))
                            {
                                Directory.CreateDirectory(dirBaseLocation);
                            }
                            string filePath = dirBaseLocation + newFileName;
                            retFilePath = retFilePath + filename + ',';
                            bool isImage = CheckImage(extension, objsettingInfo.ImageExtension);
                            // New Code To Remove Scale
                            objsettingInfo.ScaleImage = 0;
                            if (isImage && (objsettingInfo.OptimizeImage || (objsettingInfo.ScaleImage > 0 && objsettingInfo.ScaleImage < 100)))
                            {
                                string tempBaseLocation = HttpContext.Current.Server.MapPath("~/Temp");
                                if (!Directory.Exists(tempBaseLocation))
                                {
                                    Directory.CreateDirectory(tempBaseLocation);
                                }
                                string tempImagePath = tempBaseLocation + @"\" + newFileName;
                                file.SaveAs(tempImagePath);
                                file.InputStream.Dispose();
                                file.InputStream.Flush();
                                file.InputStream.Close();
                                string optimizeImagePath = tempImagePath;

                                //optimize and scale
                                if (objsettingInfo.OptimizeImage && (objsettingInfo.ScaleImage > 0 && objsettingInfo.ScaleImage < 100))
                                {
                                    PictureManager.ScaleAndOptimizeImage(tempImagePath, filePath, objsettingInfo.ScaleImage, encodeQuality);
                                    PictureManager.DeleteImageByFullPath(tempImagePath);
                                }
                                else
                                {
                                    //only scale
                                    if ((objsettingInfo.ScaleImage > 0 && objsettingInfo.ScaleImage < 100))
                                    {
                                        PictureManager.ScaleImage(tempImagePath, objsettingInfo.ScaleImage, filePath);
                                        optimizeImagePath = filePath;
                                        PictureManager.DeleteImageByFullPath(tempImagePath);
                                    }
                                    //only  optimize
                                    if (objsettingInfo.OptimizeImage)
                                    {
                                        PictureManager.OptimizeImage(tempImagePath, filePath, encodeQuality);
                                        PictureManager.DeleteImageByFullPath(tempImagePath);
                                    }
                                }
                            }
                            else
                            {
                                file.SaveAs(filePath);
                                string ThumbPath =HttpContext.Current.Server.MapPath("/Modules/ArticleAdmin/AdvertisementAdmin/images/thumb/");
                                if (!Directory.Exists(ThumbPath))
                                    Directory.CreateDirectory(ThumbPath);
                                PictureManager.CreateThmnail(filePath, 180,ThumbPath+newFileName);
                            }
                            retMsg = "1###" + retFilePath.TrimEnd(',').Replace("." + extension, "").Replace("_", " ") + "###" + newFileName;

                        }
                    }
                }
                context.Response.ContentType = "text/plain";
                context.Response.Write(retMsg);
            }
        }
        else
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write("You are in Logout state!!");
        }
    }
    private bool DuplicateFolderName(string fileName, string strBaseLocation)
    {
        string folder = HttpContext.Current.Server.MapPath("~/" + strBaseLocation);
        var file = Directory.GetFiles(folder, fileName, SearchOption.AllDirectories)
                    .FirstOrDefault();
        if (file == null)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    private bool CheckImage(string extension, string extensions)
    {
        bool isImage = false;
        string[] ext = extensions.Split(',');
        int extensionLength = ext.Length;
        for (int i = 0; i < extensionLength; i++)
        {
            if (ext[i] == extension)
            {
                isImage = true;
                break;
            }
        }
        return isImage;

    }

    private string GetExtension(string fileName)
    {
        int index = fileName.LastIndexOf('.');
        string ext = fileName.Substring(index + 1, (fileName.Length - index) - 1);
        return ext;
    }



    public bool IsValidExtension(string[] array, string ext)
    {
        bool found = false;
        foreach (string s in array)
        {
            if (s.Equals(ext))
            {
                found = true;
                break;
            }
        }
        return found;
    }
    private bool callback()
    {
        return true;
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
    private string getDate()
    {
        return DateTime.Now.ToString("yyyy_MM_dd_HH_mm_ss");
    }

    public void SaveThumbnailImages(string ImageFilePath, int TargetSize, string TargetLocation, string fileName)
    {
        try
        {
            string SavePath = string.Empty;
            SavePath = TargetLocation + fileName;
            PictureManager.CreateThmnail(ImageFilePath, TargetSize, SavePath);
        }
        catch (Exception)
        {

        }
    }
}   