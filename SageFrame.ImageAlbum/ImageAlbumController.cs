using SageFrame.Web.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.ImageAlbum
{
    public class ImageAlbumController
    {
        #region Album CRUD

        public void AddNewAlbum(ImageAlbumEntity obj)
        {
            ImageAlbumDataProvider ctr = new ImageAlbumDataProvider();
            ctr.AddNewAlbum(obj);
        }


        public void DeleteAlbum(int AlbumID)
        {
            ImageAlbumDataProvider ctr = new ImageAlbumDataProvider();
            ctr.DeleteAlbum(AlbumID);
        }

        public void UpdateAlbum(ImageAlbumEntity obj)
        {
            ImageAlbumDataProvider ctr = new ImageAlbumDataProvider();
            ctr.UpdateAlbum(obj);
        }

        public List<ImageAlbumEntity> GetAllAlbum()
        {
            ImageAlbumDataProvider dp = new ImageAlbumDataProvider();
            return dp.GetAllAlbum();
        }

        #endregion

        #region Image CRUD
        public void AddImages(ImageAlbumEntity obj)
        {
            ImageAlbumDataProvider ctr = new ImageAlbumDataProvider();
            ctr.AddNewImage(obj);
        }


        public List<ImageAlbumEntity> GetImages(int AlbumID)
        {
            ImageAlbumDataProvider dp = new ImageAlbumDataProvider();
            return dp.GetImages(AlbumID);
        }

        #endregion
    }
}
