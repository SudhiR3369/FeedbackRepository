<%@ Control Language="C#" AutoEventWireup="true" CodeFile="QuickDashBoardAgenda.ascx.cs" Inherits="Modules_ArticleAdmin_QuickDashboard_QuickDashBoardAgenda" %>

<div class="news-quickdashboard agendas">
    <div class="box-heading">
        <h2 class="box-title">Agendas</h2>
        <div id="mngBtn" class="control-wrap" style="float: right">
            
        </div>
        <%--Agenda form section starts here--%>
        <div id="addAgendaForm" class="sfFormwrapper" style="display: none">
            <div class="sfFieldset">
                <div class="formKey ">
                    <input id="titleID" type="hidden" value="0" />
                    <span class="sfFormLabel">Title</span>
                </div>
                <div class="formValue">
                    <input id="agendaTitle" type="text">
                </div>

            </div>
            <div class="sfFieldset">
                <div class="formKey ">
                    <span class="sfFormLabel">Date</span>
                </div>
                <div class="formValue">
                    <div class="control-wrap">

                        <div class="custom-inputbox  datepicker-input-box">
                            <input type="text" class="filter_field" id="txtDate">
                        </div>



                    </div>
                </div>

            </div>
            <div class="sfFieldset " id="textArea">

                <div class="formValue relative">
                    <input type="hidden" name="agendaID" value="0" />
                    <textarea name="content" maxlength="500" placeholder="500 character only."></textarea>
                </div>
            </div>
            <label id="agendaError" class="sfError"></label>
          
            <div class="sfButtonwrapper">
                <a id="btnSave" class="icon-save sfBtn smlbtn-succ ">Save</a>
				  <a id="btnAddNext" class="sfBtn smlbtn-primary icon-addnew">Add Next Content</a>
                <a id="btnCancel" class="icon-cross sfBtn smlbtn-danger ">Cancel</a>

            </div>

        </div>
        <%--Agenda form section ends here--%>

        <%--Agenda setting section starts here--%>
        <div id="settingForm" class="sfFormwrapper" style="display: none;">
            <div class="sfFieldset">
                <div class="formValue">
                    <div id="agendaList"></div>
                </div>
            </div>

            <div class="sfPagination" id="QDBoardPagi">
            </div>

            <div class="sfButtonwrapper">
                <%--<a id="btnSaveSetting" class="icon-save btn green-btn ">Save</a>--%>
                <a id="btnCancelSetting" class="icon-cross sfBtn smlbtn-danger">Cancel</a>
            </div>
        </div>
        <%--Agenda setting section ends here--%>
    </div>
    <div id="agendaContent">
    </div>
</div>
<script type="text/javascript">
    $(function () {
        $(this).CallQDboardAgenda({
            UserModuleID: '<%=UserModuleID %>',
            roleID: '<%=RoleID %>',
            SiteID: '<%=SiteID %>'
        });
    });
</script>
