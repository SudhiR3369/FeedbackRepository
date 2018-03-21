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
    }
}
