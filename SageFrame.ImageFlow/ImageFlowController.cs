using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.ImageFlow
{
    public class ImageFlowController
    {
        public void AddUpdateSetting(ImageFlowSettingInfo objInfo)
        {
            ImageFlowDataProvider ObjProv = new ImageFlowDataProvider();
            ObjProv.AddUpdateSetting(objInfo);
        }
        public ImageFlowSettingInfo GetSetting(int userModuleID, int portalID)
        {
            ImageFlowDataProvider ObjProv = new ImageFlowDataProvider();
            return ObjProv.GetSetting(userModuleID, portalID);
        }
        public void AddUpdateImages(ImageFlowInfo objInfo)
        {
            ImageFlowDataProvider ObjProv = new ImageFlowDataProvider();
            ObjProv.AddUpdateImages(objInfo);
        }
        public List<ImageFlowInfo> GetAllImages(int userModuleID, int portalID, string CultureCode)
        {
            ImageFlowDataProvider ObjProv = new ImageFlowDataProvider();
            return ObjProv.GetAllImages(userModuleID, portalID, CultureCode);
        }
        public ImageFlowInfo GetImagesByID(int BannerID)
        {
            ImageFlowDataProvider ObjProv = new ImageFlowDataProvider();
            return ObjProv.GetImagesByID(BannerID);
        }
        public void DeleteImagesByID(int BannerID)
        {
            ImageFlowDataProvider ObjProv = new ImageFlowDataProvider();
            ObjProv.DeleteImagesByID(BannerID);
        }
        public void ChangeDisplayOrder(int BannerID,bool IsSortUp)
        {
            ImageFlowDataProvider ObjProv = new ImageFlowDataProvider();
            ObjProv.ChangeDisplayOrder(BannerID, IsSortUp);
        }
    }
}
