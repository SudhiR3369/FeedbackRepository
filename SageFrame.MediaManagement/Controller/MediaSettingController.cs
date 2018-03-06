using System.Collections.Generic;
using System.Web.Script.Serialization;

namespace SageFrame.MediaManagement
{
    public class MediaSettingController
    {
        public int AddUpdate(MediaSettingInfo obj)
        {
            MediaSettingDataProvider objDataProvider = new MediaSettingDataProvider();
            return objDataProvider.AddUpdate(obj);
        }
        public List<MediaSettingInfo> GetallData(MediaSettingInfo objMediaSetting)
        {
            MediaSettingDataProvider objDataProvider = new MediaSettingDataProvider();
            return objDataProvider.GetallData(objMediaSetting);
        }
        public MediaSettingInfo GetByID(long MediaSettingID)
        {
            MediaSettingDataProvider objDataProvider = new MediaSettingDataProvider();
            return objDataProvider.GetByID(MediaSettingID);
        }
        public void DeleteByID(long MediaSettingID)
        {
            MediaSettingDataProvider objDataProvider = new MediaSettingDataProvider();
            objDataProvider.DeleteByID(MediaSettingID);
        }

        public MediaSettingKeys GetMediaSettingKeyValue()
        {
            MediaSettingKeys objSettingKey = new MediaSettingKeys();
            try
            {
                MediaSettingDataProvider objDataProvider = new MediaSettingDataProvider();
                MediaSettingInfo settingKeyInfo = objDataProvider.GetByID(1);
                if (settingKeyInfo != null && settingKeyInfo.SettingKeyValue.Length>0)
                {
                    MediaSettingKeyValue objMediaKeys = new MediaSettingKeyValue();
                    objMediaKeys = new JavaScriptSerializer().Deserialize<MediaSettingKeyValue>(settingKeyInfo.SettingKeyValue);
                    objSettingKey = objMediaKeys.MediaSetting;
                }
            }
            catch
            {
                throw;
            }
            return objSettingKey;
        }
    }
}