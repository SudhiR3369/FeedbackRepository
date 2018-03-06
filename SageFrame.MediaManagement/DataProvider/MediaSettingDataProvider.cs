using SageFrame.Web.Utilities;
using System.Collections.Generic;
namespace SageFrame.MediaManagement
{
    public class MediaSettingDataProvider
    {
        public List<MediaSettingInfo> GetallData(MediaSettingInfo objMediaSetting)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@PortalID", objMediaSetting.PortalID));
                param.Add(new KeyValuePair<string, object>("@UserModuleID", objMediaSetting.UserModuleID));
                param.Add(new KeyValuePair<string, object>("@Culture", objMediaSetting.Culture));
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<MediaSettingInfo>("[dbo].[usp_MediaSetting_GetallData]", param);
            }
            catch
            {
                throw;
            }
        }
        public MediaSettingInfo GetByID(long MediaSettingID)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@MediaSettingID", MediaSettingID));
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsObject<MediaSettingInfo>("[dbo].[usp_MediaSetting_GetByID]", param);
            }
            catch
            {
                throw;
            }
        }
        public void DeleteByID(long MediaSettingID)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@MediaSettingID", MediaSettingID));
                SQLHandler sagesql = new SQLHandler();
                sagesql.ExecuteNonQuery("[dbo].[usp_MediaSetting_DeleteByID]", param);
            }
            catch
            {
                throw;
            }
        }
        public int AddUpdate(MediaSettingInfo objMediaSetting)
        {
            int mediaSettingID = 0;
            List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
            param.Add(new KeyValuePair<string, object>("@MediaSettingID", objMediaSetting.MediaSettingID));
            param.Add(new KeyValuePair<string, object>("@SettingKeyValue", objMediaSetting.SettingKeyValue));
            param.Add(new KeyValuePair<string, object>("@PortalID", objMediaSetting.PortalID));
            param.Add(new KeyValuePair<string, object>("@UserModuleID", objMediaSetting.UserModuleID));
            param.Add(new KeyValuePair<string, object>("@Culture", objMediaSetting.Culture));
            SQLHandler sagesql = new SQLHandler();
            try
            {
                mediaSettingID = sagesql.ExecuteNonQuery("[dbo].[usp_MediaSetting_InsertUpdate]", param, "@NewMediaSettingID");
            }
            catch
            {
                throw;
            }
            return mediaSettingID;
        }
    }
}