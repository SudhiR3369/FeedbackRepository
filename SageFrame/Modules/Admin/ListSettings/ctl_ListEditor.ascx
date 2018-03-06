﻿<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ctl_ListEditor.ascx.cs"
    Inherits="SageFrame.Modules.Admin.ControlPanel.ctl_ListEditor" %>
<h1>
    <asp:Label ID="lblListManagement" runat="server" Text="List Management" meta:resourcekey="lblListManagementResource1"></asp:Label>
</h1>
<div>
    <div class="sfListmanager clearfix">
        <div class="sfTreeviewholder">
            <div class="sfButtonwrapper sfMargintopnone">
                <label class="sfLocale icon-addnew smlbtn-primary sfBtn">
                    Add New List
                <asp:Button ID="imgAddNewList" runat="server" OnClick="imgAddNewList_Click"
                    ToolTip="Add New List" meta:resourcekey="imgAddNewListResource1" /></label>

            </div>
            <div class="sfTreeview sfCurve">
                <asp:TreeView ID="tvList" runat="server" OnSelectedNodeChanged="tvList_SelectedNodeChanged"
                    ImageSet="Msdn" meta:resourcekey="tvListResource1">
                </asp:TreeView>
            </div>
        </div>
        <div class="sfListright">
            <asp:Panel ID="pnlListAll" Visible="False" runat="server" meta:resourcekey="pnlListAllResource1">
                <div class="sfButtonwrapper sfMargintopnone">
                    <label class="sfLocale icon-addnew smlbtn-primary sfBtn">
                        Add List Item
                        <asp:Button ID="imgAddList1" runat="server" OnClick="imgAddSubList_Click" ToolTip="Add List"
                            meta:resourcekey="imgAddList1Resource1" /></label>
                    <label class="sfLocale icon-delete smlbtn-danger sfBtn">
                        <asp:Label runat="server" ID="lblDeleteList"></asp:Label>
                        <asp:Button ID="imgDeleteList" runat="server" OnClick="imgDeleteList_Click"
                            OnClientClick="if(confirm('Are you sure you want to delete?')!=true)return false;" ToolTip="Delete List"
                            meta:resourcekey="imgDeleteListResource1" />
                    </label>

                    <%--  <label class="sfLocale icon-close sfBtn"> Cancel--%>
                    <%-- <asp:Button ID="imgCancelAll" runat="server" OnClick="imgCancelAll_Click" ToolTip="Cancel"
                            Visible="False" meta:resourcekey="imgCancelAllResource1" />--%>
                    <%-- </label>--%>
                </div>
                <div class="sfGridwrapper sfListing curve sfTableOption">
                    <div class="sfRowfilter sfSorting">
                        <div class="sfFieldset ">
                            <span class="formKey">
                                <asp:Label ID="lblListNameLabel" runat="server" CssClass="sfFormlabel" Text="List Name "
                                    meta:resourcekey="lblListNameLabelResource1"></asp:Label>
                            </span>
                            <span class="formValue">
                                <asp:Label ID="lblListName" runat="server" meta:resourcekey="lblListNameResource1"></asp:Label>
                            </span>
                        </div>
                        <div class="sfFieldset">
                            <span class="formKey">
                                <asp:Label ID="lblParentText" runat="server" CssClass="sfFormlabel" Text="Parent  "
                                    Visible="False" meta:resourcekey="lblParentTextResource1"></asp:Label>
                               </span>
                                <span class="formValue">
                                    <asp:Label ID="lblParent" runat="server" Visible="False" meta:resourcekey="lblParentResource1"></asp:Label>
                                </span>
                        </div>

                        <div class="sfFieldset">
                            <span class="formKey">
                                <asp:Label ID="lblTotal" runat="server" CssClass="sfFormlabel" Text="Total " meta:resourcekey="lblTotalResource1"></asp:Label>
                            </span>
                            <span class="formValue">
                                <asp:Label ID="lblEntry" runat="server" meta:resourcekey="lblEntryResource1"></asp:Label>
                            </span>
                        </div>
                        <div class="sfFieldset">
                            <span class="formKey selectKey">
                                <asp:Label ID="lblRecord" CssClass="sfFormlabel" runat="server" Text="Show rows "
                                    meta:resourcekey="lblRecordResource1"></asp:Label>
                            </span>
                            <span class="formValue">
                                <asp:DropDownList ID="ddlGridPageSize" CssClass="sfListmenusmall" AutoPostBack="True"
                                    runat="server" OnSelectedIndexChanged="ddlGridPageSize_SelectedIndexChanged"
                                    meta:resourcekey="ddlGridPageSizeResource1">
                                    <asp:ListItem Value="0" meta:resourcekey="ListItemResource1">All</asp:ListItem>
                                    <asp:ListItem Value="10" Selected="True" meta:resourcekey="ListItemResource2">10</asp:ListItem>
                                    <asp:ListItem Value="25" meta:resourcekey="ListItemResource3">25</asp:ListItem>
                                    <asp:ListItem Value="50" meta:resourcekey="ListItemResource4">50</asp:ListItem>
                                    <asp:ListItem Value="75" meta:resourcekey="ListItemResource5">75</asp:ListItem>
                                    <asp:ListItem Value="100" meta:resourcekey="ListItemResource6">100</asp:ListItem>
                                </asp:DropDownList>
                            </span>
                        </div>
                    </div>

                </div>
                <asp:Panel ID="pnlViewList" Visible="False" runat="server" meta:resourcekey="pnlViewListResource1">

                    <div class="sfGridwrapper">
                        <asp:GridView ID="gdvSubList" runat="server" AutoGenerateColumns="False" OnRowCommand="gdvSubList_RowCommand"
                            GridLines="None" OnRowEditing="gdvSubList_RowEditing" OnRowDeleting="gdvSubList_RowDeleting"
                            OnRowDataBound="gdvSubList_RowDataBound" Width="100%" AllowPaging="True" OnPageIndexChanging="gdvSubList_PageIndexChanging"
                            meta:resourcekey="gdvSubListResource1">
                            <Columns>
                                <asp:BoundField DataField="Text" HeaderText="Text" SortExpression="Text" meta:resourcekey="BoundFieldResource1">
                                    <HeaderStyle Width="75%" />
                                    <ItemStyle Width="70%" />
                                </asp:BoundField>
                                <asp:BoundField DataField="Value" HeaderText="Value" SortExpression="Value" meta:resourcekey="BoundFieldResource2">
                                    <HeaderStyle Width="10%" />
                                    <ItemStyle Width="10%" />
                                </asp:BoundField>
                                <asp:TemplateField meta:resourcekey="TemplateFieldResource1">
                                    <ItemTemplate>
                                        <div class="sfMoveNS">
                                            <asp:LinkButton ID="imgListUp" runat="server" CausesValidation="False" CommandArgument='<%# Eval("EntryID") %>'
                                                CommandName="SortUp" CssClass="icon-arrow-n"
                                                ToolTip="Move Up" meta:resourcekey="imgListUpResource1" />

                                            <asp:LinkButton ID="imgListDown" runat="server" CausesValidation="False" CommandArgument='<%# Eval("EntryID") %>'
                                                CommandName="SortDown" CssClass="icon-arrow-s"
                                                ToolTip="Move Down" meta:resourcekey="imgListDownResource1" />
                                        </div>
                                    </ItemTemplate>
                                    <HeaderStyle CssClass="sfEdit" />
                                </asp:TemplateField>
                                <asp:TemplateField meta:resourcekey="TemplateFieldResource2">
                                    <ItemTemplate>
                                        <asp:LinkButton ID="imgEdit" runat="server" CausesValidation="False" CommandArgument='<%# Eval("EntryID") %>'
                                            CommandName="listEdit" CssClass="icon-edit"
                                            ToolTip="Edit" meta:resourcekey="imgEditResource1" />
                                    </ItemTemplate>
                                    <HeaderStyle CssClass="sfEdit" />
                                </asp:TemplateField>
                                <asp:TemplateField meta:resourcekey="TemplateFieldResource3">
                                    <ItemTemplate>
                                        <asp:LinkButton ID="imgDelete" runat="server" CausesValidation="False" CommandArgument='<%# Eval("EntryID") %>'
                                            CommandName="Del" CssClass="icon-delete"
                                            ToolTip="Delete" meta:resourcekey="imgDeleteResource1" />
                                    </ItemTemplate>
                                    <HeaderStyle CssClass="sfDelete" />
                                </asp:TemplateField>
                            </Columns>
                            <AlternatingRowStyle CssClass="sfEven" />
                            <PagerStyle CssClass="sfPagination" />
                            <RowStyle CssClass="sfOdd" />
                        </asp:GridView>
                    </div>
                </asp:Panel>
            </asp:Panel>
            <asp:Panel ID="pnlAddList" Visible="False" runat="server" meta:resourcekey="pnlAddListResource1">
                <h2>
                    <asp:Label ID="lblAddListHeading" runat="server" Text="Add List Item" meta:resourcekey="lblAddListHeadingResource1"></asp:Label>
                </h2>
                <div class="sfFormwrapper twoColForm">
                    <div id="trListName" class="sfFieldset pull-left" runat="server">
                        <div class="formKey">
                            <asp:Label ID="lblListNameText" runat="server" CssClass="sfFormlabel" Text="List Name"
                                meta:resourcekey="lblListNameTextResource1"></asp:Label>
                        </div>
                        <div class="formValue">
                            <asp:TextBox ID="txtListName" runat="server" CssClass="sfInputbox" meta:resourcekey="txtListNameResource1"></asp:TextBox>
                        </div>
                    </div>
                    <div id="trParentList" class="sfFieldset" runat="server">
                        <div class="formKey" runat="server">
                            <asp:Label ID="lblParentListText" runat="server" CssClass="sfFormlabel" Text="Parent List"
                                meta:resourcekey="lblParentListTextResource1"></asp:Label>
                        </div>
                        <div class="formValue" runat="server">
                            <asp:DropDownList ID="ddlParentList" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlParentList_SelectedIndexChanged"
                                CssClass="sfListmenu" meta:resourcekey="ddlParentListResource1">
                            </asp:DropDownList>
                        </div>
                    </div>
                    <div class="sfFieldset pull-left" id="trParentEntry" runat="server">
                        <div class="formKey" runat="server">
                            <asp:Label ID="lblParentEntryText" runat="server" CssClass="sfFormlabel" Text="Parent Entry"
                                meta:resourcekey="lblParentEntryTextResource1"></asp:Label>
                        </div>
                        <div class="formValue" runat="server">
                            <asp:DropDownList ID="ddlParentEntry" runat="server" Enabled="False" CssClass="sfListmenu"
                                meta:resourcekey="ddlParentEntryResource1">
                            </asp:DropDownList>
                        </div>
                    </div>
                    <div class="sfFieldset">
                        <div class="formKey">
                            <asp:Label ID="lblEntryText" CssClass="sfFormlabel" Text="Entry Text *" runat="server"
                                meta:resourcekey="lblEntryTextResource1" />
                        </div>

                        <div class="formValue">
                            <asp:TextBox ID="txtEntryText" runat="server" EnableViewState="False" CssClass="sfInputbox"
                                meta:resourcekey="txtEntryTextResource1"></asp:TextBox>
                            <asp:RequiredFieldValidator ID="rfvEntry" runat="server" ControlToValidate="txtEntryText"
                                ErrorMessage="This field is required." ValidationGroup="List" meta:resourcekey="rfvEntryResource1" CssClass="sfError"></asp:RequiredFieldValidator>
                        </div>
                    </div>
                    <div class="sfFieldset">
                        <div class="formKey">
                            <asp:Label ID="lblEntryValue" CssClass="sfFormlabel" Text="Entry Value *" runat="server"
                                meta:resourcekey="lblEntryValueResource1" />
                        </div>

                        <div class="formValue">
                            <asp:TextBox ID="txtEntryValue" runat="server" EnableViewState="False" CssClass="sfInputbox"
                                meta:resourcekey="txtEntryValueResource1"></asp:TextBox>
                            <asp:RequiredFieldValidator ID="rfvValue" runat="server" ControlToValidate="txtEntryValue"
                                ErrorMessage="This field is required." ValidationGroup="List" meta:resourcekey="rfvValueResource1" CssClass="sfError"></asp:RequiredFieldValidator>
                        </div>
                    </div>
                    <div class="sfFieldset" id="trCurrencyCode" runat="server">
                        <div class="formKey" runat="server">
                            <asp:Label ID="lblCurrencyCode" runat="server" CssClass="sfFormlabel" Text="Currency Code"
                                meta:resourcekey="lblCurrencyCodeResource1"></asp:Label>
                        </div>
                        <div class="formValue" runat="server">
                            <asp:TextBox ID="txtCurrencyCode" runat="server" EnableViewState="False" CssClass="sfInputbox"
                                meta:resourcekey="txtCurrencyCodeResource1"></asp:TextBox>
                        </div>
                    </div>
                    <div class="sfFieldset" id="trDisplayLocale" runat="server">
                        <div class="formKey">
                            <asp:Label ID="lblDisplayLocale" runat="server" CssClass="sfFormlabel" Text="Display Locale"
                                meta:resourcekey="lblDisplayLocaleResource1"></asp:Label>
                        </div>
                        <div class="formValue" runat="server">
                            <asp:TextBox ID="txtDisplayLocale" runat="server" EnableViewState="False" CssClass="sfInputbox"
                                meta:resourcekey="txtDisplayLocaleResource1"></asp:TextBox>
                        </div>
                    </div>
                    <div class="sfFieldset" id="trEnableSort" runat="server">
                        <div class="formKey" runat="server">
                            <asp:Label ID="lblSortOrder" runat="server" CssClass="sfFormlabel" Text="Enable Sort Order"
                                meta:resourcekey="lblSortOrderResource1"></asp:Label>
                        </div>

                        <div class="formValue" runat="server">
                            <asp:CheckBox ID="chkShort" runat="server" meta:resourcekey="chkShortResource1" />
                        </div>
                    </div>
                    <div class="sfFieldset">
                        <div class="formKey">
                            <asp:CheckBox ID="chkActive"  runat="server" EnableViewState="False" Text="Is Active" meta:resourcekey="chkActiveResource1" />
                           
                        </div>

                        <div class="formValue">
                        </div>
                    </div>
                </div>
                <div class="sfButtonwrapper ">
                    <label class="sfLocale icon-save smlbtn-succ sfBtn">
                        Save
                    <asp:Button ID="imgSave" OnClick="imgSave_Click" ToolTip="Save" runat="server"
                        ValidationGroup="List" meta:resourcekey="imgSaveResource1" /></label>
                    <label class="sfLocale icon-close sfBtn smlbtn-danger">
                        Cancel
                    <asp:Button ID="imgCancel" OnClick="imgCancel_Click" ToolTip="Cancel" runat="server"
                        meta:resourcekey="imgCancelResource1" /></label>
                </div>
            </asp:Panel>
        </div>
    </div>
</div>
