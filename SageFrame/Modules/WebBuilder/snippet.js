$('#shadowColor').css('background-color', $('.edit-area').css('background-color'));
var colorPickerOption = ColorPickerOption({
    renderCallback: function ($elm, toggled) {
        var objColor = RenderCallBackColor(this);

    }
});
$('#shadowColor').colorPicker(colorPickerOption);

GeneralOptionDOM('row-options', 'Row', 'row', true, 'dragRow', true, 'copyRow');
//renderCallback: function ($elm, toggled) {
//	var objColor = RenderCallBackColor(this);
//	var colorPickerID = $elm.attr('id');
//	switch (colorPickerID) {
//		case 'primaryColor':
//			$('#primaryColor').css('background-color', objColor.bgColor);
//			break;
//		case 'secondaryColor':
//			$('#secondaryColor').css('background-color', objColor.bgColor);
//			break;
//	}
//}
function ImageBoxRadius(space) {

}
SageSlider($('#imageRoundSlider'), $('#imageRoundHandle'), 0, 1200, roundImageWidth, ImageBoxRadius);

function ImageWidthSlider(space) {

}
AdvanceSageSlider($('#imagesizeSlider'), $('#imagesizeHandle'), minFontSize, maxFontsize, imageWidth, ImageWidthSlider, $parent, '%');

var holderheights = $parent.css('height').replace('px', '');
ChangeSliderValue($('#holderHeightSlider'), holderheights);

$('#shadedLayerActive').off().on('click', function () {
    if ($(this).is(':checked')) {
    }
    else {
    }
});


var $islinked = '';
if ($islinked) {
    $('#enableButtonLink').prop('checked', true);
}
else {
    $('#enableButtonLink').prop('checked', false);
}

$('#enableButtonLink').off().on('click', function () {
    if ($(this).is(':checked')) {
        $('#divEnableLink').slideDown(400);
    }
    else {
        $('#divEnableLink').slideUp(400);
    }
});

afterdrop
$appendLayer.find('.com-settings').trigger('click');
$appendLayer.find('.image-settings').trigger('click');

'data-textcollection' //for multiple  text


if (typeof $parent.attr('data-textcollection') !== "undefined") {
    $parent = $('.' + $parent.attr('data-textParcollection'));
    $textChange = $('.' + $parent.attr('data-textcollection'));
}

if (typeof $parent.attr('data-spaceCollection') !== "undefined") {
    $parent = $('.' + $parent.attr('data-spaceCollection'));
}

if (typeof $parent.attr('data-alignCollection') !== "undefined") {
    $parent = $('.' + $parent.attr('data-alignCollection'));
}

//FOtter option

//<div class="carrier-open-option no-drag active-options" style=" left: 48%;">
//                    Footer<i class="tooglesettings fa fa-bars"></i>
//</div>
//<div class="carries-options row-options">
//                    <i class="com-settings" title="Row settings" data-type="row">Settings</i>
//                    <i class="com-style" title="Row settings" data-type="row">Manage Columns</i>
//                     <i id="ManageFooter" title="Row settings" data-type="footer">Manage Footer</i>
//                </div>


//<div class="editor-component button activeSetting sfCol_49 editor-com-innerSpacing-top-10 editor-com-innerSpacing-right-10 editor-com-innerSpacing-bottom-10 editor-com-innerSpacing-left-10 editor-text-transform-uppercase" style="border-style: none; border-width: 0px; border-color: rgb(0, 0, 0); color: rgb(221, 221, 221); background-color: rgb(67, 63, 179); border-radius: 3px; width: 170px;" data-backgroundcolor="color" data-backgroundimage="" href="javascript:void(0);">
//                <div class="carrier-open-option">
//                    <i class="icon-icon-drag sortComponent" title="drag"></i>
//                    Button<i class="tooglesettings fa fa-bars"></i>
//                </div>
//                <div class=" carries-options button-options hide-element">
//                    <i class="row-setting com-settings" title="button settings" data-type="button">Settings</i>
//                    <i class="com-style" title="Manage Style settings" data-type="button">Manage Style</i>
//                    <i class=" deletehelper" title="delete">Delete</i>
//                </div>
//                <a class="com-button" style="color: rgb(255, 255, 255); font-size: 12px;">
//                    <span class="com-button-text onhovercolor" style="color: rgb(255, 255, 255);" contenteditable="true">button text</span>
//                    <i class="fa fa-arrow-right onhovercolor" style="color: rgb(255, 255, 255);"></i>
//                </a>
//            </div>


var compo = {
    "demoComponent": {
        "componentname": "demoComponent",
        "category": "basic",
        "icon": "icon-icon-row",
        "row": false,
        "hidden": true,
        "type":"element",
        "defaultdata": $("#rowline").html(),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {

        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

        },
        "onsort": function (ui) {

        },
        "settingDOMs": {
            "tabs": {
                "data": {
                    "DOM": function myfunction() {
                        var html = '';
                        DomCreate('div')
                        return html;
                    },
                    "onload": function ($item) {

                    }
                },
                "Basic":
                {
                    "DOM": "<span>Hello</span>",
                    "onload": function ($item) {

                    }
                },
                "Background":
                    {
                        "options": ["image", "color"]
                    },
                "Spacing":
                    {
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
                        }
                    },
                "Alignment":
                    {
                        "options": ["left", "center", "right"]
                    },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Box Radius":
                    {
                        "options": {
                            "max": 50,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                        }
                    },
                "Box Shadow":
                    {
                        "options": {

                        }
                    },
                "Hover Effect": {
                    "options": {
                        "color": ["background", "text"],
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"],
                            "selectLayer": function ($elem) {
                                //return $parent;
                            },
                        },
                        "zoom": "on"
                    },
                },
                "Scroll Effect": {
                    "options": [],
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent();
                    }
                }
            },
            "selectLayer": function ($elem) {
                $(".editor-row").removeClass("activeSetting");
                var $parent = $elem.parents(".editor-row");
                $parent.addClass("activeSetting");
                return $parent;
            },
        },
        "remove": function () {
        },
        "view": function () {

        }
    }
}

CreateSliderDOM(sliderID, sliderHandlerID, label)
CreateSliderWithColorDOM(sliderID, sliderHandlerID, label, colorID, colorClass)
CreateColorPickerDOM(label, colorID, colorClass)
CreateCheckboxDOM(label, chkID, chkCLass);

$this.SageMedia({
    userModuleID: webBuilderUserModuleID,
    onSelect: function (src, response, type, filename, extension) {
        $this.attr('src', src);
        var index = $('#imagecollection').find('img').index($this);
        $parent.find('.itemWrapper').find('img').eq(index).attr('src', src);
    },
    mediaType: 'image'
});

FullPagePopup({
    data: selectDOM,
    heading: "Icon styles",
    showheading: true
});

$('.editor-box').attrs();

$html.attrs($('.editor-box').attrs());



var fontGeneric = {
    "Font":
    {
        "DOM": $('#txtBasicTab').html(),
        "onload": function ($this) {
            var $parent = $this.parent().parent();
            $('.editor-component').find('.activeSetting').removeClass('activeSetting');
            $('.editor-component.activeSetting').removeClass('activeSetting');
            $parent.addClass('activeSetting');
            var $textChange = $parent.children().not('.carrier-open-option').not('.carries-options');
            if (typeof $parent.attr('data-childCollection') !== "undefined") {
                $textChange = $('.' + $parent.attr('data-childCollection'));
                $parent = $('.' + $parent.attr('data-parCollection'));
            }
            TextSetting($parent, $textChange);
        }
    }
}

//font collection
//$('ul#fontIconCollection').html();
EasyLibrary.FontCollectionList()

//EasyLibrary.ReadDOM("menusettings");
EasyLibrary.ReadDOM("orderlistbasic");

//"<div class="field-row clearfix">
//    <label>Total Items</label><span class="value">
//        <span class="manualNumCounter">
           
//        </span>
//    </span>
//</div>"
//after change 
function ReAssignTotalItems(count, $parent) {

}

EasyLibrary.NumberCounter($('.manualNumCounter'), 1, 50, 1, currentTotal, $parent, ReAssignTotalItems);



if ($element.hasClass('editor-row-container')) {
    if ($element.parent().hasClass('editor-row-shaded-layer')) {
        $element = $element.parent().parent();
    }
    else if ($element.parent().hasClass('editor-row ')) {
        $element = $element.parent();
    }
}


//Everycomponent starts with
//<div class="editor-component image sfCol_100" data-id="4" data-type="image">
//data-id and data-type are auto generated