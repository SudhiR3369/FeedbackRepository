<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SystemEventStartUpManagement.ascx.cs"
    Inherits="Modules_Admin_SystemStartUpManagement_SystemEventStartUpManagement" %>
<h1>System Event StartUp Management</h1>
<asp:Panel ID="pnlEventStartUp" runat="server">
    <div class="sfFormwrapper twoColForm">
        <h2>
            <asp:Label ID="lblAddEditSystemEventStartUp" runat="server" Text="Add/Edit System Event StartUp"></asp:Label>
        </h2>
        <asp:HiddenField ID="hdnPortalStartUpID" runat="server" Value="0" />
        
            <div class="sfFieldset">
                <div class="formKey">
                    <asp:Label ID="lblControlUrl" runat="server" CssClass="sfFormlabel" Text="Control Url"></asp:Label>
                </div>
                <div class="formValue">
                    <asp:DropDownList ID="ddlControlUrl" ToolTip="Select Control Url"
                        runat="server"
                        AutoPostBack="False" CssClass="sfListmenu">
                    </asp:DropDownList>
                </div>
                
            </div>
            <div class="sfFieldset">
                <div class="formKey">
                    <asp:Label ID="lblEventLocation" runat="server" CssClass="sfFormlabel" Text="Event Location"></asp:Label>
                </div>

                <div class="formValue">
                    <asp:DropDownList ID="ddlEventLocation" ToolTip="Select Event Type"
                        runat="server"
                        AutoPostBack="False" CssClass="sfListmenu">
                    </asp:DropDownList>
                </div>
                
            </div>
            <div class="sfFieldset">
                <div class="formKey">
                    <span class="inline"><asp:CheckBox ID="chkIsAdmin" runat="server" CssClass="sfCheckbox" Text="Is Admin"/></span>
                    
                </div>

               
            </div>
            <div class="sfFieldset">
                <div class="formKey">
                    <span class="inline"> <asp:CheckBox ID="chkIsControlUrl" runat="server" CssClass="sfCheckbox" Text="Is ControlUrl"/></span>
                    
                </div>

               
                
            </div>
            <div class="sfFieldset">
                <div class="formKey">
                   <asp:CheckBox ID="chkIsActive" runat="server" CssClass="sfCheckbox" Text="Is Active" />
                   
                </div>

                
              
            </div>
       
    </div>
    <div class="sfButtonwrapper">
        <label id="lblSave" class="sfBtn smlbtn-succ icon-save" runat="server">
            Save
        <asp:Button ID="imbSave" runat="server" OnClick="imbSave_Click" />
        </label>
        <label id="lblCancel" class="sfBtn smlbtn-danger icon-close" runat="server">
            Cancel
        <asp:Button ID="imbCancel" runat="server" OnClick="imbCancel_Click"
            CausesValidation="False" />
        </label>

    </div>
</asp:Panel>
<asp:Panel ID="pnlSystemEventStartUpList" runat="server">
    <div class="sfButtonwrapper">
        <label id="lblAddNew" class="sfBtn icon-addnew smlbtn-primary" runat="server">
            Add System Event StartUp
       <asp:Button ID="imbAddNew" runat="server" OnClick="imbAddNew_Click" />
        </label>

    </div>
    <div class="sfGridwrapper">
        <asp:GridView ID="grdList" runat="server" AutoGenerateColumns="False" EmptyDataText="No Record to Show..."
            GridLines="None" CssClass="sfNoRecord" AllowPaging="True" PageSize="15" BorderColor="White" BorderWidth="0px"
            OnPageIndexChanging="grdList_PageIndexChanging" OnRowCommand="grdList_RowCommand" OnRowDataBound="gdvList_RowDataBound"
            Width="100%">
            <Columns>
                <asp:TemplateField HeaderText="ControlUrl">
                    <ItemTemplate>
                        <asp:LinkButton ID="LinkButton1" runat="server" CommandName="EditEvent" CommandArgument='<%# Eval("PortalStartUpID") %>'>
                            <asp:Label ID="lblSubject" runat="server" Text='<%# Eval("ControlUrl") %>'></asp:Label>
                        </asp:LinkButton>
                    </ItemTemplate>
                    <ItemStyle HorizontalAlign="Left" VerticalAlign="Top" />
                    <HeaderStyle HorizontalAlign="Left" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Event Location">
                    <ItemTemplate>
                        <asp:Label ID="lblEventLocation" runat="server" Text='<%# Eval("EventLocationName") %>'></asp:Label>
                    </ItemTemplate>
                    <ItemStyle HorizontalAlign="Left" VerticalAlign="Top" />
                    <HeaderStyle HorizontalAlign="Left" />
                </asp:TemplateField>
                <asp:BoundField DataField="IsAdmin" HeaderText="Is Admin">
                    <HeaderStyle CssClass="sfColumnIsActive" />
                </asp:BoundField>
                <asp:BoundField DataField="IsControlUrl" HeaderText="Is ControlUrl">
                    <HeaderStyle CssClass="sfColumnIsActive" />
                </asp:BoundField>
                <asp:BoundField DataField="IsSystem" HeaderText="Is System">
                    <HeaderStyle CssClass="sfColumnIsActive" />
                </asp:BoundField>
                <asp:BoundField DataField="IsActive" HeaderText="Is Active">
                    <HeaderStyle CssClass="sfColumnIsActive" />
                </asp:BoundField>
                <asp:TemplateField HeaderText="AddedOn">
                    <ItemTemplate>
                        <%# Eval("AddedOn","{0:yyyy/MM/dd}") %>
                    </ItemTemplate>
                    <ItemStyle HorizontalAlign="Left" VerticalAlign="Top" Width="100px" />
                    <HeaderStyle HorizontalAlign="Left" CssClass="sfColumnAddedOn" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="AddedBy">
                    <ItemTemplate>
                        <asp:Label ID="lblAddedeBY" runat="server" Text='<%# Eval("AddedBy") %>'></asp:Label>
                    </ItemTemplate>
                    <ItemStyle HorizontalAlign="Left" VerticalAlign="Top" />
                    <HeaderStyle HorizontalAlign="Left" CssClass="sfAddedBy" />
                </asp:TemplateField>
                <asp:TemplateField>
                    <HeaderStyle CssClass="sfColumnEdit" />
                    <ItemStyle HorizontalAlign="Left" VerticalAlign="Top" />
                    <ItemTemplate>
                        <%--<asp:ImageButton ID="imbEdit" runat="server" CausesValidation="False" CommandArgument='<%# Eval("PortalStartUpID") %>'
                            CommandName="EditEvent" ImageUrl='<%# GetTemplateImageUrl("imgedit.png", true) %>'
                            ToolTip="Edit" />--%>
                        <asp:LinkButton ID="imbEdit" runat="server" CausesValidation="False" CommandArgument='<%# Eval("PortalStartUpID") %>'
                            CommandName="EditEvent" CssClass="icon-edit" ToolTip="Edit" />
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderStyle-CssClass="sfDelete" meta:resourcekey="TemplateFieldResource3">
                    <ItemTemplate>
                        <asp:LinkButton ID="imbDelete" runat="server" CausesValidation="False" CommandArgument='<%# Eval("PortalStartUpID") %>'
                            CommandName="DeleteEvent" CssClass="icon-delete" ToolTip="Delete" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Are you sure you want to delete this startup event?');" />
                    </ItemTemplate>
                    <HeaderStyle VerticalAlign="Top" />
                    <ItemStyle VerticalAlign="Top" />
                </asp:TemplateField>
            </Columns>
            <PagerStyle CssClass="sfPagination" />
            <HeaderStyle CssClass="sfClassHeadingOne" />
            <RowStyle CssClass="sfOdd" />
            <AlternatingRowStyle CssClass="sfEven" />
        </asp:GridView>
    </div>
</asp:Panel>
