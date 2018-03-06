<%@ Control Language="C#" AutoEventWireup="true" CodeFile="FileMgr.ascx.cs" Inherits="Modules_FileManager_FileMgr" %>
<script type="text/javascript">
    $(function () {
        $(this).FManager({
            UserID: '<%=UserID%>',
            UserModuleID: '<%=UserModuleID%>',
            hostdirName: '<%=hostdirName%>',
            UserName: '<%=UserName%>'
        });
    });
</script>
<h1>File Manager</h1>
<div class="sfFilemanageholder sfMargintop">
    <div class="sfAdvanceRadioBtn clearfix">
        <div id="divTab">
            <ul class="sfTab clearfix">
                <li id="Template" class="sfActive">
                    <label class="sfFormlabel">
                        Template</label></li>
                <li id="Module">
                    <label class="sfFormlabel">
                        Modules</label></li>
                <li id="System" class="lastList">
                    <label class="sfFormlabel">
                        System</label></li>
            </ul>
        </div>
    </div>

    <div class="flex-wrapp">
        <div id="divFileTreeOuter">

            <div class="clear">
            </div>
            <div id="divFileTree">
            </div>
        </div>
        <div class="sfRightcol sfContentWrap">
            <div class="sfContent">
                <div class="clearfix sfFormwrapper sfPadding sfBorderNone">
                    <div id="divControls" class="clearfix">
                        <ul>
                            <li class="sfUpload icon-addnew sfBtn smlbtn-primary">Add File</li>
                            <li class="sfDelete icon-delete sfBtn smlbtn-def">Delete File</li>
                            <li class="sfAddfolder icon-addnew sfBtn smlbtn-def">Add Folder</li>
                            <li class="sfDeletefolder icon-delete sfBtn smlbtn-def">Delete Folder</li>
                            <li class="sfCopy icon-copy sfBtn smlbtn-def">Copy</li>
                            <li class="sfMove icon-move sfBtn smlbtn-def">Move</li>
                            <li class="sfRefresh icon-refresh sfBtn smlbtn-def">Refresh</li>
                        </ul>
                        <div class="clear">
                        </div>
                    </div>

                    <div class="sfRowfilter  sfSorting temFilemanager">

                        <div class="sfFieldset">
                            <div class="formKey"><span class="sfFormlabel">Address</span></div>
                            <div class="formValue">

                                <input type="text" id="txtAddress" class="sfInputbox" disabled="disabled" />
                            </div>
                        </div>

                        <div class="sfFieldset">
                            <div class="formKey">
                                <span class="sfFormlabel">Search</span>
                            </div>
                            <div class="formValue">
                                <input type="text" id="txtSearch" class="sfInputbox sfAuto sfFloatLeft" />

                            </div>
                        </div>

                        <div class="sfFieldset">
                            <label id="imbSearch" class="icon-search sfBtn smlbtn-primary" style="margin-top: 0;">
                                Search
                            </label>
                        </div>
                        <div class="sfFieldset">
                            <div class="formKey">Items Per Page</div>
                            <div class="formValue">
                                <select id="ddlPageSize" class="sfListmenu sfAuto">
                                </select>
                            </div>
                        </div>
                    </div>


                    <%--<div id="divSearch" class="sfTableOption clearfix">--%>
                    <%--<div class="sfLeftdiv">--%>
                    <%--<table border="0" cellspacing="0" cellpadding="0" class="sfFloatleft">--%>
                    <%--<tr>--%>
                    <%--<td>--%>
                    <%--<label class="sfFormlabel">--%>
                    <%--Address:</label>--%>
                    <%--</td>--%>
                    <%--<td>--%>
                    <%--<input type="text" id="txtAddress" class="sfInputbox" disabled="disabled" />--%>
                    <%--</td>--%>
                    <%--<td>--%>
                    <%--<label class="sfFormlabel">--%>
                    <%--Search:</label>--%>
                    <%--</td>--%>
                    <%--<td>--%>
                    <%--<input type="text" id="txtSearch" class="sfInputbox sfAuto sfFloatLeft" />--%>
                    <%--<label id="imbSearch" class="icon-search sfBtn">--%>
                    <%--</label>--%>
                    <%--</td>--%>
                    <%--<td>--%>
                    <%-- <img src="" id="imbSearch" />--%>
                    <%--</td>--%>
                    <%--</tr>--%>
                    <%--</table>--%>
                    <%--</div>--%>
                    <%--<div class="sfRightdiv">--%>
                    <%--<label class="sfFormlabel">--%>
                    <%--Items Per Page:</label>--%>
                    <%--<select id="ddlPageSize" class="sfListmenu sfAuto">--%>
                    <%--</select>--%>
                    <%--</div>--%>
                    <%--</div>--%>
                </div>
                <div id="divFileList">
                </div>
                <div id='divPagerNav' class="sfPagination clearfix">
                </div>
            </div>
        </div>
    </div>
</div>


<div class="custom-pop-wrapper">

    <div id="uploadFilePopUp" class="popupbox " style="width: 200px; background-color: #fff; display: none;">
        <div class="ui-widget-header">
            <span class="ui-dialog-title" id="ui-dialog-title-divEditPopUp">FileMgrPopUp</span><a
                href="#" class="ui-dialog-titlebar-close" role="button"><span class="sfClosepopup ui-icon ui-icon-closethick">close</span></a>
        </div>
        <div class="pop-content">
            <div class="sfFormwrapper">
                <%-- <tr>
                   <td colspan="3">
                            <span id="spnPath"></span>
                        </td>
                    </tr>--%>
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">Browse Files: </span>
                    </div>
                    <div class="formValue">
                        <div class="sfButtonwrapper">


                            <input type="file" id="fileUpload" class="fileClass" />
                            <label for="fileUpload">Choose File</label>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="newFolderPopUp" class="popupbox " style="display: none;">
        <div class="ui-widget-header">
            <span class="ui-dialog-title" id="Span1">Add New Folder</span><a href="#" class="ui-dialog-titlebar-close ui-corner-all"
                role="button"><span class="sfClosepopup ui-icon ui-icon-closethick">close</span></a>
        </div>
        <div class="pop-content">
            <div class="sfFormwrapper">
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">FolderName</span>
                    </div>
                    <div class="formValue">
                        <input type="text" id="txtFolderName" class="sfInputbox" />
                    </div>

                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">Type</span>
                    </div>
                    <div class="formValue">
                        <span class="inline">
                            <input type="checkbox" id="chkFolderType" disabled="disabled" checked="checked">
                        </span>
                        <span class="sfFormlabel">Standard
                        </span>
                        <%-- <select id="ddlFileType" class="sfListmenu">
                            <option value="0">Standard</option>
                            <option value="1">Secured</option>
                            <option value="2">Database</option>
                        </select>--%>
                    </div>
                </div>

                <div class="sfButtonwrapper">
                    <button type="button" id="btnCreateFolder" class="sfBtn smlbtn-succ icon-update">Create</button>
                </div>


            </div>
        </div>
    </div>

    <div id="divEditMode" class="popupbox " style="height: 75%; width: 75%; overflow: scroll; background-color: #fff; display: none;">
        <div class="ui-widget-header">
            <span class="ui-dialog-title" id="Span4">FileMgrPopUp</span><a href="#" class="ui-dialog-titlebar-close ui-corner-all"><span
                class="sfClosepopup ui-icon ui-icon-closethick">close</span></a>
        </div>
        <div class="pop-content">
            <div id="divImages">
                <h2>Edit Image</h2>
                <div id="divFileInforMation">
                </div>
                <div class="sfFormwrapper">
                    <div class="multiColForm">
                        <div id="trUrl" class="sfFieldset">
                            <div class="formKey">
                                <span class="sfFormlabel">Share Link:
                                </span>
                            </div>
                            <div class="formValue">
                                <input type="text" class="sfInputbox" id="txtUrl" readonly="readonly" style="width: 400px;" />
                            </div>
                        </div>
                        <div class="sfFieldset">
                            <div class="formValue">
                                <a id='downloadLink' class='icon-download sfBtn smlbtn-def'>Download</a>
                            </div>
                        </div>
                    </div>
                    <div class="sfFieldset">
                        <div class="formKey ">
                            <label id="hdnPath" style="display: none">
                            </label>
                            <span class="sfFormlabel">Image:
                            </span>
                            <label id="txtTitle">
                            </label>
                        </div>
                        <div class="formValue">
                            <span class="sfFormlabel">Cropped image:</span>
                        </div>
                    </div>
                    <div class="sfFieldset">
                        <div class="formKey originalImage">
                            <div class="sfOrgImage">
                                <img src="" alt="My Image" title="Image" id="originalImage" />
                            </div>
                            <div>
                                X1
                                <input type="text" size="4" id="x1" name="x1" class="coor" readonly="readonly" />
                                Y1
                                <input type="text" size="4" id="y1" name="y1" class="coor" readonly="readonly" />
                                X2
                                <input type="text" size="4" id="x2" name="x2" class="coor" readonly="readonly" />
                                Y2
                                <input type="text" size="4" id="y2" name="y2" class="coor" readonly="readonly" />
                                <br />
                                W
                                <input type="text" size="4" id="w" name="w" class="coor" readonly="readonly" />
                                H
                                <input type="text" size="4" id="h" name="h" class="coor" readonly="readonly" />
                            </div>
                            <div class="sfButtonwrapper">
                                <label id="btnCrop" class="icon-crop sfBtn smlbtn-succ icon-crop" onclick="return ValidateSelected();">
                                    Crop</label>
                            </div>
                        </div>
                        <div class="croppedImage" style="vertical-align: top;">
                            <div id="divCropedImage" class="sfCropImage">
                            </div>
                        </div>
                    </div>
                    <tr>
                        <td></td>
                    </tr>
                </div>
            </div>
            <div class="sfFormwrapper">
                <div class="multiColForm">
                    <div id="divEditFile" class="sfFieldset">
                        <div class="formKey">
                            <span class="sfFormlabel">Share Link:
                            </span>
                        </div>
                        <div class="formValue">
                            <input type="text" class="sfInputbox" id="txtShareFile" readonly="readonly" style="width: 400px;" />
                        </div>
                    </div>
                    <div class="sfFieldset">
                        <div class="formValue">
                            <a id='downloadFile' class='icon-download sfBtn smlbtn-def'>Download</a>
                        </div>
                    </div>
                    <div class="sfFieldset">
                        <textarea id="txtEditFile" name="txtEditFile" style="display: none"></textarea>
                        <label id="lblFilepath" style="display: none">
                        </label>
                    </div>
                </div>
            </div>
            <div class="sfButtonwrapper sftype1">
                <label id="lblSaveDocument" class="icon-save sfBtn smlbtn-succ">
                    Save</label>
            </div>
        </div>
    </div>


    <div id="divEditPopUp" class="popupbox sfFormwrapper" style="display: none;">
        <div class="ui-widget-header">
            <span class="ui-dialog-title" id="Span2">Rename File</span><a href="#" class="ui-dialog-titlebar-close ui-corner-all"
                role="button"><span class="sfClosepopup ui-icon ui-icon-closethick">close</span></a>
        </div>
        <div class="pop-content">
            <div class="sfFormwrapper">
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">FileName</span>
                    </div>
                    <div class="formValue">
                        <input type="text" id="txtEditFileName" class="sfInputbox" />
                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">File Mode</span>
                    </div>
                    <div class="formValue">
                        <span class="inline">
                            <input type="checkbox" id="chkArchive" value="A" disabled="disabled" />
                        </span>
                        <span class="sfFormlabel">Archive</span>
                    </div>
                    <%--   <td>
                        <input type="checkbox" id="chkRead" value="R" />
                        Read
                    </td>--%>

                    <%--  <tr>
                    <td>
                    </td>
                    <td>
                        <input type="checkbox" id="chkSystem" value="W" />
                        Write<br />
                    </td>
                </tr>
                <tr>
                    <td>
                    </td>
                    <td>
                        <input type="checkbox" id="chkHidden" value="H" />
                        Hidden<br />
                    </td>
                </tr>--%>

                    <div class="sfButtonwrapper">
                        <button type="button" id="btnUpdateFile" class="sfBtn smlbtn-succ icon-update">Update</button>
                    </div>


                </div>
            </div>
        </div>
    </div>

    <div id="divCopyFiles" class="popupbox" style="display: none;">
        <div class="ui-widget-header">
            <span class="ui-dialog-title" id="Span3">Message</span><a href="#" class="ui-dialog-titlebar-close ui-corner-all"
                role="button"><span class="sfClosepopup ui-icon ui-icon-closethick"> close</span></a>
        </div>
        <div class="pop-content">
            <p id="copyMessage">
            </p>
            <div class="sfButtonwrapper">
                <button type="button" id="btnCopy" class="sfBtn smlbtn-succ icon-update" value="">Copy</button>
            </div>
        </div>
    </div>

    <div id="divMessagePopUp" class="popupbox" style="display: none;">
        <div class="ui-widget-header">
            <a href="#" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="sfClosepopup ui-icon ui-icon-closethick">close</span></a>
        </div>
        <div class="pop-content">
            <div class="cssClassFileManagerPopUP" style="text-align: center">
                <span class="cssClassMessage sfFormlabel"></span>
            </div>
        </div>
    </div>

    <div id="divSuccessPopUp" class="popupbox" style="display: none;">
        <div class="ui-widget-header">
            <a href="#" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="sfClosepopup ui-icon ui-icon-closethick">close</span></a>
        </div>
        <div class="pop-content">
            <div class="cssClassFileManagerPopUP" style="text-align: center">
                <span class="cssClassSuccessMessage sfFormlabel"></span>
            </div>
        </div>
    </div>

    <div id="divErrorPopUp" class="popupbox" style="display: none;">
        <div class="ui-widget-header">
            <span class="ui-dialog-title" id="Span6">Add New Folder</span><a href="#" class="ui-dialog-titlebar-close ui-corner-all"
                role="button"><span class="sfClosepopup ui-icon ui-icon-closethick">close</span></a>
        </div>
        <div class="pop-content">
            <div class="cssClassFileManagerPopUP" style="text-align: center">
                <span class="cssClassErrorMessage sfFormlabel"></span>
            </div>
        </div>
    </div>

    <div id="divConfirmPopUp" class="popupbox sfFormwrapper" style="display: none;">
        <div class="ui-widget-header">
            <span class="ui-dialog-title" id="Span7">Confirmation</span><a href="#" class="ui-dialog-titlebar-close ui-corner-all"
                role="button"><span class="sfClosepopup ui-icon ui-icon-closethick">close</span></a>
        </div>
        <div class="pop-content">
            <span class="sfFormlabel sfConfirmmsg" style="text-align: center"></span>
            <div class="sfButtonwrapper" style="text-align: center">
                <button type="button" id="btnConfirmYes" style="float: none" class="sfBtn smlbtn-succ icon-update">Yes</button>
                <button type="button" id="btnConfirmNo" style="float: none" class="sfBtn smlbtn-danger icon-cancel">No</button>
            </div>
        </div>
    </div>
</div>
<asp:HiddenField ID="hdnDestinationPath" runat="server" Value="" />
