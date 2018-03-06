/// <reference path="../../ckeditor.js" />


//          [ For creating a custom plugin follow the link below: ]
//          http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
//          http://ckeditor.com/forums/CKEditor-3.x/How-add-custom-toolbar-item
//



CKEDITOR.plugins.add('img', {

    init: function (edtr) {
        var pluginName = 'img';

        edtr.ui.addButton('img', {
            label: 'Upload Image',                   // The textual part of the button (if visibule) and its tooltip
            command: 'OpenImageEditorWindow',          // The                                                                                                                         command to be executed once the button is activated

            // The toolbar group in which the button will be added
            toolbar: 'upload-x,0',           // Optional : Influence the position of the button in the toolbar group

            // Uncomment this if you are not using font icons  --->
            //icon: CKEDITOR.plugins.getPath('img') + 'icon_img.png'   
        });
        //editor.addCommand('OpenWindow', new CKEDITOR.dialogCommand('abbrDialog'));
        var cmd = edtr.addCommand('OpenImageEditorWindow', { exec: Execute });
    },


});

function Execute(e) {

   

    //window.open('/Default.aspx', 'MyWindow', 'width=800,height=700,scrollbars=no,scrolling=no,location=no,toolbar=no');
    //e.insertHtml(' Hello ');

}
