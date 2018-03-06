<%@ Control Language="C#" AutoEventWireup="true" CodeFile="LayoutManager.ascx.cs"
    Inherits="Modules_LayoutManager_LayoutManager" %>
<h1>
    <asp:Label ID="lblTemplateMgr" runat="server" Text="Template Manager"></asp:Label>
</h1>
<div class="clearfix">
    <div class="sfTemplatemanger clearfix">
        <div runat="server" id="progressBar" visible="false">
            ProgressBar
        </div>
        <%--<div class="sftype1 sfCreatetemplate sfTableOption sfAdvanceRadioBtn clearfix">
            <div class="pullLeft">
                <label class="sfLocale smlbtn-primary icon-addnew sfBtn sfFloatRight">
                    Create Template
                   <input type="button" id="btnCreateTemplate" />
                </label>
            </div>
            <div class="pullRight">
                <div class="sfUploadTemplate">
                    <asp:Label ID="lblUploadTemp" CssClass="sfFormlabel" runat="server">Upload Template</asp:Label>
                    <asp:FileUpload ID="fupUploadTemp" runat="server" />
                    <label for='<%=fupUploadTemp.ClientID %>'>Choose file</label>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="Please Choose Template"
                        CssClass="sfUploadError" ControlToValidate="fupUploadTemp" Display="Dynamic" ValidationGroup="rfvTemplate"></asp:RequiredFieldValidator>
                    <asp:Button ID="btnUpload" runat="server" OnClick="btnUpload_Click" CssClass="sfHide" ValidationGroup="rfvTemplate" />
                    <label for='<%=btnUpload.ClientID %>' class="smlbtn-succ icon-upload sfBtn">Upload</label>
                </div>
                <div id="sfCreateTemplate" style="display: none" class="clearfix sfFloatRight flyCreate">
                    <input type="text" id="txtNewTemplate" class="sfInputbox" />
                    <span class="sfError" id="spnError"></span>

                    <div class="sfButtonwrapper sftype1" id="divAdd">
                        <button type="button" id="btnSaveTemplate" class="sfBtn smlbtn-succ icon-save">Save</button>
                        <button type="button" id="btnCancelTemplateBox" class="sfBtn icon-cancel sfHighlightBtn smlbtn-danger">Cancel</button>
                    </div>
                </div>
            </div>
        </div>--%>
        <h2>Available Themes</h2>
        <div id="templateList" class="clearfix">
        </div>
        <div class="sfTemplate sfFormwrapper">

            <%--<h2>Search Template
            </h2>--%>
            <div class="sfFormwrapper twoColForm" style="display: none;">
                <div class="sfFieldset">
                    <div class="formKey">
                        <asp:Label runat="server" CssClass="sfFormlabel sfFloatLeft" ID="lblCategory">Category &nbsp; &nbsp; </asp:Label>
                    </div>
                    <div class="formValue">
                        <%-- <asp:DropDownList runat="server" CssClass="sfListmenu sfFloatLeft"
                            ID="ddlCategory" AutoPostBack="true" OnSelectedIndexChanged="ddlCategory_SelectedIndexChanged">
                        </asp:DropDownList>--%>
                        &nbsp;&nbsp;
                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">Enter Template Name</span>

                    </div>
                    <div class="formValue">
                        <asp:TextBox ID="txtSearech" CssClass="sfTextarea" runat="server"></asp:TextBox>

                    </div>
                    <div class="sfButtonwrapper">
                        <asp:Button ID="btnFree" runat="server" Text="Free"
                            CssClass="sfLable sfChange" OnClick="btnFree_Click" />
                        <%--  <asp:Button ID="btnPaid" runat="server" Text="Paid"
                            CssClass="sfLable sfChange" OnClick="btnPaid_Click" />--%>
                    </div>
                </div>
            </div>


            <div id="divonlineList" class="sfTemplate sfFormwrapper">

                <h3 runat="server" id="downloadTemplate">Choose free online template for download.
                </h3>
                <div class="clearfix ">
                </div>
                <div class="onlineTemplateList clearfix">
                    <asp:HiddenField ID="hdnFileName" runat="server" />
                    <asp:Repeater ID="rptrTemplateList" runat="server" OnItemDataBound="rptrTemplateList_ItemDataBound"
                        OnItemCommand="rptrTemplateList_ItemCommand">
                        <ItemTemplate>
                            <div class="TemplateHolder">
                                <div class="TemplateImage">
                                    <asp:Image ID="imgThubNail" runat="server" ImageUrl='<%#Eval("Thumb") %>' />
                                </div>
                                <div class="TemplateDetail">

                                    <asp:Label ID="lblTemplateName" runat="server" Text='<%#Eval("FileName") %>' />
                                    <asp:HiddenField ID="hdnUrl" runat="server" Value='<%#Eval("URL") %>' />
                                </div>
                                <div class="sfButtonwrapper">
                                    <asp:LinkButton CssClass="icon-download sfBtn" runat="server" ID="lnkDownLoad" CommandName="DownLoad"
                                        CommandArgument='<%# Eval("URL")+","+ Eval("ThemeID") %>'></asp:LinkButton>
                                </div>
                            </div>
                        </ItemTemplate>
                        <FooterTemplate>
                            <asp:Label ID="lblEmptyData" CssClass="sfDefaultInfo" Text="No Online Theme To Display"
                                runat="server" Visible="false">
                            </asp:Label>
                        </FooterTemplate>
                    </asp:Repeater>
                </div>
                <div class="clear">
                </div>
            </div>
            <%--<div id="divPaidList" class="sfTemplate sfFormwrapper">
                <h3>Choose Paid online template for download.
                </h3>
                <div class="onlineTemplateList clearfix">
                    <asp:HiddenField ID="HiddenField1" runat="server" />
                    <asp:Repeater ID="rptrPaid" runat="server" OnItemCommand="rptrPaid_ItemCommand" OnItemDataBound="rptrPaid_ItemDataBound">
                        <ItemTemplate>
                            <div class="TemplateHolder">

                                <div class="TemplateImage">
                                    <asp:Image ID="imgThubNail" runat="server" ImageUrl='<%#Eval("Thumb") %>' />
                                </div>
                                <div class="TemplateDetail">
                                    <asp:TextBox ID="txtKey" runat="server" CssClass="sfKey"></asp:TextBox>

                                    <asp:Label ID="lblTemplateName" runat="server" Text='<%#Eval("FileName") %>' />
                                    <asp:HiddenField ID="hdnUrl" runat="server" Value='<%#Eval("URL") %>' />
                                </div>
                                <div class="sfButtonwrapper">
                                    <asp:LinkButton CssClass="icon-download sfBtn" runat="server" ID="lnkDownLoad" CommandName="DownLoad"
                                        CommandArgument='<%# Eval("URL") %>'></asp:LinkButton>
                                </div>
                            </div>
                        </ItemTemplate>
                        <FooterTemplate>
                            <asp:Label ID="lblEmpty" CssClass="sfDefaultInfo" Text="No Template To Display"
                                runat="server" Visible="false">
                            </asp:Label>
                        </FooterTemplate>
                    </asp:Repeater>
                </div>
                <div class="clear">
                </div>
            </div>--%>
        </div>
    </div>
    <div class="sfLayoutmanager" style="display: none">
        <label id="lblCancelEditMode" class="icon-back sfBtn smlbtn-danger">
            Back</label>
        <div id="tabLayoutMgr">
            <ul>
                <li><a id="lnkBasicSettings" href="#basicsDiv">Basic Details</a></li>
                <%--<li><a id="lnkThemes" href="#themesDiv">Themes</a></li>--%>
                <li><a id="lnkPresets" href="#presetsDiv">Presets</a></li>
                <li><a id="lnkVisualLayoutMgr" href="#visualLayoutMgr">Layout Manager</a></li>
                <li><a id="lnkThemes" href="#themesDiv">Theme Options</a></li>
            </ul>
            <div id="basicsDiv" style="display: none">
                <div class="sfTemplateinfo">
                    <div class="sfGridwrapper">
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr class="sfOdd">
                                <td width="15%">
                                    <span class="sfLabel">Template Name</span>
                                </td>
                                <td width="30">:
                                </td>
                                <td>
                                    <span class="sfValue" id="spnTemplateName"></span>
                                </td>
                            </tr>
                            <tr class="sfEven">
                                <td>
                                    <span class="sfLabel">Template Author</span>
                                </td>
                                <td width="30">:
                                </td>
                                <td>
                                    <span class="sfValue" id="spnAuthor"></span>
                                </td>
                            </tr>
                            <tr class="sfOdd">
                                <td>
                                    <span class="sfLabel">Description</span>
                                </td>
                                <td width="30">:
                                </td>
                                <td>
                                    <span class="sfValue" id="spnDescription"></span>
                                </td>
                            </tr>
                            <tr class="sfEven">
                                <td>
                                    <span class="sfLabel">Website</span>
                                </td>
                                <td width="30">:
                                </td>
                                <td>
                                    <span class="sfValue" id="spnWebsite"></span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div id="themesDiv" style="display: none">
                <div id="themeList" class="sfGridwrapper">
                </div>
            </div>
            <div id="presetsDiv" style="display: none">
                <div id="divMsgTemplate">
                </div>
                <div class="sfGridwrapper sfFormwrapper">
                    <h2>Layouts</h2>
                    <div id="activeLayoutList">
                    </div>
                    <div class="sfHolder clearfix">
                        <div class="sfTheme">
                            <h2>Select Themes</h2>
                            <div id="activeThemeList" class="clearfix">
                            </div>
                        </div>
                        <div class="sfScreen">
                            <h2>Select Screen</h2>
                            <div id="activeWidthList" class="clearfix">
                                <ul>
                                    <li class="sfCurve">Wide</li>
                                    <li class="sfCurve">Narrow</li>
                                    <li class="sfCurve">Fluid</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="presetControls">
                    <div style="width: 100%">
                        <div class="controls">
                            <div class="sfButtonwrapper sftype1">
                                <label id="btnSavePreset" class="icon-save sfBtn smlbtn-succ">
                                    Save Preset</label>
                            </div>
                        </div>
                        <div class="clear">
                        </div>
                    </div>
                </div>
            </div>
            <div id="visualLayoutMgr">
                <div id="divControls" class="sfFormwrapper sfPadding clearfix">
                    <select id="ddlLayoutList" class="sfListmenu">
                    </select>
                    <div class="sftype1">
                        <label id="imgAddLayout" class="icon-addnew sfBtn smlbtn-primary">
                            Create Layout</label>

                        <label id="imgAddModernLayout" class="icon-addnew sfBtn smlbtn-primary">
                            Create modern Layout</label>
                        <label id="imgEditModernLayout" class="icon-addnew sfBtn " style="display: none;"></label>
                        <label id="imgEditLayout_Visual" class="icon-edit sfBtn smlbtn-primary">
                            Edit</label>
                        <label id="btnDeleteLayout" class="icon-delete sfBtn smlbtn-danger">
                            Delete</label>
                    </div>
                </div>
                <div id="divLayoutWireframe" class="clearfix">
                </div>
                <div class="clear">
                </div>
            </div>
        </div>
        <div class="sfButtonwrapper sftype1">
            <!-- <label id="btnSavePreset" class="icon-save sfBtn smlbtn-succ">
                Save Preset</label>-->

            <label id="lblSaveLayoutChange" class="icon-save sfBtn smlbtn-succ" style="display: none">
                Save</label>
        </div>
    </div>
    <div id="divEditXML" style="display: none">
        <input type="hidden" id="hdnLayoutName" />
        <div id="msgDiv">
        </div>
        <div class="layoutEditor" id="addPlaceHolder">
            <%--  <div class="sflayoutbuilderhead">
                Create Layout Markup
            </div>
            <div class="sfFormwrapper sfBuilder">
               <table width="100%" border="0" cellspacing="0" cellpadding="0" >
                    <tr>
                        <td width="20%">
                            <label class="sfFormlabel">
                                Create:</label>
                        </td>
                        <td>
                            <select id="selTypes" class="sfListmenu">
                                <option value="2">Select</option>
                                <option value="0">Placeholder</option>
                                <option value="1">Wrapper</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <table id="tblPch" style="display: none" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td width="20%">
                            <label id="spnName" class="spnAddPch sfFormlabel">
                                &lt;placeholder
                            </label>
                        </td>
                        <td>
                            <label id="lblAttr">
                            </label>
                            <select id="ddlAttr" class="sfListmenu sfInputlm">
                                <option value="0">Select</option>
                                <option value="1">name</option>
                                <option value="2">mode</option>
                                <option value="3">width</option>
                                <option value="4">wrapinner</option>
                                <option value="5">wrapouter</option>
                            </select>
                            <label>
                                &gt;</label>
                            <input type="text" id="txtPlaceholder" class="sfInputbox sfInputlm" />
                            <label>
                                &lt;/placeholder&gt;
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <table id="tblAttr" cellpadding="0" cellspacing="0" width="100%">
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div id="pchPreview" class="sfPchpreview sfCurve">
                            </div>
                        </td>
                    </tr>
                </table>
                <table id="tblWrap" style="display: none" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="20%">
                            <label id="Label1" class="spnAddPch sfFormlabel">
                                &lt;wrap
                            </label>
                        </td>
                        <td>
                            <select id="ddlWrapattr" class="sfListmenu sfInputlm">
                                <option value="0">Select Attribute</option>
                                <option value="1">name</option>
                                <option value="2">type</option>
                                <option value="3">class</option>
                                <option value="4">depth</option>
                            </select>
                            <label>
                                &gt;</label>
                            <input type="text" id="txtPositions" title="wrapvalue" class="sfInputbox sfInputlm" />
                            <label>
                                &lt;/wrap&gt;
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <table id="tblWrapAttr" cellpadding="0" cellspacing="0" width="100%">
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="sfCodepreview sfCurve">
                                &lt;wrappers&gt;
                                <div id="wrapPreview" class="sfWrappreview">
                                </div>
                                &lt;/wrappers&gt;
                                <img src="/Administrator/Templates/Default/images/copy.png" />
                            </div>
                        </td>
                    </tr>
                </table>
            </div>--%>
            <textarea id="txtLayoutEditor" class="sfTextarea sfEditor"></textarea>
            <div class="sfButtonwrapper sftype1">
                <label class="icon-save sfBtn smlbtn-succ" id="SaveLayout_Edit">
                    Save</label>
            </div>
        </div>
    </div>
    <div id="divAddLayout" class="sfFormwrapper" style="display: none">
        <div id="msgAddLayout">
        </div>
        <input type="hidden" id="hdnLayoutName1" />
        <div class="layoutEditor" id="Div2">
            <div class="sfFormwrapper" id="Table1" cellpadding="0" cellspacing="0" width="100%">
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">Clone From: *</span>
                    </div>
                    <div class="formValue">
                        <select id="ddlClonebleLayouts" class="sfListmenu">
                        </select>
                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">Layout Name: *</span>
                    </div>
                    <div class="formValue">
                        <input type="text" id="txtNewLayoutName" class="sfInputbox" />
                    </div>
                </div>
            </div>

            <textarea id="txtLayoutCreator" class="sfTextarea sfEditor"></textarea>
            <div class="sfButtonwrapper sftype1">
                <label id="btnCreateLayout" class="icon-save sfBtn smlbtn-succ">
                    save</label>
            </div>
        </div>
    </div>
    <div id="divEditLayout" style="display: none; width: 100%;">
        <div id="msgEditLayOut">
        </div>
        <div id="tblResize">
        </div>
    </div>
    <div id="divEditHTML" class="sfPopup" style="display: none">
        <span class="sfPopupclose"></span>
        <textarea id="txtHTMLEditor" class="layoutEditor" cols="50" rows="20"></textarea>
        <br />
        <div class="cssClassHTMLButtonWrapper">
            <span class="save">Save</span>
        </div>
    </div>
    <div id="divPagePresets" class="assign-page-pop" style="display: none; overflow: auto">
        <div class="controls">
            <div id="pageList">
            </div>
            <div class="sfButtonwrapper sftype1">
                <label id="spnSavePagePreset" class="icon-update sfBtn smlbtn-succ">
                    Apply</label>
            </div>
        </div>
    </div>
    <div id="divTemplatePreview" style="display: none">
        <div id="imagePreview">
        </div>
        <div id="imageThumbs">
        </div>
    </div>
</div>
<input type="hidden" id="hdnPanName" />
<input type="hidden" id="hdnTableName" />

<script type="text/javascript">

    $(function () {
        $(this).LayoutManager({
            PortalID: '<%=PortalID%>',
            AppPath: '<%=appPath%>',
            Extension: '<%=Extension %>',
            EditFilePath: '<%=EditFiles %>',
            UserModuleID: '<%=UserModuleID %>'
        });


        $(this).ModernLayoutManager({
            PortalID: '<%=PortalID%>',
            AppPath: '<%=appPath%>',
            Extension: '<%=Extension %>',
            EditFilePath: '<%=EditFiles %>',
            UserModuleID: '<%=UserModuleID %>'
        });

    });
</script>
<div class="layoutcustomcode" style="display: none;">
    <div class="sf_layout">
        <span title="GO Back to template page" id="goBack" class="sfBtn smlbtn-danger closeLayoutEditor"><i class="icon-back"></i>back</span>

        <h2>Create Morden Layout</h2>
        <div id="LayoutInit" class="LayoutInit">
            <div class="sfButtonwrapper">
                <span id="CreateNewTemplate" class="sfBtn smlbtn-primary icon-addnew">Create New</span>
                <span id="InsertCode" class="sfBtn smlbtn-def icon-code-file">Insert Custom Code</span>
                <span title="Show Template List" id="toogleTemplateList" class="icon-templates sfBtn smlbtn-def">Existing Layouts</span>
            </div>
        </div>

        <div class="templateList_wrapper" style="display: none;">
            <i id="cancelTemplateList" class="icon-close"></i>
            <div class="templatelists">
                <div class="existingTemplateList">
                </div>
            </div>
        </div>
        <div class="notes icon-desc">
            <h2>Icon Description:</h2>
            <ul>
                <li><i class="icons-back" title="GO Back to template page"></i>Directs back to the layout list</li>
                <li><i class="icons-layout" title="Show Template List"></i>Toggles existing template list panel</li>
                <li><i class="icons-add" title="Create parent Container"></i>Appends a container</li>
                <li><i class="icon-refresh" title="Empty DOM"></i>Clears all the existing DOM</li>
                <li><i class="icons-view" title="View output DOM"></i>Shows code (It is nice to see the given properties)</li>
                <li><i class="icons-toggle" style="display: block;"></i>Toggles properties panel</li>
                <li><i class="elementduplicate icons-duplicate" title="Duplicate DOM"></i>Duplicates the DOM</li>
                <li><i class="elementDelete icons-delete" title="Delete DOM"></i>Deletes or Empties the DOM</li>
                <li><i class="elementSelect icons-select"></i>Selects the DOM for merge, split and wrap</li>
                <li><i class="elementProperties icons-property" title="Properties"></i>Properties of individaul DOM (Name, Class, Width and Style)</li>
                <li><i class="icons-free" title="Add Free container"></i>Gives option to add free container</li>
                <li><i class="icons-columns" title="Add Columns"></i>Gives option to add columns</li>
            </ul>
            <p>
                Note: Container name must be unique as this will act as ID too. Each container is built from 'div' tag whose properties are present but not reflected in pages and containers. In layout, the Free Containers are separate containers that do not follow any Sageframe grid system. These containers cannot be merged, split or wrapped like other containers and the users who create them have full control over it through ID or classs. To show the existence of free container, the width is not defined and shows 100% presence. Also, the creation of this container does not disturb other layouts. Every time a new Modern Layout is created, this message is displayed.
            </p>
        </div>
        <div class="layout_wrapper" style="display: none;">
            <div class="layout_container">

                <div class="layoutName">
                    <div class="group">
                        <input type="text" title="Please fill out this field" required placeholder="Enter your layout name" id="txtlayoutname" data-edit="0'" />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                    </div>
                    <span class="sfError" id="layoutNameError"></span>
                </div>

                <div class="layout_action" data-editname="">
                    <ul>
                        <li><i title="Create parent Container" id="createParentContainer" class="icons-add"></i></li>
                        <li><i title="Empty DOM" id="EmptyParentContainer" class="icons-empty"></i></li>
                        <li><i title="View output DOM" id="viewDOM" class="icons-view"></i></li>
                    </ul>
                </div>
                <div class="layoutBuilder_wrapper margintop0">
                    <div id="layoutBuilder" class="layoutBuilder clearfix">
                    </div>
                    <div id="savelayout" class="savelayout" style="display: none;">
                        <div class="sfButtonWrapper">
                            <span class="sfBtn sfSave icon-save smlbtn-succ" id="btnSaveLayout">Save</span>
                            <span class="sfBtn sfSaveExit icon-update smlbtn-succ" id="btnSaveExitLayout">Save & Exit</span>
                            <span class="sfBtn sfReset smlbtn-secondary icon-empty" id="btnResetTolast">Reset to last save</span>
                            <span class="sfBtn sfReset smlbtn-secondary icon-cancel" id="btnCanceltonotes">Cancel</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="layout_property">
                <div class="layout_property_content">
                    <i id="divPropOpen" class="rightbtnicon-settings"></i>
                    <i id="divPropClose" class="icon-cancel" style="display: none;"></i>
                    <div class="property_content">
                        <h1>Properties</h1>
                        <span class="propSave" style="display: none;">Properties Save succesfully</span>
                        <ul>
                            <li>
                                <label>
                                    Name</label>
                                <input id="divName" type="text">
                                <span class="sfError" id="nameError"></span>
                            </li>
                            <li>
                                <label>
                                    Class</label>
                                <input id="divClass" type="text">
                            </li>
                            <li>
                                <label>
                                    Style</label>
                                <input id="divStyle" type="text">
                            </li>
                            <li id="widthProp">
                                <label>
                                    Width</label>
                                <input id="divWidth" type="text">
                                <span class="sfError" id="widthError"></span>
                            </li>
                        </ul>
                        <div class="savepropertiesWrapper">
                            <span id="saveProperties" class="sfBtn icon-save smlbtn-succ">Save</span>
                        </div>
                        <div class="additionWrapper" style="display: none;">
                            <span id="mergeCol" class="sfBtn  icon-merge">Merge</span>
                            <span id="SplitCol" class="sfBtn smlbtn-succ icon-split">Split</span>
                            <span id="wrapCol" class="sfBtn smlbtn-succ icon-wrap">Wrap</span>
                        </div>

                    </div>
                </div>

            </div>
            <div id="layoutaddContainer" class="layoutaddContainer" style="display: none;" data-selectedid="0">
                <i class="icons-cancel cancelAddPopup" data-s="0"></i>
                <i class="icons_container"></i>
                <div class="container_options">
                    <div id="addBefore" class="addBefore">
                        <span>Add Before</span>
                    </div>
                    <div class="innerContainer">
                        <ul>
                            <li><i title="Add Child Container" id="createChildContainer" class="icons-add"></i></li>
                            <li><i title="Add Free container" class="icons-free" id="createFreeContainer"></i></li>
                            <li><i title="Add Columns" class="icons-columns" id="createColumns"></i></li>
                        </ul>
                    </div>
                    <div id="addAfter" class="addAfter">
                        <span>Add After</span>
                    </div>
                </div>
                <div class="columns_wrapper" style="display: none;">
                    <div class="create_Col">
                        <ul>
                            <li class="addCol"><span class="colNo">2</span> columns</li>
                            <li class="addCol"><span class="colNo">3</span> columns</li>
                            <li class="addCol"><span class="colNo">4</span> columns</li>
                            <li>
                                <label>
                                    Column no:
                                    <input id="colsNo" class="txtcolsNo" type="text">
                                </label>
                            </li>
                            <li>
                                <div class="sfButtonwrapper">
                                    <span class="iconsaveWrapper sfBtn smlbtn-succ icon-save">
                                        <i id="addMultipleColumn" class="icons-save"></i>Save
                                    </span>
                                    <span class="sfBtn smlbtn-danger icon-back">Back</span>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
                <div class="freecontainer_wrapper" style="display: none;">
                    <div class="freecontainer_Col">
                        <ul>
                            <li class="addFreeCol"><span class="freecolNo">1</span> free container</li>
                            <li class="addFreeCol"><span class="freecolNo">2</span> free container</li>
                            <li class="addFreeCol"><span class="freecolNo">3</span> free container</li>
                            <li class="addFreeCol"><span class="freecolNo">4</span> free container</li>
                            <li>
                                <label>
                                    Container no:
                                        <input id="colsfreeNo" class="txtfreecolsNo" type="text">
                                </label>
                            </li>
                            <li>
                                <div class="sfButtonwrapper">
                                    <span class="iconsaveWrapper sfBtn smlbtn-succ">
                                        <i id="addMultipleFreeColumn" class="icon-save">Save</i>
                                    </span>
                                    <span class="sfBtn sfBtn smlbtn-danger icon-back ">Back</span>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            <textarea rows="100" cols="100" id="txtlayoutBuilderDOM" style="display: none;"></textarea>
            <div id="layoutBuilderDOM" style="display: none;">
            </div>
        </div>
    </div>
</div>





