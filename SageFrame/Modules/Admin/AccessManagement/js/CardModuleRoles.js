(function ($) {
    $.createCardRoleSetting = function (p) {
        p = $.extend
               ({
                   CultureCode: '',
                   UserModuleID: '1',
                   Mode: false,
                   RoleID: ''
               }, p);

        var CardRoleSetting = {
            config: {
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                method: "",
                url: "",
                categoryList: "",
                ajaxSuccess: '',
                lstPagePermission: [],
                arr: [],
                arrModules: [],
                baseURL: SageFrameAppPath + '/Modules/Admin/UserManagement/Services/AdminCardRoleSettingService.asmx/',
                Path: SageFrameAppPath + '/Modules/Admin/UserManagement/',
                PortalID: SageFramePortalID,
                UserName: SageFrameUserName,
                UserModuleID: p.UserModuleID,
                Mode: p.Mode,
                RoleID: ''
            },

            ajaxFailure: function () {
            },
            ajaxCall: function (config) {
                $.ajax({
                    async: config.async,
                    type: config.type,
                    contentType: config.contentType,
                    cache: config.cache,
                    url: config.url,
                    data: config.data,
                    dataType: config.dataType,
                    success: config.ajaxSuccess,
                    error: CardRoleSetting.ajaxFailure
                });
            },


         
            BindModulesWithRoles: function (data) {
                var IsRoleSuper = true;
                var html = '<tr><th><label>Module</label></th><th><label>View</label></th><th>&nbsp;</th><th>&nbsp;</th></tr>';
                var roleNameCheck;
                if (data.d.length > 0) {
                  
                    $.each(data.d, function (index, item) {
                        html += '<tr>'
                        html += '<td><label class="sfFormlabel">' + item.UserModuleTitle + '</label></td>';
                        if (item.RoleName != null && item.RoleName == 'Super User') {
                            
                            html += '<td> <input type="checkbox" checked class="permissionView" data-userModuleID="' + item.UserModuleID + '"  disabled/></td>'
                            html += '<td >&nbsp;</td><td >&nbsp;</td>'

                        }
                        else {
                            IsRoleSuper = false;
                            if (item.IsRoleAssign)
                                html += '<td> <input type="checkbox" checked class="permissionView" data-userModuleID="' + item.UserModuleID + '"/></td>'
                                 
                            else
                                html += '<td> <input type="checkbox"  class="permissionView" data-userModuleID="' + item.UserModuleID + '"/></td>'
                                html += '<td >&nbsp;</td>';
                            html += '<td><button  class="btnCardPermissionSave icon-update smlbtn-succ sfBtn" type="button">Update</button></td>'
                        }

                        html += '</tr>'
                    });
                }
                if (IsRoleSuper)
                    $('#btnSubmitCardRole').hide();
                else
                    $('#btnSubmitCardRole').show();
                $('#tblCardPermission').html(html);
                LabelAfterCheckBox();
               
              
            },


            Init: function () {
                CardRoleSetting.GetAllCardModulePermission(p.RoleID);
                CardRoleSetting.BindEvent();
               
            },
            GetAllCardModulePermission: function (roleID) {
                CardRoleSetting.config.method = "GetAllAdminCardModulePermission";
                CardRoleSetting.config.data = JSON2.stringify({
                    portalID: parseInt(SageFramePortalID),
                    roleID: roleID,
                    userName: SageFrameUserName,
                    userModuleID: p.UserModuleID,
                    secureToken: SageFrameSecureToken
                }),
                CardRoleSetting.config.url = CardRoleSetting.config.baseURL + CardRoleSetting.config.method;
                CardRoleSetting.config.ajaxSuccess = CardRoleSetting.BindModulesWithRoles
                CardRoleSetting.ajaxCall(CardRoleSetting.config);
            },
            BindEvent: function () {
                $('#tblCardPermission').off().on('click', '.btnCardPermissionSave', function () {
                    CardRoleSetting.UpdateModulePermission(true,this);         
                })
                $('#btnSubmitCardRole').off().on('click', function () {
                    CardRoleSetting.UpdateModulePermission(false, null);
                });
                $('#cardModuleRoleWrapper').on('click','#roleTree>li', function () {  
                    $('#cardModuleRoleWrapper #roleTree>li').removeClass('sfActive');
                    $(this).addClass('sfActive');
                    CardRoleSetting.config.RoleID = $(this).prop('id');
                    CardRoleSetting.GetAllCardModulePermission(CardRoleSetting.config.RoleID);
                });
            },
            UpdateModulePermission: function (IsSingle,thatPointer) {
                var InfoArray = new Array();
                var RolID = $('#cardModuleRoleWrapper #roleTree>li.sfActive').prop('id')
                if (IsSingle) {
                    var checkbox = $(thatPointer).parent().parent().find('input.permissionView');
                    InfoArray.push({
                        RoleID: RolID,
                        UserName: SageFrameUserName,
                        UserModuleID:$(checkbox).attr('data-usermoduleid'),
                        IsRoleCreate: $(checkbox).prop('checked'),
                    });
                }
                else {
                    var isNotFirst=false
                    $('#tblCardPermission tr').each(function () {
                        if (isNotFirst) {
                            var checkbox = null;
                            checkbox = $(this).find('input.permissionView');
                            InfoArray.push({
                                RoleID: RolID,
                                UserName: SageFrameUserName,
                                UserModuleID: $(checkbox).attr('data-usermoduleid'),
                                IsRoleCreate: $(checkbox).prop('checked')
                            });
                        }
                        isNotFirst = true;
                    })
                }     
                CardRoleSetting.config.method = "UpdateCardModulePermission";
                CardRoleSetting.config.data = JSON2.stringify({
                    lstObject:InfoArray,
                    portalID: parseInt(SageFramePortalID),
                    userName: SageFrameUserName,
                    userModuleID: p.UserModuleID,
                    secureToken: SageFrameSecureToken
                }),
                CardRoleSetting.config.url = CardRoleSetting.config.baseURL + CardRoleSetting.config.method;
                CardRoleSetting.config.ajaxSuccess = CardRoleSetting.RoleUpdateSuccess
                CardRoleSetting.ajaxCall(CardRoleSetting.config);
            },
            RoleUpdateSuccess: function (data) {
                SageFrame.messaging.show('Permission Updated Successfully.','Success');
            }

        };
        CardRoleSetting.Init();
    };
    $.fn.CardModuleRoleSetting = function (p) {
        $.createCardRoleSetting(p);
    };

})(jQuery);