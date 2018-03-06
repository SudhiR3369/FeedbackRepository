<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ManageTracker.ascx.cs" Inherits="Modules_ManageTracker_ManageTracker" %>

<div class="sfFormwrapper">
    <div class="sfFieldset">
        <div class="formKey">
            <asp:DropDownList ID="ddlFrequency" runat="server"></asp:DropDownList>
        </div>
    </div>
    <div class="sfFieldset">

        <asp:LinkButton ID="btnRunScript" runat="server" Text="Run SQL Job" OnClick="btnRunScript_Click" CssClass="sfBtn smlbtn-succ  icon-run" />

    </div>
</div>

