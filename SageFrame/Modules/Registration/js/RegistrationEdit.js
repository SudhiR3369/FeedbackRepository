(function ($) {
    $.RegistrationEdit = function (p) {
      
        p = $.extend
        ({
            CultureCode: '',
            UserModuleID: '1'
        }, p);

        var RegistrationEdit = {
            config: {
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                method: "",
                url: "",
                ajaxCallMode: 0,
                baseURL: SageFrameAppPath + '/Modules/Registration/WebService/RegistrationService.asmx/',
                Path: SageFrameAppPath + '/Modules/Registration/',
                PortalID: SageFramePortalID,
                UserName: SageFrameUserName,
                UserModuleID: p.UserModuleID,
                SecureToken: SageFrameSecureToken,
                UsersID: 0,
                //ProfileImageName: '',
            },
            init: function () {
                RegistrationEdit.getAllUsers();
                RegistrationEdit.UIEvent();
            },

            UIEvent: function () {

                $('#btnAddNewUsers').off('click');
                $('#btnAddNewUsers').on('click', function (e) {
                    e.preventDefault();
                    $('#divRegistrationForm').show();
                    RegistrationEdit.clearRegistrationForm();
                    //$('#divUsersList').hide();
                });


                $('#btnSaveUser').off('click');
                $('#btnSaveUser').on('click', function (e) {
                    e.preventDefault();
                    if (validator.form()) {
                    RegistrationEdit.AddUpdateUsers();
                    RegistrationEdit.clearRegistrationForm();
                     }
                });

                $('#btnCancelUser').off('click');
                $('#btnCancelUser').on('click', function (e) {
                    e.preventDefault();
                    RegistrationEdit.clearRegistrationForm();
                    $('#divRegistrationForm').hide();
                    $('#divUsersList').show();
                });


                $('#tblBdyUsersList').off('click').on('click', '.editUsers', function () {
                    var ID = $(this).attr('data-id');             
                    RegistrationEdit.getUsersByID(ID);
                });
                                
                $('#tblBdyUsersList').on('click', '.deleteUsers', function () {
                    var ID = $(this).attr('data-id');
                    jConfirm("Are you sure you want to delete?", 'Confirmation Dialog', function (r) {
                        if (r) {
                            RegistrationEdit.DeleteUserByID(ID);
                        }
                    });
                });
            },

            //Gets all users 
            getAllUsers: function () {
                
                RegistrationEdit.config.method = "GetAllUsers";
                RegistrationEdit.config.data = JSON2.stringify({
                    PortalID: parseInt(RegistrationEdit.config.PortalID),
                    UserModuleID: parseInt(p.UserModuleID),
                    CultureCode: p.CultureCode
                });
                RegistrationEdit.config.ajaxCallMode = 2;
                //alert("Get all users");
                RegistrationEdit.ajaxCall(RegistrationEdit.config);
            },

            //Binds users list to the table in ascx file
            BindUserList: function (data) {
                var userList = data.d;
                var html = '';
                if (userList.length > 0) {
                    var i = 1;
                    $.each(userList, function (index, item) {
                        html += '<tr>'
                        html += '<td>' + i + '</td>';
                        html += '<td>' + item.Name + '</td>';
                        html += '<td>' + item.EmailID + '</td>';
                        html += '<td>' + item.Password + '</td>';
                        html += '<td><a class="editUsers icon-edit" href="Javascript:void(0);" data-id="'+item.UserID+'"></a></td>';
                        html += '<td><a class="deleteUsers icon-delete" href="Javascript:void(0);" data-id="' + item.UserID + '" ></a></td>';
                        html += '</tr>';
                        i++
                    });
                }
                else {
                    html += '<tr><td colspan="7"><h3>No Data to Display DumbAss.</h3></td></tr>';
                }
                $('#tblBdyUsersList').html(html);
            },

            getUsersByID: function (UsersID) {
                RegistrationEdit.config.method = "GetUsersByID";
                RegistrationEdit.config.data = JSON.stringify({
                    UserID: UsersID,
                });
                RegistrationEdit.config.ajaxCallMode = 3;
                RegistrationEdit.ajaxCall(RegistrationEdit.config);
            },

            //Binds respective User information to the Registration Form
            BindRegistrationForm: function (data) {
                RegistrationEdit.clearRegistrationForm();
                data = data.d;
                if (data != null) {
                    $('#headingRegistrationForm').text('Update User Information');
                    $('#btnSaveUser').text('Update');
                    $('#divRegistrationForm').show();
                    $('#txtUserName').val(data.Name);
                    $('#txtEmailID').val(data.EmailID);
                    $('#txtPassword').val(data.Password);

                    RegistrationEdit.config.UsersID = data.UserID;
                
                }
            },

            //Deletes selected user record
            DeleteUserByID: function (UsersID) {
              
                RegistrationEdit.config.method = "DeleteUserByID";
                RegistrationEdit.config.data = JSON2.stringify({
                    UserID: UsersID,
                    PortalID: RegistrationEdit.config.PortalID,
                    UserModuleID: p.UserModuleID,                    
                    secureToken: RegistrationEdit.config.SecureToken,
                    userName: RegistrationEdit.config.UserName
                });
                RegistrationEdit.config.ajaxCallMode = 4;
                RegistrationEdit.ajaxCall(RegistrationEdit.config);
            },

            //Adds new record or update existing record
            AddUpdateUsers: function () {
                var Registration =
                    {
                        UserID: parseInt(RegistrationEdit.config.UsersID),
                        Name: $.trim($('#txtUserName').val()),
                        EmailID: $.trim($('#txtEmailID').val()),
                        Password: $.trim($('#txtPassword').val()),
                        UserModuleID: RegistrationEdit.config.UserModuleID,
                        PortalID: RegistrationEdit.config.PortalID,                      
                        CultureCode: p.CultureCode
                    }

                RegistrationEdit.config.method = "AddUpdateUsers";
                RegistrationEdit.config.data = JSON.stringify({
                    reg: Registration,
                    secureToken: SageFrameSecureToken
                });
                RegistrationEdit.config.ajaxCallMode = 1;
                RegistrationEdit.ajaxCall(RegistrationEdit.config);
            },

            //Resets to default form
            clearRegistrationForm: function ()
            {
                $('#btnSaveUser').text('Save');
                $('#headingRegistrationForm').text('ADD NEW USERS');
                $('#txtUserName').val('');
                $('#txtEmailID').val('');
                $('#txtPassword').val('');
                RegistrationEdit.config.UsersID = 0;
            },

            //Common ajaxCall for all the methods
            ajaxCall: function (config) {                     

                $.ajax({
                    type: config.type,
                    contentType: config.contentType,
                    cache: config.cache,
                    async: config.async,
                    url: config.baseURL + config.method,
                    data: config.data,
                    dataType: config.dataType,            
                    success: RegistrationEdit.ajaxSuccess,
                    error: RegistrationEdit.ajaxFailure
                });
            },

            //To do's on ajaxSuccess
            ajaxSuccess: function (data) {
                switch (RegistrationEdit.config.ajaxCallMode) {
                    case 1:
                        {
                            if (data.d == "1") {
                                if (RegistrationEdit.config.UsersID > 0) {
                                    SageFrame.messaging.show("Updated successfully.", "Success");
                                }
                                else {
                                    SageFrame.messaging.show("Added successfully.", "Success");
                                }
                                RegistrationEdit.clearRegistrationForm();                          
                                RegistrationEdit.getAllUsers();
                            }
                            else if (data.d == "2") {
                                alert("Authorization Error.");
                            }
                            break;
                        }
                    case 2:
                        {
                            RegistrationEdit.BindUserList(data);
                            break;
                        }
                    case 3:
                        {
                            RegistrationEdit.BindRegistrationForm(data);
                            break;
                        }

                    case 4:
                        {
                            if (data.d == "1") {
                                SageFrame.messaging.show("Record has been deleted successfully.", "Success");
                                RegistrationEdit.getAllUsers();
                            }
                            else {
                                SageFrame.messaging.show("Authorization Error!!", "Error");
                            }
                            break;
                        }
                }
            },

            ajaxFailure: function () {
                RegistrationEdit.clearRegistrationForm();
                alert('Something went wrong!');
            }

        }

        //First Call
        RegistrationEdit.init();
    }

  
    // Validation of Registration form
    //UserName === name attribute of the field.
    validator = $("#form1").validate({
        ignore: ":hidden",
        rules: {
            UserName: {
                required: true,
                minlength: 2
            },
            EmailID: {
                required: true,
                email: true
            },
            Password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            UserName: {
                required: "*User Name is Required",
            },
            EmailID: {
                required: "*EmailID is Required"
            },
            Password: {
                required: "*Password Is Required",

            }
        }
    });

    //Starter
    $.fn.RegistrationEdit = function (p) {
        $.RegistrationEdit(p);
    };
})(jQuery)









