<%@ WebService Language="C#" Class="ArticleSubscribe" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SageFrame.Services;
using SageFrame.ArticleManagement;
using System.Net;
using System.IO;
using System.Data;
using System.Data.SqlClient;
using System.Xml;
using Newtonsoft.Json;
using System.Globalization;

/// <summary>
/// Summary description for ArticleSubscribe
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ArticleSubscribe : AuthenticateService
{
    ArticleSubscribeController subsController;
    ArticleController objController;
    public ArticleSubscribe()
    {
        subsController = new ArticleSubscribeController();
        objController = new ArticleController();
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public int AddUpdateSubscription(ArticleSubscribeInfo subsObj)
    {
        string publicIp;
        IPData location;
        try
        {
            publicIp = GetIPAddressPublic();
            location = GetLocation(publicIp);
            if (publicIp != "")
            {
                subsObj.IpAddress = "Ip= " + publicIp + ", Country= " + location.country + ", City= " + location.city + ", ISP= " + location.isp;
            }
            else
            {
                subsObj.IpAddress = "Ip Not Traced";
            }
            return subsController.AddUpdateSubscription(subsObj);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public int UnSubscription(Guid SubscribeID)
    {
        try
        {
            return subsController.UnSubscription(SubscribeID);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public string CheckDuplicateEmail(string Email)
    {
        try
        {
            return subsController.CheckDuplicateEmail(Email);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public string GetIPAddressPublic()
    {
        String address = "";
        WebRequest request = WebRequest.Create("http://checkip.dyndns.org/");
        using (WebResponse response = request.GetResponse())
        using (StreamReader stream = new StreamReader(response.GetResponseStream()))
        {
            address = stream.ReadToEnd();
        }
        int first = address.IndexOf("Address: ") + 9;
        int last = address.LastIndexOf("</body>");
        address = address.Substring(first, last - first);
        return address;
    }

    public IPData GetLocation(string varIPAddress)
    {
        WebClient client = new WebClient();
        // Make an api call and get response.
        try
        {
            string response = client.DownloadString("http://ip-api.com/json/" + varIPAddress);
            //Deserialize response JSON
            IPData ipdata = JsonConvert.DeserializeObject<IPData>(response);
            if (ipdata.status == "fail")
            {
                throw new Exception("Invalid IP");
            }

            return ipdata;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public List<CategoryInfo> GetCategoryAll(int SiteID)
    {
        try
        {
            return objController.GetCategoryAll(SiteID);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public void DeleteSubscription(int SubscribeUserID, CommonAuthParam commonAuth)
    {
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                subsController.DeleteSubscription(SubscribeUserID);
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public List<ArticleSubscribeInfo> SearchAllSubs(int PageNumber, int PageSize, ArticleSubscribeInfo objInfo, CommonAuthParam commonAuth)
    {
        try
        {
            if (IsPostAuthenticated(commonAuth.PortalID, commonAuth.UserModuleID, commonAuth.UserName, commonAuth.SecureToken))
            {
                return subsController.SearchAllSubs(PageNumber, PageSize, objInfo);
            }
            else
            {
                return null;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public ArticleSubscribeInfo GetCategoryBySubID(string UserEmail)
    {
        try
        {
            return subsController.GetCategoryBySubID(UserEmail);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

}

public class IPData
{
    public string status { get; set; }
    public string country { get; set; }
    public string countryCode { get; set; }
    public string region { get; set; }
    public string regionName { get; set; }
    public string city { get; set; }
    public string zip { get; set; }
    public string lat { get; set; }
    public string lon { get; set; }
    public string timezone { get; set; }
    public string isp { get; set; }
    public string org { get; set; }
    public string @as { get; set; }
    public string query { get; set; }
}


