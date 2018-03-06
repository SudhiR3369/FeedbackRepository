/// <reference path="../../ckeditor.js" />
//http://docs.ckeditor.com/source/plugin77.html#CKEDITOR-property-UI_RICHCOMBO

var cssLoader;
var cssloaderItems = [
        { 'name': 'Custom Classes' },                                                      // <--- Group Name
        { 'name': 'sfContent', 'value': 'sfContent', 'label': 'sfContent' },     //<--- Group Content 1
        { 'name': 'sfContent1', 'value': 'sfContent1', 'label': 'sfContent 1' },   //<--- Group Content 2
        { 'name': 'sfContent2', 'value': 'sfContent2', 'label': 'sfContent 2' },   //<--- Group Content 3
        { 'name': 'sfContent3', 'value': 'sfContent3', 'label': 'sfContent 3' },   //<--- Group Content 4 ...
];

var csslabel_default_labelName = 'Css Class'

CKEDITOR.plugins.add('cssloader',
{
    requires: ['richcombo'],
    init: function (edtr) {
        var config = edtr.config;

        var strings = cssloaderItems;

        edtr.ui.addRichCombo('cssloader',
		{
		    label: 'Class',
		    title: 'cssloader',
		    voiceLabel: 'cssloader',
		    toolbar: 'insert',
		    //toolbar: 'upload-x,3',
		    className: 'cke_format',
		    multiSelect: false,
		    panel:
			{
			    css: [edtr.config.contentsCss, CKEDITOR.skin.getPath('editor')],
			    voiceLabel: edtr.lang.panelVoiceLabel
			},

		    init: function () {
		        var lastgroup = '';
		        for (var i = 0, len = strings.length; i < len; i++) {
		            string = strings[i];

		            if (!string.value)
		                this.startGroup(string.name);
		            else {
		                if (!string.name) string.name = string.value;
		                if (!string.label) string.label = string.name;

		                this.add(string.value, string.name, string.label);
		            }
		        }
		    },

		    // ON COMBOBOX ITEM CLICK
		    onClick: function (value) {
		        edtr.focus();

		        var currentElement = edtr.getSelection().getStartElement();
		        var classList = currentElement.$.classList;
		        var currentElementClassListLength = classList.length;

		        if (currentElementClassListLength > 0)
		            for (var i = 0; i < currentElementClassListLength; i++) {
		                var classItem = classList[0];
		                for (var cItem = 0; cItem < cssloaderItems.length; cItem++) {
		                    if (cssloaderItems[cItem].value === classItem)
		                        currentElement.removeClass(classItem);
		                }
		            }
		        currentElement.addClass(value);

		        cssLoader.label = value;
		        cssLoader.setValue('', value);
		    },
		    onRender: function () {
		        cssLoader = this;
		    }

		});

        edtr.on('contentDom', function () {
            var editable = edtr.editable();

            editable.attachListener(editable, 'click', function (e) {
                var target = e.data.$.target;
                var classList = target.classList;
                FilterCSS(classList);
            });

            editable.attachListener(editable, 'keyup', function (e) {
                var currentElement = edtr.getSelection().getStartElement();
                var classList = currentElement.$.classList;
                FilterCSS(classList);
            });

        });

    }

});


function FilterCSS(classList) {
    var currentElementClassListLength = classList.length;
    if (currentElementClassListLength > 0) {
        for (var i = 0; i < currentElementClassListLength; i++) {
            var classItem = classList[i];
            for (var cItem = 0; cItem < cssloaderItems.length; cItem++)
                if (cssloaderItems[cItem].value === classItem) {
                    cssLoader.label = classItem;
                    cssLoader.setValue(classItem, classItem);
                    return false;
                }
        }
        cssLoader.label = 'Class';
        cssLoader.setValue('', 'Class');
    }
}