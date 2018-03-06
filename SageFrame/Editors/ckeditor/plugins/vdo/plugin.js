/// <reference path="../../ckeditor.js" />


//          [ For creating a custom plugin follow the link below: ]
//          http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
//          http://ckeditor.com/forums/CKEditor-3.x/How-add-custom-toolbar-item
//



CKEDITOR.plugins.add('vdo', {

    init: function (edtr) {
        var pluginName = 'vdo';

        edtr.ui.addButton('vdo', {
            label: 'Upload Video',                   // The textual part of the button (if visibule) and its tooltip
            command: 'UploadVideoEditorWindow',          // The command to be executed once the button is activated
            cursor: 'pointer',
            // The toolbar group in which the button will be added
            toolbar: 'upload-x,1',           // Optional : Influence the position of the button in the toolbar group

            // Uncomment this if you are not using font icons  --->
            //icon: CKEDITOR.plugins.getPath('vdo') + 'icon_vdo.png'   
        });
        //editor.addCommand('OpenWindow', new CKEDITOR.dialogCommand('abbrDialog'));
        var cmd = edtr.addCommand('UploadVideoEditorWindow', { exec: UploadVideo });
    },


});

function UploadVideo(e) {

      

    //window.open('/Default.aspx', 'MyWindow', 'width=800,height=700,scrollbars=no,scrolling=no,location=no,toolbar=no');
    //e.insertHtml(' Hello ');

}
