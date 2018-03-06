<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ImageFlowEdit.ascx.cs" Inherits="Modules_SageImageFlow_ImageFlowEdit" %>
<style>
    .hiddenField {
        opacity: 0;
        height: 0px;
        width: 0px;
    }

    .displayOrder {
        margin-bottom: 5px;
    }
</style>
<div id="divGridContents" runat="server">
    <asp:LinkButton ID="btnAddNew" runat="server" CssClass="icon-addnew sfBtn smlbtn-primary" OnClick="btnAddNew_click" Text="Add"></asp:LinkButton>
    <asp:HiddenField ID="dhnTotalItem" ClientIDMode="Static" runat="server" />

    <div class="sfGridwrapper">

        <asp:GridView ID="gdvContents" CssClass="tableBanner" runat="server"
            AutoGenerateColumns="False"
            OnRowCommand="gdvContents_RowCommand"
            OnPageIndexChanging="gdvContents_PageIndexChanging"
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
                <asp:TemplateField HeaderText="Image">
                    <ItemTemplate>
                        <img id="bannerimgGrd" alt="image" height="50" src='<%#ResolveUrl("~/Modules/SageImageFlow/images/ThumbNail/Small/"+Eval("ImageName")) %>'
                            width="50" />
                    </ItemTemplate>

                </asp:TemplateField>
                <asp:TemplateField HeaderText="Order">
                    <ItemTemplate>
                        <div>
                            <asp:LinkButton ID="imgListUp" runat="server" CausesValidation="False" CommandArgument='<%# Eval("BannerID") %>'
                                CommandName="SortUp" CssClass="icon-arrow-n displayOrder" ToolTip="Move Up" meta:resourcekey="imgListUpResource1"></asp:LinkButton>
                        </div>
                        <div>
                            <asp:LinkButton ID="imgListDown" runat="server" CausesValidation="False" CommandArgument='<%# Eval("BannerID") %>'
                                CommandName="SortDown" ToolTip="Move Down" meta:resourcekey="imgListDownResource1"
                                CssClass="icon-arrow-s displayOrder"></asp:LinkButton>
                        </div>
                    </ItemTemplate>
                    <HeaderStyle CssClass="sfEdit" Width="60px" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="IsActive">
                    <ItemTemplate>
                        <asp:Label runat="server" Text='<%#Eval("Status")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Edit">
                    <ItemTemplate>
                        <asp:LinkButton ID="TestEdit" runat="server" CssClass="icon-edit" CausesValidation="False"
                            CommandArgument='<%#Eval("BannerID") %>' CommandName="ContentEdit" />
                    </ItemTemplate>
                    <HeaderStyle CssClass="sfEdit" VerticalAlign="Top" />
                    <ItemStyle VerticalAlign="Top" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Delete">
                    <ItemTemplate>
                        <asp:LinkButton ID="TestDelete" runat="server" CssClass="icon-delete" CausesValidation="False"
                            CommandArgument='<%# Eval("BannerID") %>' CommandName="ContentDelete" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Are you sure you want to delete ?');" />
                    </ItemTemplate>

                    <HeaderStyle CssClass="sfDelete" VerticalAlign="Top" />
                </asp:TemplateField>
            </Columns>
            <AlternatingRowStyle CssClass="sfEven" />
            <RowStyle CssClass="sfOdd" />
            <EmptyDataRowStyle CssClass="sfEmptyrow" />
            <PagerStyle CssClass="sfPagination" />
        </asp:GridView>
    </div>
</div>
<div id="divBannerFrom" runat="server" visible="false">

    <asp:HiddenField ID="hdnBannerID" runat="server" Value="0" />
    <div class="sfFormwrapper">
        <div class="sfFieldset">
            <div class="formKey buttonClick">
                <span class="sfFormlabel">Image*</span>
				     <asp:TextBox ID="hdnImageName" ClientIDMode="Static" CssClass="hiddenField" Width="0px" Height="0px" runat="server"></asp:TextBox>
				</div>
				
            <div class="formValue">
                <asp:FileUpload runat="server" ID="fileBannerImage" ClientIDMode="Static" />
                <asp:Label AssociatedControlID="fileBannerImage" runat="server" ID="lblFileBanner"> Choose File</asp:Label>
           
                <asp:RequiredFieldValidator ID="rfvImage" runat="server" Display="Dynamic" ErrorMessage="*Required" ControlToValidate="hdnImageName" ValidationGroup="BannerForm"></asp:RequiredFieldValidator>
                <br />
                <br />
                <asp:Image ImageUrl="/modules/SageImageFlow/img/placeholder.gif" ID="imgPreview" ClientIDMode="Static" Width="220px" runat="server" />
            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey ">
                <span class="sfFormlabel">Title</span></div>
            <div class="formValue">
                <asp:TextBox runat="server" ID="txtTitle" CssClass=""></asp:TextBox>
                <asp:RegularExpressionValidator
                    Display="Dynamic"
                    ValidationGroup="BannerForm"
                    ControlToValidate="txtTitle" CssClass="sfCol_40" ID="RegularExpressionValidator2"
                    ValidationExpression="^[\s\S]{0,50}$" runat="server"
                    ErrorMessage="*Maximum 50 characters allowed.">
                </asp:RegularExpressionValidator>
            </div>
        </div>

        <div class="sfFieldset">
            <div class="formKey ">
                <span class="sfFormlabel">Description</span>
            </div>
            <div class="formValue">
                <asp:TextBox ID="txtDescription" runat="server" TextMode="MultiLine" CssClass="sfTextarea"></asp:TextBox>
                <asp:RegularExpressionValidator
                    Display="Dynamic"
                    ValidationGroup="BannerForm"
                    ControlToValidate="txtDescription" ID="RegularExpressionValidator1"
                    ValidationExpression="^[\s\S]{0,250}$" runat="server"
                    ErrorMessage="*Maximum 250 characters allowed.">
                </asp:RegularExpressionValidator>
            </div>
        </div>
        <div class="sfFieldset">
          
            <div class="formKey">
                <asp:CheckBox runat="server" ID="chkIsactiveContent"  Text="Is Active"/></div>
        </div>
    
            <div class="sfButtonwrapper">
                <asp:LinkButton ID="btnSaveContent" runat="server" ValidationGroup="BannerForm" OnClick="btnSaveContent_Click" CssClass="icon-update sfBtn smlbtn-succ" Text="update"></asp:LinkButton>

                <asp:LinkButton ID="btnCancel" runat="server" OnClick="btnCancel_Click" CssClass="icon-close sfBtn smlbtn-danger" Text="Cancel"></asp:LinkButton>
            </div>

        </div>
   </div>
</div>
<script type="text/javascript">
    $(function () {
        $(document).off('change', '#fileBannerImage');
        $(document).on('change', '#fileBannerImage', function () {
            var ImageName = $(this).val();
            $('#hdnImageName').val(ImageName)
            var reader = new FileReader();
            reader.readAsDataURL($(this)[0].files[0]);
            reader.onload = function (e) {
                $('#imgPreview').attr("src", e.target.result);
            }
        });

        if ($('.tableBanner tr').eq(1).children('td:first').text() == 1)//hide first cell sortup not in second page
        {
            $('.tableBanner tr').eq(1).find('.icon-arrow-n').hide();
        }
        var TotalItem = parseInt($('#dhnTotalItem').val());
        var TblLastRowVal = $('.tableBanner tr:last').children('td:first').text();
        //hide sort down of last row if pagination is not present 
        if (TblLastRowVal == TotalItem) {
            $('.tableBanner tr:last').find('.icon-arrow-s').hide();
        }

        //hide sort down of second last row if pagination is  present at last row
        var secondLastRowVal = $('.tableBanner').find("tr:nth-last-child(2)").find("td:first").text();
        if (secondLastRowVal == TotalItem) {
            $('.tableBanner').find('tr:nth-last-child(2)').find('.icon-arrow-s').hide();
        }
    })
</script>
