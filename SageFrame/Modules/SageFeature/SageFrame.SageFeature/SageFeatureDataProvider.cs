using System;
 using SageFrame.Web.Utilities;
 using System.Collections.Generic;


namespace SageFrame.SageFeature
{
    public class SageFeatureDataProvider
    {
		public List<SageFeatureInfo> GetallData(int UserModuleID, int PortalID, string Culture)
        {
			try
			{
				List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
				param.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
				param.Add(new KeyValuePair<string, object>("@UserModuleID", UserModuleID));
				param.Add(new KeyValuePair<string, object>("@Culture", Culture));
				SQLHandler sagesql = new SQLHandler();
				return sagesql.ExecuteAsList<SageFeatureInfo>("[dbo].[usp_SageFeature_GetallData]", param);
			}
            catch (Exception ex)
            {
                throw ex;
            }
        }
		public SageFeatureInfo GetByID(int  FeatID)
		{
			try
			{
				List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
				param.Add(new KeyValuePair<string, object>("@FeatID", FeatID));
				SQLHandler sagesql = new SQLHandler();
				return sagesql.ExecuteAsObject<SageFeatureInfo>("[dbo].[usp_SageFeature_GetByID]", param);
			}
            catch (Exception ex)
            {
                throw ex;
            }
        }
		public void DeleteByID(int  FeatID)
		{
			try
			{
				List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
				param.Add(new KeyValuePair<string, object>("@FeatID", FeatID));
				SQLHandler sagesql = new SQLHandler();
				 sagesql.ExecuteNonQuery("[dbo].[usp_SageFeature_DeleteByID]", param);
			}
            catch (Exception ex)
            {
                throw ex;
            }
        }
	
		public void AddUpdate(SageFeatureInfo obj)
		{
			try
			{
				List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
				param.Add(new KeyValuePair<string, object>("@FeatID", obj.FeatID));
				param.Add(new KeyValuePair<string, object>("@Title", obj.Title));
				param.Add(new KeyValuePair<string, object>("@Description", obj.Description));
				param.Add(new KeyValuePair<string, object>("@IsActive", obj.IsActive));
				param.Add(new KeyValuePair<string, object>("@ImageName", obj.ImageName));
				param.Add(new KeyValuePair<string, object>("@AddedBy", obj.AddedBy));
                param.Add(new KeyValuePair<string, object>("@UserModuleID", obj.UserModuleID));
                param.Add(new KeyValuePair<string, object>("@PortalID", obj.PortalID));
                param.Add(new KeyValuePair<string, object>("@Culture", obj.Culture));
                SQLHandler sagesql = new SQLHandler();
				sagesql.ExecuteNonQuery("[dbo].[usp_SageFeature_AddUpdate]", param);
			}
			catch(Exception ex)
			{
				throw ex;
			}
		}
                
    }
}