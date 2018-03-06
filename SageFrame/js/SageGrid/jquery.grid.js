var SageData;
var gridData = [];
(function ($) {
    $.createGrid = function (t, p) {
        p = $.extend({
            striped: true, //apply odd even stripes
            url: false, //ajax url
            functionMethod: '', // url method
            dataList: '',
            method: 'POST', // data sending method
            dataType: 'xml', // type of data loaded
            errormsg: 'Connection Error',
            usepager: false, //
            nowrap: true, //
            page: 1, //current page
            total: 1, //total pages
            useRp: true, //use the results per page select box
            current: 1,
            rp: 5, // results per page
            rpOptions: [10, 25, 50, 100, 200], //[8, 16, 32, 64, 128],
            pageOf: '' + "Page" + ' {box} ' + "Of" + ' {count}',
            pnew: 1,
            pageshow: 5,
            title: false,
            nomsg: 'No items',
            dateformat: 'yyyy-MM-dd',
            onError: true,
            defaultImage: '',
            imageOfType: '',
            runAfterCaseValue: "",
            hidePagination: false, //To Hide Pagination
            NormalPaging: true, //
            NoOfPagesBlock: 2 //total number of paginf bloc to be show in between prev and next
            , CallBackMethod: ''
        }, p);

        $(t).show()
        .prop({ cellPadding: 0, cellSpacing: 0 });
        //.removeAttr('width');       
        // Global Varaiables Settings
        var tdalign = new Array();
        var tdtype = new Array();
        var tdformat = new Array();
        var primaryID = new Array();
        var desablesort = new Array();

        //updated onblur July 20 2011, July 26 2011
        var tdvalue = new Array();
        var tdRandomValue = new Array();
        var DownloadArguments = new Array();
        var DownloadMethod = new Array();

        // Update On 12 Dec 2010
        var tdHide = new Array();
        var tdcheckfor = new Array();
        var tdcheckedItems = new Array();

        var ElemClass = new Array();
        var ElemDefault = new Array();
        var ControlClass = new Array();

        //Updated On 29 May 2011
        var tdURL = new Array();
        var QueryPairs = new Array();

        var ShowPopUp = new Array();
        var PopUpID = new Array();

        var PopUpArguments = new Array();
        var PopUpMethod = new Array();

        var BtnTitle = new Array();

        var AltText = new String();
        var currentPage = 1;

        var setFlag = false;

        SageData = function () {
            var getGridArray = function (id) {
                for (var z = 0; z < gridData.length; z++) {
                    if (gridData[z].id == id) {
                        return gridData[z];
                    }
                }
            };
            var checkExist = function (id) {
                var isExist = false;
                for (var z = 0; z < gridData.length; z++) {

                    if (gridData[z].id == id) {
                        isExist = true;
                        break;
                    }
                }
                return isExist;
            };
            var checkArrItemExist = function (id, tableGridID) {
                var isExist = false;
                var gridArrData = SageData.Get(tableGridID);
                if (gridArrData != undefined) {
                    for (var z = 0; z < gridArrData.Arr.length; z++) {
                        if (gridArrData.Arr[z] == id) {
                            isExist = true;
                            break;
                        }
                    }
                }
                return isExist;
            }
            var checkDelArrItemExist = function (id, tableGridID) {
                var isExist = false;
                var gridArrData = SageData.Get(tableGridID);
                if (gridArrData != undefined) {
                    for (var z = 0; z < gridArrData.DelArr.length; z++) {
                        if (gridArrData.DelArr[z] == id) {
                            isExist = true;
                            break;
                        }
                    }
                }
                return isExist;
            }
            var getIndex = function (id) {
                var index = 0;
                for (var z = 0; z < gridData.length; z++) {

                    if (gridData[z].id == id) {
                        index = z;
                        break;
                    }
                }
                return index;
            };

            var getArrIndex = function (id, tableGridID) {
                var index = 0;
                var gridArrData = SageData.Get(tableGridID);
                var index = SageData.getIndex(tableGridID);
                if (gridArrData != undefined) {
                    for (var z = 0; z < gridArrData.Arr.length; z++) {
                        if (gridArrData.Arr[z] == id) {
                            index = z;
                            break;
                        }
                    }
                }
                return index;
            }
            var getDelArrIndex = function (id, tableGridID) {
                var index = 0;
                var gridArrData = SageData.Get(tableGridID);
                var index = SageData.getIndex(tableGridID);
                if (gridArrData != undefined) {
                    for (var z = 0; z < gridArrData.DelArr.length; z++) {
                        if (gridArrData.DelArr[z] == id) {
                            index = z;
                            break;
                        }
                    }
                }
                return index;
            }
            var pushArr = function (index, data) {
                gridData[index].Arr.push(data);
            };
            var delArrPush = function (index, data) {
                gridData[index].DelArr.push(data);
            };

            var deleteArr = function (tableID, data) {
                var arrIndex = SageData.getArrIndex(data, tableID);
                var index = SageData.getIndex(tableID);
                gridData[index].Arr.splice(arrIndex, 1);
            };
            var delArrDel = function (tableID, data) {
                var arrIndex = SageData.getDelArrIndex(data, tableID);
                var index = SageData.getIndex(tableID);
                gridData[index].DelArr.splice(arrIndex, 1);
            };
            return {
                Get: getGridArray,
                checkExist: checkExist,
                getIndex: getIndex,
                pushArr: pushArr,
                deleteArr: deleteArr,
                checkArrItemExist: checkArrItemExist,
                delArrPush: delArrPush,
                delArrDel: delArrDel,
                checkDelArrItemExist: checkDelArrItemExist,
                getArrIndex: getArrIndex,
                getDelArrIndex: getDelArrIndex
            }
        }();

        var gridInfos = {
            id: t.id,
            Arr: [],
            DelArr: []
        };
        if (!SageData.checkExist(t.id)) {
            gridData.push(gridInfos);
        }
        var g = {
            wcf: function () {
                //var param = { offset: p.pnew, limit: p.rp, portalId: 1, userName: 'RAJA' };
                var params = $.extend({ offset: p.pnew, limit: p.rp }, p.param);

                var mydata = JSON2.stringify(params);

                $(document).ready(function () {
                    if ($(".responsiveTableWrap").length == 0) {
                        $('#' + t.id + '').wrap("<div class='responsiveTableWrap'></div>");
                    }
                    $("#" + t.id).parent('div.responsiveTableWrap').prev().prev(".loading").find('img').prop('src', '' + SageFrameHostURL + '/images/loading.gif');
                    $("#" + t.id).parent('div.responsiveTableWrap').prev().prev(".loading").show();

                    if (p.dataList.length > 0) {
                        g.SuccessDataBinding(p.dataList);
                        p.dataList = {};
                    }
                    else {                       
                        $.ajax({
                            type: "POST",
                            url: p.url + p.functionMethod,
                            data: mydata,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            //cache: false,
                            success: function (data) {
                                g.SuccessDataBinding(data.d);
                            },
                            complete: function () {
                                $("#" + t.id).parent('div.responsiveTableWrap').prev().prev(".loading").hide();

                                if (p.runAfterCaseValue != "") {
                                    g.runAfterCase(p.runAfterCaseValue);
                                }

                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                $("#" + t.id).parent('div.responsiveTableWrap').prev().prev(".loading").hide();
                                if (p.onError) {
                                    g.clearAll();
                                    //alert(xhr.status);
                                    //alert(thrownError);
                                    $(this).prev("div.log").text(xhr.responseText);
                                }
                            }
                        });
                    }
                });

                //Updated On May 30 2011
                //                $(document.body).click(function(e) {
                //                    var target = $(e.target).parents('p');
                //                    if (target.attr("class") !== 'Sageshowhide cssClassActionImg')
                //                        $('div.cssClassActionOnClickShow').hide();
                //                });
            },

            SuccessDataBinding: function (data) {
                // debugger;
                g.clearAll();
                g.addHeader();
                dataLength = data.length
                if (dataLength == 0) {
                    g.noDataMsg();                    
                    $("#" + t.id).next("div.pagination").remove();
                }
                else {
                    if (p.current == 1)
                    {
                        $("#" + t.id).next("div.pagination").remove();
                    }
                    if (p.rp < dataLength) {
                        data.splice(dataLength - 1, 1);
                    }
                    g.addData(data);
                    g.addRowProp();
                    g.addActions();
                    g.addControls();
                    //debugger;
                    if (p.hidePagination === false) {
                        if (p.NormalPaging === true) {
                            g.newPagination();
                        }
                        else {
                            g.SimplePaging(dataLength);                            
                        }
                    }

                    $(t).tablesorter({
                        headers: p.sortcol,
                        widgets: ['zebra']
                    });

                    //$(t).update();
                    for (j = 0; j < p.colModel.length; j++) {
                        var cm = p.colModel[j];
                        if (cm.coltype == 'checkbox') {
                            if (cm.controlclass != undefined) {
                                var controlClass = cm.controlclass;
                            }

                            if (cm.elemClass != undefined) {
                                var elementclass = cm.elemClass;
                            }
                            $('.' + elementclass).bind('click', function () {
                                g.MakeHeaderCheck(elementclass, controlClass);
                            });
                        }
                    }
                }
                $(t).show();
                $("#" + t.id).parent('div.responsiveTableWrap').prev().prev(".loading").hide();
                if (p.CallBackMethod != null && (p.CallBackMethod + "").trim().length > 0) {
                    p.CallBackMethod();
                }

               // CurrencySymbol();
            },
            MakeHeaderCheck: function (elementclass, controlClass) {
                var uncheckedflag = true;
                indexArr = SageData.getIndex(t.id);
                var tableGridId = t.id;
                $('.' + elementclass).each(function () {
                    var id = $(this).val();
                    if (!$(this).is(':checked')) {
                        uncheckedflag = false;
                        if (!SageData.checkDelArrItemExist(id, tableGridId)) {
                            SageData.delArrPush(indexArr, id);
                        }
                        if (SageData.checkArrItemExist(id, tableGridId)) {
                            SageData.deleteArr(tableGridId, id);
                        }
                    }
                    else {
                        if (!SageData.checkArrItemExist(id, tableGridId)) {
                            SageData.pushArr(indexArr, id)
                        }
                        if (SageData.checkDelArrItemExist(id, tableGridId)) {
                            SageData.delArrDel(tableGridId, id);
                        }
                    }
                    $('.' + controlClass).prop('checked', uncheckedflag);
                });
            },

            noDataMsg: function () {
                // alert(p.colModel.length);
                var tbody = document.createElement('tbody');
                var tr = document.createElement('tr');
                var td = document.createElement('td');
                $(td).prop('colspan', p.colModel.length);
                $(td).html(p.nomsg);
                $(tr).append(td);
                $(tbody).append(tr);
                $(t).append(tbody);

            },

            SimplePaging: function (dataLength) {
                var perPage = p.rp;
                //currentPage = 1;
                var pagingHolder = '';
                var parentSelector = $(t);

                var pagingLength = parentSelector.parent().find('.pagination').length;
                if (pagingLength > 0 && perPage >= dataLength && currentPage<2)
                {
                    parentSelector.parent().find('.pagination').remove();
                }
                if (perPage < dataLength) {
                    
                    //parentSelector.parent().find('.pagination').html('');
                    
                    var pagePrev = '<span class="cssClassPagePrevNxt" id="pagePrev"> Prev </span>';
                    var pageNext = '<span class="cssClassPagePrevNxt" id="pageNext"> Next </span>';
                    if (pagingLength == 0) {
                        pagingHolder = '<div class="pagination" data-count="1"><div class="pages"></div>';
                        pagingHolder += pageNext;
                        pagingHolder += '</div>';
                    }
                    else {
                        parentSelector.find('.pagination #pageNext').show();
                        //currentPage = parentSelector.find('.pagination').attr('data-count');
                    }
                    $(pagingHolder).insertAfter(parentSelector);
                    parentSelector = parentSelector.parent();
                    g.BindNextAction();
                    g.ShowHidePrevNext(currentPage);
                }
                else {
                    //debugger;
                    //var page = parentSelector.find('.pages .page .activePage');

                    //if (page.length > 0) {
                    //    g.FindActivePage(currentPage);
                    //}
                    //else {
                    //    g.AddRemovePageBlockNext(currentPage);
                    //}

                    g.BindNextAction();
                    parentSelector.find('.pagination #pageNext').hide();
                }

            },
            FindActivePage: function (pageNo) {
                var parentSelector = $(t).parent();
                parentSelector.find('.pages').find('.page').removeClass('activePage');
                parentSelector.find('.pages').find('.page').each(function () {
                    var $this = $(this);
                    if ($this.text() == pageNo) {
                        $this.addClass('activePage');
                    }
                });
            },
            AddRemovePageBlockNext: function (currentPage) {
                var parentSelector = $(t).parent();
                parentSelector.find('.pages').append('<span class="page">' + currentPage + '</span>');
                var pageBlockLength = parentSelector.find('.pages').find('.page').length;
                if (pageBlockLength > p.NoOfPagesBlock) {
                    $('.pages').find('.page').eq(0).remove();
                }
            },
            AddRemovePageBlockPrev: function (currentPage) {
                var parentSelector = $(t).parent();
                parentSelector.find('.pages').prepend('<span class="page">' + currentPage + '</span>');
                var pageBlockLength = $('.pages').find('.page').length;
                if (pageBlockLength > p.NoOfPagesBlock) {
                    parentSelector.find('.pages').find('.page').eq(p.NoOfPagesBlock).remove();
                }
            },

            BindNextAction: function () {
                var perPage = p.rp;
                var pageNext = '<span class="cssClassPagePrevNxt" id="pageNext"> Next </span>';
                var pagePrev = '<span class="cssClassPagePrevNxt" id="pagePrev"> Prev </span>';
                var parentSelector = $(t).parent();
                parentSelector.find('#pageNext').off().on('click', function () {
                    if (parentSelector.find('.pagination #pagePrev').length == 0) {
                        parentSelector.find('.pagination').append(pagePrev);
                        g.BindPrevAction();
                    }
                    else {
                        parentSelector.find('.pagination #pagePrev').show();
                    }

                    if (currentPage > 0) {
                        parentSelector.find('.pagination #pageNext').show();
                    }
                    else {
                        parentSelector.find('.pagination #pageNext').hide();
                    }
                    //if the page is active, that is if the paging is clicked then get the clicked page value
                    //var page = parentSelector.find('.pages .page.activePage');
                    //if (page.length > 0) {
                    //    currentPage = parseInt(page.text()) + 1; //next page value
                    //    g.FindActivePage(currentPage);
                    //}
                    //else {
                    //    //this is new page so  the page is added to the paging                        
                    //    if (dataLength > perPage) {
                    //        g.AddRemovePageBlockNext(currentPage);
                    //        currentPage++;//next page value
                    //    }
                    //}

                    currentPage++;//next page value
                    //parentSelector.find('.pagination').attr('data-count', currentPage); //setting  the current page in data-count.
                    //console.log(dataLength + ':' + perPage)
                    if (dataLength > perPage)
                        g.invokePagination(currentPage); //get the list of data

                    if (dataLength <= perPage) {
                        parentSelector.find('.pagination #pageNext').remove();
                    }

                    //parentSelector.find('.page').off().on('click', function () {
                    //    var $this = $(this);
                    //    parentSelector.find('.pages').find('.page').removeClass('activePage');
                    //    $this.addClass('activePage');
                    //    currentPage = parseInt($this.text());
                    //    g.ShowHidePrevNext(currentPage);
                    //    parentSelector.find('.pagination').attr('data-count', currentPage);
                    //    g.invokePagination(currentPage);
                    //});
                });
            },

            BindPrevAction: function () {
                var perPage = p.rp;
                var pageNext = '<span class="cssClassPagePrevNxt" id="pageNext"> Next </span>';
                var pagePrev = '<span class="cssClassPagePrevNxt" id="pagePrev"> Prev </span>';
                var parentSelector = $(t).parent();
                parentSelector.find('#pagePrev').off().on('click', function () {
                    //var currentPage = parentSelector.find('.pagination').attr('data-count');
                    if (parentSelector.find('.pagination #pageNext').length == 0) {
                        parentSelector.find('.pagination').append(pageNext);
                        g.BindNextAction();
                    }
                    else {
                        parentSelector.find('.pagination #pageNext').show();
                    }

                    if (currentPage > 0) {
                        parentSelector.find('.pagination #pagePrev').show();
                    }
                    else {
                        parentSelector.find('.pagination #pageNext').hide();
                    }
                    if (currentPage > 1) {
                        //var page = parentSelector.find('.pages .page.activePage');
                        //if (page.length > 0) {
                        //    currentPage = parseInt(page.text()) - 1; //next page value
                        //    g.FindActivePage(currentPage);
                        //}
                        //else {
                        //    //this is new page so  the page is added to the paging
                        //    currentPage--;//next page value
                        //    g.AddRemovePageBlockPrev(currentPage);
                        //}
                        currentPage--;//next page value
                        g.ShowHidePrevNext(currentPage);
                        parentSelector.find('.pagination').attr('data-count', currentPage); //setting  the current page in data-count.

                        g.invokePagination(currentPage); //get the list of data
                    }
                    if (currentPage == 1) {
                        parentSelector.find('.pagination #pagePrev').remove();
                    }
                });
            },
            ShowHidePrevNext: function (pageNo) {
                var parentSelector = $(t);
                if (pageNo == 1) {
                    parentSelector.find('.pagination #pagePrev').hide();
                }
                else {
                    parentSelector.find('.pagination #pagePrev').show();
                }
            },
            newPagination: function () {
                var opt = '';
                var PageWrapper = document.createElement('div');
                var PageOuterWrap = document.createElement('div');
                $(PageOuterWrap).addClass("pagination_grid");
                //var PageNumberMidBg = document.createElement('div');
                //var PageNumberRightBg = document.createElement('div');
                //var PageNumberLeftBg = document.createElement('div');

                //View 1 - 10 of 1 000 000

                var PageOf = document.createElement('div');
                var Pages = document.createElement('div');
                var ViewOf = document.createElement('div');
                $(Pages).addClass("pagination_wrap");


                // Call Pagination Class
                sagePaging.Paging(p.total, p.rp); // total,rowperpage
                sagePaging.NavPaging(p.current, p.pageshow);  // currentPage


                $(PageOf).addClass("cssClassPages");
                //var txt = p.pageOf.replace(/{box}/, '<input type="text" value="' + p.current + '" readonly="readonly" />'); 

                //this line: making input to span
                var txt = p.pageOf.replace(/{box}/, '<span class="noOfPage"> ' + p.current + '</span>');


                txt = txt.replace(/{count}/, sagePaging.maxPage);
                $(PageOf).prepend(txt);

                for (var nx = 0; nx < p.rpOptions.length; nx++) {

                    if (p.rp == p.rpOptions[nx]) sel = 'selected="selected"'; else sel = '';
                    opt += "<option value='" + p.rpOptions[nx] + "' " + sel + " >" + p.rpOptions[nx] + "</option>";
                };
                var offset = p.pnew + parseInt(p.rp) - 1;
                if (offset > p.total) {
                    offset = p.total;
                }
                // $(PageWrapper).prepend('<div class="cssClassViewOf">' + "View" + ' ' + p.pnew + '-' + offset + ' ' + 'Of' + ' ' + p.total + ' ' + 'records' + '</div>');
                $(PageWrapper).prepend('<div class="cssClassViewPerPage">' + "View Per Page:" + ' <select name="rp" id="' + t.id + '_pagesize">+"' + opt + '"</select></div>');
                $(PageWrapper).find('select').change(
                    function () {
                        p.page = 1;
                        p.rp = this.value;
                        g.clearAll();
                        p.pnew = 1;
                        p.current = 1;
                        g.wcf();
                    }
                );

                $(Pages).prepend(sagePaging.nav);
                $(Pages).prependTo(PageWrapper);
                // $(PageOf).prependTo(PageWrapper);

                //$(PageNumberMidBg).prependTo(PageNumberRightBg);
                //$(PageNumberRightBg).prependTo(PageNumberLeftBg);
                //$(PageNumberLeftBg).prependTo(PageWrapper);
                //$(PageNumberMidBg).addClass("cssClassPageNumberMidBg");
                //$(PageNumberRightBg).addClass("cssClassPageNumberRightBg");
                //$(PageNumberLeftBg).addClass("cssClassPageNumberLeftBg");

                $(PageWrapper).prependTo($(PageOuterWrap));
                $(PageOuterWrap).insertAfter($(t));
                $(PageWrapper).addClass("cssClassPageNumber clearfix");
                $(PageWrapper).prop('id', (t.id + '_Pagination'));

                $(PageOf).find('input').keypress(function (e) {
                    //alert(sagePaging.maxPage);
                    var txtval = $.trim($(this).prop('value'));
                    var code = (e.keyCode ? e.keyCode : e.which);

                    if (code == 13) { //Enter keycode                   
                        if (txtval != '' && (parseInt(txtval) <= parseInt(sagePaging.maxPage)))
                            g.invokePagination(txtval);

                    } else {
                        if (!g.validate(e)) {
                            return false;
                        }
                    }
                });

                $(Pages).find('a').each(function () {
                    $(this).click(function () {
                        g.invokePagination($(this).attr('alt'));
                    });
                });

            },

            invokePagination: function (pageno) {
                p.current = pageno;
                p.pnew = (pageno - 1) * p.rp + 1; //offset                 
                //g.clearAll();
                g.wcf();
            },

            clearAll: function () {
                $(t).find('thead').remove();
                $(t).find('tbody').remove();
                $(t).css('display', 'none');
                var id = $(t).prop('id') + '_Pagination';
                $('#' + id).parents('div.pagination_grid').remove();
                primaryID.length = 0;
                //$('.pagination').html('');
                //$('.cssClassPagination').remove();
            },

            addActions: function () {
                if (p.buttons) {
                    $('tbody tr', t).each(function (k) {
                        var actionwrapper = document.createElement('div');
                        var actiontoolswrapper = document.createElement('div');
                        var actiontools = document.createElement('div');
                        var actionsP = document.createElement('p');
                        var showhide = document.createElement('p');
                        var currentIndex = $(this).closest("tr")[0].rowIndex - 1;
                        if (p.buttons.length > 1) {
                            $(actionwrapper).addClass('cssClassActionOnClick');
                            $(actiontoolswrapper).addClass('cssClassActionOnClickShow');
                            $(actiontools).addClass('cssClassActionOnClickShowInfo');
                            $(showhide).addClass('Sageshowhide');
                            $(showhide).addClass('cssClassActionImg');
                            $(showhide).append('<a href="javascript:void(0);"><i class="fa fa-ellipsis-v"></i></a>');
                        }
                        else {

                        }
                        // $(showhide).append('<div class="grid_action"><a href=""><i class="fa fa-eye"></i>Details</a></div>')
                        //$(showhide).append('<a href=#edit' + currentIndex + '>&nbsp;</a>');

                        //$(actiontoolswrapper).css({ width: '200px', height: '200px', border: '1px solid red' })

                        for (i = 0; i < p.buttons.length; i++) {
                            var btn = p.buttons[i];
                            var button = document.createElement('a');
                            $(button).prop('href', 'javascript:;');
                            $(button).prop('alt', btn.name);
                            var id = $.trim(btn.name) + k;
                            $(button).prop('id', id);
                            $(button).addClass(btn.trigger);
                            $(button).prop('alt', btn._event);
                            if (btn.arguments != undefined) {
                                $(button).prop('itemid', btn.arguments);
                            }
                            //Updated On May 30 2011
                            if (btn.callMethod != undefined) {
                                $(button).prop('method', btn.callMethod);
                            }
                            if (p.buttons.length == 1) {
                                $(button).append('<i class="' + btn.cssclass + '"></i>' + btn.display);
                                if (btn.cssclass == undefined)
                                { $(button).html(btn.display); }
                            }
                            else {
                                $(button).html(btn.display);
                            }
                            //$(actiontools).append(button);
                            $(actionsP).append(button);
                        }
                        $(actiontools).append(actionsP);
                        $(actiontoolswrapper).append(actiontools);
                        $(actionwrapper).append(actiontoolswrapper);
                        $(actionwrapper).append(showhide);

                        $(this).find('td:last').html(actionwrapper);




                        // $(this).find('td:last').html(actiontools);



                        $(actiontools).find('a').each(function () {
                            var trigger = $(this).prop('class');
                            var callMethod = $(this).prop('method');
                            var _event = $(this).prop('alt');
                            var arguments = '';
                            if ($(this).prop('itemid') != undefined) arguments = $(this).prop('itemid');
                            var arg = new Array();
                            //var argus = null;
                            arg[0] = primaryID[k];
                            arg[1] = p.pnew;
                            arg[2] = p.current;

                            if (arguments != '') {
                                var argus = arguments.split(',');
                                for (loop = 0; loop < argus.length; loop++) {
                                    //arg[arg.length] = argus[loop];
                                    arg[arg.length] = g.getCellValue($(this), argus[loop]);
                                }
                            }


                            switch (_event) {
                                case "click":
                                    $(this).click(function () {
                                        getFunction(t.id, trigger, callMethod, arg);
                                    });
                                    break;
                                case "mouseover":
                                    $(this).mouseover(function () {
                                        getFunction(t.id, trigger, callMethod, arg);
                                    });
                                    break;
                            }
                        });
                        if (p.buttons.length > 1) {
                            $(actiontoolswrapper).hide();
                        }
                        //$(showhide).find('a').hover(function () {
                        //    //$(showhide).hide();
                        //    $('div.cssClassActionOnClickShow').hide();
                        //    $(actiontoolswrapper).show();
                        //});
                        //$(showhide).mouseout(function () {
                        //    //$(showhide).hide();
                        //    $('div.cssClassActionOnClickShow').hide();
                        //    $(actiontoolswrapper).hide();
                        //});
                        if (p.buttons.length > 1) {
                            $(actiontoolswrapper).mouseover(function () {
                                $(this).show();
                            }).mouseout(function () {
                                $(this).hide();
                                //$(showhide).show();
                            });
                            $("#" + t.id).mouseout(function () {
                                $(actiontoolswrapper).hide();
                                //$(showhide).show();
                            });
                            $(showhide).find('a').on('click', function () {
                                //$(showhide).hide();
                                $('div.cssClassActionOnClickShow').hide();
                                $(actiontoolswrapper).show();
                            });
                        }
                        //$("body").not(".cssClassActionOnClickShow").on('click', function () {
                        //    //$(showhide).hide();
                        //    if ($(".cssClassActionOnClickShow").is(":visible")) {
                        //        $('div.cssClassActionOnClickShow').hide();
                        //        $(actiontoolswrapper).hide();
                        //    }
                        //});
                    });
                }
            },

            addHeader: function () {
                if (p.colModel) {

                    thead = document.createElement('thead');
                    tr = document.createElement('tr');


                    for (j = 0; j < p.colModel.length; j++) {
                        var cm = p.colModel[j];
                        var th = document.createElement('th');

                        $(th).html(cm.display);


                        if (cm.coltype == 'checkbox') {
                            var chkbox = document.createElement('input');
                            $(chkbox).prop('type', 'checkbox');
                            $(th).html(chkbox);
                            if (cm.elemDefault != undefined) {
                                $(chkbox).prop('checked', cm.elemDefault);
                            }

                            if (cm.controlclass != undefined) {
                                var controlClass = cm.controlclass;
                                $(chkbox).prop('class', cm.controlclass);
                            }


                            if (cm.elemClass != undefined) {
                                var elementclass = cm.elemClass;
                            }

                            $(chkbox).click(function () {
                                $('.' + elementclass)
                                        .not(':disabled')
                                        .prop('checked', $(this).is(':checked'));
                                g.MakeHeaderCheck(elementclass, controlClass);
                            });
                        }

                        //MOdified On July 20 2011
                        if (cm.value) {

                            tdvalue[j] = cm.value;
                        }

                        if (cm.randomValue) {
                            tdRandomValue[j] = cm.randomValue;
                        }

                        if (cm.downloadarguments) {
                            DownloadArguments[j] = cm.downloadarguments;
                        }

                        if (cm.downloadmethod) {
                            DownloadMethod[j] = cm.downloadmethod;
                        }

                        //Modified On 29 Dec 2010
                        if (cm.checkFor) {
                            tdcheckfor[j] = cm.checkFor;
                        }

                        if (cm.checkedItems) {

                            tdcheckedItems[j] = cm.checkedItems;
                        }

                        if (cm.name)
                            $(th).prop('abbr', cm.name);

                        //th.idx = i;
                        $(th).prop('axis', 'col' + j);

                        if (cm.align) {
                            // th.align = cm.align;
                            tdalign[j] = cm.align;
                        }

                        if (cm.type) {
                            tdformat[j] = cm.format;
                            tdtype[j] = cm.type;
                        }
                        else {
                            tdformat[j] = '';
                            tdtype[j] = '';
                        }

                        if (cm.cssclass)
                            $(th).addClass(cm.cssclass);

                        // Update On 12 Dec 2010
                        if (cm.hide) {
                            $(th).hide();
                            tdHide[j] = cm.hide;
                        }

                        if (cm.process) {
                            th.process = cm.process;
                        }

                        if (cm.elemClass) {
                            ElemClass[j] = cm.elemClass;
                        }

                        if (cm.elemDefault) {
                            ElemDefault[j] = cm.elemDefault;
                        }

                        if (cm.controlclass) {
                            ControlClass[j] = cm.controlclass;
                        }

                        //Updated On May 29 2011
                        if (cm.url) {
                            tdURL[j] = cm.url;
                        }
                        if (cm.queryPairs) {
                            QueryPairs[j] = cm.queryPairs;
                        }
                        if (cm.showpopup) {
                            ShowPopUp[j] = cm.showpopup;
                        }
                        if (cm.popupid) {
                            PopUpID[j] = cm.popupid;
                        }

                        if (cm.btntitle) {
                            BtnTitle[j] = cm.btntitle;
                        }

                        if (cm.poparguments) {
                            PopUpArguments[j] = cm.poparguments;
                        }
                        if (cm.popupmethod) {
                            PopUpMethod[j] = cm.popupmethod;
                        }

                        if (cm.alttext) {
                            AltText = cm.alttext;
                        }

                        $(tr).addClass('cssClassHeading');

                        $(tr).append(th);

                    } // For Ends

                    $(thead).append(tr);
                    $(t).prepend(thead);
                }
            },

            addRows: function (data) {
                // Insert New Row...
            },

            addRowProp: function () {
                //                $('tbody tr', t).each(function() {
                //                    $(this).click(function() {

                //                        alert($(this).find('td').eq(0).html() + 'row is clicked!');
                //                    });
                //                });
            },

            addData: function (data) {
                var tbody = document.createElement('tbody');
                $.each(data, function (i, row) {
                    delete (row.__type);
                    p.total = row.RowTotal;
                    delete (row.RowTotal);
                    var setprimaryID = false;
                    var tr = document.createElement('tr');
                    tr.className = (i % 2 && p.striped) ? 'sfOdd' : 'sfEven';
                    if (row.id) tr.id = 'row' + i;

                    //var td = document.createElement('td');

                    //$(td).html(i + 1)
                    //td.align = tdalign[0]; 
                    //$(tr).append(td)
                    //if (tdHide[0]) $(td).hide();
                    var cell = 0;

                    $.each(row, function (ncols) {
                        //alert(row[ncols]);
                        if (setprimaryID == false) {
                            //alert(row[ncols]);
                            primaryID[primaryID.length] = row[ncols]
                            setprimaryID = true;
                        }
                        var td = document.createElement('td');
                        var cm = p.colModel[cell];
                        $(td).attr("data-label", cm.display);
                        //var idx = $(this).prop('axis').substr(3);
                        td.align = tdalign[cell];
                        td.style.textAlign = td.align;
                        if (tdtype[cell] != '') {
                            row[ncols] = g.formatContent(row[ncols], tdtype[cell], tdformat[cell], cm.cssclass);

                        }
                        $(td).html(row[ncols]);
                        $(tr).append(td);

                        //Update On 12 Dec 2010
                        if (tdHide[cell]) { $(td).hide(); $(td).addClass('cssClassHide') };
                        td = null;
                        cell++;

                    }); // ncols ends

                    if (p.buttons) {
                        var td = document.createElement('td');
                        td.align = tdalign[cell];
                        var cm = p.colModel[cell];
                        $(td).attr("data-label", cm.display);
                        $(tr).append(td);
                        if (tdHide[cell]) $(td).hide();
                    }

                    $(tbody).append(tr);

                }); // row ends

                $(t).append(tbody);
            },
            formatContent: function (content, type, formats, cssclass) {
                var returnvalue;
                if (type == "boolean") {
                    var txt = formats.split('/');
                    var value = content == true ? txt[0] : txt[1];
                    if (content == true) {
                        returnvalue = "<span class='tdTick fa fa-check'><span>" + value + "</span></span>";
                    }
                    else {
                        returnvalue = "<span class='tdCross fa fa-times'><span>" + value + "</span></span>";
                    }
                }
                else if (type == "label") {
                    //cm.cssclass
                    returnvalue = "<span class='" + cssclass + " " + content + "'>" + content + "</span>";
                }
                else if (type == "currency") {
                    //cm.cssclass
                    if (!isNaN(content)) {
                        returnvalue = "<cur-sym></cur-sym><span class='" + cssclass + "'>" + content + "</span>";
                    }
                    else {
                        returnvalue = "<span class='" + cssclass + "'>" + content + "</span>";
                    }
                }
                return returnvalue;
            },
            AddButtonEvent: function (trElement, btn, index) {
                if (ShowPopUp[index]) {
                    $(btn).prop('method', PopUpMethod[index]);
                    var arguments = '';
                    if (PopUpArguments[index] != undefined) {
                        arguments = PopUpArguments[index];
                    }

                    var arg = new Array();

                    if (arguments != '') {
                        var argus = arguments.split(',');
                        for (loop = 0; loop < argus.length; loop++) {
                            arg[arg.length] = g.getCellValue($(btn), argus[loop]);
                        }
                    }
                    getPopUpFunction(PopUpMethod[index], arg, PopUpID[index]);
                }
                else {
                    var queryPairs = QueryPairs[index];
                    var queryString = '';
                    if (queryPairs != '') {
                        var opt = queryPairs.split(';');
                        var querySymbol = '?';

                        $.each(opt, function (i, item) {
                            if (i > 0) {
                                querySymbol = '&';
                            }
                            var optValue = item.split(":");
                            var queryValue = g.getCellValue(trElement, optValue[1]);
                            queryString += querySymbol + optValue[0] + '=' + queryValue;
                        });
                        //Redirection HERE
                        window.location.href = tdURL[index] + queryString;
                    }
                }
            },
            addControls: function () {
                if (p.colModel) {
                    var tableGridId = t.id;
                    $('tbody tr', t).each(function (tcount) {
                        $(this).find('td').each(function (rcount) {
                            var cm = p.colModel[rcount];
                            switch (cm.coltype) {
                                case "checkbox":
                                    //Updated On 29 Dec 2010                                   
                                    var chkbox = document.createElement('input');
                                    $(chkbox).prop('type', 'checkbox');
                                    $(chkbox).prop('value', primaryID[tcount]);

                                    if (ElemClass[rcount] != undefined) {
                                        $(chkbox).prop('class', ElemClass[rcount]);
                                    }

                                    if (ElemDefault[rcount] != undefined) {
                                        $(chkbox).prop('checked', ElemDefault[rcount]);
                                    }

                                    var enableCheckStatus = '';
                                    if (tdcheckedItems[rcount] != undefined) {
                                        var parentEl = $(this).parent('TR');
                                        var checkID = $(parentEl).find('TD:eq("' + tdcheckedItems[rcount] + '")').text();
                                        //alert(checkID);
                                        enableCheckStatus = (checkID.toLowerCase() == 'yes') ? 'checked' : '';
                                        //alert(enableCheckStatus);
                                        $(chkbox).prop('checked', enableCheckStatus);
                                    }
                                    var id = $(chkbox).val();
                                    if (SageData.checkArrItemExist(id, tableGridId)) {
                                        $(chkbox).prop('checked', true);
                                    }
                                    if (SageData.checkDelArrItemExist(id, tableGridId)) {
                                        $(chkbox).prop('checked', false);
                                    }

                                    var checkstatus = '';
                                    if (tdcheckfor[rcount] != undefined) {
                                        //var elementclass = ElemClass[rcount];
                                        //var controlClass = ControlClass[rcount];
                                        var parentEls = $(this).parent('TR');
                                        var indexValue = $(parentEls).find('TD:eq("' + tdcheckfor[rcount] + '")').text();
                                        checkstatus = (indexValue.toLowerCase() == 'yes') ? 'disabled' : '';
                                        //alert(checkstatus);                                        
                                        $(chkbox).prop('disabled', checkstatus);
                                    }
                                    $(this).html(chkbox);
                                    break;

                                case "button":
                                    var btnBox = document.createElement('input');
                                    var trElement = $(this);
                                    $(btnBox).prop('type', 'button');
                                    $(btnBox).prop('id', 'btn_' + tcount + '_' + primaryID[tcount]);

                                    //$(btnBox).addClass(p.txtClass);
                                    if (ControlClass[rcount] != undefined) {
                                        $(btnBox).addClass(ControlClass[rcount]);
                                    }
                                    var btnTitle = $(this).html();
                                    if (BtnTitle[rcount] != undefined) {
                                        btnTitle = BtnTitle[rcount]
                                    }
                                    var previousvalue = btnTitle;
                                    //$(btnBox).html('<span><span>' + previousvalue + '</span></span>');
                                    $(btnBox).prop('value', previousvalue);
                                    $(this).html(btnBox);

                                    $(btnBox).click(function () {
                                        g.AddButtonEvent(trElement, $(this), rcount);
                                    });
                                    break;
                            } // Case Ends
                        });

                    });
                }
            },

            getCellValue: function (ele, colIndex) {
                //alert(ele.parents().html())();
                //                               var parentEls = ele.parents()
                //                               .map(function() {
                //                                   return this.tagName;
                //                               })
                //                               .get().join(", ");
                //                               alert(parentEls);

                var parentEls = ele.parents('TR');
                var indexValue = $(parentEls).find('TD:eq("' + colIndex + '")').text();
                if (!indexValue) indexValue = '';
                return indexValue;

            },
            runAfterCase: function (caseValue) {
                switch (caseValue) {
                    case "0":
                        if ($("#gdvIndexedTables").length) {
                            $("#gdvIndexedTables tr").each(function (index) {
                                var trIndex = index - 1;
                                var children = $(this).children();
                                $(this).children().each(function (index) {
                                    if (index == 4) {
                                        if ($(this).text() == '0') {
                                            $('#rebuild' + trIndex).hide();
                                        }
                                        else {
                                            $('#reindex' + trIndex).hide();
                                        }
                                    }
                                });
                            });
                        }
                    default:
                        break;
                }
            },
            validate: function (e) {
                var key;
                var keychar;

                if (window.event)
                    key = window.event.keyCode;
                else if (e)
                    key = e.which;
                else
                    return true;
                keychar = String.fromCharCode(key);

                // control keys
                if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13) || (key == 27))
                    return true;

                    // numbers
                else if ((("0123456789").indexOf(keychar) > -1))
                    return true;

                    // decimal point jump
                else if ((keychar == ".")) {
                    //myfield.form.elements[dec].focus();
                    return false;
                }
                else
                    return false;

            }
        };
        g.wcf();
    };

    $.fn.sagegrid = function (p) {

        return this.each(function () {
            $.createGrid(this, p);
        });
    };
})(jQuery);