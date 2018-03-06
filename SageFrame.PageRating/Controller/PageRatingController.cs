using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.PageRating
{
    public class PageRatingController
    {
        public PageRatingController() { }

        public double GetAverageRating(int userModuleID, int portalID,string pageName)
        {
            PageRatingProvider provider = new PageRatingProvider();
            return provider.GetAverageRating(userModuleID, portalID,pageName);
        }

        public List<PageRatingCount> GetRatingCountByPage(int userModuleID, int portalID,string pageName)
        {
            PageRatingProvider provider = new PageRatingProvider();
            return provider.GetRatingCountByPage(userModuleID, portalID, pageName);
        }

        public int SavePageRating(int userModuleID, int portalID,string pageName,double ratingPoint, string userName)
        {
            PageRatingProvider provider = new PageRatingProvider();
            return provider.SavePageRating(userModuleID, portalID, pageName,ratingPoint, userName);
        }
        public PageRatingSetting GetRatingSettings(int userModuleID, int portalID,string userName)
        {
            PageRatingProvider provider = new PageRatingProvider();
            return provider.GetRatingSettings(userModuleID, portalID, userName);
        }

        public int SaveRatingSettings(PageRatingSetting objSetting,int userModuleID, int portalID, string userName)
        {
            PageRatingProvider provider = new PageRatingProvider();
            return provider.SaveRatingSettings(objSetting,userModuleID, portalID, userName);
        }

        public double GetUserRating(int userModuleID, int portalID, string pageName, string userName)
        {
            PageRatingProvider provider = new PageRatingProvider();
            return provider.GetUserRating(userModuleID, portalID, pageName, userName);
        }
    }
}
