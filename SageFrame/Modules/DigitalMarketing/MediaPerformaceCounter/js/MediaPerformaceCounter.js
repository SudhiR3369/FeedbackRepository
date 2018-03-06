/// <reference path="../../../../js/jquery-1.9.1.js" />
//References
//http://canvasjs.com/docs/charts/basics-of-creating-html5-chart/title/

var mediaTypes;
var attributeTypes;

var MediaPerformaceCounter;
(function ($) {
    var graphEnabled = false;
    var newPerformanceObjectType;
    var currentPfItem;
    var totalPosts;

    var mediaTypeFilter = ["google", "youtube", "pinterest", "instagram"];
    var attribFilters = ["comment", "follower", "connection", "viewer"];

    var currentLock;
    var dataArray = [];

    var graphComponents = [];

    $.MediaPerformaceCounter = function (p) {
        p = $.extend({
            modulePath: '', DataObj: '', portalID: 0, userModuleID: ''
        }, p);
        MediaPerformaceCounter = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: p.modulePath + 'Services/MediaPerformaceCounterService.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID
            },
            init: function () {

                SageFrame.tooltip.GetToolTip("imgPerformanceCounterInfo", ".pcHeader", "Measure the performance and observe feedbacks of activities in Social Medias ");
                SageFrame.tooltip.GetToolTip("imgSocialMediaAnalyzerHeaderInfo", ".socialMediaAnalyzerHeader", "Select an attribute from the 'Performance Counter' to visualize the related posts");

                $('.performanceCounterContainer').html('');

                graphComponents = [];
                dataArray = [];

                $('.pfCounterSetting').on('click', function () {
                    MediaPerformaceCounter.DisplayNewComponentFlyer($(this));
                });

                MediaPerformaceCounter.ImportTotalPostCounts();
                MediaPerformaceCounter.LoadMediaTypes();
                MediaPerformaceCounter.LoadMediaAttributes();

                MediaPerformaceCounter.InitEvents();
                MediaPerformaceCounter.ResetCurrentAttributes();
                MediaPerformaceCounter.RefreshPerformance();
                MediaPerformaceCounter.ApplyDropToGraphEvent();

            },
            ajaxSuccess: function (data) { },
            ajaxFailure: function () { },
            ajaxCall: function (config) {
                $.ajax({
                    type: MediaPerformaceCounter.config.type,
                    contentType: MediaPerformaceCounter.config.contentType,
                    async: MediaPerformaceCounter.config.async,
                    cache: MediaPerformaceCounter.config.cache,
                    url: MediaPerformaceCounter.config.url,
                    data: MediaPerformaceCounter.config.data,
                    dataType: MediaPerformaceCounter.config.dataType,
                    success: MediaPerformaceCounter.config.ajaxCallMode,
                    error: MediaPerformaceCounter.ajaxFailure
                });
            },

            InitEvents: function () {

                graphEnabled = false;

                $('.pfAddNewGraph').on('click', function () {
                    MediaPerformaceCounter.ToggleAnalyzer(graphEnabled);

                    if (totalPosts) MediaPerformaceCounter.RenderPieChart(totalPosts);
                    else MediaPerformaceCounter.RenderMultiLineChart();
                });

                $('#closeDivFlying').on('click', function () {
                    if (currentLock)
                        currentLock.removeClass("lockBox");
                    $('.sfDivFlying').hide();
                });

                $('#lblFlyingAddNew').on('click', function () { MediaPerformaceCounter.AddUpdatePerformanceCounterItem(0); });

                $('#btnReset').on('click', function () {
                    SageConfirmDialog('Do you wish to reset the social media analyzer ? ').done(function () {
                        MediaPerformaceCounter.ResetGraphControl();
                    });
                });

                $("#divDroppable").droppable({
                    accept: ".divDraggable",
                    drop: function (event, ui) {
                        var element = ui.draggable[0];
                        var identifier = element.id;
                        //var columnName = element.innerText.trim();
                        //AutomatedSearch.AppendColumnElement(columnName, columnName, identifier);
                    },
                    classes: {
                        "ui-droppable": "highlight"
                    }
                });

            },

            ToggleAnalyzer: function (enable) {
                graphEnabled = !enable;

                if (!enable) {
                    MediaPerformaceCounter.ResetAnalyzer();
                    //MediaPerformaceCounter.ResetGraphControl();
                }
                $('.divGraphContainer').toggle(graphEnabled);
            },

            ResetAnalyzer: function () {

                $('.slcGraphAttributeType').val(0);
                $('.graphItems').html('');
                $('.performanceCounterContainer').html('');
                dataArray = [];
                $('#customcanvas').html('');
                MediaPerformaceCounter.RefreshPerformance();
            },

            AddDraggable: function () {
                $(".divDraggable").draggable({
                    revert: function (droppableObj) {
                        return ((droppableObj === false));
                    },
                    helper: 'clone',
                    start: function () {
                        $(this).hide();
                    },
                    stop: function () {
                        $(this).show();
                    }
                });
            },

            ApplyDropToGraphEvent: function () {

                $(".divGraphDroppable").droppable({
                    accept: ".divDraggable",

                    drop: function (event, ui) {
                        var element = ui.draggable[0];
                        MediaPerformaceCounter.ApplyDropFunction(this, element);
                    },
                    classes: {
                        "ui-droppable": "highlight"
                    }
                });

                //$(".divGraphDroppable").sortable();
            },

            ApplyDropFunction: function (sender, element) {

                var selectedGraphAttribute = $('.slcGraphAttributeType').val();

                if (selectedGraphAttribute > 0) {
                    var supportedGraphType = $('.slcGraphAttributeType>option:selected').text();
                    supportedGraphType = supportedGraphType.toLowerCase();

                    var performanceID = $(element).data("performanceid");
                    var attributeName = $(element).data("pcattributename").toLowerCase();
                    var mediaType = $(element).data("pcmediatype");

                    debugger;

                    if (supportedGraphType.localeCompare(attributeName) === 0) {

                        MediaPerformaceCounter.config.url = MediaPerformaceCounter.config.baseURL + "GetMediaPostStatisticsForPerformanceCounter";
                        MediaPerformaceCounter.config.data = JSON.stringify({ performanceCounterID: performanceID });
                        MediaPerformaceCounter.config.ajaxCallMode = function (data) {

                            if (data.d != null && data.d != '' && data.d.length > 0) {
                                var info = data.d;

                                MediaPerformaceCounter.PushAndRender(info);

                                var item = $(".performanceCounterContainer").find("[data-performanceid='" + performanceID + "']");
                                var totalCount = $(item[0]).find('.pcCounter').text();
                                var html = MediaPerformaceCounter.CreateGraphItemTemplate(mediaType, performanceID, totalCount, attributeName);

                                MediaPerformaceCounter.SetGraphElement(html);
                                item.remove();
                            }

                        };
                        MediaPerformaceCounter.config.async = false;
                        MediaPerformaceCounter.ajaxCall(MediaPerformaceCounter.config);

                    }
                    else {
                        MediaPerformaceCounter.NotifySF('This counter type is not supported by the graph.', 'error');
                    }
                }
                else {
                    MediaPerformaceCounter.NotifySF('Please select the attribute to be analyzed from the Performance Graph.', 'error');
                }
            },

            TriggerPiePieceClick: function (sender, e) {

                var selectedGraphAttribute = $('.slcGraphAttributeType').val();

                if (selectedGraphAttribute > 0) {
                    var supportedGraphType = $('.slcGraphAttributeType>option:selected').text();
                    supportedGraphType = supportedGraphType.toLowerCase();

                    var performanceID = sender.performanceCounterID;
                    var attributeName = sender.attributeName.toLowerCase();
                    var mediaType = sender.mediaTypeName;
                    var totalCount = sender.count;


                    var exists = false;
                    $(".graphItems").children().each(function () {

                        var closest = $(this).closest('.graphElement');
                        var title = closest[0].outerText.trim();

                        if (title === mediaType) {
                            exists = true;
                        }

                    });

                    if (!exists)
                        if (supportedGraphType.localeCompare(attributeName) === 0) {
                            MediaPerformaceCounter.config.url = MediaPerformaceCounter.config.baseURL + "GetMediaPostStatisticsForPerformanceCounter";
                            MediaPerformaceCounter.config.data = JSON.stringify({ performanceCounterID: performanceID });
                            MediaPerformaceCounter.config.ajaxCallMode = function (data) {

                                if (data.d != null && data.d != '' && data.d.length > 0) {

                                    var info = data.d;
                                    MediaPerformaceCounter.PushAndRender(info);

                                    var html = MediaPerformaceCounter.CreateGraphItemTemplate(mediaType, performanceID, totalCount, attributeName);
                                    MediaPerformaceCounter.SetGraphElement(html);

                                    // Change Color or the label and re-render
                                    //item.remove();
                                }

                            };
                            MediaPerformaceCounter.config.async = false;
                            MediaPerformaceCounter.ajaxCall(MediaPerformaceCounter.config);

                        }
                        else {
                            MediaPerformaceCounter.NotifySF('This counter type is not supported by the graph.', 'error');
                        }


                }
                else {
                    MediaPerformaceCounter.NotifySF('Please select an attribute type from the "Performance Graph"  before proceeding.', 'error');
                }
            },

            CreateGraphItemTemplate: function (mediaType, performanceID, count, attributeName) {
                var atbName = attributeName.trim().toLowerCase();
                var socialMediaType = mediaType.trim().toLowerCase();

                var html = '';
                html += '<li class="graphElement" data-pcmediatype="' + socialMediaType + '" data-pccount="' + count + '" data-performanceid="' + performanceID + '"  data-pcattributename="' + atbName + '">';
                html += '    <label class="socialMediaType" title="Total: ' + count + '">' + socialMediaType + '</label>';
                html += '    <span class="icon-close removeGraphElement"></span>';
                html += '</li>';
                return html;
            },

            SetGraphElement: function (data) {
                $('.graphItems').append(data);

                $('.removeGraphElement').off().on('click', function () {

                    var container = $(this).closest('.graphElement');
                    var performanceID = container.data('performanceid');
                    var attributeName = container.data('pcattributename');
                    var mediaType = $(container.find('.socialMediaType')).text();
                    var count = container.data('pccount');

                    //var html = MediaPerformaceCounter.CreateNewPerformanceCounter(mediaType, performanceID, count, attributeName);
                    //MediaPerformaceCounter.SetPerformanceCounterElements(html);

                    container.remove();

                    dataArray = dataArray.filter(function (item) { return item.key !== mediaType; });

                    MediaPerformaceCounter.RenderMultiLineChart();

                });
            },

            RefreshPerformance: function () {
                MediaPerformaceCounter.config.url = MediaPerformaceCounter.config.baseURL + "LoadMediaPerformaceCounter";
                MediaPerformaceCounter.config.data = JSON.stringify({ userModuleID: this.config.userModuleID });
                MediaPerformaceCounter.config.ajaxCallMode = MediaPerformaceCounter.LoadMediaPerformaceCounterCallBack;
                MediaPerformaceCounter.config.async = false;
                MediaPerformaceCounter.ajaxCall(MediaPerformaceCounter.config);
            },

            LoadMediaPerformaceCounterCallBack: function (data) {

                if (data.d != null && data.d != '' && data.d.length > 0) {

                    var pCounterItems = data.d;

                    //debugger;

                    var groups = [];
                    var groupsLength = groups.length;
                    for (var i = 0; i < pCounterItems.length; i++) {

                        var item = pCounterItems[i];



                        var itemAdded = false;
                        for (var j = 0; j < groups.length; j++) {
                            if (groups[j].title === item.MediaTypeName) {

                                itemAdded = true;
                                groups[j].attribs.push({
                                    attributeID: item.MediaAttributeID,
                                    attributeName: item.MediaAttributeName,
                                    mediaTypeName: item.MediaTypeName,
                                    mediaTypeID: item.MediaTypeID,
                                    performanceCounterID: item.PerformanceCounterID,
                                    count: item.StatsCount <= 0 ? 0 : item.StatsCount,
                                    typeAttributeMapID: item.TypeAttributeMapID
                                });
                            }
                        }

                        if (!itemAdded) {
                            groups.push({
                                title: item.MediaTypeName,
                                attribs: [{
                                    attributeID: item.MediaAttributeID,
                                    attributeName: item.MediaAttributeName,
                                    mediaTypeName: item.MediaTypeName,
                                    mediaTypeID: item.MediaTypeID,
                                    performanceCounterID: item.PerformanceCounterID,
                                    count: item.StatsCount <= 0 ? 0 : item.StatsCount,
                                    typeAttributeMapID: item.TypeAttributeMapID
                                }]
                            });
                        }

                    }

                    // Create Graph For each
                    var htmlGraph = '';
                    var newGroupLength = groups.length;
                    for (var i = 0; i < newGroupLength; i++) {
                        htmlGraph += '<div id="customcanvas_' + groups[i].title + '" class="divPCItem">';
                        htmlGraph += '</div>';
                    }

                    $('.performanceCounterContainer').append(htmlGraph); // Assign HTML 


                    MediaPerformaceCounter.RenderPerformanceCounterElements(groups); // Render Multi Performance Counters


                    for (var i = 0; i < groups.length; i++) {
                        $('#customcanvas_' + groups[i].title).find('.canvasjs-chart-canvas').attr('height', '200px');

                    }

                    $('.divPCItem').height('200px');


                    //var html = '';
                    //for (var counterItem = 0; counterItem < pCounterItems.length; counterItem++) {
                    //    var mediaType = pCounterItems[counterItem].MediaTypeName;
                    //    var attributeName = pCounterItems[counterItem].MediaAttributeName;
                    //    var performanceCounterID = pCounterItems[counterItem].PerformanceCounterID;
                    //    var statsCount = pCounterItems[counterItem].StatsCount;
                    //    html += MediaPerformaceCounter.CreateNewPerformanceCounter(mediaType, performanceCounterID, statsCount, attributeName);
                    //}

                    //MediaPerformaceCounter.SetPerformanceCounterElements(html);
                    //$("#divDroppable").sortable();

                } else {

                }
            },

            AddUpdatePerformanceCounterItem: function (performanceCountID) {
                switch (newPerformanceObjectType) {
                    case "counter": {

                        var selectedAttributeType = $('.selMediaAttributeType option:selected');
                        var attributeTypeMapID = selectedAttributeType.val();

                        if (attributeTypeMapID > 0) {
                            MediaPerformaceCounter.config.url = MediaPerformaceCounter.config.baseURL + "AddUpdatePerformanceCounterItem";
                            MediaPerformaceCounter.config.data = JSON.stringify({
                                performanceID: performanceCountID,
                                userModuleID: this.config.userModuleID,
                                mTypeAttributeMapID: attributeTypeMapID
                            });
                            MediaPerformaceCounter.config.ajaxCallMode = MediaPerformaceCounter.AddUpdatePerformanceCounterCallBack;
                            MediaPerformaceCounter.config.async = false;
                            MediaPerformaceCounter.ajaxCall(MediaPerformaceCounter.config);

                        }
                        else {
                            MediaPerformaceCounter.NotifySF('Please select a measurement type', 'error');
                        }
                    } break;

                    case "graph": {
                        var graphTitle = $('.txtGraphTitle').val();

                        var filterType = $('.selFilterType option:selected');
                        var filterTypeID = filterType.val();





                    } break;

                    case "group": break;



                }


            },

            AddUpdatePerformanceCounterCallBack: function (data) {

                if (data.d) {
                    var returnValue = data.d;

                    switch (returnValue) {

                        case 1:
                            {
                                var selectedMediaType = $(".selMediaType option:selected");
                                var mediaTypeID = selectedMediaType.val();
                                var mediaTypeName = selectedMediaType.text();

                                var selectedAttributeType = $('.selMediaAttributeType option:selected');
                                var attributeTypeMapID = selectedAttributeType.val();
                                var attributeName = selectedAttributeType.text();

                                $('.performanceCounterContainer').html('');
                                MediaPerformaceCounter.RefreshPerformance();

                                $('.sfDivFlying').hide();
                            }

                            MediaPerformaceCounter.NotifySF("New Performance Counter added successfully.", "success"); break;

                        case 2: MediaPerformaceCounter.NotifySF("Performance Counter update successfull.", "error"); break;

                        case -3: MediaPerformaceCounter.NotifySF("You can not add a similar item multiple times.", "error"); break;

                        case -1: MediaPerformaceCounter.NotifySF("Unexpected error", "error"); break;

                        default: MediaPerformaceCounter.NotifySF("Unknown error", "error"); break;
                    }

                }

            },

            SetPerformanceCounterElements: function (data) {

                $('.performanceCounterContainer').append(data); // Assign HTML 

                $(".pcItem").mouseenter(function () {
                    $(this).find('.pcItemSettings').toggle(true);
                });

                $(".pcItem").mouseleave(function () {
                    $(this).find('.pcItemSettings').toggle(false);
                });

                $('.pcItem .deletePCItem').on('click', function () {
                    MediaPerformaceCounter.RemoveCounterItem(this);
                });

                MediaPerformaceCounter.AddDraggable();

            },

            CreateNewPerformanceCounter: function (mediaType, performanceID, count, attributeName) {

                var atbName = attributeName.trim().toLowerCase();
                var socialMediaType = mediaType.trim().toLowerCase();

                var html = '';
                html += '<div class="pcItem  divDraggable" data-performanceid="' + performanceID + '" data-pcattributename="' + atbName + '" data-pcmediatype="' + socialMediaType + '">';
                html += '<div class="thumbnail">';
                html += '    <div class="head-right pcItemSettings" style="display: none;">';
                html += '    <ul>';
                html += '        <li><span><i class="fa fa-times deletePCItem" aria-hidden="true"></i></span></li>';
                html += '    </ul>';
                html += '    </div>';

                var iconType = '';
                switch (socialMediaType) {
                    case 'twitter': iconType = 'fa-twitter'; break;
                    case 'facebook': iconType = 'fa-facebook'; break;
                    case 'google': iconType = 'fa-google-plus'; break;
                    case 'linkedin': iconType = 'fa-linkedin'; break;
                    case 'pinterest': iconType = 'fa-pinterest'; break;
                    case 'youtube': iconType = 'fa-youtube'; break;
                    default: iconType = 'fa-share-alt'; break;
                }

                html += '<div class="iconType"><i class="fa ' + iconType + ' fa-3x socialIdentifier" aria-hidden="true"></i></div>';
                html += '<div>';

                var lblName = '';
                switch (atbName) {
                    case 'likes': case 'like':
                        if (socialMediaType == 'twitter') lblName = 'Total Favourites';
                        else lblName = 'Total Likes';
                        break;

                    case 'shares': case 'share':
                        if (socialMediaType == 'twitter') lblName = 'Total ReTweets';
                        else lblName = 'Total Shares';
                        break;

                    case 'comment': case 'comments': lblName = 'Total Comments'; break;

                    case 'follower': case 'followers': lblName = 'Total Followers'; break;

                    case 'connection': case 'connections': lblName = 'Total Connections'; break;

                    case 'post': case 'posts':
                        if (socialMediaType == 'twitter') lblName = 'Total Tweets';
                        else lblName = 'Total Posts';
                        break;

                    default:
                        lblName = 'Total' + atbName;
                }

                html += '<label class="attributeTitle">' + lblName + '</label>';

                html += '<div class="pcCounter"><h4>' + count + '</h4></div>';

                html += '    </div>';
                html += '</div>';

                html += '</div>';

                return html;
            },

            RemoveCounterItem: function (caller) {

                currentPfItem = caller;
                var returnPotin = ConfirmDialog(caller, 'Remove element', 'Do you wish to remove this element ?');
                dialogConfirmed = false;
                if (returnPotin) {
                    var performanceCounterID = $(caller).closest('.pcItem').data("performanceid");

                    MediaPerformaceCounter.config.url = MediaPerformaceCounter.config.baseURL + "DeleteCounterObjectByID";
                    MediaPerformaceCounter.config.data = JSON.stringify({ performanceCounterID: performanceCounterID });
                    MediaPerformaceCounter.config.ajaxCallMode = MediaPerformaceCounter.RemoveCounterItemCallBack;
                    MediaPerformaceCounter.config.async = false;
                    MediaPerformaceCounter.ajaxCall(MediaPerformaceCounter.config);
                }
            },

            RemoveCounterItemCallBack: function (data) {
                if (data) {

                    var returnCode = data.d;
                    switch (returnCode) {

                        case 1:
                            $(currentPfItem).closest('.pcItem').remove();
                            MediaPerformaceCounter.NotifySF("Counter item was deleted successfully ", "success");
                            break;

                        default:
                            MediaPerformaceCounter.NotifySF("Error while deleting the counter item", "error");
                            break;
                    }
                }

                currentPfItem = null;
            },

            LoadMediaAttributes: function () {
                MediaPerformaceCounter.config.url = MediaPerformaceCounter.config.baseURL + "GetAvailableSocialMediaAttributes";
                MediaPerformaceCounter.config.data = {};
                MediaPerformaceCounter.config.ajaxCallMode = MediaPerformaceCounter.LoadMediaAttributesCallBack;
                MediaPerformaceCounter.config.async = false;
                MediaPerformaceCounter.ajaxCall(MediaPerformaceCounter.config);
            },

            LoadMediaAttributesCallBack: function (data) {
                if (data.d != null && data.d != '' && data.d.length > 0) {
                    if (attributeTypes == null)
                        attributeTypes = data.d;
                }
            },

            ResetCurrentAttributes: function () {

                $('.slcGraphAttributeType').html('');
                var html = '';
                html += '<option value="0">Plese Select</option>';
                if (attributeTypes) {
                    for (var attributeType = 0; attributeType < attributeTypes.length; attributeType++) {
                        html += '    <option value="' + attributeTypes[attributeType].MediaAttributeID + '">' + attributeTypes[attributeType].MediaAttributeName + '</option>';
                    }
                }

                $('.slcGraphAttributeType').html(html);

                $('.slcGraphAttributeType').change(function () {
                    MediaPerformaceCounter.ResetGraphControl();
                });

            },

            ResetGraphControl: function () {
                $('.graphItems').html('');
                $('.performanceCounterContainer').html('');
                dataArray = [];
                $('#customcanvas').html('');
                MediaPerformaceCounter.RefreshPerformance();
                MediaPerformaceCounter.RenderMultiLineChart();
            },

            LoadMediaTypes: function () {
                MediaPerformaceCounter.config.url = MediaPerformaceCounter.config.baseURL + "GetAvailableSocialMediaTypes";
                MediaPerformaceCounter.config.data = {};
                MediaPerformaceCounter.config.ajaxCallMode = MediaPerformaceCounter.LoadMediaTypesCallBack;
                MediaPerformaceCounter.config.async = false;
                MediaPerformaceCounter.ajaxCall(MediaPerformaceCounter.config);
            },

            LoadMediaTypesCallBack: function (data) {
                if (data.d != null && data.d != '' && data.d.length > 0) {
                    if (mediaTypes == null)
                        mediaTypes = data.d;
                }
            },

            LoadAttributesByMediaTypeID: function (mediaTypeID) {
                MediaPerformaceCounter.config.url = MediaPerformaceCounter.config.baseURL + "GetAttributesForPerformanceCounterByTypeID";
                MediaPerformaceCounter.config.data = JSON.stringify({ mediaTypeID: mediaTypeID });
                MediaPerformaceCounter.config.ajaxCallMode = MediaPerformaceCounter.LoadAttributesByMediaTypeIDCallback;
                MediaPerformaceCounter.config.async = false;
                MediaPerformaceCounter.ajaxCall(MediaPerformaceCounter.config);
            },

            LoadAttributesByMediaTypeIDCallback: function (data) {
                var html = '';
                html += '<span>Measurement Type :</span>';
                html += '<div class="custom-select">';
                html += '<select class="selMediaAttributeType">';
                html += '    <option value="0">Select an attribute</option>';

                if (data.d != null && data.d != '' && data.d.length > 0) {
                    var mediaAttributes = data.d;

                    // <----------Filter HERE

                    //MediaAttributeID
                    //TypeAttributeMapID
                    for (var attribItem = 0; attribItem < mediaAttributes.length; attribItem++) {

                        var contains = false;
                        var currentMediaAttrib = mediaAttributes[attribItem].MediaAttributeName;
                        for (var at = 0; at < attribFilters.length; at++) {
                            if (attribFilters[at] === currentMediaAttrib) contains = true;
                        }

                        if (!contains)
                            html += '    <option value="' + mediaAttributes[attribItem].TypeAttributeMapID + '">' + currentMediaAttrib + '</option>';
                    }
                }
                html += '</select>';
                html += '</div>';

                $('.dvSettingsContainer').html(html);

            },


            DisplayNewComponentFlyer: function (caller) {
                newPerformanceObjectType = "counter";

                if (mediaTypes) {

                    $('.sfDivFlying .settingsElement').empty();
                    $('#divFlyingLabel').html('Choose a Media Type :');
                    $('.hNewItem').html('Add a new counter');

                    var html = '';
                    html += '<div class="custom-select">';
                    html += '<select class="selMediaType">';
                    html += '        <option value="0">Select a Media Type</option>';




                    for (var mediaType = 0; mediaType < mediaTypes.length; mediaType++) {

                        var contains = false;
                        var mediaTypeName = mediaTypes[mediaType].MediaTypeName;
                        for (var medF = 0; medF < mediaTypeFilter.length; medF++) {
                            if (mediaTypeFilter[medF] === mediaTypeName) contains = true;
                        }

                        if (!contains)
                            html += '    <option value="' + mediaTypes[mediaType].MediaTypeID + '">' + mediaTypes[mediaType].MediaTypeName + '</option>';
                    }
                    html += '</select>';
                    html += '</div>';

                    html += '<div class="dvSettingsContainer">';
                    html += '</div>';

                    $('#lblFlyingAddNew').toggle(true);
                    $('.sfDivFlying .settingsElement').html(html);

                    $('.selMediaType').change(function () {
                        var current = this;
                        var mediaTypeID = $(current).val();

                        $('.dvSettingsContainer').html('');
                        if (mediaTypeID > 0)
                            MediaPerformaceCounter.LoadAttributesByMediaTypeID(mediaTypeID);
                    });

                } else {


                    // NO SETTINGS FOUND
                }

                MediaPerformaceCounter.LoadFlyer(caller);

            },

            LoadFlyer: function (caller) {

                $('.sfDivFlying').show();

                var top = caller.offset().top;
                var left = caller.offset().left;
                var height = caller.height();
                $('.sfDivFlying').offset({ top: (top + height + 8), left: left - 260 });

            },

            NotifySF: function (message, msgType) { SageFrame.messaging.show(message, msgType); },

            IsOdd: function (count) { return count % 2; },

            ConvertAnalyticsToDataItem: function (info) {


                var name = info[0].Destination;

                var colorCode = '';
                switch (name) {
                    case 'facebook': colorCode = '#3b5998'; break;
                    case 'twitter': colorCode = '#00d1fe'; break;
                    case 'linkedin': colorCode = '#0079aa'; break;
                    case 'youtube': colorCode = '#2f2f2f'; break;
                    case 'pinterest': colorCode = '#c12025'; break;
                    case 'google': colorCode = '#ffce45'; break;
                    case 'instagram': colorCode = '#ab7f5c'; break;
                    default: colorCode = '#F08080'; break;
                }

                var dataPoints = [];

                var graphType = '';
                var marketType = 'square';

                if (info[0].AttributeName.toLowerCase() === 'post') {
                    for (var i = 0; i < info.length; i++) {
                        var d = info[i].addedon;
                        //d = d.split(' ')[0];

                        dataPoints.push({ x: new Date(d), y: info[i].StatsCount, postedOn: info[i].addedon, message: info[i].Message, tags: (info[i].HashTags) ? info[i].HashTags : "N/A" });
                    }
                    //graphType = 'column';
                    //---X  graphType = 'stackedBar100';

                    graphType = 'scatter';
                    marketType = 'circle';

                    //graphType = 'bar';

                } else {
                    for (var i = 0; i < info.length; i++) {
                        dataPoints.push({ x: new Date(info[i].addedon), y: info[i].StatsCount, postedOn: info[i].addedon, message: info[i].Message, tags: (info[i].HashTags) ? info[i].HashTags : "N/A" });
                    }
                    graphType = 'line';
                    marketType = 'square';
                }

                var dataItem = {
                    key: name,
                    value: {
                        type: graphType, showInLegend: true, lineThickness: 2,
                        name: name, markerType: marketType, markerSize: 10, color: colorCode,
                        dataPoints: dataPoints
                    }
                };

                return dataItem;
            },

            PushAndRender: function (info) {

                dataArray.push(MediaPerformaceCounter.ConvertAnalyticsToDataItem(info));
                MediaPerformaceCounter.RenderMultiLineChart();
            },

            ImportTotalPostCounts: function () {
                MediaPerformaceCounter.config.url = MediaPerformaceCounter.config.baseURL + "LoadPostMediaCounter";
                MediaPerformaceCounter.config.data = {};
                MediaPerformaceCounter.config.ajaxCallMode = MediaPerformaceCounter.LoadPostMediaCounterCallBack;
                MediaPerformaceCounter.config.async = false;
                MediaPerformaceCounter.ajaxCall(MediaPerformaceCounter.config);
            },

            LoadPostMediaCounterCallBack: function (data) {
                if (data.d != null && data.d != '' && data.d.length > 0) {
                    totalPosts = data.d;
                }
            },

            ToTitleCase: function (str) {
                return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            },

            RenderPieChart: function (items) {

                var dataPointValues = [];

                var totalPosts = 0;
                for (var i = 0; i < items.length; i++) {
                    totalPosts += items[i].Posts;
                }

                for (var i = 0; i < items.length; i++) {
                    var posts = items[i].Posts;
                    var percent = Math.round((posts / totalPosts) * 100);
                    var destination = items[i].Destination;
                    var title = MediaPerformaceCounter.ToTitleCase(destination);

                    dataPointValues.push({
                        y: percent,
                        legendText: title,
                        indexLabel: destination + " " + percent + "% (" + posts + " posts)",
                        click: function (e) {
                            var current = this;
                           
                        }
                    });

                }

                var chart = new CanvasJS.Chart("customcanvas",
                    {
                        title: {
                            text: "Social Media Analytics ( Total Posts )",
                            fontFamily: "Impact",
                            fontWeight: "normal"
                        },
                        animationEnabled: true,
                        legend: {
                            verticalAlign: "bottom",
                            horizontalAlign: "center"
                        },
                        data: [
                            {
                                click: function (e) {
                                    var current = this;
                                   
                                },
                                //startAngle: 45,
                                indexLabelFontSize: 20, indexLabelFontFamily: "Garamond", indexLabelFontColor: "darkgrey",
                                indexLabelLineColor: "darkgrey", indexLabelPlacement: "outside", type: "doughnut",
                                showInLegend: true,
                                dataPoints: dataPointValues
                            }
                        ]
                    });

                chart.render();


            },

            RenderPerformanceCounterElements: function (pcGroups) {

                for (var grpID = 0; grpID < pcGroups.length; grpID++) {

                    var currentGroup = pcGroups[grpID];
                    var chartID = currentGroup.title;
                    var attrbs = currentGroup.attribs;

                    var dataPointValues = [];

                    var totalCount = 0;
                    for (var i = 0; i < attrbs.length; i++) totalCount += attrbs[i].count;

                    for (var i = 0; i < attrbs.length; i++) {
                        var currentAttrib = attrbs[i];
                        var count = currentAttrib.count;
                        var title = currentAttrib.attributeName;
                        var percent = Math.round((count / totalCount) * 100);

                        var color = '#F08080';
                        switch (title) {
                            case 'like': color = '#4c72b9'; break;
                            case 'share': color = '#49e1cc'; break;
                            case 'post': color = '#9b58b6'; break;
                            case 'comment': color = '#e74c3c'; break;
                            case 'follower': color = '#f6ca17'; break;
                            case 'connection': color = '#2ecc71'; break;
                            default: color: '#F08080'; break;
                        }

                        dataPointValues.push({
                            y: percent,
                            cursor: "pointer",
                            legendText: title,
                            //indexLabel: title,
                            //indexLabel: percent + "% " + count + " " + title + "(s) ",
                            attributeID: currentAttrib.attributeID,
                            attributeName: title,
                            count: count,
                            mediaTypeID: currentAttrib.mediaTypeID,
                            mediaTypeName: currentAttrib.mediaTypeName,
                            typeAttributeMapID: currentAttrib.typeAttributeMapID,
                            performanceCounterID: currentAttrib.performanceCounterID,
                            percent: percent,
                            color: color,
                            click: function (e) {
                                MediaPerformaceCounter.TriggerPiePieceClick(this, e);
                            }
                        });
                    }

                    var chart = new CanvasJS.Chart("customcanvas_" + chartID,
                     {
                         //title: { text: chartID, fontSize: 18 },
                         animationEnabled: true,
                         //interactivityEnabled: false,
                         //legend: {
                         //    fontSize: 14, verticalAlign: "bottom", horizontalAlign: "center"
                         //},
                         toolTip: {
                             content: "Attribute: {attributeName} <br/> Total Count: {count} <br/> In Percentage : {y}% <br/> Click to see detail "
                         },
                         data: [
                             {
                                 //color: "LightSeaGreen",

                                 click: function (e) {
                                     var current = this;
                                 },
                                 startAngle: 45, indexLabelFontSize: 16,
                                 indexLabelFontFamily: "Garamond", indexLabelFontColor: "darkgrey",
                                 indexLabelLineColor: "darkgrey", indexLabelPlacement: "outside",
                                 type: "doughnut", showInLegend: true,
                                 dataPoints: dataPointValues
                             }
                         ]
                     });

                    chart.render();

                    var currentGraph = $("#customcanvas_" + chartID);
                    var y = currentGraph.height() / 2;

                    $("<i>").attr("class", "fa fa-" + chartID + " fa-2x socialIdentifier")
                        .appendTo("#customcanvas_" + chartID + " > .canvasjs-chart-container")
                        .css({ "position": "absolute", "display": "block", "left": '40%', "top": y - 24 });

                    $("<i>").attr("class", "fa fa-bars canvasItemSetting deletePCItem")
                        .attr("area-hidden", true)
                        .attr("data-chartid", chartID)
                        .attr("title", "Remove performance counter")
                        .appendTo("#customcanvas_" + chartID + " > .canvasjs-chart-container")
                        .css({ "position": "absolute", "display": "none", "left": '95%', "top": 2 });

                    $("#customcanvas_" + chartID).mouseenter(function () { $(this).find('.canvasItemSetting').toggle(true); });

                    $("#customcanvas_" + chartID).mouseleave(function () { $(this).find('.canvasItemSetting').toggle(false); });

                    $('.canvasItemSetting').on('click', function () {

                        var currentItemBox = $(this);
                        currentLock = currentItemBox;
                        var title = currentItemBox.data("chartid");
                        currentItemBox.addClass("lockBox");

                        var chartInstance;
                        for (var gi = 0; gi < graphComponents.length; gi++) {
                            if (graphComponents[gi].title === title) chartInstance = graphComponents[gi].chart;
                        }

                        var element = chartInstance.options.data[0].dataPoints;

                        var html = '';


                        //html += '<ul class="pcSettingItem">';
                        for (var i = 0; i < element.length; i++) {
                            var currentElement = element[i];
                            html += '<input type="radio" class="pcSettingElement removePCSettingItem" data-performancecounterid="' + currentElement.performanceCounterID + '" id="cbxElement_' + i + '" value="' + currentElement.attributeName + '" name="cbxElement">';
                            html += '<label for="cbxElement_' + i + '" class="pcSettingItemTitle">' + currentElement.attributeName + '</label>';

                        }
                        //html += '</ul>';

                        //html += '<ul class="pcSettingItem">';
                        //for (var i = 0; i < element.length; i++) {
                        //    var currentElement = element[i];
                        //    html += '<li class="pcSettingElement removePCSettingItem" data-performancecounterid="' + currentElement.performanceCounterID + '">';
                        //    html += '    <label class="pcSettingItemTitle">' + currentElement.attributeName + '</label>  ';
                        //    //html += '    <span class="icon-close removePCSettingItem" data-performancecounterid="' + currentElement.performanceCounterID + '"></span>';
                        //    html += '</li>';
                        //}
                        //html += '</ul>';


                        $('.sfDivFlying .settingsElement').empty();

                        $('.hNewItem').html(MediaPerformaceCounter.ToTitleCase(title) + ' attributes');
                        $('#divFlyingLabel').html('Choose to remove');
                        //$('#lblFlyingAddNew').text('Select');

                        //if ($('#lblFlyingAddNew').hasClass('icon-addnew')) {
                        //    $('#lblFlyingAddNew').removeClass('icon-addnew').addClass('icon-delete');
                        //}
                        $('#lblFlyingAddNew').toggle(false);

                        $('.sfDivFlying .settingsElement').html(html);

                        $('.removePCSettingItem').on('click', function () {

                            var currentItem = $(this);
                            var returnPoint = ConfirmDialog(currentItem, 'Remove element', 'Do you wish to remove this element ?');
                            dialogConfirmed = false;
                            if (returnPoint) {
                                var pcID = currentItem.data("performancecounterid");

                                //var performanceCounterID = $(caller).closest('.pcItem').data("performanceid");
                                MediaPerformaceCounter.config.url = MediaPerformaceCounter.config.baseURL + "DeleteCounterObjectByID";
                                MediaPerformaceCounter.config.data = JSON.stringify({ performanceCounterID: pcID });
                                MediaPerformaceCounter.config.ajaxCallMode = function (data) {
                                    if (data) {
                                        var returnCode = data.d;
                                        switch (returnCode) {

                                            case 1:
                                                currentLock.removeClass("lockBox");
                                                $('.sfDivFlying').hide();
                                                //$(currentPfItem).closest('.pcItem').remove();
                                                MediaPerformaceCounter.NotifySF("Performance Attribute was removed successfully ", "success");
                                                MediaPerformaceCounter.ResetAnalyzer();
                                                break;

                                            default:
                                                MediaPerformaceCounter.NotifySF("Error while deleting the Performance Attribute", "error");
                                                break;
                                        }
                                    }

                                };
                                MediaPerformaceCounter.config.async = false;
                                MediaPerformaceCounter.ajaxCall(MediaPerformaceCounter.config);
                            }

                        });

                        MediaPerformaceCounter.LoadFlyer($(this));


                    });

                    graphComponents.push({ title: chartID, chart: chart });

                }




            },


            RemoveLockBox: function (caller) {
                caller.removeClass("lockBox");
            },

            RenderMultiLineChart: function () {
                var dataContents = [];

                $.each(dataArray, function (index, item) {
                    dataContents.push(item.value);
                });

                var title = [];

                if (dataContents.length > 0) title = { text: "Social Media Analytics", fontSize: 30 };

                else {
                    title = {
                        text: "Select a performance counter attribute", fontColor: "#2f4f4f",
                        fontSize: 40, padding: 40, margin: 40,
                        //verticalAlign: center, horizontalAlign: center, backgroundColor: "#FFFFE0",
                        //borderThickness: 1, cornerRadius:55,
                        fontWeight: "bold", dockInsidePlotArea: false,
                    };
                }

                var chart = new CanvasJS.Chart("customcanvas", {
                    title: title,
                    //title: { text: "Social Media Analytics", fontSize: 30 },
                    animationEnabled: true,
                    axisX: {
                        gridColor: "Silver", tickColor: "silver", valueFormatString: "DD/MMM",
                        //viewportMinimum: -50, viewportMaximum: 50
                    },
                    axisY: { title: "Count" },
                    toolTip: {
                        content: "Post :{message} <br/> HashTags: {tags} <br/> Count : {y} <br/> Posted On : {x} ( { postedOn} )"
                    },
                    //backgroundColor: "#F5DEB3",
                    exportEnabled: true,
                    zoomEnabled: true,

                    theme: "theme1",
                    axisY: { gridColor: "Silver", tickColor: "silver" },
                    legend: { verticalAlign: "center", horizontalAlign: "right" },
                    legend: {
                        cursor: "pointer",
                        itemclick: function (e) {
                            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) e.dataSeries.visible = false;
                            else e.dataSeries.visible = true;
                            chart.render();
                        }
                    },
                    data: dataContents
                });

                chart.render();
            },

        };

        MediaPerformaceCounter.init();
    };
    $.fn.MediaPerformaceCounter = function (p) {
        $.MediaPerformaceCounter(p);
    };
})(jQuery);

