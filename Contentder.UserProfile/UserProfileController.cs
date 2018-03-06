using SageFrame.UserProfile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contentder.UserProfile
{
    public class UserProfileController
    {
        /// <summary>
        /// Obtain user profile.
        /// </summary>
        /// <param name="UserName">User name.</param>
        /// <returns>Object of UserProfileInfo class.</returns>
        public static UserProfileInfo GetPublicProfile(string UserName)
        {
            try
            {
                return UserProfileDataProvider.GetProfile(UserName, 1);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
