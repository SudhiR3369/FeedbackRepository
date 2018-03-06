<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TimeZoneEditor.ascx.cs"
    Inherits="Modules_Language_TimeZoneEditor" %>
<h1>
    <asp:Label ID="lblTimeZoneEditor" runat="server" Text="Time Zone Editor" meta:resourcekey="lblTimeZoneEditorResource1"></asp:Label>
</h1>
<div>
    <div class="sfFormwrapper sfTableOption">
       
            <div class="sfFieldset">
                <div class="formKey">
                    <asp:Label ID="lblAvailableLocales" runat="server" CssClass="sfFormlabel" Text="Available Locales"
                        meta:resourcekey="lblAvailableLocalesResource1"></asp:Label>
                </div>
                
                <div class="formValue">
                    <asp:DropDownList ID="ddlAvailableLocales" runat="server" CssClass="sfListmenu" AutoPostBack="True"
                        OnSelectedIndexChanged="ddlAvailableLocales_SelectedIndexChanged" meta:resourcekey="ddlAvailableLocalesResource1">
                    </asp:DropDownList>
                    <asp:Image ID="imgFlag" runat="server" meta:resourcekey="imgFlagResource1" />
                </div>
            </div>
       
    </div>
    <div class="sfFormwrapper sfGridwrapper">
        <asp:GridView ID="gdvTimeZoneEditor" runat="server" AutoGenerateColumns="False" Width="100%"
            meta:resourcekey="gdvTimeZoneEditorResource1">
            <Columns>
                <asp:TemplateField HeaderText="Name" meta:resourcekey="TemplateFieldResource1">
                    <ItemTemplate>
                        <asp:TextBox ID="txtTimeZoneName" CssClass="sfInputbox sfFullwidth" runat="server"
                            Text='<%# Eval("name") %>' meta:resourcekey="txtTimeZoneNameResource1"></asp:TextBox>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:BoundField DataField="key" HeaderText="Key" meta:resourcekey="BoundFieldResource1"
                    HeaderStyle-CssClass="sfKey" ItemStyle-CssClass="sfKey">
                    <HeaderStyle CssClass="sfKey"></HeaderStyle>
                    <ItemStyle CssClass="sfKey"></ItemStyle>
                </asp:BoundField>
                <asp:BoundField DataField="default" HeaderText="DefaultValue" meta:resourcekey="BoundFieldResource2" />
            </Columns>
            <PagerStyle CssClass="sfPagination" />
            <AlternatingRowStyle CssClass="sfEven" />
            <RowStyle CssClass="sfOdd" />
        </asp:GridView>
    </div>
</div>
<div class="sfButtonwrapper">
    <label class="sfLocale icon-save smlbtn-succ sfBtn">
        Save
        <asp:Button ID="imbUpdate" runat="server" Style="width: 16px" OnClick="imbUpdate_Click"
            meta:resourcekey="imbUpdateResource1" />
    </label>
    <label class="sfLocale icon-close smlbtn-danger sfBtn">
        Cancel
        <asp:Button ID="imbCancel" runat="server" OnClick="imbCancel_Click" meta:resourcekey="imbCancelResource1" /></label>
</div>
