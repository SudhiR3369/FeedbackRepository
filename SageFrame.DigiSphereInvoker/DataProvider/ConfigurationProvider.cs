using System.Collections.Generic;
using SageFrame.ReturnCode.Entities;
using SageFrame.ReturnCode.Utilities;
using SageFrame.Web.Utilities;
using SageFrame.DigiSphereInvoker.Utilities;
using SageFrame.DigiSphereInvoker.Entities;

namespace SageFrame.DigiSphereInvoker.DataProvider
{
    internal class ConfigurationProvider
    {

        internal List<AdvisionInfo> GetAdvisionSettings()
        {
            try
            {
                SQLHandler objHandler = new SQLHandler();
                List<AdvisionInfo> lstSocialMediaKeyword = objHandler.ExecuteAsList<AdvisionInfo>(SPName.GetAdvisionSettings);
                return lstSocialMediaKeyword;
            }
            catch
            {
                return null;
            }
        }

        internal string AdvisionGetCategory()
        {
            string category = string.Empty;
            try
            {

                SQLHandler objHandler = new SQLHandler();
                AdvisionInfo objAdvisionInfo = objHandler.ExecuteAsObject<AdvisionInfo>(SPName.AdvisionGetCategory);
                if (objAdvisionInfo != null)
                {
                    category = objAdvisionInfo.AdvisionKey;
                }
            }
            catch
            {
                throw;
            }
            return category;
        }



        internal MessageCode SaveConfiguration(string sectorDetail, string siteCategoryDetail, string[] aBusinessTypesDetail, string[] akeywordDetail)
        {
            // ID, Title
            string[] arDetail = sectorDetail.Split(',');
            if (arDetail.Length != 2)
                return new MessageCode() { Code = CodeType.InvalidData, Message = "Please provide a valid sector detail" };

            int sectorID = 0;
            if (!int.TryParse(arDetail[0], out sectorID))
                return new MessageCode() { Code = CodeType.InvalidData, Message = "Invalid Sector ID" };

            string sectorTypeName = arDetail[1];


            // ID, Title
            arDetail = siteCategoryDetail.Split(',');
            if (arDetail.Length != 2)
                return new MessageCode() { Code = CodeType.InvalidData, Message = "Please provide a valid site cateogry detail" };

            int siteCategoryID = 0;
            if (!int.TryParse(arDetail[0], out siteCategoryID))
                return new MessageCode() { Code = CodeType.InvalidData, Message = "Invalid Site Cateogry ID" };

            string siteCategoryName = arDetail[1];


            // ID, Title
            string xmlBusinessTypeDetail = string.Empty;

            foreach (string businessType in aBusinessTypesDetail)
            {
                arDetail = businessType.Split(',');

                if (arDetail.Length != 2)
                    return new MessageCode() { Code = CodeType.InvalidData, Message = "Please provide a valid business type" };

                xmlBusinessTypeDetail += $"<Y><X>{ arDetail[0] }</X><X>{arDetail[1]}</X></Y>";
            }


            // ID, Title
            string xmlKeywordDetail = string.Empty;

            foreach (string keywordDetail in akeywordDetail)
            {
                arDetail = keywordDetail.Split(',');

                if (arDetail.Length != 2)
                    return new MessageCode() { Code = CodeType.InvalidData, Message = "Invalid keyword detail" };

                xmlKeywordDetail += $"<Y><X>{ arDetail[0] }</X><X>{ arDetail[1]}</X></Y>";
            }

            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();

                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SectorID", sectorID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SectorTypeName", sectorTypeName));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SiteCatID", siteCategoryID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SiteCatName", siteCategoryName));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@BusinessTypeDetail", xmlBusinessTypeDetail));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@KeywordDetail", xmlKeywordDetail));


                string outputParam = "@ReturnCode";

                SQLHandler sagesql = new SQLHandler();
                int returnCode = sagesql.ExecuteNonQuery(SPName.AddUpdateAdvisionSettings, ParaMeterCollection, outputParam);

                if (returnCode > 0)
                    return new MessageCode() { Code = CodeType.InsertSuccess, Message = "Configuration settings were updated successfully" };
                else
                    throw new System.Exception();
            }
            catch
            {
                return new MessageCode() { Code = CodeType.SystemError, Message = "An error occured while processing the request" };
            }

        }
    }
}
