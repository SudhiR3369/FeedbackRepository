<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SageBannerEdit.ascx.cs" Inherits="Modules_SageBanner_SageBannerEdit" %>

<asp:Panel runat="server" ID="pnlBannerTbl">
    <asp:LinkButton ID="btnAddNew" runat="server" CssClass="icon-addnew smlbtn-primary sfBtn" OnClick="btnAddNew_click" Text="Add New"></asp:LinkButton>
    <div class="sfGridwrapper">
        <asp:GridView ID="gdvSageBanner" runat="server"
            AutoGenerateColumns="False"
            OnRowCommand="gdvSageBanner_RowCommand"
            OnPageIndexChanging="gdvSageBanner_PageIndexChanging"
            EmptyDataText="......No Records Found......"
            AllowPaging="true"
            PageSize="10"
            GridLines="Vertical">
            <Columns>
                <asp:TemplateField HeaderText="S.N">
                    <ItemTemplate>
                        <asp:Label class="sfFormlabel" runat="server" Text=' <%#Container.DataItemIndex+1 %>'></asp:Label>
                    </ItemTemplate>

                </asp:TemplateField>
                <asp:TemplateField HeaderText="Banner Image">
                    <ItemTemplate>
                        <img id="bannerimgGrd" alt="image" height="50" src='<%#ResolveUrl("~/Modules/SageBanner/images/ThumbNail/Small/"+Eval("BannerImageName")) %>'
                            width="50" />
                    </ItemTemplate>

                </asp:TemplateField>
                <asp:TemplateField HeaderText="Banner Caption">
                    <ItemTemplate>
                        <asp:Label runat="server" Text='<%#Eval("BannerSloganTitle")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="IsActive">
                    <ItemTemplate>
                        <asp:Label runat="server" Text='<%#Eval("IsActive")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Edit">
                    <ItemTemplate>
                        <asp:LinkButton ID="BannerEdit" runat="server" CssClass="icon-edit" CausesValidation="False"
                            CommandArgument='<%#Eval("BannerID") %>' CommandName="ContentEdit" />
                    </ItemTemplate>
                    <HeaderStyle CssClass="sfEdit" VerticalAlign="Top" />
                    <ItemStyle VerticalAlign="Top" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Delete">
                    <ItemTemplate>
                        <asp:LinkButton ID="BannerDelete" runat="server" CssClass="icon-delete" CausesValidation="False"
                            CommandArgument='<%# Eval("BannerID") %>' CommandName="ContentDelete" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Are you sure you want to delete ?');" />
                    </ItemTemplate>
                    <HeaderStyle CssClass="sfDelete" VerticalAlign="Top" />

                </asp:TemplateField>
            </Columns>
        </asp:GridView>
    </div>
</asp:Panel>
<asp:Panel ID="pnlBannerForm" runat="server" Visible="false">
    <div class="sfFormwrapper">
        <asp:HiddenField ID="hdnBannerID" Value="0" runat="server" />
        <asp:HiddenField ID="hdnImageName" Value="" runat="server" />

        <div class="sfFieldset">
            <div class="formKey buttonClick">
                <span class="sfFormlabel">Banner Image</span>
            </div>
            <div class="formValue">
                <asp:FileUpload ID="fileCtlContentImage" runat="server" />
                <asp:Label ID="lblFIle" AssociatedControlID="fileCtlContentImage" Text="Choose file" runat="server"></asp:Label>
                <span style="display:block">
                    <asp:RegularExpressionValidator
                        ID="refUpload"
                        runat="server"
                        ErrorMessage="Please upload valid extension."
                        ValidationExpression="^.+(.jpeg|.JPEG|.JPG|.jpg|.png|.PNG|.gif|.GIF)$"
                        ValidationGroup="refImage"
                        ControlToValidate="fileCtlContentImage" Display="Dynamic"> </asp:RegularExpressionValidator>
                    <asp:Label ID="lblErrorMsg" ForeColor="Red" runat="server"></asp:Label>
                    <asp:Image ID="imgPreview" runat="server" Visible="false" Style="display: block" /></span>
            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey">
                <span class="sfFormlabel">Caption</span>
            </div>
            <div class="formValue">
                <asp:TextBox runat="server" ID="txtSloganTitle" CssClass="sfInputbox"></asp:TextBox>
            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey">
                <span class="sfFormlabel">Caption Description</span>
            </div>
            <div class="formValue">
                <asp:TextBox runat="server" ID="txtSlogan" CssClass="sfInputbox" TextMode="MultiLine" Rows="3"></asp:TextBox>
            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey">
                <span class="sfFormlabel">Link Button Name</span>
            </div>
            <div class="formValue">
                <asp:TextBox runat="server" ID="txtLinkBtnName" CssClass="sfInputbox"></asp:TextBox>
            </div>
        </div>
        <div class="sfFieldset">
            <div class="">
                <input type="checkbox" id="chkChooseUrl" />
                <label for="chkChooseUrl" class="sfFormlabel">Link Button URL Use External </label>


            </div>
            <div class="formValue">
                <asp:DropDownList ID="ddlPageList" runat="server"></asp:DropDownList>
                <asp:TextBox runat="server" CssClass="sfInputbox txtContentLinkUrl" ID="txtContentLinkUrl" placeholder="https://www.xyz.com OR #ContainerID"></asp:TextBox>
                <%--                                <asp:RegularExpressionValidator ID="revUrl" ControlToValidate="txtContentLinkUrl" ValidationExpression="^((ftp|http|https):\/\/)?([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*)$" runat="server" ErrorMessage="!!! Invalid URL"></asp:RegularExpressionValidator>--%>
            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey">
                <asp:CheckBox runat="server" ID="chkIsActive" Text="Is Active" />

            </div>

        </div>

        <div class="sfButtonwrapper">

            <asp:LinkButton ID="btnSaveContent" runat="server" ValidationGroup="refImage" OnClick="btnSaveContent_Click" CssClass="icon-save sfBtn smlbtn-succ" Text="save"></asp:LinkButton>


            <asp:LinkButton ID="btnCancel" runat="server" OnClick="btnCancel_Click" CssClass="icon-cancel sfBtn smlbtn-danger" Text="Cancel"></asp:LinkButton>

        </div>

    </div>
</asp:Panel>
<script>
    $('#<%=txtContentLinkUrl.ClientID%>').hide();
    $('#chkChooseUrl').change(function () {
        if ($(this).is(':checked')) {
            $('#<%=ddlPageList.ClientID%>').hide();
            $('#<%=txtContentLinkUrl.ClientID%>').show();
        }
        else {
            $('#<%=ddlPageList.ClientID%>').show();
            $('#<%=txtContentLinkUrl.ClientID%>').hide();
        }
    });
</script>
