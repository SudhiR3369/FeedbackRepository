using SageFrame.Web.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.SEOManagement
{
    public class SEOProvider
    {
        public SEOProvider() { }

        internal List<SEOMetaType> GetSEOMetaType()
        {
            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteAsList<SEOMetaType>("[dbo].[usp_SEO_GetSEOMetaType]");
            }
            catch
            {
                throw;
            }
        }

        internal List<SEOMetaValues> GetSEOMetaValuesByPageId(int pageID, int userModuleID, int portalID)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@PageID", pageID));
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteAsList<SEOMetaValues>("[dbo].[usp_SEO_GetSEOMetaValuesByPageId]", param);
            }
            catch
            {
                throw;
            }
        }

        internal int SaveSEOMetaTag(int pageID, DataTable metaTagTable, string seoValue, int portalID, string userName)
        {
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@PageID", pageID));
            param.Add(new KeyValuePair<string, object>("@SEOValue", seoValue));
            param.Add(new KeyValuePair<string, object>("@MetaTagTable", metaTagTable));
            param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
            param.Add(new KeyValuePair<string, object>("@UserName", userName));

            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteNonQuery("[dbo].[usp_SEO_SaveSEOMetaValues]", param, "@output");
            }
            catch(Exception ex)
            {
                throw;
            }
        }
        internal List<SEOMetaType> GetSeoTags()
        {
            SQLHandler sagesql = new SQLHandler();
            try
            {
                return sagesql.ExecuteAsList<SEOMetaType>("[dbo].[usp_SEO_GetMetaTags]");
            }
            catch
            {
                throw;
            }
        }
    }
}
