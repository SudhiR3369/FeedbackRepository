(function ($) {
    $.Article = function (p) {
        var ArticleConfig = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: { data: '' },
                dataType: 'json',
                baseURL: "/Modules/UserMangement/Services/UserMgmtService.asmx/",
                method: "",
                successMethod: "",
                errorMethod: "",
                ajaxCallMode: 0,
                authParam: { PortalID: SageFramePortalID, UserModuleID: UserModuleID, UserName: SageFrameUserName, SecureToken: SageFrameSecureToken },
                offset: 0,
                currentPageNo: 0,
                noOfItemOnPagination: 10,
                selectedRoles: [],
                unselectedValue: [],
                selectedValue: [],
            },
            FilterInfo: {
                UserName: '',
                RoleID: 'AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA',
                DateFrom: '',
                DateTo: ''
            },
            init: function () {
                $('#filterDiv').createSideBarForm({
                    title: 'Filter',
                    openButton: $('#btnOpenFilter'),
                    //closeButton: $('.btncancelTemplateWeb'),
                });
                $(".sfError, #passwordErrors, #reTypePasswordErrors").hide();
                $("#ddlRoles").prop('selectedIndex', 0);
                ArticleConfig.loadUsersToEdit(0, ArticleConfig.config.noOfItemOnPagination, 0);
                ArticleConfig.addClick();
                ArticleConfig.cancelClick();
                ArticleConfig.saveClick();
                ArticleConfig.editClick();
                ArticleConfig.deleteClick();
                ArticleConfig.resetValidation();
                ArticleConfig.selectAllClick();
                ArticleConfig.deleteAllClick();
                ArticleConfig.onUserStatusCheckboxChanged();
                ArticleConfig.rolesFunctions();
                ArticleConfig.filterSlider();
                ArticleConfig.getUserSearchInput();
                ArticleConfig.passResetFunctions();
            },
            ajaxCall: function (config) {
                $.ajax({
                    type: ArticleConfig.config.type,
                    contentType: ArticleConfig.config.contentType,
                    cache: ArticleConfig.config.cache,
                    url: ArticleConfig.config.baseURL + ArticleConfig.config.method,
                    data: ArticleConfig.config.data,
                    dataType: ArticleConfig.config.dataType,
                    success: ArticleConfig.config.successMethod,
                    error: ArticleConfig.ajaxFailure,
                    async: ArticleConfig.config.async
                });
            },
            ajaxFailure: function () {
                SageFrame.messaging.show("Oops!! Something Went Wrong", "Error");
            },
            BindPagination: function (RowTotal) {
                if (RowTotal > ArticleConfig.config.noOfItemOnPagination) {
                    $('#userPagi').show().pagination(RowTotal, {
                        items_per_page: ArticleConfig.config.noOfItemOnPagination,
                        current_page: ArticleConfig.config.currentPageNo,
                        num_edge_entries: 2,
                        callfunction: true,
                        function_name: {
                            name: ArticleConfig.loadUsersToEdit,
                            limit: ArticleConfig.config.noOfItemOnPagination,
                        },
                        prev_text: ' ',
                        next_text: ' '
                    });
                } else {
                    $('#userPagi').hide();
                }
            },
            loadUsersToEdit: function (offset, limit, current) {
                ArticleConfig.config.currentPageNo = current;
                ArticleConfig.config.offset = current * limit;
                ArticleConfig.config.method = "GetDataByDateRange";
                ArticleConfig.config.data = JSON.stringify({
                    userObj: ArticleConfig.FilterInfo,
                    PageNumber: ArticleConfig.config.offset,
                    PageSize: ArticleConfig.config.noOfItemOnPagination,
                    commonAuth: ArticleConfig.config.authParam
                });
                ArticleConfig.config.successMethod = ArticleConfig.loadUsersToEditSuccess;
                ArticleConfig.ajaxCall(ArticleConfig.config);
            },
            loadUsersToEditSuccess: function (data) {
                var userList = data.d;
                var nonEditUser = "76f4944e-8928-4056-8e89-09eb994ddcec";
                var userHtml = "";
                var status = "";
                var totalRow = 0;
                if (userList.length > 0) {
                    totalRow = userList[0].RowsCount;
                    $.each(userList, function (index, item) {
                        if (nonEditUser.indexOf(item.UserID) === -1) {
                            userHtml += "<div class='grid_listing clearfix'><div class='grid_summary'><div class='grid_selectors'><input value='" + item.UserID + "' type='checkbox' name='cBox'><label></label></div>";
                            userHtml += "<div class='grid_summary_detail'><div class='grid_detail_title grid_detail_title--large' >";
                            userHtml += item.UserName;
                            userHtml += "</div >";
                            userHtml += "<div class='grid_detail_newsfeature'>";
                            userHtml += "<small class='grid_detail_newsfeature_attribute'><strong>First Name: </strong>";
                            userHtml += item.FirstName;
                            userHtml += "</small><small class='grid_detail_newsfeature_attribute'><strong>Last Name: </strong>";
                            userHtml += item.LastName;
                            userHtml += "</small></div>";
                            userHtml += "<div class='grid_detail_newsproperties'><small class='grid_detail_newsproperties_attribute'><i class='fa fa-envelope'></i>";
                            userHtml += item.Email;
                            userHtml += "</small></div></div>";
                            status = item.IsActive == true ? "checked" : "";
                            isActiveValue = item.IsActive == true ? 0 : 1;
                            userHtml += "<div class='grid_status checkslider-btn'>";
                            if (item.RoleActive)
                                userHtml += "<input type= 'checkbox' id= 'status" + index + "' name= 'status' data-id='" + item.UserID + "' data-name='" + item.UserName + "' data-status='" + isActiveValue + "' " + status + "/><label for='status" + index + "'>Status</label>";
                            userHtml += "</div> ";
                            userHtml += "<div class='grid_action'><div id='actions' class='actiononClickShow' style='display: none; '><div class='actiononClickShowInfo'>";
                            userHtml += "<p><a id='btnEditUser' href='javascript:void(0)' class='edit' data-userid='" + item.UserID + "' >Edit</a><a id='btnDeleteUser' href='javascript:void(0)' class='delete' data-userid='" + item.UserID + "' data-username='" + item.UserName + "'>Delete</a></p></div></div>";
                            userHtml += "<p class='actionclass' id='actionlink'><a href='javascript:void(0)'><i class='fa fa-ellipsis-v'></i></a></p></div></div></div></div>";
                        }

                    });
                    $("#userList").html(userHtml);                    
                } else if (ArticleConfig.config.currentPageNo > 0) {
                    ArticleConfig.config.currentPageNo = ArticleConfig.config.currentPageNo - 1;
                    ArticleConfig.config.offset = (ArticleConfig.config.currentPageNo) * ArticleConfig.config.noOfItemOnPagination;
                    ArticleConfig.loadUsersToEdit(ArticleConfig.config.offset, ArticleConfig.config.noOfItemOnPagination, ArticleConfig.config.currentPageNo);
                } else {
                    userHtml = "<h3>..............  No data to display ...............</h3>";
                    $("#userList").html(userHtml);
                }
                ArticleConfig.BindPagination(totalRow);
                ArticleConfig.onActionClick();
            },
            onUserStatusCheckboxChanged: function () {
                $("#userList").on("change", "input[name='status']", function () {
                    var statusVar;
                    var id = $(this).data("id");
                    var name = $(this).data("name");
                    var status = $(this).data("status");
                    if (status === 1) {
                        statusVar = true;
                    } else {
                        statusVar = false;
                    }
                    ArticleConfig.updateUser(id, name, statusVar);
                });
            },
            updateUser: function (userId, userName, isActive) {
                ArticleConfig.config.method = "UpdateUserStatus";
                ArticleConfig.config.data = JSON.stringify({
                    user: { UserID: userId, UserName: userName, IsActive: isActive },
                    commonAuth: ArticleConfig.config.authParam
                });
                ArticleConfig.config.successMethod = ArticleConfig.updateUserSuccess;
                ArticleConfig.config.failureMethod = ArticleConfig.updateUserFailure;
                ArticleConfig.ajaxCall(ArticleConfig.config);
            },
            updateUserSuccess: function (data) {
                SageFrame.messaging.show("User updated successfully.", "Success");
                ArticleConfig.loadUsersToEdit(ArticleConfig.config.offset, ArticleConfig.config.noOfItemOnPagination, ArticleConfig.config.currentPageNo);
                $(".sfPagination").show();
            },
            updateUserFailure: function () {
                SageFrame.messaging.show("Unable to update this user.", "Error");
            },
            getUserSearchInput: function () {
                $("#filterDiv").on("click", "#btnDateSearch", function () {
                    ArticleConfig.FilterInfo.UserName = $("#txtSearchUser").val();
                    ArticleConfig.FilterInfo.RoleID = $("#cmbType").val();
                    if (ArticleConfig.FilterInfo.RoleID === '0') {
                        ArticleConfig.FilterInfo.RoleID = 'AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA';
                    }
                    ArticleConfig.FilterInfo.DateFrom = $("#txtDateFrom").val();
                    ArticleConfig.FilterInfo.DateTo = $("#txtDateTo").val();
                    ArticleConfig.loadUsersToEdit(0, ArticleConfig.config.noOfItemOnPagination, 0);
                });
                $("#filterDiv").on("click", "#btnReset", function () {
                    ArticleConfig.resetFilterInfo();
                    $("#txtSearchUser").val("");
                    $("#cmbType").val(0);
                    $("#txtDateFrom").val("");
                    $("#txtDateTo").val("");
                    $("#dateFromError").val("");
                    $("#dateToError").val("");
                    $(".sfPagination").show();
                    ArticleConfig.loadUsersToEdit(0, ArticleConfig.config.noOfItemOnPagination, 0);
                });
            },
            resetFilterInfo: function () {
                ArticleConfig.FilterInfo.UserName = '';
                ArticleConfig.FilterInfo.RoleID = 'AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA';
                ArticleConfig.FilterInfo.DateFrom = '';
                ArticleConfig.FilterInfo.DateTo = '';
            },
            encryptPassword: function () {
                var key = CryptoJS.enc.Utf8.parse('8080808080808080');
                var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                var Password = $('#txtPassword').val();
                var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(Password), key,
                    {
                        keySize: 128 / 8,
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Pkcs7
                    });
                $('#hdnPassword').val(encryptedpassword);
            },
            encryptPasswordChg: function () {
                var key = CryptoJS.enc.Utf8.parse('8080808080808080');
                var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                var Password = $('#txtNewPassword').val();
                var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(Password), key,
                    {
                        keySize: 128 / 8,
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Pkcs7
                    });
                $('#hdnNewPassword').val(encryptedpassword);
            },
            getdataByUserIdEdit: function (userID) {
                ArticleConfig.config.method = "GetDataByUserId";
                ArticleConfig.config.data = JSON.stringify({
                    userID: userID,
                    commonAuth: ArticleConfig.config.authParam
                });
                ArticleConfig.config.successMethod = ArticleConfig.getdataByUserIdEditSuccess;
                ArticleConfig.ajaxCall(ArticleConfig.config);
            },
            getdataByUserIdEditSuccess: function (data) {
                var userDetails = data.d;
                $("#txtUserName").attr('readonly', true);
                $("#lblPassword").hide();
                $("#lblRetypePassword").hide();
                $("#passwordError").hide();
                $("#reTypePasswordError").hide();
                $("#txtPassword").hide();
                $("#txtRetypePassword").hide();
                $("#userGrid").fadeOut();
                $("#userAdd").fadeIn();
                $("#arrowsIcon").fadeIn();
                $("#selectedRoles").fadeIn();
                $("#txtUserID").val(userDetails[0].UserID);
                $("#txtUserName").val(userDetails[0].UserName);
                $("#txtEmail").val(userDetails[0].Email);
                $("#txtFirstName").val(userDetails[0].FirstName);
                $("#txtLastName").val(userDetails[0].LastName);
                $("#unselectedRoles").text("Unselected Roles");
                $("#ddlRolesSelected").empty();
                for (var i = 0; i < userDetails.length; i++) {
                    $("#ddlRoles option[value = '" + userDetails[i].RoleId + "']").remove();
                    $("#ddlRolesSelected").append($("<option></option>").val
                        (userDetails[i].RoleId).html(userDetails[i].RoleNames));
                }
            },
            loadAllRoles: function () {
                ArticleConfig.config.method = "LoadAllRolesForUser";
                ArticleConfig.config.data = JSON.stringify({
                    commonAuth: ArticleConfig.config.authParam
                });
                ArticleConfig.config.successMethod = ArticleConfig.loadAllRolesSuccess;
                ArticleConfig.ajaxCall(ArticleConfig.config);
            },
            loadAllRolesSuccess: function (data) {
                var rolesList = data.d;
                if (rolesList != null) {
                    $.each(rolesList, function (key, value) {
                        $("#ddlRoles").append($("<option></option>").val
                            (value.RoleID).html(value.RoleName));
                    });
                    $.each(rolesList, function (key, value) {
                        $("#cmbType").append($("<option></option>").val
                            (value.RoleID).html(value.RoleName));
                    });
                }
            },
            addClick: function () {
                $("#btnAdd").on('click', function () {
                    $("#unselectedRoles").text("Select Roles");
                    $("#arrowsIcon").fadeOut();
                    $("#selectedRoles").fadeOut();
                    $("#ddlRolesSelected").fadeOut();
                    $("#userGrid").fadeOut();
                    $("#txtUserName").attr('readonly', false);
                    $("#userAdd").fadeIn();
                    $("#lblPassword").show();
                    $("#lblRetypePassword").show();
                    $("#passwordError").show();
                    $("#reTypePasswordError").show();
                    $("#txtPassword").show();
                    $("#txtRetypePassword").show();
                    $("#ddlRoles").empty();
                    $("#cmbType").empty();
                    ArticleConfig.loadAllRoles();
                    $('.sfPwdstrength').remove();
                    $('.pstrength-info').remove();
                    $('.pstrength-minchar').remove();
                    $('#txtPassword').pstrength({ minchar: 4 });
                });
            },
            cancelClick: function () {
                $("#btnUserCancel").on('click', function () {
                    $("#txtUserID").val("");
                    $("#userGrid").fadeIn();
                    $("#userAdd").fadeOut();
                    $('label[class="sfError"]').text("");
                    $("input[class='sfInputbox']").val("");
                    $("input[class='sfInputbox password']").val("");
                    $("#divChooseTab").hide();
                    $("#passwordChange").hide();
                });
            },
            saveClick: function () {
                $("#btnUserSave").on('click', function () {
                    var selectedRoles, unselectedRoles;
                    var userID = $("#txtUserID").val();
                    //var userName = ArticleConfig.escapeHtml($("#txtUserName").val());
                    var userName = $("#txtUserName").val();
                    var email = ArticleConfig.escapeHtml($("#txtEmail").val());
                    var firstName = ArticleConfig.escapeHtml($("#txtFirstName").val());
                    var lastName = ArticleConfig.escapeHtml($("#txtLastName").val());
                    var password = ArticleConfig.escapeHtml($("#txtPassword").val());
                    var rePassword = ArticleConfig.escapeHtml($("#txtRetypePassword").val());
                    var roleID = ArticleConfig.escapeHtml($("#ddlRoles").val());
                    if (userID == "") {
                        if (ArticleConfig.validateUser(userName, email, firstName, lastName, password, rePassword)) {
                            if (ArticleConfig.compareEmail($("#txtPassword").val(), $("#txtRetypePassword").val())) {
                                 ArticleConfig.encryptPassword();
                                if (ArticleConfig.emailValidation(email)) {
                                    ArticleConfig.getSelectedRoles();
                                    var roleName = ArticleConfig.config.selectedRoles.join();
                                    ArticleConfig.createUsers(ApplicationName, userName, firstName, lastName, $('#hdnPassword').val(), "", email, "", "", true, CurrentTimeUtc, CreatedDate, 0, PasswordFormat, PortalID, AddedOn, ArticleConfig.config.authParam.UserName, roleName, StoreID, UserID, CustomerID);
                                } else {
                                    $("#emailError").text("Invalid Email Format.");
                                }
                            } else {
                                $("#reTypePasswordErrors").show();
                                $("#reTypePasswordErrors").text("Passwords and Confirm Passwords Do Not Match.");
                            }
                        }
                    } else {
                        if (ArticleConfig.validateUserUpdate(userName, email, firstName, lastName)) {
                            if (ArticleConfig.emailValidation(email)) {
                                ArticleConfig.getAllSelectedRoles();
                                ArticleConfig.getAllUnSelectedRoles();
                                if (ArticleConfig.config.unselectedValue != "") {
                                    unselectedRoles = ArticleConfig.config.unselectedValue.join();
                                } else {
                                    unselectedRoles = "SiteAdmin";
                                }
                                if (ArticleConfig.config.selectedValue != "") {
                                    selectedRoles = ArticleConfig.config.selectedValue.join();
                                    ArticleConfig.updateUsers(ApplicationName, userName, userID, firstName, lastName, email, PortalID, true, ArticleConfig.config.authParam.UserName, StoreID);
                                    ArticleConfig.updateRoles(ApplicationName, userID, unselectedRoles, selectedRoles);
                                } else {
                                    SageFrame.messaging.show("Roles Cannot Be Empty", "Error");
                                }
                            } else {
                                SageFrame.messaging.show("Invalid Email Format", "Error");
                            }
                        }
                    }
                });
            },
            editClick: function () {
                $("#userList").on('click', "#btnEditUser", function () {
                    $("#ddlRolesSelected").fadeIn();
                    var userID = $(this).data("userid");
                    $("#ddlRoles").empty();
                    $("#cmbType").empty();
                    ArticleConfig.loadAllRoles();
                    ArticleConfig.getdataByUserIdEdit(userID);
                    $("#divChooseTab").show();
                    $('.sfPwdstrength').remove();
                    $('.pstrength-info').remove();
                    $('.pstrength-minchar').remove();
                    $('#txtNewPassword').pstrength({ minchar: 4 });
                    if ($("#divChooseTab #userTab").hasClass("sfDefault")) {
                        $('#userAdd').show();
                        $('#passwordChange').hide();
                    } else {
                        $('#userAdd').hide();
                        $('#passwordChange').show();
                    }
                });
            },
            deleteClick: function () {
                $("#userList").on('click', '#btnDeleteUser', function () {
                    var userID = $(this).data("userid");
                    var userName = $(this).data("username");
                    jConfirm('Do you want to delete selected users?', 'Confirm', function (r) {
                        if (r) {
                            ArticleConfig.deleteUsers(ApplicationName, userID, PortalID, StoreID, ArticleConfig.config.authParam.UserName);
                            ArticleConfig.loadUsersToEdit(ArticleConfig.config.offset, ArticleConfig.config.noOfItemOnPagination, ArticleConfig.config.currentPageNo);
                        }
                    });
                });
            },
            createUsers: function (applicationName, userName, firstName, lastName, password, passwordSalt, email, securityQuestion, securityAnswer, isApproved, currentTime, createdDate, uniqueEmail, passwordFormat, portalID, addedOn, addedBy, roleNames, storeId, userId, customerId) {
                ArticleConfig.config.method = "CreatePortalUser";
                ArticleConfig.config.data = JSON.stringify({
                    userObj: { ApplicationName: applicationName, UserName: userName, FirstName: firstName, LastName: lastName, Password: password, PasswordSalt: passwordSalt, Email: email, SecurityQuestion: securityQuestion, SecurityAnswer: securityAnswer, IsApproved: isApproved, CurrentTimeUtc: currentTime, CreatedDate: createdDate, UniqueEmail: uniqueEmail, PasswordFormat: passwordFormat, PortalID: portalID, AddedOn: addedOn, AddedBy: addedBy, RoleNames: roleNames, StoreID: storeId, UserID: userId, CustomerID: customerId },
                    commonAuth: ArticleConfig.config.authParam
                });
                ArticleConfig.config.successMethod = ArticleConfig.createUsersSuccess;
                ArticleConfig.ajaxCall(ArticleConfig.config);
            },
            createUsersSuccess: function (data) {
                var storeVar = data.d;
                if (storeVar === 'EmailAddressAlreadyIsInUse') {
                    SageFrame.messaging.show("Email Address Already Exists", "Error");
                    $("#txtEmail").focus();
                } else if (storeVar === 'NameAlreadyExists') {
                    SageFrame.messaging.show("Username Already Exists", "Error");
                    $("#txtUserName").focus();
                }
                else {
                    $("#ddlRoles").empty();
                    ArticleConfig.config.selectedRoles = [];
                    ArticleConfig.loadUsersToEdit(0, ArticleConfig.config.noOfItemOnPagination, 0);
                    $("#userGrid").fadeIn();
                    $("#userAdd").fadeOut();
                    $("label[class=sfError]").val("");
                    $("input[class='sfInputbox']").val("");
                    $("input[class='sfInputbox password']").val("");
                    //SageFrame.messaging.show("User Created Successfully", "Success");
                    location.reload();
                }
            },
            updateUsers: function (applicationName, userName, userId, firstName, lastName, email, portalID, isApproved, updatedBy, storeId) {
                ArticleConfig.config.method = "UpdateUser";
                ArticleConfig.config.data = JSON.stringify({
                    obj: { ApplicationName: applicationName, UserName: userName, UserID: userId, FirstName: firstName, LastName: lastName, Email: email, PortalID: portalID, IsApproved: isApproved, UpdatedBy: updatedBy, StoreID: storeId },
                    commonAuth: ArticleConfig.config.authParam
                });
                ArticleConfig.config.successMethod = ArticleConfig.updateUsersSuccess;
                ArticleConfig.ajaxCall(ArticleConfig.config);
            },
            updateUsersSuccess: function (data) {
                var storeVar = data.d;
                if (storeVar === true) {
                    SageFrame.messaging.show("Email Address Already Exists", "Error");
                    $("#txtEmail").focus();
                } else {
                    ArticleConfig.loadUsersToEdit(ArticleConfig.config.offset, ArticleConfig.config.noOfItemOnPagination, ArticleConfig.config.currentPageNo);
                    $("#userGrid").fadeIn();
                    $("#userAdd").fadeOut();
                    $("label[class=sfError]").val("");
                    $("input[class='sfInputbox']").val("");
                    $("#txtUserID").val("");
                    $("input[class='sfInputbox password']").val("");
                    SageFrame.messaging.show("User Updated Successfully", "Success");
                    $("#divChooseTab").hide();
                }
            },
            updateRoles: function (applicationName, userId, unSelectedRoles, selectedRoles) {
                ArticleConfig.config.method = "UpdateRoles";
                ArticleConfig.config.data = JSON.stringify({
                    ApplicationName: applicationName,
                    UserID: userId,
                    UnSelectedRoles: unSelectedRoles,
                    SelectedRoles: selectedRoles,
                    commonAuth: ArticleConfig.config.authParam
                });
                ArticleConfig.config.successMethod = ArticleConfig.updateRolesSuccess;
                ArticleConfig.ajaxCall(ArticleConfig.config);
            },
            updateRolesSuccess: function () {
                ArticleConfig.config.selectedRoles = [];
                ArticleConfig.config.selectedValue = [];
                ArticleConfig.config.unselectedValue = [];
            },
            deleteUsers: function (applicationName, userId, portalID, storeId, deletedBy) {
                ArticleConfig.config.method = "DeleteUser";
                ArticleConfig.config.data = JSON.stringify({
                    user: { ApplicationName: applicationName, UserID: userId, PortalID: portalID, StoreID: storeId, AddedBy: deletedBy },
                    commonAuth: ArticleConfig.config.authParam
                });
                ArticleConfig.config.successMethod = ArticleConfig.deleteUsersSuccess;
                ArticleConfig.ajaxCall(ArticleConfig.config);
            },
            deleteUsersSuccess: function () {
                SageFrame.messaging.show("User Deleted Successfully", "Success");
                ArticleConfig.loadUsersToEdit(ArticleConfig.config.offset, ArticleConfig.config.noOfItemOnPagination, ArticleConfig.config.currentPageNo);
            },
            validateUser: function (userName, email, firstName, lastName, password, reTypePassword) {
                $(".sfError, #passwordErrors, #reTypePasswordErrors").show();
                if (ArticleConfig.checkEmptyOrSpaces(userName)) {
                    $("#userNameError").text("Username is required.");
                }
                if (ArticleConfig.isValid(userName)) {
                    $("#userNameError").text("Must contain only letters, numbers, or underscore..");
                }
                if (ArticleConfig.checkEmptyOrSpaces(email)) {
                    $("#emailError").text("Email is required.");
                }
                if (ArticleConfig.checkEmptyOrSpaces(firstName)) {
                    $("#firstNameError").text("First name is required.");
                }
                if (ArticleConfig.isValid(firstName)) {
                    $("#firstNameError").text("Must contain only letters, numbers, or underscore..");
                }
                if (ArticleConfig.checkEmptyOrSpaces(lastName)) {
                    $("#lastNameError").text("Last name is required.");
                }
                if (ArticleConfig.isValid(lastName)) {
                    $("#lastNameError").text("Must contain only letters, numbers, or underscore..");
                }
                if (ArticleConfig.checkEmptyOrSpaces(password)) {
                    $("#passwordErrors").text("Password is required.");
                }
                if (ArticleConfig.checkEmptyOrSpaces(reTypePassword)) {
                    $("#reTypePasswordErrors").text("Retype Password is required.");
                }
                if ($("#ddlRoles").val() == null) {
                    $("#rolesError").text("Select at least one role.");
                }
                if (ArticleConfig.checkEmptyOrSpaces(userName) || ArticleConfig.isValid(userName) || ArticleConfig.checkEmptyOrSpaces(email) || ArticleConfig.checkEmptyOrSpaces(firstName) || ArticleConfig.isValid(firstName) || ArticleConfig.checkEmptyOrSpaces(lastName) || ArticleConfig.isValid(lastName) || ArticleConfig.checkEmptyOrSpaces(password) || ArticleConfig.checkEmptyOrSpaces(reTypePassword) || $("#ddlRoles").val() == null) {
                    return false;
                } else {
                    return true;
                }
            },
            validateUserUpdate: function (userName, email, firstName, lastName) {
                $(".sfError").show();
                $("#passwordErrors, #reTypePasswordErrors").hide();
                if (ArticleConfig.checkEmptyOrSpaces(userName)) {
                    $("#userNameError").text("Username is required.");
                }
                if (ArticleConfig.checkEmptyOrSpaces(email)) {
                    $("#emailError").text("Email is required.");
                }
                if (ArticleConfig.checkEmptyOrSpaces(firstName)) {
                    $("#firstNameError").text("First name is required.");
                }
                if (ArticleConfig.checkEmptyOrSpaces(lastName)) {
                    $("#lastNameError").text("Last name is required.");
                }
                if ($("#ddlRoles option:selected").text() == "Select Role") {
                    $("#rolesError").text("Select at least one role.");
                }
                if (ArticleConfig.checkEmptyOrSpaces(userName) || ArticleConfig.checkEmptyOrSpaces(email) || ArticleConfig.checkEmptyOrSpaces(firstName) || ArticleConfig.checkEmptyOrSpaces(lastName) || $("#ddlRoles option:selected").text() == "Select Role") {
                    return false;
                } else {
                    return true;
                }
            },
            checkEmptyOrSpaces: function (str) {
                return str === null || str.match(/^ *$/) !== null;
            },
            emailValidation: function (email) {
                var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
                if (pattern.test(email)) {
                    return true;
                } else {
                    return false;
                }
            },
            compareEmail: function (email, retypeEmail) {
                if (email === retypeEmail) {
                    return true;
                } else {
                    return false;
                }
            },
            resetValidation: function () {
                $('#txtPassword').pstrength({ minchar: 4 });
                $("#txtUserName").on('input', function () {
                    if (ArticleConfig.isValid($("#txtUserName").val())) {
                        $("#userNameError").text("Must contain only letters, numbers, or underscore..");
                    } else {
                        $("#userNameError").text("");
                    }
                });
                $("#txtEmail").on('input', function () {
                    if (ArticleConfig.emailValidation($("#txtEmail").val())) {
                        $("#emailError").text("");
                    } else {
                        $(".sfError").show();
                        $("#emailError").text("Invalid Email Format.");
                    }
                });
                $("#txtFirstName").on('input', function () {
                    if (ArticleConfig.isValid($("#txtFirstName").val())) {
                        $("#firstNameError").text("Must contain only letters, numbers, or underscore..");
                    } else {
                        $("#firstNameError").text("");
                    }
                });
                $("#txtLastName").on('input', function () {
                    if (ArticleConfig.isValid($("#txtLastName").val())) {
                        $("#lastNameError").text("Must contain only letters, numbers, or underscore..");
                    } else {
                        $("#lastNameError").text("");
                    }
                });
                $("#txtPassword").on('input', function () {
                    $("#passwordErrors").text("");
                    if (ArticleConfig.compareEmail($("#txtPassword").val(), $("#txtRetypePassword").val())) {
                        $("#reTypePasswordErrors").text("");
                    } else {
                        $("#reTypePasswordErrors").show();
                        $("#reTypePasswordErrors").text("Passwords and Confirm Passwords Do Not Match.");
                    }
                });
                $("#txtRetypePassword").on('input', function () {
                    if (ArticleConfig.compareEmail($("#txtPassword").val(), $("#txtRetypePassword").val())) {
                        $("#passwordErrors").text("");
                        $("#reTypePasswordErrors").text("");
                    } else {
                        $("#reTypePasswordErrors").text("Passwords and Confirm Passwords Do Not Match.");
                    }
                });
                $("#ddlRoles").on('change', function () {
                    if ($("#ddlRoles option:selected").text() == "Select Role") {
                        $("#rolesError").text("Select at least one role.");
                    }
                    else {
                        $("#rolesError").text("");
                    }
                });
                $('#txtNewPassword').on("input", function () {
                    $("#newPasswordErrors").text("");
                    if (ArticleConfig.compareEmail($("#txtNewPassword").val(), $("#txtRetypeNewPassword").val())) {
                        $("#reTypeNewPasswordErrors").text("");
                    } else {
                        $("#reTypeNewPasswordErrors").show();
                        $("#reTypeNewPasswordErrors").text("Passwords and Confirm Passwords Do Not Match.");
                    }
                });
                $('#txtRetypeNewPassword').on("input", function () {
                    if (ArticleConfig.compareEmail($("#txtNewPassword").val(), $("#txtRetypeNewPassword").val())) {
                        $("#newPasswordErrors").text("");
                        $("#reTypeNewPasswordErrors").text("");
                    } else {
                        $("#reTypeNewPasswordErrors").text("Passwords and Confirm Passwords Do Not Match.");
                    }
                });
            },
            escapeHtml: function (string) {
                var entityMap = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;',
                    '/': '&#x2F;',
                    '`': '&#x60;',
                    '=': '&#x3D;'
                };
                return String(string).replace(/[&<>"'`=\/]/g, function (s) {
                    return entityMap[s];
                });
            },
            replaceWhiteSpace: function (value) {
                value = value.replace(/^\s+|\s+$/g, "");
                return value;
            },
            isValid: function (str) {
                return /[~`!#$%\^&*+=\-\[\]\\'.@()_;,/{}|\\":<>\?]/g.test(str);
            },
            onActionClick: function () {
                $("#userList").on("click", ".actionclass", function () {
                    $('.actiononClickShow').hide();
                    $(this).prev('.actiononClickShow').show();
                });
                $("#userList div").not(".actionclass").on("click", function () {
                    $('.actiononClickShow').hide();
                });
            },
            getSelectedRoles: function () {
                $("#ddlRoles option:selected").each(function () {
                    var $this = $(this);
                    if ($this.length) {
                        var selText = $this.text();
                        if (selText != 'Select Role') {
                            ArticleConfig.config.selectedRoles.push(selText);
                        }
                    }
                });
                $("#ddlRolesSelected option:selected").each(function () {
                    var $this = $(this);
                    if ($this.length) {
                        var selText = $this.text();
                        if (selText != 'Select Role') {
                            ArticleConfig.config.selectedRoles.push(selText);
                        }
                    }
                });
            },
            selectAllClick: function () {
                $("#selectAll").on('click', function () {
                    var checkData = $(this).data();
                    var checkBoxesValue = $("input[name='cBox']");
                    checkBoxesValue.prop("checked", !checkData.checked);
                    checkData.checked = !checkData.checked;
                });
            },
            deleteAllClick: function () {
                $("#selectedDelete").on('click', function () {
                    // Role.config.successMethod = Role.onDeleteAllClickSuccess;
                    var checkedData = $("input[name='cBox']:checked").map(function () {
                        return this.value;
                    }).get();
                    if (checkedData.length > 0) {
                        jConfirm('Do you want to delete selected users?', 'Confirm', function (r) {
                            if (r) {
                                while (checkedData.length > 0) {
                                    ArticleConfig.deleteUsers(ApplicationName, checkedData[checkedData.length - 1], PortalID, StoreID, ArticleConfig.config.authParam.UserName);
                                    checkedData.length--;
                                }
                                ArticleConfig.loadUsersToEdit(ArticleConfig.config.offset, ArticleConfig.config.noOfItemOnPagination, ArticleConfig.config.currentPageNo);
                            }
                        });
                    } else {
                        SageFrame.messaging.show("Select users to delete.", "Error");
                    }
                });
            },
            rolesFunctions: function () {
                $("#lblAddAllRole").on('click', function () {
                    $("#ddlRoles option").each(function () {
                        var ddlText = this.text;
                        var ddlValue = this.value;
                        $("#ddlRoles option[value = '" + ddlValue + "']").remove();
                        $("#ddlRolesSelected").append($("<option></option>").val
                            (ddlValue).html(ddlText));
                    });
                });
                $("#lblAddRole").on('click', function () {
                    ArticleConfig.getSelectedRoles();
                    var ddlValue = $("#ddlRoles").val();
                    var ddlText = ArticleConfig.config.selectedRoles;
                    if (ddlValue != null) {
                        for (var i = 0; i < ddlValue.length; i++) {
                            $("#ddlRoles option[value = '" + ddlValue[i] + "']").remove();
                            $("#ddlRolesSelected").append($("<option></option>").val
                                (ddlValue[i]).html(ddlText[i]));
                        }
                    } else {
                        SageFrame.messaging.show("Select Role To Move", "Error");
                    }

                    ArticleConfig.config.selectedRoles = [];
                });
                $("#lblRemoveRole").on('click', function () {
                    ArticleConfig.getSelectedRoles();
                    var ddlValue = $("#ddlRolesSelected").val();
                    var ddlText = ArticleConfig.config.selectedRoles;
                    if (ddlValue != null) {
                        for (var i = 0; i < ddlValue.length; i++) {
                            $("#ddlRolesSelected option[value = '" + ddlValue[i] + "']").remove();
                            $("#ddlRoles").append($("<option></option>").val
                                (ddlValue[i]).html(ddlText[i]));
                        }
                    } else {
                        SageFrame.messaging.show("Select Role To Move", "Error");
                    }
                    ArticleConfig.config.unselectedValue = ddlText;
                    ArticleConfig.config.selectedRoles = [];
                });
                $("#lblRemoveAllRole").on('click', function () {
                    $("#ddlRolesSelected option").each(function () {
                        var ddlText = this.text;
                        var ddlValue = this.value;
                        $("#ddlRolesSelected option[value = '" + ddlValue + "']").remove();
                        $("#ddlRoles").append($("<option></option>").val
                            (ddlValue).html(ddlText));
                    });
                });
            },
            getAllSelectedRoles: function () {
                $("#ddlRolesSelected option").each(function () {
                    var ddlText = this.text;
                    var ddlValue = this.value;
                    ArticleConfig.config.selectedValue.push(ddlText);
                });
            },
            getAllUnSelectedRoles: function () {
                $("#ddlRoles option").each(function () {
                    var ddlText = this.text;
                    var ddlValue = this.value;
                    ArticleConfig.config.unselectedValue.push(ddlText);
                });
            },
            filterSlider: function () {
                $("#txtDateFrom").datepicker({
                    dateFormat: 'yy MM dd',
                    altField: '#dateFormat',
                    //altFormat: 'yyyy-MM-dd',                           
                });
                $("#txtDateTo").datepicker({
                    dateFormat: 'yy MM dd',
                    altField: '#dateFormat',
                    //altFormat: 'yyyy-MM-dd',                           
                });                
                $("#cmbType").empty();
                ArticleConfig.loadAllRoles();
                $("#cmbType").append($("<option></option>").val
                    (0).html("Select Roles"));
                $("#cmbType").val(0);
            },
            passResetFunctions: function () {
                $('#txtNewPassword').pstrength({ minchar: 4 });
                $("#btnPassUpdate").on("click", function () {                    
                    var userID = $("#txtUserID").val();
                    var newPass = $("#txtNewPassword").val();
                    var reNewPass = $("#txtRetypeNewPassword").val();
                    if (ArticleConfig.validateResetPass(newPass, reNewPass)) {
                        if (ArticleConfig.compareEmail($("#txtNewPassword").val(), $("#txtRetypeNewPassword").val())) {
                            ArticleConfig.encryptPasswordChg();
                            ArticleConfig.changePassword(userID, $("#hdnNewPassword").val());
                        } else {
                            $("#reTypeNewPasswordErrors").text("Passwords and Confirm Passwords Do Not Match.");
                        }
                    }
                });
                $("#btnResetPass").on("click", function () {
                    $('#txtNewPassword').val('');
                    $('#txtRetypeNewPassword').val('');
                    $('#reTypeNewPasswordErrors').text('');
                    $('#newPasswordErrors').text('');
                    $('.sfPwdstrength').remove();
                    $('.pstrength-info').remove();
                    $('.pstrength-minchar').remove();
                    $('#txtNewPassword').pstrength({ minchar: 4 });
                });
                $("#btnPassCancel").on("click", function () {
                    $("#userGrid").fadeIn();
                    $("#userAdd").fadeOut();
                    $('label[class="sfError"]').text("");
                    $("input[class='sfInputbox']").val("");
                    $("input[class='sfInputbox password']").val("");
                    $("#divChooseTab").hide();
                    $("#passwordChange").hide();
                });
                $('#divChooseTab').on("click", "li", function () {
                    $(this).addClass("sfDefault");
                    $('#divChooseTab li').not($(this)).removeClass("sfDefault");
                    if ($(this).prop('id') == 'userTab') {
                        $('#userAdd').show();
                        $('#passwordChange').hide();
                    }
                    if ($(this).prop('id') == 'chgPassTab') {
                        $('#passwordChange').show();
                        $('#userAdd').hide();
                    }
                });
            },
            validateResetPass: function (newPass, reNewPass) {
                if (ArticleConfig.checkEmptyOrSpaces(newPass)) {
                    $("#newPasswordErrors").show();
                    $("#newPasswordErrors").text("Password is required.");
                }
                if (ArticleConfig.checkEmptyOrSpaces(reNewPass)) {
                    $("#reTypeNewPasswordErrors").show();
                    $("#reTypeNewPasswordErrors").text("Retype Password.");
                }
                if (ArticleConfig.checkEmptyOrSpaces(newPass) || ArticleConfig.checkEmptyOrSpaces(reNewPass)) {
                    return false;
                } else {
                    return true;
                }
            },
            changePassword: function (userID, pass) {
                ArticleConfig.config.method = "ChangePassword";
                ArticleConfig.config.data = JSON.stringify({
                    userID: userID,
                    pass: pass,
                    commonAuth: ArticleConfig.config.authParam
                });
                ArticleConfig.config.successMethod = ArticleConfig.changePasswordSuccess;
                ArticleConfig.ajaxCall(ArticleConfig.config);
            },
            changePasswordSuccess: function () {
                SageFrame.messaging.show("Password Changed Successfully", "Success");
                $("#userGrid").fadeIn();
                $("#userAdd").fadeOut();
                $('label[class="sfError"]').text("");
                $("input[class='sfInputbox']").val("");
                $("input[class='sfInputbox password']").val("");
                $("#divChooseTab").hide();
                $("#passwordChange").hide();
            },
        };
        ArticleConfig.init();
    };
    $.fn.CallArticleConfig = function (p) {
        $.Article(p);
    };
    $.fn.createSideBarForm = function (options) {
        var $this = $(this);
        $this.hide();
        $this.addClass('filterSlider');
        options = $.extend({
            title: 'Side Form',
            openButton: '',
            closeButton: '',
        }, options);
        var header = '<div class="filterSlider_header">';
        header += '<div class="filterSlider_header_title">';
        header += '<h4>' + options.title + '<span class="closesideform"><i class=" fa fa-times"></i></span></h4></div></div>';
        var fBody = '<div class="filterSlider_body">'
        fBody += '<div class="filterSlider_body_container">';
        fBody += $this.html();
        fBody += '</div></div>';
        fBody = header + fBody;
        $this.html(fBody);
        $(options.openButton).off('click').on('click', function () {
            $this.show("slide", { direction: "right" }, 500);
            $('body').append('<div class="filter-overlay"></div>');
            $('.filter-overlay').off('click').on('click', function () {
                $('.filterSlider').hide("slide", { direction: "right" }, 500);
                $(this).remove();
            });
        });
        $this.find('.closesideform').off('click').on('click', function () {
            $('.filterSlider').hide("slide", { direction: "right" }, 500);
            $('body').find('.filter-overlay').remove();
        });
        $(options.closeButton).off('click').on('click', function () {
            $('.filterSlider').hide("slide", { direction: "right" }, 500);
            $('body').find('.filter-overlay').remove();
        });
    }
})(jQuery);