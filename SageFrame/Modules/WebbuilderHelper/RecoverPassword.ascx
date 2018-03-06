<%@ Control Language="C#" AutoEventWireup="true" CodeFile="RecoverPassword.ascx.cs"
    Inherits="SageFrame.Modules.PasswordRecovery.ctl_RecoverPassword" %>
<script type="text/javascript">
    function SubmitsEncry() {
        var Password = document.getElementById("<%=txtPassword.ClientID %>").value.trim();
        if (Page_ClientValidate("PasswordRecover")) {
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
            document.getElementById("<%=txtPassword.ClientID %>").value = '';
            document.getElementById("<%=txtConfirmPassword.ClientID %>").value = '';    
        }
        else {
            return false;
        }
    }
    //]]>	
</script>
<div class="flexible-box">
    <div class="main-login-area">
        <div class="sfLogin">
            <h2>
                <asp:Label ID="lblAdminLogin" runat="server" Text="Easy Builder" meta:resourcekey="lblAdminLoginResource1"></asp:Label>
            </h2>
            <div class="messegeArea">
                <div class="requiredField">
                    <asp:RequiredFieldValidator ID="rfvPassword" runat="server" ControlToValidate="txtPassword"
                        ErrorMessage="Password is required."  ValidationGroup="PasswordRecover"
                        CssClass="sfErrorA" InitialValue=""
                        Display="Dynamic"></asp:RequiredFieldValidator>
                    <div class="separator"></div>
                    <asp:CompareValidator ID="cmpPassword" runat="server" ControlToCompare="txtPassword" ControlToValidate="txtConfirmPassword"
                        Display="Dynamic" ErrorMessage="Password mismatch"
                        ValidationGroup="PasswordRecover"></asp:CompareValidator>
                    <asp:RequiredFieldValidator ID="rfvConfirmPass" runat="server" ControlToValidate="txtConfirmPassword"
                        ErrorMessage="Password is required." ValidationGroup="PasswordRecover"
                        CssClass="sfErrorA" InitialValue=""
                        Display="Dynamic"></asp:RequiredFieldValidator>
                      <asp:Literal ID="FailureText" runat="server" EnableViewState="False" meta:resourcekey="FailureTextResource1"></asp:Literal>
                </div>
            </div>
            <div id="divSuccessReq" runat="server" class="success">
            </div>
            <div id="divRecoverPasswordFrom" runat="server" class="sfLogininside">
                <div class="sfFormwrapper">
                    <div class="sfFieldset">
                        <span class="formValue">
                            <asp:HiddenField ID="hdnUserName" runat="server" />
                            <asp:HiddenField ID="HDPassword" runat="server" />
                            <asp:TextBox ID="txtPassword" runat="server" TextMode="Password" placeholder="New Password" autofocus="autofocus"
                                CssClass="sfInputbox passWord"></asp:TextBox>
                        </span>
                    </div>
                    <div class="sfFieldset">
                        <span class="formValue">
                            <asp:TextBox ID="txtConfirmPassword" runat="server" TextMode="Password" placeholder="Retype Password"
                                CssClass="sfInputbox passWord"></asp:TextBox>
                        </span>
                    </div>
                </div>
                <div class="sfButtonwrapper login-page-btns forget-pass-btn">
                    <asp:Button style="margin-top: 40px;" ID="btnResetPassword" runat="server"
                        meta:resourcekey="LoginButtonResource1"  CssClass="login-btn sfBtn smlbtn-primary" Text="Change Password"
                      OnClientClick="return SubmitsEncry();"  ValidationGroup="PasswordRecover" OnClick="btnResetPassword_Click"  />
                </div>
            </div>
        </div>
    </div>
</div>
