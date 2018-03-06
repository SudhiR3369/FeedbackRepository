(function ($) {
    $.SocialLinkEdit = function (p) {
        var order = 0;
        var level = 0;
        var validator;
        p = $.extend
                ({
                    UserModuleID: '1'
                }, p);
        var UiVariable = {
            TextLinkTitle: 'input#txtTitle',
            TextLinkUrl: 'input#txtUrl',
            ButtonSave: 'button#btnSave',
            ButtonCancel: 'button#BtnCancel',
            DivFormWrap: 'div#divFromWrapper',
            DivTableListWrap: 'div#divTblWrap',
            ButtonAddNew: 'button#btnAddNewLink',
            ButtonEdit: 'a.editLink',
            ButtonDelete: 'a.deleteLink',
            HiddenIconClass: 'input#hdnIconClass',

        }
        var SocialLinkEdit = {
            config: {
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                method: "",
                url: "",
                ajaxSuccess: '',
                baseURL: SageFrameAppPath + '/Modules/SocialLink/service/SocialLinkService.asmx/',
                Path: SageFrameAppPath + '/Modules/Link/',
                PortalID: SageFramePortalID,
                UserName: SageFrameUserName,
                UserModuleID: p.UserModuleID,
                SecureToken: SageFrameSecureToken,
                CultureCode: SageFrameCurrentCulture,
                LinkID: 0
            },
            init: function () {
                SocialLinkEdit.GetAllLinks();// Initiallly
                SocialLinkEdit.UIEvents();

            },
            UIEvents: function () {
                $('.iconList').off('click');
                $('.iconList').on('click', function () {
                    $('.iconList').removeClass('iconListAciveItem');
                    $(this).addClass('iconListAciveItem');
                    var iconTag = $(this).find('i');
                    $(UiVariable.HiddenIconClass).val($(iconTag).prop('class'));
                    $(UiVariable.HiddenIconClass).focus();
                    $(UiVariable.HiddenIconClass).focusout();
                });
                $(UiVariable.ButtonAddNew).off('click');
                $(UiVariable.ButtonAddNew).on('click', function (e) {
                    e.preventDefault();
                    $(UiVariable.DivFormWrap).show();
                    $(UiVariable.DivTableListWrap).hide();
                });


                $(UiVariable.ButtonCancel).off('click');
                $(UiVariable.ButtonCancel).on('click', function (e) {
                    e.preventDefault();
                    $(UiVariable.DivFormWrap).hide();
                    $(UiVariable.DivTableListWrap).show();
                    SocialLinkEdit.clearLinkForm();

                });
                $(UiVariable.ButtonSave).off('click');
                $(UiVariable.ButtonSave).on('click', function (e) {

                    e.preventDefault();
                    if (validator.form()) {
                        SocialLinkEdit.AddUpdateLink();
                    }

                });



                $(document).off('click', UiVariable.ButtonEdit);
                $(document).on('click', UiVariable.ButtonEdit, function () {
                    var ID = $(this).prop('id').split('-')[1];
                    SocialLinkEdit.GetLinkByID(ID);
                });
                $(document).off('click', UiVariable.ButtonDelete);
                $(document).on('click', UiVariable.ButtonDelete, function () {
                    var ID = $(this).prop('id').split('-')[1];
                    jConfirm("Are you sure you want to delete?", 'Confirmation Dialog', function (r) {
                        if (r) {
                            SocialLinkEdit.DeleteLinkByID(ID);
                        }
                    });

                });
            },

            clearLinkForm: function () {

                $(UiVariable.ButtonSave).text('Save');

                $(UiVariable.TextLinkTitle).val('');
                $(UiVariable.TextLinkUrl).val('');
                SocialLinkEdit.config.LinkID = 0;
                SocialLinkEdit.config.ProfileImageName = ''
                $(UiVariable.CheckBoxIsActive).prop("checked", false)
                $(UiVariable.HiddenIconClass).val('');
                $('.iconList').removeClass('iconListAciveItem');
				FormFieldComplete();
				validator.resetForm();
				

            },

            AddUpdateLink: function () {

                var Link =
                    {
                        LinkID: parseInt(SocialLinkEdit.config.LinkID),
                        LinkTitle: $.trim($(UiVariable.TextLinkTitle).val()),
                        LinkUrl: $.trim($(UiVariable.TextLinkUrl).val()),
                        IconClass: $(UiVariable.HiddenIconClass).val(),
                        UserModuleID: SocialLinkEdit.config.UserModuleID,
                        PortalID: SocialLinkEdit.config.PortalID,
                        Culture: SocialLinkEdit.config.CultureCode,
                    }
                SocialLinkEdit.config.url = SocialLinkEdit.config.baseURL + "AddUpdateLink";
                SocialLinkEdit.config.data = JSON2.stringify({
                    objInfo: Link,
                    userName: SageFrameUserName,
                    authToken: SageFrameSecureToken
                });
                SocialLinkEdit.config.ajaxSuccess = SocialLinkEdit.AddUpdateSuccess,
                SocialLinkEdit.ajaxCall(SocialLinkEdit.config);

            },
            AddUpdateSuccess: function (data) {

                if (data.d > 0) {
                    if (data.d == 2) {
                        SageFrame.messaging.show("Updated successfully.", "Success");
                    }
                    else {
                        SageFrame.messaging.show("Added successfully.", "Success");
                    }
                    SocialLinkEdit.clearLinkForm();
                    $(UiVariable.DivFormWrap).hide();
                    $(UiVariable.DivTableListWrap).show();
                    SocialLinkEdit.GetAllLinks();
                }
                else {
                    alert("Authorization Error.");
                }

            },
            GetAllLinks: function () {
                SocialLinkEdit.config.url = SocialLinkEdit.config.baseURL + "GetSocialLinks";
                SocialLinkEdit.config.data = JSON2.stringify({
                    userModuleID: SocialLinkEdit.config.UserModuleID,
                    portalID: SocialLinkEdit.config.PortalID,
                    cultureCode: SocialLinkEdit.config.CultureCode,
                    secureToken: SageFrameSecureToken
                });
                SocialLinkEdit.config.ajaxSuccess = SocialLinkEdit.BindLinks;
                SocialLinkEdit.ajaxCall(SocialLinkEdit.config);
            },
            BindLinks: function (data) {
                var Lstdata = data.d
                var html = '<tr><th>S.N</th><th>Title</th><th>Link Url</th><th>Icon</th><th>Edit</th><th>Delete</th></tr>';
                if (Lstdata.length > 0) {
                    var i = 1;
                    $.each(Lstdata, function (index, item) {

                        html += '<tr>'
                        html += '<td>' + i + '</td>';
                        html += '<td>' + item.LinkTitle + '</td>';
                        html += '<td>' + item.LinkUrl + '</td>';
                        html += '<td><i class="fa ' + item.IconClass + '" aria-hidden="true"></i></td>'
                        html += '<td><a class="editLink icon-edit" href="Javascript:void(0);" id="edit-' + item.LinkID + '"></a></td>';
                        html += '<td><a class="deleteLink icon-delete" href="Javascript:void(0);" id="delete-' + item.LinkID + '" ></a></td>';
                        html += '</tr>';
                        i++;
                    });

                }
                else {
                    html = '<tr><td colspan="5"><h3>..............  No data to display ...............<h3></td></tr>';
                }
                $('#tblSocialLinks').html(html);
            },
            GetLinkByID: function (LinkID) {
                SocialLinkEdit.config.url = SocialLinkEdit.config.baseURL + "GetSocialLinkByID";
                SocialLinkEdit.config.data = JSON2.stringify({
                    LinkID: LinkID,
                });
                SocialLinkEdit.config.ajaxSuccess = SocialLinkEdit.BindLinkToForm;
                SocialLinkEdit.ajaxCall(SocialLinkEdit.config);

            },
            BindLinkToForm: function (data) {
                SocialLinkEdit.clearLinkForm();
                data = data.d;
                if (data != null) {

                    $(UiVariable.ButtonSave).text('Update');
                    $(UiVariable.DivFormWrap).show();
                    $(UiVariable.DivTableListWrap).hide();
                    $(UiVariable.TextLinkTitle).val(data.LinkTitle);
                    $(UiVariable.TextLinkUrl).val(data.LinkUrl);

                    $(UiVariable.HiddenIconClass).val(data.IconClass);
                    var className = $.trim(data.IconClass).split(' ')[1];
                    var iconListElement = $('.' + className).parent();
                    $(iconListElement).addClass('iconListAciveItem');
                    SocialLinkEdit.config.LinkID = data.LinkID;
                }

            },
            DeleteLinkByID: function (LinkID) {
                SocialLinkEdit.config.url = SocialLinkEdit.config.baseURL + "DeleteLinkByID";
                SocialLinkEdit.config.data = JSON2.stringify({
                    linkID: LinkID,
                    userModuleID: SocialLinkEdit.config.UserModuleID,
                    portalID: SocialLinkEdit.config.PortalID,
                    userName: SocialLinkEdit.config.UserName,
                    authToken: SocialLinkEdit.config.SecureToken
                });
                SocialLinkEdit.config.ajaxSuccess = SocialLinkEdit.DeleteSuccess;
                SocialLinkEdit.ajaxCall(SocialLinkEdit.config);
            },
            DeleteSuccess: function (data) {
                if (data.d == '1') {
                    SageFrame.messaging.show("Link has been deleted successfully.", "Success");
                    SocialLinkEdit.GetAllLinks();
                }
                else {
                    SageFrame.messaging.show("Authorization Error.", "Error");
                }
            },


            ajaxCall: function (config) {
                $.ajax({
                    type: SocialLinkEdit.config.type,
                    contentType: SocialLinkEdit.config.contentType,
                    cache: SocialLinkEdit.config.cache,
                    async: SocialLinkEdit.config.async,
                    url: SocialLinkEdit.config.url,
                    data: SocialLinkEdit.config.data,
                    dataType: SocialLinkEdit.config.dataType,
                    success: SocialLinkEdit.config.ajaxSuccess,
                    error: SocialLinkEdit.ajaxFailure,
					complete:function(){
						FormFieldComplete();
					}
                });
            },

            ajaxFailure: function () {
                SageFrame.messaging.show("Server Error.", "Error");
            },
        }

        validator = $("#form1").validate({
            ignore: ":hidden",
            rules: {

                linkUrl: {
                    required: true,
                    url: true
                },
                HiddenIconClass: {
                    required: true,
                }
            },
            messages: {

                linkUrlicon: {
                    required: "* Required",
                    
                },
                HiddenIconClass: {
                    required: "*Icon Required",
                }

            }

        });


        SocialLinkEdit.init();
    }
    $.fn.SocialLinkEdit = function (p) {
        $.SocialLinkEdit(p);
    };
})(jQuery);