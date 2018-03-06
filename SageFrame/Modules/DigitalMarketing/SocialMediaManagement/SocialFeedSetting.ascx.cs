using System;
using SageFrame.Web;
using SageFrame.SocialFeedShare;


public partial class Modules_SocialFeedShare_SocialFeedSetting : BaseAdministrationUserControl
{
    int settingID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        txtSuccessMessage.Text = string.Empty;
        if (!IsPostBack)
        {
            hdnSettingID.Value = "0";
            GetSocialFeedSettingInfo();


            IncludeCss("SocialFeedShareSetting", "/Modules/SocialFeedShare/css/SocialFeedShare.css");

        }
    }

    private void GetSocialFeedSettingInfo()
    {
        SocialFeedController objController = new SocialFeedController();
        SocialFeedSettingInfo objSetting = objController.GetSocialFeedSettingInfo();
        if (objSetting != null)
        {
            hdnSettingID.Value = objSetting.SettingID.ToString();
            cbFacebook.Checked = objSetting.EnableFacebook;
            txtFacebookAppID.Text = objSetting.FBAppID;
            txtFacebookAppSecret.Text = objSetting.FBAppSecret;

            cbTwitter.Checked = objSetting.EnableTwitter;
            txtTwitterConsumerKey.Text = objSetting.TwitterConsumerKey;
            txtTwitterConsumerSecret.Text = objSetting.TwitterConsumerSecret;

            cbLinkedIn.Checked = objSetting.EnableLinkedIn;
            txtLinkedInAppID.Text = objSetting.LinkedInAppID;
            txtLinkedInAppSecret.Text = objSetting.LinkedInAppSecret;
            txtLinkedInCompanyID.Text = objSetting.LinkedInCompanyID;
        }
    }

    protected void btnSaveButton_Click(object sender, EventArgs e)
    {
        string errorMessage = string.Empty;
        bool IsFBEnabled = cbFacebook.Checked;
        string FBID = txtFacebookAppID.Text.Trim();
        string FBSecret = txtFacebookAppSecret.Text.Trim();

        bool IsTwitterEnabled = cbTwitter.Checked;
        string twitterConsumerKey = txtTwitterConsumerKey.Text.Trim();
        string twitterConsumerSecret = txtTwitterConsumerSecret.Text.Trim();

        bool IsLinkedInEnabled = cbLinkedIn.Checked;
        string linkedInAppID = txtLinkedInAppID.Text.Trim();
        string linkedInAppSecret = txtLinkedInAppSecret.Text.Trim();
        string linkedInCompanyPageID = txtLinkedInCompanyID.Text.Trim();

        if (IsFBEnabled)
        {
            if (FBID == string.Empty)
                errorMessage = "please enter Facebook APP ID";
            if (FBSecret == string.Empty)
                errorMessage += "\nplease enter Facebook App Secret";
        }

        if (IsTwitterEnabled)
        {
            if (twitterConsumerKey == string.Empty)
                errorMessage = "\nplease enter Twitter Consumer Key";
            if (twitterConsumerSecret == string.Empty)
                errorMessage += "\nplease enter Twitter Consumer Secret";
        }

        if (IsLinkedInEnabled)
        {
            if (linkedInAppID == string.Empty)
                errorMessage = "\nplease enter LinkedIn App ID";
            if (linkedInAppSecret == string.Empty)
                errorMessage += "\nplease enter LinkedIn App Secret";
        }


        if (errorMessage == string.Empty)
        {
            SocialFeedSettingInfo objSetting = new SocialFeedSettingInfo();
            objSetting.SettingID = int.Parse(hdnSettingID.Value);
            objSetting.EnableFacebook = IsFBEnabled;
            objSetting.FBAppID = FBID;
            objSetting.FBAppSecret = FBSecret;

            objSetting.EnableLinkedIn = IsLinkedInEnabled;
            objSetting.LinkedInAppID = linkedInAppID;
            objSetting.LinkedInAppSecret = linkedInAppSecret;
            objSetting.LinkedInCompanyID = linkedInCompanyPageID;
            objSetting.EnableTwitter = IsTwitterEnabled;
            objSetting.TwitterConsumerKey = twitterConsumerKey;
            objSetting.TwitterConsumerSecret = twitterConsumerSecret;

            string loggedInUserName = GetUsername;

            SocialFeedController objController = new SocialFeedController();
            int value = objController.SaveSocialFeedSettingInfo(objSetting);

            if (value == 1)
            {
                txtSuccessMessage.Text = "Settings saved Successfully";
                GetSocialFeedSettingInfo();
            }
            else
            {
                txtSuccessMessage.Text = "something went wrong. please try again";
            }

        }
        else
        {
            txtSuccessMessage.Text = errorMessage;
        }
    }
}