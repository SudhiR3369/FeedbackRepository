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
        public void AddNewImage(ImageAlbumEntity obj)
        {
            ImageAlbumDataProvider ctr = new ImageAlbumDataProvider();
            ctr.AddNewImage(obj);
        }

        public void AddNewAlbum(ImageAlbumEntity obj)
        {
            ImageAlbumDataProvider ctr = new ImageAlbumDataProvider();
            ctr.AddNewAlbum(obj);
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
    }
}
