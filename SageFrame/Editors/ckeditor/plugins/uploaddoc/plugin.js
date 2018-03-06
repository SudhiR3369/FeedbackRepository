/// <reference path="../../adapters/jquery.js" />
/// <reference path="../../ckeditor.js" />


//          [ For creating a custom plugin follow the link below: ]
//          http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
//          http://ckeditor.com/forums/CKEditor-3.x/How-add-custom-toolbar-item
//


var editor;
var _validFileExtensions = [".docx"];


CKEDITOR.plugins.add('uploaddoc', {

    init: function (edtr) {
        editor = edtr;
        var pluginName = 'uploaddoc';

        var pluginDirectory = this.path;

        edtr.ui.addButton('uploaddoc', {
            label: 'Upload Docx',             // The textual part of the button (if visibule) and its tooltip
            command: 'OpenWindow',          // The command to be executed once the button is activated

            // The toolbar group in which the button will be added
            toolbar: 'upload-x,2',           // Optional : Influence the position of the button in the toolbar group
            //icon: CKEDITOR.plugins.getPath('uploaddoc') + 'docupload.png'    // Uncomment this if you are not using font icons
        });

        //editor.addCommand('OpenWindow', new CKEDITOR.dial$Command('abbrDial$'));
        var cmd = edtr.addCommand('OpenWindow', { exec: ReadFromFile });
    }
});


$.fn.MediaPopUPs = function (data) {
    var $this = $(this);

    $('body').append('<div class="bgLayer"></div><div class="editorPopUp PopupContent "></div>');
    data = '<span class="popUpClose">X </span>' + data;


    //33 is length of <span class="popUpClose">X</span>
    if (data.length == 33)
        $('.PopupContent').append($this);
    else
        $('.PopupContent').append(data);


    $('html, body').animate({ scrollTop: 0 }, 800);

    $('.popUpClose').on('click', function () {

        CancelMediaPopUP();

    });
}


function CancelMediaPopUP() {
    var body = $('body');
    body.find('.bgLayer').fadeOut(420);
    body.find('.PopupContent').fadeOut(400);
}

function ReadFromFile(e) {
    var html = '<input id="EditorFileUpload" type="file" accept=".docx" onchange="UploadDocData(this)" /><label for="EditorFileUpload">Choose File</label>';
    $(this).MediaPopUPs(html);

    $('.PopupContent').css({
        "background": "#fff none repeat scroll 0 0",
        "left": "20%",
        "width": "50%",
        "padding": " 40px",
        "position": "absolute",
        "top": "70px",
        //"transform": "translate(-50%, -50%)",
        "z-index": "5000"
    });

}

function UploadDocData(input) {
    var file = input.files[0];

    if (ValidateFile(input)) {

        var formData = new FormData();
        formData.append("file", file);

        var location = window.location.href;

        var fileLocationPath = "";
        var count = location.match(/\//g).length;
        var num_slashes = count >= 5 ? count - 5 : count - 4;
        for (var i = 0; i <= num_slashes; i++) {
            fileLocationPath += "../";
        }


        $.ajax({
            url: fileLocationPath + "Editors/ckeditor/plugins/uploaddoc/DocumentParser.ashx?userModuleId=" + ckEditorUserModuleID + "&portalID=" + SageFramePortalID + "&userName=" + SageFrameUserName + "&sageFrameSecureToken=" + SageFrameSecureToken,
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            async: true,
            beforeSend: function () {

            },
            complete: function () {

            },
            success: function (result) {
                editor.insertHtml(result);

                //CKEDITOR.instances.editor.insertHtml(result);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
    CancelMediaPopUP();
}


function ValidateFile(input) {

    if (input.type == "file") {
        var sFileName = input.value;
        if (sFileName.length > 0) {
            var blnValid = false;
            for (var j = 0; j < _validFileExtensions.length; j++) {
                var sCurExtension = _validFileExtensions[j];
                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }

            if (!blnValid) {
                DisplayMessage("Unsupported file format : " + sFileName + " is invalid, allowed extension(s): " + _validFileExtensions.join(", "));

                //editor.insertHtml("<div style='color: #4F8A10;background-color: #DFF2BF;'>Unsupported file format : " + sFileName + " is invalid, allowed extension(s): " + _validFileExtensions.join(", ") + " </div>");
                //CKEDITOR.instances.editor.insertHtml("<div style='color: #4F8A10;background-color: #DFF2BF;'>Unsupported file format : " + sFileName + " is invalid, allowed extension(s): " + _validFileExtensions.join(", ") + " </div>");
                return false;
            }

            if (input.files[0].size > 5242880) {
                DisplayMessage("Please make sure that the file is less than 5 MB.");
                return false;
            }
        }
    }

    return true;
}

function DisplayMessage(message) {
    editor.insertHtml("<div class='close_box' style='color:red'> " + message + " </div>");
}

