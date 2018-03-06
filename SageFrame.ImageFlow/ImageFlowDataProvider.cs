using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SageFrame.Web.Utilities;

namespace SageFrame.ImageFlow
{
    class ImageFlowDataProvider
    {
        internal void AddUpdateSetting(ImageFlowSettingInfo objInfo)
        {
            try
            {
                string Sp = "[dbo].[usp_ImageFlowSetting_AddUpdate]";
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@Style", objInfo.Style));
                param.Add(new KeyValuePair<string, object>("@Spacing", objInfo.Spacing));
                param.Add(new KeyValuePair<string, object>("@Arrow", objInfo.Arrow));
                param.Add(new KeyValuePair<string, object>("@AutoPlay", objInfo.AutoPlay));
                param.Add(new KeyValuePair<string, object>("@Looping", objInfo.Looping));
                param.Add(new KeyValuePair<string, object>("@Clickable", objInfo.Clickable));
                param.Add(new KeyValuePair<string, object>("@ScrollWheel", objInfo.ScrollWheel));
                param.Add(new KeyValuePair<string, object>("@UserModuleID", objInfo.UserModuleID));
                param.Add(new KeyValuePair<string, object>("@PortalID", objInfo.PortalID));
                SQLHandler objSql = new SQLHandler();
                objSql.ExecuteNonQuery(Sp, param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        internal ImageFlowSettingInfo GetSetting(int userModuleID, int portalID)
        {
            try
            {
                string Sp = "[dbo].[usp_ImageFlowSetting_Get]";
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@UserModuleID", userModuleID));
                param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
                SQLHandler objSql = new SQLHandler();
                ImageFlowSettingInfo objInfo = objSql.ExecuteAsObject<ImageFlowSettingInfo>(Sp, param);
                return objInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        internal void AddUpdateImages(ImageFlowInfo objInfo)
        {
            try
            {
                string Sp = "[dbo].[usp_ImageFlow_AddUpdate]";
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@BannerID", objInfo.BannerID));
                param.Add(new KeyValuePair<string, object>("@ImageName", objInfo.ImageName));
                param.Add(new KeyValuePair<string, object>("@Title", objInfo.Title));
                param.Add(new KeyValuePair<string, object>("@Description", objInfo.Description));
                param.Add(new KeyValuePair<string, object>("@IsActive", objInfo.IsActive));
                param.Add(new KeyValuePair<string, object>("@CultureCode", objInfo.CultureCode));
                param.Add(new KeyValuePair<string, object>("@UserModuleID", objInfo.UserModuleID));
                param.Add(new KeyValuePair<string, object>("@PortalID", objInfo.PortalID));
                param.Add(new KeyValuePair<string, object>("@AddedBy", objInfo.AddedBy));
                SQLHandler objSql = new SQLHandler();
                objSql.ExecuteNonQuery(Sp, param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        internal List<ImageFlowInfo> GetAllImages(int userModuleID, int portalID, string CultureCode)
        {
            try
            {
                string Sp = "[dbo].[usp_ImageFlow_GetAllData]";
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@UserModuleID", userModuleID));
                param.Add(new KeyValuePair<string, object>("@PortalID", portalID));
                param.Add(new KeyValuePair<string, object>("@CultureCode", CultureCode));
                SQLHandler objSql = new SQLHandler();
                List<ImageFlowInfo> objInfo = objSql.ExecuteAsList<ImageFlowInfo>(Sp, param);
                return objInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        internal ImageFlowInfo GetImagesByID(int BannerID)
        {
            try
            {
                string Sp = "[dbo].[usp_ImageFlow_GetByBannerID]";
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@BannerID", BannerID));
                SQLHandler objSql = new SQLHandler();
                ImageFlowInfo objInfo = objSql.ExecuteAsObject<ImageFlowInfo>(Sp, param);
                return objInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        internal void DeleteImagesByID(int BannerID)
        {
            try
            {
                string Sp = "[dbo].[usp_ImageFlow_DeleteByBannerID]";
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@BannerID", BannerID));
                SQLHandler objSql = new SQLHandler();
                objSql.ExecuteNonQuery(Sp, param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        internal void ChangeDisplayOrder(int BannerID,bool IsSortUp)
        {
            try
            {
                string Sp = "[dbo].[usp_ImageFlow_ChangeDisplayOrder]";
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@BannerID", BannerID));
                param.Add(new KeyValuePair<string, object>("@IsSortUp", IsSortUp));
                SQLHandler objSql = new SQLHandler();
                objSql.ExecuteNonQuery(Sp, param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
