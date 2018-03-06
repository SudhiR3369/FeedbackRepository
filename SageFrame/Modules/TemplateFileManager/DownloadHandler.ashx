<%@ WebHandler Language="C#" Class="DownloadHandler" %>

using System;
using System.Web;
using System.IO;
using SageFrame.Web;
using System.Collections.Generic;
using System.Web.Security;
using SageFrame.FileManager;
using SageFrame.Services;

public class DownloadHandler : IHttpHandler
{



    public void ProcessRequest(HttpContext context)
    {
        string FileName = context.Request.QueryString["FileName"].ToString();
        string FolderName = context.Request.QueryString["FolderName"].ToString();
        string filepath = Path.Combine(FolderName, FileName);

        int userModuleID = int.Parse(context.Request.QueryString["userModuleId"].ToString());
        int portalID = int.Parse(context.Request.QueryString["portalID"].ToString());
        string userName = context.Request.QueryString["userName"].ToString();
        string secureToken = context.Request.QueryString["secureToken"].ToString();
        AuthenticateService objAuthentication = new AuthenticateService();

        if (objAuthentication.IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {
            DownloadFile(context, filepath);
        }
    }
    public static string GetAbsolutePath(string filepath)
    {
        return (FileManagerHelper.ReplaceBackSlash(Path.Combine(HttpContext.Current.Request.PhysicalApplicationPath.ToString(), filepath)));
    }

    public void DownloadFile(HttpContext context, string filepath)
    {

        FileInfo file = new FileInfo(GetAbsolutePath(filepath));
        string actualFileName = file.Name.Substring(0, file.Name.LastIndexOf("."));
        if (file.Exists)
        {
            context.Response.ClearContent();
            context.Response.AddHeader("Content-Disposition", "attachment; filename=" + file.Name.Replace(' ', '_'));
            context.Response.ContentType = FileManagerHelper.ReturnExtension(Path.GetExtension(file.Name));
            context.Response.TransmitFile(file.FullName);
            context.Response.End();
        }
    }
    public void DownloadSecureFile(HttpContext context, string filepath)
    {

        FileInfo file = new FileInfo(GetAbsolutePath(filepath + ".resources"));

        if (file.Exists)
        {
            context.Response.ClearContent();
            context.Response.AddHeader("Content-Disposition", "attachment; filename=" + file.Name.Replace(' ', '_').Replace(".resources", ""));
            context.Response.ContentType = FileManagerHelper.ReturnExtension(Path.GetExtension(filepath));
            context.Response.TransmitFile(file.FullName);
            context.Response.End();
        }
    }

  

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}