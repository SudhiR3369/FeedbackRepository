using System; using System.Collections.Generic;

namespace SageFrame.SageFeature
{
    public class SageFeatureController
    {
		
		public void AddUpdate(SageFeatureInfo obj)
		{
			try
			{
				SageFeatureDataProvider objDataProvider = new SageFeatureDataProvider();
				objDataProvider.AddUpdate(obj);
			}
            catch (Exception ex)
            {
                throw ex;
            }
        }
		public List<SageFeatureInfo> GetallData(int UserModuleID,int PortalID,string Culture)
		{
			try
			{
				SageFeatureDataProvider objDataProvider = new SageFeatureDataProvider();
				 return objDataProvider.GetallData(UserModuleID,PortalID, Culture);
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
				SageFeatureDataProvider objDataProvider = new SageFeatureDataProvider();
				 return objDataProvider.GetByID(FeatID);
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
				SageFeatureDataProvider objDataProvider = new SageFeatureDataProvider();
				 objDataProvider.DeleteByID(FeatID);
			}
            catch (Exception ex)
            {
                throw ex;
            }
        }
                
    }
}