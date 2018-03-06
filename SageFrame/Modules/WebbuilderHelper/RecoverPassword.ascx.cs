#region "Copyright"
/*
SageFrame® - http://www.sageframe.com
Copyright (c) 2009-2010 by SageFrame
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
#endregion

#region "References"
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Web.UI;
using System.Web.Security;
using System.Web.UI.WebControls;
using SageFrame.Framework;
using SageFrame.UserManagement;
using SageFrame.Web;
using SageFrame.Message;
using SageFrame.Security.Helpers;
using SageFrame.Security.Entities;
using SageFrame.Security;
using SageFrameClass.MessageManagement;
using SageFrame.SageFrameClass.MessageManagement;
#endregion

namespace SageFrame.Modules.PasswordRecovery
{
    public partial class ctl_RecoverPassword : BaseUserControl
    {
        string QueryValue;
        public string helpTemplate = string.Empty;
        MembershipController m = new MembershipController();
        ForgotPasswordInfo sageframeuser;
        protected void Page_Load(object sender, EventArgs e)
        {
            IncludeJs("LoginEncrytDecryt", "/Modules/Admin/LoginControl/js/AESEncrytDecryt.js");
            IncludeCss("PasswordRecovery", "/Modules/WebbuilderHelper/css/login.css");
            ForgotPasswordInfo objInfo = UserManagementController.GetMessageTemplateByMessageTemplateTypeID(SystemSetting.PASSWORD_RECOVERED_HELP, GetPortalID);
            if (objInfo != null)
            {
                helpTemplate = objInfo.Body;
            }
            if (!IsPostBack)
            {
                if (Request.QueryString["RecoveringCode"] != null)
                {
                    QueryValue = Request.QueryString["RecoveringCode"].ToString();
                    try
                    {
                        rfvConfirmPass.Visible = true;
                        rfvPassword.Visible = true;
                        cmpPassword.Visible = true;
                        QueryValue = EncryptionMD5.Decrypt(QueryValue);
                        sageframeuser = UserManagementController.GetUsernameByActivationOrRecoveryCode(QueryValue, GetPortalID);
                        if (sageframeuser.CodeForUsername != null)
                        {
                            if (sageframeuser.IsAlreadyUsed)
                            {
                                FailureText.Text = string.Format("<p class='sfError'>{0}</p>", GetSageMessage("PasswordRecovery", "RecoveryCodeAlreadyActivated"));

                                divRecoverPasswordFrom.Visible = false;
                            }
                            else
                            {
                                hdnUserName.Value = sageframeuser.CodeForUsername;
                                divRecoverPasswordFrom.Visible = true;
                            }
                        }
                        else
                        {
                            divRecoverPasswordFrom.Visible = false;
                            FailureText.Text = string.Format("<p class='sfError'>{0}</p>", GetSageMessage("UserManagement", "UserDoesNotExist"));

                        }
                    }
                    catch (Exception ex)
                    {
                        divRecoverPasswordFrom.Visible = false;
                        FailureText.Text = string.Format("<p class='sfError'>{0}</p>", GetSageMessage("PasswordRecovery", "InvalidRecoveringCode"));
                    }
                }
                else
                {
                    divRecoverPasswordFrom.Visible = false;
                    FailureText.Text = string.Format("<p class='sfError'>{0}</p>", GetSageMessage("PasswordRecovery", "RecoveringCodeIsNotAvailable"));

                }

            }
        }
        protected void btnResetPassword_Click(object sender, EventArgs e)
        {
            string DecPassword = AESEncrytDecry.DecryptStringAES(HDPassword.Value);
            if (DecPassword == "keyError")
            {
                FailureText.Text = string.Format("<span class='sfError'>{0}</span>", GetSageMessage("UserLogin", "UsernameandPasswordcombinationdoesntmatched"));//"Username and Password combination doesn't matched!";
            }
            UserInfo userOld = m.GetUserDetails(GetPortalID, hdnUserName.Value);
            string Password, PasswordSalt;
            PasswordHelper.EnforcePasswordSecurity(m.PasswordFormat, DecPassword, out Password, out PasswordSalt);
            UserInfo user = new UserInfo(userOld.UserID, Password, PasswordSalt, m.PasswordFormat);
            m.ChangePassword(user);
            FailureText.Text = string.Format("<p class='sfSuccess'>{0}</p>", "Password Changed Successfully.");
            divRecoverPasswordFrom.Visible = false;
            divSuccessReq.Visible = true;
            divSuccessReq.InnerHtml = "<a href='/login'>Go to login</a>";
            UserManagementController.DeactivateRecoveryCode(userOld.UserName, GetPortalID);
            rfvConfirmPass.Visible = false;
            rfvPassword.Visible = false;
            cmpPassword.Visible = false;
        }
    }
}