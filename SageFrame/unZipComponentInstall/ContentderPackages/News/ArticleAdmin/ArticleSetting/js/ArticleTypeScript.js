(function ($) {
    $.CreateArticleType = function (p) {
        p = $.extend({
            UserModuleID: '1',
            SiteID: 0
        }, p);

        var ArticleType = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: { data: '' },
                dataType: 'json',
                baseURL: "/Modules/ArticleAdmin/ArticleSetting/Services/ArticleTypeSetting.asmx/",
                method: "",
                ajaxCallMode: 0,
                successMethod: "",
                failureMethod: "",
                authParam: { PortalID: SageFramePortalID, UserModuleID: p.UserModuleID, UserName: SageFrameUserName, SecureToken: SageFrameSecureToken },
                pageNumber: 0,
                pageSize: 10,
                offset: 0,
                rowTotal: 0
            },
            init: function () {
                $("#btnAdd").click(function () {
                    $("#grid").hide();
                    $("#btnMain").hide();
                    $("#addTypeForm").show();
                    $(".sfPagination").hide();
                });

                $("#btnCancel").click(function () {
                    $("#grid").show();
                    $("#btnMain").show();
                    $("#addTypeForm").hide();
                    $(".sfPagination").show
                    ArticleType.clearData();
                });

                ArticleType.getAllArticleType(0, ArticleType.config.pageSize, 0);

                ArticleType.onSaveClick();

                ArticleType.onSelectAllClick();
                ArticleType.onDeleteAllClick();
            },

            ajaxCall: function () {
                $.ajax({
                    type: ArticleType.config.type,
                    contentType: ArticleType.config.contentType,
                    cache: ArticleType.config.cache,
                    url: ArticleType.config.baseURL + ArticleType.config.method,
                    data: ArticleType.config.data,
                    dataType: ArticleType.config.dataType,
                    success: ArticleType.config.successMethod,
                    error: ArticleType.config.failureMethod,
                    async: ArticleType.config.async
                });
            },

            getAllArticleType: function (offset, limit, current) {
                ArticleType.config.pageNumber = current;
                ArticleType.config.offset = current * limit;
                ArticleType.config.method = "GetAllArticleType";
                ArticleType.config.data = JSON.stringify({
                    authParam: ArticleType.config.authParam,
                    pageNumber: ArticleType.config.offset,
                    pageSize: ArticleType.config.pageSize,
                    siteID: p.SiteID
                });
                ArticleType.config.successMethod = ArticleType.getAllArticleTypeSuccess;
                ArticleType.config.failureMethod = ArticleType.getAllArticleTypeFailure;
                ArticleType.ajaxCall(ArticleType.config);
            },

            getAllArticleTypeSuccess: function (data) {
                var typeList = data.d;
                console.log(typeList);
                var typeListCount = typeList.length;
                var typeListHtml = "";
                if (typeList != null && typeListCount > 0) {
                    ArticleType.config.rowTotal = typeList[0].RowsCount;
                    $.each(typeList, function (key, value) {
                        typeListHtml += "<div class='grid_listing'>";
                        typeListHtml += "<div class='grid_summary'>";
						if (value.SiteID > 0) {
							typeListHtml += "<div class='grid_selectors'>";
                            typeListHtml += "<input value='" + value.ArticleTypeID + "' name='cBox' type='checkbox'>";
							 typeListHtml += "<label></label>";
							typeListHtml += "</div>";
                        }
                        
                        
						else{
                            typeListHtml += "<div class='grid_selectors no-chkbx'></div>";
                        }
                       
                        typeListHtml += "<div class='grid_summary_detail'>";
                        typeListHtml += "<div class='grid_detail_title'>";
                        typeListHtml += value.ArticleTypes;
                        typeListHtml += "</div>";
                        typeListHtml += "</div>";
                        if (value.SiteID > 0) {
                            typeListHtml += "<div class='grid_action'>";
                            typeListHtml += "<div id='actions' class='actiononClickShow' style='display: none; '>";
                            typeListHtml += "<div class='actiononClickShowInfo'>";
                            typeListHtml += "<p>";
                            typeListHtml += "<a id='editType' class='edit' data-id='" + value.ArticleTypeID + "'> Edit</a>";
                            typeListHtml += "<a id='deleteType' class='delete' data-id='" + value.ArticleTypeID + "'> Delete</a>";
                            typeListHtml += "</p>";
                            typeListHtml += "</div>";
                            typeListHtml += "</div>";
                            typeListHtml += "<p class='actionclass' id='actionLink'>";
                            typeListHtml += "<a>";
                            typeListHtml += "<i class='fa fa-ellipsis-v' ></i>";
                            typeListHtml += "</a></p>";
                            typeListHtml += "</div>";
                        }
                        typeListHtml += "</div>";
                        typeListHtml += "</div>";
                    });
                    $("#typeList").html(typeListHtml);
                    ArticleType.bindPagination(ArticleType.config.rowTotal);
                    ArticleType.onActionClick();
                } else if (ArticleType.config.pageNumber > 0) {
                    ArticleType.config.pageNumber = ArticleType.config.pageNumber - 1;
                    ArticleType.config.offset = ArticleType.config.pageNumber * ArticleType.config.pageSize;
                    ArticleType.getAllArticleType(ArticleType.config.offset, ArticleType.config.pageSize, ArticleType.config.pageNumber);
                } else {
                    $("#typeList").html("<p>Currently there is no article type.</p>");
                }
            },

            getAllArticleTypeFailure: function () {
                SageFrame.messaging.show("Something went wrong.", "error");
            },

            onSaveClick: function () {
                $("#btnSave").click(function () {
                    var typeID = $("#typeID").val();
                    var typeName = $("#typeName").val();
                    if (ArticleType.isEmptyOrSpaces(typeName)) {
                        $("#typeNameError").text("* Article type name is required.");
                    } else {
                        ArticleType.addUpdateArticleType(typeID, typeName);
                    }
                });
            },

            addUpdateArticleType: function (typeID, typeName) {
                ArticleType.config.method = "AddUpdateArticleType";
                ArticleType.config.data = JSON.stringify({
                    authParam: ArticleType.config.authParam,
                    articleTypeID: typeID,
                    articleType: typeName,
                    isBlog: false,
                    siteID: p.SiteID
                });
                ArticleType.config.successMethod = ArticleType.addUpdateArticleTypeSuccess;
                ArticleType.config.failureMethod = ArticleType.addUpdateArticleTypeFailure;
                ArticleType.ajaxCall(ArticleType.config);
            },

            addUpdateArticleTypeSuccess: function (data) {
                var response = data.d;
                if (response == 0) {
                    SageFrame.messaging.show("Article type added successfully.", "success");
                    ArticleType.config.pageNumber = 0;
                    ArticleType.getAllArticleType(0, ArticleType.config.pageSize, 0);
                    $("#grid").show();
                    $("#btnMain").show();
                    $("#addTypeForm").hide();
                    ArticleType.clearData();
                } else if (response == 1) {
                    SageFrame.messaging.show("Article type already exist.", "alert");
                } else if (response == 2) {
                    SageFrame.messaging.show("Article type updated successfully.", "success");
                    ArticleType.getAllArticleType(ArticleType.config.offset, ArticleType.config.pageSize, ArticleType.config.pageNumber);
                    $("#grid").show();
                    $("#btnMain").show();
                    $("#addTypeForm").hide();
                    ArticleType.clearData();
                } else {
                    SageFrame.messaging.show("Error while saving article type.", "error");
                }
            },

            addUpdateArticleTypeFailure: function () {
                SageFrame.messaging.show("Error while saving article type.", "error");
            },

            getArticleTypeByID: function (articleTypeID) {
                ArticleType.config.method = "GetArticleTypeByID";
                ArticleType.config.data = JSON.stringify({
                    authParam: ArticleType.config.authParam,
                    articleTypeID: articleTypeID,
                    siteID: p.SiteID
                });
                ArticleType.config.successMethod = ArticleType.getArticleTypeByIDSuccess;
                ArticleType.config.failureMethod = ArticleType.getArticleTypeByIDFailure;
                ArticleType.ajaxCall(ArticleType.config);
            },

            getArticleTypeByIDSuccess: function (data) {
                var typeObj = data.d;
                $("#grid").hide();
                $("#btnMain").hide();
                $("#addTypeForm").show();
                $(".sfPagination").hide();
                $("#btnSave").text("Update");
                $("#typeID").val(typeObj.ArticleTypeID);
                $("#typeName").val(typeObj.ArticleTypes);
            },

            getArticleTypeByIDFailure: function () {
                SageFrame.messaging.show("Opps something went wrong.", "error");
            },

            deleteArticleType: function (articleTypeID) {
                ArticleType.config.method = "DeleteArticleTypeByID";
                ArticleType.config.data = JSON.stringify({
                    authParam: ArticleType.config.authParam,
                    articleTypeID: articleTypeID,
                    siteID: p.SiteID
                });
                ArticleType.config.successMethod = ArticleType.deleteArticleTypeSuccess;
                ArticleType.config.failureMethod = ArticleType.deleteArticleTypeFailure;
                ArticleType.ajaxCall(ArticleType.config);
            },

            deleteArticleTypeSuccess: function () {
                ArticleType.getAllArticleType(ArticleType.config.offset, ArticleType.config.pageSize, ArticleType.config.pageNumber);
                SageFrame.messaging.show("Article type deleted successfully.", "success");
            },

            deleteArticleTypeFailure: function () {
                SageFrame.messaging.show("Error while deleting article type.", "error");
            },

            onActionClick: function () {
                $("#typeList").on("click", ".actionclass", function () {
                    $('.actiononClickShow').hide();
                    $(this).prev('.actiononClickShow').show();
                });

                $("#typeList div").not(".actiononClickShow").on("click", function () {
                    $('.actiononClickShow').hide();
                });

                $("#typeList").on("click", "#editType", function () {
                    var articleTypeID = $(this).attr("data-id");
                    ArticleType.getArticleTypeByID(articleTypeID);
                });

                $("#typeList").on("click", "#deleteType", function () {
                    var articleTypeID = $(this).attr("data-id");
                    jConfirm('Do you want to delete this article type?', 'Confirm', function (ans) {
                        if (ans) {
                            ArticleType.deleteArticleType(articleTypeID);
                        }
                    });
                });
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
                        jConfirm('Do you want to delete selected article type?', 'Confirm', function (r) {
                            if (r) {
                                while (checkedData.length > 0) {
                                    ArticleType.deleteArticleType(checkedData[checkedData.length - 1]);
                                    checkedData.length--;
                                }
                            }
                        });
                    } else {
                        SageFrame.messaging.show("Select article type to delete.", "Error");
                    }
                });
            },

            bindPagination: function (RowTotal) {
                if (RowTotal > ArticleType.config.pageSize) {
                    $('#atPagi').show().pagination(RowTotal, {
                        items_per_page: ArticleType.config.pageSize,
                        current_page: ArticleType.config.pageNumber,
                        num_edge_entries: 2,
                        callfunction: true,
                        function_name: {
                            name: ArticleType.getAllArticleType,
                            limit: ArticleType.config.pageSize,
                        },
                        prev_text: ' ',
                        next_text: ' '
                    });
                } else {
                    $('#atPagi').hide();
                }
            },

            clearData: function () {
                $("#typeName").val("");
                $("#typeID").val(0);
                $("#typeNameError").text("");
                $("#btnSave").text("Save");
            },

            isEmptyOrSpaces: function (str) {
                return str === null || str.match(/^ *$/) !== null;
            }
        };
        ArticleType.init();
    };
    $.fn.CallArticleType = function (p) {
        $.CreateArticleType(p);
    };
})(jQuery);