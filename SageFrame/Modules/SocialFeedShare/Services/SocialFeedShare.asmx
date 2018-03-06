<%@ WebService Language="C#" CodeBehind="SocialFeedShare.cs" Class="SocialFeedShare" %>

using System.Web.Services;
using System.Collections.Generic;
using SageFrame.ReturnCode.Entities;
using SageFrame.SocialFeedShare;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]

[System.Web.Script.Services.ScriptService]
public class SocialFeedShare : WebService
{

    public SocialFeedShare()
    { }



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

