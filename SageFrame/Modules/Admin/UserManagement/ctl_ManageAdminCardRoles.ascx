<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ctl_ManageAdminCardRoles.ascx.cs" Inherits="Modules_Admin_UserManagement_ctl_ManageAdminCardRoles" %>
<div id="cardModuleRoleWrapper" >
    <h2>
        <asp:Label ID="Label2" runat="server" Text="Dashboard Panel Modules Management"></asp:Label>
    </h2>
    <div class="flex-wrapp">
        <div class="sfLeftdivB">
        </div>

        <div class="sfCenterdivB">
            <div class="sfCenterWrapperB">
                <div class="sfCenterB">
                    <div id="divRoleList"></div>
                    <div class="clearfix">
                        <div class="sfGridwrapper">
                            <table id="tblCardPermission"  cellspacing="0" cellpadding="0" width="100%"></table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
</div>

