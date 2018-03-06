using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.UserManagement;
using SageFrame.Security.Helpers;
using SageFrame.Security.Entities;
using SageFrame.Security;
using SageFrame.SageFrameClass.MessageManagement;
using SageFrameClass.MessageManagement;
using System.Data;
using SageFrame.Common;
using SageFrame.Captcha;

public partial class Modules_WebHelpManagement_ForgetPassword : BaseUserControl
{
    private Random random = new Random();
    ForgotPasswordInfo sageframeuser = new ForgotPasswordInfo();
    CaptchaController objCaptcha = new CaptchaController();
    protected void Page_Load(object sender, EventArgs e)
    {
        IncludeCss("loginCss", "/Modules/WebbuilderHelper/css/login.css");
        if (!IsPostBack)
        {
            divForgotPasswordFrom.Visible = true;
            divSuccessReq.Visible = false;
            InitializeCaptcha();
        }

    }
    private void InitializeCaptcha()
    {
        objCaptcha.GenerateCaptcha();
        CaptchaValue.Text = "";
        CaptchaImage.ImageUrl = "~/CaptchaImageHandler.aspx";
        rfvCaptchaValueValidator.Enabled = false;
    }
    private string GenerateRandomCode()
    {
        string s = "";
        string[] CapchaValue = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };
        for (int i = 0; i < 6; i++)
            s = String.Concat(s, CapchaValue[this.random.Next(36)]);
        return s;
    }

    private string GenerateRandomCookieValue()
    {
        string s = "";
        string[] CapchaValue = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };
        for (int i = 0; i < 10; i++)
            s = String.Concat(s, CapchaValue[this.random.Next(36)]);
        return s;
    }
    protected void Refresh_Click(object sender, EventArgs e)
    {
        CaptchaValue.Text = string.Empty;
        InitializeCaptcha();
    }

    private bool ValidateCaptcha()
    {

        if (!objCaptcha.ValidedCaptcha(CaptchaValue.Text))
        {
            FailureText.Text = string.Format("<p class='sfError'>{0}</p>", GetSageMessage("UserRegistration", "EnterTheCorrectCapchaCode"));
            CaptchaValue.Text = string.Empty;
            InitializeCaptcha();
            return false;

        }
        return true;
    }
    protected void btnForgetPassword_Click(object sender, EventArgs e)
    {
        if (ValidateCaptcha())
        {
            MembershipController member = new MembershipController();
            if (txtEmail.Text != "")
            {
                UserInfo user = member.GerUserByEmail(txtEmail.Text, GetPortalID);
                if (!string.IsNullOrEmpty(user.UserName))
                {
                    if (user.Email.ToLower().Equals(txtEmail.Text.ToLower()))
                    {
                        ForgotPasswordInfo objInfo = UserManagementController.GetMessageTemplateByMessageTemplateTypeID(SystemSetting.PASSWORD_FORGOT_USERNAME_PASSWORD_MATCH, GetPortalID);

                        List<ForgotPasswordInfo> objList = UserManagementController.GetMessageTemplateListByMessageTemplateTypeID(SystemSetting.PASSWORD_CHANGE_REQUEST_EMAIL, GetPortalID);
                        foreach (ForgotPasswordInfo objPwd in objList)
                        {
                            DataTable dtTokenValues = UserManagementController.GetPasswordRecoveryTokenValue(user.UserName, GetPortalID);
                            CommonFunction comm = new CommonFunction();
                            string replaceMessageSubject = MessageToken.ReplaceAllMessageToken(objPwd.Subject, dtTokenValues);
                            string replacedMessageTemplate = MessageToken.ReplaceAllMessageToken(objPwd.Body, dtTokenValues);
                            try
                            {
                                divForgotPasswordFrom.Visible = false;
                                divSuccessReq.Visible = true;
                                divSuccessReq.InnerHtml = "<h3>Password recover request is success and recover link is send to "+user.Email+" <h3>";
                                MailHelper.SendMailNoAttachment(objPwd.MailFrom, txtEmail.Text, replaceMessageSubject, replacedMessageTemplate, string.Empty, string.Empty);
                            }
                            catch (Exception)
                            {
                                FailureText.Text = string.Format("<p class='sfError'>{0}</p>", GetSageMessage("PasswordRecovery", "SecureConnectionFPError"));
                            }
                        }
                    }
                    else
                    {
                        InitializeCaptcha();
                        FailureText.Text = string.Format("<p class='sfError'>{0}</p>", GetSageMessage("PasswordRecovery", "UsernameOrEmailAddressDoesnotMatched"));

                    }
                }
                else
                {
                    InitializeCaptcha();
                    FailureText.Text = string.Format("<p class='sfError'>{0}</p>", GetSageMessage("UserManagement", "UserDoesnotExist"));
                }
            }
            else
            {
                InitializeCaptcha();
                FailureText.Text = string.Format("<p class='sfError'>{0}</p>", GetSageMessage("PasswordRecovery", "PleaseEnterAllTheRequiredFields"));
            }
        }
        else
        {
            CaptchaValue.Text = string.Empty;
        }
    }
    //private void SaveChangePassWord(string email)
    //{
    //    string ramdomPassword = GenerateRandomCode();
    //    string Password, PasswordSalt;
    //    MembershipController m = new MembershipController();
    //    UserInfo userOld = m.GerUserByEmail(email, GetPortalID);
    //    if (userOld != null && userOld.Email != null)
    //    {
    //        PasswordHelper.EnforcePasswordSecurity(m.PasswordFormat, ramdomPassword, out Password, out PasswordSalt);
    //        UserInfo user = new UserInfo(userOld.UserID, Password, PasswordSalt, m.PasswordFormat);
    //        m.ChangePassword(user);
    //        List<ForgotPasswordInfo> messageTemplates = UserManagementController.GetMessageTemplateListByMessageTemplateTypeID(SystemSetting.PASSWORD_RECOVERED_SUCCESSFUL_EMAIL, GetPortalID);
    //        foreach (ForgotPasswordInfo messageTemplate in messageTemplates)
    //        {
    //            DataTable dtTokenValues = UserManagementController.GetPasswordRecoverySuccessfulTokenValue(userOld.UserName, GetPortalID);
    //            string replacedMessageSubject = MessageToken.ReplaceAllMessageToken(messageTemplate.Subject, dtTokenValues);
    //            string replacedMessageTemplate = MessageToken.ReplaceAllMessageToken(messageTemplate.Body, dtTokenValues);
    //            try
    //            {
    //                MailHelper.SendMailNoAttachment(messageTemplate.MailFrom, userOld.Email, replacedMessageSubject, replacedMessageTemplate, string.Empty, string.Empty);
    //            }
    //            catch (Exception)
    //            {
    //                ShowMessage("", GetSageMessage("PasswordRecovery", "SecureConnectionFPRError"), "", SageMessageType.Alert);
    //            }
    //        }
    //    }
    //    else
    //    {
    //        FailureText.Text = string.Format("<span class='sfError'>{0}</span>", "This is not a valid user email address of this site");
    //    }
    //}
}