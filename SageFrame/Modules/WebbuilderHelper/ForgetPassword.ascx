<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ForgetPassword.ascx.cs" Inherits="Modules_WebHelpManagement_ForgetPassword" %>

<asp:MultiView ID="MultiView1" runat="server" ActiveViewIndex="0">
    <asp:View ID="View1" runat="server">
        <div class="flexible-box">
            <div class="main-login-area">
                <div class="sfLogin">
                    <h2>
                        <asp:Label ID="lblAdminLogin" runat="server" Text="Easy Builder" meta:resourcekey="lblAdminLoginResource1"></asp:Label>
                    </h2>
                    <div class="messegeArea">
                        <div class="requiredField">
                            <asp:RequiredFieldValidator ID="EmailRequiured" runat="server" ControlToValidate="txtEmail"
                                ErrorMessage="Email is required." ToolTip="Email is required." ValidationGroup="Login1"
                                CssClass="sfErrorA" InitialValue=""
                                Text="Email is required" Display="Dynamic"></asp:RequiredFieldValidator>
                            <div class="separator"></div>
                            <asp:Literal ID="FailureText" runat="server" EnableViewState="False" meta:resourcekey="FailureTextResource1"></asp:Literal>
                        </div>
                    </div>
                    <div id="divSuccessReq" runat="server" class="success">

                    </div>
                    <div id="divForgotPasswordFrom" runat="server" class="sfLogininside">

                        <div class="sfFormwrapper">
                            <div class="sfFieldset">
                                <span class="formValue">
                                    <asp:TextBox ID="txtEmail" runat="server" placeholder="Email" autofocus="autofocus"
                                        CssClass="sfInputbox userName"></asp:TextBox>
                                </span>
                            </div>
                        </div>
                        <div id="dvCaptchaField" class="captchaField" runat="server" style="clear: both;">
                            <p>
                                <asp:Image ID="CaptchaImage" runat="server" CssClass="sfCaptcha" meta:resourcekey="CaptchaImageResource1" />
                                <span id="captchaValidator" runat="server" class="sfError">*</span>
                                <asp:LinkButton ID="Refresh" CssClass="sfCaptchadata fa-refresh" runat="server" ValidationGroup="Sep"
                                    OnClick="Refresh_Click" meta:resourcekey="RefreshResource1" />
                            </p>

                            <p class="sfCaptcha">
                                <asp:TextBox placeholder="Enter captcha text" ID="CaptchaValue" runat="server" CssClass="sfInputbox" meta:resourcekey="CaptchaValueResource1"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="rfvCaptchaValueValidator" runat="server" ControlToValidate="CaptchaValue"
                                    Display="Dynamic" ErrorMessage="*" ValidationGroup="Login1" CssClass="sfErrorA"
                                    meta:resourcekey="rfvCaptchaValueValidatorResource1"></asp:RequiredFieldValidator>
                                <asp:CompareValidator ID="cvCaptchaValue" runat="server" Display="Dynamic" ErrorMessage="*"
                                    ControlToValidate="CaptchaValue" ValueToCompare="121" CssClass="sfError" meta:resourcekey="cvCaptchaValueResource1" EnableViewState="true"></asp:CompareValidator>
                            </p>
                        </div>
                        <div class="sfButtonwrapper login-page-btns forget-pass-btn">
                            <asp:LinkButton ID="btnForgetPassword" runat="server"
                                meta:resourcekey="LoginButtonResource1" CssClass="login-btn sfBtn smlbtn-primary" OnClick="btnForgetPassword_Click" Text="Recover Password"
                                ValidationGroup="Login1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </asp:View>
</asp:MultiView>