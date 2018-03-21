using SageFrame.Web.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.ImageAlbum
{
    public class ImageAlbumDataProvider
    {
        public void AddNewAlbum(ImageAlbumEntity obj)
        {
            try
            {
                List<KeyValuePair<string, object>> para = new List<KeyValuePair<string, object>>();
                para.Add(new KeyValuePair<string, object>("@AlbumName", obj.AlbumName));
              //  para.Add(new KeyValuePair<string, object>("@AddedOn", obj.AddedOn));
                SQLHandler SQL = new SQLHandler();
                SQL.ExecuteNonQuery("usp_ImageAlbum_AddNewAlbum", para);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public void AddNewImage(ImageAlbumEntity obj)
        {
            try
            {
                List<KeyValuePair<string, object>> para = new List<KeyValuePair<string, object>>();
                para.Add(new KeyValuePair<string, object>("@ImageName", obj.ImageName));
                para.Add(new KeyValuePair<string, object>("@ImagePath", obj.ImagePath));
                para.Add(new KeyValuePair<string, object>("@AlbumID", obj.AlbumID));
              //  para.Add(new KeyValuePair<string, object>("@AddedOn", obj.AddedOn));


                SQLHandler SQL = new SQLHandler();
                SQL.ExecuteNonQuery("usp_ImageAlbum_AddNewImages", para);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
