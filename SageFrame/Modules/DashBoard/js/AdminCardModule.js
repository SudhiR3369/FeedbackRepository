(function ($) {
    $.AdminCardModule = function (p) {
        var ThatModule;
        p = $.extend({ userModuleID: 0 }, p)
        var CardModule = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: SageFrameAppPath + '/Modules/DashBoard/Services/AdminCardServce.asmx/',
                method: "",
                url: "",
                ajaxSuccess: '',
                userModuleID: p.userModuleID,
            },
            init: function () {
                $('#divTrashCardModule').hide();

                CardModule.LoadCardModuleHeader();
                CardModule.GetAllTrashedModule();
                CardModule.UIEvents();
                CardModule.DragandDropEvents();
            },
            UIEvents: function () {
                setTimeout(function () {
                    $('#DashRightPane > .minimize').each(function () {
                         $(this).children('div').eq(1).hide();
                    });
                }, 1);


                $('#toogleTrashModule').off().on('click', function () {
                    $(this).toggleClass('expand');
                    $('#divTrashCardModule').slideToggle(200);
                });
                $('#DashRightPane').off().on('click', '.remove', function () {
                    ThatModule = $(this).parent().parent().parent().parent();
                    var ID = $(ThatModule).attr('class').split(' ')[2];
                    ID = ID.split('_')[1];
                    CardModule.RemoveCardModule(ID);
                });
                $('#divTrashCardModule').off().on('click', '.restoreModule', function () {
                    var ModuleID = $(this).attr('data-moduleid');
                    CardModule.RestoreCardModule(ModuleID);
                });
                $('#DashRightPane > .sfPanelModule').off().on('click', '.minimize', function () {
                    $(this).parent().parent().parent().next().slideToggle(200);
                    var MainWrap = $(this).parent().parent().parent().parent();
                    $(MainWrap).toggleClass('minimize');
                    var classes = $(MainWrap).attr('class');
                    var userModuleID = classes.split(' ')[2];
                    userModuleID = userModuleID.split('_')[1];
                    CardModule.MinimizeMaximizeUpdate(userModuleID, classes);
                });
            },
            DragandDropEvents: function () {
                // Sort the parents
                $("#DashRightPane").sortable({
                    //containment: "parent",
                    //items: "> div",
                    //handle: ".move",
                    tolerance: "fa-arrows",
                    cursor: "move",
                    //opacity: 0.7,
                    //revert: 300,
                    //delay: 150,
                    //dropOnEmpty: true,
                    placeholder: "movable-parent",
                    start: function (e, ui) {
                        ui.placeholder.height(ui.helper.outerHeight());
                    },
                    stop: function (event, ui) {
                        CardModule.UpdateModuleOrder(ui);
                    }
                });
            },
            UpdateModuleOrder: function () {
                var UserModuleList = '';
                var UserModuleID = 0;
                $('#DashRightPane >div').each(function () {
                    UserModuleID = $(this).attr('class').split(' ')[2]
                    UserModuleID = UserModuleID.split('_')[1];
                    UserModuleList += UserModuleID + ',';
                })
                CardModule.config.data = JSON2.stringify({
                    userModuleIDs: UserModuleList,
                    userModuleID: UserModuleID,
                    SageFrameUser: SageFrameUserName,
                    authToken: SageFrameSecureToken,
                    portalID: SageFramePortalID,
                });
                CardModule.config.method = "UpdateDisplayOrder"
                CardModule.config.url = CardModule.config.baseURL + CardModule.config.method;
                CardModule.config.ajaxSuccess = CardModule.OrderChangesSuccess
                CardModule.ajaxCall(CardModule.config);
            },
            OrderChangesSuccess: function (data) {
            },
            GetAllTrashedModule: function () {
                CardModule.config.method = "GetAllDeltedCardModule"
                CardModule.config.data = JSON2.stringify({
                    userName:SageFrameUserName
                })
                CardModule.config.url = CardModule.config.baseURL + CardModule.config.method;
                CardModule.config.ajaxSuccess = CardModule.BindTrashedModules
                CardModule.ajaxCall(CardModule.config);
            },
            BindTrashedModules: function (data) {
                var lst = data.d;
                var html = '<h3>Trashed Module</h3><ul>';
                if (lst.length > 0) {
                    $.each(lst, function (index, item) {
                        html += '<li>'
                        html += '<span>' + item.UserModuleTitle + '</span>'
                        html += '<span title="Restore" class="restoreModule sfBtnSml smlbtn-succ" data-moduleId="' + item.UserModuleID + '"><i class="fa fa-recycle" aria-hidden="true"></i></span>'
                        html += '</li>'
                    });

                }
                else {
                    html += '<li>No Deleted Module</li>'
                }
                html += '</ul>'
                $('#divTrashCardModule').html(html);
            },
            RemoveCardModule: function (userModuleID) {
                CardModule.config.method = "DeleteAdminCardModule"
                CardModule.config.data = JSON2.stringify({
                    userModuleID: userModuleID,
                    SageFrameUser: SageFrameUserName,
                    authToken: SageFrameSecureToken,
                    portalID: SageFramePortalID,
                });
                CardModule.config.url = CardModule.config.baseURL + CardModule.config.method;
                CardModule.config.ajaxSuccess = CardModule.ModuleRemoveSuccess
                CardModule.ajaxCall(CardModule.config);
            },
            ModuleRemoveSuccess: function (data) {
                if (data.d == 1) {

                    var option = { to: $("#toogleTrashModule"), className: "removeModuleEffect" };
                    $(ThatModule).effect("transfer", option, 1000);
                    $(ThatModule).remove();
                    ThatModule = null;
                    SageFrame.messaging.show('Module Remove Successfully.', 'Success');
                    CardModule.GetAllTrashedModule();
                }
            },
            RestoreCardModule: function (userModuleID) {
                CardModule.config.method = "RestoreDeletedModule"
                CardModule.config.data = JSON2.stringify({
                    userModuleID: userModuleID,
                    SageFrameUser: SageFrameUserName,
                    authToken: SageFrameSecureToken,
                    portalID: SageFramePortalID,
                });
                CardModule.config.url = CardModule.config.baseURL + CardModule.config.method;
                CardModule.config.ajaxSuccess = CardModule.ModuleRestoreSuccess
                CardModule.ajaxCall(CardModule.config);
            },
            ModuleRestoreSuccess: function (data) {
                if (data.d = 1) {
                    location.reload();
                }
            },
            MinimizeMaximizeUpdate: function (userModuleID, suffixClass) {
                CardModule.config.method = "UpdateMinMaxDisplay"
                CardModule.config.data = JSON2.stringify({
                    userModuleID: userModuleID,
                    SuffixClass: suffixClass,
                    SageFrameUser: SageFrameUserName,
                    authToken: SageFrameSecureToken,
                    portalID: SageFramePortalID,
                });
                CardModule.config.url = CardModule.config.baseURL + CardModule.config.method;
                CardModule.config.ajaxSuccess = CardModule.MinMaxSuccess
                CardModule.ajaxCall(CardModule.config);
            },
            MinMaxSuccess: function (data) {

            },
            LoadCardModuleHeader: function () {
                //To add Admin Right site panel Module Control head
                var Html = '<div class="sfModuleHeader box-head">'
                Html += '<div class="head-left"></div>'
                Html += '<div class="head-right">';
                Html += '<span><i class="fa fa-arrows dragModules" aria-hidden="true"></i></span>'
                Html += '<span><i class="fa fa-minus minimize" aria-hidden="true"></i></span>'
                Html += '<span><i class="fa fa-times remove" aria-hidden="true"></i></span>'
                Html += '</div></div>'
                $('#DashRightPane > .sfPanelModule').each(function () {
                    var heading = $(this).children('h2');
                    $(this).prepend(Html);
                    $(this).children('.sfModuleHeader').children('.head-left').append(heading);
                });


            },
            ajaxFailure: function () {
            },
            ajaxCall: function (config) {
                $.ajax({
                    type: config.type,
                    contentType: config.contentType,
                    cache: config.cache,
                    url: config.url,
                    data: config.data,
                    dataType: config.dataType,
                    success: config.ajaxSuccess,
                    error: this.ajaxFailure
                });
            },
        }
        CardModule.init();

    }
    $.fn.AdminCardModule = function () {
        $.AdminCardModule();
    }
})(jQuery);