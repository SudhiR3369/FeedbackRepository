<%@ WebService Language="C#" CodeBehind="SocialMediaManagement.cs" Class="SocialMediaManagement" %>

using System.Web.Services;
using System.Collections.Generic;
using SageFrame.ReturnCode.Entities;
using SageFrame.SocialFeedShare;
using SageFrame.DigitalMarketing.Entities;
using SageFrame.DigitalMarketing.Controller;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]

[System.Web.Script.Services.ScriptService]
public class SocialMediaManagement : WebService
{

    public SocialMediaManagement()
    { }


    [WebMethod]
    public List<PostMediaCounterInfo> LoadPostMediaCounter()
    {
        UserChoiceResponseController controller = new UserChoiceResponseController();
        return controller.GetUserPostsCount();
    }




    [WebMethod]
    public List<SuggestedPostInfo> GetTopSuggestions()
    {
        SocialFeedController feedController = new SocialFeedController();
        return feedController.GetTopSuggestions();
    }


    [WebMethod]
    public SocialFeedSettingInfo GetSocialFeedSettings()
    {
        SocialFeedController objController = new SocialFeedController();
        SocialFeedSettingInfo objSetting = objController.GetSocialFeedSettingInfo();
        return objSetting;
    }



    [WebMethod]
    public int SaveSocialFeedSettings(SocialFeedSettingInfo socialFeedSettings)
    {
        SocialFeedController objController = new SocialFeedController();
        int value = objController.SaveSocialFeedSettingInfo(socialFeedSettings);
        return value;

    }


}

