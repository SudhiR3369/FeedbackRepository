/// <reference path="../../js/SageMediaManagement.js" />
/// <reference path="ckeditor.js" />

///
/// Plugin Types:
///        custom : Developer created plugin as a button
///        ext : Custom imported extension
///        custom-ext : Custom imported plugin as a button

var editor;

// Plugin Name, Icon, Class should be placed in a 1:1 ration
var plgnNames = 'img,vdo,uploaddoc,lineutils,widget,codesnippet,stylesheetparser,cssloader,clipboard';                  //  <---- Define Plugin Names comma separated without spacings
var pluginType = ["custom", "custom", "custom", "ext", "ext", "custom-ext", "ext", "ext","ext"];
var plgnIcons = ["fa-file-image-o", "fa-video-camera", "fa-upload"];   // <----- Define font icons per plugin by index
var plgnClass = ["imageUploader", "vdoUploader", "docUploader", "", "", "", "", "cssloader",""];   // <----- Define font icons per plugin by index
var plgnIconSize = "16px";
var plgnDefault = 'fa-plug';
var notdefined = 'undefined';

CKEDITOR.editorConfig = function (config) {
    
    config.toolbarCanCollapse = true;
    config.allowedContent = true;
    config.skin = 'moono';
    //config.fullPage = true;           //  <------- IF YOU WISH TO ENABLE HTML TAGS , ENABLE IT, ELSE DONT
    config.font_defaultLabel = 'Arial';
    config.fontSize_defaultLabel = '12px';

    // Advance Configuration Mode
    config.toolbar = [
        { name: 'document', items: ['Source', '-', 'NewPage', 'Preview'] },
        { name: 'upload-x', items: ['img', '-', 'vdo', '-', 'uploaddoc'] },
        { name: 'insert', items: ['CodeSnippet', 'Table', 'HorizontalRule', 'SpecialChar', 'cssloader'] },
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
        { name: 'links', items: ['Link', 'Unlink'] },
        { name: 'clipboard', items: ['Copy', 'Paste', 'PasteFromWord'] },
        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
        { name: 'forms', items: ['Checkbox', 'Radio'] },
        { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] }
    ];


    ////Basic Configuration Mode 
    ////[ You can choose between Advance or Basic mode of editing per requirement ]
    //config.toolbarGroups = [
    //     { name: 'document', groups: ['mode', 'document', 'doctools'] },
    //     //{ name: 'upload-x', groups: ['upload-x'], items: ['img', '-', 'vdo', '-', 'uploaddoc'] },
    //     { name: 'upload-x', groups: ['upload-x'] },
    //     { name: 'insert', groups: ['insert'] },
    //     { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    //     { name: 'clipboard', groups: ['clipboard', 'undo'] },
    //     { name: 'links', groups: ['links'] },
    //     { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
    //     { name: 'editing', groups: ['selection', 'find', 'spellchecker', 'editing'] },
    //     { name: 'forms', groups: ['forms'] },
    //     { name: 'styles', groups: ['styles'] },
    //     { name: 'colors', groups: ['colors'] }
    //];
    //// Whatever you want to exclude from the toobar, add it here ---->
    //config.removeButtons = 'Image,Save,Print,Maximize,ShowBlocks,Flash,Templates,TextField,Textarea,Select,Button,ImageButton,HiddenField,Redo,Undo,Cut,PasteText,About,Smiley,PageBreak,Iframe,BidiLtr,BidiRtl,Language,CreateDiv,RemoveFormat,Subscript,Superscript,Anchor,Form,Scayt,Find,Replace,SelectAll';

    config.extraPlugins = plgnNames;    // <---- Your external plugin name(s) should be defined here

    config.codeSnippet_theme = 'monokai_sublime';

    var normaizeCSS = SageFrameHostURL + '/Administrator/Templates/Default/css/normalize.css';
    var gridCSS = SageFrameHostURL + '/Administrator/Templates/Default/css/grid.css';

    var templateCSS = '';
    var customCSS = '';
    var responsiveCSS = '';
    //var darkCSS = SageFrameHostURL + '/Editors/ckeditor/plugins/codesnippet/lib/highlight/styles/dark.css';

    //var editorDefault =SageFrameHostURL+ 'Editors/ckeditor/editor.css';
    if (SageFrameActiveTemplate === 'Default') {
        templateCSS = SageFrameHostURL + '/Core/Template/css/template.css';
        customCSS = SageFrameHostURL + '/Core/Template/css/custom.css';
        responsiveCSS = SageFrameHostURL + '/Core/Template/css/responsive.css';
    } else {
        templateCSS = SageFrameHostURL + '/Templates/' + SageFrameActiveTemplate + '/css/template.css';
     //   customCSS = SageFrameHostURL + '/Templates/' + SageFrameActiveTemplate + '/css/custom.css';
        responsiveCSS = SageFrameHostURL + '/Templates/' + SageFrameActiveTemplate + '/css/responsive.css';
    }

    config.stylesSet = [];  // <--- Clear default settings to implement custom settings
    if (customCSS!='')
        config.contentsCss = [normaizeCSS, gridCSS, templateCSS, responsiveCSS, customCSS];
    else
        config.contentsCss = [normaizeCSS, gridCSS, templateCSS, responsiveCSS];


};


CKEDITOR.on("instanceReady", function (event) {

    editor = event.editor;

    var this_instance = document.getElementById(event.editor.id + '_toolbox');

    var plugins = plgnNames.split(',');
    for (var i = 0; i < plugins.length; i++) {

        if (pluginType[i] === "custom" || pluginType[i] === "custom-ext") {
            var this_button = this_instance.querySelector('.cke_button__' + plugins[i] + '_icon');
            if (typeof this_button !== null) {
                var icon;

                if (typeof plgnIcons[i] === notdefined && pluginType[i] === "custom")
                    icon = plgnDefault;
                else
                    icon = plgnIcons[i];

                if (typeof this_button !== notdefined) {
                    this_button.innerHTML = '<i class=" ' + plgnClass[i] + ' fa ' + icon + '" style="font: normal normal normal ' + plgnIconSize + '/1 FontAwesome !important;cursor: default;"></i>';
                }
            }
        }
    }
    BindEvents();

    //hljs.initHighlightingOnLoad();
});

// Bind your custom plugin events here --- >
function BindEvents() {
    $('.imageUploader').attr('data-event', 'click');
    $('.vdoUploader').attr('data-event', 'click');
    // Bind events for img, video plugin
    //CKEDITOR.scriptLoader.load([SageFrameHostURL + '/js/SageMediaManagement.js', SageFrameHostURL + '/Editors/ckeditor/plugins/codesnippet/lib/highlight/highlight.pack.js'], function (success) {
    CKEDITOR.scriptLoader.load(SageFrameHostURL + '/js/SageMediaManagement.js', function (success) {

        // [ IMAGE ]
        $('.imageUploader').SageMedia({
            userModuleID: ckEditorUserModuleID,
            onSelect: function (src, response, type, filename, extension) {
                editor.insertHtml(response);
            },
            mediaType: 'image',
        });
       
        // [ VIDEO ]
        $('.vdoUploader').SageMedia({
            userModuleID: ckEditorUserModuleID,
            onSelect: function (src, response, type, filename, extension) {
                var html = '';
                if (type === 'video') {
                    html += '<div class="video">';
                    html += '<video class="videos" width="100">';
                    html += '<source src="' + src + '" type="video/' + extension + '">';
                    html += '</source>Your browser does not support HTML5 video.</video>';
                    html += '</div>';
                }
                $('.videos').on('click', function () {
                    var $this = this;
                    //var $videoControl = $(this).parent().find('.videoControl');
                    if ($this.paused) {
                        //$videoControl.addClass('icon-pause').removeClass('icon-play');
                        $this.play();
                    }
                    else {
                        // $videoControl.removeClass('icon-pause').addClass('icon-play');
                        $this.pause();
                    }
                });

                editor.insertHtml(html);
            },
            mediaType: 'video'
        });

    });

    //CKEDITOR.scriptLoader.load(SageFrameHostURL + '/Editors/ckeditor/plugins/codesnippet/lib/highlight/highlight.pack.js', function (success) {
    //});

}


