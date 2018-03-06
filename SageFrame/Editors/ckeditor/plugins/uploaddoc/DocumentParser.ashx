<%@ WebHandler Language="C#" Class="DocumentParser" %>

using System;
using System.Web;
using SageFrame.WordProcessor;
using System.IO;
using SageFrame.Services;

public class DocumentParser : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        string result = string.Empty;

        int userModuleID = int.Parse(HttpContext.Current.Request.QueryString["userModuleId"].ToString());
        int portalID = int.Parse(HttpContext.Current.Request.QueryString["portalID"].ToString());
        string userName = HttpContext.Current.Request.QueryString["userName"].ToString();
        string secureToken = HttpContext.Current.Request.QueryString["sageFrameSecureToken"].ToString();
        AuthenticateService objAuthentication = new AuthenticateService();
        if (objAuthentication.IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            string supportedFileExtension = ".docx";

            HttpRequest request = HttpContext.Current.Request;
            HttpFileCollection fileCollection = request.Files;
            if (fileCollection != null && fileCollection.Count > 0)
            {
                HttpPostedFile postFile = fileCollection[0];

                if (postFile != null && postFile.ContentLength > 0)
                {
                    if (Path.GetExtension(postFile.FileName) == supportedFileExtension)
                    {
                        if (postFile.ContentLength > 5242880)
                            result = GenerateErrorMessage(" File size should be less than 5 MB ");
                        else
                        {
                            string strBaseLocation = HttpContext.Current.Server.MapPath("~/Upload/");
                            if (!Directory.Exists(strBaseLocation))
                                Directory.CreateDirectory(strBaseLocation);

                            string newFileName = GetUniqueFileName(strBaseLocation, postFile.FileName);

                            string tempFilePath = strBaseLocation + @"\" + newFileName;

                            postFile.SaveAs(tempFilePath);

                            try
                            {
                                DocxToHtml procesor = new DocxToHtml();
                                result = procesor.ConvertToHtml(tempFilePath);
                            }
                            catch
                            {
                                result = GenerateErrorMessage(" The document seems to be corrupted  ");
                            }
                            if (File.Exists(tempFilePath))
                                TryDeletingFile(tempFilePath);
                        }
                    }
                    else
                        result = GenerateErrorMessage(" Unsupported file format : " + postFile.FileName + " is invalid, allowed extension(s): " + supportedFileExtension);

                    postFile.InputStream.Dispose();
                    postFile.InputStream.Flush();
                    postFile.InputStream.Close();
                }

            }
        }

        context.Response.ContentType = "text/plain";
        context.Response.Write(result);
        context.Response.End();
    }

    private string GenerateErrorMessage(string message)
    {
        return "<div style='color: red;' > " + message.Trim() + "  </div>";
    }


    private void TryDeletingFile(string tempFilePath)
    {
        try { File.Delete(tempFilePath); }
        catch { }
    }
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }


    public string GetUniqueFileName(string strBaseLocation, string fileName)
    {
        int i = 1;
        string FileName = fileName.Substring(0, fileName.LastIndexOf(@"."));
        string ext = fileName.Substring(fileName.LastIndexOf(@"."));
        string newFileName = FileName + ext;
        bool flag = false;
        while (!flag)
        {
            if (!File.Exists(strBaseLocation + newFileName)) break;
            newFileName = FileName + i + ext;
            i++;
        }
        return newFileName;
    }


}