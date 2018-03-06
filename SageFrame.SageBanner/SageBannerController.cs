using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.SageBanner
{
    public class SageBannerController
    {
        public void InsertUpdateBanner(SageBannerInfo obj)
        {
            SageBannerProvider objProvider = new SageBannerProvider();
            objProvider.InsertUpdateBanner(obj);
        }
        public void DeleteBannerByBannerID(int BannerID, string userName)
        {
            SageBannerProvider objProvider = new SageBannerProvider();
            objProvider.DeleteBannerByBannerID(BannerID, userName);
        }
        public SageBannerInfo GetBannerByID(int BannerID)
        {
            SageBannerProvider objProvider = new SageBannerProvider();
            return objProvider.GetBannerByID(BannerID);
        }
        public List<SageBannerInfo> GetallBanner(int portalID, int userModuleID, string culture)
        {
            SageBannerProvider objProvider = new SageBannerProvider();
            return objProvider.GetallBanner(portalID, userModuleID, culture);
        }
    }
}
