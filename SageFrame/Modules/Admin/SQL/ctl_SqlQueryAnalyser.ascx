<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ctl_SqlQueryAnalyser.ascx.cs"
    Inherits="SageFrame.Modules.Admin.SQL.ctl_SqlQueryAnalyser" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>
<h1>
    <asp:Label ID="lblSqlQueryAnalyser" runat="server" Text="SQL Query Analyser" meta:resourcekey="lblSqlQueryAnalyserResource1"></asp:Label>
</h1>

<div class="sfButtonwrapper sfPadding">
    <label class="sfLocale icon-data smlbtn-def sfBtn">
        Archive Session Tracker
                        <asp:Button ID="btnBackup" runat="server" OnClick="btnBackup_Click"
                            ToolTip="Archive Session Tracker" /></label>
    <label class="sfLocale icon-sql smlbtn-def sfBtn" title="this script cleans all the portal  pages, modules and data giving a fresh sageframe to start">
        Database Backup
                        <asp:Button ID="btnDatabasebackup" runat="server" OnClick="btnDatabasebackup_Click" 
                            ToolTip="Database Backup"   /></label>
       <label class="sfLocale icon-clean smlbtn-def  sfBtn">
        Run clean up script
                        <asp:Button ID="btnSageFrameCleanup" runat="server" OnClick="btnDatabaseCleanup_Click"
                            ToolTip="Database Backup" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Are you sure you want to delete the everything you have done and start with fresh SageFrame?');" /></label>
</div>
    <div class="sfFormwrapper">
        <div class="">
            <div class="sfFieldset">
                <span class="formKey buttonClick">
                      <asp:Label ID="lblSelectSqlScriptFile" runat="server" CssClass="sfFormlabel sfFloatLeft" Text="SQL File"
                        ToolTip="Upload a file into the SQL Query window (Optional)." meta:resourcekey="lblSelectSqlScriptFileResource1"></asp:Label>
                </span>
                <span class="formValue">
                     <asp:FileUpload ID="fluSqlScript" runat="server" meta:resourcekey="fluSqlScriptResource1" />
                     <label for="ctl21_fluSqlScript">Choose file</label>
                     <label class="sfLocale icon-upload smlbtn-succ sfBtn smlsfBtn"> Upload
                                                 <asp:Button ID="imbUploadSqlScript" runat="server" OnClick="imbUploadSqlScript_Click"
                                                     ToolTip="Load the selected file." meta:resourcekey="imbUploadSqlScriptResource1" /></label>
                       
                </span>
            </div>
            
        </div>
    </div>
    <div class="sfFormwrapper">
        <div class="sfRowfilter sfFieldset">

            <div class="formKey"><span class="sfFormlabel">Query</span></div>
            <div class="formValue">
             <asp:TextBox ID="txtSqlQuery" runat="server" TextMode="MultiLine" Rows="10" CssClass="sfTextarea"
                     Width="75%" EnableViewState="False" meta:resourcekey="txtSqlQueryResource1"></asp:TextBox>
            </div>
        </div>
    </div>

     <div class="sfFormwrapper">
        <div class="sfRowfilter">

                    <asp:CheckBox ID="chkRunAsScript" runat="server" Text="Run as Script" TextAlign="Right"
                        ToolTip="include 'GO' directives; for testing &amp; update scripts" CssClass="sfCheckbox"
                        meta:resourcekey="chkRunAsScriptResource1" />
        </div>
    </div>
                        <div class="sfButtonwrapper">
                    <label class="icon-execute icon-run smlbtn-succ sfLocale sfBtn">
                        Execute
                        <asp:Button ID="imbExecuteSql" runat="server" Style="margin-left: 15px" OnClick="imbExecuteSql_Click"
                            ToolTip="can include {directives} and /*comments*/" meta:resourcekey="imbExecuteSqlResource1" />
                    </label>
                </div>
</div>
<div class="sfGridwrapper">
    <asp:GridView ID="gdvResults" runat="server" EnableViewState="False" meta:resourcekey="gdvResultsResource1">
        <EmptyDataTemplate>
            <asp:Label ID="lblEmptyText" runat="server" Text="The query did not return any data"
                meta:resourcekey="lblEmptyTextResource1" />
        </EmptyDataTemplate>
        <RowStyle CssClass="sfOdd" />
        <AlternatingRowStyle CssClass="sfEven" />
    </asp:GridView>
</div>
