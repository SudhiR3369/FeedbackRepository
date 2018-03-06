<%@ Control Language="C#" AutoEventWireup="true" CodeFile="DashboardManager.ascx.cs"
    Inherits="Modules_DashBoard_DashboardManager" %>
<script type="text/javascript">
    $(function () {
        $(this).DashBrdLinkManager({
            PageExtension: '<%=PageExtension%>',
            userModuleId: '<%=userModuleId%>',
            Theme: '<%=Theme%>',
        });
    });

</script>
<h1>
    <asp:Label ID="lblDashMgr" runat="server" Text="Dashboard Link Manager"></asp:Label>
</h1>
<div>
    <div id="tabDashboard" class="cssClassTabpanelContent">
        <ul>
            <%-- <li><a href="#dvQuickLinks">Quick Links</a></li>--%>
            <li class="tab-sidebar"><a href="#dvSidebar">Sidebar</a></li>
            <%-- <li><a href="#dvSettings">Appearance</a></li>--%>
        </ul>
        <%--<div id="dvQuickLinks" class="sfDashboardpanel">
            <div class="sfTabLeftDiv">
                <fieldset>
                    <legend>Add Quick Link: </legend>
                    <div class="sfAddQuickLink">
                        <table cellspacing="0" cellpadding="0" width="100%" class="no-table">
                            <tr>
                                <td>
                                    <label class="sfFormlabel">
                                        Display Name</label>
                                </td>
                               
                                <td>
                                    <input type="text" id="txtLnkName" name="txtLnkName" class="sfInputbox" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="sfFormlabel">
                                        Pages</label>
                                </td>
                                
                                <td>
                                    <select id="ddlPages" class="sfListmenu">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="sfFormlabel">
                                        Upload Icon</label>
                                </td>
                                
                                <td>
                                    <input type="file" id="fupIcon" class="sfListmenu" />
                                    <div class="sfUploadedFiles">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="sfFormlabel">
                                        Is Active</label>
                                </td>
                                
                                <td>
                                    <input type="checkbox" id="chkIsActiveQuicklink" checked="checked" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                </td>
                                <td width="30">
                                </td>
                                <td>
                                    <div class="sfButtonwrapper sftype1 sfMarginnone">
                                        <i class="icon-addnew sfBtn" id="btnAddQuickLink">Add QuickLink Item</i> <i class="icon-close sfBtn"
                                            id="btnCancelQuickLink" style="display: none">Cancel</i>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="sfQuicklinklist">
                    </div>
                    <div class="clear">
                    </div>
                </fieldset>
                <div class="sfButtonwrapper sftype1">
                    <i class="icon-save sfBtn" id="btnSaveQuickLinkOrder">Save Item Order</i>
                    <div class="clear">
                    </div>
                </div>
            </div>
            <div class="clear">
            </div>
        </div>--%>
        <div id="dvSidebar" class="cssClassTabPabelTabel sfFormwrapper">
            <div class="sfTabLeftDiv">

                <div class="sfButtonwrapper clearfix" style="margin-bottom: 40px;">
                    <i class="icon-addnew smlbtn-primary sfBtn" id="lbaAddSidebarTab">Add Sidebar Tab</i>
                    <i class="icon-addnew smlbtn-primary sfBtn" id="lbaAddSidebaritemTab">Add Sidebar Item</i>
                </div>
                <div class="flex-wrapp">
                    <div class="sfSidebarItemWrapper">
                        <div class="sfSidebarItems">
                        </div>
                        <div class="sfButtonwrapper sftype1">
                            <i class="sfSave icon-save smlbtn-succ sfBtn sfFloatRight" id="btnSaveSidebarOrder">Save Item Order</i>
                            <div class="clear">
                            </div>
                        </div>
                    </div>
                    <div id="divSidebarTab" style="display: none">
                        <div class="sfFormwrapper">
                            <div class="sfFieldset">
                                <div class="formKey">
                                    <span class="sfFormlabel">Add Tab Name *
                                    </span>
                                </div>
                                <div class="formValue">
                                    <input type="text" id="txtTabName" />
                                    <label id="lblError" class="sfError">
                                    </label>
                                </div>
                            </div>

                            <div class="sfFieldset">
                                <div class="formKey buttonClick">
                                    <span class="sfFormlabel">Upload Icon :</span>
                                </div>
                                <div class="formValue">
                                    <input type="file" id="fupTabIcon" class="sfListmenu" />
                                    <label for="fupTabIcon">Choose file</label>
                                    <div class="sfUploadedTabIcon">
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="sfButtonwrapper sftype1  clearfix sfMarginnone ">
                            <i class="icon-save sfBtn smlbtn-succ" id="lblSaveTab">Save Sidebar Tab</i> <i class="icon-close sfBtn smlbtn-danger"
                                id="lblCancelTab">Cancel</i>
                        </div>
                    </div>
                    <div class="sfAddSidebar" style="display: none;">
                        <div class="clear"></div>
                        <div class="sfFormwrapper">
                            <div class="sfFieldset">
                                <div class="formKey">
                                    <span class="sfFormlabel">Display Name *</span>
                                </div>
                                <div class="formValue">
                                    <input type="text" id="txtSidebarName" name="txtSidebarName" class="sfInputbox" />
                                </div>
                            </div>
                            <div class="sfFieldset">
                                <div class="formKey">
                                    <span class="sfFormlabel">Parent</span>
                                </div>

                                <div class="formValue">
                                    <select id="ddlParentLinks" class="sfListmenu">
                                    </select>
                                </div>
                            </div>
                            <div class="sfFieldset">
                                <div class="formKey">
                                    <span class="sfFormlabel">Pages</span>
                                </div>

                                <div class="formValue">
                                    <select id="ddlPagesSidebar" class="sfListmenu">
                                    </select>
                                </div>
                            </div>
                            <div class="sfFieldset">
                                <div class="formKey buttonClick">
                                    <span class="sfFormlabel">Upload Icon</span>
                                </div>

                                <div class="formValue">
                                    <input type="file" id="fupIconSidebar" class="sfListmenu" />
                                    <label for="fupIconSidebar">Choose File</label>
                                    <div class="sfUploadedFilesSidebar">
                                    </div>
                                    <br />
                                    <p class="sfNote sfLocale">
                                        <i class="icon-info"></i>&nbsp;&nbsp;If you don't choose an icon image file, default
                                                        system icon will be set automatically.
                                    </p>
                                </div>
                            </div>
                            <div class="sfFieldset">
                                <div class="formKey">

                                    <input type="checkbox" checked="checked" id="chkIsActiveSidebar" />
                                    <label for="chkIsActiveSidebar">Active</label>

                                </div>


                            </div>

                            <div class="sfButtonwrapper  sftype1 clearfix sfMarginnone ">
                                <i class="icon-save smlbtn-succ  sfBtn" id="btnAddSidebar">Save</i>
                                <i class="icon-close smlbtn-danger sfBtn" id="btnCancelSidebar">Cancel</i>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="clear">
                </div>

            </div>
            <div class="clear">
            </div>
        </div>
        <div id="dvSettings" class="cssClassTabPabelTabel" runat="server" visible="false">
            <table cellspacing="0" cellpadding="0" width="100%">
                <tr>
                    <td width="120">
                        <label class="sfFormlabel">
                            Choose Appearance:</label>
                    </td>
                    <td width="30">:
                    </td>
                    <td>
                        <div class="sfRadio sfAppearanceOptions">
                            <input type="radio" id="rdbDefault" value="default" name="selecttheme" checked="checked" />
                            <label>
                                Default</label>
                            <input type="radio" id="rdbGray" value="gray" name="selecttheme" />
                            <label>
                                Gray</label>
                            <input type="radio" id="rdbGreen" value="green" name="selecttheme" />
                            <label>
                                Green</label>
                            <input type="radio" id="rdbRed" value="red" name="selecttheme" />
                            <label>
                                Red</label>
                            <input type="radio" id="rdbBlack" value="black" name="selecttheme" />
                            <label>
                                Black</label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2"></td>
                    <td>
                        <div class="sftype1 sfMargintop">
                            <label id="btnSaveAppearance" class="sfSave">
                                Save</label>
                            <label id="btnRefresh" class="sfRefresh">
                                Refresh</label>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>
