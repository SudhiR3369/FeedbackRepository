<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SageFeatureEdit.ascx.cs" Inherits="SageFeatureEdit" %>
<!--<h2>Feature Edit</h2>-->
<div id="divFeatureForm" runat="server" visible="false">
    <asp:HiddenField ID="hdnFeatureID" runat="server" Value="0" />
    <div class="sfFormwrapper">
        <div class="sfFieldset">
            <div class="formKey">
                <span class="sfFormlabel">Title*</span>

            </div>
            <div class="formValue">
                <asp:TextBox ID="txtTitle" runat="server" CssClass="sfTextBox"></asp:TextBox>
                <asp:RequiredFieldValidator ID="rfvTitle" runat="server" ValidationGroup="FeatureForm" ControlToValidate="txtTitle" ErrorMessage="*Required" Display="Dynamic"></asp:RequiredFieldValidator>
            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey">
                <span class="sfFormlabel">Description*</span>

            </div>
            <div class="formValue">
                <asp:TextBox ID="txtDescription" runat="server" CssClass="sfTextarea" TextMode="MultiLine"></asp:TextBox>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ValidationGroup="FeatureForm" ControlToValidate="txtDescription" ErrorMessage="*Required" Display="Dynamic"></asp:RequiredFieldValidator>
            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey buttonClick">
                <span class="sfFormlabel">Image*</span>
                <asp:TextBox ID="txtHdnImageName" runat="server" ClientIDMode="Static" Width="0" Height="0" Style="opacity: 0"></asp:TextBox>

            </div>
            <div class="formValue">
                <asp:FileUpload ID="fileUploadFeatImage" CssClass="sfTextbox" ClientIDMode="Static" runat="server" />
                <label for="fileUploadFeatImage">Choose file</label>
                
                <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ValidationGroup="FeatureForm" ControlToValidate="txtHdnImageName" ErrorMessage="*Required" Display="Dynamic"></asp:RequiredFieldValidator>
                <asp:RegularExpressionValidator
                    ID="RegularExpressionValidator1"
                    runat="server"
                    Display="Dynamic"
                    ValidationGroup="FeatureForm"
                    ErrorMessage="*Invalid File"
                    ValidationExpression="^.+(.jpg|.JPG|.png|.PNG|.JPEG|.jpeg|.gif|.GIF)$"
                    ControlToValidate="fileUploadFeatImage"> </asp:RegularExpressionValidator>
                <br />
                 <asp:Image ID="imgPreview" runat="server" ClientIDMode="Static" Style="display: none; width: 250px" />
            </div>
        </div>
        <div class="sfFieldset">
         
            <div class="formKey">
                <asp:CheckBox ID="chkIsActive" runat="server" Text="Is Active" />

            </div>
        </div>
        <div class="sfButtonwrapper">
           
                <asp:LinkButton ID="btnSave"  ValidationGroup="FeatureForm" CssClass="sfBtn smlbtn-succ icon-save " runat="server" Text="Save" OnClick="btnSave_Click" />
                <asp:LinkButton ID="btnCancel" runat="server" CssClass="sfBtn smlbtn-danger icon-close" Text="Cancel" OnClick="btnCancel_Click" />
            
        </div>
    </div>
</div>
<div id="divFeatureTable" runat="server">
    <asp:LinkButton ID="btnAddNew" runat="server" CssClass="sfBtn smlbtn-primary icon-addnew" OnClick="btnAddNew_Click">Add</asp:LinkButton>
    <div class="sfGridwrapper">

        <asp:GridView ID="gdvFeature" runat="server"
            AutoGenerateColumns="False"
            EmptyDataText="......No Records Found......"
            AllowPaging="true"
            PageSize="10" OnRowCommand="gdvFeature_RowCommand" OnPageIndexChanging="gdvFeature_PageIndexChanging1">
            <Columns>
                <asp:TemplateField HeaderText="S.N">
                    <ItemTemplate>
                        <asp:Label class="sfFormlabel" runat="server" Text=' <%#Container.DataItemIndex+1 %>'></asp:Label>
                    </ItemTemplate>

                </asp:TemplateField>
                <asp:TemplateField HeaderText="Title">
                    <ItemTemplate>
                        <asp:Label class="sfFormlabel" runat="server" Text=' <%#Eval("Title")%>'></asp:Label>
                    </ItemTemplate>

                </asp:TemplateField>
                <asp:TemplateField HeaderText="IsActive">
                    <ItemTemplate>
                        <asp:Label runat="server" Text='<%#Eval("Status")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Edit">
                    <ItemTemplate>
                        <asp:LinkButton ID="TestEdit" runat="server" CssClass="icon-edit" CausesValidation="False"
                            CommandArgument='<%#Eval("FeatID") %>' CommandName="ContentEdit" />
                    </ItemTemplate>
                    <HeaderStyle CssClass="sfEdit" VerticalAlign="Top" />
                    <ItemStyle VerticalAlign="Top" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Delete">
                    <ItemTemplate>
                        <asp:LinkButton ID="TestDelete" runat="server" CssClass="icon-delete" CausesValidation="False"
                            CommandArgument='<%# Eval("FeatID") %>' CommandName="ContentDelete" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Are you sure you want to delete ?');" />
                    </ItemTemplate>
                    <HeaderStyle CssClass="sfDelete" VerticalAlign="Top" />
                </asp:TemplateField>
            </Columns>
        </asp:GridView>
    </div>
</div>
<script type="text/javascript">
    if ($('#txtHdnImageName').val() != "") {
        $('#imgPreview').show();
    }
    $('input#fileUploadFeatImage').off();
    $('input#fileUploadFeatImage').on('change', function () {
        $('#imgPreview').show();
        $('#txtHdnImageName').val($(this).val())
        $('#txtHdnImageName').focusin();
        $('#txtHdnImageName').focusout();
        var reader = new FileReader();
        reader.onload = function (e) {

            $('#imgPreview').attr("src", e.target.result);
        }
        reader.readAsDataURL($('#fileUploadFeatImage')[0].files[0]);
    });
</script>
