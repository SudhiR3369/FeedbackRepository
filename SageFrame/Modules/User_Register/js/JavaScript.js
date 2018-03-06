(function ($) {
    $.UserEdit = function (p) {
        //p = $.extend({
        //    CultureCode: '',
        //    UserModuleId: '1'
        //}, p);
        var UserEdit = {
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
                success: "",
                baseURL: '172.18.12.119:1111/Modules/User_Register/UserRegisterService.asmx/',
                Path: SageFrameAppPath + '/Modules/User_Register/',
                PortalId: SageFramePortalID,
                UserName: SageFrameUserName,
                CultureCode: p.CultureCode,
                UserModuleId: p.UserModuleId,
                secureToken: SageFrameSecureToken,
                Id: 0,
                //PortalId: p.GetPortalID


            },
            initial: function () {
                UserEdit.getUser();
                UserEdit.UIEvent();
            },
            UIEvent: function () {

                $('#btnAddUser').off('click');
                $('#btnAddUser').on('click', function (event) {
                    event.preventDefault();
                    $('#divRegistrationForm').show();
                    $('#divUsersList').hide();
                });
                $('#btnCancelUser').off('click');
                $('#btnCancelUser').on('click', function (event) {
                    event.preventDefault();

                    $('#divRegistrationForm').hide();
                    $('#divUsersList').show();
                    SageFrame.messaging.hide();
                });


                $('#btnSave').off('click');
                $('#btnSave').on('click', function (event) {
                    event.preventDefault();
                    if (validator.form()) {
                        
                        UserEdit.AddUser();


                    }

                });


                $('#tblBdyUsersList').off('click').on('click', '.editUsers', function () {
                    var ID = $(this).attr('data-id');
                    $('#divUsersList').hide();
                    UserEdit.getUserByID(ID);
                });

                $('#tblBdyUsersList').on('click', '.deleteUsers', function () {
                    var ID = $(this).attr('data-id');
                    jConfirm("Are you sure you want to delete?", 'Confirmation Dialog', function (r) {
                        if (r) {
                            UserEdit.DeleteUser(ID);
                        }
                    });
                });

            },

            getUserByID: function (UserId) {
                UserEdit.config.method = "GetUserById";
                UserEdit.config.data = JSON.stringify({
                    Id: UserId,
                    PortalId: UserEdit.config.PortalId,
                    UserModuleId: UserEdit.config.UserModuleId,
                    CultureCode: UserEdit.config.CultureCode

                });
                UserEdit.config.ajaxCallMode = 3;
                UserEdit.ajaxCall(UserEdit.config);
            },
            DeleteUser: function (ID) {
                UserEdit.config.method = "DeleteUser",
                UserEdit.config.data = JSON.stringify({
                    Id: ID,
                    PortalId: UserEdit.config.PortalId,
                    UserModuleId: UserEdit.config.UserModuleId,
                    CultureCode: UserEdit.config.CultureCode,
                    UserName: UserEdit.config.UserName,
                    secureToken: UserEdit.config.secureToken
                });
                UserEdit.config.ajaxCallMode = 4;
                UserEdit.ajaxCall(UserEdit.config);
            },
            getUser: function () {
                UserEdit.config.method = "GetUser";
                UserEdit.config.data = JSON.stringify({
                    PortalId: parseInt(UserEdit.config.PortalId),
                    UserModuleId: parseInt(p.UserModuleId),
                    CultureCode: p.CultureCode
                });
                UserEdit.config.ajaxCallMode = 2;
                UserEdit.ajaxCall(UserEdit.config);
                // UserEdit.BindData(data);
            },
            BindData: function (data) {
                var dataList = data.d;
                var html = '';
                if (dataList.length > 0) {
                    var i = 1;
                    $.each(dataList, function (key, value) {
                        //var i=1;
                        //$('#tbl').append('<tr><td>' + value.UserModuleId + '</td></tr>');
                        html += '<tr>'
                        html += '<td>' + i + '</td>';
                        html += '<td>' + value.Name + '</td>';
                        html += '<td>' + value.EmailId + '</td>';
                        
                        html += '<td><a class="editUsers icon-edit" href="Javascript:void(0);" data-id="' + value.Id + '"></a></td>';
                        html += '<td><a class="deleteUsers icon-delete" href="Javascript:void(0);" data-id="' + value.Id + '" ></a></td>';

                        html += '</tr>';
                        i++;
                    });
                }
                $('#tblBdyUsersList').html(html);

            },

            AddUser: function () {
                var user =
                    {
                        Id: parseInt(UserEdit.config.Id),
                        Name: $.trim($('#txtName').val()),
                        EmailId: $.trim($('#txtEmail').val()),
                        Pass: $('#txtPass').val(),
                        PortalId: UserEdit.config.PortalId,
                        CultureCode: p.CultureCode,
                        UserModuleId: p.UserModuleId
                    }
                UserEdit.config.method = "AddUser";
                UserEdit.config.data = JSON.stringify({
                    user: user,
                    UserName: SageFrameUserName,
                    secureToken: SageFrameSecureToken
                });
                UserEdit.config.ajaxCallMode = 1;
                UserEdit.ajaxCall(UserEdit.config);
            },
            BindRegistrationForm: function (data) {
                //UserEdit.clearRegistrationForm();
                data = data.d;
                if (data != null) {
                    $('#headingRegistrationForm').text('Update User Information');
                    $('#btnSave').text('Update');
                    $('#divRegistrationForm').show();
                    $('#txtName').val(data.Name);
                    $('#txtEmail').val(data.EmailId);
                    $('#txtPass').val(data.Pass);
                    $('#txtPass2').val('');

                    UserEdit.config.Id = data.Id;

                }
            },
            clearRegistrationForm: function () {
                $('#btnSave').text('Save');
                $('#headinRegistrationForm').text('ADD NEW');
                $('#txtName').val('');
                $('#txtEmail').val('');
                $('#txtPass').val('');
                $('#txtPass2').val('');
                UserEdit.config.Id = 0;
            },

            ajaxCall: function (config) {
                $.ajax({
                    type: config.type,
                    url: config.baseURL + config.method,
                    contentType: config.contentType,
                    cache: config.cache,
                    async: config.async,
                    data: config.data,
                    dataType: config.dataType,
                    success: UserEdit.ajaxSuccess,
                    error: UserEdit.failure
                });
            },
            ajaxSuccess: function (data) {
                switch (UserEdit.config.ajaxCallMode) {
                    case 1: {
                        SageFrame.messaging.show("Operation success", "Success");

                        UserEdit.clearRegistrationForm();
                        UserEdit.getUser();
                        //SageFrame.messaging.hide();
                        //$('#divRegistrationForm').hide();
                        //$('#divUsersList').show();

                      
                    }
                    case 2: {
                        UserEdit.BindData(data);
                        break;
                    }
                    case 3: {
                        UserEdit.BindRegistrationForm(data);
                        break;
                    }
                    case 4:
                        {
                            SageFrame.messaging.show("Record has been deleted successfully.", "Success");
                            UserEdit.getUser();
                            break;
                        }
                }

            },
            failure: function () {
                alert("Error1995");
            },





        }
        UserEdit.initial();


        validator = $("#form1").validate({
            ignore: ":hidden",
            rules: {
                Name: {
                    required: true
                },
                EmailId: {
                    required: true,
                    email:true
                },
                Password: {
                    required: true,
                    pwcheck:true,
                    minlength:6
                },
                Password2:{
                    required:true,
                    equalTo:"#txtPass"
                }


            },
            messages: {
                Name: {
                    required: "* Required"
                },
                EmailId: {
                    required: "* Required",
                    email:"Please Enter Valid Email "
                },
                Password: {
                    required: "* Required",
                    pwcheck:"Password Must Contain atleast 1 Capital Charater,1 Lowercase and 1 digit",
                    minlength:"Minimum Password Length is 6"
                },
                Password2:{
                    required:"required",
                    equalTo:"Password didn't Match"
                }
            }


        });
          $.validator.addMethod("pwcheck",
                        function(value, element) {
                            return /^[A-Za-z0-9\d=!\-@._*]+$/.test(value)&& /[a-z]/.test(value)&& /[A-Z]/.test(value) && /\d/.test(value);
                    });



    }
    $.fn.UserEdit = function (p) {
        $.UserEdit(p);
    };
})(jQuery)