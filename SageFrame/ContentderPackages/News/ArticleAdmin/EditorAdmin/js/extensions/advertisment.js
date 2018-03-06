var advs = {
    "News Advs": {
        "componentname": "News Advs",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "icon icon-advertise", 
        "row": false,
        "hidden": false,
        "collection": true,
        "defaultdata": EasyLibrary.ReadDOM("advertismentview"),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            component['News Advs'].view.view();
            $appendedParent.find('.change-advertisment').show();
            var advLimit = 10;
            $('.change-advertisment').off().on('click', function () {
                var IsFirstClick = true;
                var IsDataAppend = false;
                var $CompParent = $(this).parent().parent();
                var $popParent = null;
                var config = {
                    data: {},
                    method: '',
                    url: SageFrameAppPath + '/Modules/ArticleAdmin/EditorAdmin/services/ArticleEditorServices.asmx',
                    ajaxSuccess: '',
                }
                function GetAdvertisment(pageNo, brandID, sizeID) {
                    if ($popParent != null)
                        $popParent.attr('data-pagenum', pageNo)
                    config.ajaxSuccess = BindAdvertisment;
                    config.method = 'GetAllAdvertisment';
                    config.data = {
                        brandID: brandID,
                        siteID: GetSiteID,
                        sizeID: sizeID,
                        categoryID: '',
                        offset: pageNo * advLimit,
                        limit: advLimit
                    }
                    CommonLibrary.AjaxCall(config);
                }
                function GetFilterValue() {
                    config.ajaxSuccess = BindAdvertismentFilter;
                    config.method = 'AdvsGetAllFilterValue';
                    config.data = {
                        siteID: GetSiteID,
                    }
                    CommonLibrary.AjaxCall(config);
                }
                function BindAdvertismentFilter(data) {
                    if (data != null) {
                        data = JSON.parse(data.d);

                        var $container = $popParent.find('#advsFilterWrap');
                        var html = '<div class="sfFormwrapper twoColForm">';
                        html += '<div class="sfFieldset selectType"><div class="formKey">Sizes</div><div class="formValue">'
                        html += '<select id="slcAdvsSizes"><option value="0">All</option>'

                        $.each(data.Sizes, function (index, item) {
                            html += '<option value="' + item.SizeID + '">' + item.Size + '</option>';
                        });
                        html += '</select>';
                        html += '</div>';//value
                        html += '</div>';//fieldset
                        html += '<div class="sfFieldset selectType"><div class="formKey">Brand</div><div class="formValue">'
                        html += '<select id="slcAdvsBrands"><option value="0">All</option>'
                        $.each(data.Brand, function (i, v) {
                            html += '<option value="' + v.BrandID + '">' + v.Name + '</option>';
                        });
                        html += '</select>';
                        html += '</div>';//value
                        html += '</div>';//fieldset
                        html += '</div>';//formwrap
                        $container.html(html);
                        $('#slcAdvsSizes').off('change').on('change', function () {
                            GetAdvertisment(0, $('#slcAdvsBrands').val(), $(this).val())
                        });
                        $('#slcAdvsBrands').off('change').on('change', function () {
                            GetAdvertisment(0, $('#slcAdvsBrands').val(), $('#slcAdvsSizes').val())
                        });
                    }
                }
                function BindAdvertisment(data) {
                    data = data.d;
                    var total = 0;
                    var advsHtml = '<div id="advsFilterWrap" class="adv-filter-wrap fp-body-header bdashboard">';
                    advsHtml += '</div>'
                    advsHtml += '<div class="fp-body-container">'
                    advsHtml += '<div>'
                    advsHtml += '<div id="advChooseList" class="advs-select-list">';
                    var advListData = '';

                    $.each(data, function (index, item) {
                        total = item.RowTotal;

                        advListData += '<div  class="sfCol_25 adv-tile">'
                        advListData += '<div class="advs-thumb">'
                        advListData += '<div class="adv-img-wrap">';
                        advListData += '<img class="sfCol_100" src="/Modules/ArticleAdmin/AdvertisementAdmin/images/cropped/default/' + item.DefaultFileName + '">';
                        advListData += '<div class="desc">';

                        if (item.IsNoExpire)
                            advListData += '<div><span class="exp-icon">No Expire</span></div>';
                        else
                            advListData += '<div><span class="expireDate exp-icon">' + item.EndDate + '</span></div>';

                        advListData += '<div class="actions-wrap">';
                        advListData += '<a class="avsUseAction" data-detaillink="' + item.DetailLink + '" title="Use This" data-category="' + item.CategoryIDs + '" data-expdate="' + item.EndDate + '" data-advsize="' + item.SizeID + '" data-mobfile="' + item.MobileFileName + '"></a>';
                        advListData += '</div>';
                        advListData += '</div></div>';
                        advListData += '<div class="adv-size-wrap">';
                        advListData += '<div class="adv-size"><span>' + item.Size + '</span></div>';
                        advListData += '<div class="advs-rmk-icon"><div class="advs-rmk">' + item.Remarks + '</div></div>';


                        advListData += '</div>';
                        advListData += '</div>';
                        advListData += '</div>';
                    });

                    advsHtml += advListData;
                    advsHtml += '</div>'
                    advsHtml += '</div>'
                    advsHtml += '<div class="more-items">'
                    advsHtml += '<a class="avsMoreAction sfBtn smlbtn-succ">More</a>';
                    advsHtml += '</div>'
                    advsHtml += '</div>'

                    var option = {
                        title: 'Change Advertisment',
                        openButton: '',
                        openInCall: true,
                        width: "90%",
                        height: "90%",
                        contentHtml: advsHtml,
                        afterAppend: function ($Parent) {
                            $popParent = $Parent;
                            $popParent.attr('data-pagenum', 0)
                            ChangedAdvsDomAndEvent(null, total)
                            GetFilterValue();

                        }
                    }
                    if (IsFirstClick) {
                        IsFirstClick = false;
                        $('#simplePopUpContainer').makeSimpleModel(option);
                    }
                    else
                        ChangedAdvsDomAndEvent(advListData, total)
                }

                function ChangedAdvsDomAndEvent(advListData, total) {
                    var $Container = $popParent.find('.advs-select-list');
                    if (IsDataAppend && advListData != '') {
                        $Container.append(advListData);
                    }
                    else if (advListData != null) {
                        if (advListData != '') {
                            $Container.html(advListData);
                        }
                        else
                            $Container.html('<p style="text-align:center;width:100%;text-transform:uppercase;color:rgb(239, 0, 36)">Sorry! advertisment not found.</p>');
                    }
                    if ($Container.find('.advs-thumb').length < total)
                        $popParent.find('.avsMoreAction').show();
                    else
                        $popParent.find('.avsMoreAction').hide();
                    $popParent.find('.avsMoreAction').off('click').on('click', function () {
                        var pgNum = $popParent.attr('data-pagenum');
                        pgNum++;
                        $popParent.attr('data-pagenum', pgNum);
                        IsDataAppend = true;
                        GetAdvertisment(pgNum, $('#slcAdvsBrands').val(), $('#slcAdvsSizes').val())
                    });
                    $popParent.find('.avsUseAction').off('click').on('click', function () {
                        var $this = $(this);
                        $CompParent.attr('data-categories', $this.attr('data-category'))
                        $CompParent.attr('data-expdate', $this.attr('data-expdate'))
                        $CompParent.attr('data-mobfile', $this.attr('data-mobfile'))
                        var detailsLink = $this.attr('data-detaillink');

                        if (detailsLink != '')
                            $CompParent.find('.advs-details-link').attr('href', detailsLink)

                        var $CompImg = $CompParent.find('img');
                        $CompImg.attr('data-advsize', $this.attr('data-advsize'))

                        $CompImg.attr('src', $this.parents('.advs-thumb').find('img').attr('src'));
                        $popParent.find('.fullpage-close-model').trigger('click');
                    });
                    IsDataAppend = false;

                    if ($('#advChooseList').attr('data-masonry') == '1')
                        $('#advChooseList').masonry('destroy');
                    setTimeout(function () {
                        $('#advChooseList').masonry({
                            itemSelector: '.adv-tile',
                        });
                    }, 500);
                    $('#advChooseList').attr('data-masonry', 1);
                }
                GetAdvertisment(0, 0, 0);
            });
        },
        "settingDOMs": {
            "tabs": {
                //"Basic": {
                //    "DOM": EasyLibrary.ReadDOM("advsbasictab"),
                //    "onload": function ($elem) {
                //        var $parent = $elem.parents('.comp-article-advs');
                //        $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                //        $parent.addClass('activeSetting');
                //        var advImg = $parent.find('.advs-img-wrap img')
                //        $('#slcAdvsSize').off('change').on('change', function () {
                //            advImg.attr('data-advsize', $(this).val())
                //            advImg.attr('src', '/Modules/ArticleAdmin/ArticleTemplate/img/advsample/' + $(this).val() + '.jpg')
                //        });
                //        $('#slcAdvsSize').val(advImg.attr('data-advsize'));
                //    }
                //},
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 40,
                            "min": -40,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        },
                        "padding": {
                            "max": 40,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    },
                },

            },
            "selectLayer": function ($elem) {
                var $parent = $elem.parent().parent();
                return $parent;
            },
        },
        "replace": function ($ViewDom) {
            //   $ViewDom.find('.comp-article-advs').each(function (i, v) {
            //no replace token dom manupulation in run time
            //   $ViewDom.find('.author-image >img').attr('src',"");  
            // });
        },
        "view": {
            'view': function () {
                var config = {
                    data: {},
                    method: '',
                    url: SageFrameAppPath + '/Modules/ArticleAdmin/EditorAdmin/services/ArticleEditorServices.asmx',
                    ajaxSuccess: '',
                }
                var IsMobile = false;
                var scrnSize = $(window).width();
                if (scrnSize < 480)
                    IsMobile=true
                var Today = $.datepicker.formatDate('mm/dd/yy', new Date());
                Today = new Date(Today);
                var advPath = '';
                if (IsMobile)
                    advPath = '/Modules/ArticleAdmin/AdvertisementAdmin/images/cropped/mobile/'
                else
                    advPath = '/Modules/ArticleAdmin/AdvertisementAdmin/images/cropped/default/'

                $('.comp-article-advs').each(function () {
                    var $parent = $(this);
                    var expDate = $parent.attr('data-expdate');
                    if (expDate != '' && Today > new Date(expDate)) {
                        var relatedCategory = $parent.attr('data-categories');
                        var $Img = $parent.find('img');
                        $parent.attr('data-callmob', false)
                        $Img.hide();
                        var sizes = $Img.attr('data-advsize');
                        config.method = 'GetAllAdvertisment';
                        config.data = {
                            brandID: 0,
                            siteID: GetSiteID,
                            sizeID: sizes,
                            categoryID: relatedCategory,
                            offset: 0,
                            limit: 1
                        }
                        config.ajaxSuccess = function (data) {
                            data = data.d;
                            if (data.length > 0) {
                                if (IsMobile)
                                    data[0].DefaultFileName = data[0].MobileFileName;
                                $Img.attr('src', advPath + data[0].DefaultFileName);
                                $parent.attr('data-expdate', data[0].EndDate)
                                $Img.show();
                            }
                        }
                        CommonLibrary.AjaxCall(config);
                    } else {
                        $parent.attr('data-callmob', true)
                    }
                });
                if (scrnSize < 480) {
                    $('.comp-article-advs').each(function () {
                        var $parent = $(this);
                        var CallMobImg = $parent.attr('data-callmob');
                        if (CallMobImg) {
                            var advImg = $parent.find('img');
                            advImg.attr('src', advPath + $parent.attr('data-mobfile'));
                        }
                    });
                }
            },
            'library': {
            }

        }
    }
}
