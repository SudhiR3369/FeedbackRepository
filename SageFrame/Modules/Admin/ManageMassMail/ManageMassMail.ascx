<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ManageMassMail.ascx.cs" Inherits="Modules_SageCloud_ManageMassMail_ManageMassMail" %>
<%@ Register Src="~/Modules/Admin/MessageManagement/SampleTemplate/SampleTemplate.ascx" TagPrefix="uc1" TagName="SampleTemplate" %>
<%@ Register Src="~/Modules/Admin/MessageManagement/SampleTemplate/ToolboxItems.ascx" TagPrefix="uc1" TagName="ToolboxItems" %>

<script type="text/javascript">
    $(function () {
        $(this).MessageTemplate({
        });
        $(this).MassMailManage({
            modulePath: '<%=ModulePath %>',
            userModuleID: '<%=UserModuleID %>'
        });
    });

    //]]>
</script>
<div class="sfGridwrapper animate" id="divMassMailList">
     <h1><span>Mail Management</span></h1>
    <div id="divFilters">

        <div class="filter_wrap sfFormwrapper multiColForm">
            <div class="add_new sfFieldset">
                <button type="button" class="sfBtn smlbtn-primary icon-addnew" id="btnNewMassMail">Create</button>
            </div>
			<div class="sffiltergroup">
            <div class="filter_group sfFieldset">
                <div class="fromKey">
                    <span class="sfFormlabel">Type</span>
                </div>
                <div class="formValue">
                </div>
                <select id="ddlFilterType" name="ddlFilterType">
                    <option value="0" selected="selected">- select type - </option>
                    <option value="1">Role</option>
                     <option value="2">Suscribe User</option>
                    <option value="4">All Users</option>
                    <option value="5">Custom</option>
                 </select>
            </div>
            <div class="filter_group sfFieldset">
                <div class="fromKey">
                    <span class="sfFormlabel">Status</span>
                </div>
                <div class="formValue">
                    <select id="ddlStatus" name="ddlStatus">
                        <option value="0" selected="selected">- select status - </option>
                        <option value="1">Scheduled</option>
                        <option value="2">Processed</option>
                        <option value="3">Dispatched</option>
                    </select>
                </div>


            </div>
            <div class="filter_group sfFieldset">
                <div class="fromKey">
                    <span class="sfFormlabel">Mail Title</span>
                </div>
                <div class="formValue">
                    <input type="text" id="txtMassMailTitle" placeholder="Mail Title" name="txtMassMailTitle" class="sfInputbox search filter_field">
                </div>

            </div>

            <div class="filter_button_wrap sfFieldset">

                <button type="button" class="sfBtn smlbtn-primary filter_search icon-search" id="btnSearchMail">Search</button>
                <a href="javascript:void(0)" class="sfBtn smlbtn-secondary  icon-refresh" id="btnRefreshData"></a>
            </div>
        </div>
		</div>

    </div>

    <div class="content box">
        <div class="content_wrap">
            <div class="loading">
                <img id="ajaxImageLoad" />
            </div>
            <div class="log">
            </div>
            <table id="tblMassMailList" class="responsive_data_table">
             
            </table>
            <div id="divMailPagination" class="sfPagination"></div>
            <div class="clearfix"></div>
        </div>
    </div>


</div>


<div id="divMailManage" class="large_form " style="display: none;">

    <div class="filter_wrap sfFormwrapper">
        <div class="sfFieldset">
            <div class="formKey">
                <label class="sfFormlabel">Title</label>

            </div>
            <div class="formValue">
                <input type="text" id="txtMailTitle" name="mailTitle" class="input_field" />
            </div>
        </div>

        <div class="sfFieldset">
            <div class="formKey">
                <label class="sfFormlabel">Custom Users</label>
            </div>

            <div class="formValue">
                <input type="text" id="txtAdditionalUsers" name="additionaluser" class="input_field" />
            </div>
            <div id="divSelectedUsers" class="selectedUers">
            </div>
        </div>

        <div class="sfFieldset">
            <div class="formKey">

                <input id="rbInstant" type="radio" name="schedule" class="input_radio rbSchedule" value="1" />
                <label class="radio_label" for="rbInstant">Instant</label>
                <input id="rbCustom" type="radio" name="schedule" class="input_radio rbSchedule" value="2" />
                <label class="radio_label" for="rbCustom">Custom</label>
            </div>
        </div>
        <div class="sfFieldset" id="divScheduleForm">
            <div class="formKey">
                <label class="sfFormlabel">Schedule Date</label>
            </div>
            <div class="formValue">
                <input type="text" class="filter_field" id="txtSchedule" name="scheduleOn" />
            </div>
        </div>

        <div class="sfFieldset">
            <div class="formKey">
                <label class="sfFormlabel">Subject</label>
            </div>

            <div class="formValue">
                <input type="text" id="txtSubject" name="subject" class="sfTextarea" />
            </div>
        </div>

        <div class="sfFieldset ">
            <div class="formKey ckEditor">
                <label class="sfFormlabel" ">Body</label>
            </div>
            <div class="formValue">
                <textarea cols="300" rows="5" id="txtBody" name="body"></textarea>
                  <div>
                        <br />
                       
                          <a ID="btnPreviewMessage" href="javascript:void(0)" class="sfBtn smlbtn-primary icon-page-preview">
                            Preview</a>
                    </div>
            </div>
            <div class="formValue">
                <uc1:ToolboxItems runat="server" ID="ToolboxItems" />
                <%-- This is hidden sample which will drop when drag from toolbox--%>
                <div id="divMessageTempSample" style="display: none">
                    <uc1:SampleTemplate runat="server" ID="SampleTemplate" />
                </div>
            </div>
        </div>

        <div class="sfFieldset" >
            <div class="formKey">
                <label class="sfFormlabel">Mail Recipient Group</label>
            </div>
            <div class="formValue">
                <select id="ddlFormFilterType" name="ddlFormFilterType" class="select_option sm-fld">
                    <option value="1" selected="selected">Role</option>
                    <option value="2">Suscribe User</option>
                    <option value="4">All Users</option>
                    <option value="5">None</option>
                </select>
            </div>
        </div>
        <div id="filterValue" class="sfFieldset divMailRecipientGroup">
            <div class="formKey">
                <label class="sfFormlabel">Mail Recipient Sub-Group</label>
            </div>
            <div class="formValue">
                <select multiple id="ddlFormFilterValue" name="ddlFormFilterValue" class="multiple sfListmenubig multipleselect">
                    <asp:Literal runat="server" ID="ltrFilterValue"></asp:Literal>
                </select>
                <span class="span-info">(Press Ctrl and select for multiple options)</span>
            </div>
        </div>


        <div class="clearfix"></div>
        <div class="sfButtonwrap">
            <button type="button" id="btnSaveMassMail" class="sfBtn smlbtn-succ icon-save">Save</button>
            <button type="button" id="btnCancelMassMailManage" class="sfBtn smlbtn-danger icon-close">Cancel</button>
        </div>

    </div>

</div>
<div id="divMessagePreview" style="background:#fff;height:auto !important;display:none;">
      <asp:Literal ID="ltrlPreview" runat="server"></asp:Literal>
</div>
