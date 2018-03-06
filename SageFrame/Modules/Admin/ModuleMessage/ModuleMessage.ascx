<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ModuleMessage.ascx.cs"
    Inherits="Modules_Admin_ModuleMessage_ModuleMessage" %>

<script type="text/javascript">
    //<![CDATA[
    $(function () {
        $('#txtModuleMessage').ckeditor("config");
        var ModuleMessage = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                method: "",
                url: "",
                categoryList: "",
                ajaxCallMode: 0, ///0 for get categories and bind, 1 for notification,2 for versions bind                                   
                arr: [],
                arrModules: [],
                baseURL: '<%=appPath%>' + '/Modules/Admin/ModuleMessage/Services/ModuleMessageWebService.asmx/',
                PortalID: 1,
                Path: '<%=appPath%>' + '/Modules/Admin/ModuleMessage/'
            },
            init: function () {
                //this.InitTabs();
                this.GetModules();
                $('#btnSaveMessage').bind("click", function () {
                    ModuleMessage.SaveModuleMessage();
                });
                $('#ddlModuleSelect').bind("change", function () {
                    ModuleMessage.GetModuleMessage();
                });
            },
            InitTabs: function () {
                $('#tabModuleInfo').tabs({ fx: [null, { height: 'show', opacity: 'show' }] });
            },
            GetModules: function () {
                $.ajax({
                    type: ModuleMessage.config.type,
                    contentType: ModuleMessage.config.contentType,
                    cache: ModuleMessage.config.cache,
                    url: ModuleMessage.config.baseURL + "GetModules",
                    data: {},
                    dataType: ModuleMessage.config.dataType,
                    success: function (msg) {
                        var modules = msg.d;
                        var htmlArr = [];
                        $.each(modules, function (index, item) {
                            htmlArr.push('<option value=' + item.ModuleID + '>' + item.FriendlyName + '</option>');
                        });
                        $('#ddlModuleSelect').html(htmlArr.join(','));
                        ModuleMessage.GetCulture();
                        ModuleMessage.GetModuleMessage();
                    }
                });
            },
            GetCulture: function () {
                $.ajax({
                    type: ModuleMessage.config.type,
                    contentType: ModuleMessage.config.contentType,
                    cache: ModuleMessage.config.cache,
                    url: ModuleMessage.config.baseURL + "GetCultures",
                    data: {},
                    dataType: ModuleMessage.config.dataType,
                    success: function (msg) {
                        var modules = msg.d;
                        var htmlArr = [];
                        $.each(modules, function (index, item) {
                            htmlArr.push('<option value=' + item.Key + '>' + item.Key + '</option>');
                        });
                        $('#ddlCulture').html(htmlArr.join(','));
                        $('#ddlCulture').val("en-US");
                    }
                });
            },
            GetModuleMessage: function () {
                var param = { ModuleID: $('#ddlModuleSelect').val(), Culture: $('#ddlCulture').val() == undefined ? "en-US" : $('#ddlCulture').val() };
                $.ajax({
                    type: ModuleMessage.config.type,
                    contentType: ModuleMessage.config.contentType,
                    cache: ModuleMessage.config.cache,
                    url: ModuleMessage.config.baseURL + "GetMessage",
                    data: JSON2.stringify(param),
                    async: false,
                    dataType: ModuleMessage.config.dataType,
                    success: function (msg) {
                        if (msg.d != null) {
                            var message = msg.d;
                            $('#txtModuleMessage').val(message.Message);
                            $('#ddlMessageType').val(message.MessageType);
                            $('#ddlPersist').val(message.MessageMode);
                            $('#ddlMessagePosition').val(message.MessagePosition);
                            if (message.IsActive)
                                $('#chkIsActive').attr("checked", true);
                            else
                                $('#chkIsActive').attr("checked", false);
                        }
                    }
                });
            },
            SaveModuleMessage: function () {
                var param = {
                    objMessage: {
                        ModuleID: $('#ddlModuleSelect').val(),
                        Message: $('#txtModuleMessage').val(),
                        Culture: $('#ddlCulture').val(),
                        IsActive: $('#chkIsActive').prop("checked"),
                        MessageType: $('#ddlMessageType').val(),
                        MessageMode: $('#ddlPersist').val(),
                        MessagePosition: $('#ddlMessagePosition').val()
                    }, UserName: SageFrameUserName,
                    PortalID: SageFramePortalID,
                    userModuleId: '<%=userModuleId%>',
                    secureToken: SageFrameSecureToken
                };
                $.ajax({
                    type: ModuleMessage.config.type,
                    contentType: ModuleMessage.config.contentType,
                    cache: ModuleMessage.config.cache,
                    url: ModuleMessage.config.baseURL + "AddMessage",
                    data: JSON2.stringify(param),
                    dataType: ModuleMessage.config.dataType,
                    success: function (msg) {

                        SageFrame.messaging.show("Module Message saved successfully", "Success");
                    }
                });
            }
        };
        ModuleMessage.init();
    });
    //]]>	
</script>

<h1>Module Message Manager</h1>
<div class="sfFormwrapper twoColForm">
    <%-- <ul>
            <li><a href="#dvModuleInfo">Module Info</a></li>
        </ul>--%>
    <div class="sfFormwrapper">
        <div class="sfFieldset">
            <span class="formKey">
                <label class="sfFormlabel">
                    Module</label>
            </span>
            <span class="formValue">
                <select id="ddlModuleSelect" class="sfListmenu">
                </select>
            </span>
        </div>
        <div class="sfFieldset">
            <span class="formKey">
                <label class="sfFormlabel">
                    Culture</label>
            </span>
            <span class="formValue">
                <select id="ddlCulture" class="sfListmenu sfFullwidth">
                </select>
            </span>
        </div>
        <div class="sfFieldset">
            <span class="formKey">
                <label class="sfFormlabel">
                    Type</label>
            </span>
            <span class="formValue">
                <select id="ddlMessageType" class="sfListmenu sfAuto">
                    <option value="0">Info</option>
                    <option value="1">Warning</option>
                </select>
            </span>
        </div>
        <div class="sfFieldset">
            <span class="formKey">
                <label class="sfFormlabel">
                    Display Mode</label>
            </span>
            <span class="formValue">
                <select id="ddlPersist" class="sfListmenu">
                    <option value="0">Persist</option>
                    <option value="1">SlideUp</option>
                    <option value="2">FadeOut</option>
                </select>
            </span>
        </div>
        <div class="sfFieldset">
            <span class="formKey">
                <label class="sfFormlabel">
                    Message Position</label>
            </span>
            <span class="formValue">
                <select id="ddlMessagePosition" class="sfListmenu sf120">
                    <option value="0">Top</option>
                    <option value="1">Bottom</option>
                </select>
            </span>
        </div>
        <div class="sfFieldset">
            <span class="formKey">
                <input type="checkbox" id="chkIsActive" />
                <label for="chkIsActive"  class="sfFormlabel">
                    Active</label>
            </span>
           
        </div>
    </div>
</div>
<div class="sfFieldset">
    <textarea id="txtModuleMessage" style="display:block;visibility:visible" rows="40" cols="50">sdfg</textarea>

</div>

<div class="sfButtonwrapper sftype1">
    <label id="btnSaveMessage" class="icon-save sfBtn smlbtn-succ">
        Save</label>
</div>


