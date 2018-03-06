(function ($) {
    $.CatSingleton = function (p) {
        p = $.extend
            ({
            mediaType: "*",
            UserModuleID: '1',
            SiteID: 0
            }, p);
        var cat = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: { data: '' },
                dataType: 'json',
                baseURL: "/Modules/ArticleAdmin/ArticleSetting/Services/ArticleCategorySetting.asmx/",
                method: "",
                ajaxCallMode: 0,
                successMethod: "",
                failureMethod: "",
                authParam: { PortalID: SageFramePortalID, UserModuleID: p.UserModuleID, UserName: SageFrameUserName, SecureToken: SageFrameSecureToken },
                filepath: '/Modules/ArticleAdmin/ArticleSetting/icons',
                fileName: "",
                postPerPage: 10,
                pageNumber: 0,
                offset: 0,
                rowTotal: 0
            },
            init: function () {

                cat.getCategoryList(0, cat.config.postPerPage, 0);

                $("#btnAdd").click(function () {
                    $("#grid").hide();
                    $("#btnMain").hide();
                    $("#addForm").show();
                    $(".sfPagination").hide();

                    cat.fileUpload(cat.config.filepath);
                });

                $("#btnCancel").click(function () {
                    $("#grid").show();
                    $("#btnMain").show();
                    $("#addForm").hide();
                    $(".sfPagination").show();
                    cat.clearData();
                });

                cat.onBtnSaveCatClick();
                
                cat.onSelectAllClick();
                cat.onDeleteAllClick();
            },

            ajaxCall: function () {
                $.ajax({
                    type: cat.config.type,
                    contentType: cat.config.contentType,
                    cache: cat.config.cache,
                    url: cat.config.baseURL + cat.config.method,
                    data: cat.config.data,
                    dataType: cat.config.dataType,
                    success: cat.config.successMethod,
                    error: cat.config.failureMethod,
                    async: cat.config.async
                });
            },

            onBtnSaveCatClick: function () {
                $("#btnSave").click(function () {
                    var catID = $("#catID").val();
                    var catName = $("#catName").val();
                    var iconPath = "";
                    if ($('#dvUploadWrapperDrop img').length > 0) {
                        iconPath = $('#dvUploadWrapperDrop').find('img').attr('src');
                        iconPath = iconPath.replace(cat.config.filepath + '/', "");
                    }
                    if (cat.isEmptyOrSpaces(catName)) {
                        $("#catNameError").text("* Category name is required.");
                    } else {
                        cat.addUpdate(catID, catName, iconPath, false);
                    }
                });
            },

            addUpdate: function (categoryID, categoryName, icon, isBlog) {
                cat.config.method = "AddUpdateCategory";
                cat.config.data = JSON.stringify({
                    authParam: cat.config.authParam,
                    categoryID: categoryID,
                    categoryName: categoryName,
                    icon: icon,
                    isBlog: isBlog,
                    siteID: p.SiteID
                });
                cat.config.successMethod = cat.addUpdateSuccess;
                cat.config.failureMethod = cat.addUpdateFailure;
                cat.ajaxCall(cat.config);
            },

            addUpdateSuccess: function (data) {
                var response = data.d;
                if (response == 0) {
                    SageFrame.messaging.show("Category added successfully.", "success");
                    cat.config.pageNumber = 0;
                    cat.getCategoryList(0, cat.config.postPerPage, 0);
                    $("#grid").show();
                    $("#btnMain").show();
                    $("#addForm").hide();
                    cat.clearData();
                } else if (response == 1) {
                    SageFrame.messaging.show("Category already exist.", "alert");
                } else if (response == 2) {
                    SageFrame.messaging.show("Category updated successfully.", "success");
                    cat.getCategoryList(cat.config.offset, cat.config.postPerPage, cat.config.pageNumber);
                    $("#grid").show();
                    $("#btnMain").show();
                    $("#addForm").hide();
                    cat.clearData();
                } else {
                    SageFrame.messaging.show("Error while saving category.", "error");
                }
            },

            addUpdateFailure: function () {
                SageFrame.messaging.show("Error while saving category.", "error");
            },

            getCategoryList: function (offset, limit, current) {
                cat.config.pageNumber = current;
                cat.config.offset = current * limit;
                cat.config.method = "GetCategoryList";
                cat.config.data = JSON.stringify({
                    authParam: cat.config.authParam,
                    pageNumber: cat.config.offset,
                    pageSize: cat.config.postPerPage,
                    siteID: p.SiteID
                });
                cat.config.successMethod = cat.getCategoryListSuccess;
                cat.config.failureMethod = cat.getCategoryListFailure;
                cat.ajaxCall(cat.config);
            },

            getCategoryListSuccess: function (data) {
                var catList = data.d;
                var catListCount = catList.length;
                var catlistHtml = "";
                if (catList != null && catListCount > 0) {
                    cat.config.rowTotal = catList[0].RowsCount;
                    $.each(catList, function (key, value) {
                        catlistHtml += "<div class='grid_listing'>";
                        catlistHtml += "<div class='grid_summary'>";
                        catlistHtml += "<div class='grid_selectors'>";
                        catlistHtml += "<input value='" + value.CategoryID + "' name='cBox' type='checkbox'>";
                        catlistHtml += "<label></label>";
                        catlistHtml += "</div>";
                        catlistHtml += "<div class='grid_summary_detail'>";
                        catlistHtml += "<div class='grid_detail_title'>";
                        catlistHtml += value.CategoryName;
                        catlistHtml += "</div>";
                        catlistHtml += "</div>";
                        catlistHtml += "<div class='grid_action'>";
                        catlistHtml += "<div id='actions' class='actiononClickShow' style='display: none; '>";
                        catlistHtml += "<div class='actiononClickShowInfo'>";
                        catlistHtml += "<p>";
                        catlistHtml += "<a id='editCat' class='edit' data-id='" + value.CategoryID + "'> Edit</a>";
                        catlistHtml += "<a id='deleteCat' class='delete' data-id='" + value.CategoryID + "'> Delete</a>";
                        catlistHtml += "</p>";
                        catlistHtml += "</div>";
                        catlistHtml += "</div>";
                        catlistHtml += "<p class='actionclass' id='actionLink'>";
                        catlistHtml += "<a>";
                        catlistHtml += "<i class='fa fa-ellipsis-v' ></i>";
                        catlistHtml += "</a></p>";
                        catlistHtml += "</div>";
                        catlistHtml += "</div>";
                        catlistHtml += "</div>";
                    });
                    $("#catList").html(catlistHtml);
                    cat.bindPagination(cat.config.rowTotal);
                    cat.onActionClick();
                } else if (cat.config.pageNumber > 0) {
                    cat.config.pageNumber = cat.config.pageNumber - 1;
                    cat.config.offset = (cat.config.pageNumber) * cat.config.postPerPage;
                    cat.getCategoryList(cat.config.offset, cat.config.postPerPage, cat.config.pageNumber);
                } else {
                    $("#catList").html("<p>Currently there is no category.</p>");
                }
            },

            getCategoryListFailure: function () {
                $("#catList").html("<p>Error while loading category.</p>");
            },

            onActionClick: function () {
                $("#catList").on("click", ".actionclass", function () {
                    $('.actiononClickShow').hide();
                    $(this).prev('.actiononClickShow').show();
                });

                $("#catList div").not(".actiononClickShow").on("click", function () {
                    $('.actiononClickShow').hide();
                });

                $("#catList").on("click", "#editCat", function () {
                    var catID = $(this).attr("data-id");
                    cat.getCategoryByID(catID);
                });

                $("#catList").on("click", "#deleteCat", function () {
                    var catID = $(this).attr("data-id");
                    jConfirm('Do you want to delete this category?', 'Confirm', function (ans) {
                        if (ans) {
                            cat.deleteCategory(catID);
                        }
                    });
                });
            },

            getCategoryByID: function (catID) {
                cat.config.method = "GetCategoryByID";
                cat.config.data = JSON.stringify({
                    authParam: cat.config.authParam,
                    categoryID: catID,
                    siteID: p.SiteID
                });
                cat.config.successMethod = cat.getCategoryByIDSuccess;
                cat.config.failureMethod = cat.getCategoryByIDFailure;
                cat.ajaxCall(cat.config);
            },

            getCategoryByIDSuccess: function (data) {
                var catObj = data.d;
                $("#grid").hide();
                $("#btnMain").hide();
                $("#addForm").show();
                $(".sfPagination").hide();
                $("#catName").val(catObj.CategoryName);
                $("#catID").val(catObj.CategoryID);
                $("#btnSave").text("Update");
                cat.fileUpload(cat.config.filepath);
                if (catObj.Icon != null && catObj.Icon !== "") {
                    $("#dvUploadWrapperDrop").html("<img id='preview' src='" + cat.config.filepath + '/' + catObj.Icon + "'/>");
                    $(".fileUploader").append("<span id='deleteIcon'>X</span>");
                }
                cat.onDeleteIconClick();
            },

            getCategoryByIDFailure: function () {
                SageFrame.messaging.show("Opps something went wrong.", "error");
            },

            deleteCategory: function (catID) {
                cat.config.method = "DeleteCategory";
                cat.config.data = JSON.stringify({
                    authParam: cat.config.authParam,
                    categoryID: catID,
                    siteID: p.SiteID
                });
                cat.config.successMethod = cat.deleteCategorySuccess;
                cat.config.failureMethod = cat.deleteCategoryFailure;
                cat.ajaxCall(cat.config);
            },

            deleteCategorySuccess: function () {
                cat.getCategoryList(cat.config.offset, cat.config.postPerPage, cat.config.pageNumber);
                SageFrame.messaging.show("Category deleted successfully.", "success");
            },

            deleteCategoryFailure: function () {
                SageFrame.messaging.show("Something went wrong while deleting category.", "error");
            },

            /** File upload section **/

            fileUpload: function (filePath) {
                var html = '<div class="droppable" id="dvUploadWrapperDrop"><p><i class="fa fa-cloud-upload" aria-hidden="true"></i>upload icon</p></div>';
                $('.fileUploader').html(html);
                cat.FileUploader('MediaFile',
                    '#dvUploadWrapperDrop',
                    '.productList',
                    'png,jpg',
                    filePath + '/',
                    cat.FileUploaded);
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
                        $("#dvUploadWrapperDrop").html("<img id='preview' src='" + cat.config.filepath + '/' + resp[2] + "'/>");
                        $(".fileUploader").append("<span id='deleteIcon'><i class='fa fa-close'></i></span>");
                        cat.config.fileName = resp[2];
                        cat.onDeleteIconClick();
                    }
                    else {
                        //error here
                        SageFrame.messaging.show("Not a valid file Extension", "alert");
                        cat.config.fileName = resp[2];
                    }
                }
            },

            onDeleteIconClick: function () {
                $("#deleteIcon").click(function () {
                    var iconPath = "";
                    if ($('#dvUploadWrapperDrop img').length > 0) {
                        var catID = $("#catID").val();
                        iconPath = $('#dvUploadWrapperDrop').find('img').attr('src');
                        cat.deleteIcon(iconPath, catID);
                        //iconPath = iconPath.replace(cat.config.filepath + '/', "");
                    } else {
                        SageFrame.messaging.show("There is no icon to delete.", "error");
                    }
                });
            },

            deleteIcon: function (filePath, catID) {
                cat.config.method = "DeleteIcon";
                cat.config.data = JSON.stringify({
                    authParam: cat.config.authParam,
                    filePath: filePath,
                    catID: catID,
                    siteID: p.SiteID
                });
                cat.config.successMethod = cat.deleteIconSuccess;
                cat.config.failureMethod = cat.deleteIconFailure;
                cat.ajaxCall(cat.config);
            },

            deleteIconSuccess: function () {
                var html = '<div class="droppable" id="dvUploadWrapperDrop"><p><i class="fa fa-cloud-upload" aria-hidden="true"></i>upload icon</p></div>';
                $('.fileUploader').html(html);
                cat.fileUpload(cat.config.filepath);
            },

            deleteIconFailure: function () {
                SageFrame.messaging.show("Error while deleteing icon.", "error");
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
                        jConfirm('Do you want to delete selected category?', 'Confirm', function (r) {
                            if (r) {
                                while (checkedData.length > 0) {
                                    cat.deleteCategory(checkedData[checkedData.length - 1]);
                                    checkedData.length--;
                                }
                                cat.getCategoryList(cat.config.offset, cat.config.postPerPage, cat.config.pageNumber);
                            }
                        });
                    } else {
                        SageFrame.messaging.show("Select category to delete.", "Error");
                    }
                });
            },

            bindPagination: function (RowTotal) {
                if (RowTotal > cat.config.postPerPage) {
                    $('#catPagi').show().pagination(RowTotal, {
                        items_per_page: cat.config.postPerPage,
                        current_page: cat.config.pageNumber,
                        num_edge_entries: 2,
                        callfunction: true,
                        function_name: {
                            name: cat.getCategoryList,
                            limit: cat.config.postPerPage,
                        },
                        prev_text: ' ',
                        next_text: ' '
                    });
                } else {
                    $('#catPagi').hide();
                }
            },

            clearData: function () {
                $("#catName").val("");
                $("#catID").val(0);
                var html = '<div class="droppable" id="dvUploadWrapperDrop"><p><i class="fa fa-cloud-upload" aria-hidden="true"></i>upload icon</p></div>';
                $('.fileUploader').html(html);
                $("#catNameError").text("");
                $("#btnSave").text("Save");
                cat.fileUpload(cat.config.filepath);
            },

            isEmptyOrSpaces: function (str) {
                return str === null || str.match(/^ *$/) !== null;
            },

            validateFileExtension: function (fileName) {
                var ext = fileName.split('.').pop().toLowerCase();
                if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
                    return false;
                } else {
                    return true;
                }
            }
        };
        cat.init();
    };
    $.fn.CallCat = function (p) {
        $.CatSingleton(p);
    };
})(jQuery);