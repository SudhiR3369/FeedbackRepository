<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Login.ascx.cs" Inherits="SageFrame.Modules.Admin.LoginControl.Login" %>
<%@ Register Src="../../../Controls/LoginStatus.ascx" TagName="LoginStatus" TagPrefix="uc1" %>
<script type="text/javascript">
    //<![CDATA[   
    var elementId = '#<%=UserName.ClientID%>';
    $(function () {
        $(".sfLocale").SystemLocalize();
    });

    function SubmitsEncry() {
        var UserName = document.getElementById("<%=UserName.ClientID %>").value.trim();
        var Password = document.getElementById("<%=Password.ClientID %>").value.trim();

        if (Page_ClientValidate("Login1")) {
            var key = CryptoJS.enc.Utf8.parse('8080808080808080');
            var iv = CryptoJS.enc.Utf8.parse('8080808080808080');

            var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(Password), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

            document.getElementById("<%=HDPassword.ClientID %>").value = encryptedpassword;
            document.getElementById("<%=Password.ClientID %>").value = '';
        }
        else {
            return false;
        }
    }
    //]]>	
</script>

<asp:MultiView ID="MultiView1" runat="server" ActiveViewIndex="0">
    <asp:View ID="View1" runat="server">
        <div class="flexible-box">
        <div class="main-login-area">
                        <div class="sfLogin">
                            <div class="sfLogininside">
                                <h2>
                                    <asp:Label ID="lblAdminLogin" runat="server" Text="Login" meta:resourcekey="lblAdminLoginResource1"></asp:Label>
                                </h2>
                                <div class="sfFormwrapper">
                                    <div class="sfFieldset">
                                        <span class="formKey">
                                            <span class="sfFormlabel">Username</span>
                                        </span>
                                        <span class="formValue">

                                            <asp:TextBox ID="UserName" runat="server" meta:resourcekey="UserNameResource1" autofocus="autofocus"
                                                CssClass="sfInputbox"></asp:TextBox>

                                            <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName"
                                                ErrorMessage="Username is required." ToolTip="Username is required." ValidationGroup="Login1"
                                                CssClass="sfErrorA" meta:resourcekey="UserNameRequiredResource1" InitialValue=""
                                                Text="*"></asp:RequiredFieldValidator>
                                        </span>
                                    </div>
                                    <div class="sfFieldset">
                                        <span class="formKey ">
                                            <span class="sfFormlabel">Password</span>
                                        </span>
                                        <span class="formValue">

                                            <asp:TextBox ID="Password" runat="server" TextMode="Password"
                                                meta:resourcekey="PasswordResource1" CssClass="sfInputbox"></asp:TextBox>
                                            <asp:HiddenField ID="HDPassword" runat="server" />
                                            <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password"
                                                ErrorMessage="Password is required." ToolTip="Password is required." ValidationGroup="Login1"
                                                CssClass="sfErrorA" meta:resourcekey="PasswordRequiredResource1" Text="*"></asp:RequiredFieldValidator>
                                        </span>

                                    </div>
                                </div>
                                <p>
                                    <asp:CheckBox ID="chkRememberMe" runat="server" CssClass="sfCheckBox" meta:resourcekey="RememberMeResource1" />
                                    <asp:Label ID="lblrmnt" runat="server" Text="Remember me." CssClass="sfFormlabel"
                                        meta:resourcekey="lblrmntResource1"></asp:Label>
                                </p>
                                <div id="dvCaptchaField" runat="server" style="clear: both;">
                                    <p>
                                        <asp:Image ID="CaptchaImage" runat="server" CssClass="sfCaptcha" meta:resourcekey="CaptchaImageResource1" />
                                        <span id="captchaValidator" runat="server" class="sfError">*</span>
                                        <asp:LinkButton ID="Refresh" CssClass="sfCaptchadata fa-refresh" runat="server" ValidationGroup="Sep"
                                            OnClick="Refresh_Click" meta:resourcekey="RefreshResource1" />
                                    </p>
                                    <p>

                                        <%--<p class="sfLocale" style="clear:both; white-space:nowrap;">Enter Captcha Text</p>--%>
                                        <p class="sfCaptcha">
                                            <asp:TextBox placeholder="Enter captcha text" ID="CaptchaValue" runat="server" CssClass="sfInputbox" meta:resourcekey="CaptchaValueResource1"></asp:TextBox>
                                            <asp:RequiredFieldValidator ID="rfvCaptchaValueValidator" runat="server" ControlToValidate="CaptchaValue"
                                                Display="Dynamic" ErrorMessage="*" ValidationGroup="Login1" CssClass="sfErrorA"
                                                meta:resourcekey="rfvCaptchaValueValidatorResource1"></asp:RequiredFieldValidator>
                                            <asp:CompareValidator ID="cvCaptchaValue" runat="server" Display="Dynamic" ErrorMessage="*"
                                                ControlToValidate="CaptchaValue" ValueToCompare="121" CssClass="sfError" meta:resourcekey="cvCaptchaValueResource1"></asp:CompareValidator>
                                        </p>

                                    </p>
                                </div>
                                <p>
                                    <span class="cssClassForgotPass">
                                        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
                                        <asp:HyperLink ID="hypForgotPassword" runat="server" meta:resourcekey="hypForgotPasswordResource1"
                                            Text="Forgot Password?"></asp:HyperLink>
                                    </span>
                                </p>
                                <div class="sfButtonwrapper login-page-btns">
                                    <label for='<%=LoginButton.ClientID%>' class="login-btn sfBtn smlbtn-primary ">
                                        <span class="icon-signin"></span>
                                        <asp:Button ID="LoginButton" runat="server" OnClientClick="return SubmitsEncry();" CommandName="Login"
                                            meta:resourcekey="LoginButtonResource1" CssClass="" OnClick="LoginButton_Click" Text="Sign In"
                                            ValidationGroup="Login1" />
                                    </label>
                                </div>
                                <p style="clear: both;">
                                    <asp:Literal ID="FailureText" runat="server" EnableViewState="False" meta:resourcekey="FailureTextResource1"></asp:Literal>
                                </p>
                            </div>
                        </div>
                    </div>
            <div class="login-box-intro">
                <div class="welcome-text">
                    Welcome to<br>
                    <span>new experience</span><br>
                    <span>of Contentder</span>
                </div>
                <span class="register sfBtn smlbtn-primary icon-register" onclick="window.location='/sf/sfUser-Registration.aspx';">Register</span><br />
                <div class="OpenID" runat="server" id="divOpenIDProvider">                    
                    <h3 class="sfLocale">Login with any of these OpenID providers:
                    </h3>
                    <asp:ImageButton runat="server" ID="imgBtnFacebook" ImageUrl="images/Login_with_Facebook.png"
                        OnClick="imgBtnFacebook_Click" meta:resourcekey="imgBtnFacebookResource1" />
                    <asp:ImageButton runat="server" ID="imgBtnGoogle" ImageUrl="images/Login_with_Google.png"
                        OnCommand="OpenLogin_Click" CommandArgument="https://www.google.com/accounts/o8/id"
                        CssClass="sfGoogle" meta:resourcekey="imgBtnGoogleResource1" />
                    <asp:ImageButton runat="server" ID="imgBtnYahoo" ImageUrl="images/Login_with_Yahoo.png"
                        OnCommand="OpenLogin_Click" CommandArgument="https://me.yahoo.com" meta:resourcekey="imgBtnYahooResource1" />
                    <asp:ImageButton runat="server" ID="imgBtnLinkedIn" ImageUrl="images/Login_with_LinkedIn.png"
                        OnClick="imgBtnLinkedIn_Click" meta:resourcekey="imgBtnLinkedInResource1" />
                    <asp:Label ID="lblAlertMsg" runat="server" Text="Login" Visible="False" meta:resourcekey="lblAlertMsgResource1"></asp:Label>
                    <!--<span class="sfOr sfLocale">or</span>-->
                </div>
            </div>


        </div>
    </asp:View>
    <asp:View ID="View2" runat="server">
        <uc1:LoginStatus ID="LoginStatus1" runat="server" />
    </asp:View>
</asp:MultiView>







