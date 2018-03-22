<%@ WebService Language="C#" Class="ImageAlbum" %>
using SageFrame.ImageAlbum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for ImageAlbum
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ImageAlbum : System.Web.Services.WebService
{

    public ImageAlbum()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public void AddNewAlbum(ImageAlbumEntity objAlbum)
    {
        try
        {
            ImageAlbumController ctr = new ImageAlbumController();
            ctr.AddNewAlbum(objAlbum);
        }
        catch(Exception ex)
        {
            throw ex;
        }

    }

    //[WebMethod]
    //public List<ImageAlbumEntity> GetAllAlbum()
    //{
    //        ImageAlbumController ctrl = new ImageAlbumController();
    //       return ctrl.GetAllAlbum();
    //}

}
