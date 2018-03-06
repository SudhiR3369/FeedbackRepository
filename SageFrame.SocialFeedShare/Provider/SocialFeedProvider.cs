using SageFrame.Web.Utilities;
using System;
using System.Collections.Generic;

namespace SageFrame.SocialFeedShare
{
    class SocialFeedProvider
    {
        internal SocialFeedSettingInfo GetSocialFeedSettingInfo()
        {
            SQLHandler objHandler = new SQLHandler();
            try
            {
                SocialFeedSettingInfo objSetting = objHandler.ExecuteAsObject<SocialFeedSettingInfo>("[dbo].[usp_SocailFeed_GetSocialFeedSettingInfo]");
                return objSetting;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        internal int SaveSocialFeedSettingInfo(SocialFeedSettingInfo objSetting)
        {
            List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
            //Param.Add(new KeyValuePair<string, object>("@SettingID", objSetting.SettingID));
            Param.Add(new KeyValuePair<string, object>("@EnableFacebook", objSetting.EnableFacebook));
            Param.Add(new KeyValuePair<string, object>("@FBAppID", objSetting.FBAppID));
            Param.Add(new KeyValuePair<string, object>("@FBAppSecret", objSetting.FBAppSecret));
            Param.Add(new KeyValuePair<string, object>("@EnableTwitter", objSetting.EnableTwitter));
            Param.Add(new KeyValuePair<string, object>("@TwitterConsumerKey", objSetting.TwitterConsumerKey));
            Param.Add(new KeyValuePair<string, object>("@TwitterConsumerSecret", objSetting.TwitterConsumerSecret));
            Param.Add(new KeyValuePair<string, object>("@EnableLinkedIn", objSetting.EnableLinkedIn));
            Param.Add(new KeyValuePair<string, object>("@LinkedInAppID", objSetting.LinkedInAppID));
            Param.Add(new KeyValuePair<string, object>("@LinkedInAppSecret", objSetting.LinkedInAppSecret));
            Param.Add(new KeyValuePair<string, object>("@LinkedInCompanyID", objSetting.LinkedInCompanyID));

            //Param.Add(new KeyValuePair<string, object>("@Username", username));

            SQLHandler objHanlder = new SQLHandler();

            try
            {
                int value = objHanlder.ExecuteNonQuery("[dbo].[usp_SocialFeed_SaveSocialFeedSettingInfo]", Param, "@ReturnCode");
                return value;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }



        internal List<SuggestedPostInfo> GetTopSuggestions()
        {
            try
            {
                SQLHandler objHandler = new SQLHandler();
                List<SuggestedPostInfo> lstSuggestedPosts = objHandler.ExecuteAsList<SuggestedPostInfo>("[dbo].[usp_SocailFeed_GetTopSuggestions]");
                return lstSuggestedPosts;
            }
            catch { return null; }
        }

        internal int SaveUserChoice(UserChoiceInfo userChoiceInfo)
        {

            List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
            Param.Add(new KeyValuePair<string, object>("@ResultID", userChoiceInfo.ResultID));
            Param.Add(new KeyValuePair<string, object>("@MessageID", userChoiceInfo.MessageID));
            Param.Add(new KeyValuePair<string, object>("@Title", userChoiceInfo.Title));
            Param.Add(new KeyValuePair<string, object>("@Message", userChoiceInfo.Message));
            Param.Add(new KeyValuePair<string, object>("@Destination", userChoiceInfo.Destination));
            Param.Add(new KeyValuePair<string, object>("@TrackingID", userChoiceInfo.TrackingID));

            try
            {
                SQLHandler objHandler = new SQLHandler();
                int value = objHandler.ExecuteNonQuery("[dbo].[usp_SocialMedia_AddNewUsersChoice]", Param, "@ReturnCode");
                return value;
            }
            catch { return -1; }
        }


    }
}
