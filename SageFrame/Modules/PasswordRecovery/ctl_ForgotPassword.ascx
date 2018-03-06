<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ctl_ForgotPassword.ascx.cs"
    Inherits="SageFrame.Modules.PasswordRecovery.ctl_ForgotPassword" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocalee").SystemLocalize();
    });
</script>

<div class="sfForgotPasswordPage" runat="server" id="divForgotPwd">
    <div class="sfForgotPasswordPageLeft">
    <h2>Password Recovery</h2>
        <asp:Wizard ID="wzdForgotPassword" runat="server" DisplaySideBar="False" ActiveStepIndex="0"
            DisplayCancelButton="True" OnCancelButtonClick="CancelButton_Click" OnFinishButtonClick="wzdForgotPassword_FinishButtonClick"
            OnNextButtonClick="wzdForgotPassword_NextButtonClick" meta:resourcekey="wzdForgotPasswordResource1">
            <StartNavigationTemplate>
                <div class="sfButtonwrapper sfMarginnone">
                    <div class="login-btn sfBtn smlbtn-succ">
                        <span class="icon-next"></span>
                    <asp:Button ID="StartNextButton" meta:resourcekey="StartNextButtonResource1" runat="server"
                        AlternateText="Next" CommandName="MoveNext"  Text="Next" ValidationGroup="vdgForgotPassword" />
                    </div>
                    <div class="login-btn sfBtn smlbtn-danger">
                        <span class="icon-cancel"></span>
                             <asp:Button ID="CancelButton" meta:resourcekey="CancelButtonResource1" runat="server"
                        AlternateText="Cancel" CausesValidation="False" CommandName="Cancel"
                        Text="Cancel" OnClick="CancelButton_Click" />
                    </div>
                     </div>
            </StartNavigationTemplate>
            <StepNavigationTemplate>
                <div class="sfButtonwrapper">
                    <asp:Button ID="StepNextButton" runat="server" AlternateText="Next" CausesValidation="False"
                        CommandName="MoveNext" CssClass="sfBtn" Text="Next" meta:resourcekey="StepNextButtonResource1" />
                </div>
            </StepNavigationTemplate>
            <FinishNavigationTemplate>
                <div class="sfButtonwrapper">
                    <asp:Button ID="FinishButton" runat="server" AlternateText="Finish" CausesValidation="False"
                        CommandName="MoveComplete" CssClass="sfBtn" Text="Finish" meta:resourcekey="FinishButtonResource1" />
                </div>
            </FinishNavigationTemplate>
            <WizardSteps>
                <asp:WizardStep ID="WizardStep1" runat="server" Title="Prompt for Email Address"
                    meta:resourcekey="WizardStep1Resource1">
                    <div class="sfForgotYourPassWordTopInfo ">
                    </div>
                    <div class="sfForgotPasswordInfo sfFormwrapper twoColForm">
                        <div  class="sfFieldset">
                            <div class="formKey">
                                   <span class="sfFormlabel">Username</span>
                            </div>
                            <div class="formValue">
                                <asp:TextBox ID="txtUsername" runat="server" CssClass="sfInputbox"
                                autofocus="autofocus" meta:resourcekey="txtUsernameResource1"></asp:TextBox>
								 <div class="">
                                <asp:RequiredFieldValidator Display="Dynamic" ID="rfvUsername" runat="server" ControlToValidate="txtUsername"
                                ValidationGroup="vdgForgotPassword" ErrorMessage="*"  CssClass="sfErrorA"
                                meta:resourcekey="rfvUsernameResource1"></asp:RequiredFieldValidator>
                            </div>
                            </div>
                           
                        </div>
                        <div class="sfFieldset">
                            <div class="formKey">
                                <span class="sfFormlabel">Email</span>

                            </div>
                            <div class="formValue">
                                <asp:TextBox ID="txtEmail"  runat="server" CssClass="sfInputbox"
                                meta:resourcekey="txtEmailResource1"></asp:TextBox>
								<div class="">
                                <asp:RequiredFieldValidator Display="Dynamic" Text="*" ID="rfvEmail" runat="server"
                                ControlToValidate="txtEmail" ValidationGroup="vdgForgotPassword" ErrorMessage="This field is required."
                                CssClass="sfErrorA" meta:resourcekey="rfvEmailResource1"></asp:RequiredFieldValidator>
                                <asp:RegularExpressionValidator ID="revEmail" runat="server" Display="Dynamic" ControlToValidate="txtEmail"
                                CssClass="sfErrorA" SetFocusOnError="true" ValidationGroup="vdgForgotPassword"
                                ErrorMessage="*" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"
                                meta:resourcekey="revEmailResource1"></asp:RegularExpressionValidator>
                            </div>
                            </div>
                            
                        </div>
                        <div id="dvCaptchaField" runat="server" class="sfFieldset blockLevel">
                            
                            <div class="sfCaptchaImage ">
                                <asp:Image ID="CaptchaImage" runat="server" CssClass="sfCaptcha" meta:resourcekey="CaptchaImageResource1" />
                                 <asp:ImageButton ID="Refresh" CssClass="sfCaptchadata" runat="server" ValidationGroup="Sep"
                                    OnClick="Refresh_Click" meta:resourcekey="RefreshResource1" />
                                
                                </div>
                            </div>
                        
                            <asp:UpdatePanel ID="UpdatePanel1"   runat="server">
                                <ContentTemplate>
                                    <div class="sfFieldset">
                                   <div class="formKey">
                                 <span class="sfFormlabel">Enter Captcha text</span>
                                
                             
                                       
                                </div>
                                        <div class="formValue">
                                           
                                                <asp:TextBox ID="CaptchaValue" runat="server" CssClass="sfInputbox"
                                                meta:resourcekey="CaptchaValueResource1"></asp:TextBox>
                                             <div class="">
												<asp:RequiredFieldValidator ID="rfvCaptchaValueValidator" runat="server" ControlToValidate="CaptchaValue"
                                                Display="Dynamic" ErrorMessage="This field is required." ValidationGroup="vdgForgotPassword" CssClass="sfErrorA"
                                                meta:resourcekey="rfvCaptchaValueValidatorResource1"></asp:RequiredFieldValidator>
												<asp:CompareValidator ID="cvCaptchaValue" runat="server" Display="Dynamic" ControlToValidate="CaptchaValue"
                                                ValueToCompare="121" CssClass="sfErrorA" meta:resourcekey="cvCaptchaValueResource1"></asp:CompareValidator>
											</div>
                                            </div>
											
											
                                   </div>
                            </div>
                                    <div>
                                        <div class="formValue">
                                            
                                        </div>
                                    </div>
                                </ContentTemplate>
                            </asp:UpdatePanel>
                        </div>

                </asp:WizardStep>
                <asp:WizardStep ID="WizardStep2" runat="server" Title="Sending Email" StepType="Finish"
                    meta:resourcekey="WizardStep2Resource1">
                    <asp:Literal ID="litInfoEmailFinish" runat="server" meta:resourcekey="litInfoEmailFinishResource1"></asp:Literal>
                </asp:WizardStep>
            </WizardSteps>
        </asp:Wizard>
        <p style="clear: both;">
            <asp:Literal ID="FailureText" runat="server" EnableViewState="False" meta:resourcekey="FailureTextResource1"></asp:Literal>
        </p>
    </div>
</div>
