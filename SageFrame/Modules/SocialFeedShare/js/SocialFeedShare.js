/// <reference path="../../../../js/jquery-1.9.1.js" />

var SocialFeedShare;
var selectedPostID = "";
var mediaPostID = "";
var resultID = "";
var selectedMessage = "";

(function ($) {

    //$(currentControl).parent().find('.msgContent').attr('data-msgid')
    var socialFeedSettings = [];
    var flyerType = 0;
    $.SocialFeedShare = function (p) {
        p = $.extend(
            {
                modulePath: '', DataObj: '', portalID: 0, userModuleID: '', divFB: '', divTwitter: '', divLinkedIn: ''
            }, p);
        SocialFeedShare = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: p.modulePath + 'Services/SocialFeedShare.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID,
                masterDomain: p.MasterDomain,
                divFB: p.divFB,
                divTwitter: p.divTwitter,
                divLinkedIn: p.divLinkedIn
            },
            init: function () {
                SocialFeedShare.ClearControls();
                //SocialFeedShare.GetSuggestions();
                SocialFeedShare.GetSocialFeedSettings();

                SocialFeedShare.BindEvents();
            },
            ajaxSuccess: function (data) { },
            ajaxFailure: function () { },
            ajaxCall: function (config) {
                $.ajax({
                    type: SocialFeedShare.config.type,
                    contentType: SocialFeedShare.config.contentType,
                    async: SocialFeedShare.config.async,
                    cache: SocialFeedShare.config.cache,
                    url: SocialFeedShare.config.url,
                    data: SocialFeedShare.config.data,
                    dataType: SocialFeedShare.config.dataType,
                    success: SocialFeedShare.config.ajaxCallMode,
                    error: SocialFeedShare.ajaxFailure,
                    complete: function () {
                        FormFieldComplete();
                    }
                });
            },

            GetSocialFeedSettings: function () {
                SocialFeedShare.config.url = SocialFeedShare.config.baseURL + "GetSocialFeedSettings";
                SocialFeedShare.config.data = {};
                SocialFeedShare.config.ajaxCallMode = SocialFeedShare.SocialFeedSettingInfoCallBack;
                SocialFeedShare.config.async = false;
                SocialFeedShare.ajaxCall(SocialFeedShare.config);
            },

            SocialFeedSettingInfoCallBack: function (data) {
                if (data.d != null || data.d != '') {
                    socialFeedSettings = data.d;
                }
            },

            BindEvents: function () {


                $('.mediaSettings').on('click', function () {
                    flyerType = 1;

                    SocialFeedShare.DisplayMediaSettings($(this));
                });

                $('#lblFlyingAddNew').on('click', function () {
                    if (flyerType === 1)
                        SocialFeedShare.UpdateSocialShareSettings();

                });

                $('#closeDivFlying').on('click', function () {
                    $('.sfDivFlying').hide();
                });


                $('.btnSharePost').on('click', function () {
                    SocialFeedShare.UseCurrentPost(this);
                });
            },

            UseCurrentPost: function (currentControl) {

                var messageDiv = $(currentControl).find('.postMessage');
                var parentContainer = $(currentControl).parent().parent();
                var message = parentContainer.find('.msgContent').text();

                selectedMessage = message;
                selectedPostID = parentContainer.find('.msgContent').data('msgid');
                mediaPostID = parentContainer.find('.msgContent').data('msgpostid');
                resultID = parentContainer.find('.msgContent').data('resultid');

                var res = selectedMessage.substr(0, 35);

                //$('#lblCurrentPost').text(res + "...");
                $('.postContent').val(message);
                //document.getElementById(lblCurrentSelectedPost).value = res + "...";

                document.getElementById(lblCurrentSelectedPost).value = res + "...";

                document.getElementById(hdnMessageID).value = resultID;

                FormFieldComplete();
            },


            GetSuggestions: function () {
                SocialFeedShare.config.url = SocialFeedShare.config.baseURL + "GetTopSuggestions";
                SocialFeedShare.config.data = {};
                SocialFeedShare.config.ajaxCallMode = SocialFeedShare.GetSuggestionCallBack;
                SocialFeedShare.config.async = false;
                SocialFeedShare.ajaxCall(SocialFeedShare.config);
            },


            GetSuggestionCallBack: function (data) {
                if (data.d != null || data.d != '') {
                    var searchItems = data.d;
                    var html = '';
                    for (var i = 0; i < searchItems.length; i++) {
                        html += SocialFeedShare.GeneratePostTemplate(searchItems[i]);
                    }
                    $('#searchContainer').html(html);
                }
            },


            GeneratePostTemplate: function (response) {

                var html = '';
                html += '<div class="postMessage">';
                html += "    <div class='msgContent' data-resultid='" + response.ResultID + "' data-msgid='" + response.MessageID + "'  data-msgpostid='" + response.MediaPostID + "' >" + response.Message + "</div>";
                html += '    <div class="postActions">';
                html += "        <div class='total-shares'>" + response.Share_Count + " <span> Shares</span></div>";
                html += "        <div class='source twitter'> <span>(" + response.Lang + ")</span> </div>";
                html += "        <div class='total-favorites'>" + response.Favourite_Count + "<span>Favourites  </span> </div>";
                html += '    </div>';
                html += '    <div class="reportingTags">';
                html += '        <div ><span>User : </span>' + response.UsrName + " (" + response.UsrScreenName + ")" + ' - ' + response.UsrLocation + '</div>';
                html += '        <div ><span> Type : </span>' + response.ResultType + "</div>";
                html += "        <div>" + "<span> Created On : </span>" + response.CreatedOn + '</div>';
                html += "        <button type='button' class='btnSharePost icon-edit sfBtn smlbtn-primary' >Edit</button>";
                html += '    </div>';
                html += '</div>';

                return html;
            },

            ClearControls: function () {

                selectedMessage = "";
                selectedPostID = "";
                mediaPostID = "";
                resultID = "";

                //$('.postContent').val('');
                //$('.postTitle').val('');
            },

            GenerateFieldSetWithKeyValue: function (header, htmlValueContent, inputType) {

                var html = '';
                html += '<div class="sfFieldset">';
                if (inputType === 'checkbox') {
                    html += '    <div class="formKey">';
                    html += '        <span class="sfFormlabel">' + header + ' </span>';
                    html += '             ' + htmlValueContent;
                    html += '    </div>';
                }
                else {
                    html += '    <div class="formKey">';
                    html += '        <span class="sfFormlabel">' + header + ' </span>';
                    html += '    </div>';
                    html += '    <div class="formValue">';
                    html += '         ' + htmlValueContent;
                    html += '    </div>';
                }
                html += '</div>';
                return html;

            },

            DisplayMediaSettings: function (caller) {

                $('.sfDivFlying .mediaSettingElement').empty();

                $('.hNewItem').html('Social Share Settings');

                var html = '';
                var content = '';
                // FACEBOOK

                html += '<input type="checkbox" id="cbFacebook" class="sfCheckbox " />';
                html += '<label for="cbFacebook">Facebook </label>';

                html += '<div class="fbSettings sfFormwrapper">';

                content = '<input type="text" id="txtFacebookAppID" class="sfInputbox" placeHolder="Enter your app id" />';
                html += SocialFeedShare.GenerateFieldSetWithKeyValue('App ID: ', content, 'default');

                content = '<input type="text" id="txtFacebookAppSecret" class="sfInputbox" placeHolder="Enter your app secret" />';
                html += SocialFeedShare.GenerateFieldSetWithKeyValue('App Secret: ', content, 'default');

                html += '</div>';


                // TWITTER

                html += '    <input type="checkbox" id="cbTwitter" class="sfCheckbox " />';
                html += '<label for="cbTwitter">Twitter</label>';

                html += '<div class="twSettings sfFormwrapper">';

                content = '<input type="text" id="txtTwitterConsumerKey" class="sfInputbox" placeHolder="Enter your consumer key" />';
                html += SocialFeedShare.GenerateFieldSetWithKeyValue('Consumer Key: ', content, 'default');

                content = '<input type="text" id="txtTwitterConsumerSecret" class="sfInputbox" placeHolder="Enter your consumer secret " />';
                html += SocialFeedShare.GenerateFieldSetWithKeyValue('Consumer Secret: ', content, 'default');

                html += '</div>';

                // LINKED IN

                html += '    <input type="checkbox" id="cbLinkedIn" class="sfCheckbox " />';
                html += '<label for="cbLinkedIn">LinkedIn</label>';

                html += '<div class="lnSettings sfFormwrapper">';


                content = '<input type="text" id="txtLinkedInAppID" class="sfInputbox" placeHolder="Enter your app id" />';
                html += SocialFeedShare.GenerateFieldSetWithKeyValue('App ID: ', content, 'default');

                content = '<input type="text" id="txtLinkedInAppSecret" class="sfInputbox" placeHolder="Enter your app secret" />';
                html += SocialFeedShare.GenerateFieldSetWithKeyValue('App Secret: ', content, 'default');

                content = '<input type="text" id="txtLinkedInCompanyID" class="sfInputbox" placeHolder="Enter your company page id" />';
                html += SocialFeedShare.GenerateFieldSetWithKeyValue('Company ID: ', content, 'default');

                html += '</div>';

                $('.sfDivFlying .mediaSettingElement').html(html);
                LabelAfterCheckBox();

                $("#cbFacebook").change(function () {
                    $('.fbSettings').toggle(this.checked);
                });

                $("#cbTwitter").change(function () {
                    $('.twSettings').toggle(this.checked);
                });

                $("#cbLinkedIn").change(function () {
                    $('.lnSettings').toggle(this.checked);
                });

                SocialFeedShare.LoadSocialShareSettings();
                SocialFeedShare.LoadFlyer(caller);

                FormFieldComplete();


            },


            LoadSocialShareSettings: function () {

                if (socialFeedSettings) {

                    if (socialFeedSettings.EnableFacebook === true) $('#cbFacebook').prop('checked', socialFeedSettings.EnableFacebook);

                    if (socialFeedSettings.EnableTwitter) $('#cbTwitter').prop('checked', socialFeedSettings.EnableTwitter);

                    if (socialFeedSettings.EnableLinkedIn) $('#cbLinkedIn').prop('checked', socialFeedSettings.EnableLinkedIn);

                    if (socialFeedSettings.FBAppID) $('#txtFacebookAppID').val(socialFeedSettings.FBAppID);

                    if (socialFeedSettings.FBAppSecret) $('#txtFacebookAppSecret').val(socialFeedSettings.FBAppSecret);

                    if (socialFeedSettings.TwitterConsumerKey) $('#txtTwitterConsumerKey').val(socialFeedSettings.TwitterConsumerKey);

                    if (socialFeedSettings.TwitterConsumerSecret) $('#txtTwitterConsumerSecret').val(socialFeedSettings.TwitterConsumerSecret);

                    if (socialFeedSettings.LinkedInAppID) $('#txtLinkedInAppID').val(socialFeedSettings.LinkedInAppID);

                    if (socialFeedSettings.LinkedInAppSecret) $('#txtLinkedInAppSecret').val(socialFeedSettings.LinkedInAppSecret);

                    if (socialFeedSettings.LinkedInCompanyID) $('#txtLinkedInCompanyID').val(socialFeedSettings.LinkedInCompanyID);

                }

                $('.fbSettings').toggle(socialFeedSettings.EnableFacebook);
                $('.twSettings').toggle(socialFeedSettings.EnableTwitter);
                $('.lnSettings').toggle(socialFeedSettings.EnableLinkedIn);


            },

            NotifySF: function (message, msgType) {
                SageFrame.messaging.show(message, msgType);
            },

            UpdateSocialShareSettings: function () {
                $('.sfMessage').trigger('click');

                var enableFb = $('#cbFacebook').prop('checked');

                var fbAppID = $('#txtFacebookAppID').val();
                if (enableFb && (fbAppID == null || fbAppID == '')) {
                    SocialFeedShare.NotifySF('Facebook App ID is missing', 'Error');
                    return;
                }

                var fbAppSecret = $('#txtFacebookAppSecret').val();
                if (enableFb && (fbAppSecret == null || fbAppSecret == '')) {
                    SocialFeedShare.NotifySF('Facebook App Secret is required', 'Error');
                    return;
                }

                var enableTwitter = $('#cbTwitter').prop('checked');

                var twConsumerKey = $('#txtTwitterConsumerKey').val();
                if (enableTwitter && (twConsumerKey == null || twConsumerKey == '')) {
                    SocialFeedShare.NotifySF('Twitter Consumer Key is required', 'Error');
                    return;
                }

                var twConsumerSecret = $('#txtTwitterConsumerSecret').val();
                if (enableTwitter && (twConsumerSecret == null || twConsumerSecret == '')) {
                    SocialFeedShare.NotifySF('Twitter Consumer Secret is required', 'Error');
                    return;
                }

                var enableLinkedIn = $('#cbLinkedIn').prop('checked');

                var lnAppID = $('#txtLinkedInAppID').val();
                if (enableLinkedIn && (lnAppID == null || lnAppID == '')) {
                    SocialFeedShare.NotifySF('LinkedIn App ID is required', 'Error');
                    return;
                }

                var lnAppSecret = $('#txtLinkedInAppSecret').val();
                if (enableLinkedIn && (lnAppSecret == null || lnAppSecret == '')) {
                    SocialFeedShare.NotifySF('LinkedIn App Secret is required', 'Error');
                    return;
                }

                var lnCompanyID = $('#txtLinkedInCompanyID').val();
                if (enableLinkedIn && (lnCompanyID == null || lnCompanyID == '')) {
                    SocialFeedShare.NotifySF('LinkedIn Company ID is required', 'Error');
                    return;
                }


                //debugger;

                var params = {
                    socialFeedSettings: {
                        EnableFacebook: enableFb,
                        FBAppID: fbAppID,
                        FBAppSecret: fbAppSecret,
                        EnableTwitter: enableTwitter,
                        TwitterConsumerKey: twConsumerKey,
                        TwitterConsumerSecret: twConsumerSecret,
                        EnableLinkedIn: enableLinkedIn,
                        LinkedInAppID: lnAppID,
                        LinkedInAppSecret: lnAppSecret,
                        LinkedInCompanyID: lnCompanyID
                    }
                };

                SocialFeedShare.config.url = SocialFeedShare.config.baseURL + "SaveSocialFeedSettings";
                SocialFeedShare.config.data = JSON2.stringify(params);
                SocialFeedShare.config.ajaxCallMode = SocialFeedShare.UpdateSocialShareSettingsCallBack;
                SocialFeedShare.config.async = false;
                SocialFeedShare.ajaxCall(SocialFeedShare.config);
            },


            UpdateSocialShareSettingsCallBack: function (data) {
                if (data.d) {
                    var returnCode = data.d;

                    if (returnCode === 1 || returnCode === 2) {
                        SocialFeedShare.NotifySF('Settings were updated successfully', 'Success');

                        SocialFeedShare.GetSocialFeedSettings();

                        $('#' + SocialFeedShare.config.divFB).toggle(socialFeedSettings.EnableFacebook);
                        $('#' + SocialFeedShare.config.divTwitter).toggle(socialFeedSettings.EnableTwitter);
                        $('#' + SocialFeedShare.config.divLinkedIn).toggle(socialFeedSettings.EnableLinkedIn);

                    }
                    else
                        SocialFeedShare.NotifySF('Error while updating the settings', 'Error');

                    //$('.sfMessage').trigger('click');
                }


            },

            LoadFlyer: function (caller) {
                $('.sfDivFlying').show();

                var top = caller.offset().top;
                var left = caller.offset().left;
                var height = caller.height();
                $('.sfDivFlying').offset(
                    {
                        top: (top + height + 9),
                        left: left - 256
                    });
            },


        };

        SocialFeedShare.init();
    }

    $.fn.SocialFeedShare = function (p) {
        $.SocialFeedShare(p);
    };

})(jQuery);


function VerifyContentMessage(evt, txtFeedContentID, currentHdnMessageID, lblCurrent) {
    var info = document.getElementById(txtFeedContentID).value;
    //var returnValue = info.localeCompare(selectedMessage);
    if (info !== selectedMessage) {
        selectedMessage = "";
        selectedPostID = "";
        mediaPostID = "";
        resultID = "";
        //$('#lblCurrentPost').text("-----");
        document.getElementById(lblCurrent).value = "----";

        document.getElementById(currentHdnMessageID).value = 0;

    }
    return true;
}