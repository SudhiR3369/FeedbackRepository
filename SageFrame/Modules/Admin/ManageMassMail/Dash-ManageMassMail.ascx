<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Dash-ManageMassMail.ascx.cs" Inherits="Dash_ManageMassMail_ManageMassMail" %>
<%@ Register Src="~/Modules/Admin/MessageManagement/SampleTemplate/SampleTemplate.ascx" TagPrefix="uc1" TagName="SampleTemplate" %>
<%@ Register Src="~/Modules/Admin/MessageManagement/SampleTemplate/ToolboxItems.ascx" TagPrefix="uc1" TagName="ToolboxItems" %>

<script type="text/javascript">
    $(function () {
        $(this).MessageTemplate({
        });
        $(this).Dash_MassMailManage({
            modulePath: '<%=ModulePath %>',
            userModuleID: '<%=UserModuleID %>'
        });
    });

    //]]>
</script>
<div  id="divMassMailList">
     <h1><span>Mail Management</span></h1>

     <!--Easy Grid Top Filter Part-->
        <div id="divFilters" class="easy-grid-top-filter">
            <div class="add-item-btn add_new sfFieldset">
                <button type="button" class="sfBtn smlbtn-success" id="btnNewMassMail">Create New</button>
            </div>
            <div class="control-wrap">
            			    <label class="sfFormlabel">Type</label>
            			    <div class="custom-select">
            			    <select id="ddlFilterType" name="ddlFilterType">
                                                                            <option value="0" selected="selected">- select type - </option>
                                                                            <option value="1">Role</option>
                                                                             <option value="2">Suscribe User</option>
                                                                            <option value="4">All Users</option>
                                                                            <option value="5">Custom</option>
                                                                         </select>
            </div>
            </div>
            <div class="control-wrap">
                <label class="sfFormlabel">Status</label>
                <div class="custom-select">
                <select id="ddlStatus" name="ddlStatus">
                                                    <option value="0" selected="selected">- select status - </option>
                                                    <option value="1">Scheduled</option>
                                                    <option value="2">Processed</option>
                                                    <option value="3">Dispatched</option>
                                                </select>
                </div>
            </div>
            <div class="control-wrap">
                            <label class="sfFormlabel">Mail Title</label>
                            <div class="custom-inputbox">
                            <input type="text" id="txtMassMailTitle" placeholder="Mail Title" name="txtMassMailTitle" class="search filter_field">
                            </div>
                        </div>
            <div class="control-wrap">
                <button type="button" class="search-btn icon-zoom" id="btnSearchMail"></button>
                <!--<a href="javascript:void(0)" class="sfBtn smlbtn-secondary  icon-refresh" id="btnRefreshData"></a>-->
            </div>
    </div>
     <!--Ends-->

    <div class="content box">
            <div class="loading">
                <img id="ajaxImageLoad" />
            </div>
            <div class="log">
            </div>
            <!--Easy Grid Table generic-->
            <div class="easy-grid">
                <table id="tblMassMailList" >
             </table>
            </div>
            <!--Ends-->

            <div id="divMailPagination" class="sfPagination"></div>
            <div class="clearfix"></div>

    </div>


</div>


<div id="divMailManage" class="" style="display: none;">


<!--Easy Form Elements-->
<div class="easy-form-elements form-style-row-field clearfix">
<!--label and input-->
    <div class="control-wrap">
        <label class="sfFormlabel">Title</label>
        <div class="custom-inputbox x-small-box">
            <input type="text" id="txtMailTitle" name="mailTitle" class="input_field" />
        </div>
    </div>
<!--Ends-->

<!--label and input-->
    <div class="control-wrap">
        <label class="sfFormlabel">Custom Users</label>
        <div class="custom-inputbox small-box">
            <input type="text" id="txtAdditionalUsers" name="additionaluser" class="input_field" />
        </div>
    </div>
<!--Ends-->

<!--Radio buttons-->
    <div class="control-wrap">
        <span class="radio-option-wrap">
            <input id="rbInstant" type="radio" name="schedule" class="input_radio rbSchedule" value="1" />
            <label class="radio_label" for="rbInstant">Instant</label>
        </span>
        <span class="radio-option-wrap">
            <input id="rbCustom" type="radio" name="schedule" class="input_radio rbSchedule" value="2" />
            <label class="radio_label" for="rbCustom">Custom</label>
        </span>

    </div>
<!--Ends-->

<!--label and input-->
    <div id="divScheduleForm" class="control-wrap">
        <label class="sfFormlabel">Schedule Date</label>
        <div class="custom-inputbox x-small-box datepicker-input-box">
            <input type="text" class="filter_field" id="txtSchedule" name="scheduleOn" />
        </div>
    </div>
<!--Ends-->

<!--label and input-->
    <div class="control-wrap">
        <label class="sfFormlabel">Subjct</label>
        <div class="custom-inputbox medium-box">
            <input type="text" id="txtSubject" name="subject" class="sfTextarea" />
        </div>
    </div>
<!--Ends-->

<!--label CK Editor -->
    <div class="control-wrap">
        <label class="sfFormlabel" >Email Template Body</label>
        <div class="email-body-template-wrap">
            <div class="ck-editor-wrap">
                <textarea cols="300" rows="5" id="txtBody" name="body"></textarea>
                 <div>
                    <br>
                    <a ID="btnPreviewMessage" href="javascript:void(0)" class="btn primary-btn">Preview</a>
                 </div>
            </div>

            <div class="template-components-wrap">
                <uc1:ToolboxItems runat="server" ID="ToolboxItems" />
                <%-- This is hidden sample which will drop when drag from toolbox--%>
                <div id="divMessageTempSample" style="display: none">
                    <uc1:SampleTemplate runat="server" ID="SampleTemplate" />
                </div>
            </div>
        </div>
    </div>
<!--Ends-->

<!--label and select-->
    <div class="control-wrap">
        <label class="sfFormlabel">Mail Recipient Group</label>
        <div class="custom-select x-small-box">
            <select id="ddlFormFilterType" name="ddlFormFilterType" class="select_option sm-fld">
                                <option value="1" selected="selected">Role</option>
                                <option value="2">Suscribe User</option>
                                <option value="4">All Users</option>
                                <option value="5">None</option>
                            </select>
        </div>
    </div>
<!--Ends-->

<!--label and multiselect-->
    <div class="control-wrap">
        <label class="sfFormlabel">Mail Recipient Sub Group</label>
        <div class="custom-select x-small-box" style="display: none">
            <select multiple id="ddlFormFilterValue" name="ddlFormFilterValue" class="multiple sfListmenubig multipleselect">
             <asp:Literal runat="server" ID="ltrFilterValue"></asp:Literal>
            </select>
            <span class="span-info">(Press Ctrl and select for multiple options)</span>
        </div>
    </div>
<!--Ends-->

</div>
<!--Ends-->

    <div class="sfFormwrapper">



        <div class="clearfix"></div>
        <div class="sfButtonwrap">
            <button type="button" id="btnSaveMassMail" class="btn green-btn">Save</button>
            <button type="button" id="btnCancelMassMailManage" class="btn red-btn">Cancel</button>
        </div>

    </div>

</div>
<div id="divMessagePreview" style="background:#fff;height:auto !important;display:none;">
      <asp:Literal ID="ltrlPreview" runat="server"></asp:Literal>
</div>
