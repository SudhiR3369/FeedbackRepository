using System;

namespace SageFrame.SocialFeedShare
{
    public class AccessTokenController
    {

        public int AddLinkedInAccessToken(string accessToken, DateTime authorizationDateUtc, int? expiresIn)
        {
            AccessTokenProvider provider = new AccessTokenProvider();
            return provider.AddLinkedInAccessToken(accessToken, authorizationDateUtc, expiresIn);
        }
    }
}
