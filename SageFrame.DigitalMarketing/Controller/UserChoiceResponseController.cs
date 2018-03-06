using SageFrame.DigitalMarketing.Entities;
using SageFrame.DigitalMarketing.Provider;
using System.Collections.Generic;

namespace SageFrame.DigitalMarketing.Controller
{
    public class UserChoiceResponseController
    {

        public int AddUpdatePerformanceCounterItem(int performanceID, int userModuleID, int mTypeAttributeMapID)
        {
            UserChoiceResponseProvider provider = new UserChoiceResponseProvider();
            return provider.AddUpdatePerformanceCounterItem(performanceID, userModuleID, mTypeAttributeMapID);
        }

        public List<PostFeedbackInfo> GetUserChoiceFeedBacks()
        {
            UserChoiceResponseProvider provider = new UserChoiceResponseProvider();
            return provider.GetUserChoiceFeedBacks();
        }


        public List<PostMediaCounterInfo> GetUserPostsCount()
        {
            UserChoiceResponseProvider provider = new UserChoiceResponseProvider();
            return provider.GetUserPostsCount();
        }


        public List<SocialMediaType> GetAvailableSocialMediaTypes()
        {
            UserChoiceResponseProvider provider = new UserChoiceResponseProvider();
            return provider.GetAvailableSocialMediaTypes();
        }

        public List<SocialMediaAttribute> GetAvailableSocialMediaAttributes()
        {
            UserChoiceResponseProvider provider = new UserChoiceResponseProvider();
            return provider.GetAvailableSocialMediaAttributes();
        }


        public List<SocialMediaAttribute> GetAvailableAttributesForPerformanceCounterByTypeID(int mediaTypeID)
        {
            UserChoiceResponseProvider provider = new UserChoiceResponseProvider();
            return provider.GetAvailableAttributesForPerformanceCounterByTypeID(mediaTypeID);
        }

        public List<SocialMediaPerformanceCounterInfo> GetPerformanceCountersByModuleID(int userModuleID)
        {
            UserChoiceResponseProvider provider = new UserChoiceResponseProvider();
            return provider.GetPerformanceCountersByModuleID(userModuleID);

        }


        public int DeleteCounterObjectByID(int performanceCounterID)
        {
            UserChoiceResponseProvider provider = new UserChoiceResponseProvider();
            return provider.DeleteCounterObjectByID(performanceCounterID);
        }


        public List<AttributeStatisticsForMediaType> GetMediaPostStatisticsForPerformanceCounter(int performanceCounterID)
        {
            UserChoiceResponseProvider provider = new UserChoiceResponseProvider();
            return provider.GetMediaPostStatisticsForPerformanceCounter(performanceCounterID);
        }



    }
}
