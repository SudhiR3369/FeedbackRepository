var Website = {
    "Name": "Personal",
    "PageList": [],
    "DefaultPage": "",
    "Components": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,1,1,1",
    "UserModuleID": 0,
    "Culture": null,
    "SecureToken": null,
    "UserName": null,
    "PortalID": 0,
    "HostURL": SageFrameHostURL,
    "HeaderView": "",
    "HeaderEdit": "",
    "FooterEdit": "",
    "FooterView": ""
};
var webBuilderSettings = {
    "primaryColor": 'rgb(69, 83, 252)',
    "secondaryColor": '#ccc',
    "optionalColor": "#ccc",
    "defaultLayout": 'fullwidth',
    "defaultFontFamily": "Montserrat",
    "SiteHeaderEffect": "site-header-normal",
    "body": {
        "class": "editor-box activeSetting background-effect-image-parallax",
        "data-backgroundcolor": "",
        "data-backgroundimage": "image",
        "style": ""
    },
    "shadedLayer": "",
    "temporaryBackgroundcolor": '#FFF',
    "temporaryWidth": '100',
    "scrolltotop": false,
    "idcount": 0
};

var EasyLibrary ={
        
    ReadDOM: function (fileName) {
        var oRequest = new XMLHttpRequest();
        try {
            var URL = SageFrameHostURL + "/Modules/ArticleAdmin/CommonJs/comphtml/" + fileName + ".html";
            oRequest.open("GET", URL, false);
            //oRequest.setRequestHeader("User-Agent", navigator.userAgent);
            oRequest.send(null);
        }
        catch (message) {

        }
        if (oRequest.status == 200)
            return this.RemoveSpaceFromDOM(oRequest.responseText);
        else
            alert("Error executing XMLHttpRequest call!");
    },
    PageListDOM: function () {
        return this.RemoveSpaceFromDOM($('#innerPageList').html());
    },
    RemoveSpaceFromDOM: function (data) {
        if (data != null) {
            return data.replace(/\>\s+\</g, '><').trim();//.replace(/(\r\n|\n|\r)/gm, "").trim();
        }
    },
    FontCollectionList: function () {
        return this.RemoveSpaceFromDOM($('ul#fontIconCollection').html());
    },
    DefaultImage1: function () {
        return '<img  src="' + webbuildermodulepath + '/img/def1.jpg">';
    },
    DefaultImages: function () {
        return ["def1.jpg", "def2.jpg", "def3.jpg", "def4jpg", "def5.jpg", ];
    },
    IsDefined: function (data) {
        if (typeof data === "undefined")
            return false;
        else
            return true;
    },
    IsUndefined: function (data) {
        if (typeof data === "undefined")
            return true;
        else
            return false;
    },
    GetPageArray: function () {
        var pages = [];
        $('#innerPageList li').each(function () {
            var $this = $(this);
            pages.push({ 'id': $this.attr('data-pageid'), 'name': $this.find('span').text().trim() });
        });
        return pages;
    },
    GetPageOption: function () {
        var option = '';
        $('#innerPageList li').each(function () {
            var $this = $(this);
            option += '<option value="' + $this.attr('data-pageid') + '">' + $this.find('span').text().trim() + '</option>';
        });
        return option;
    },
    NumberCounter: function (itemCounter, minValue, maxValue, stepSize, defaultCount, callBackContainer, callBack) {


        var counter = '<i data-min="' + minValue + '" id="numCounterReducer" class="fa fa-chevron-left"></i>';
        counter += '<span id="numCounterTotal" class="f-weight-600 editor-com-innerSpacing-left-5 editor-com-innerSpacing-right-5">' + defaultCount + '</span>';
        counter += '<i data-max="' + maxValue + '" id="numCounterIncreaser" class="fa fa-chevron-right"></i>';
        itemCounter.append(counter);
        var reducer = itemCounter.find('#numCounterReducer');
        var increaser = itemCounter.find('#numCounterIncreaser');
        var totalCounter = itemCounter.find('#numCounterTotal');

        totalCounter.text(defaultCount);

        reducer.on('click', function () {
            var minValue = $(this).attr('data-min');
            var currentTotal = totalCounter.text();
            var count = parseInt(currentTotal);
            var newCount = count - stepSize;
            if (newCount >= parseInt(minValue)) {
                ReflectCounter(newCount);
            }
        });


        increaser.on('click', function () {
            var maxValue = $(this).attr('data-max');
            var currentTotal = totalCounter.text();
            var count = parseInt(currentTotal);
            var newCount = count + stepSize;
            if (newCount <= parseInt(maxValue)) {
                ReflectCounter(newCount);
            }
        });

        function ReflectCounter(newCount) {
            totalCounter.text(newCount);
            callBack(newCount, callBackContainer);
        }
    },

    GetSettings: function () {
        var $body = $('.site-body');
        var tempSettings = $body.attr('data-settings');
        if (typeof (tempSettings) !== 'undefined' && tempSettings.length > 0) {
            tempSettings = JSON.parse(tempSettings);
            //set the settings
            $body.addClass(tempSettings.defaultLayout);
            $body.addClass('ff-' + tempSettings.defaultFontFamily);
            $body.addClass('f-weight-400');
            $body.addClass(tempSettings.SiteHeaderEffect);
            $('.editor-box').attr('style', tempSettings.body.style);
            $body.addClass(tempSettings.temporaryWidth);

            $('.editor-box').attrs(tempSettings.body);
            if (typeof (tempSettings.shadedLayer) !== "undefined" && tempSettings.shadedLayer !== null) {
                var shadedDiv = divStart('editor-row-shaded-layer') + divEnd;
                var appendElem = $('.editor-box').children();
                $('.editor-box').append(shadedDiv);
                $('.editor-box').find(' > .editor-row-shaded-layer').append(appendElem).attrs(tempSettings.shadedLayer);
            }
            //initalize the settings
            $('#primaryColor').css('background-color', tempSettings.primaryColor);
            $('#secondaryColor').css('background-color', tempSettings.secondaryColor);
            $('#optionalColor').css('background-color', tempSettings.optionalColor);
            $('.layoutChange[data-layout="' + tempSettings.defaultLayout + '"]').prop('checked', true);
            $('#basicFonts').val(tempSettings.defaultFontFamily);

            //overriding the setting
            webBuilderSettings = tempSettings;
        }

        if (webBuilderSettings.scrolltotop) {
            $('#chkScrollToTopBox').prop('checked', true);
            var scroll = '<div class="scrolltotop" id="ScroolToTop"><div class="ScrollToTop editor-component"><div class="scrollDOM"><i class="fa fa-arrow-up" aria-hidden="true"></i></div></div></div>';
            $('body').append(scroll);
            $('#ScroolToTop').on('click', function () {
                $('body,html').animate({
                    scrollTop: '0px'
                }, 1000);
            });
        }

    },
    GenerateID: function ($elem, type) {
        var _this = this;
        var rows = 0;
        if (_this.IsDefined($('body').attr('data-count'))) {
            rows = parseInt($('body').attr('data-count'));
        }
        var id = rows + 1;
        $('body').attr('data-count', id);
        webBuilderSettings.idcount = id;
        return id;
    },
    GenerateAndAppendID: function ($elem, type) {
        $elem.attr('data-id', this.GenerateID($elem, type));
    },
    GetComponenetID: function ($elem) {
        var ID = 0;
        if (this.IsDefined($elem.attr('data-count'))) {
            ID = parseInt($elem.attr('data-count'));
        }
        return ID;
    }
};

//initialize the body settings
EasyLibrary.GetSettings();
function GetLibrary(dataType) {
    return component[dataType]["view"]["library"];
}

/***********DOM Creation Generic methods END************/



