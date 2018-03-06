(function ($) {
    $.CreateBrand = function (p) {
        p = $.extend
            ({
            mediaType: "*",
            UserModuleID: '1',
            SiteID: 0
            }, p);
        var Brand = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: { data: '' },
                dataType: 'json',
                baseURL: "/Modules/ArticleAdmin/ArticleSetting/Services/ArticleBrandSetting.asmx/",
                method: "",
                ajaxCallMode: 0,
                successMethod: "",
                failureMethod: "",
                authParam: { PortalID: SageFramePortalID, UserModuleID: p.UserModuleID, UserName: SageFrameUserName, SecureToken: SageFrameSecureToken },
                filepath: '/Modules/ArticleAdmin/ArticleSetting/icons',
                pageNumber: 0,
                pageSize: 10,
                offset: 0,
                rowTotal: 0
            },

            init: function () {
                Brand.onAddButtonClicked();
                Brand.onSaveBrandClick();
                Brand.getAllBrand(0, Brand.config.pageSize, 0);

                Brand.onSelectAllClick();
                Brand.onDeleteAllClick();
            },

            ajaxCall: function () {
                $.ajax({
                    type: Brand.config.type,
                    contentType: Brand.config.contentType,
                    cache: Brand.config.cache,
                    url: Brand.config.baseURL + Brand.config.method,
                    data: Brand.config.data,
                    dataType: Brand.config.dataType,
                    success: Brand.config.successMethod,
                    error: Brand.config.failureMethod,
                    async: Brand.config.async
                });
            },

            addUpdateBrand: function (brandID, brandName, brandIcon) {
                Brand.config.method = "AddUpdateBrand";
                Brand.config.data = JSON.stringify({
                    authParam: Brand.config.authParam,
                    brandID: brandID,
                    brandName: brandName,
                    brandIcon: brandIcon,
                    siteID: p.SiteID
                });
                Brand.config.successMethod = Brand.addUpdateBrandSuccess;
                Brand.config.failureMethod = Brand.addUpdateBrandFailure;
                Brand.ajaxCall(Brand.config);
            },

            addUpdateBrandSuccess: function (data) {
                var response = data.d;
                if (response == 0) {
                    SageFrame.messaging.show("Brand added successfully.", "success");
                    Brand.config.pageNumber = 1;
                    Brand.getAllBrand(0, Brand.config.pageSize, 0);
                    $("#grid").show();
                    $("#btnMain").show();
                    $("#addBrandForm").hide();
                    Brand.clearData();
                } else if (response == 1) {
                    SageFrame.messaging.show("Brand already exist.", "alert");
                } else if (response == 2) {
                    SageFrame.messaging.show("Brand updated successfully.", "success");
                    Brand.getAllBrand(Brand.config.offset, Brand.config.pageSize, Brand.config.pageNumber);
                    $("#grid").show();
                    $("#btnMain").show();
                    $("#addBrandForm").hide();
                    Brand.clearData();
                } else {
                    SageFrame.messaging.show("Error while saving brand.", "error");
                }
            },

            addUpdateBrandFailure: function () {
                SageFrame.messaging.show("Error while adding brand.", "Error");
            },

            onSaveBrandClick: function () {
                $("#btnSaveBrand").click(function () {
                    var brandName = $("#brandName").val();
                    var brandID = $("#brandID").val();
                    var iconPath = "";
                    if ($('#dvUploadWrapperDrop img').length > 0) {
                        iconPath = $("#dvUploadWrapperDrop").find("img").attr("src");
                        iconPath = iconPath.replace(Brand.config.filepath + '/', "");
                    }
                    if (Brand.isEmptyOrSpaces(brandName)) {
                        $("#brandError").text("* Brand name is required.");
                    } else {
                        Brand.addUpdateBrand(brandID, brandName, iconPath);
                    }
                });
            },

            onAddButtonClicked: function () {
                $("#btnAdd").click(function () {
                    $("#grid").hide();
                    $("#btnMain").hide();
                    $("#addBrandForm").show();
                    $(".sfPagination").hide();
                    Brand.fileUpload(Brand.config.filepath);
                });

                $("#btnCancel").click(function () {
                    $("#grid").show();
                    $("#btnMain").show();
                    $("#addBrandForm").hide();
                    $(".sfPagination").show();
                    Brand.clearData();
                });
            },

            getAllBrand: function (offset, limit, current) {
                Brand.config.pageNumber = current;
                Brand.config.offset = current * limit;
                Brand.config.method = "GetAllBrand";
                Brand.config.data = JSON.stringify({
                    authParam: Brand.config.authParam,
                    pageNumber: Brand.config.offset,
                    pageSize: Brand.config.pageSize,
                    siteID: p.SiteID
                });
                Brand.config.successMethod = Brand.getAllBrandSuccess;
                Brand.config.failureMethod = Brand.getAllBrandFailure;
                Brand.ajaxCall(Brand.config);
            },

            getAllBrandSuccess: function (data) {
                var brandList = data.d;
                var brandListCount = brandList.length;
                var brandListHtml = "";
                if (brandList != null && brandListCount > 0) {
                    Brand.config.rowTotal = brandList[0].RowsCount;
                    $.each(brandList, function (key, value) {
                        brandListHtml += "<div class='grid_listing'>";
                        brandListHtml += "<div class='grid_summary'>";
                        brandListHtml += "<div class='grid_selectors'>";
                        brandListHtml += "<input value='" + value.BrandID + "' name='cBox' type='checkbox'>";
                        brandListHtml += "<label></label>";
                        brandListHtml += "</div>";
                        brandListHtml += "<div class='grid_summary_detail'>";
                        brandListHtml += "<div class='grid_detail_title'>";
                        brandListHtml += value.Name;
                        brandListHtml += "</div>";
                        brandListHtml += "</div>";
                        brandListHtml += "<div class='grid_action'>";
                        brandListHtml += "<div id='actions' class='actiononClickShow' style='display: none; '>";
                        brandListHtml += "<div class='actiononClickShowInfo'>";
                        brandListHtml += "<p>";
                        brandListHtml += "<a id='editBrand' class='edit' data-id='" + value.BrandID + "'> Edit</a>";
                        brandListHtml += "<a id='deleteBrand' class='delete' data-id='" + value.BrandID + "'> Delete</a>";
                        brandListHtml += "</p>";
                        brandListHtml += "</div>";
                        brandListHtml += "</div>";
                        brandListHtml += "<p class='actionclass' id='actionLink'>";
                        brandListHtml += "<a>";
                        brandListHtml += "<i class='fa fa-ellipsis-v' ></i>";
                        brandListHtml += "</a></p>";
                        brandListHtml += "</div>";
                        brandListHtml += "</div>";
                        brandListHtml += "</div>";
                    });
                    $("#brandList").html(brandListHtml);
                    Brand.bindPagination(Brand.config.rowTotal)
                    Brand.onActionClick();
                }
                else if (Brand.config.pageNumber > 0) {
                    Brand.config.pageNumber = Brand.config.pageNumber - 1;
                    Brand.config.offset = Brand.config.pageNumber * Brand.config.pageSize;
                    Brand.getAllBrand(Brand.config.offset, Brand.config.pageSize, Brand.config.pageNumber);
                } else {
                    $("#brandList").html("<p>Currently there is no brand.</p>");
                }
            },

            onActionClick: function () {
                $("#brandList").on("click", ".actionclass", function () {
                    $('.actiononClickShow').hide();
                    $(this).prev('.actiononClickShow').show();
                });

                $("#brandList div").not(".actiononClickShow").on("click", function () {
                    $('.actiononClickShow').hide();
                });

                $("#brandList").on("click", "#editBrand", function () {
                    var brandID = $(this).attr("data-id");
                    Brand.getBrandByID(brandID);
                });

                $("#brandList").on("click", "#deleteBrand", function () {
                    var brandID = $(this).attr("data-id");
                    jConfirm('Do you want to delete this brand?', 'Confirm', function (ans) {
                        if (ans) {
                            Brand.deleteBrandByID(brandID);
                        }
                    });
                });
            },

            getAllBrandFailure: function () {
                SageFrame.messaging.show("Error while loading brand.", "Error");
            },

            getBrandByID: function (brandID) {
                Brand.config.method = "GetBrandByID";
                Brand.config.data = JSON.stringify({
                    authParam: Brand.config.authParam,
                    brandID: brandID,
                    siteID: p.SiteID
                });
                Brand.config.successMethod = Brand.getBrandByIDSuccess;
                Brand.config.failureMethod = Brand.getBrandByIDFailure;
                Brand.ajaxCall(Brand.config);
            },

            getBrandByIDSuccess: function (data) {
                var brandObj = data.d;
                $("#grid").hide();
                $("#btnMain").hide();
                $("#addBrandForm").show();
                $(".sfPagination").hide();
                $("#brandName").val(brandObj.Name);
                $("#brandID").val(brandObj.BrandID);
                $("#btnSaveBrand").text("Update");
                Brand.fileUpload(Brand.config.filepath);
                if (brandObj.IconImage != null && brandObj.IconImage !== "") {
                    $("#dvUploadWrapperDrop").html("<img id='preview' src='" + Brand.config.filepath + '/' + brandObj.IconImage + "'/>");
                    $(".fileUploader").append("<span id='deleteIcon'>X</span>");
                    Brand.onDeleteIconClick();
                }
            },

            getBrandByIDFailure: function () {
                SageFrame.messaging.show("Error while loading brand.", "Error");
            },

            deleteBrandByID: function (brandID) {
                Brand.config.method = "DeleteBrandByID";
                Brand.config.data = JSON.stringify({
                    authParam: Brand.config.authParam,
                    brandID: brandID,
                    siteID: p.SiteID
                });
                Brand.config.successMethod = Brand.deleteBrandByIDSuccess;
                Brand.config.failureMethod = Brand.deleteBrandByIDFailure;
                Brand.ajaxCall(Brand.config);
            },

            deleteBrandByIDSuccess: function () {
                Brand.getAllBrand(Brand.config.offset, Brand.config.pageSize, Brand.config.pageNumber);
                SageFrame.messaging.show("Brand deleted successfully.", "Success");
            },

            deleteBrandByIDFailure: function () {
                SageFrame.messaging.show("Error while deleting brand.", "Error");
            },

            /** File upload section **/

            fileUpload: function (filePath) {
                var html = '<div class="droppable" id="dvUploadWrapperDrop"><p><i class="fa fa-cloud-upload" aria-hidden="true"></i>upload logo</p></div>';
                $('.fileUploader').html(html);
                Brand.FileUploader('MediaFile',
                    '#dvUploadWrapperDrop',
                    '.productList',
                    'png,jpg',
                    filePath + '/',
                    Brand.FileUploaded);
            },

            FileUploader: function (fileClassName, dragZone, outputMessageID, extension, savePath, callback) {
                $(this).DragUploader({
                    userModuleID: p.UserModuleID,
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
                    UploadHandlerPath: SageFrameAppPath + '/Modules/Admin/MediaManagement/'
                });
            },

            FileUploaded: function (response) {
                if (response != null) {
                    var resp = response.split("###");
                    if (resp[0] == "1") {
                        $("#dvUploadWrapperDrop").html("<img id='preview' src='" + Brand.config.filepath + '/' + resp[2] + "'/>");
                        //cat.config.fileName = resp[2];
                        $(".fileUploader").append("<span id='deleteIcon'>X</span>");
                        Brand.onDeleteIconClick();
                    }
                    else {
                        //error here
                        SageFrame.messaging.show("Not a valid file Extension", "alert");
                        //cat.config.fileName = resp[2];
                    }
                }
            },

            onDeleteIconClick: function () {
                $("#deleteIcon").click(function () {
                    var iconPath = "";
                    if ($('#dvUploadWrapperDrop img').length > 0) {
                        var brandID = $("#brandID").val();
                        iconPath = $('#dvUploadWrapperDrop').find('img').attr('src');
                        Brand.deleteIcon(iconPath, brandID);
                        //iconPath = iconPath.replace(cat.config.filepath + '/', "");
                    } else {
                        SageFrame.messaging.show("There is no logo to delete.", "error");
                    }
                });
            },

            deleteIcon: function (iconPath, brandID) {
                Brand.config.method = "DeleteBrandIcon";
                Brand.config.data = JSON.stringify({
                    authParam: Brand.config.authParam,
                    filePath: iconPath,
                    brandID: brandID,
                    siteID: p.SiteID
                });
                Brand.config.successMethod = Brand.deleteIconSuccess;
                Brand.config.failureMethod = Brand.deleteIconFailure;
                Brand.ajaxCall(Brand.config);
            },

            deleteIconSuccess: function () {
                var html = '<div class="droppable" id="dvUploadWrapperDrop"><p><i class="fa fa-cloud-upload" aria-hidden="true"></i>upload logo</p></div>';
                $('.fileUploader').html(html);
                Brand.fileUpload(Brand.config.filepath);
            },

            deleteIconFailure: function () {
                SageFrame.messaging.show("Error while deleteing logo.", "error");
            },

            onSelectAllClick: function () {
                $("#selectAll").on('click', function () {
                    var checkData = $(this).data();
                    var checkBoxesValue = $("input[name='cBox']");
                    checkBoxesValue.prop("checked", !checkData.checked);
                    checkData.checked = !checkData.checked;
                });
            },

            onDeleteAllClick: function () {
                $("#selectedDelete").on('click', function () {
                    var checkedData = $("input[name='cBox']:checked").map(function () {
                        return this.value;
                    }).get();
                    if (checkedData.length > 0) {
                        jConfirm('Do you want to delete selected brand?', 'Confirm', function (r) {
                            if (r) {
                                while (checkedData.length > 0) {
                                    Brand.deleteBrandByID(checkedData[checkedData.length - 1]);
                                    checkedData.length--;
                                }
                                Brand.getAllBrand(Brand.config.offset, Brand.config.pageSize, Brand.config.pageNumber);
                            }
                        });
                    } else {
                        SageFrame.messaging.show("Select brand to delete.", "Error");
                    }
                });
            },

            clearData: function () {
                $("#brandName").val("");
                $("#brandID").val(0);
                var html = '<div class="droppable" id="dvUploadWrapperDrop"><p><i class="fa fa-cloud-upload" aria-hidden="true"></i>upload logo</p></div>';
                $('.fileUploader').html(html);
                $("#brandError").text("");
                $("#btnSaveBrand").text("Save");
                Brand.fileUpload(Brand.config.filepath);
            },

            isEmptyOrSpaces: function (str) {
                return str === null || str.match(/^ *$/) !== null;
            },

            bindPagination: function (RowTotal) {
                if (RowTotal > Brand.config.pageSize) {
                    $('#brandPagi').show().pagination(RowTotal, {
                        items_per_page: Brand.config.pageSize,
                        current_page: Brand.config.pageNumber,
                        num_edge_entries: 2,
                        callfunction: true,
                        function_name: {
                            name: Brand.getAllBrand,
                            limit: Brand.config.pageSize,
                        },
                        prev_text: ' ',
                        next_text: ' '
                    });
                } else {
                    $('#brandPagi').hide();
                }
            }

        };
        Brand.init();
    };
    $.fn.CallBrand = function (p) {
        $.CreateBrand(p);
    };
})(jQuery);