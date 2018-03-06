<%@ WebHandler Language="C#" Class="UploadHandler" %>

using System;
using System.Web;
using System.IO;
using SageFrame.Services;
using Newtonsoft.Json;
public class UploadHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {

        int portalID = int.Parse(HttpContext.Current.Request.QueryString["portalID"].ToString());
        int userModuleID = int.Parse(HttpContext.Current.Request.QueryString["userModuleID"].ToString());
        string userName = HttpContext.Current.Request.QueryString["userName"].ToString();
        string secureToken = HttpContext.Current.Request.QueryString["secureToken"].ToString();
        AuthenticateService objAuthentication = new AuthenticateService();
        ReturnMessage objReturnMsg = new ReturnMessage();
        objReturnMsg.Status = 0;
        if (objAuthentication.IsPostAuthenticatedView(portalID, userModuleID, userName, secureToken))
        {

            try
            {
                string retMsg = string.Empty;
                string Location = HttpContext.Current.Request.QueryString["LocationName"].ToString();
                string TemplateName = HttpContext.Current.Request.QueryString["TemplateName"].ToString();
                if (HttpContext.Current.Request.Files.Count > 0)
                {
                    HttpPostedFile file = HttpContext.Current.Request.Files[0];


                    string strFileName = Path.GetFileName(HttpContext.Current.Request.Files[0].FileName);
                    string strExtension = Path.GetExtension(HttpContext.Current.Request.Files[0].FileName).ToLower();
                    string strBaseLocation = GetLocation(Location, TemplateName);
                    if (Location == "FavIcon")
                               strFileName = "favicon.ico";
                    string strSaveLocation = GetLocation(Location, TemplateName) + strFileName;
                    object obj = new object();
                    lock (obj)
                    {
                        if (!Directory.Exists(strBaseLocation))
                        {
                            Directory.CreateDirectory(strBaseLocation);
                        }
                    }

                    HttpContext.Current.Request.Files[0].SaveAs(strSaveLocation);
                    objReturnMsg.Status = 1;
                    objReturnMsg.Message = "File Upload Success";
                    objReturnMsg.FileName = strFileName;

                }
            }
            catch (Exception ex)
            {
                objReturnMsg.Message = ex.Message;
            }

        }
        else
        {
            objReturnMsg.Message = "Authentication Error!!!!";
        }
        HttpContext.Current.Response.ContentType = "application/json";
        HttpContext.Current.Response.Write(JsonConvert.SerializeObject(objReturnMsg));
        HttpContext.Current.Response.End();
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
    public string GetLocation(string LocationName, string TemplateName)
    {
        string Location = string.Empty;

        switch (LocationName)
        {
            case "FavIcon":
                Location = HttpContext.Current.Server.MapPath("~/");
                if (TemplateName == "Default")
                    Location = HttpContext.Current.Server.MapPath("~/Core/Template/");
                else
                    Location = HttpContext.Current.Server.MapPath("~/Templates/" + TemplateName + "/");
                break;
            case "FullImageBg":
                if (TemplateName == "Default")
                    Location = HttpContext.Current.Server.MapPath("~/Core/Template/images/");
                else
                    Location = HttpContext.Current.Server.MapPath("~/Templates/" + TemplateName + "/images/");
                break;
            case "CustomFont":
                if (TemplateName == "Default")
                    Location = HttpContext.Current.Server.MapPath("~/Core/Template/fonts/");
                else
                    Location = HttpContext.Current.Server.MapPath("~/Templates/" + TemplateName + "/fonts/");
                break;
            case "CustomPattern":
                if (TemplateName == "Default")
                    Location = HttpContext.Current.Server.MapPath("~/Core/Template/images/pattern/");
                else
                    Location = HttpContext.Current.Server.MapPath("~/Templates/" + TemplateName + "/images/pattern/");
                break;


        }
        return Location;
    }
    public class ReturnMessage
    {
        public int Status { get; set; }
        public string FileName { get; set; }
        public string Message { get; set; }
    }
}