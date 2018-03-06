var AutomatedSearch;

(function ($) {
    var searchConfigurationID = 0;
    var tables = [];
    var selectedTable = '';
    var modules = [];
    var queryStringTypeExtLess = false;
    var settingsUpdated = false;
    var controlToRemove = null;

    $.AutomatedSearch = function (p) {
        p = $.extend({
            modulePath: '', DataObj: '', portalID: 0, userModuleID: ''
        }, p);
        AutomatedSearch = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: p.modulePath + 'Services/AutomatedSearch.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID,
                portalID: p.portalID
            },
            init: function () {

                selectedTable = '';
                queryStringTypeExtLess = false;
                searchConfigurationID = 0;
                AutomatedSearch.GetModules();
                AutomatedSearch.GetTableList();
                AutomatedSearch.GetConfigurationSettings();
                AutomatedSearch.AddNewStage();

                AutomatedSearch.BindEvents();
                AutomatedSearch.ShowDefaultMessage();

            },

            ajaxSuccess: function (data) { },
            ajaxFailure: function () { },
            ajaxCall: function (config) {
                $.ajax({
                    type: AutomatedSearch.config.type,
                    contentType: AutomatedSearch.config.contentType,
                    async: AutomatedSearch.config.async,
                    cache: AutomatedSearch.config.cache,
                    url: AutomatedSearch.config.url,
                    data: AutomatedSearch.config.data,
                    dataType: AutomatedSearch.config.dataType,
                    success: AutomatedSearch.config.ajaxCallMode,
                    error: AutomatedSearch.ajaxFailure,
                    complete: function () { }
                });
            },

            BindViewEditEvents: function () {

                $(".btnViewEdit").on('click', function () {

                    AutomatedSearch.EditContent();
                    var tableName = $(this).data("table");
                    AutomatedSearch.EditTableContent(tableName);
                });

                $(".btnViewDelete").click(function () {
                    controlToRemove = $(this).parent().parent();
                    var configID = $(this).data("searchid");
                    SageConfirmDialog('Are you sure you want to delete this setting?').done(function () {
                        AutomatedSearch.DeleteSettingByID(configID);
                    });

                });

            },
            BindEvents: function () {

                AutomatedSearch.BindViewEditEvents();

                $("#extensionLess").click(function () {
                    AutomatedSearch.UpdateConfigurationSetting();
                });

                $("#btnEditContent").on('click', function () {
                    AutomatedSearch.EditContent();
                });

                $("#btnSaveSettings").on('click', function () {
                    AutomatedSearch.SaveData();
                });
                $("#btnRefresh").on('click', function () {
                    AutomatedSearch.Reset();
                    AutomatedSearch.ShowDefaultMessage();

                });


                $("#btnViewDetail").on('click', function () {
                    AutomatedSearch.Reset();
                    AutomatedSearch.ViewDetail();
                });

            },

            EditContent: function () {
                $('#divSettingsView').toggle(false);
                $('#divTableAccumulator').toggle(true);
            },
            ViewDetail: function () {
                if (settingsUpdated)
                    AutomatedSearch.FetchViewContents();
                $('#divSettingsView').toggle(true);
                $('#divTableAccumulator').toggle(false);
                settingsUpdated = false;

            },

            FetchViewContents: function () {
                AutomatedSearch.config.url = AutomatedSearch.config.baseURL + "GetSearchViewDetail";
                AutomatedSearch.config.data = JSON.stringify({
                    portalID: parseInt(SageFramePortalID),
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken
                });
                AutomatedSearch.config.ajaxCallMode = AutomatedSearch.BindViewDetail;
                AutomatedSearch.ajaxCall(AutomatedSearch.config);
            },
            BindViewDetail: function (data) {

                if (data.d != null && data.d != '') {

                    var content = data.d;
                    var html = '';

                    //html += "<div>Search Format : <label><b><div id='extLess'> </div></b></label></div>";
                    html += "<div class='sfRowfilter'>";
                    html += "<div class='sfFieldset'><label class='sfFormlabel'>Search Format  </label></div>";
                    html += "<div class='formValue'><label class='sfFormlabel'><div id='extLess'></div></label></div>";
                    html += "</div>";


                    for (var contentCount = 0; contentCount < content.length; contentCount++) {

                        var currentContent = content[contentCount];
                        var firstItem = currentContent[0];
                        var searchConfigID = firstItem.SearchConfigurationID;
                        var tableName = firstItem.SearchName;
                        var moduleName = firstItem.ModuleName;

                        html += "<div id='" + tableName + "_" + searchConfigID + "'>";

                        html += "    <div class='sfRowfilter'>";
                        html += "        <div class='sfFieldset'><label class='sfFormlabel'>Table Name  </label></div>";
                        html += "        <div class='formValue'><label class='sfFormlabel'>" + tableName + "</label></div>";
                        html += "    </div>";

                        html += "    <div class='sfRowfilter'>";
                        html += "        <div class='sfFieldset'><label class='sfFormlabel'>Module Name  </label></div>";
                        html += "        <div class='formValue'><label class='sfFormlabel'>" + moduleName + "</label></div>";
                        html += "    </div>";

                        var qsEnabled = 'False';
                        for (var j = 0; j < currentContent.length; j++) {
                            if (currentContent[j].ColumnUrl !== '') {
                                qsEnabled = 'True';
                                break;
                            }
                        }

                        //html += "Query String Enabled :    <label><b>  " + qsEnabled + "</b></label>";
                        html += "    <div class='sfRowfilter'>";
                        html += "        <div class='sfFieldset'><label class='sfFormlabel'>Query String Enabled  </label></div>";
                        html += "        <div class='formValue'><label class='sfFormlabel'>" + qsEnabled + "</label></div>";
                        html += "    </div>";


                        var searchColumns = '';
                        searchColumns += "<div class='sfRowfilter searchColumnView'>";
                        searchColumns += "<div class='sfFieldset'><label class='sfFormlabel'>Search Columns  </label></div>";
                        searchColumns += "<div class='formValue'>";


                        var qsColumns = '';
                        qsColumns += "<div class='sfRowfilter qsColumnView' >";
                        qsColumns += "<div class='sfFieldset'><label class='sfFormlabel'>Query String Columns  </label></div>";
                        qsColumns += "<div class='formValue'>";


                        for (var j = 0; j < currentContent.length; j++) {

                            var item = currentContent[j];
                            if (item.ColumnUrl === null || item.ColumnUrl.trim() === '') {
                                searchColumns += "<div class='columnItemView'>";
                                searchColumns += "    <label>" + item.ColumnName + "</label>";
                                searchColumns += "</div>";
                            }
                            else {
                                qsColumns += "<div class='qsItemView'>";
                                qsColumns += "    <label> Column Name : " + item.ColumnUrl + "</label>";
                                qsColumns += "    <label> Column Alias : " + item.ColumnName + "</label>";
                                qsColumns += "</div>";
                            }
                        }

                        searchColumns += "</div>";
                        searchColumns += "</div>";

                        qsColumns += "</div>";
                        qsColumns += "</div>";


                        html += searchColumns;
                        html += qsColumns;

                        html += "<div class='sfButtonwrapper btnSettingViewAction button-paddleft'>";
                        html += "    <button type='button' class='btnViewEdit icon-edit sfBtn smlbtn-primary' data-table='" + tableName + "' id='btnEdit_" + tableName + "'>Edit</button>";
                        html += "    <button type='button' class='btnViewDelete icon-delete sfBtn smlbtn-danger' data-searchid='" + searchConfigID + "' id='btnDelete_" + tableName + "'>Delete</button>";
                        html += "</div>";
                        html += "</div>";

                    }

                    $("#viewContainer").html(html);

                    AutomatedSearch.BindViewEditEvents();
                    AutomatedSearch.AssignExtensionType();
                }
                else {
                    var html = '';
                    html += "<div>Search Format  <label><b><div id='extLess'> </div></b></label></div>";
                    html += '<div>No settings are configured yet</div>';
                    $("#viewContainer").html(html);

                }
            },
            DisplayMessageCode: function (message) {
                if (message != null && message != '') {
                    if (message.Code === 1)
                        AutomatedSearch.NotifySF(message.Message, "Success");
                    else
                        AutomatedSearch.NotifySF(message.Message, "Error");
                }
            },

            UpdateConfigurationSetting: function () {
                queryStringTypeExtLess = $("#extensionLess").is(":checked");
                AutomatedSearch.config.url = AutomatedSearch.config.baseURL + "UpdateConfigurationSettings";
                AutomatedSearch.config.data = JSON.stringify({
                    isExtensionLess: queryStringTypeExtLess,
                    //portalID: this.config.portalID,
                    portalID: parseInt(SageFramePortalID),
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken
                });
                AutomatedSearch.config.ajaxCallMode = AutomatedSearch.UpdateConfigurationSettingsCallBack;
                AutomatedSearch.ajaxCall(AutomatedSearch.config);
            },
            UpdateConfigurationSettingsCallBack: function (data) {
                AutomatedSearch.DisplayMessageCode(data.d);
                if (data.d != null && data.d.Code === 1) {
                    AutomatedSearch.AssignExtensionType();
                }
            },
            AssignExtensionType: function () {
                var extLess = 'With Extension';
                if (queryStringTypeExtLess) {
                    extLess = 'Extensionless';
                }
                $('#extLess').html(extLess);
            },

            GetConfigurationSettings: function () {

                AutomatedSearch.config.url = AutomatedSearch.config.baseURL + "GetConfigurationSettings";
                AutomatedSearch.config.data = JSON.stringify({
                    portalID: parseInt(SageFramePortalID),
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken
                });
                AutomatedSearch.config.ajaxCallMode = AutomatedSearch.SetConfigurationSetting;
                AutomatedSearch.ajaxCall(AutomatedSearch.config);

            },
            SetConfigurationSetting: function (data) {
                if (data.d != null && data.d != '') {
                    queryStringTypeExtLess = data.d;
                    AutomatedSearch.AssignExtensionType();
                }
            },
            ShowDefaultMessage: function () {
                $("#divMessage").toggle(true);
            },

            GetModules: function () {

                AutomatedSearch.config.url = AutomatedSearch.config.baseURL + "GetModules";
                AutomatedSearch.config.data = JSON.stringify({
                    portalID: parseInt(SageFramePortalID),
                    //portalID: AutomatedSearch.config.portalID,
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken
                });
                AutomatedSearch.config.ajaxCallMode = AutomatedSearch.ProcessModules;
                AutomatedSearch.ajaxCall(AutomatedSearch.config);
            },

            ProcessModules: function (data) {
                if (data.d != null && data.d != '' && data.d.length > 0) {
                    modules = data.d;
                }

            },

            GetTableList: function () {
                AutomatedSearch.config.url = AutomatedSearch.config.baseURL + "GetTableList";
                AutomatedSearch.config.data = JSON.stringify({
                    portalID: parseInt(SageFramePortalID),
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken
                });
                AutomatedSearch.config.ajaxCallMode = AutomatedSearch.ProcessTableList;
                AutomatedSearch.ajaxCall(AutomatedSearch.config);
            },

            ProcessTableList: function (data) {
                if (data.d != null && data.d != '' && data.d.length > 0) {
                    tables = data.d;
                }
            },

            GetColumnListByTableName: function (tblName) {
                AutomatedSearch.config.url = AutomatedSearch.config.baseURL + "GetColumnListByTableName";
                AutomatedSearch.config.data = JSON.stringify({
                    portalID: parseInt(SageFramePortalID),
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken,
                    tableName: tblName
                });
                AutomatedSearch.config.ajaxCallMode = AutomatedSearch.ProcessColumnList;
                AutomatedSearch.ajaxCall(AutomatedSearch.config);
            },

            ProcessColumnList: function (data) {
                if (data.d != null && data.d != '' && data.d.length > 0) {

                    AutomatedSearch.BindColumnList(data.d);

                    AutomatedSearch.config.url = AutomatedSearch.config.baseURL + "GetSearchInformationsForTable";
                    AutomatedSearch.config.data = JSON.stringify({
                        portalID: parseInt(SageFramePortalID),
                        userModuleID: p.userModuleID,
                        userName: SageFrameUserName,
                        secureToken: SageFrameSecureToken,
                        tableName: selectedTable
                    });
                    AutomatedSearch.config.ajaxCallMode = AutomatedSearch.PopulateData;
                    AutomatedSearch.ajaxCall(AutomatedSearch.config);
                }
            },

            PopulateData: function (data) {
                searchConfigurationID = 0;
                if (data.d != null && data.d != '') {

                    var datas = data.d;
                    searchConfigurationID = datas.SearchConfiguration.SearchConfigurationID;
                    selectedTable = datas.SearchConfiguration.SearchName;
                    var moduleName = datas.SearchConfiguration.ModuleName;

                    $("#slcModule").val(moduleName);

                    var searchMappings = datas.SearchMappings;
                    for (var mappingCount = 0; mappingCount < searchMappings.length; mappingCount++) {
                        var columnName = searchMappings[mappingCount].ColumnName;

                        $('input[id="' + columnName + '"]').prop('checked', true);
                        //$('#' + columnName).prop('checked', true);
                        var choosenTable = searchMappings[mappingCount].TableName;
                    }

                    var searchQueryItems = datas.SearchQueryInfos;
                    if (searchQueryItems != null && searchQueryItems.length > 0) {

                        $('#queryString').prop('checked', true);
                        $("#divQSContainer").toggle(true);

                        for (var queryItem = 0; queryItem < searchQueryItems.length; queryItem++) {

                            var columnAlias = searchQueryItems[queryItem].ColumnAlias;
                            var columnURL = searchQueryItems[queryItem].ColumnUrl;
                            var columnIdentifier = columnURL + "_qs";
                            AutomatedSearch.AppendColumnElement(columnURL, columnAlias, columnIdentifier);

                        }

                    }

                }
                LabelAfterCheckBox();
            },


            BindColumnList: function (searchItems) {
                $("#divChooseColumn").html('');
                var html_ChooseColumn = '';
                var html_QuertString = '';

                //var qsCount = $('#divColumnQS').length;

                for (var i = 0; i < searchItems.length; i++) {
                    var columnName = searchItems[i].ColumnName;

                    var columnIdentity = columnName;
                    var queryStringIdentity = columnName + "_qs";

                    html_ChooseColumn += '<div id="colItem_' + columnIdentity + '" class="divColItem">';
                    html_ChooseColumn += '    <label for="' + columnIdentity + '" class="lblColItem">' + columnName + '</label>';
                    html_ChooseColumn += '    <input type="checkbox" name="chooseColumn" value="' + columnName + '" id="' + columnIdentity + '" class="inpColItem">';
                    html_ChooseColumn += '</div>';

                    html_QuertString += '<label class="ui-widget-content divDraggable"  id="' + queryStringIdentity + '"> ' + columnName + ' </label>';

                    //html_QuertString = '<div class="qsItem ui-widget-content divDraggable"><label id="' + queryStringIdentity + '"> ' + columnName + ' </label></div>';
                }

                $("#divColumnQS").html(html_QuertString);
                $("#divChooseColumn").html(html_ChooseColumn);

                AutomatedSearch.AddDraggable();

                $("#divColumnContainer").show();
            },

            CheckIfTableAlreadyExists: function (tableName) {
                var itemsCount = 0;
                $("#divTableList").children().each(function () {
                    var currentItemTblName = $(this).find("#slcTable").val();
                    if (tableName === currentItemTblName)
                        itemsCount++;
                });

                return (itemsCount > 1);
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

            ExtractIdentifier: function (fullIdentifier, char, count) {
                return fullIdentifier.split(char)[count];
            },


            GenerateRowFilter: function (keyLabelName, htmlValue) {
                var html = '';

                html += '    <div class="sfRowfilter">';
                html += '        <div class="sfFieldset">';
                html += '            <span class="formKey">';
                html += '                <label class="sfFormlabel">' + keyLabelName + '</label>';
                html += '            </span>';

                html += '            <span class="formValue">';
                html += htmlValue;
                html += '            </span>';
                html += '        </div>';

            },

            AddNewStage: function () {
                var html = '';

                html += '<div class="stageContainer" id="divStage">';

                // [ BIND MODULES ]

                html += '    <div class="sfFormwrapper sfUsersearch sfTableOption">';

                // [ CHOOSE EXTENSION ] 
                html += '        <div class="sfRowfilter">';
                html += '            <div class="sfFieldset">';
                html += '                <input type="checkbox" name="extensionLess" id="extensionLess">';
                html += '                <label class="sfFormlabel" for="extensionLess">   Extension Less</label>';
               
                html += '            </div>';
                html += '        </div>';


                html += '    <div class="sfRowfilter">';

                // [ SEARCH TABLE ] 
                html += '        <div class="sfFieldset">';
                html += '            <span class="formKey">';
                html += '                <label class="sfFormlabel">Search a Table </label>';
                html += '            </span>';

                html += '            <span class="formValue">';
                html += '                <input class="sfInputbox" type="text" id="searchTable" name="searchTable" />';
                html += '            </span>';
                html += '        </div>';

                // [ CHOOSE MODULE ]
                html += '        <div class="sfFieldset">';
                html += '            <span class="formKey">';
                html += '                <label class="sfFormlabel">Choose a Module: </label>';
                html += '            </span>';

                html += '            <span class="formValue">';
                html += '                <select id="slcModule" class="sfListmenu">';
                if (modules != null && modules != '' && modules.length > 0)
                    for (var i = 0; i < modules.length; i++)
                        html += '<option value="' + modules[i].FriendlyName + '">' + modules[i].FriendlyName + '</option>';
                html += '                </select>';
                html += '            </span>';
                html += '        </div>';




                html += '    </div>';
                html += '    </div>';


                html += '    <div class="sfRowfilter">';
                html += '        <div class="formValue">';
                html += '            <div class="sfFormlabel" id="divSelectedTable">No Table Selected</div>';
                html += '        </div>';
                html += '    </div>';


                html += '        <div class="sfRowfilter tableChoose">';
                html += '            <div class="sfFieldset">';
                html += '                <label class="sfFormlabel">Choose a Table </label>';
                html += '            </div>';

                html += '    <ul id="tableContainer" class="tableContainer pull-left" >';
                for (var i = 0; i < tables.length; i++) {
                    html += '    <li class="tcli" id="' + tables[i].Value + '">';
                    html += '            <span class="tcName" href="#">' + tables[i].Value + '</span>';
                    html += '    </li>';
                }
                html += '    </ul>';
                html += '        </div>';

                html += '<div class="sfRowfilter chooser">';


                html += '    <div id="divMessage" class="stageMessage" style="display: none;">CHOOSE A TABLE <i class="icon-info"></i></div>';

                html += '    <div id="divColumnContainer" class="related" style="display: none;">';
                html += '        <div class="columns">';
                html += '        <div class="sfFieldset">';
                html += '            <label class="sfFormlabel">Choose Columns</label>';
                html += '            </div>';
                html += '        <div class="columnChooser fieldset">';

                html += '            <div id="divChooseColumn" class="controlgroup">';
                html += '            </div>';
                html += '        </div>';
                html += '        </div>';
                html += '        <div class="optionsContainer">';

                html += '            <div>';
                html += '                <label for="queryString">Query String</label>';
                html += '                <input type="checkbox" name="queryString" id="queryString">';
                html += '            </div>';
                html += '        </div>';

                html += '        <div id="divQSContainer" class="dragger" style="display: none; ">';

                html += '            <div id="divColumnQS" class="qsContainer">';
                html += '            </div>';

                html += '            <div id="divDroppable" class="dropContainer divDroppable ui-widget-header" >';
                html += '            </div>';

                html += '        </div>';
                html += '    </div>';

                html += '</div>';
                html += '</div>';


                $("#divTableList").append(html);

                $('#searchTable').on('input', function () {

                    var toSearch = $('#searchTable').val().toLowerCase();

                    var results = [];

                    for (var i = 0; i < tables.length; i++) {
                        if (tables[i].Value.toLowerCase().indexOf(toSearch) != -1) {
                            results.push(tables[i]);
                        }
                    }

                    AutomatedSearch.FilterTable(results);

                });

                AutomatedSearch.AssignTableClickEvent();


                $('#queryString').change(function () {
                    $("#divQSContainer").toggle($(this).is(":checked"));
                });


                $('#slcTable').on('change', function () {
                    $("#divChooseColumn").html('');
                    $("#divColumnContainer").hide();
                });


                $('#btnRemoveCurrent').on('click', function () {
                    $(this).parent().remove();
                });

                $(".divDroppable").droppable({
                    accept: ".divDraggable",
                    drop: function (event, ui) {

                        var element = ui.draggable[0];
                        var identifier = element.id;

                        var columnName = element.innerText.trim();
                        AutomatedSearch.AppendColumnElement(columnName, columnName, identifier);
                    },
                    classes: {
                        "ui-droppable": "highlight"
                    }
                });


                $("#extensionLess").prop("checked", queryStringTypeExtLess);

            },

            FilterTable: function (results) {

                var html = '';
                for (var i = 0; i < results.length; i++) {
                    html += '    <li id="' + results[i].Value + '">';
                    html += '            <span href="#">' + results[i].Value + '</span>';
                    html += '    </li>';
                }
                $("#tableContainer").html('');
                $("#tableContainer").html(html);

                AutomatedSearch.AssignTableClickEvent();

            },

            AssignTableClickEvent: function () {
                $(".tableContainer li").click(function () {
                    var tableName = $(this).attr('id');
                    AutomatedSearch.EditTableContent(tableName);
                });
            },

            EditTableContent: function (tableName) {
                AutomatedSearch.ClearStage();
                selectedTable = tableName;
                $('#divSelectedTable').html(selectedTable);
                AutomatedSearch.GetColumnListByTableName(tableName);
            },

            NotifySF: function (message, msgType) {
                SageFrame.messaging.show(message, msgType);
            },

            DisplayMessage: function (message, msgType) {
                var divMessageID = "#divMessage";

                switch (msgType) {
                    case -1:
                        $(divMessageID).addClass("stageMessageError");
                        $(divMessageID).removeClass("stageMessage");
                        //ERROR
                        break;

                    default:
                        $(divMessageID).addClass("stageMessage");
                        $(divMessageID).removeClass("stageMessageError");
                        break;
                }


                $(divMessageID).toggle(!(message == ''));
                //$(divMessageID).innerHTML = message.trim();
                document.getElementById("divMessage").innerHTML = message.trim();


            },

            ClearStage: function () {
                $("#divMessage").toggle(false);
                //AutomatedSearch.DisplayMessage('', 0);
                $("#divChooseColumn").html('');
                $("#divColumnQS").html('');
                $("#divDroppable").html('');
                document.getElementById("queryString").checked = false;

                $("#divColumnContainer").hide();
                $("#divQSContainer").hide();
            },

            // DROP ITEM
            AppendColumnElement: function (columnName, columnAlias, identifier) {

                $("#" + identifier).remove();

                var postIdentifier = identifier;

                var html = '';

                // [ NEW DROPPED ITEM ]
                html += '    <div class="wrapAlias">';
                html += '        <span class="icon-close" id="btnRemoveColElement_' + postIdentifier + '"></span>';
                html += '        <div id="' + identifier + '" class="dropItem" >';
                html += '            <div class="dropItemHeader">' + columnName + '</div>';

                html += '            <label>Alias </label>';
                html += '            <input type="text" name="colAlias_' + postIdentifier + ']" value=' + columnAlias + ' />'

                html += '        </div>';
                html += '    </div>';
                //html += '</div>';

                $("#divDroppable").append(html);

                $('#btnRemoveColElement_' + postIdentifier).on('click', function () {
                    var queryStringIdentity = columnName + "_" + postIdentifier;

                    //var qsElement = '<div class="qsItem"><label class="ui-widget-content divDraggable"  id="' + queryStringIdentity + '"> ' + columnName + ' </label></div>';
                    var qsElement = '<label class="ui-widget-content divDraggable"  id="' + queryStringIdentity + '"> ' + columnName + ' </label>';
                    $("#divColumnQS").append(qsElement);
                    $(this).parent().remove();
                    AutomatedSearch.AddDraggable();
                });

                $("#divDroppable").sortable();
            },


            DeleteSettingByID: function (configID) {
                AutomatedSearch.config.url = AutomatedSearch.config.baseURL + "DeleteSettingByID";
                AutomatedSearch.config.data = JSON.stringify({
                    portalID: parseInt(SageFramePortalID),
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken,
                    searchConfigurationID: configID
                });
                AutomatedSearch.config.ajaxCallMode = AutomatedSearch.DeleteSettingCallBack;
                AutomatedSearch.ajaxCall(AutomatedSearch.config);
            },
            DeleteSettingCallBack: function (data) {
                AutomatedSearch.DisplayMessageCode(data.d);
                if (data.d != null && data.d.Code === 1) {
                    if (controlToRemove != null) {
                        controlToRemove.remove();
                        controlToRemove = null;
                    }
                }
            },

            SaveData: function () {

                //AutomatedSearch.DisplayMessage('', 1);

                var itemsCount = $("#divChooseColumn").children().length;
                if (itemsCount > 0) {

                    var moduleName = $("#slcModule").val();
                    var tableName = selectedTable;

                    var selectedColumns = $("input[name=chooseColumn]:checked")
                        .map(function () { return $(this).val(); })
                        .get();

                    var isExtensionLess = $("#extensionLess").is(":checked");
                    var queryStringEnabled = $("#queryString").is(":checked");


                    var colAliasNames = [];
                    var colAlisHeaders = [];

                    if (queryStringEnabled) {
                        colAlisHeaders = $(".dropItemHeader")
                            .map(function () { return $(this).text(); })
                            .get();

                        colAliasNames = $(".dropItem")
                            .children("input")
                            .map(function () { return $(this).val(); })
                            .get();

                    }

                    if (queryStringEnabled && colAlisHeaders.length <= 0) {
                        var msg = "No items are selected for the query string";
                        AutomatedSearch.NotifySF(msg, "Error");

                    } else {

                        var params = {
                            portalID: parseInt(SageFramePortalID),
                            userModuleID: p.userModuleID,
                            userName: SageFrameUserName,
                            secureToken: SageFrameSecureToken,
                            GateWaySettings: {
                                PortalID: this.config.portalID,
                                SearchConfigurationID: searchConfigurationID,
                                ModuleName: moduleName,
                                TableName: tableName,
                                ChoosenColumns: selectedColumns,
                                IsExtensionLess: isExtensionLess,
                                ColumnAliasHeaders: colAlisHeaders,
                                ColumnAliasNames: colAliasNames
                            }
                        };


                        AutomatedSearch.config.url = AutomatedSearch.config.baseURL + "SaveSettings";
                        AutomatedSearch.config.data = JSON2.stringify(params),
                        AutomatedSearch.config.ajaxCallMode = AutomatedSearch.SaveSuccess;
                        AutomatedSearch.ajaxCall(AutomatedSearch.config);
                    }

                }
                else {
                    var msg = "No columns selected";
                    AutomatedSearch.NotifySF(msg, "Error");

                }
            },

            SaveSuccess: function (data) {
                if (data.d != null && data.d != '') {
                    AutomatedSearch.Reset();
                    AutomatedSearch.NotifySF("Settings were updated", "Success");

                    settingsUpdated = true;
                }
            },

            Reset: function () {
                selectedTable = '';
                $("#divMessage").toggle(true);
                $('#divSelectedTable').html('No Table Selected');
                searchConfigurationID = 0;
                AutomatedSearch.ClearStage();
                $("#slcModule").prop('selectedIndex', 0);
                $('#searchTable').val('');
                AutomatedSearch.FilterTable(tables);
                AutomatedSearch.GetConfigurationSettings();
            }
        };
        AutomatedSearch.init();
    }
    $.fn.AutomatedSearch = function (p) {
        $.AutomatedSearch(p);
    };
})(jQuery);
