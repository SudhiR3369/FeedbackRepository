using Sparkle.LinkedInNET;
using System;
using System.Collections.Generic;
using Twitterizer;

namespace SageFrame.SocialFeedShare
{
    public class SocialFeedController
    {




        public SocialFeedSettingInfo GetSocialFeedSettingInfo()
        {
            SocialFeedProvider objProvider = new SocialFeedProvider();
            return objProvider.GetSocialFeedSettingInfo();
        }

        public int SaveSocialFeedSettingInfo(SocialFeedSettingInfo objSetting)
        {
            SocialFeedProvider objProvider = new SocialFeedProvider();
            return objProvider.SaveSocialFeedSettingInfo(objSetting);
        }

        public List<SuggestedPostInfo> GetTopSuggestions()
        {
            SocialFeedProvider objProvider = new SocialFeedProvider();
            return objProvider.GetTopSuggestions();
        }


        public int SaveUserChoice(UserChoiceInfo userChoiceInfo)
        {
            SocialFeedProvider objProvider = new SocialFeedProvider();
            return objProvider.SaveUserChoice(userChoiceInfo);
        }


        /// <summary>
        /// Convert to User Choice ( Twitter )
        /// </summary>
        /// <param name="twitterResponse"></param>
        /// <param name="message"></param>
        /// <param name="resultID"></param>
        /// <returns></returns>
        public UserChoiceInfo ConvertToUserChoice(TwitterResponse<TwitterStatus> twitterResponse, string message, string resultID)
        {
            int rID = 0;
            int.TryParse(resultID, out rID);

            return new UserChoiceInfo()
            {
                UserChoiceID = 0,
                TrackingID = twitterResponse.ResponseObject.Id.ToString(),
                MessageID = 0,
                ResultID = rID,
                Title = string.Empty,
                Message = message,
                Destination = "twitter"
            };
        }


        /// <summary>
        /// Covert To User Choice ( LinkedIn )
        /// </summary>
        /// <param name="location"></param>
        /// <param name="updateKey"></param>
        /// <param name="updateURI"></param>
        /// <param name="message"></param>
        /// <param name="resultID"></param>
        /// <returns></returns>
        public UserChoiceInfo ConvertToUserChoice(string location, string updateKey, string updateURI, string message, string resultID)
        {
            int rID = 0;
            int.TryParse(resultID, out rID);

            return new UserChoiceInfo()
            {
                TrackingID = updateKey,
                MessageID = 0,
                ResultID = rID,
                Title = string.Empty,
                Message = message,
                Destination = "linkedin"
            };
        }

        /// <summary>
        /// Convert to User Choice ( Facebook )
        /// </summary>
        /// <param name="faceBookResponse"></param>
        /// <param name="message"></param>
        /// <param name="resultID"></param>
        /// <returns></returns>
        public UserChoiceInfo ConvertToUserChoice(string faceBookResponse, string message, string resultID)
        {
            int rID = 0;
            int.TryParse(resultID, out rID);

            return new UserChoiceInfo()
            {
                TrackingID = faceBookResponse,
                MessageID = 0,
                ResultID = rID,
                Title = string.Empty,
                Message = message,
                Destination = "facebook",
            };
        }



    }
}
