(function ($) {
    $.Advertisement = function (p) {
        var validator;
        p = $.extend
            ({
                mediaType: "*",
            }, p);
        var AdvertisementConfig = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: { data: '' },
                data2: '',
                dataType: 'json',
                processData: true,
                baseURL: "/Modules/ArticleAdmin/AdvertisementAdmin/Services/Advertisement.asmx/",
                method: "",
                successMethod: "",
                errorMethod: "",
                ajaxCallMode: 0,
                CategoryArr: [],
                authParam: { PortalID: SageFramePortalID, UserModuleID: UserModuleID, UserName: SageFrameUserName, SecureToken: SageFrameSecureToken },
                offset: 0,
                currentPageNo: 0,
                noOfItemOnPagination: 10,
                filepath: '/Modules/ArticleAdmin/AdvertisementAdmin/images/original/default',
                filepathMob: '/Modules/ArticleAdmin/AdvertisementAdmin/images/original/mobile',
                cropDefPath: '/Modules/ArticleAdmin/AdvertisementAdmin/images/cropped/default',
                cropMobPath: '/Modules/ArticleAdmin/AdvertisementAdmin/images/cropped/mobile',
                defaultAd: '',
                mobileAd: '',
                defaultAdOg: '',
                mobileAdOg: '',
                startDate: '',
                imgHeight: '',
                imgWidth: '',
                mobImgHeight: '',
                mobImgWidth: '',
                defImageData: '',
                mobImageData: '',
                file: '',
                filePaths: '',
                fileMobile: '',
                filePathsMobile: '',
            },
            FilterInfo: {
                BrandID: 0,
                CategoryIDs: '<category></category>',
                DateFrom: '',
                DateTo: ''
            },
            init: function () {
                $('#filterDiv').createSideBarForm({
                    title: 'Filter',
                    openButton: $('#btnOpenFilter'),
                });
                AdvertisementConfig.datePickerFunction();
                AdvertisementConfig.resetValidation();
                AdvertisementConfig.GetCategory();
                AdvertisementConfig.GetBrand();
                AdvertisementConfig.GetAllSizes();
                AdvertisementConfig.enableDisableDates();
                AdvertisementConfig.fileUpload(AdvertisementConfig.config.filepath);
                AdvertisementConfig.fileUpload2(AdvertisementConfig.config.filepathMob);
                AdvertisementConfig.GetUserInput();
                AdvertisementConfig.loadAdToEdit(0, AdvertisementConfig.config.noOfItemOnPagination, 0);
                AdvertisementConfig.radioClicked();
                AdvertisementConfig.addClick();
                AdvertisementConfig.editClick();
                AdvertisementConfig.deleteClick();
                AdvertisementConfig.cancelClick();
                AdvertisementConfig.selectAllClick();
                AdvertisementConfig.deleteAllClick();
                AdvertisementConfig.getAdSearchInput();
                AdvertisementConfig.imgUploadDelete();
                AdvertisementConfig.cropFunctions();
                AdvertisementConfig.effectsClick();
                AdvertisementConfig.uploadValidate();
            },
            ajaxCall: function (config) {
                $.ajax({
                    type: AdvertisementConfig.config.type,
                    contentType: AdvertisementConfig.config.contentType,
                    processData: AdvertisementConfig.config.processData,
                    cache: AdvertisementConfig.config.cache,
                    url: AdvertisementConfig.config.baseURL + AdvertisementConfig.config.method,
                    data: AdvertisementConfig.config.data,
                    dataType: AdvertisementConfig.config.dataType,
                    success: AdvertisementConfig.config.successMethod,
                    error: AdvertisementConfig.ajaxFailure,
                    async: AdvertisementConfig.config.async
                });
            },
            ajaxFailure: function () {
                SageFrame.messaging.show("Oops!! Something Went Wrong", "Error");
            },
            BindPagination: function (RowTotal) {
                if (RowTotal > AdvertisementConfig.config.noOfItemOnPagination) {
                    $('#adPagi').show().pagination(RowTotal, {
                        items_per_page: AdvertisementConfig.config.noOfItemOnPagination,
                        current_page: AdvertisementConfig.config.currentPageNo,
                        num_edge_entries: 2,
                        callfunction: true,
                        function_name: {
                            name: AdvertisementConfig.loadAdToEdit,
                            limit: AdvertisementConfig.config.noOfItemOnPagination,
                        },
                        prev_text: ' ',
                        next_text: ' '
                    });
                } else {
                    $('#adPagi').hide();
                }
            },
            loadAdToEdit: function (offset, limit, current) {
                AdvertisementConfig.config.currentPageNo = current;
                AdvertisementConfig.config.offset = current * limit;
                AdvertisementConfig.config.method = "SearchAllAds";
                AdvertisementConfig.config.data = JSON.stringify({
                    commonAuth: AdvertisementConfig.config.authParam,
                    PageNumber: AdvertisementConfig.config.offset,
                    PageSize: AdvertisementConfig.config.noOfItemOnPagination,
                    SiteID: SiteID,
                    objInfo: AdvertisementConfig.FilterInfo,
                });
                AdvertisementConfig.config.successMethod = AdvertisementConfig.loadAdToEditSuccess;
                AdvertisementConfig.ajaxCall(AdvertisementConfig.config);
            },
            loadAdToEditSuccess: function (data) {
                var adList = data.d;
                var adHtml = "";
                var totalRow = 0;
                if (adList.length > 0) {
                    totalRow = adList[0].TotalRow;
                    $.each(adList, function (index, item) {
                        adHtml += "<div class='grid_listing clearfix'><div class='grid_summary'><div class='grid_selectors'><input value='" + item.AdvsID + "' type='checkbox' name='cBox'><label></label></div>";
                        adHtml += "<div class='grid_summary_detail'><div class='grid_detail_title grid_detail_title--large' >Brand: ";
                        adHtml += item.BrandName;
                        adHtml += "</div >";
                        adHtml += "<div class='grid_detail_newsfeature'><small class='grid_detail_newsfeature_attribute'><strong>Category: </strong>";
                        adHtml += item.CategoryName;
                        adHtml += "</small></div>";
                        adHtml += "<div class='grid_detail_newsfeature'>";
                        adHtml += "<small class='grid_detail_newsfeature_attribute'><strong>Size: </strong>";
                        adHtml += item.Size;
                        adHtml += "</small><small class='grid_detail_newsfeature_attribute'><strong>Mobile Size: </strong>";
                        adHtml += item.MobileSize;
                        adHtml += "</small></div>";
                        if (item.EndDate === "/Date(-62135596800000)/") {
                            adHtml += "<div class='grid_detail_newsfeature'>";
                            adHtml += "<small class='grid_detail_newsfeature_attribute'><strong>Start Date: </strong>";
                            adHtml += AdvertisementConfig.convertToDate(item.StartDate);
                            adHtml += "</small><small class='grid_detail_newsfeature_attribute'><strong>End Date: </strong>";
                            adHtml += "No Expiry";
                            adHtml += "</small></div>";
                        } else {
                            adHtml += "<div class='grid_detail_newsfeature'>";
                            adHtml += "<small class='grid_detail_newsfeature_attribute'><strong>Start Date: </strong>";
                            adHtml += AdvertisementConfig.convertToDate(item.StartDate);
                            adHtml += "</small><small class='grid_detail_newsfeature_attribute'><strong>End Date: </strong>";
                            adHtml += AdvertisementConfig.convertToDate(item.EndDate);
                            adHtml += "</small></div>";
                        }
                        if (item.DetailLink !== "") {
                            adHtml += "<div class='grid_detail_newsfeature'>";
                            adHtml += "<small class='grid_detail_newsfeature_attribute'><strong>Detail Link: </strong>";
                            adHtml += item.DetailLink;
                            adHtml += "</small></div></div>";
                        } else {
                            adHtml += "</div>";
                        }
                        if (item.DefaultFileName !== "") {
                            adHtml += "<div class='grid_image'><img src='/Modules/ArticleAdmin/AdvertisementAdmin/images/thumb/" + item.DefaultFileName + "' ></div >";
                        }
                        adHtml += "<div class='grid_action'><div id='actions' class='actiononClickShow' style='display: none; '><div class='actiononClickShowInfo'>";
                        adHtml += "<p><a id='btnEditAd' href='javascript:void(0)' class='edit' data-adid='" + item.AdvsID + "' >Edit</a><a id='btnDeleteAd' href='javascript:void(0)' class='delete' data-adid='" + item.AdvsID + "'>Delete</a></p></div></div>";
                        adHtml += "<p class='actionclass' id='actionlink'><a href='javascript:void(0)'><i class='fa fa-ellipsis-v'></i></a></p></div></div></div></div>";
                    });
                    $("#adList").html(adHtml);
                } else if (AdvertisementConfig.config.currentPageNo > 0) {
                    AdvertisementConfig.config.currentPageNo = AdvertisementConfig.config.currentPageNo - 1;
                    AdvertisementConfig.config.offset = (AdvertisementConfig.config.currentPageNo) * AdvertisementConfig.config.noOfItemOnPagination;
                    AdvertisementConfig.loadAdToEdit(AdvertisementConfig.config.offset, AdvertisementConfig.config.noOfItemOnPagination, AdvertisementConfig.config.currentPageNo);
                } else {
                    adHtml = "<h3>..............  No data to display ...............</h3>";
                    $("#adList").html(adHtml);
                }
                AdvertisementConfig.BindPagination(totalRow);
                AdvertisementConfig.onActionClick();
            },
            addClick: function () {
                $("#btnAddNewAdvertisement").on('click', function () {
                    $("#ddlDuration").prop("disabled", true);
                    $("#ddlDuration2").prop("disabled", true);
                    $("#ddlDuration4").prop("disabled", true);
                    $("#txtEndDate").prop("disabled", true);
                    $("#ddlMobSize").prop("disabled", true);
                    $("#MainForm").show();
                    $("#MainGrid").hide();
                    $("#txtAdvId").text('')
                    if ($("#ddlSize option:selected").val() === "0") {
                        $(".MediaFile").prop("disabled", true);
                    }
                    if ($("#ddlMobSize option:selected").val() === "0") {
                        $(".MediaFile2").prop("disabled", true);
                    }
                });
            },
            editClick: function () {
                $("#adList").on('click', "#btnEditAd", function () {
                    $("#ddlDuration").prop("disabled", true);
                    $("#ddlDuration2").prop("disabled", true);
                    $("#ddlDuration4").prop("disabled", true);
                    $("#txtEndDate").prop("disabled", true);
                    var adID = $(this).data("adid");
                    AdvertisementConfig.getdataByAdIdEdit(adID);
                    if (AdvertisementConfig.config.imgWidth === "" && AdvertisementConfig.config.imgHeight === "") {
                        AdvertisementConfig.getDefImgSize();
                    }
                    if (AdvertisementConfig.config.mobImgWidth === "" && AdvertisementConfig.config.mobImgHeight === "") {
                        AdvertisementConfig.getMobImgSize();
                    }
                    AdvertisementConfig.loadCropCategoryDef();
                    AdvertisementConfig.loadCropCategoryMob();
                    $("#MainForm").show();
                    $("#MainGrid").hide();
                });
            },
            selectAllClick: function () {
                $("#btnSelectAll").on('click', function () {
                    var checkData = $(this).data();
                    var checkBoxesValue = $("input[name='cBox']");
                    checkBoxesValue.prop("checked", !checkData.checked);
                    checkData.checked = !checkData.checked;
                });
            },
            deleteAllClick: function () {
                $("#btnSelectDelete").on('click', function () {
                    var checkedData = $("input[name='cBox']:checked").map(function () {
                        return this.value;
                    }).get();
                    if (checkedData.length > 0) {
                        jConfirm('Do you want to delete selected ad?', 'Confirm', function (r) {
                            if (r) {
                                while (checkedData.length > 0) {
                                    AdvertisementConfig.deleteAd(checkedData[checkedData.length - 1]);
                                    checkedData.length--;
                                }
                                AdvertisementConfig.loadAdToEdit(AdvertisementConfig.config.offset, AdvertisementConfig.config.noOfItemOnPagination, AdvertisementConfig.config.currentPageNo);
                            }
                        });
                    } else {
                        SageFrame.messaging.show("Select ad to delete.", "Error");
                    }
                });
            },
            deleteClick: function () {
                $("#adList").on('click', '#btnDeleteAd', function () {
                    var adID = $(this).data("adid");
                    jConfirm('Do you want to delete selected ad?', 'Confirm', function (r) {
                        if (r) {
                            AdvertisementConfig.deleteAd(adID);
                            AdvertisementConfig.loadAdToEdit(AdvertisementConfig.config.offset, AdvertisementConfig.config.noOfItemOnPagination, AdvertisementConfig.config.currentPageNo);
                        }
                    });
                });
            },
            cancelClick: function () {
                $("#btnCancel").on('click', function () {
                    $("#MainForm").hide();
                    $("#MainGrid").show();
                    AdvertisementConfig.clearance();
                });
            },
            clearance: function () {
                $('.sfListmenu').prop("selectedIndex", 0);
                $("#dvUploadWrapperDrop").html('<p><i class=fa fa- cloud - upload" aria-hidden="true"></i>Drag files here or click to upload</p></div>');
                $("#dvUploadWrapperDrop2").html('<p><i class="fa fa- cloud - upload" aria-hidden="true"></i>Drag mobile ad here or click to upload</p></div>');
                $('input[type=text]').val('');
                $("#txtAdvId").val('')
                $('#txtRemarks').val('');
                $('input[name=chkCat]').attr("checked", false);
                $('input[type=radio]').attr("checked", false);
                $('.sfError').text('');
                $("#defaulImgClose").hide();
                $("#mobImgClose").hide();
                AdvertisementConfig.config.file = '';
                AdvertisementConfig.config.filePaths = '';
                AdvertisementConfig.config.fileMobile = '';
                AdvertisementConfig.config.filePathsMobile = '';
            },
            enableDisableDates: function () {
                $("#durationError").text("");
                $("#endDateError").text("");
                $("#ddlDuration").prop("disabled", true);
                $("#ddlDuration2").prop("disabled", true);
                $("#ddlDuration4").prop("disabled", true);
                $("#txtEndDate").prop("disabled", true);
                $("#rdbDuration").on("click", function () {
                    if ($(this).is(":checked")) {
                        $("#txtEndDate").prop("disabled", true);
                        $("#ddlDuration").prop("disabled", false);
                        $("#ddlDuration2").prop("disabled", false);
                        $("#ddlDuration4").prop("disabled", false);
                        $('#ui-datepicker-div').css('display', 'none');
                        $('#txtEndDate').datepicker('setDate', null);
                        $("#endDateError").text("");
                    }
                });
                $("#rdbEndDate").on("click", function () {
                    if ($(this).is(":checked")) {
                        $("#ddlDuration").prop("disabled", true);
                        $("#ddlDuration2").prop("disabled", true);
                        $("#ddlDuration4").prop("disabled", true);
                        $("#txtEndDate").prop("disabled", false);
                        $("#durationError").text("");
                        $("#ddlDuration").prop("selectedIndex", 0);
                        $("#ddlDuration2").prop("selectedIndex", 0);
                        $("#ddlDuration4").prop("selectedIndex", 0);
                    }
                });
                $("#rdbNoExpiry").on("click", function () {
                    if ($(this).is(":checked")) {
                        $("#ddlDuration").prop("disabled", true);
                        $("#ddlDuration2").prop("disabled", true);
                        $("#ddlDuration4").prop("disabled", true);
                        $("#txtEndDate").prop("disabled", true);
                        $("#durationError").text("");
                        $("#endDateError").text("");
                        $('#txtEndDate').datepicker('setDate', null);
                        $("#ddlDuration").prop("selectedIndex", 0);
                        $("#ddlDuration2").prop("selectedIndex", 0);
                        $("#ddlDuration4").prop("selectedIndex", 0);
                    }
                });
            },
            getAdSearchInput: function () {
                $("#filterDiv").on("click", "#btnDateSearch", function () {
                    AdvertisementConfig.FilterInfo.BrandID = $("#ddlSearch").val();
                    AdvertisementConfig.FilterInfo.CategoryIDs = $('input[name="chkCat2"]:checked').map(function () {
                        return this.value;
                    }).get();
                    var catxml = '<category>';
                    if (AdvertisementConfig.FilterInfo.CategoryIDs.length > 0) {
                        for (var i = 0; i < AdvertisementConfig.FilterInfo.CategoryIDs.length; i++) {
                            catxml += '<catid>' + AdvertisementConfig.FilterInfo.CategoryIDs[i] + '</catid>'
                        }
                    }
                    catxml += '</category>';
                    AdvertisementConfig.FilterInfo.CategoryIDs = catxml;
                    AdvertisementConfig.FilterInfo.DateFrom = $("#txtDateFrom").val();
                    AdvertisementConfig.FilterInfo.DateTo = $("#txtDateTo").val();
                    AdvertisementConfig.loadAdToEdit(0, AdvertisementConfig.config.noOfItemOnPagination, 0);
                });
                $("#filterDiv").on("click", "#btnReset", function () {
                    AdvertisementConfig.FilterInfo.BrandID = 0;
                    AdvertisementConfig.FilterInfo.CategoryIDs = '<category></category>';
                    AdvertisementConfig.FilterInfo.DateFrom = '';
                    AdvertisementConfig.FilterInfo.DateTo = '';
                    $("#ddlSearch").prop('selectedIndex', 0);
                    $('input[name="chkCat2"]').prop('checked', false);
                    $('#txtDateFrom').datepicker('setDate', null);
                    $('#txtDateTo').datepicker('setDate', null);
                    $("#txtDateTo").datepicker("option", "minDate", null)
                    $('#ui-datepicker-div').css('display', 'none');
                    $('.sfPagination').show();
                    AdvertisementConfig.loadAdToEdit(0, AdvertisementConfig.config.noOfItemOnPagination, 0);
                });
            },
            GetCategory: function () {
                AdvertisementConfig.config.method = "GetCategoryAll";
                AdvertisementConfig.config.data = JSON.stringify({
                    SiteID: SiteID,
                    commonAuth: AdvertisementConfig.config.authParam
                });
                AdvertisementConfig.config.successMethod = AdvertisementConfig.GetCategorySuccess;
                AdvertisementConfig.ajaxCall(AdvertisementConfig.config);
            },
            GetCategorySuccess: function (data) {
                if (data.d != null) {
                    var Lstdata = data.d;
                    AdvertisementConfig.config.CategoryArr = data.d;
                    var html = '<ul>';
                    var htmls = '<ul class="fltrCatLst twocolcheckbox clearfix">';
                    if (Lstdata.length > 0) {
                        $.each(Lstdata, function (index, item) {
                            html += '<li data-categoryid=' + item.CategoryID + '><input type="checkbox" id="chkIs' + item.CategoryName + '" name="chkCat" value="' + item.CategoryID + '"><label for="chkIs' + item.CategoryName + '">' + item.CategoryName + '</label></li>';
                            htmls += '<li data-categoryid=' + item.CategoryID + '><input type="checkbox" class="cat" id="chkIs2' + item.CategoryName + '" name="chkCat2" value="' + item.CategoryID + '"><label for="chkIs2' + item.CategoryName + '">' + item.CategoryName + '</label></li>';
                        });
                    }
                    html += '</ul>';
                    $('#CategoryList').html(html);
                    $('#CategoryListFilter').html(htmls);
                }
            },
            GetBrand: function () {
                AdvertisementConfig.config.method = "GetAllBrands";
                AdvertisementConfig.config.data = JSON.stringify({
                    SiteID: SiteID,
                    commonAuth: AdvertisementConfig.config.authParam
                });
                AdvertisementConfig.config.successMethod = AdvertisementConfig.GetBrandSuccess;
                AdvertisementConfig.ajaxCall(AdvertisementConfig.config);
            },
            GetBrandSuccess: function (data) {
                if (data.d != null) {
                    var brandData = data.d;
                    $.each(brandData, function (index, item) {
                        $("#ddlBrand").append($("<option></option>").val(item.BrandID).html(item.Name));
                    });
                    $.each(brandData, function (index, item) {
                        $("#ddlSearch").append($("<option></option>").val(item.BrandID).html(item.Name));
                    });
                }
            },
            GetAllSizes: function () {
                AdvertisementConfig.config.method = "GetAllSizes";
                AdvertisementConfig.config.data = JSON.stringify({
                    SiteID: SiteID,
                    commonAuth: AdvertisementConfig.config.authParam
                });
                AdvertisementConfig.config.successMethod = AdvertisementConfig.GetAllSizesSuccess;
                AdvertisementConfig.ajaxCall(AdvertisementConfig.config);
            },
            GetAllSizesSuccess: function (data) {
                if (data.d != null) {
                    var sizeData = data.d;
                    $.each(sizeData, function (index, item) {
                        $("#ddlSize").append($("<option data-mob='" + item.SizeID + "'></option>").val(item.SizeID).html(item.Size));
                    });
                    $.each(sizeData, function (index, item) {
                        $("#ddlMobSize").append($("<option></option>").val(item.SizeID).html(item.MobileSize));
                    });
                }
            },
            getdataByAdIdEdit: function (adID) {
                AdvertisementConfig.config.method = "GetDataByAdId";
                AdvertisementConfig.config.data = JSON.stringify({
                    SiteID: SiteID,
                    adID: adID,
                    commonAuth: AdvertisementConfig.config.authParam
                });
                AdvertisementConfig.config.successMethod = AdvertisementConfig.getdataByAdIdEditSuccess;
                AdvertisementConfig.ajaxCall(AdvertisementConfig.config);
            },
            getdataByAdIdEditSuccess: function (data) {
                var adDetails = data.d;
                $("#txtAdvId").val(adDetails[0].AdvsID);
                $("#ddlBrand").val(adDetails[0].BrandID);
                $("#ddlSize").val(adDetails[0].Size);
                $("#ddlMobSize").val(adDetails[0].MobileSize);
                var defSplitVar = adDetails[0].DefaultFileName.split('.');
                var mobSplitVar = adDetails[0].MobileFileName.split('.');
                if (adDetails[0].DefaultFileName != "") {
                    AdvertisementConfig.config.defaultAdOg = adDetails[0].DefaultFileName;
                    AdvertisementConfig.config.defaultAd = adDetails[0].DefaultFileName;
                    if (defSplitVar[1] === 'gif') {
                        $("#relativeDef").addClass("gif");
                    } else {
                        $("#relativeDef").removeClass("gif");
                    }
                    $("#dvUploadWrapperDrop").html("<img src='" + AdvertisementConfig.config.cropDefPath + '/' + adDetails[0].DefaultFileName + "' id='defaultImage'/>");
                }
                if (adDetails[0].MobileFileName != "") {
                    AdvertisementConfig.config.mobileAdOg = adDetails[0].MobileFileName;
                    AdvertisementConfig.config.mobileAd = adDetails[0].MobileFileName;
                    if (mobSplitVar[1] === 'gif') {
                        $("#relativeMob").addClass("gif");
                    } else {
                        $("#relativeMob").removeClass("gif");
                    }
                    $("#dvUploadWrapperDrop2").html("<img src='" + AdvertisementConfig.config.cropMobPath + '/' + adDetails[0].MobileFileName + "' id='mobileImage'/>");
                }
                if (AdvertisementConfig.config.defImageData === "") {
                    AdvertisementConfig.config.defImageData = AdvertisementConfig.config.cropDefPath + '/' + adDetails[0].DefaultFileName;
                }
                if (AdvertisementConfig.config.mobImageData === "") {
                    AdvertisementConfig.config.mobImageData = AdvertisementConfig.config.cropMobPath + '/' + adDetails[0].MobileFileName;
                }
                $('#ui-datepicker-div').css('display', 'none');
                $("#txtStartDate").datepicker("setDate", new Date(AdvertisementConfig.convertToDate(adDetails[0].StartDate)));
                var date2 = $('#txtStartDate').datepicker('getDate');
                date2.setDate(date2.getDate() + 1);
                $("#txtEndDate").datepicker("option", "minDate", date2);
                if (adDetails[0].EndDate != "/Date(-62135596800000)/") {
                    $("#rdbEndDate").prop("checked", "checked");
                    $("#ddlDuration").prop("disabled", true);
                    $("#ddlDuration2").prop("disabled", true);
                    $("#ddlDuration4").prop("disabled", true);
                    $("#txtEndDate").prop("disabled", false);
                    $("#txtEndDate").datepicker("setDate", new Date(AdvertisementConfig.convertToDate(adDetails[0].EndDate)));
                }
                if (adDetails[0].IsNoExpire === true) {
                    $("#rdbNoExpiry").prop("checked", "checked");
                }
                $("#txtLink").val(AdvertisementConfig.reverseSlashes(adDetails[0].DetailLink));
                $("#txtRemarks").val(AdvertisementConfig.reverseSlashes(adDetails[0].Remarks));
                var catSplitVar = adDetails[0].CategoryID.split(',');
                for (var i = 0; i < catSplitVar.length; i++) {
                    $('input[name=chkCat][value=' + catSplitVar[i] + ']').prop("checked", "checked");
                }
            },
            fileUpload: function (filePath) {
                var html = '<div class="relative rel" id="relativeDef"><div class="droppable" id="dvUploadWrapperDrop"><p><i class="fa fa-cloud-upload" aria-hidden="true"></i>Drag files here or click to upload</p></div><div class="addelete fa fa-ellipsis-h" id="defaulImgClose" style="display:none"></div></div>';
                $('#fileUploaderDef').html(html);
                AdvertisementConfig.FileUploader('MediaFile',
                    '#dvUploadWrapperDrop',
                    '.productList',
                    'png,jpg',
                    AdvertisementConfig.config.filepath + '/',
                    AdvertisementConfig.FileUploaded);
            },
            fileUpload2: function (filePath) {
                var html = '<div class="relative rel" id="relativeMob"><div class="droppable" id="dvUploadWrapperDrop2"><p><i class="fa fa-cloud-upload" aria-hidden="true"></i>Drag mobile ad here or click to upload</p ></div><div class="addelete fa fa-ellipsis-h" id="mobImgClose" style="display:none;"></div></div>';
                $('#fileUploaderMob').html(html);
                AdvertisementConfig.FileUploader('MediaFile2',
                    '#dvUploadWrapperDrop2',
                    '.productList',
                    'png,jpg',
                    filePath + '/',
                    AdvertisementConfig.FileUploaded2);
            },
            FileUploader: function (fileClassName, dragZone, outputMessageID, extension, savePath, callback) {
                $(this).DragUploader({
                    userModuleID: UserModuleID,
                    extension: extension,
                    response: '',
                    outputMessageID: outputMessageID,
                    fileClassName: fileClassName,
                    PortalID: SageFramePortalID,
                    sageFrameSecureToken: SageFrameSecureToken,
                    UserName: SageFrameUserName,
                    path: p.componentPath,
                    dragZone: dragZone,
                    savaPath: savePath,
                    encodeQuality: '20L',
                    callback: callback,
                    UploadHandlerPath: SageFrameAppPath + '/Modules/ArticleAdmin/AdvertisementAdmin/',
                });
            },
            FileUploaded: function (response) {
                if (response != null) {
                    var resp = response.split("###");
                    if (resp[0] == "1") {
                        AdvertisementConfig.config.defaultAdOg = resp[2];
                        var splitvar = AdvertisementConfig.config.defaultAdOg.split('.');
                        if (splitvar[1] === 'gif') {
                            $("#relativeDef").addClass("gif");
                            $("#dvUploadWrapperDrop").html("<img src='" + AdvertisementConfig.config.cropDefPath + '/' + AdvertisementConfig.config.defaultAdOg + "' id='defaultImage'/>");
                        } else {
                            $("#relativeDef").removeClass("gif");
                            AdvertisementConfig.loadCropCategoryDef();
                            AdvertisementConfig.loadDefCropper();
                        }
                    } else {
                        SageFrame.messaging.show("Not a valid file Extension", "alert");
                    }
                }
            },
            loadCropCategoryDef: function () {
                $("#defaulImgClose").show();
                var html = '';
                html += '<div class="type-action" id="defImgAction" style="display:none;"><ul class="type-action-list">';
                html += '<li class="previewMedia actions"><span id="prevDefImg"><i class="fa fa-eye" aria-hidden="true"></i> Preview</span></li>';
                html += '<li class="move actions"><span id="editDefImg"><i class="fa fa-sliders" aria-hidden="true"></i> Edit</span></li>';
                html += '</ul></div>';
                $('#defaulImgClose').html(html);
            },
            loadDefCropper: function () {
                $("#MainForm").fadeOut();
                $("#MainGrid").fadeOut();
                $("#cropperDiv").fadeIn();
                $(document.body).append("<div class = 'cropper-overlay'></div>");
                $('.image-editor').cropit('reenable');
                $('.image-editor').cropit({
                    originalSize: true,
                    imageBackground: true,
                    imageBackgroundBorderWidth: 200,
                    width: AdvertisementConfig.config.imgWidth,
                    height: AdvertisementConfig.config.imgHeight,
                    initialZoom: 'image',
                    smallImage: 'allow',
                    minZoom: 'fit',
                    maxZoom: 1.5,
                    imageState: {
                        src: AdvertisementConfig.config.filepath + '/' + AdvertisementConfig.config.defaultAdOg,
                    },
                });

            },
            FileUploaded2: function (response) {
                if (response != null) {
                    var resp = response.split("###");
                    if (resp[0] == "1") {
                        AdvertisementConfig.config.mobileAdOg = resp[2];
                        var splitvar = AdvertisementConfig.config.mobileAdOg.split('.');
                        if (splitvar[1] === 'gif') {
                            $("#relativeMob").addClass("gif");
                            $("#dvUploadWrapperDrop2").html("<img src='" + AdvertisementConfig.config.cropMobPath + '/' + AdvertisementConfig.config.mobileAdOg + "' id='mobileImage'/>");
                        } else {
                            $("#relativeMob").removeClass("gif");
                            AdvertisementConfig.loadCropCategoryMob();
                            AdvertisementConfig.loadMobCropper();
                        }
                    }
                    else {
                        SageFrame.messaging.show("Not a valid file Extension", "alert");
                    }
                }
            },
            loadCropCategoryMob: function () {
                $("#mobImgClose").show();
                var html = '';
                html += '<div class="type-action" id="mobImgAction" style="display:none;"><ul class="type-action-list">';
                html += '<li class="previewMedia actions"><span id="prevMobImg"><i class="fa fa-eye" aria-hidden="true"></i> Preview</span></li>';
                html += '<li class="move actions"><span id="editMobImg"><i class="fa fa-sliders" aria-hidden="true"></i> Edit</span></li>';
                html += '</ul></div>';
                $('#mobImgClose').html(html);
            },
            loadMobCropper: function () {
                $("#MainForm").fadeOut();
                $("#MainGrid").fadeOut();
                $("#cropperDivMob").fadeIn();
                $(document.body).append("<div class = 'cropper-overlayMob'></div>");
                $('.image-editorMob').cropit({
                    originalSize: true,
                    imageBackground: true,
                    imageBackgroundBorderWidth: 200,
                    width: AdvertisementConfig.config.mobImgWidth,
                    height: AdvertisementConfig.config.mobImgHeight,
                    initialZoom: 'image',
                    smallImage: 'allow',
                    maxZoom: 1.5,
                    imageState: {
                        src: AdvertisementConfig.config.filepathMob + '/' + AdvertisementConfig.config.mobileAdOg,
                    },
                });
            },
            GetUserInput: function () {
                $("#btnSave").on('click', function () {
                    var advId = $("#txtAdvId").val();
                    var brandId = AdvertisementConfig.escapeHtml($("#ddlBrand").val());
                    var size = $("#ddlSize").val();
                    var mobSize = $("#ddlMobSize").val();
                    var defaultImage = AdvertisementConfig.config.defaultAd;
                    var mobileImage = AdvertisementConfig.config.mobileAd;
                    var defaultImageOg = AdvertisementConfig.config.defaultAdOg;
                    var mobileImageOg = AdvertisementConfig.config.mobileAdOg;
                    var startDate = $("#txtStartDate").val();
                    var year = $("#ddlDuration option:selected").text();
                    var month = $("#ddlDuration2 option:selected").text();
                    var days = $("#ddlDuration4 option:selected").text();
                    var yearSplit = year.split(' ');
                    var monthSplit = month.split(' ');
                    var daysSplit = days.split(' ');
                    var endDate = $("#txtEndDate").val();
                    var isNoExpire = $("#rdbNoExpiry").prop('checked');
                    var detailLink = AdvertisementConfig.escapeHtml($("#txtLink").val());
                    var remarks = AdvertisementConfig.escapeHtml($("#txtRemarks").val());
                    var wcCategory = $('input[name="chkCat"]:checked').map(function () {
                        return this.value;
                    }).get();
                    var catVar = [];
                    AdvertisementConfig.config.filePaths = AdvertisementConfig.config.cropDefPath + '/';
                    AdvertisementConfig.config.filePathsMobile = AdvertisementConfig.config.cropMobPath + '/';
                    if (AdvertisementConfig.validateAdvertisement(brandId, size, mobSize, startDate)) {
                        if (AdvertisementConfig.urlValidation($("#txtLink").val())) {
                            if (defaultImageOg !== "") {
                                AdvertisementConfig.config.file = document.getElementById("defaultImage").src;
                                if (mobileImageOg !== "") {
                                    AdvertisementConfig.config.fileMobile = document.getElementById("mobileImage").src;
                                    if (wcCategory.length > 0) {
                                        for (var i = 0; i < wcCategory.length; i++) {
                                            catVar.push(wcCategory[i]);
                                        }
                                        catVar = catVar.join() + ",";
                                        if (AdvertisementConfig.validateRadioButtons()) {
                                            if ($("#rdbDuration").prop("checked") === true) {
                                                if ($("#ddlDuration").val() != "1" || $("#ddlDuration2").val() != "1" || $("#ddlDuration4").val() != "1") {
                                                    endDate = $("#txtStartDate").datepicker("getDate");
                                                    if ($("#ddlDuration").val() != "1") {
                                                        endDate.setFullYear(endDate.getFullYear() + parseInt(yearSplit[0]));
                                                    }
                                                    if ($("#ddlDuration2").val() != "1") {
                                                        endDate.setMonth(endDate.getMonth() + parseInt(monthSplit[0]));
                                                    }
                                                    if ($("#ddlDuration4").val() != "1") {
                                                        endDate.setDate(endDate.getDate() + parseInt(daysSplit[0]));
                                                    }
                                                    if (advId === "") {
                                                        AdvertisementConfig.UploadDefImage(AdvertisementConfig.config.defaultAdOg, AdvertisementConfig.config.file, AdvertisementConfig.config.filePaths);
                                                        AdvertisementConfig.UploadMobImage(AdvertisementConfig.config.mobileAdOg, AdvertisementConfig.config.fileMobile, AdvertisementConfig.config.filePathsMobile);
                                                        AdvertisementConfig.saveAdvertisement(0, brandId, size, mobSize, AdvertisementConfig.config.defaultAdOg, AdvertisementConfig.config.mobileAdOg, startDate, endDate, isNoExpire, detailLink, remarks, AdvertisementConfig.config.authParam.UserName, catVar);
                                                    } else {
                                                        AdvertisementConfig.UploadDefImage(AdvertisementConfig.config.file, AdvertisementConfig.config.filePaths);
                                                        AdvertisementConfig.UploadMobImage(AdvertisementConfig.config.fileMobile, AdvertisementConfig.config.filePathsMobile);
                                                        AdvertisementConfig.saveAdvertisement(advId, brandId, size, mobSize, AdvertisementConfig.config.defaultAdOg, AdvertisementConfig.config.mobileAdOg, startDate, endDate, isNoExpire, detailLink, remarks, AdvertisementConfig.config.authParam.UserName, catVar);
                                                    }
                                                }
                                            }
                                            if ($("#rdbEndDate").prop("checked") === true) {
                                                if (endDate === "") {
                                                    $("#endDateError").text("End Date Is Required.");
                                                } else {
                                                    $("#endDateError").text("");
                                                    if (advId === "") {
                                                        AdvertisementConfig.UploadDefImage(AdvertisementConfig.config.defaultAdOg, AdvertisementConfig.config.file, AdvertisementConfig.config.filePaths);
                                                        AdvertisementConfig.UploadMobImage(AdvertisementConfig.config.mobileAdOg, AdvertisementConfig.config.fileMobile, AdvertisementConfig.config.filePathsMobile);
                                                        AdvertisementConfig.saveAdvertisement(0, brandId, size, mobSize, AdvertisementConfig.config.defaultAdOg, AdvertisementConfig.config.mobileAdOg, startDate, endDate, isNoExpire, detailLink, remarks, AdvertisementConfig.config.authParam.UserName, catVar)
                                                    } else {
                                                        AdvertisementConfig.UploadDefImage(AdvertisementConfig.config.defaultAdOg, AdvertisementConfig.config.file, AdvertisementConfig.config.filePaths);
                                                        AdvertisementConfig.UploadMobImage(AdvertisementConfig.config.mobileAdOg, AdvertisementConfig.config.fileMobile, AdvertisementConfig.config.filePathsMobile);
                                                        AdvertisementConfig.saveAdvertisement(advId, brandId, size, mobSize, AdvertisementConfig.config.defaultAdOg, AdvertisementConfig.config.mobileAdOg, startDate, endDate, isNoExpire, detailLink, remarks, AdvertisementConfig.config.authParam.UserName, catVar)
                                                    }
                                                }
                                            }
                                            if ($("#rdbNoExpiry").prop("checked") === true) {
                                                if (advId === "") {
                                                    AdvertisementConfig.UploadDefImage(AdvertisementConfig.config.defaultAdOg, AdvertisementConfig.config.file, AdvertisementConfig.config.filePaths);
                                                    AdvertisementConfig.UploadMobImage(AdvertisementConfig.config.mobileAdOg, AdvertisementConfig.config.fileMobile, AdvertisementConfig.config.filePathsMobile);
                                                    AdvertisementConfig.saveAdvertisement(0, brandId, size, mobSize, AdvertisementConfig.config.defaultAdOg, AdvertisementConfig.config.mobileAdOg, startDate, "2017 November 23", isNoExpire, detailLink, remarks, AdvertisementConfig.config.authParam.UserName, catVar)
                                                } else {
                                                    AdvertisementConfig.UploadDefImage(AdvertisementConfig.config.defaultAdOg, AdvertisementConfig.config.file, AdvertisementConfig.config.filePaths);
                                                    AdvertisementConfig.UploadMobImage(AdvertisementConfig.config.mobileAdOg, AdvertisementConfig.config.fileMobile, AdvertisementConfig.config.filePathsMobile);
                                                    AdvertisementConfig.saveAdvertisement(advId, brandId, size, mobSize, AdvertisementConfig.config.defaultAdOg, AdvertisementConfig.config.mobileAdOg, startDate, "2017 November 23", isNoExpire, detailLink, remarks, AdvertisementConfig.config.authParam.UserName, catVar)
                                                }
                                            }
                                        }
                                    } else {
                                        SageFrame.messaging.show("Select At Least One Category.", "Error");
                                    }
                                } else {
                                    SageFrame.messaging.show("Please Upload Your Mobile Image.", "Error");
                                }
                            } else {
                                SageFrame.messaging.show("Please Upload Your Default Image.", "Error");
                            }
                        } else {
                            $("#linkError").text("Please enter valid url in format: http://www.example.com .");
                        }
                    }
                });
            },
            UploadDefImage: function (originalImageName, base64image, filePaths) {
                var subString = 'data:image/png;base64';
                if (base64image.includes(subString)) {
                    AdvertisementConfig.config.method = "SaveDefaultImage";
                    AdvertisementConfig.config.data = JSON.stringify({
                        originalImageName: originalImageName,
                        base64image: base64image,
                        filePath: filePaths,
                        commonAuth: AdvertisementConfig.config.authParam
                    });
                    AdvertisementConfig.config.successMethod = AdvertisementConfig.UploadDefImageSuccess;
                    AdvertisementConfig.ajaxCall(AdvertisementConfig.config);
                }
            },
            UploadDefImageSuccess: function (data) {
                var imgData = data.d;
                AdvertisementConfig.config.defaultAd = imgData;
            },
            UploadMobImage: function (originalImageName, base64image, filePaths) {
                var subString = 'data:image/png;base64';
                if (base64image.includes(subString)) {
                    AdvertisementConfig.config.method = "SaveDefaultImage";
                    AdvertisementConfig.config.data = JSON.stringify({
                        originalImageName: originalImageName,
                        base64image: base64image,
                        filePath: filePaths,
                        commonAuth: AdvertisementConfig.config.authParam
                    });
                    AdvertisementConfig.config.successMethod = AdvertisementConfig.UploadMobImageSuccess;
                    AdvertisementConfig.ajaxCall(AdvertisementConfig.config);
                }
            },
            UploadMobImageSuccess: function (data) {
                var imgData = data.d;
                AdvertisementConfig.config.mobileAd = imgData;
            },
            validateAdvertisement: function (brandId, size, mobSize, startDate, remarks) {
                if (brandId === "0") {
                    $("#brandError").text("Select At Least One Brand.");
                }
                if (size === "0") {
                    $("#sizeError").text("Select At Least One Size.");
                }
                if (mobSize === "0") {
                    $("#mobsizeError").text("Select At Least One Size.");
                }
                if (startDate === "") {
                    $("#startDateError").text("Start Date Is Required.");
                }
                if (brandId === "0" || size === "0" || mobSize === "0" || startDate === "") {
                    return false;
                } else {
                    return true;
                }
            },
            validateRadioButtons: function () {
                var radioVar = document.getElementsByName('rdbSelect');
                if (!radioVar[0].checked && !radioVar[1].checked && !radioVar[2].checked) {
                    SageFrame.messaging.show("Select At Least One Among Duration Or End Date Or No Expiry Date", "Error");
                } else {
                    return true;
                }
            },
            getDefImgSize: function () {
                var size = $("#ddlSize option:selected").text();
                var sizeSplitX = size.split('x');
                AdvertisementConfig.config.imgWidth = $.trim(sizeSplitX[0]);
                var sizeSplitDash = sizeSplitX[1].split('–')
                AdvertisementConfig.config.imgHeight = $.trim(sizeSplitDash[0]);
            },
            getMobImgSize: function () {
                var mobSize = $("#ddlMobSize option:selected").text();
                var mobSizeSplitX = mobSize.split('x');
                AdvertisementConfig.config.mobImgWidth = $.trim(mobSizeSplitX[0]);
                AdvertisementConfig.config.mobImgHeight = $.trim(mobSizeSplitX[1]);
            },
            resetValidation: function () {
                $("#ddlBrand").on('change', function () {
                    if ($("#ddlBrand").val() != "0") {
                        $("#brandError").text("");
                    } else {
                        $("#brandError").text("Select At Least One Brand.");
                    }
                });
                $("#ddlSize").on('change', function () {
                    var mobSize = $("#ddlSize option:selected").data("mob");
                    if ($("#ddlSize option:selected").val() != "0") {
                        $("#ddlMobSize").prop("disabled", false);
                        if ($(".MediaFile").prop("disabled")) {
                            $(".MediaFile").prop("disabled", false);
                        }
                        $("#sizeError").text("");
                        AdvertisementConfig.getDefImgSize();
                        $("#ddlMobSize").val(mobSize).change();
                        if ($("#ddlMobSize option:selected").val() != "0") {
                            $("#ddlMobSize").prop("disabled", false);
                        }
                    } else {
                        $("#ddlMobSize").prop("disabled", true);
                        $("#ddlMobSize").val(mobSize).change();
                        $(".MediaFile").prop("disabled", true);
                        $("#sizeError").text("Select At Least One Size.");
                    }
                });
                $("#ddlMobSize").on('change', function () {
                    if ($("#ddlMobSize option:selected").val() != "0") {
                        if ($(".MediaFile2").prop("disabled")) {
                            $(".MediaFile2").prop("disabled", false);
                        }
                        $("#mobsizeError").text("");
                        AdvertisementConfig.getMobImgSize();
                    } else {
                        $(".MediaFile2").prop("disabled", true);
                        $("#mobsizeError").text("Select At Least One Mobile Size.");
                    }
                });
                $("#txtStartDate").on('input', function () {
                    $("#startDateError").text("");
                });
                $("#txtLink").on('input', function () {
                    if ($("#txtLink").val() != "") {
                        if (!AdvertisementConfig.urlValidation($("#txtLink").val())) {
                            $("#linkError").text("Please enter valid url in format: http://www.example.com .");
                        } else {
                            $("#linkError").text("");
                        }
                    } else {
                        $("#linkError").text("");
                    }
                });
                $('select[name=ddlDuration]').on('change', function () {
                    if ($("#ddlDuration").val() != "1" || $("#ddlDuration2").val() != "1" || $("#ddlDuration4").val() != "1") {
                        $("#durationError").text("");
                    } else {
                        $("#durationError").text("Select At Least One Duration.");
                    }
                });
            },
            radioClicked: function () {
                $("#rdbDuration").on('click', function () {
                    if ($("#ddlDuration").val() != "1") {
                        $("#durationError").text("");
                    } else {
                        $("#durationError").text("Select At Least One Duration.");
                    }
                });
                $("#rdbEndDate").on('click', function () {
                    if ($("#txtEndDate").val() === "") {
                        $("#endDateError").text("End Date Is Required.");
                    }
                });
            },
            saveAdvertisement: function (AdvsID, BrandID, Size, MobSize, DefaultFileName, MobileFileName, StartDate, EndDate, IsNoExpire, DetailLink, Remarks, AddedBy, CategoryID) {
                AdvertisementConfig.config.method = "AddUpdateAdvertisement";
                AdvertisementConfig.config.data = JSON.stringify({
                    advObj: { SiteID: SiteID, AdvsID: AdvsID, BrandID: BrandID, Size: Size, MobileSize: MobSize, DefaultFileName: DefaultFileName, MobileFileName: MobileFileName, StartDate: StartDate, EndDate: EndDate, IsNoExpire, DetailLink, Remarks, AddedBy, CategoryID },
                    commonAuth: AdvertisementConfig.config.authParam
                });
                AdvertisementConfig.config.successMethod = AdvertisementConfig.saveAdvertisementSuccess;
                AdvertisementConfig.ajaxCall(AdvertisementConfig.config);
            },
            saveAdvertisementSuccess: function (data) {
                var response = data.d;
                AdvertisementConfig.clearance();
                $("#MainForm").hide();
                $("#MainGrid").show();
                if (response == 0) {
                    AdvertisementConfig.loadAdToEdit(0, AdvertisementConfig.config.noOfItemOnPagination, 0);
                    SageFrame.messaging.show("Advertisement Saved Successfully", "Success");
                } else if (response == 1) {
                    AdvertisementConfig.loadAdToEdit(AdvertisementConfig.config.offset, AdvertisementConfig.config.noOfItemOnPagination, AdvertisementConfig.config.currentPageNo);
                    SageFrame.messaging.show("Advertisement Updated Successfully", "Success");
                }
            },
            deleteAd: function (AdvsID) {
                AdvertisementConfig.config.method = "DeleteAdvertisement";
                AdvertisementConfig.config.data = JSON.stringify({
                    SiteID: SiteID,
                    AdvsID: AdvsID,
                    commonAuth: AdvertisementConfig.config.authParam
                });
                AdvertisementConfig.config.successMethod = AdvertisementConfig.deleteAdSuccess;
                AdvertisementConfig.ajaxCall(AdvertisementConfig.config);
            },
            deleteAdSuccess: function () {
                SageFrame.messaging.show("Advertisement Deleted Successfully", "Success");
                AdvertisementConfig.loadAdToEdit(AdvertisementConfig.config.offset, AdvertisementConfig.config.noOfItemOnPagination, AdvertisementConfig.config.currentPageNo);
            },
            checkEmptyOrSpaces: function (str) {
                return str === null || str.match(/^ *$/) !== null;
            },
            escapeHtml: function (string) {
                var entityMap = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;',
                    '/': '&#x2F;',
                    '`': '&#x60;',
                    '=': '&#x3D;'
                };
                return String(string).replace(/[&<>"'`=\/]/g, function (s) {
                    return entityMap[s];
                });
            },
            reverseSlashes: function (str) {
                str = str.replace(/&amp;/g, "&");
                str = str.replace(/&lt;/g, "<");
                str = str.replace(/&gt;/g, ">");
                str = str.replace(/&quot;/g, '"');
                str = str.replace(/&#39;/g, "'");
                str = str.replace(/&#x2F;/g, "/");
                str = str.replace(/&#x60;/g, "`");
                str = str.replace(/&#x3D;/g, "=");
                return str;
            },
            replaceWhiteSpace: function (value) {
                value = value.replace(/^\s+|\s+$/g, "");
                return value;
            },
            urlValidation: function (urlName) {
                if (urlName === "") {
                    return true;
                } else {
                    var pattern = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
                    if (pattern.test(urlName)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            onActionClick: function () {
                $("#adList").on("click", ".actionclass", function () {
                    $('.actiononClickShow').hide();
                    $(this).prev('.actiononClickShow').show();
                });
                $("#adList div").not(".actionclass").on("click", function () {
                    $('.actiononClickShow').hide();
                });
            },
            convertToDate: function (date) {
                var addedOn = new Date(parseInt(date.substr(6)));
                year = addedOn.getFullYear(),
                    month = (addedOn.getMonth() < 9) ? '0' + (addedOn.getMonth() + 1) : (addedOn.getMonth() + 1),
                    day = (addedOn.getDate() < 10) ? '0' + addedOn.getDate() : addedOn.getDate(),
                    date = year + '-' + month + '-' + day;
                return date;
            },
            imgUploadDelete: function () {
                $('#defaulImgClose').on('click', function () {
                    $("#defImgAction").show();
                    $("#defImgAction").addClass("open");
                });
                $('#mobImgClose').on('click', function () {
                    $("#mobImgAction").show();
                    $("#mobImgAction").addClass("open");
                });
                $('#fileUploaderDef').on('mouseleave', function () {
                    $("#defImgAction").hide();
                    $("#defImgAction").removeClass("open");
                });
                $('#fileUploaderMob').on('mouseleave', function () {
                    $("#mobImgAction").hide();
                    $("#mobImgAction").removeClass("open");
                });
            },
            cropFunctions: function () {
                $('#btnSaveCropper').on('click', function () {
                    AdvertisementConfig.config.defImageData = $('.image-editor').cropit('export');
                    $("#relativeDef").removeClass("rel");
                    $("#dvUploadWrapperDrop").html("<img src='" + AdvertisementConfig.config.defImageData + "' id='defaultImage' width='" + AdvertisementConfig.config.imgWidth + "' height='" + AdvertisementConfig.config.imgHeight + "'/>");
                    $("#cropperDiv").fadeOut();
                    $("#MainForm").fadeIn();
                    $(".cropper-overlay").remove();
                    $('.image-editor').cropit('destroy');
                    $('.cropit-preview').html('');
                });
                $('#btncloseCropper').on('click', function () {
                    $("#cropperDiv").fadeOut();
                    $("#MainForm").fadeIn();
                    $(".cropper-overlay").remove();
                    $('.image-editor').cropit('destroy');
                    $('.cropit-preview').html('');
                    AdvertisementConfig.checkIfImageTrue();
                });
                $('#closeCropImageDef').on('click', function () {
                    $("#cropperDiv").fadeOut();
                    $("#MainForm").fadeIn();
                    $(".cropper-overlay").remove();
                    $('.image-editor').cropit('destroy');
                    $('.cropit-preview').html('');
                    AdvertisementConfig.checkIfImageTrue();
                });
                $('#btnSaveCropperMob').on('click', function () {
                    AdvertisementConfig.config.mobImageData = $('.image-editorMob').cropit('export');
                    $("#relativeMob").removeClass("rel");
                    $("#dvUploadWrapperDrop2").html("<img src='" + AdvertisementConfig.config.mobImageData + "' id='mobileImage'/>");
                    $("#cropperDivMob").fadeOut();
                    $("#MainForm").fadeIn();
                    $(".cropper-overlayMob").remove();
                    $('.image-editorMob').cropit('destroy');
                    $('.cropit-preview').html('');
                });
                $('#btncloseCropperMob').on('click', function () {
                    $("#cropperDivMob").fadeOut();
                    $("#MainForm").fadeIn();
                    $(".cropper-overlayMob").remove();
                    $('.image-editorMob').cropit('destroy');
                    $('.cropit-preview').html('');
                    AdvertisementConfig.checkIfImageTrue();
                });
                $('#closeCropImageMob').on('click', function () {
                    $("#cropperDivMob").fadeOut();
                    $("#MainForm").fadeIn();
                    $(".cropper-overlayMob").remove();
                    $('.image-editorMob').cropit('destroy');
                    $('.cropit-preview').html('');
                    AdvertisementConfig.checkIfImageTrue();
                });
                $('#croppingImage').on('click', ".min", function () {
                    $('.image-editor').cropit('zoom', 0);
                });
                $('#croppingImage').on('click', ".max", function () {
                    $('.image-editor').cropit('zoom', 1.5);
                });
                $('#croppingImageMob').on('click', ".min", function () {
                    $('.image-editorMob').cropit('zoom', 0);
                });
                $('#croppingImageMob').on('click', ".max", function () {
                    $('.image-editorMob').cropit('zoom', 1.5);
                });
            },
            datePickerFunction: function () {
                $("#txtStartDate").datepicker({
                    dateFormat: 'yy MM dd',
                    altField: '#dateFormat',
                    onSelect: function () {
                        $("#startDateError").text("");
                        var date2 = $('#txtStartDate').datepicker('getDate');
                        date2.setDate(date2.getDate() + 1);
                        $('#txtEndDate').datepicker('option', 'minDate', date2);
                    }
                });
                $("#txtEndDate").datepicker({
                    dateFormat: 'yy MM dd',
                    altField: '#dateFormat',
                    onSelect: function () {
                        $("#endDateError").text("");
                    }
                });
                $("#txtDateFrom").datepicker({
                    onSelect: function () {
                        var date2 = $('#txtDateFrom').datepicker('getDate');
                        date2.setDate(date2.getDate() + 1);
                        $('#txtDateTo').datepicker('option', 'minDate', date2);
                    }
                });
                $("#txtDateTo").datepicker({
                });
            },
            effectsClick: function () {
                $("#defaulImgClose").on("click", "#prevDefImg", function () {
                    if (AdvertisementConfig.config.defImageData !== "") {
                        $("#defPrevImgs").attr('src', AdvertisementConfig.config.defImageData);
                    }
                    $("#prevDefModal").fadeIn();
                });
                $("#defaulImgClose").on("click", "#editDefImg", function () {
                    AdvertisementConfig.loadDefCropper();
                });
                $("#mobImgClose").on("click", "#prevMobImg", function () {
                    if (AdvertisementConfig.config.mobImageData !== "") {
                        $("#mobPrevImgs").attr('src', AdvertisementConfig.config.mobImageData);
                    }
                    $("#prevMobModal").fadeIn();
                });
                $("#mobImgClose").on("click", "#editMobImg", function () {
                    AdvertisementConfig.loadMobCropper();
                });
                $("#closePreviewImageDef").on("click", function () {
                    $("#prevDefModal").fadeOut();
                });
                $("#closePreviewImageMob").on("click", function () {
                    $("#prevMobModal").fadeOut();
                });
                $("#prevDefModal #defPrevImgs").on("load", function () {
                    var imgHeight = $("#defPrevImgs").height();
                    var imgWidth = $("#defPrevImgs").width();
                    var labelText = imgWidth + "x" + imgHeight;
                    $("#lblDefImgSize").text(labelText);
                });
                $("#prevMobModal #mobPrevImgs").on("load", function () {
                    var imgHeight = $("#mobPrevImgs").height();
                    var imgWidth = $("#mobPrevImgs").width();
                    var labelText = imgWidth + "x" + imgHeight;
                    $("#lblMobImgSize").text(labelText);
                });
            },
            uploadValidate: function () {
                $("#dvUploadWrapperDrop").off().on("click", function () {
                    if ($("#ddlSize option:selected").val() === "0") {
                        SageFrame.messaging.show("Select At Least One Size Before Uploading Image.", "Error");
                    }
                });
                $("#dvUploadWrapperDrop2").off().on("click", function () {
                    if ($("#ddlMobSize option:selected").val() === "0") {
                        SageFrame.messaging.show("Select At Least One Size Before Uploading Image.", "Error");
                    }
                });
            },
            checkIfImageTrue: function () {
                $('#dvUploadWrapperDrop').each(function () {
                    if (!$(this).find('img').length > 0) {
                        AdvertisementConfig.config.defaultAdOg = '';
                        $("#defaulImgClose").hide();
                    }
                });
                $('#dvUploadWrapperDrop2').each(function () {
                    if (!$(this).find('img').length > 0) {
                        AdvertisementConfig.config.mobileAdOg = '';
                        $("#mobImgClose").hide();
                    }
                });
            },
        };
        AdvertisementConfig.init();
    };
    $.fn.CallAdvertisementConfig = function (p) {
        $.Advertisement(p);
    };
})(jQuery);