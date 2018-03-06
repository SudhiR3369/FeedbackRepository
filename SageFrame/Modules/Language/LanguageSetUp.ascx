<%@ Control Language="C#" AutoEventWireup="true" CodeFile="LanguageSetUp.ascx.cs"
    Inherits="Modules_Language_LanguageSetUp" %>
<%@ Reference VirtualPath="~/Modules/Language/CreateLanguagePack.ascx" %>
<%@ Reference VirtualPath="~/Modules/Language/LocalPage.ascx" %>
<h1>
    <asp:Label ID="lblTimeZoneEditor" runat="server" Text="Language Editor" meta:resourcekey="lblTimeZoneEditorResource1"></asp:Label>
</h1>
<div class="sfFormwrapper languagePack twoColForm">
    <div class="sfFieldset">
        <div class="formKey">
            <asp:Label ID="lblLanguage" CssClass="sfFormlabel" runat="server" Text="Select Language"
                meta:resourcekey="lblLanguageResource1"></asp:Label>
        </div>

        <div class="formValue">
            <div class="sfAvailablelanguage">
                <asp:DropDownList ID="ddlLanguage" runat="server" CssClass="sfListmenu" AutoPostBack="True"
                    OnSelectedIndexChanged="ddlLanguage_SelectedIndexChanged" meta:resourcekey="ddlLanguageResource1">
                </asp:DropDownList>
                <asp:Image ID="imgFlagLanguage" runat="server" meta:resourcekey="imgFlagLanguageResource1" />
            </div>

        </div>
    </div>
        <div class="sfFieldset">
            <div class="formKey">
                <asp:RadioButtonList ID="rbLanguageType" RepeatLayout="Flow" RepeatDirection="Horizontal" runat="server"
                    AutoPostBack="True" OnSelectedIndexChanged="rbLanguageType_SelectedIndexChanged"
                    meta:resourcekey="rbLanguageTypeResource1">
                    <asp:ListItem Text="English" Value="0" Selected="True" meta:resourcekey="ListItemResource1"></asp:ListItem>
                    <asp:ListItem Text="Native" Value="1" meta:resourcekey="ListItemResource2"></asp:ListItem>
                </asp:RadioButtonList>
            </div>
        </div>
    </div>
</div>
<div class="sfButtonwrapper">
<label class="sfLocale icon-save smlbtn-succ sfBtn">Save
    <asp:Button ID="imbUpdate" runat="server" 
        OnClick="imbUpdate_Click" meta:resourcekey="imbUpdateResource1" /></label>
   
        <label class="sfLocale icon-close smlbtn-danger sfBtn">Cancel
    <asp:Button ID="imbCancel" runat="server" 
        OnClick="imbCancel_Click" meta:resourcekey="imbCancelResource1" /></label>
   
</div>
