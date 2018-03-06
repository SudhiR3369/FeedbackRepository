<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ModuleMaker.ascx.cs" Inherits="Modules_Admin_ModuleMaker" %>
<script type="text/javascript">
    //<![CDATA[
    $(function () {
        $(this).ModuleMaker({
            UserModuleID: '<%=userModuleID%>',
            hdnTableList: "#" + "<%=hdnTableList.ClientID%>",
            databaseModuleList: "#" + "<%=hdnModuleListFromDatabase.ClientID%>",
            folderModuleList: "#" + "<%=hdnModuleList.ClientID%>",
            hdnXML: "#" + "<%=hdnXML.ClientID%>",
            txttableName: "#" + "<%=txtTablename.ClientID%>",
            txtModuleDescription: "#" + "<%=txtModuleDescription.ClientID%>",
            txtModuleName: "#" + "<%=txtModuleName.ClientID%>"
        });
    });
    //]]>
</script>
<h1>Module Maker</h1>
<div class="moduleCreator" id="divModuleCreator">
    <div class="sfFormwrapper clearfix">
        <div class="sfFormwrapper">
            <h2>Basic settings</h2>
            <div class="twoColForm keyAlign">
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">Module Name *</span>

                    </div>
                    <div class="formValue">
                        <asp:TextBox runat="server" ID="txtModuleName" CssClass="sfInputbox"></asp:TextBox>

                        <span class="sfloader icon-search" style="display: none;"></span><span class="error sfError"></span>

                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">Description *</span>
                    </div>
                    <div class="formValue">
                        <asp:TextBox TextMode="MultiLine" Columns="20" runat="server" CssClass="sfInputbox" ID="txtModuleDescription"></asp:TextBox>
                    </div>

                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <label class="sfFormlabel">Include</label>
                    </div>
                    <div class="formValue">
                   
                            <asp:CheckBox runat="server" ID="chkCss" Text="CSS"/><label>
                         
                        </label>
                    
                            <asp:CheckBox runat="server" ID="chkJS" Text="JS" /><label>
                            </label>
                        <span class="lblWebservice hide" style="display: none;">
                            <asp:CheckBox runat="server" ID="chkWebService" CssClass="inline" Text="WEBSERVICE" /><label>
                            </label>

                        </span>
                    </div>

                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <label class="sfFormlabel">Control Type </label>
                    </div>
                    <div class="formValue">
                   
                            <asp:CheckBox runat="server" ID="chkView" Checked="true" Text="View" cssClass="inline" Enabled="false" /> 
                    
                            <asp:CheckBox runat="server" ID="chkEdit" Text="Edit" cssClass="inline"/>
                   
                            <asp:CheckBox runat="server" ID="chkSetting" Text="Settings" cssClass="inline"/> 
                    </div>

                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <label class="sfFormlabel">Module Type</label>
                    </div>
                    <div class="formValue">
                        <input type="radio" id="portal" value="None" name="check" />
                        <label for="portal">Portal</label>
                        <input id="admin" type="radio" value="None" name="check" />
                        <label for="admin">Admin</label>
                        <asp:HiddenField runat="server" ID="hdnAdmin" Value="1" />
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix margin"></div>
        <h2>Table Settings</h2>
        <div class="sfFormwrapper twoColForm">

            <div class="sfFieldset">
                <div class="formKey">
                    <span class="sfFormlabel">Table Name</span>
                </div>
                <div class="formValue">
                    <asp:TextBox ID="txtTablename" runat="server"></asp:TextBox>

                    <span class="sfloader icon-search" style="display: none;"></span><span class="error1 sfError"></span>
                </div>
            </div>
        </div>
        <table id="divProperties" class="noBackground ">
            <thead>
                <tr>
                    <td></td>
                    <td>Column Name</td>
                    <td>Data Type</td>
                    <td align="center">Allow Nulls</td>

                </tr>
            </thead>
            <tr>
                <td>
                    <%--<span class="sfDelete deleterow icon-delete"></span>--%>
                    <span class="info icon-password" title="this is the primary key of the table"></span>
                </td>
                <td>
                    <input type="text" class=" Properties sfInputbox" id="properties__1" /></td>
                <td>
                    <div id="autocompleteValue_1"></div>
                    <input type="text" class="sfInputbox dataTypeInput" id="autocomplete_1" /><span class="sfBtn icon-arrow-slim-s" id="btnDrop_1"></span>
                </td>
                <td align="center">
                    <input type="checkbox" class="chkNull" disabled="disabled" /></td>
                <td>
                    
                        <input type="checkbox" class="" id="autoincrement" />
                    <label for="autoincrement">
                        Auto Increment
                    </label>
                </td>
            </tr>
        </table>
        <div class="sfButtonwrapper ">
            <span class="sfBtn icon-addnew sfHighlightBtn smlbtn-primary" title="Add new Row" id="AddRow">Add Column</span>
            <label class="icon-update smlbtn-succ sfBtn next sfFloatRight">
                <input type="button" title="takes to create the sql queries" id="btnCreateSQL" />Ok! Lets Move to SQL procedure</label>
        </div>

    </div>
</div>


<div class="modulecreator" id="divSqlformation" style="display: none;">
    <div class="sfFormwrapper">
        <ul id="slqProcedures">
        </ul>
        <h1></h1>
        <span class="sfBtn smlbtn-danger icon-change">
            <input type="button" value="I want to change my data" title="change previous data" id="btnBack" />
        </span>
        <span class="sfBtn smlbtn-def icon-download">
            <input type="button" value="Download Class Zip " title="Download Class Zip" id="btnCreateZipHelp" />
        </span>
        <span class="sfBtn smlbtn-succ icon-run">
            <input type="button" value="Execute New Module" title="Execute New Module " id="btnCreateNewModuleHelp" />
        </span>
        <asp:Button runat="server" ID="btnCreateNewModule" Style="display: none;" OnClick="btnCreateNewModule_Click" CssClass="sfBtn " />
        <asp:Button runat="server" ID="btnCreateZip" Style="display: none;" OnClick="btnCreateZip_Click" CssClass="sfBtn" />
    </div>
</div>

<asp:HiddenField runat="server" ID="hdnTableList" />
<asp:HiddenField runat="server" ID="hdnModuleListFromDatabase" />
<asp:HiddenField runat="server" ID="hdnModuleList" />
<asp:HiddenField runat="server" ID="hdnXML" />
