using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Net;
using System.IO;
using System.Text;
using System.Web;
using Facebook;
using System.Dynamic;
using Twitterizer;
using Sparkle.LinkedInNET;
using Sparkle.LinkedInNET.OAuth2;
using Sparkle.LinkedInNET.Common;
using SageFrame.SocialFeedShare;
using System.Threading.Tasks;

public partial class Modules_SocialFeedShare_SocialFeedShare : BaseAdministrationUserControl
{

    string twitterCallBackContent = string.Empty;
    bool isFacebookEnabled = false, isTwitterEnabled = false, isLinkedInEnabled = false, isGooglePlusEnabled = false;
    string SuccessMessageKey = "SMKey";

    string FBCodeSessionKey = "FBCode";
    string TwitterCodeSessionKey = "TwitterCode";
    string TwitterAuthVerifierSessionKey = "TwitterAuthVerifierCode";
    string LinkedInCodeSessionKey = "LinkedInCode";
    string GooglePlusCodeSessionKey = "GooglePlusCode";
    string ShareCodeType = "CodeType";
    string MessageKey = "ShareMessage";

    //string TitleKey = "ShareTitle";
    string CurrentResultID = "ResultID";
    string CurrentMessage = "CurrentMsg";

    public string userModuleID = string.Empty;
    public string modulePath = string.Empty;
    public int portalID = 0;

    string facebookToken = string.Empty;

    protected void Page_Load(object sender, EventArgs e)
    {

        GetSocialFeedSettingInfo();
        InitiatePage();
        ManageShareOptions();
           userModuleID = SageUserModuleID;
            portalID = GetPortalID;
            modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
            IncludeCss("SocialFeedShare", "/Modules/SocialFeedShare/css/SocialFeedShare.css");
            IncludeJs("SocialFeedShare", "/Modules/SocialFeedShare/js/SocialFeedShare.js");
        BindSearchContents();
        if (!IsPostBack)
        {
            txtFeedContent.Attributes.Add("onkeypress", "return VerifyContentMessage(event,txtFeedContentID,hdnMessageID,lblCurrentSelectedPost)");

            if (Session[SuccessMessageKey] != null)
                ShowMessage(SageMessageTitle.Information.ToString(), Session[SuccessMessageKey].ToString(), "", SageMessageType.Success);

            if (Session[FBCodeSessionKey] != null) cbFacebook.Checked = true;
            if (Session[TwitterCodeSessionKey] != null) cbTwitter.Checked = true;
            if (Session[LinkedInCodeSessionKey] != null) cbLinkedIn.Checked = true;
            if (Session[GooglePlusCodeSessionKey] != null) cbGooglePLus.Checked = true;

            if (Session[CurrentMessage] != null) lblPostTitle.Text = Session[CurrentMessage].ToString();
            if (Session[CurrentResultID] != null) hdnSelectedMessageID.Value = Session[CurrentResultID].ToString();
            if (Session[MessageKey] != null) if (txtFeedContent.Text == string.Empty) txtFeedContent.Text = Session[MessageKey].ToString();

            //if (Session[TitleKey] != null) if (txtTitle.Text == string.Empty) txtTitle.Text = Session[TitleKey].ToString();

           

        }
        else
        {
            if (cbFacebook.Checked == false) Session.Remove(FBCodeSessionKey);
            if (cbTwitter.Checked == false) Session.Remove(TwitterCodeSessionKey);
            if (cbLinkedIn.Checked == false) Session.Remove(LinkedInCodeSessionKey);
            if (cbGooglePLus.Checked == false) Session.Remove(GooglePlusCodeSessionKey);
        }


    }


    private void GetSocialFeedSettingInfo()
    {
        SocialFeedController objController = new SocialFeedController();
        SocialFeedSettingInfo objSetting = objController.GetSocialFeedSettingInfo();
        if (objSetting != null)
        {
            isFacebookEnabled = objSetting.EnableFacebook;
            isTwitterEnabled = objSetting.EnableTwitter;
            isLinkedInEnabled = objSetting.EnableLinkedIn;

            FBAppID = objSetting.FBAppID;
            FBSecret = objSetting.FBAppSecret;

            TwitterConsumerKey = objSetting.TwitterConsumerKey;
            TwitterConsumerSecret = objSetting.TwitterConsumerSecret;

            LinkedInAppID = objSetting.LinkedInAppID;
            LinkedInSecret = objSetting.LinkedInAppSecret;
        }
    }

    private void InitiatePage()
    {
        string sessionCode = string.Empty;
        if (Session[ShareCodeType] != null) sessionCode = Session[ShareCodeType].ToString();

        switch (sessionCode)
        {
            case "Facebook": SetFacebookCode(); Session.Remove(ShareCodeType); break;

            case "Twitter": SetTwitterCode(); Session.Remove(ShareCodeType); break;

            case "LinkedIn": SetLinkedInCode(); Session.Remove(ShareCodeType); break;

            case "GooglePlus": SetGooglePlusCode(); Session.Remove(ShareCodeType); break;

            default: break;
        }
    }


    private void ManageShareOptions()
    {
        divFacebook.Visible = isFacebookEnabled;
        divTwitter.Visible = isTwitterEnabled;
        divLinkedIn.Visible = isLinkedInEnabled;
        divGooglePlus.Visible = isGooglePlusEnabled;

    }



    protected void btnShare_Click(object sender, EventArgs e)
    {

        string content = txtFeedContent.Text.Trim();

        if (content != string.Empty)
        {
            bool postedToLinkedIn = false;
            bool postedToFaceBook = false;
            bool postedToTwitter = false;
            bool postedToGoogle = false;
            try
            {
                if (cbFacebook.Checked) postedToFaceBook = PostFacebook();

                if (cbTwitter.Checked) postedToTwitter = PostTwitter();

                if (cbLinkedIn.Checked) postedToLinkedIn = PostLinkedIn();

                if (isGooglePlusEnabled) postedToGoogle = PostLinkedIn();


                if (postedToFaceBook || postedToTwitter || postedToLinkedIn || postedToGoogle)
                {
                    Session[SuccessMessageKey] = "You shares a new post at " + DateTime.Now + " successfully.";

                    ClearSessionKeys();
                    ReloadCurrentState();
                    //               ShowMessage(SageMessageTitle.Information.ToString(),
                    //SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SocialFeedShare/ModuleLocalText",
                    //"ShareSuccessfull"), "", SageMessageType.Success);

                }
                else
                {


                    string fullMessage = string.Empty;

                    if (cbTwitter.Checked && !postedToTwitter) // Unable to post to twitter
                        if (twitterCallBackContent != string.Empty)
                            fullMessage += twitterCallBackContent;

                    if (cbFacebook.Checked && !postedToFaceBook) // Unable to post to twitter
                        fullMessage += " [ Unable to post to facebook ] ";

                    if (cbLinkedIn.Checked && !postedToLinkedIn) // Unable to post to twitter
                        fullMessage += " [ Unable to post to LinkedIn ] ";


                    ShowMessage(SageMessageTitle.Exception.ToString(), "Post failed", fullMessage, SageMessageType.Error);

                    ClearSessionKeys();
                    //       ShowMessage(SageMessageTitle.Information.ToString(),
                    //SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SocialFeedShare/ModuleLocalText",
                    //"ContentNotFound"), "", SageMessageType.Error);


                }


            }
            catch (Exception ex)
            {

                ProcessException(ex);
                ShowMessage(SageMessageTitle.Information.ToString(),
                SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SocialFeedShare/ModuleLocalText",
                "ShareFailed"), "", SageMessageType.Error);

            }
            finally
            {
                //ClearSessionKeys();

            }

            //            if (postedToFaceBook || postedToTwitter || postedToLinkedIn || postedToGoogle)
            //            {
            //                ShowMessage(SageMessageTitle.Information.ToString(),
            //SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SocialFeedShare/ModuleLocalText",
            //"ShareSuccessfull"), "", SageMessageType.Success);

            //            }
            //            else
            //            {
            //                ShowMessage(SageMessageTitle.Information.ToString(),
            //             SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SocialFeedShare/ModuleLocalText",
            //             "ContentNotFound"), "", SageMessageType.Error);
            //            }

        }
        else
        {
            ShowMessage(SageMessageTitle.Information.ToString(),
                        SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SocialFeedShare/ModuleLocalText",
                        "ContentNotFound"), "", SageMessageType.Error);
        }


    }

    protected void btnClear_Click(object sender, EventArgs e)
    {
        ClearSessionKeys();
        Session.Remove(SuccessMessageKey);

        ReloadCurrentState();
    }

    private void ReloadCurrentState()
    {
        string queryString = Request.Url.Query;
        string redirectUrl = Request.Url.AbsoluteUri;
        if (queryString.Trim() != string.Empty) redirectUrl = redirectUrl.Replace(queryString, string.Empty);
        Response.Redirect(redirectUrl);
    }

    private void BindSearchContents()
    {
        List<SuggestedPostInfo> lstSuggestedPosts = new List<SuggestedPostInfo>();
        SocialFeedController feedController = new SocialFeedController();
        lstSuggestedPosts = feedController.GetTopSuggestions();


        if (lstSuggestedPosts != null && lstSuggestedPosts.Count > 0)
        {
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < lstSuggestedPosts.Count; i++)
            {
                SuggestedPostInfo response = lstSuggestedPosts[i];

                sb.Append("<div class='postMessage'>");

                sb.Append("<div class='msgContent' data-resultid='" + response.ResultID + "' data-msgid='" + response.MessageID + "' data-msgpostid='" + response.MediaPostID + "'>" + response.Message + "</div>");

                sb.Append("<div class='postActions'>");
                sb.Append("<div class='total-shares'>" + response.Share_Count + " <span> Shares</span></div>");
                sb.Append("<div class='source twitter'> <span>(" + response.Lang + ")</span> </div>");
                sb.Append("<div class='total-favorites'>" + response.Favourite_Count + "<span>Favourites  </span> </div>");
                sb.Append("</div>");

                sb.Append("<div class='reportingTags'>");
                sb.Append("<div><span>User : </span>" + response.UsrName + " (" + response.UsrScreenName + ")" + " - " + response.UsrLocation + "</div>");
                sb.Append("<div><span> Type : </span> " + response.ResultType + "</div>");
                sb.Append("<div><span>Created On : </span>" + response.CreatedOn + "</div>");
                sb.Append("<button type='button' class='btnSharePost icon-edit sfBtn smlbtn-primary' >Edit</button>");
                sb.Append("</div>");

                sb.Append("</div>");
                //sb.Append("$('.btnSharePost').on('click', function () { SocialFeedShare.UseCurrentPost(this); });");
            }

            ltrSearchContainer.Text = sb.ToString();

        }
    }

    #region "Facebook"

    string FBAppID = "541359166069634";
    string FBSecret = "ac23651781b9276575a1787d09d006dc";

    string[] permissions = { "email", "publish_actions" };
    private const string AuthenticationUrlFormat =
        "https://graph.facebook.com/oauth/access_token?client_id={0}&client_secret={1}&redirect_uri={2}&grant_type=client_credentials&scope=publish_actions";

    protected void cbFacebook_CheckedChanged(object sender, EventArgs e)
    {
        bool isChecked = cbFacebook.Checked;
        if (isChecked)
        {
            string app_id = FBAppID;
            string app_secret = FBSecret;
            string scope = "publish_actions";
            string requestCode = string.Empty;
            if (Session[FBCodeSessionKey] == null)
            {
                Session[MessageKey] = txtFeedContent.Text.Trim();
                //Session[TitleKey] = txtTitle.Text.Trim();
                Session[ShareCodeType] = "Facebook";
                Session[CurrentResultID] = hdnSelectedMessageID.Value;
                Session[CurrentMessage] = lblPostTitle.Text.Trim();

                string queryString = Request.Url.Query;

                string redirectUrl = Request.Url.AbsoluteUri;
                if (queryString.Trim() != string.Empty)
                {
                    redirectUrl = redirectUrl.Replace(queryString, string.Empty);
                }
                string url = string.Format(
                "https://graph.facebook.com/oauth/authorize?client_id={0}&redirect_uri={1}&scope={2}",
                app_id, redirectUrl, scope);
                Response.Redirect(url, false);
            }
        }
        else
        {
            Session.Remove(FBCodeSessionKey);
            string queryString = Request.Url.Query;

            string redirectUrl = Request.Url.AbsoluteUri;
            if (queryString.Trim() != string.Empty)
            {
                redirectUrl = redirectUrl.Replace(queryString, string.Empty);
                Response.Redirect(redirectUrl);
            }
        }
    }

    private void SetFacebookCode()
    {
        if (Request["Code"] != null)
        {
            string requestCode = Request["code"].ToString();
            Session[FBCodeSessionKey] = requestCode;
        }
    }

    public bool PostFacebook()
    {


        string requestCode = Session[FBCodeSessionKey].ToString();

        string scope = "publish_actions";

        if (requestCode == null)
        {
            Session[MessageKey] = txtFeedContent.Text.Trim();
            string queryString = Request.Url.Query;

            string redirectUrl = Request.Url.AbsoluteUri;
            if (queryString.Trim() != string.Empty)
            {
                redirectUrl = redirectUrl.Replace(queryString, string.Empty);
            }
            string url = string.Format(
                "https://graph.facebook.com/oauth/authorize?client_id={0}&redirect_uri={1}&scope={2}",
                FBAppID, redirectUrl, scope);
            Response.Redirect(url, false);
        }
        else
        {
            string accessToken = string.Empty;
            Dictionary<string, string> tokens = new Dictionary<string, string>();

            string queryString = Request.Url.Query;

            string redirectUrl = Request.Url.AbsoluteUri;
            if (queryString.Trim() != string.Empty)
                redirectUrl = redirectUrl.Replace(queryString, string.Empty);

            string url = string.Format("https://graph.facebook.com/oauth/access_token?client_id={0}&redirect_uri={1}&scope={2}&code={3}&client_secret={4}",
                FBAppID, redirectUrl, scope, requestCode, FBSecret);

            try
            {
                WebRequest request = WebRequest.Create(url);
                WebResponse response = request.GetResponse();

                using (Stream responseStream = response.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(responseStream, Encoding.UTF8);
                    String responseString = reader.ReadToEnd();

                    foreach (string token in responseString.Split('&'))
                    {
                        tokens.Add(token.Substring(0, token.IndexOf("=")),
                            token.Substring(token.IndexOf("=") + 1, token.Length - token.IndexOf("=") - 1));
                    }

                    NameValueCollection query = HttpUtility.ParseQueryString(responseString);
                    accessToken = query["access_token"];
                }

                string access_token = tokens["access_token"];
                dynamic parameters = new ExpandoObject();
                parameters.message = txtFeedContent.Text.Trim();

                var client = new FacebookClient(access_token);
                //client = new FacebookClient(access_token);
                var returnID = client.Post("/me/feed", parameters);

                if (returnID != null)
                {
                    if (returnID["id"] != null)
                    {
                        string rtID = returnID["id"];
                        string message = txtFeedContent.Text.Trim();
                        string resultID = hdnSelectedMessageID.Value;
                        SocialFeedController feedController = new SocialFeedController();
                        UserChoiceInfo userChoiceInfo = feedController.ConvertToUserChoice(rtID, message, resultID);

                        int output = feedController.SaveUserChoice(userChoiceInfo);
                        if (output == 1) return true;
                    }
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }


        }

        return false;
    }

    #endregion

    #region "Twitter"
    string TwitterConsumerKey = "63Kfwk979OVI2eOEKLJ3mM5H2";
    string TwitterConsumerSecret = "XvFOCz6ikZLiUfQBDajANvY9KREcFbWlVAtpEPprHlqF99WeK9";
    protected void cbTwitter_CheckedChanged(object sender, EventArgs e)
    {
        bool isChecked = cbTwitter.Checked;
        if (isChecked)
        {
            if (Session[TwitterCodeSessionKey] == null)
            {
                Session[MessageKey] = txtFeedContent.Text.Trim();
                //Session[TitleKey] = txtTitle.Text.Trim();
                Session[ShareCodeType] = "Twitter";
                Session[CurrentResultID] = hdnSelectedMessageID.Value;
                Session[CurrentMessage] = lblPostTitle.Text.Trim();

                OAuthTokenResponse reqToken = OAuthUtility.GetRequestToken(
                 TwitterConsumerKey,
                 TwitterConsumerSecret,
                 Request.Url.AbsoluteUri);

                string url = string.Format("http://twitter.com/oauth/authorize?oauth_token={0}", reqToken.Token);
                Response.Redirect(url, false);
            }

        }
        else
        {

            Session.Remove(TwitterCodeSessionKey);
            string queryString = Request.Url.Query;

            string redirectUrl = Request.Url.AbsoluteUri;
            if (queryString.Trim() != string.Empty)
            {
                redirectUrl = redirectUrl.Replace(queryString, string.Empty);
                Response.Redirect(redirectUrl);
            }
        }
    }

    private void SetTwitterCode()
    {
        if (Request["oauth_token"] != null)
        {
            string requestCode = Request["oauth_token"].ToString();
            Session[TwitterCodeSessionKey] = requestCode;

            string authVerifier = Request["oauth_verifier"].ToString();
            Session[TwitterAuthVerifierSessionKey] = authVerifier;
        }
    }

    public bool PostTwitter()
    {

        string resultID = hdnSelectedMessageID.Value;

        string requestCode = string.Empty;
        if (Session[TwitterCodeSessionKey] != null)
            requestCode = Session[TwitterCodeSessionKey].ToString();

        if (requestCode == null)
        {
            Session[MessageKey] = txtFeedContent.Text.Trim();
            //Session[TitleKey] = txtTitle.Text.Trim();
            Session[ShareCodeType] = "Twitter";

            OAuthTokenResponse reqToken = OAuthUtility.GetRequestToken(
                TwitterConsumerKey, TwitterConsumerSecret, Request.Url.AbsoluteUri);


            string url = string.Format("http://twitter.com/oauth/authorize?oauth_token={0}", reqToken.Token);
            Response.Redirect(url, false);
        }
        else
        {
            string requestToken = Session[TwitterCodeSessionKey].ToString();
            string pin = Session[TwitterAuthVerifierSessionKey].ToString();

            var tokens = OAuthUtility.GetAccessToken(
                TwitterConsumerKey,
                TwitterConsumerSecret,
                requestToken,
                pin);

            OAuthTokens accesstoken = new OAuthTokens()
            {
                AccessToken = tokens.Token,
                AccessTokenSecret = tokens.TokenSecret,
                ConsumerKey = TwitterConsumerKey,
                ConsumerSecret = TwitterConsumerSecret
            };

            TwitterResponse<TwitterStatus> response = TwitterStatus.Update(
                    accesstoken,
                    txtFeedContent.Text.Trim());



            if (response != null && response.Result == RequestResult.Success)
            {

                SocialFeedController feedController = new SocialFeedController();
                UserChoiceInfo userChoiceInfo = feedController.ConvertToUserChoice(response, txtFeedContent.Text, resultID);
                int output = feedController.SaveUserChoice(userChoiceInfo);

                if (output == 1)
                    return true;
                else
                    return false;
            }
            else
            {
                if (response != null)
                {
                    twitterCallBackContent = response.Content;
                }

            }

        }


        return false;

    }

    #endregion

    #region "LinkedIn"
    //string LinkedInAppID = "81vihziao64lhi";
    //string LinkedInSecret = "8okmHR66NgNwVIwo";
    string LinkedInAppID = string.Empty;
    string LinkedInSecret = string.Empty;
    string LinkedInCompanyID = "3479430";


    protected void cbLinkedIn_CheckedChanged(object sender, EventArgs e)
    {
        bool isChecked = cbLinkedIn.Checked;
        if (isChecked)
        {

            string requestCode = string.Empty;
            if (Session[LinkedInCodeSessionKey] == null)
            {

                Session[MessageKey] = txtFeedContent.Text.Trim();
                //Session[TitleKey] = txtTitle.Text.Trim();
                Session[ShareCodeType] = "LinkedIn";
                Session[CurrentResultID] = hdnSelectedMessageID.Value;
                Session[CurrentMessage] = lblPostTitle.Text.Trim();

                var config = new LinkedInApiConfiguration(LinkedInAppID, LinkedInSecret);

                // get the APIs client
                var api = new LinkedInApi(config);

                string queryString = Request.Url.Query;

                string redirectUrl = Request.Url.AbsoluteUri;
                if (queryString.Trim() != string.Empty)
                {
                    redirectUrl = redirectUrl.Replace(queryString, string.Empty);
                }

                var scope = AuthorizationScope.ReadBasicProfile | AuthorizationScope.ReadEmailAddress | AuthorizationScope.WriteShare | AuthorizationScope.ReadWriteCompanyPage;
                var state = Guid.NewGuid().ToString();
                var url = api.OAuth2.GetAuthorizationUrl(scope, state, redirectUrl);

                Response.Redirect(url.AbsoluteUri, false);
            }
        }
        else
        {
            Session.Remove(LinkedInCodeSessionKey);
            string queryString = Request.Url.Query;

            string redirectUrl = Request.Url.AbsoluteUri;
            if (queryString.Trim() != string.Empty)
            {
                redirectUrl = redirectUrl.Replace(queryString, string.Empty);
                Response.Redirect(redirectUrl);
            }
        }
    }

    private void SetLinkedInCode()
    {
        if (Request["Code"] != null)
        {
            string requestCode = Request["code"].ToString();
            Session[LinkedInCodeSessionKey] = requestCode;
        }
    }

    private bool PostLinkedIn()
    {
        string requestCode = Session[LinkedInCodeSessionKey].ToString();

        if (requestCode == null)
        {
            Session[MessageKey] = txtFeedContent.Text.Trim();
            //Session[TitleKey] = txtTitle.Text.Trim();

            var config = new LinkedInApiConfiguration(LinkedInAppID, LinkedInSecret);
            var api = new LinkedInApi(config);

            string queryString = Request.Url.Query;

            string redirectUrl = Request.Url.AbsoluteUri;
            if (queryString.Trim() != string.Empty)
            {
                redirectUrl = redirectUrl.Replace(queryString, string.Empty);
            }

            var scope = AuthorizationScope.ReadBasicProfile | AuthorizationScope.ReadEmailAddress | AuthorizationScope.WriteShare | AuthorizationScope.ReadWriteCompanyPage;
            var state = Guid.NewGuid().ToString();
            var url = api.OAuth2.GetAuthorizationUrl(scope, state, redirectUrl);

            Response.Redirect(url.AbsoluteUri, false);
        }
        else
        {
            int linkedInCompanyID = int.Parse(LinkedInCompanyID);

            string queryString = Request.Url.Query;

            string redirectUrl = Request.Url.AbsoluteUri;
            if (queryString.Trim() != string.Empty) redirectUrl = redirectUrl.Replace(queryString, string.Empty);

            try
            {
                string message = txtFeedContent.Text.Trim();

                var config = new LinkedInApiConfiguration(LinkedInAppID, LinkedInSecret);
                // get the APIs client
                var api = new LinkedInApi(config);
                AuthorizationAccessToken userToken = api.OAuth2.GetAccessToken(requestCode, redirectUrl);

                if (userToken != null)
                {
                    string acessToken = userToken.AccessToken;
                    DateTime authorizationDateUTC = userToken.AuthorizationDateUtc;
                    int? expiresIn = userToken.ExpiresIn;

                    AccessTokenController accessTokenController = new AccessTokenController();
                    int addUpdateResult = accessTokenController.AddLinkedInAccessToken(acessToken, authorizationDateUTC, expiresIn);
                }

                UserAuthorization user = new UserAuthorization(userToken.AccessToken);

                PostShareResult postShareResult = api.Companies.Share(
                    user,
                    linkedInCompanyID, new PostShare()
                    {
                        Visibility = new Visibility() { Code = "anyone" },
                        Comment = message
                    });

                string resultID = hdnSelectedMessageID.Value;
                SocialFeedController feedController = new SocialFeedController();
                UserChoiceInfo userChoiceInfo = feedController.ConvertToUserChoice(postShareResult.Location, postShareResult.UpdateKey, postShareResult.UpdateUrl, message, resultID);

                int output = feedController.SaveUserChoice(userChoiceInfo);

                if (output == 1)
                    return true;
                else
                    return false;

            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }

        return false;

    }
    #endregion

    #region "Google Plus"

    private void SetGooglePlusCode()
    {
        if (Request["Code"] != null)
        {
            string requestCode = Request["code"].ToString();
            Session[GooglePlusCodeSessionKey] = requestCode;
        }
    }

    #endregion

    public void ClearSessionKeys()
    {
        Session.Remove(TwitterCodeSessionKey);
        Session.Remove(LinkedInCodeSessionKey);
        Session.Remove(FBCodeSessionKey);
        Session.Remove(GooglePlusCodeSessionKey);
        Session.Remove(ShareCodeType);
        Session.Remove(MessageKey);

        Session.Remove(CurrentMessage);
        Session.Remove(CurrentResultID);

        txtFeedContent.Text = string.Empty;
        //txtTitle.Text = string.Empty;
        lblPostTitle.Text = "----";
        twitterCallBackContent = string.Empty;


    }



    //public void ClearSessionOnly()
    //{
    //    Session.Remove(TwitterCodeSessionKey);
    //    Session.Remove(LinkedInCodeSessionKey);
    //    Session.Remove(FBCodeSessionKey);
    //    Session.Remove(GooglePlusCodeSessionKey);
    //    Session.Remove(ShareCodeType);
    //    Session.Remove(MessageKey);

    //    Session.Remove(CurrentMessage);
    //    Session.Remove(CurrentResultID);

    //    txtFeedContent.Text = string.Empty;
    //    //txtTitle.Text = string.Empty;
    //    lblPostTitle.Text = "----";
    //    twitterCallBackContent = string.Empty;
    //}

}