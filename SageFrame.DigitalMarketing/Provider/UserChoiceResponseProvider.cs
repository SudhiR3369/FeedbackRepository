using SageFrame.DigitalMarketing.Entities;
using SageFrame.DigitalMarketing.Utilities;
using SageFrame.Web.Utilities;
using System.Collections.Generic;
using System;

namespace SageFrame.DigitalMarketing.Provider
{
    internal class UserChoiceResponseProvider
    {


        internal List<PostFeedbackInfo> GetUserChoiceFeedBacks()
        {

            try
            {
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<PostFeedbackInfo>(SPName.GetPostFeedBacks);
            }
            catch
            {
                return null;
            }

        }

        internal int AddUpdatePerformanceCounterItem(int performanceID, int userModuleID, int mTypeAttributeMapID)
        {

            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();

                ParaMeterCollection.Add(new KeyValuePair<string, object>("@PerformanceCounterID", performanceID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserModuleID", userModuleID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@MediaTypeAttributeMapID", mTypeAttributeMapID));

                string outputParam = "@ReturnCode";

                SQLHandler sagesql = new SQLHandler();
                int result = sagesql.ExecuteNonQuery(SPName.AddUpdatePerformanceCounter, ParaMeterCollection, outputParam);
                return result;
            }
            catch (Exception)
            {
                return -1;
            }

        }

        internal List<PostMediaCounterInfo> GetUserPostsCount()
        {
            try
            {
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<PostMediaCounterInfo>(SPName.GetUserPostsCount);
            }
            catch
            {
                return null;
            }
        }

        internal List<SocialMediaType> GetAvailableSocialMediaTypes()
        {
            try
            {
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<SocialMediaType>(SPName.GetAvailableMediaTypes);
            }
            catch (Exception)
            {
                return null;
            }
        }

        internal List<SocialMediaAttribute> GetAvailableSocialMediaAttributes()
        {
            try
            {
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<SocialMediaAttribute>(SPName.GetAvailableAttributeTypes);
            }
            catch (Exception)
            {
                return null;
            }

        }

        internal List<AttributeStatisticsForMediaType> GetMediaPostStatisticsForPerformanceCounter(int performanceCounterID)
        {
            List<KeyValuePair<string, object>> lstKVP = new List<KeyValuePair<string, object>>();
            lstKVP.Add(new KeyValuePair<string, object>("@PerformanceCounterID", performanceCounterID));

            try
            {
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<AttributeStatisticsForMediaType>(SPName.GetAttributeStatisticsForMediaTypes, lstKVP);
            }
            catch (Exception)
            {
                return null;
            }
        }

        internal List<SocialMediaAttribute> GetAvailableAttributesForPerformanceCounterByTypeID(int mediaTypeID)
        {
            List<KeyValuePair<string, object>> lstKVP = new List<KeyValuePair<string, object>>();
            lstKVP.Add(new KeyValuePair<string, object>("@MediaTypeID", mediaTypeID));

            try
            {
                SQLHandler sagesql = new SQLHandler();
                List<SocialMediaAttribute> lstSocialMediaAttribs = new List<SocialMediaAttribute>();
                lstSocialMediaAttribs = sagesql.ExecuteAsList<SocialMediaAttribute>(SPName.GetAvailableAttribsForPerformanceCounterByID, lstKVP);
                return lstSocialMediaAttribs;
            }
            catch (Exception)
            {
                return null;
            }
        }


        internal List<SocialMediaPerformanceCounterInfo> GetPerformanceCountersByModuleID(int userModuleID)
        {
            List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
            ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserModuleID", userModuleID));

            try
            {
                SQLHandler sagesql = new SQLHandler();
                List<SocialMediaPerformanceCounterInfo> lstPerformanceCounters = sagesql.ExecuteAsList<SocialMediaPerformanceCounterInfo>(SPName.GetPerformanceCountersByUserModuleID, ParaMeterCollection);
                return lstPerformanceCounters;
            }
            catch
            {
                return null;
            }

        }


        internal int DeleteCounterObjectByID(int performanceCounterID)
        {

            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@PerformanceCounterID", performanceCounterID));

                string outputParam = "@ReturnCode";

                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteNonQuery(SPName.DeleteCounterItemByID, ParaMeterCollection, outputParam);
            }
            catch { return -1; }
        }


        //internal int GetAttributeStatisticsForMediaTypes(string )


    }

}
