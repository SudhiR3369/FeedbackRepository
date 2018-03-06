using SageFrame.Web.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.SageBanner
{
    public class SageBannerProvider
    {
        public List<SageBannerInfo> GetallBanner(int portalID, int userModuleID, string culture)
        { 
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
                param.Add(new KeyValuePair<string, object>("@UserModuleID", userModuleID));
                param.Add(new KeyValuePair<string, object>("@Culture", culture));
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<SageBannerInfo>("[dbo].[usp_SageBannerGetAllBanner]", param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public SageBannerInfo GetBannerByID(int BannerID)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@BannerID", BannerID));
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsObject<SageBannerInfo>("[dbo].[usp_SageBannerGetByBannerID]", param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public  void DeleteBannerByBannerID(int BannerID,string userName)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@BannerID", BannerID));
                param.Add(new KeyValuePair<string, object>("@DeletedBy", userName));

                SQLHandler sagesql = new SQLHandler();
                sagesql.ExecuteNonQuery("[dbo].[usp_SageBannerDeleteByBannerID]", param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void InsertUpdateBanner(SageBannerInfo obj)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@BannerID", obj.BannerID));
                param.Add(new KeyValuePair<string, object>("@BannerImageName", obj.BannerImageName));
                param.Add(new KeyValuePair<string, object>("@BannerSloganTitle", obj.BannerSloganTitle));
                param.Add(new KeyValuePair<string, object>("@BannerSlogan", obj.BannerSlogan));
                param.Add(new KeyValuePair<string, object>("@LinkButtonName", obj.LinkButtonName));
                param.Add(new KeyValuePair<string, object>("@LinkUrl", obj.LinkUrl));
                param.Add(new KeyValuePair<string, object>("@PortalID", obj.PortalID));
                param.Add(new KeyValuePair<string, object>("@UserModuleID", obj.UserModuleID));
                param.Add(new KeyValuePair<string, object>("@Culture", obj.Culture));
                param.Add(new KeyValuePair<string, object>("@IsActive", obj.IsActive));
                param.Add(new KeyValuePair<string, object>("@AddedBy", obj.AddedBy));

                SQLHandler sagesql = new SQLHandler();
                sagesql.ExecuteNonQuery("[dbo].[usp_SageBannerAddUpdate]", param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
