<%@ Control Language="C#" AutoEventWireup="true" CodeFile="MenuManager.ascx.cs" Inherits="Modules_Admin_MenuManager_MenuManager" %>

<script type="text/javascript">
    //<![CDATA[
    $(function () {
        $(this).MenuManager({
            CultureCode: '<%=CultureCode %>',
            UserModuleID: '<%=UserModuleID %>'
        });

        //$('a[href^="#"]').on('click', function (e) {
        //    e.preventDefault();

        //    var target = this.hash;
        //    var $target = $(target);

        //    $('html, body').stop().animate({
        //        'scrollTop': $target.offset().top
        //    }, 900, 'swing', function () {
        //        window.location.hash = target;
        //    });
        //});

    });


    //]]>	
</script>

<h1>Menu Manager</h1>

<div class="sfAdvanceRadioBtn">
    <label class="sfBtn icon-addnew smlbtn-primary" id="btnAddpage">
        Add Menu</label>
</div>
<div class="sfDivFlying menuMngr" style="display: none;">
    <input type="hidden" id="hdnMenuID" />
    <!--<i class="sfDivFlyingClose icon-close"></i>-->
    <input id="txtMenuName" class="sfInputbox sfFullwidth" type="text" />
    <div class="sfButtonwrapper sftype1" id="divAdd">
        <label id="imgAdd" class="icon-addnew sfBtn smlbtn-succ" style="display: none">
            Create</label>
        <label id="imgUpdate" class="icon-update smlbtn-succ sfBtn ">
            Update</label>
        <%--  <label id="imgCancel" class="sfCancel">
                    Cancel</label>--%>

        <label id="imgClose" class="sfDivFlyingClose icon-close sfBtn smlbtn-danger">
            cancel</label>
    </div>
</div>
<div class="clearfix">
    <div id="tabMenu">
        <div id="dvView" class="menu-manage-wrap flex-wrapp fle clearfix">

            <div class="sfLeftdiv">
                <h3><i class="fa fa-bars"></i>Menus Type</h3>
                <div id="menuList">
                </div>
            </div>
            <div class="sfCenterdiv">
                <div class="flex-wrapp">
                    <div id="divPagelist" class="sfPageList menuLists">
                    </div>
                    <div class="DroppableZone customMenu">
                        <div class="MenuType">
                            <%--                            <input type="radio" checked="checked" name="menuType" value="horizontal" id="rdHori" /><label for="rdHori">Horizontal</label>
                            <input type="radio" value="side" name="menuType" id="rdside" /><label for="rdside">Side</label>
                            <input type="radio" value="footer" name="menuType" id="rdfooter" /><label for="rdfooter">Footer</label>--%>
                            <div class="sfRadiobutton">
                                <label class='sfActive'>
                                    <input id="rdbHorizontalMenu" type="radio" name="rdbChooseMenuType" checked="checked"
                                        value="1" style="display: none" />
                                    Horizontal</label>
                                <label>
                                    <input id="rdbSideMenu" type="radio" name="rdbChooseMenuType" value="2" style="display: none" />
                                    Side Menu</label>
                                <label>
                                    <input id="rdbFooter" type="radio" name="rdbChooseMenuType" value="3" style="display: none" />
                                    Footer Menu</label>
                                <a href="#menureview" class="preview_btn sfBtnSml smlbtn-def"><i class="fa fa-external-link" aria-hidden="true"></i>preview menu</a>
                            </div>
                        </div>
                        <div class="drag-info">
                            <i class="fa fa-arrows" aria-hidden="true"></i>drag pages here..
                            <i class="fa fa-level-down" aria-hidden="true"></i>
                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                            <i class="fa fa-arrow-right" aria-hidden="true"></i>
                            Sometime drag left and right while switching parent child
                        </div>
                        <div id="MenuMgrView">
                            <div id="divLstMenu">
                            </div>
                        </div>
                        <!--menu setting-->
                        <div id="MenuMgrSetting" class="menu-setting">
                            <h2>Menu settings</h2>
                            <div id="tblShowImage" class="sfCheckbox sfMargintop">
                                <input id="chkShowImage" value="Show Image" type="checkbox" />
                                <label for="chkShowImage" id="lblShowImage">
                                    Show Menu Icon</label>
                                <input id="chkShowText" value="Show Text" type="checkbox" />
                                <label for="chkShowText" id="lblShowText">
                                    Show Text</label>
                                <input id="chkCaption" value="Caption" type="checkbox" />
                                <label for="chkCaption" id="lblCaption">
                                    Caption</label>
                                <input id="chkHeader" value="Header" type="checkbox" />
                                <label for="chkHeader" id="lblHeader">
                                    Active Header</label>
                            </div>
                            <div class="sfButtonwrapper sftype1" style="display: none;">
                                <label id="btnSave" class="sfBtn smlbtn-succ icon-save">
                                    Save Settings</label>
                            </div>
                        </div>

                        <h2 id="menureview">Preview</h2>

                        <div id="previewMenuWrapper" class="previewMenuWrapper menu-preview">

                            <div id="previewMenu" class="previewMenu ul">
                            </div>

                        </div>
                    </div>
                </div>
                <div class="settingList">
                    <div class="sfRightdiv">
                        <div class="sfRightDivContainer">
                        </div>
                        <div class="clear">
                        </div>
                    </div>
                </div>
            </div>
            <div class="sfCenterdiv" style="display: none;">
                <div class="sfCenterWrapper">
                    <div class="sfCenter">
                        <div class="sfQuicklink">
                            <h2 class="clearfix">
                                <span id="lblMenuItm">Choose Menu Item Type &nbsp;</span>
                            </h2>
                            <div class="sfRadiobutton">
                                <asp:Literal ID="ltrMenuRadioButtons" runat="server"></asp:Literal>
                            </div>
                            <div id="trSubtext">
                                <div class="divSubText" style="display: none">
                                    <div class="sfFormwrapper">
                                        <div class="sfFieldset">
                                            <span class="formKey">
                                                <span class="sfFormlabel">
                                                    SubText
                                                </span>
                                            </span>
                                            <span class="formValue">
                                                <input type="text" id="txtSubText" class="sfInputbox" /></span>
                                        </div>
                                        <div class="sfFieldset checkboxholder">
                                            <div class="formKey">
                                                
                                               <input type="checkbox" id="chkIsActivePage" />
                                                <label for="chkIsActivePage">Active</label>
                                                
                                            </div>
                                        <div class="sfFieldset checkboxholder">
                                            <div class="formKey">
                                                 
                                                
                                                <input type="checkbox" id="chkIsVisiblePage" />
                                                <label for="chkIsVisiblePage">Visible</label>
                                            </div>
                                            
                                        </div>
                                        <div class="sfButtonwrapper">
                                            <span id="btnSavePageMenuDetail" class="sfBtn smlbtn-succ icon-save">
                                                Save
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="pageMenuitem">
                                <div id="divExternalLink" class="divExternalLink" style="display: none" title="External link">
                                    <div class="sfFormwrapper">
                                        <div class="sfFieldset">
                                            <span class="formKey">
                                                <label class="sfFormlabel">
                                                    Link Title</label>
                                            </span>
                                            <span class="formValue">
                                                <input type="text" class="sfInputbox sfAuto" id="txtLinkTitle" name="txtLinkTitle" />
                                            </span>
                                        </div>
                                        <div class="sfFieldset">
                                            <span class="formKey">
                                                <label class="sfFormlabel">
                                                    Link URL</label>
                                            </span>
                                            <span class="formValue">
                                                <input type="text" id="txtExternalLink" class="sfInputbox sfAuto" name="txtExternalLink" />
                                            </span>
                                        </div>
                                        <div class="sfFieldset">
                                            <span class="formKey">
                                                <label class="sfFormlabel">
                                                    Caption</label>
                                            </span>
                                            <span class="formValue">
                                                <input type="text" id="txtCaptionExtLink" class="sfInputbox sfAuto" />
                                            </span>
                                        </div>
                                        <div class="sfFieldset">
                                            <span class="formValue">
                                                <label class="sfFormlabel">
                                                    Icon</label><br>
                                                <input type="file" id="fupIconExtLink" />
                                                <label for="fupIconExtLink">Choose file</label>
                                                <div class="sfUploadedFilesExtLink">
                                                </div>
                                            </span>
                                        </div>
                                        <div class="sfFieldset">
                                            <span class="formKey"></span>
                                            <span class="formValue"></span>
                                        </div>
                                        <div class="sfFieldset checkboxholder">

                                            <span class="formValue">
                                                <input type="checkbox" id="chkLinkActive" /></span>
                                            <span class="formKey">
                                                <label>Active</label></span>
                                        </div>
                                        <div class="sfFieldset checkboxholder">

                                            <span class="formValue">
                                                <input type="checkbox" id="chkLinkVisible" /></span>
                                            <span class="formKey">
                                                <label>Visible</label>
                                            </span>
                                        </div>
                                        <div class="sfButtonwrapper sftype1">
                                            <label id="btnSaveExternalLink" class="sfBtn smlbtn-succ icon-save">
                                                Save External link</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="divHtmlContent" style="display: none">
                                    <div class="sfFormwrapper">
                                        <div class="sfFieldset">
                                            <span class="formKey">
                                                <label class="sfFormlabel">Link Title</label>
                                            </span>
                                            <span class="formValue">
                                                <input type="text" class="sfInputbox sfAuto" id="txtTitleHtmlContent" name="txtTitleHtmlContent" /></span>
                                        </div>
                                        <div class="sfFieldset">
                                            <span class="formKey">
                                                <label class="sfFormlabel">Caption</label></span>
                                            <span class="formValue">
                                                <input type="text" id="txtCaptionHtmlContent" class="sfInputbox sfAuto" name="txtCaptionHtmlContent" /></span>
                                        </div>
                                        <div class="sfFieldset">
                                            <span class="formKey">
                                                <label class="sfFormlabel">Icon</label></span>
                                            <span class="formValue">
                                                <input type="file" id="fupIconHtmlContent" />
                                                <label for="fupIconHtmlContent">Choose file</label>
                                                <div class="sfUploadedFilesHtmlContent">
                                                </div>
                                            </span>
                                        </div>
                                        <div class="sfFieldset checkboxholder">
                                            <span class="formKey">
                                                <label class="sfFormlabel">Visible</label></span>
                                            <span class="formValue">
                                                <input type="checkbox" id="chkVisibleHtmlContent" /></span>
                                        </div>
                                        <div class="textareaHolder">
                                        </div>

                                        <div class="sfButtonwrapper sftype1">
                                            <label id="btnSaveHtmlContent" class="sfBtn smlbtn-succ icon-save">
                                                Save Html Content</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="trPages">
                                <h4 class="clearfix">
                                    <span>Choose Pages &nbsp;</span>
                                </h4>
                                <div class="sfCheckbox sfMargintop clearfix">
                                    <label>
                                        <input type="checkbox" class="sfCheckbox" id="chkPageOrder" />

                                        Preserve Page Order</label>
                                </div>
                                <div id="divPagelist" class="sfPageList">
                                </div>
                            </div>
                            <div class="sfParentItems sfFormwrapper">
                                <label class="">
                                    Parent Item:</label><br>
                                <select id="selMenuItem" class="sfListmenu">
                                </select>
                                <div class="sfButtonwrapper sftype1">
                                    <label id="imgAddmenuItem" class="icon-addnew sfBtn smlbtn-primary">
                                        Add Menu Item</label>
                                    <label id="imgAddMenuCancel" class="icon-close sfBtn smlbtn-danger">
                                        Cancel</label>
                                </div>
                            </div>
                        </div>
                        <div class="clear">
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <%-- <div id="divAddUsers" title="Search Users" class="sfFormwrapper" style="display: none">
            <p class="sfNote">
                All form fields are required.</p>
            <table cellpadding="0" cellspacing="0" width="0">
                <tr>
                    <td>
                        <input type="text" name="name" id="txtSearchUsers" class="sfInputbox" />
                    </td>
                    <td class="sftype1">
                        <label id="btnSearchUsers" class="sfSearch">
                            Search</label>
                    </td>
                </tr>
            </table>
            <div id="divSearchedUsers">
            </div>
            <div class="sfButtonwrapper sftype1">
                <label id="btnAddUser" class="sfAdd">
                    Add</label>
                <label id="btnCancelUser" class="sfCancel">
                    Cancel</label>
            </div>
        </div>--%>
    </div>
    <div id="myMenu1" class="sfContextmenu sfCurve Shadow">
        <ul>
            <li id="remove">
                <img runat="server" id="imgRemove" alt="Remove" title="Remove" />
                <b>Delete Menu Item</b></li>
        </ul>
    </div>
</div>
