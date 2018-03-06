using SageFrame.Web;
using SageFrame.Web.Common.SEO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.SEOManagement
{
    public class SEOController
    {
        public SEOController() { }

        public List<SEOMetaType> GetSEOMetaType()
        {
            SEOProvider provider = new SEOProvider();
            return provider.GetSEOMetaType();
        }
        public List<SEOMetaValues> GetSEOMetaValuesByPageId(int pageID, int userModuleID, int portalID)
        {
            SEOProvider provider = new SEOProvider();
            return provider.GetSEOMetaValuesByPageId(pageID, userModuleID, portalID);
        }
        public int SaveSEOMetaTag(int pageID, List<SEOMetaValues> objTagValue, int portalID, string userName)
        {
            SEOProvider provider = new SEOProvider();
            DataTable tagTable = new DataTable();
            tagTable.Columns.Add("RowNum");
            tagTable.Columns.Add("SEOMetaTagTypeID");
            tagTable.Columns.Add("MetaTagContent");
            if (objTagValue.Count > 0)
            {
                int count = 1;
                foreach (SEOMetaValues item in objTagValue)
                {
                    DataRow dr = tagTable.NewRow();
                    dr["RowNum"] = count;
                    dr["SEOMetaTagTypeID"] = item.SEOMetaTagTypeID;
                    dr["MetaTagContent"] = item.MetaTagContent;
                    tagTable.Rows.Add(dr);
                    count++;
                }
            }
            string seoValue = string.Empty;
            string pageTitle = string.Empty;
            List<SEOMetaType> seoTagList = provider.GetSeoTags();
            List<SEOAttribute> objSeoAttributeList = new List<SEOAttribute>();
            foreach (SEOMetaValues objseoMeta in objTagValue)
            {
                foreach (SEOMetaType seoMetaType in seoTagList)
                {
                    if (seoMetaType.TagTypeID == objseoMeta.SEOMetaTagTypeID)
                    {
                        string contentValue = seoMetaType.TagName;
                        switch (seoMetaType.CrawlerName)
                        {
                            case "facebook":
                                objSeoAttributeList.Add(new SEOAttribute("meta", "property", contentValue, "content", objseoMeta.MetaTagContent));
                                break;
                            case "twitter":
                                objSeoAttributeList.Add(new SEOAttribute("meta", "name", contentValue, "content", objseoMeta.MetaTagContent));
                                break;
                            case "google":
                                objSeoAttributeList.Add(new SEOAttribute("meta", "name", contentValue, "content", objseoMeta.MetaTagContent));
                                break;
                        }
                    }
                }
                if (objseoMeta.SEOMetaTagTypeID == 2)
                {
                    pageTitle = objseoMeta.MetaTagContent;
                }
            }
            pageTitle = Environment.NewLine + "<title>" + pageTitle + "</title>" + Environment.NewLine;
            string metaTagHtml = pageTitle + SEOHelper.BuildSEOTags(objSeoAttributeList) + AddAdditionalSEO();
            return provider.SaveSEOMetaTag(pageID, tagTable, metaTagHtml, portalID, userName);
        }

        private string AddAdditionalSEO()
        {
            SageFrameConfig sfConfig = new SageFrameConfig();
            string refresh = sfConfig.GetSettingsByKey(SageFrameSettingKeys.MetaRefresh);
            string copyright = sfConfig.GetSettingsByKey(SageFrameSettingKeys.MetaCopyright);
            string generator = sfConfig.GetSettingsByKey(SageFrameSettingKeys.MetaGenerator);
            string author = sfConfig.GetSettingsByKey(SageFrameSettingKeys.MetaAuthor);
            string resourceType = sfConfig.GetSettingsByKey(SageFrameSettingKeys.MetaRESOURCE_TYPE);
            string distribution = sfConfig.GetSettingsByKey(SageFrameSettingKeys.MetaDISTRIBUTION);
            string robots = sfConfig.GetSettingsByKey(SageFrameSettingKeys.MetaRobots);
            string pageEnter = sfConfig.GetSettingsByKey(SageFrameSettingKeys.MetaPAGE_ENTER);
            string revisitAfter = sfConfig.GetSettingsByKey(SageFrameSettingKeys.MetaREVISIT_AFTER);

            List<SEOAttribute> objSeoAttributeList = new List<SEOAttribute>();
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "DISTRIBUTION", "content", distribution));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "REVISIT-AFTER", "content", revisitAfter));
            //objSeoAttributeList.Add(new SEOAttribute("meta", "name", "Refresh", "content", refresh));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "COPYRIGHT", "content", copyright));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "GENERATOR", "content", generator));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "AUTHOR", "content", author));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "RESOURCE-TYPE", "content", resourceType));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "DISTRIBUTION", "content", distribution));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "ROBOTS", "content", robots));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "REVISIT-AFTER", "content", revisitAfter));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "PAGE-ENTER", "content", pageEnter));
            //Additional tags here:

            string metaTagHtml = SEOHelper.BuildSEOTags(objSeoAttributeList);
            return metaTagHtml;
        }
    }
}
