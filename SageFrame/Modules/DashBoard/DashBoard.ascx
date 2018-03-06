<%@ Control Language="C#" AutoEventWireup="true" CodeFile="DashBoard.ascx.cs" Inherits="SageFrame.Modules.DashBoard.DashBoard" %>

<script type="text/javascript">
    //<![CDATA[   
    $(function () {
        $(this).QuickViewManagement({
            userModuleID: '<%=userModuleID%>'
        });
        $(this).AdminCardModule({
            userModuleID: '<%=userModuleID%>'
        });
    });
    //]]>
</script>

<div class="flex-wrapp">
    <div class="quickmanageholder clearfix">
        <div class="box-head clearfix">
            <div class="head-left">
                <i class="fa fa-file-text-o" aria-hidden="true"></i>
                <span>Quick Manage</span>
            </div>
            <div class="head-right">
                <!--<span><i class="fa fa-minus" aria-hidden="true"></i></span>-->
                <!--<span><i class="fa fa-times" aria-hidden="true"></i></span>-->
                <div class="sfDivflyingHolder" runat="server" id="divAddGroup" visible="false">
                    <span class="sfBtnSml smlbtn-primary icon-addnew" id="btnToggleGroup">Add</span>
                </div>
                <div class="expandPagelistHolder" runat="server" id="expandList">
                    <i class="fa fa-outdent" aria-hidden="true" id="tooglePageList"></i>
                    <div class="adminPagesList" id="adminPagesList" style="display: none;">
                        <h3>Admin Pages <i class="fa fa-close" id="closeAdminPagelist"></i></h3>
                        <div class="sfDashboard clearfix">
                            <p>Drag pages into group box</p>
                            <asp:Literal runat="server" ID="ltradminPageList"></asp:Literal>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="box-content ">
            <div class="quick-manage">
                <h2>
                    <asp:Label ID="lblSfInfo" runat="server" Text="SageFrame CPanel"></asp:Label>
                </h2>

                <asp:Literal runat="server" ID="ltrGroupBox"></asp:Literal>

            </div>
        </div>

    </div>

    <div id="divFlying" class="divFlying" style="display: none;" data-groupid="0">
        <div class="sfFieldset">
            <span class="formKey">
                <label>Group Name</label>
            </span>
            <span class="formValue">
                <input type="text" id="txtgrpName" class="" />
                <span class="sfError" id="groupError"></span>
            </span>
        </div>
        <div class="sfButtonwrapper">
            <span class="sfBtn icon-addnew sfHighlightBtn smlbtn-succ" title="Create group" id="spnCreateGroup">Create</span>
            <span class="sfBtn icon-cancel sfHighlightBtn smlbtn-danger" title="Cancel group" id="spnCancelGroup">Cancel</span>
        </div>
    </div>
</div>

