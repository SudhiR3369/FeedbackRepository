<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AutomatedSearch.ascx.cs" Inherits="Modules_AutomatedSearch_AutomatedSearch" %>
<script type="text/javascript">
    $(function () {
        $(this).AutomatedSearch({
            modulePath: '<%=modulePath%>',
            portalID: '<%=portalID%>',
            userModuleID: '<%=userModuleID%>'

        });
    });
</script>

<div class="fieldset">
    <h1>Automated Settings</h1>
    <div id="divSettingsView">
        <div id="divViewBtns" class="sfButtonwrapper">
            <button type="button" class="icon-settings smlbtn-def sfBtn" id="btnEditContent">
                <span>Configure Settings</span>
            </button>
        </div>
        <asp:Literal ID="ltrViewContainer" EnableViewState="false" runat="server"></asp:Literal>
    </div>
    <div id="divTableAccumulator" style="display: none;">
        <div id="divBtns" class="sfButtonwrapper">
            <button type="button" class="icon-back sfBtn smlbtn-danger" id="btnViewDetail">
                <span>Back</span>
            </button>
            <button type="button" class="icon-refresh smlbtn-secondary sfBtn" id="btnRefresh">
                <span>Refresh</span>
            </button>
            <button type="button" class="icon-save sfBtn smlbtn-succ" id="btnSaveSettings">
                <span>Save Changes</span>
            </button>


        </div>


        <div id="divTableList">
        </div>

    </div>

</div>
