var AdvisionDetail;
(function ($) {

    var settingDetail = [];

    $.AdvisionDetail = function (p) {
        p = $.extend({
            modulePath: '',
            DataObj: ''
        }, p);
        AdvisionDetail = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: p.modulePath + 'Services/AdvisionDetail.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID
            },
            init: function () {
                AdvisionDetail.InitEvents();

                AdvisionDetail.ClearView();
                AdvisionDetail.EditKeywordSettings(false);

                AdvisionDetail.GetAdvisionSettings();
            },
            ajaxSuccess: function (data) { },
            ajaxFailure: function () { },
            ajaxCall: function (config) {
                $.ajax({
                    type: AdvisionDetail.config.type,
                    contentType: AdvisionDetail.config.contentType,
                    async: AdvisionDetail.config.async,
                    cache: AdvisionDetail.config.cache,
                    url: AdvisionDetail.config.url,
                    data: AdvisionDetail.config.data,
                    dataType: AdvisionDetail.config.dataType,
                    success: AdvisionDetail.config.ajaxCallMode,
                    error: AdvisionDetail.ajaxFailure
                });
            },

            ResetView: function () {
                AdvisionDetail.ClearView();
                AdvisionDetail.EditKeywordSettings(false);
                AdvisionDetail.GetAdvisionSettings();
            },

            GetAdvisionSettings: function () {

                AdvisionDetail.config.url = AdvisionDetail.config.baseURL + "GetAdvisionSettings";
                AdvisionDetail.config.data = JSON.stringify({
                    portalID: parseInt(SageFramePortalID),
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken,
                });
                AdvisionDetail.config.ajaxCallMode = AdvisionDetail.AdvisionSettingsCallBack;
                AdvisionDetail.config.async = false;
                AdvisionDetail.ajaxCall(AdvisionDetail.config);

            },

            ToTitleCase: function (str) {
                return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            },

            EditKeywordSettings: function (enable) {
                $('#viewAdvisionDetail').toggle(!enable);
                $('#editAdvisionDetail').toggle(enable);

            },

            AdvisionSettingsCallBack: function (data) {
                if (data.d !== null && data.d !== '' && data.d.length > 0) {

                    settingDetail = data.d;

                    for (var i = 0; i < settingDetail.length; i++) {

                        var key = settingDetail[i].AdvisionKey;
                        var keyType = key.toLowerCase();

                        var advisionID = settingDetail[i].AdvisionID;
                        var subjectID = settingDetail[i].SubjectID;
                        var subjectName = settingDetail[i].SubjectName;

                        var html = '';
                        html += '<span class="sfFormlabel advisionValue" data-advision="' + advisionID + '" data-subject="' + subjectID + '" >' + AdvisionDetail.ToTitleCase(subjectName) + '</span>';

                        switch (keyType) {

                            case 'sector': $('#divViewBusinessSectorValue').html(html); break;

                            case 'sitecategory': $('#divViewSiteCategoryValue').html(html); break;

                            case 'businesstype': $('#divViewBusinessTypesValue').append('<div>' + html + '</div>'); break;

                            case 'keyword': $('#divViewKeywordsValue').append('<div>' + html + '</div>'); break;

                            default: break;

                        }

                    }


                }
            },

            ClearView: function () {
                $('#divViewBusinessSectorValue').html('');
                $('#divViewSiteCategoryValue').html('');
                $('#divViewBusinessTypesValue').html('');
                $('#divViewKeywordsValue').html('');
            },

            InitEvents: function () {

                $('#btnEditKeywords').on('click', function () {
                    AdvisionDetail.EditKeywordSettings(true);
                    AdvisionDetail.GetKeywords();
                });

                $('#btnViewAdvisionDetail').on('click', function () {
                    AdvisionDetail.EditKeywordSettings(false);
                });

                $('#btnAdvisionDetailSaveSettings').on('click', function () {
                    AdvisionDetail.SaveSettings();
                });
            },

            GetKeywords: function () {
                var sectorID = $('#divViewBusinessSectorValue').find('.advisionValue').data('subject');
                var siteCategoryID = $('#divViewSiteCategoryValue').find('.advisionValue').data('subject');

                var businessTypes = [];

                $('#divViewBusinessTypesValue').find('.advisionValue').each(function () {
                    var subjectID = $(this).data('subject');
                    businessTypes.push(subjectID);
                });

                AdvisionDetail.config.url = AdvisionDetail.config.baseURL + "GetBusinessKeyWords";
                AdvisionDetail.config.data = JSON.stringify({
                    portalID: parseInt(SageFramePortalID),
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken,
                    sectorID: sectorID,
                    siteCatID: siteCategoryID,
                    businessTypeIDs: businessTypes
                });

                AdvisionDetail.config.ajaxCallMode = AdvisionDetail.LoadKeyWordsToChoose;
                AdvisionDetail.config.async = false;
                AdvisionDetail.ajaxCall(AdvisionDetail.config);

            },

            LoadKeyWordsToChoose: function (data) {

                if (data.d !== null && data.d !== '' && data.d.length > 0) {
                    var keywords = data.d;

                    var html = '';
                    if (keywords != null && keywords != '' && keywords.length > 0) {
                        for (var i = 0; i < keywords.length; i++) {
                            var current = keywords[i];
                            var keyword = current.Keyword;
                            var keywordID = current.KeywordID;
                            html += '<div id="colItem_' + keywordID + '" class="divColKeyword">';
                            html += '    <input type="checkbox" name="cbxFoundKeywords" value="' + keywordID + '" id="' + keyword + '" class="inpColItem">';
                            html += '    <label for="' + keyword + '" class="lblColItem">' + AdvisionDetail.ToTitleCase(keyword) + '</label>';
                            html += '</div>';
                        }
                    }

                    $('.divAdvisionEditDetail').html(html);

                    var userKeywords = $('#divViewKeywordsValue').find('.advisionValue');
                    var userKeywordLength = userKeywords.length;

                    var checkBoxes = $(".divAdvisionEditDetail input[name='cbxFoundKeywords']");
                    var checkBoxLength = checkBoxes.length;
                    for (var j = 0; j < checkBoxLength; j++) {
                        var checkBox = checkBoxes[j];

                        for (var k = 0; k < userKeywordLength ; k++) {

                            var userKeyword = userKeywords[k];
                            var keyWordContent = $(userKeyword).text().toLowerCase();
                            if (checkBox.id === keyWordContent)
                                $(checkBox).attr('checked', true);
                        }
                    }

                    LabelAfterCheckBox();

                }
            },

            SaveSettings: function () {
                //Sector Detail : "12,Tourism"
                //Site Cateogry Detail : "1002,Tour Navigation"
                //Business Type Detail : ["6,Tourist Guide", "9,Freelance Guide"] 
                //Keyword Detail : ["6,guide", "7,amusement park", "9,world heritages"]

                //$('#divViewBusinessSectorValue').find('.advisionValue').text()

                var sectorContainer = $('#divViewBusinessSectorValue').find('.advisionValue');
                var sectorDetail = sectorContainer.data('subject') + "," + sectorContainer.text();

                var siteCategoryContainer = $('#divViewSiteCategoryValue').find('.advisionValue');
                var siteCategoryDetail = siteCategoryContainer.data('subject') + "," + siteCategoryContainer.text();

                var businessTypesDetail = [];

                $('#divViewBusinessTypesValue').find('.advisionValue').each(function () {
                    var currentBusinessType = $(this);
                    var subjectID = currentBusinessType.data('subject');
                    var businessTypeName = currentBusinessType.text();

                    businessTypesDetail.push(subjectID + "," + businessTypeName);
                });

                var keywordDetail = [];

                $(".divAdvisionEditDetail input[name='cbxFoundKeywords']:checked").each(function () {

                    var keywordID = this.value;
                    var keywordName = this.id;
                    keywordDetail.push(keywordID + "," + keywordName);
                });


                AdvisionDetail.config.url = AdvisionDetail.config.baseURL + "SaveConfiguration";
                AdvisionDetail.config.data = JSON.stringify({
                    portalID: parseInt(SageFramePortalID),
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken,
                    sectorDetail: sectorDetail,
                    siteCategoryDetail: siteCategoryDetail,
                    businessTypesDetail: businessTypesDetail,
                    keywordDetail: keywordDetail
                });
                AdvisionDetail.config.ajaxCallMode = AdvisionDetail.SaveComplete;
                AdvisionDetail.config.async = false;
                AdvisionDetail.ajaxCall(AdvisionDetail.config);

            },

            SaveComplete: function (data) {

                if (data.d != null && data.d != '') {
                    var messageCode = data.d;
                    if (messageCode.Code > 0) {
                        AdvisionDetail.ResetView();
                        AdvisionDetail.NotifySF(messageCode.Message, "Success");
                    }
                    else
                        AdvisionDetail.NotifySF(messageCode.Message, "Error");
                } else {
                    AdvisionDetail.NotifySF('Unable to complete the request', "Error");
                }
            },
            NotifySF: function (message, msgType) {
                SageFrame.messaging.show(message, msgType);
            },

        };
        AdvisionDetail.init();
    }
    $.fn.AdvisionDetail = function (p) {
        $.AdvisionDetail(p);
    };
})(jQuery);
