(function ($) {
    $.RoleSingleton = function (p) {
        var Role = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: { data: '' },
                dataType: 'json',
                baseURL: "/Modules/RoleManagement/Services/RoleService.asmx/",
                method: "",
                successMethod: "",
                failureMethod: "",
                ajaxCallMode: 0,
                pageNumber: 0,
                offset: 0,
                postPerPage: 10,
                rowTotal:0,
                authParam: { PortalID: SageFramePortalID, UserModuleID: UserModuleID, UserName: SageFrameUserName, SecureToken: SageFrameSecureToken }
            },
            init: function () {
                Role.onButtonClick();
                Role.getRoleList(0, Role.config.postPerPage, 0);
                Role.onDeleteIconClick();
                Role.onSaveRoleClick();
                Role.onRoleStatusCheckboxChanged();
                Role.onEditIconClick();
            },

            ajaxCall: function (config) {
                $.ajax({
                    type: Role.config.type,
                    contentType: Role.config.contentType,
                    cache: Role.config.cache,
                    url: Role.config.baseURL + Role.config.method,
                    data: Role.config.data,
                    dataType: Role.config.dataType,
                    success: Role.config.successMethod,
                    error: Role.config.failureMethod,
                    async: Role.config.async
                });
            },

            getRoleList: function (offset, limit, current) {
                Role.config.pageNumber = current;
                Role.config.offset = current * limit;
                Role.config.method = "GetPortalRoleList";
                Role.config.data = JSON.stringify({
                    authParam: Role.config.authParam,
                    portalID: SageFramePortalID,
                    PageNumber: Role.config.offset,
                    PageSize: Role.config.postPerPage
                });
                Role.config.successMethod = Role.getRoleListSuccess;
                Role.config.failureMethod = Role.getRoleListFailure;
                Role.ajaxCall(Role.config);
            },

            getRoleListSuccess: function (data) {
                var roleList = data.d;
                var roleCount = roleList.length;
                var defaultRoles = ['69a340a4-5b55-475e-8447-4c552f867f00', '521832a1-52f1-432c-8cf1-0caedefc6ba4', '6259cd4e-9746-4b6f-a347-a1035de7efdd', '120cc46b-294e-4975-832d-088940372ae0', '228f0ad3-76b3-4585-a008-091ae667ad57'];
                if (roleList != null && roleCount > 0) {
                    Role.config.rowTotal = roleList[0].RowsCount;
                    var roleListHtml = "";
                    var status = "";
                    var actionHtml = "";

                    $.each(roleList, function (key, value) {
                        if (defaultRoles.indexOf(value.RoleId) === -1) {
                            status = value.IsActive == true ? "checked" : "";
                            isActiveValue = value.IsActive == true ? false : true;
                            actionHtml = "<div class='grid_status checkslider-btn'>";
                            actionHtml += "<input type='checkbox' id='status" + key + "' name='status' data-id='" + value.RoleId + "' data-name='" + value.RoleName + "' data-status='" + isActiveValue + "' " + status + "/>";
                            actionHtml += "<label for='status" + key + "'>Status</label>";
                            actionHtml += "</div >";
                            actionHtml += "<div class='grid_action'>";
                            actionHtml += "<div id='actions' class='actiononClickShow' style='display: none; '>";
                            actionHtml += "<div class='actiononClickShowInfo'>";
                            actionHtml += "<p>";
                            actionHtml += "<a id='editRole' class='edit' data-id='" + value.RoleId + "' data-name='" + value.RoleName + "'>Edit</a>";
                            actionHtml += "<a id='deleteRole' class='delete' data-id='" + value.RoleId + "' data-index='" + key + "'>Delete</a>";
                            actionHtml += "</p>";
                            actionHtml += "</div>";
                            actionHtml += "</div>";
                            actionHtml += "<p class='actionclass' id='actionLink'>";
                            actionHtml += "<a>";
                            actionHtml += "<i class='fa fa-ellipsis-v'></i>";
                            actionHtml += "</a>";
                            actionHtml += "</p>";
                            actionHtml += "</div>";
                        }
                        roleListHtml += "<div class='grid_listing'>";
                        roleListHtml += "<div class='grid_summary'>";
                        roleListHtml += "<div class='grid_summary_detail'>";
                        roleListHtml += "<div class='grid_detail_title'>";

                        roleListHtml += value.RoleName;
                        roleListHtml += "</div>";
                        roleListHtml += "</div>";
                        roleListHtml += actionHtml;
                        roleListHtml += "</div>";
                        roleListHtml += "</div>";
                    });
                } else if (Role.config.pageNumber > 0) {
                    Role.config.pageNumber = Role.config.pageNumber - 1;
                    Role.config.offset = (Role.config.pageNumber) * Role.config.postPerPage;
                    Role.getRoleList(Role.config.offset, Role.config.postPerPage, Role.config.pageNumber);
                } else {
                    roleListHtml = "<p>Currently there is no role</p>";
                }
                Role.BindPagination(Role.config.rowTotal);
                $("#roleList").html(roleListHtml);
                Role.onActionClick();
            },

            getRoleListFailure: function () {
                SageFrame.messaging.show("Error while loading roles.", "Error");
            },

            onSaveRoleClick: function () {
                $("#btnSave").click(function () {
                    var rolename = $("#roleName").val();
                    var roleId = $("#roleId").val();

                    if (Role.isEmptyOrSpaces(rolename)) {
                        $("#roleNameError").text("* Role name cannot be empty.");
                    } else if (Role.isValid(rolename)) {
                        $("#roleNameError").text("* Role name must be alphanumeric.");
                    } else {
                        Role.addRole(Role.escapeHtml(rolename), roleId);
                    }
                });
            },

            addRole: function (rolename, roleId) {
                var role = { RoleName: rolename, ApplicationName: "", IsActive: 1, AddedOn: new Date(), PortalID: SageFramePortalID, AddedBy: SageFrameUserName }
                Role.config.method = "AddUpdateRole";
                Role.config.data = JSON.stringify({
                    role: role,
                    roleID: roleId,
                    authParam: Role.config.authParam,
                });
                Role.config.successMethod = Role.addRoleSuccess;
                Role.config.failureMethod = Role.addRoleFailure;
                Role.ajaxCall(Role.config);
            },

            addRoleSuccess: function (data) {
                SageFrame.messaging.show(data.d, "Success");
                Role.getRoleList(0, Role.config.postPerPage, 0);
                $("#grid").show();
                $("#btnMain").show();
                $("#addForm").hide();
                $("#rolePagi").show();

                Role.clearData();
            },

            addRoleFailure: function () {
                SageFrame.messaging.show("Duplicate role cannot be added.", "Error");
            },

            updateRole: function (roleId, roleName, isActive) {
                var role = { RoleName: roleName, ApplicationName: "", IsActive: isActive, AddedOn: new Date(), PortalID: SageFramePortalID, AddedBy: SageFrameUserName }
                Role.config.method = "AddUpdateRole";
                Role.config.data = JSON.stringify({
                    role: role,
                    roleID: roleId,
                    authParam: Role.config.authParam,
                });
                Role.config.successMethod = Role.updateRoleSuccess;
                Role.config.failureMethod = Role.updateRoleFailure;
                Role.ajaxCall(Role.config);
            },

            updateRoleSuccess: function (data) {
                SageFrame.messaging.show("Role updated successfully.", "Success");
                Role.getRoleList(Role.config.offset, Role.config.postPerPage, Role.config.pageNumber);
                $("#grid").show();
                $("#btnMain").show();
                $("#addForm").hide();
                $("#rolePagi").show();
                Role.clearData();
            },

            updateRoleFailure: function () {
                SageFrame.messaging.show("Unable to update this role.", "Error");
            },

            onEditIconClick: function () {
                $("#roleList").on("click", "#editRole", function () {
                    var roleId = $(this).data("id");
                    var roleName = $(this).data("name");

                    $("#grid").hide();
                    $("#btnMain").hide();
                    $("#addForm").show();
                    $("#rolePagi").hide();

                    $("#roleId").val(roleId);
                    $("#roleName").val(roleName);
                });
            },

            onDeleteIconClick: function () {
                $("#roleList").on("click", "#deleteRole", function () {
                    Role.config.successMethod = Role.deleteRoleSuccess;
                    var roleId = $(this).data("id");
                    var index = $(this).data("index");

                    jConfirm('Do you want to delete this role?', 'Confirm', function (ans) {
                        if (ans) {
                            Role.deleteRole(roleId);
                        }
                    });
                });
            },

            deleteRole: function (roleId) {
                Role.config.method = "DeleteRole";
                Role.config.data = JSON.stringify({
                    roleId: roleId,
                    authParam: Role.config.authParam
                });
                Role.config.failureMethod = Role.deleteRoleFailure;
                Role.ajaxCall(Role.config);
            },

            deleteRoleSuccess: function (data) {
                Role.getRoleList(Role.config.offset, Role.config.postPerPage, Role.config.pageNumber);
                SageFrame.messaging.show("Role deleted successfully.", "Success");
            },

            deleteRoleFailure: function () {
                SageFrame.messaging.show("Error while deleting this role.", "Error");
            },

            isEmptyOrSpaces: function (str) {
                return str === null || str.match(/^ *$/) !== null;
            },

            onRoleStatusCheckboxChanged: function () {
                $("#roleList").on("change", "input[name='status']", function () {
                    var id = $(this).data("id");
                    var name = $(this).data("name");
                    var status = $(this).data("status");
                    Role.updateRoleStatus(id, status);
                });
            },

            updateRoleStatus: function (roleId, RoleStatus) {
                Role.config.method = "UpdateUserRole";
                Role.config.data = JSON.stringify({
                    roleId: roleId,
                    RoleStatus: RoleStatus,
                    authParam: Role.config.authParam
                });
                Role.config.successMethod = Role.updateRoleStatusSuccess;
                Role.config.failureMethod = Role.updateRoleStatusFailure;
                Role.ajaxCall(Role.config);
            },

            updateRoleStatusSuccess: function () {
                Role.getRoleList(Role.config.offset, Role.config.postPerPage, Role.config.pageNumber);
                SageFrame.messaging.show("Role status updated successfully.", "Success");
            },

            updateRoleStatusFailure: function () {
                SageFrame.messaging.show("Unable to update this role.", "Error");
            },

            escapeHtml: function (string) {
                var entityMap = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': '&quot;',
                    "'": '&#39;',
                    "/": '&#x2F;'
                };
                return String(string).replace(/[&<>"'\/]/g, function (s) {
                    return entityMap[s];
                });
            },

            onActionClick: function () {
                $("#roleList").on("click", ".actionclass", function () {
                    $('.actiononClickShow').hide();
                    $(this).prev('.actiononClickShow').show();
                });

                $("#roleList div").not(".actiononClickShow").on("click", function () {
                    $('.actiononClickShow').hide();
                });
            },

            onButtonClick: function () {
                $("#btnMain").click(function () {
                    $("#grid").hide();
                    $("#btnMain").hide();
                    $("#addForm").show();
                    $("#rolePagi").hide();
                });

                $("#btnCancel").click(function () {
                    $("#grid").show();
                    $("#btnMain").show();
                    $("#addForm").hide();
                    $("#rolePagi").show();
                    Role.clearData();
                });

            },

            BindPagination: function (RowTotal) {
                if (RowTotal > Role.config.postPerPage) {
                    $('#rolePagi').show().pagination(RowTotal, {
                        items_per_page: Role.config.postPerPage,
                        current_page: Role.config.pageNumber,
                        num_edge_entries: 2,
                        callfunction: true,
                        function_name: {
                            name: Role.getRoleList,
                            limit: Role.config.postPerPage,
                        },
                        prev_text: ' ',
                        next_text: ' '
                    });
                } else {
                    $('#rolePagi').hide();
                }
            },

            clearData: function () {
                $("#roleName").val("");
                $("#roleId").val("");
                $("#roleNameError").text("");
            },

            isValid: function (str) {
                return /[~`!#$%\^&*+=\-\[\]\\'.@()_;,/{}|\\":<>\?]/g.test(str);
            }
        };
        Role.init();
    };
    $.fn.CallRoleJs = function (p) {
        $.RoleSingleton(p);
    };
})(jQuery);