using SageFrame.Web.Utilities;
using System;
using System.Collections.Generic;

namespace SageFrame.SocialFeedShare
{
    internal class AccessTokenProvider
    {
        internal int AddLinkedInAccessToken(string accessToken, DateTime authorizationDateUtc, int? expiresIn)
        {
            try
            {

                DateTime expiryDateTime = DateTime.Now;
                if (expiresIn != null)
                {
                    int seconds = (int)expiresIn;
                    TimeSpan timeSpan = TimeSpan.FromSeconds(seconds);
                    DateTime dt = DateTime.Now;
                    expiryDateTime = dt.Add(timeSpan);

                }
                List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
                Param.Add(new KeyValuePair<string, object>("@TokenAuthor", "linkedin-company"));
                Param.Add(new KeyValuePair<string, object>("@TokenKey", accessToken));
                Param.Add(new KeyValuePair<string, object>("@HasExpired", false));
                Param.Add(new KeyValuePair<string, object>("@ExpiryDate", expiryDateTime));

                SQLHandler objHanlder = new SQLHandler();
                int value = objHanlder.ExecuteNonQuery("[dbo].[usp_SocialFeed_AddSocialMediaAccessToken]", Param, "@ReturnCode");
                return value;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }
}
