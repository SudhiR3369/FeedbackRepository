<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ContactUs.ascx.cs" Inherits="SageFrame.Modules.ContactUs.ContactUs" %>

<script language="javascript" type="text/javascript">
    //<![CDATA[
    $(function () {
        $('.sfLocale').Localize({ moduleKey: ContactLocal });
    });
    //]]>
</script>

<div class="cssClassFormWrapper">
    <div class="feedback-panel">
        <div class="cssClassContactWrapper">
            <div class="bannerText cssClassResetMargin">
                <div class="sfFormGroup mandatory">
                    <p class="sfNote sfLocale sfError">
                        <span class="sfError">* </span>All fields are mandatory.
                    </p>
                </div>

                <div class="sfFormGroup">
                    <label class="sfLocale">Name *</label>
                    <asp:TextBox ID="txtName" CssClass="sfInputbox required" runat="server" placeHolder="Your name" />
                    <asp:RequiredFieldValidator ID="NameRequired" runat="server" ControlToValidate="txtName"
                        ErrorMessage="*" ToolTip="name is required." Display="Dynamic" ValidationGroup="ContactUs"
                        CssClass="sfError" meta:resourcekey="UserNameRequiredResource1" InitialValue=""
                        Text="*"></asp:RequiredFieldValidator>
                </div>
                <div class="sfFormGroup">
                    <label class="sfLocale">Email *</label>

                    <asp:TextBox ID="txtContactEmail" CssClass="sfInputbox required email sfLocale" runat="server" placeHolder="Your email address" />

                    <asp:RequiredFieldValidator ID="rfvEmailRequired" runat="server" ControlToValidate="txtContactEmail"
                        Display="Dynamic" ToolTip="email is required." ErrorMessage="*" ValidationGroup="ContactUs" CssClass="sfError"></asp:RequiredFieldValidator>

                    <asp:RegularExpressionValidator ID="revEmail" runat="server" ControlToValidate="txtContactEmail"
                        Display="Dynamic" SetFocusOnError="True" ErrorMessage="Invalid email format" ValidationGroup="ContactUs"
                        ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" CssClass="sfError"></asp:RegularExpressionValidator>
                    <%-- <input type="email" id="txtContactEmail" name="email" class="sfInputbox required email sfLocale"
                        placeholder="Your Email ID" />--%>
                </div>
                <div class="sfFormGroup msgbox">
                    <label class="sfLocale">Message *</label>
                    <asp:TextBox ID="txtMessage" TextMode="MultiLine" CssClass="sfInputbox required" runat="server" Rows="5" Columns="35" placeholder="Type your message" />
                    <asp:RequiredFieldValidator ID="reqMessage" runat="server" ControlToValidate="txtMessage"
                        ErrorMessage="*" ToolTip="message is required." Display="Dynamic" ValidationGroup="ContactUs"
                        CssClass="sfError" meta:resourcekey="UserNameRequiredResource1" InitialValue=""
                        Text="*"></asp:RequiredFieldValidator>
                    <%--<textarea id="txtMessage" name="message" class="sfInputbox required" rows="5" cols="35" placeholder="Type Your Message"></textarea>--%>
                </div>

                <div class="form_group sfFormGroup">
                    <label class="captcha-math">
                        <asp:Label ID="Label1" runat="server" Text="Sum Of *"></asp:Label>
                        <span>
                            <asp:Literal runat="server" ID="ltrFirst"></asp:Literal></span>
                        <span>+</span>
                        <span>
                            <asp:Literal runat="server" ID="ltrSecond"></asp:Literal></span>
                    </label>

                    <span class="input interactive" runat="server" id="trCustomCaptcha">

                        <asp:TextBox ID="txtCaptchaSUM" runat="server" CssClass="sfInputbox input_field"></asp:TextBox>

                    </span>
                      <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtCaptchaSUM"
                        Display="Dynamic" ErrorMessage="*" ValidationGroup="ContactUs" CssClass="sfError"></asp:RequiredFieldValidator>
                    <asp:RangeValidator runat="server" Type="Integer" Display="Static"
                        MinimumValue="0" MaximumValue="100"  CssClass="revFieldContact" ControlToValidate="txtCaptchaSUM" ValidationGroup="ContactUs"
                        ErrorMessage="Value must be a whole number between 0 and 100" />
                  
                </div>
                <div class="cssClassButtonWrapper sfFormGroup">
                    <label></label>
                    <asp:LinkButton ID="btnSubmit" runat="server" AlternateText="Submit" ValidationGroup="ContactUs"
                        CssClass="sfBtn contact" Text="Submit" OnClick="btnSubmitButton_Click"
                        meta:resourcekey="FinishButtonResource1" />
                    <%--<input type="button" id="btnSubmit" class="sfBtn sfPrimaryBtn sfLocale" value="Submit" />--%>
                </div>
                <asp:Label ID="txtSuccessMessageforcontact" runat="server" />
            </div>
        </div>
    </div>
</div>
