using SageFrame.Web.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.PageRating
{
    public class PageRatingProvider
    {
        public PageRatingProvider() { }

        internal double GetAverageRating(int userModuleID, int portalID,string pageName)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@UserModuleID", userModuleID));
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            param.Add(new KeyValuePair<string, object>("@PageName", pageName));
            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteAsScalar<double>("[dbo].[usp_Rating_GetAverageRating]", param);
            }
            catch
            {
                throw;
            }
        }

        internal int SavePageRating(int userModuleID, int portalID, string pageName,double ratingPoint, string userName)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();            
            param.Add(new KeyValuePair<string, object>("@PageName",pageName));
            param.Add(new KeyValuePair<string, object>("@RatingPoint", ratingPoint));
            param.Add(new KeyValuePair<string, object>("@UserModuleID", userModuleID));
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            param.Add(new KeyValuePair<string, object>("@UserName", userName));

            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteNonQuery("[dbo].[usp_Rating_SavePageRating]", param, "@output");
            }
            catch
            {
                throw;
            }
        }

        internal double GetUserRating(int userModuleID, int portalID, string pageName, string userName)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@PageName", pageName));
            param.Add(new KeyValuePair<string, object>("@UserModuleID", userModuleID));
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            param.Add(new KeyValuePair<string, object>("@UserName", userName));

            SQLHandler sagesql = new SQLHandler();
            try
            {
                double ratingVal= sagesql.ExecuteAsScalar<double>("[dbo].[usp_Rating_GetUserRating]", param);
                return ratingVal;
            }
            catch
            {
                throw;
            }
        }

        internal List<PageRatingCount> GetRatingCountByPage(int userModuleID, int portalID, string pageName)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@PageName", pageName));
            param.Add(new KeyValuePair<string, object>("@UserModuleID", userModuleID));
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));

            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteAsList<PageRatingCount>("[dbo].[usp_Rating_GetRatingCountByPage]", param);
            }
            catch
            {
                throw;
            }
        }

        internal PageRatingSetting GetRatingSettings(int userModuleID, int portalID,string userName)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@UserModuleID", userModuleID));
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            param.Add(new KeyValuePair<string, object>("@UserName", userName));

            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteAsObject<PageRatingSetting>("[dbo].[usp_Rating_GetSettings]", param);
            }
            catch
            {
                throw;
            }
        }

        internal int SaveRatingSettings(PageRatingSetting objSetting, int userModuleID, int portalID,string userName)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@RatingTitle", objSetting.RatingTitle));
            param.Add(new KeyValuePair<string, object>("@RatingPoint", objSetting.RatingPoint));
            param.Add(new KeyValuePair<string, object>("@IsRatingEditEnable", objSetting.IsRatingEditEnable));
            param.Add(new KeyValuePair<string, object>("@UserModuleID", userModuleID));
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            param.Add(new KeyValuePair<string, object>("@UserName", userName));

            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteNonQuery("[dbo].[usp_Rating_SaveRatingSettings]", param, "@output");
            }
            catch
            {
                throw;
            }
        }
    }
}
