<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SocialFeedSetting.ascx.cs" Inherits="Modules_SocialFeedShare_SocialFeedSetting" %>

<div class="sfFormWrapper">
    <h2>Social Share Setting</h2>
    <asp:HiddenField ID="hdnSettingID" runat="server" />

    <div class="divFeedCapsule">
        <h3><span class="capsuleTitle">Facebook</span></h3>
        <div class="sfFieldset">
            <span class="formKey">
                <label class="sfLocale">Enable: </label>
            </span>
            <span class="formValue">
                <asp:CheckBox ID="cbFacebook" CssClass="sfCheckbox " runat="server" />
            </span>
        </div>

        <div class="sfFieldset">
            <span class="formKey">
                <label class="sfLocale">App ID: </label>
            </span>
            <span class="formValue">
                <asp:TextBox ID="txtFacebookAppID" CssClass="sfInputbox" runat="server" placeHolder="enter app id " />
            </span>
        </div>
        <div class="sfFieldset">
            <span class="formKey">
                <label class="sfLocale">App Secret: </label>
            </span>
            <span class="formValue">
                <asp:TextBox ID="txtFacebookAppSecret" CssClass="sfInputbox" runat="server" placeHolder="enter app secret " />
            </span>
        </div>


    </div>

    <div class="divFeedCapsule">
        <h3><span class="capsuleTitle">Twitter</span></h3>
        <div class="sfFieldset">
            <span class="formKey">
                <label class="sfLocale">Enable: </label>
            </span>
            <span class="formValue">
                <asp:CheckBox ID="cbTwitter" CssClass="sfCheckbox" runat="server" />
            </span>
        </div>

        <div class="sfFieldset">
            <span class="formKey">
                <label class="sfLocale">Consumer Key: </label>
            </span>
            <span class="formValue">
                <asp:TextBox ID="txtTwitterConsumerKey" CssClass="sfInputbox" runat="server" placeHolder="enter consumer key " />
            </span>
        </div>
        <div class="sfFieldset">
            <span class="formKey">
                <label class="sfLocale">Consumer Secret: </label>
            </span>
            <span class="formValue">
                <asp:TextBox ID="txtTwitterConsumerSecret" CssClass="sfInputbox" runat="server" placeHolder="enter consumer secret " />
            </span>
        </div>


    </div>

    <div class="divFeedCapsule">
        <h3><span class="capsuleTitle">LinkedIn</span></h3>
        <div class="sfFieldset">
            <span class="formKey">
                <label class="sfLocale">Enable: </label>
            </span>
            <span class="formValue">
                <asp:CheckBox ID="cbLinkedIn" CssClass="sfCheckbox " runat="server" />

            </span>
        </div>

        <div class="sfFieldset">
            <span class="formKey">
                <label class="sfLocale">App ID: </label>
            </span>
            <span class="formValue">
                <asp:TextBox ID="txtLinkedInAppID" CssClass="sfInputbox" runat="server" placeHolder="enter app id " />
            </span>
        </div>
        <div class="sfFieldset">
            <span class="formKey">
                <label class="sfLocale">App Secret: </label>
            </span>
            <span class="formValue">
                <asp:TextBox ID="txtLinkedInAppSecret" CssClass="sfInputbox" runat="server" placeHolder="enter app secret " />
            </span>
        </div>

        <div class="sfFieldset">
            <span class="formKey">
                <label class="sfLocale">CompanyID: </label>
            </span>
            <span class="formValue">
                <asp:TextBox ID="txtLinkedInCompanyID" CssClass="sfInputbox" runat="server" placeHolder="enter your company page id" />
            </span>
        </div>
    </div>

    <div class="sfButtonwraper">
        <asp:Button ID="btnSave" runat="server" AlternateText="Save"
            CssClass="sfBtn smlbtn-succ btnShowTemp" Text="Save" OnClick="btnSaveButton_Click"
            meta:resourcekey="SaveButtonResource1" />
        <%--<input type="button" id="btnSubmit" class="sfBtn sfPrimaryBtn sfLocale" value="Submit" />--%>
    </div>

    <asp:Label ID="txtSuccessMessage" runat="server" />
</div>
