using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.ImageAlbum
{
    public class ImageAlbumEntity
    {
        public int AlbumID { get; set; }
        public string AlbumName { get; set; }
        public DateTime AddedOn { get; set; }        
        public int ImageID { get; set; }
        public string ImageName { get; set; }
        public string ImageExtension { get; set; }
        public string ImagePath { get; set; }
        public int UserModuleID { get; set; }
        public int PortalID { get; set; }
        public int CultureCode { get; set; }
    }
}
