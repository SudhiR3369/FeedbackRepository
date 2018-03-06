<%@ Control Language="C#" AutoEventWireup="true" CodeFile="DigiSphereMaster.ascx.cs" Inherits="Modules_DigiSphereMaster_DigiSphereMaster" %>

<script type="text/javascript">
    $(function () {
        $(this).DigiSphereMaster({
            modulePath: '<%=modulePath%>',
            portalID: '<%=portalID%>',
            userModuleID: '<%=userModuleID%>'

        });
    });
</script>

<div class="fieldset">

    <h1>DigiSphere Management</h1>

    <%--  <div class="dynamicForm" style="display: flex;">
        <span id="closesuggestions" class="icon-close"></span>
        <h3>Hello</h3>
    </div>--%>
    <div id="divBtns" class="sfButtonwrapper sfPadding">

        <%--<button type="button" class="icon-addnew smlbtn-def sfBtn" id="btnAddSitetype">
            <span>Add Site Type</span>
        </button>--%>

        <button type="button" class="icon-addnew smlbtn-def sfBtn" id="btnAddSector">
            <span>Add Business Sector</span>
        </button>

        <%-- 
              <button type="button" class="icon-addnew smlbtn-def sfBtn" id="btnAddBusinessType">
            <span>Add Business Type</span>
        </button>
        
        <button type="button" class="icon-addnew smlbtn-def sfBtn" id="btnSaveSettings">
            <span>Add Business Keyword</span>
        </button>--%>
    </div>

    <div class="divContent">


        <div id="divBusinessSector">
            <h2>Business Sector</h2>

            <div id="sectorComponents"></div>
        </div>
        <%-- <div class="sfRowfilter">
            <div class="sfFieldset">
                <span class="formKey">
                    <label id="lblSearchUserRole" class="sfFormlabel">Choose a Business Sector</label>
                </span>
                <span class="formValue">
                    <select id="ddlSearchRole" class="sfListmenu">
                        <option></option>
                    </select>
                </span>
            </div>
        </div>--%>
    </div>


</div>
