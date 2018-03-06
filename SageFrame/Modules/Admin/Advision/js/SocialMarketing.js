/// <reference path="../../../../js/jquery-1.9.1.js" />

(function ($) {

    var keywordSelectMode = '';
    var keywordDetail;

    $.SocialMarketing = function (p) {
        p = $.extend(
            {
                modulePath: '', DataObj: '', portalID: 0, userModuleID: '', siteCategory: ''
            }, p);
        p.userModuleID = 1;
        var SocialMarketing = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: p.modulePath + 'Services/SocialMarketing.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID,
                masterDomain: p.MasterDomain,
                siteCategory: p.siteCategory
            },
            init: function () {
                SocialMarketing.GetKeywords();
                //SocialMarketing.ToogleChooseOption(true);
                SocialMarketing.BindEvents();
            },
            ajaxSuccess: function (data) { },
            ajaxFailure: function () { },
            ajaxCall: function (config) {
                $.ajax({
                    type: SocialMarketing.config.type,
                    contentType: SocialMarketing.config.contentType,
                    async: SocialMarketing.config.async,
                    cache: SocialMarketing.config.cache,
                    url: SocialMarketing.config.url,
                    data: SocialMarketing.config.data,
                    dataType: SocialMarketing.config.dataType,
                    success: SocialMarketing.config.ajaxCallMode,
                    error: SocialMarketing.ajaxFailure
                });
            },

            NotifySF: function (message, msgType) {
                $('#messageHolder').html('<span class="sfError">' + message + '</span>');
            },

            BindEvents: function () {

                $('#btnNextToChoosenPath').on('click', function () {
                    var identity = $('.activeSelection').attr('id');

                    if (identity == 'divChoose') SocialMarketing.PathChooser("choose");
                    else SocialMarketing.PathChooser("confused");

                });

                $('#divChoose').on('click', function () {
                    SocialMarketing.ToogleChooseOption(true);
                });

                $('#divConfused').on('click', function () {
                    SocialMarketing.ToogleChooseOption(false);
                });

                $('#backToMainChoose').on('click', function () {
                    SocialMarketing.PathChooser("backFromChoose");
                });

                $('#backToMainConfused').on('click', function () {
                    SocialMarketing.PathChooser("backFromConfused");
                });

                $('#btnNextToKeyWords').on('click', function () {
                    if (SocialMarketing.VerifyOnlinePresence()) {
                        keywordSelectMode = 'choose';
                        SocialMarketing.PathChooser("moveToKeyWords");
                    }
                });

                $('#btnHelpNextToKeywords').on('click', function () {
                    if (SocialMarketing.VeifyHelp()) {
                        keywordSelectMode = 'confused';
                        SocialMarketing.PathChooser("moveToKeyWords");
                    }
                });

                $('#backToChoose').on('click', function () {
                    SocialMarketing.PathChooser("backToChoose");
                });

                $('#btnHelpFind').on('click', function () {
                    $('#helpResultSiteCategory').toggle(false);
                    if (SocialMarketing.VerifyFinding())
                        SocialMarketing.ClearLowerControls(45);
                    SocialMarketing.FindResult();
                });

                $('#backToHelpChoose').on('click', function () {
                    SocialMarketing.PathChooser("searchAgain");
                });

                $('#btnFinalizeChoose').on('click', function () {
                    SocialMarketing.FinalizeChoice();
                });

                $('#slcHelpResultSector').on("change", function () {

                    //$('#slcHelpResultSector').off('change');
                    var sectorID = $('#slcHelpResultSector option:selected').val();
                    if (sectorID > 0) {
                        SocialMarketing.LoadFoundSiteCategories(sectorID);
                        $('#helpResultSiteCategory').toggle(true);

                        SocialMarketing.ClearLowerControls(5);
                    } else {
                        SocialMarketing.ClearLowerControls(45);
                    }
                });

                $('#slcHelpResultSiteCategory').on("change", function () {

                    var sectorID = $('#slcHelpResultSector option:selected').val();
                    var selectedSiteCat = $('#slcHelpResultSiteCategory option:selected');
                    var siteCategoryID = selectedSiteCat.val();
                    var siteSectorMapID = selectedSiteCat.data('ssmapid');

                    if (sectorID > 0 && siteCategoryID > 0) {
                        $('#helpResultBusinessType').toggle(true);
                        SocialMarketing.LoadFoundBusinessTypes(siteSectorMapID);
                    } else {
                        SocialMarketing.ClearLowerControls(5);
                    }
                });


            },

            SaveSettings: function (sectorIdentifer, siteCategoryIdentifer, businessTypeIdentifier, keywordIdentifier) {
                var categories = SocialMarketing.config.siteCategory.split(',');
                var sectorDetail = '';
                var siteCategoryDetail = '';
                var businessTypesDetail = [];
                var keywordDetail = [];


                var selectedSector = $(sectorIdentifer + ' option:selected');

                sectorDetail = categories[0] + "," + categories[1];
                var selectedSiteCateogry = $(siteCategoryIdentifer + ' option:selected');

                siteCategoryDetail = categories[2] + "," + categories[3];


                var selectedBusinessTypeComp = $(businessTypeIdentifier + " :selected");
                businessTypesDetail.push(categories[4] + "," + categories[5]);

                var foundKeyWordComp = $(keywordIdentifier + " input[name='cbxFoundKeywords']:checked");

                foundKeyWordComp.each(function () {
                    keywordDetail.push(this.value + "," + this.id);
                });
                SocialMarketing.config.url = SocialMarketing.config.baseURL + "SaveConfiguration";
                SocialMarketing.config.data = JSON.stringify({
                    portalID: parseInt(SageFramePortalID),
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken,
                    sectorDetail: sectorDetail,
                    siteCategoryDetail: siteCategoryDetail,
                    businessTypesDetail: businessTypesDetail,
                    keywordDetail: keywordDetail
                });
                SocialMarketing.config.ajaxCallMode = SocialMarketing.FinalizeComplete;
                SocialMarketing.config.async = false;
                SocialMarketing.ajaxCall(SocialMarketing.config);

            },


            FinalizeChoice: function () {

                if (keywordSelectMode === 'choose') {
                    SocialMarketing.SaveSettings('#slcSiteSector', '#slcSiteCategory', '#divBusinessTypeComponents', '#divPersonalKeywords');
                } else {
                    SocialMarketing.SaveSettings('#slcHelpResultSector', '#slcHelpResultSiteCategory', '#divHelpResultBusinessTypeComponents', '#divPersonalKeywords');
                }

            },

            FinalizeComplete: function (data) {
                var respose = data.d;
                if (respose.Code == 1) {
                    $('#messageHolder').html('<span class="messagearea">You have successfully configured your site type. </span>');
                    $('#divSocialMarketingSection').hide();
                    window.location = window.location.href;
                }
            },

            DisplayMessageCode: function (message) {
                if (message != null && message != '') {
                    if (message.Code > 0)
                        SocialMarketing.NotifySF(message.Message, "Success");
                    else
                        SocialMarketing.NotifySF(message.Message, "Error");
                }
            },


            VerifyFinding: function () {
                var len = $("#divHelpContainer input[name='cbxKeywords']:checked").length;

                if (len <= 0) {
                    SocialMarketing.NotifySF('You have not choosen anything yet.', "Error");
                    return false;
                }

                $('.sfMessage').trigger('click');
                return true;
            },

            FindResult: function () {

                var selectedKeywords = '';

                $("#divHelpContainer input[name='cbxKeywords']:checked").each(function () {
                    selectedKeywords += this.value + ',';
                });
                SocialMarketing.config.url = SocialMarketing.config.baseURL + "FindByKeywords";
                SocialMarketing.config.data = JSON.stringify({
                    portalID: parseInt(SageFramePortalID),
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken,
                    keywordIDs: selectedKeywords
                });
                SocialMarketing.config.ajaxCallMode = SocialMarketing.LoadFindings;
                SocialMarketing.config.async = false;
                SocialMarketing.ajaxCall(SocialMarketing.config);
            },

            LoadFindings: function (data) {

                if (data.d !== null && data.d !== '') {
                    keywordDetail = data.d;

                    if (keywordDetail.Sectors !== null && keywordDetail.Sectors.length > 0) {

                        var foundSectors = keywordDetail.Sectors;
                        var html = '';
                        html += '<option value="0">Choose your Business Sector</option>';;
                        if (foundSectors != null && foundSectors != '' && foundSectors.length > 0)
                            for (var i = 0; i < foundSectors.length; i++)
                                html += '<option value="' + foundSectors[i].SectorTypeID + '">' + foundSectors[i].TypeName + '</option>';

                        $('#slcHelpResultSector').html(html);

                        $('#searchCount').html(keywordDetail.Sectors.length);
                        SocialMarketing.PathChooser("findResult");


                    } else {
                        SocialMarketing.NotifySF('Please provide some more topics to search from !!', 'Error');
                    }
                } else {
                    SocialMarketing.NotifySF('Please provide some more topics to search from !!', 'Error');
                }
            },

            LoadFoundSiteCategories: function (sectorID) {

                var html = '';
                html += '<option value="0">Choose your site category</option>';

                var secID = parseInt(sectorID);
                if (keywordDetail !== null && keywordDetail !== '') {

                    var foundSiteCategories = keywordDetail.SiteCategories;

                    if (foundSiteCategories !== null && foundSiteCategories.length > 0) {
                        for (var i = 0; i < foundSiteCategories.length; i++) {
                            var current = foundSiteCategories[i];

                            if (current.SectorTypeID === secID) {
                                html += '<option data-ssmapid="' + current.SiteSectorMapID + '" value="' + current.SiteTypeID + '">' + SocialMarketing.ToTitleCase(current.TypeName) + '</option>';
                            }
                        }

                        $('#slcHelpResultSiteCategory').html(html);

                    }
                    else {
                        $('#slcHelpResultSiteCategory').html(html);
                        SocialMarketing.NotifySF('Unable to find any related site categories', 'Error');
                        SocialMarketing.ClearLowerControls(5);
                    }
                }
            },

            LoadFoundBusinessTypes: function (siteSectorMapID) {

                var siteSecMapID = parseInt(siteSectorMapID);

                if (keywordDetail !== null && keywordDetail !== '') {
                    var businessTypes = keywordDetail.BusinessTypes;

                    var html = '';

                    if (businessTypes != null && businessTypes != '' && businessTypes.length > 0) {
                        html += '<select size="' + businessTypes.length + '" id="tableContainer" multiple="multiple"  class="sfListmenubig tableContainer" >';
                        for (var i = 0; i < businessTypes.length; i++) {
                            var current = businessTypes[i];
                            if (current.SiteSectorMapID == siteSecMapID)
                                html += '<option value="' + current.BusinessTypeID + '">' + SocialMarketing.ToTitleCase(current.TypeName) + '</option>';
                        }
                        html += '</select>';
                    } else {
                        SocialMarketing.NotifySF('Unable to find any related business types', 'Error');
                    }

                    $('#divHelpResultBusinessTypeComponents').html(html);
                } else {
                    SocialMarketing.NotifySF('Unable to find any related business types', 'Error');
                }

            },


            VeifyHelp: function () {

                var sectorID = $('#slcHelpResultSector option:selected').val();
                if (sectorID <= 0) {
                    SocialMarketing.NotifySF('Please choose your business sector.', "Error");
                    return false;
                }

                var siteCategoryID = $('#slcHelpResultSiteCategory option:selected').val();

                if (siteCategoryID <= 0) {
                    SocialMarketing.NotifySF('You have not defined you site.', "Error");
                    return false;
                }

                var selectedBusinessTypes = $("#divHelpResultBusinessTypeComponents :selected").length;

                if (selectedBusinessTypes <= 0) {
                    SocialMarketing.NotifySF('Choose at-least one business type.', "Error");
                    return false;
                }

                $('.sfMessage').trigger('click');
                return true;


            },
            VerifyOnlinePresence: function () {

                var sectorID = $('#slcSiteSector option:selected').val();
                if (sectorID <= 0) {
                    SocialMarketing.NotifySF('Please choose your business sector.', "Error");
                    return false;
                }

                var siteCategoryID = $('#slcSiteCategory option:selected').val();

                if (siteCategoryID <= 0) {
                    SocialMarketing.NotifySF('You have not defined you site.', "Error");
                    return false;
                }

                var selectedBusinessTypes = $("#divBusinessTypeComponents :selected").length;

                if (selectedBusinessTypes <= 0) {
                    SocialMarketing.NotifySF('Choose atleast one business type.', "Error");
                    return false;
                }


                $('.sfMessage').trigger('click');
                return true;
            },

            GetHelpContainer: function () {

                SocialMarketing.config.url = SocialMarketing.config.baseURL + "GetAvailableKeywords";
                SocialMarketing.config.data = JSON.stringify({
                    portalID: parseInt(SageFramePortalID),
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken
                });
                SocialMarketing.config.ajaxCallMode = SocialMarketing.LoadAvailableKeyword;
                SocialMarketing.config.async = false;
                SocialMarketing.ajaxCall(SocialMarketing.config);

            },
            LoadAvailableKeyword: function (data) {

                if (data.d !== null && data.d !== '' && data.d.length > 0) {

                    $('.sfMessage').trigger('click');
                    var availableWords = data.d;
                    var html = '';

                    if (availableWords != null && availableWords != '' && availableWords.length > 0) {
                        for (var i = 0; i < availableWords.length; i++) {

                            html += '<div class="divColKeywordChoose">';

                            html += '    <input id="cbxK_' + i + '" type="checkbox" name="cbxKeywords" value="' + availableWords[i].KeywordID + '">';
                            html += '    <label for="cbxK_' + i + '" class="lblColItem">' + SocialMarketing.ToTitleCase(availableWords[i].Keyword) + '</label>';
                            html += '</div>';

                        }
                    }
                    $('#divHelpContainer').html(html);

                } else {
                    $('#divHelpContainer').html('');
                    SocialMarketing.NotifySF('No topics are available at the moment. Please try again later', 'Error');
                }

            },


            GetBusinessSectors: function () {
                SocialMarketing.config.url = SocialMarketing.config.baseURL + "GetSectorType";

                SocialMarketing.config.data = JSON.stringify({
                    portalID: parseInt(SageFramePortalID),
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken
                });


                SocialMarketing.config.ajaxCallMode = SocialMarketing.LoadBusinessSectors;
                SocialMarketing.config.async = false;
                SocialMarketing.ajaxCall(SocialMarketing.config);
            },
            LoadBusinessSectors: function (data) {

                if (data.d !== null && data.d !== '' && data.d.length > 0) {

                    var sectors = data.d;

                    var html = '';
                    html += '<option value="0">Choose your Business Sector</option>';;
                    if (sectors !== null && sectors !== '' && sectors.length > 0)
                        for (var i = 0; i < sectors.length; i++)
                            html += '<option value="' + sectors[i].SectorTypeID + '">' + sectors[i].TypeName + '</option>';

                    $('#slcSiteSector').html(html);

                    $('#slcSiteSector').on("change", function () {

                        $('#slcSiteCategory').off('change');

                        var sectorID = $('#slcSiteSector option:selected').val();

                        if (sectorID > 0) {
                            SocialMarketing.GetSiteCategory(sectorID);
                            $('#divSiteCategory').toggle(true);
                            SocialMarketing.ClearLowerControls(3);
                        } else {
                            SocialMarketing.ClearLowerControls(23);
                        }
                    });
                }
                else {
                    SocialMarketing.NotifySF('Unable to fetch business sectors', 'Error');
                }
            },


            ToTitleCase: function (str) {
                return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            },


            GetSiteCategory: function (sectorID) {
                SocialMarketing.config.url = SocialMarketing.config.baseURL + "GetSiteTypes";
                SocialMarketing.config.data = JSON.stringify({
                    portalID: parseInt(SageFramePortalID),
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken,
                    sectorID: sectorID
                });
                SocialMarketing.config.ajaxCallMode = SocialMarketing.BindSiteCategories;
                SocialMarketing.config.async = false;
                SocialMarketing.ajaxCall(SocialMarketing.config);
            },
            BindSiteCategories: function (data) {

                var html = '';
                html += '<option value="0">Choose your site category</option>';

                if (data.d !== null && data.d !== '' && data.d.length > 0) {

                    $('.sfMessage').trigger('click');

                    var siteCategories = data.d;


                    if (siteCategories != null && siteCategories != '' && siteCategories.length > 0)
                        for (var i = 0; i < siteCategories.length; i++)
                            html += '<option value="' + siteCategories[i].SiteTypeID + '">' + SocialMarketing.ToTitleCase(siteCategories[i].TypeName) + '</option>';

                    $('#slcSiteCategory').html(html);

                    $('#slcSiteCategory').on("change", function () {

                        var sectorID = $('#slcSiteSector option:selected').val();
                        var siteCategoryID = $('#slcSiteCategory option:selected').val();

                        if (siteCategoryID > 0) {
                            SocialMarketing.GetBusinessTypes(sectorID, siteCategoryID);
                            $('#divBusinessType').toggle(true);
                        }
                        else {
                            $('#divBusinessTypeComponents').html('');
                            $('#divBusinessType').toggle(false);
                        }
                    });

                } else {
                    $('#slcSiteCategory').html(html);
                    SocialMarketing.NotifySF('Unable to find any related site categories', 'Error');
                    SocialMarketing.ClearLowerControls(3);
                }

            },


            ClearLowerControls: function (clearLevel) {

                switch (clearLevel) {
                    case 1:
                        break;
                    case 2:
                        $('#slcSiteCategory').html('');
                        $('#divSiteCategory').toggle(false);
                        break;
                    case 3:
                        $('#divBusinessTypeComponents').html('');
                        $('#divBusinessType').toggle(false);
                        break;
                    case 23:
                        $('#slcSiteCategory').html('');
                        $('#divSiteCategory').toggle(false);
                        $('#divBusinessTypeComponents').html('');
                        $('#divBusinessType').toggle(false);
                        break;

                    case 4:
                        $('#slcHelpResultSiteCategory').html('');
                        $('#helpResultSiteCategory').toggle(false);
                        break;

                    case 5:
                        $('#divHelpResultBusinessTypeComponents').html('');
                        $('#helpResultBusinessType').toggle(false);
                        break;

                    case 45:
                        $('#slcHelpResultSiteCategory').html('');
                        $('#helpResultSiteCategory').toggle(false);
                        $('#divHelpResultBusinessTypeComponents').html('');
                        $('#helpResultBusinessType').toggle(false);
                        break;
                }
            },


            GetBusinessTypes: function (sectorID, siteCategoryID) {

                SocialMarketing.config.url = SocialMarketing.config.baseURL + "GetBusinessType";
                SocialMarketing.config.data = JSON.stringify({
                    portalID: parseInt(SageFramePortalID),
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken,
                    sectorID: sectorID,
                    siteCatID: siteCategoryID
                });
                SocialMarketing.config.ajaxCallMode = SocialMarketing.BindBusinessType;
                SocialMarketing.config.async = false;
                SocialMarketing.ajaxCall(SocialMarketing.config);
            },
            BindBusinessType: function (data) {

                if (data.d !== null && data.d !== '' && data.d.length > 0) {
                    $('.sfMessage').trigger('click');
                    var businessTypes = data.d;
                    var html = '';

                    if (businessTypes != null && businessTypes != '' && businessTypes.length > 0) {
                        html += '    <select size="' + businessTypes.length + '" id="tableContainer" multiple="multiple"  class="sfListmenubig tableContainer" >';
                        for (var i = 0; i < businessTypes.length; i++) {
                            var current = businessTypes[i];
                            html += '<option value="' + current.BusinessTypeID + '">' + SocialMarketing.ToTitleCase(current.TypeName) + '</option>';
                        }

                        html += '    </select>';
                    } else {
                        SocialMarketing.NotifySF('Unable to find any related business types', 'Error');
                    }


                    $('#divBusinessTypeComponents').html(html);
                } else {

                    var html = '';
                    html += '    <select size="0" id="tableContainer" multiple="multiple"  class="sfListmenubig tableContainer" >';
                    html += '    </select>';
                    $('#divBusinessTypeComponents').html(html);

                    SocialMarketing.NotifySF('Unable to find any related business types', 'Error');
                }
            },


            GetKeywords: function () {
                var categories = SocialMarketing.config.siteCategory.split(',');
                
                SocialMarketing.config.url = SocialMarketing.config.baseURL + "GetFrontBusinessKeyWords";
                SocialMarketing.config.data = JSON.stringify({
                    portalID: parseInt(SageFramePortalID),
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken,
                    sectorID: parseInt(categories[0]),
                    siteCatID: parseInt(categories[2]),
                    businessTypeIDs: parseInt(categories[4])
                });
                SocialMarketing.config.ajaxCallMode = SocialMarketing.LoadKeyWordsToChoose;
                SocialMarketing.config.async = true;
                SocialMarketing.ajaxCall(SocialMarketing.config);

            },

            LoadKeyWordsToChoose: function (data) {

                if (data.d !== null && data.d !== '' && data.d.length > 0) {

                    $('.sfMessage').trigger('click');
                    var keywords = data.d;

                    var html = '';
                    if (keywords != null && keywords != '' && keywords.length > 0) {
                        for (var i = 0; i < keywords.length; i++) {
                            var current = keywords[i];
                            var colName = current.Keyword;
                            var colID = current.KeywordID;
                            html += '<div id="colItem_' + colID + '" class="divColKeyword">';

                            html += '    <input type="checkbox" name="cbxFoundKeywords" value="' + colID + '" id="' + colName + '" class="inpColItem">';
                            html += '    <label for="' + colName + '" class="lblColItem">' + SocialMarketing.ToTitleCase(colName) + '</label>';
                            html += '</div>';

                            //html += '<input type="checkbox" data-keyword="' + current.Keyword + '" name="cbxFoundKeywords" value="' + current.KeywordID + '">' + SocialMarketing.ToTitleCase(current.Keyword) + '<br>';
                        }
                    }
                    $('#divPersonalKeywords').html(html);
                

                } else {
                    SocialMarketing.NotifySF('Unable to find any related business keywords', 'Error');

                }

            },


            PathChooser: function (opt) {

                var selectedEffect = 'slide';
                var options = {};

                switch (opt) {
                    case "choose":
                        $("#divChooser").toggle(selectedEffect, options, 500);
                        $("#divChoosePresenceContainer").toggle(selectedEffect, { direction: 'right' }, 500);

                        if ($('#divChoosePresenceContainer').is(":visible")) {
                            SocialMarketing.GetBusinessSectors();
                        } else {
                            //alert('Here');
                            // CLEAR CHOOSE DIV
                        }
                        break;


                    case "backFromChoose":
                        SocialMarketing.ClearChooserInnerContainer();
                        $("#divChooser").toggle(selectedEffect, options, 500);
                        $("#divChoosePresenceContainer").toggle(selectedEffect, { direction: 'right' }, 500);
                        break;


                    case "moveToKeyWords":
                        if (keywordSelectMode == 'choose') {
                            $("#divChoosePresenceContainer").toggle(selectedEffect, { direction: 'left' }, 500);
                            $("#divKeywordContainer").toggle(selectedEffect, { direction: 'right' }, 500);
                            SocialMarketing.GetKeywords();
                        } else {
                            $("#divHelpResultContainer").toggle(selectedEffect, { direction: 'left' }, 500);
                            $("#divKeywordContainer").toggle(selectedEffect, { direction: 'right' }, 500);
                            SocialMarketing.GetKeywords();
                        }
                        break;

                    case "backToChoose":
                        SocialMarketing.ClearKeywords();
                        if (keywordSelectMode == 'choose') {
                            $("#divChoosePresenceContainer").toggle(selectedEffect, { direction: 'left' }, 500);
                            $("#divKeywordContainer").toggle(selectedEffect, { direction: 'right' }, 500);
                        } else {
                            $("#divHelpResultContainer").toggle(selectedEffect, { direction: 'left' }, 500);
                            $("#divKeywordContainer").toggle(selectedEffect, { direction: 'right' }, 500);
                        }
                        break;


                    case "confused":
                        SocialMarketing.GetHelpContainer();
                        $("#divChooser").toggle(selectedEffect, options, 500);
                        $("#divHelpChooseContainer").toggle(selectedEffect, { direction: 'right' }, 500);
                        break;

                    case "backFromConfused":
                        $("#divChooser").toggle(selectedEffect, options, 500);
                        $("#divHelpChooseContainer").toggle(selectedEffect, { direction: 'right' }, 500);
                        break;


                    case "findResult":
                        $("#divHelpChooseContainer").toggle(selectedEffect, { direction: 'left' }, 500);
                        $("#divHelpResultContainer").toggle(selectedEffect, { direction: 'right' }, 500);
                        break;

                    case "searchAgain":
                        $("#divHelpChooseContainer").toggle(selectedEffect, { direction: 'left' }, 500);
                        $("#divHelpResultContainer").toggle(selectedEffect, { direction: 'right' }, 500);
                        break;
                }
            },

            ClearKeywords: function () { $('#divPersonalKeywords').html(''); },

            ClearChooserInnerContainer: function () {

                $('#slcSiteSector').html('');
                $('#slcSiteCategory').html('');
                $('#divBusinessTypeComponents').html('');

                $('#divSiteCategory').toggle(false);
                $('#divBusinessType').toggle(false);

            },


            ToogleChooseOption: function (enableChoose) {

                if (enableChoose) {
                    $('#divChoose').addClass('activeSelection');
                    $('#divConfused').removeClass('activeSelection');
                } else {
                    $('#divConfused').addClass('activeSelection');
                    $('#divChoose').removeClass('activeSelection');
                }
            }


        };



        SocialMarketing.init();
    }

    $.fn.SocialMarketing = function (p) {
        $.SocialMarketing(p);
    };

})(jQuery);
