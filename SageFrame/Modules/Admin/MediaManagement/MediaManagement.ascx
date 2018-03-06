<%@ Control Language="C#" AutoEventWireup="true" CodeFile="MediaManagement.ascx.cs" Inherits="Modules_Admin_MediaManagement_MediaManagement" %>
<script type="text/javascript" xmlns="http://www.w3.org/1999/html">
    //<![CDATA[   
    $(function () {
        $(this).MediaManagementSetting({
            userModuleID: '<%=userModuleID%>'
        });
    });
    //]]>
</script>


<div id="dvSettings" class="cssClassTabPabelTabel" style="display: none;">
    <h2>Media Management Setting</h2>
    z
    <div id="tblPageDetails">
        <input type="hidden" value="0" id="hdnMediaSettingID" />
        <div class="sfFormwrapper">
            <input type="hidden" id="MediaSettingID" value="0" />
            <div class="sfFormwrapper">
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">Folder Name (Where media is to be store)</span>
                    </div>
                    <div class="formValue">
                        <input id="txtfolderName" name="txtFolderName" class="sfInputbox" title="0" type="text" />
                        <label class="sfnote mar-top">(Enter a folder name that is used as base media container. )</label>
                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey buttonClick">
                        <span class="sfFormlabel">Media visibility</span>
                    </div>
                    <div class="formValue">
                        <div class="folder-visible-all">
                            <input type="radio" id="rdReuseable" name="folderVisible" value="reuseable" />
                            <label for="rdReuseable">Visible to all</label>
                            <label class="sfnote">(Select this if you want to give media to everyone.)</label>
                        </div>
                        <div class="folder-visible-user">
                            <input type="radio" id="rdUserWise" name="folderVisible" value="userwise" />
                            <label for="rdUserWise">User wise</label>
                            <label class="sfnote">(Select this if you want to give media access to logged in users only.)</label>

                        </div>
                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey buttonClick">
                        <span class="sfFormlabel">location</span>
                    </div>
                    <div class="sfFieldset">
                        <div class="formValue sytem-location">
                            <input type="radio" id="rdFromSytem" name="MediaLocation" value="System" />
                            <label for="rdFromSytem">All Files</label>
                            <div class="hide" style="display: none;">
                                <label for="IgnoreFolder">Except in folder</label>
                                <input id="txtIgnoreFolder" name="IgnoreFolder" maxlength="100" class="sfInputbox" type="text" />
                            </div>
                            <label class="sfnote">(Select this if your application uses SageFrame as base media folder.)</label>

                        </div>
                        <div class="media-location">
                            <input type="radio" id="rdFromMediaLocation" name="MediaLocation" value="medialocation" />
                            <label for="rdFromMediaLocation">Only From Media folder location</label>
                            <label class="sfnote mar-top">(Select if your application uses the "Folder Name" mentioned above as base media folder.)</label>


                        </div>
                    </div>
                </div>
                <div class="sfFieldset" id="trParent">
                    <div class="formKey">
                        <span class="sfFormlabel">Allow Category</span>
                    </div>
                    <div class="formValue">
                        <input id="chkAllowCategory" type="checkbox" />
                        <label for="chkAllowCategory" class="sfnote">(Checkmark if your application allows to create categories for media management.)</label>

                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">Optimize Image While Uploading</span>
                    </div>
                    <div class="formValue">
                        <input id="chkAllowOptimization" type="checkbox" />
                        <label class="sfnote" for="chkAllowOptimization">(Set this value if your Image needed to be optimize while uploading)</label>
                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">Scale Image</span>
                    </div>
                    <div class="formValue">
                        <input id="txtScaleImage" maxlength="3" class="sfInputbox" type="text" style="width: 150px" />
                        %
                            <label class="sfnote inline">(Set this value if you want to scale your image while uploading.)</label>

                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">File Extension</span>
                    </div>
                    <div class="formValue">
                        <div class="image-location">
                            <label for="txtImageExtension">Image</label>
                            <input id="txtImageExtension" maxlength="100" class="sfInputbox" type="text" />
                        </div>
                        <div class="video-location">
                            <label for="txtvideoExtension">Video</label>
                            <input id="txtvideoExtension" maxlength="100" class="sfInputbox" type="text" />
                        </div>
                        <div class="document-location">
                            <label for="txtdocumentExtension">Document</label>
                            <input id="txtdocumentExtension" maxlength="100" class="sfInputbox" type="text" />
                        </div>
                        <label class="sfnote">(Set the file extensions for media files to be uploaded separated by comma. E.g: jpg, png, gif, jpeg.)</label>

                    </div>
                </div>

            </div>
        </div>
        <div class="sfButtonwrapper sftype1 button-paddleft">
            <label id="btnSaveSetting" class="icon-update sfBtn smlbtn-succ">
                Update</label>
            <label id="btnCancelSettings" class="icon-close sfBtn smlbtn-danger">
                Cancel</label>
        </div>
    </div>
</div>

<div id="dvMediaList" class="MediaHandler">

    <h1>Media Management<span id="spnMediaSetting" class="sfBtn smlbtn-def"><i class="fa fa-cog "></i>Settings</span></h1>

    <div class="dis-flex">
        <div class="s-m-left">
            <div class="ButtonWrappers">
                <div class="button wraper">
                    <span class="btnwrppr" id="categorycreator" style="display: none;">
                        <input id="txtCategoryname" name="txtFolderName" class="sfInputbox" title="0" type="text" />
                        <button id="btnAddCategory" class="sfBtn smlbtn-primary icon-addnew" type="button">Create Category</button>
                    </span>
                    <span class="btnwrppr">
                        <span class="chkwrppr">
                            <input type="radio" name="rdbSearch" id="rdbSearch" value="1" checked="checked" />
                            <label for="rdbSearch">Local</label>
                            <input type="radio" id="rdbSearchB" name="rdbSearch" value="2" />
                            <label for="rdbSearchB">Online</label>
                        </span>
                        <input id="txtSearchFile" name="txtFolderName" class="sfInputbox" title="0" type="text" />
                        <button id="btnSearch" class="sfBtn smlbtn-primary icon-search" type="button">Search</button>
                        <button id="refreshSearch" class="sfBtn smlbtn-secondary icon-refresh">Refresh</button>
                    </span>
                </div>
            </div>
        </div>

        <div class="s-m-right">
            <div class="fileUploader">
            </div>
            <div class="divBreadcrumb">
            </div>
            <div data-rootfolder="" id="CategoryListing" class="CategoryListing clearfix">
            </div>
        </div>
    </div>

</div>

<div id="imagemanipulate" class="imagemanipulate" style="display: none;">
    <h1>Image Editor</h1>
    <!--<div id="backtoMediaList" class="back-to-btn"></div>-->
    <div title="GO Back to template page" id="backtoMediaList" class="closeLayoutEditor"><span class="sfBtn smlbtn-danger icon-back">back</span></div>

    <%--    <div id="imageWrapper" class="sfCol_80">
        <img src="/" class="selectedImage" width="100%" />
    </div>
    <div id="imageWrapperSettings" class="sfCol_20">
        <ul class="ImageProperties">
            <li><span>Image Name:</span><input type="text" /></li>
            <li><span>Image size:</span></li>
            <li><span>Image dimensions:</span></li>
        </ul>
        <div id="tabWrapper">
            <ul class="settings">
                <li id="cropImage" class="" data-div="dvCropWrapper"><i title="crop" class="fa fa-crop"></i></li>
                <li id="CompressImage" class="" data-div="dvCompressWrapper"><i title="compress" class="fa fa-compress"></i></li>
                <li id="resize" class="" data-div="dvresizeWrapper"><i title="resize" class="fa fa-retweet"></i></li>
            </ul>
            <div id="dvCropWrapper" style="display: none;" class="imageeditor">1</div>
            <div id="dvCompressWrapper" style="display: none;" class="imageeditor">

                <span>Optimize Image</span>
            </div>
            <div id="dvresizeWrapper" style="display: none;" class="imageeditor">3</div>
        </div>
        

    </div>--%>

    <div id="CropImageWrapper" class="sfCol_100">
        <div class="container">
            <div class="row">
                <div class="sfCol_60 left_pad_0">
                    <div class="img-container">
                        <img id="imgCropping" src="/modules/admin/MediaManagement/images/nodataImg.jpg" alt="Picture" />
                        <%--class="cropper-hidden"--%>
                    </div>
                </div>
                <div class="sfCol_40">
                    <div class="docs-preview clearfix">
                        <div class="img-preview preview-lg" style="width: 254.222px; height: 143px;">
                            <img src=" " style="display: block; width: 409.185px; height: 230.167px; min-width: 0px ! important; min-height: 0px ! important; max-width: none ! important; max-height: none ! important; image-orientation: 0deg ! important; margin-left: -111.869px; margin-top: -45.902px; transform: none;" />
                        </div>

                        <!--<div class="img-preview preview-md" style="width: 128px; height: 72px;"><img src="Cropper.js_files/picture.jpg" style="display: block; width: 206.023px; height: 115.888px; min-width: 0px ! important; min-height: 0px ! important; max-width: none ! important; max-height: none ! important; image-orientation: 0deg ! important; margin-left: -56.3256px; margin-top: -23.1115px; transform: none;"></div>
                        <div class="img-preview preview-sm" style="width: 72px; height: 40.5px;"><img src="Cropper.js_files/picture.jpg" style="display: block; width: 115.888px; height: 65.187px; min-width: 0px ! important; min-height: 0px ! important; max-width: none ! important; max-height: none ! important; image-orientation: 0deg ! important; margin-left: -31.6831px; margin-top: -13.0002px; transform: none;"></div>
                        <div class="img-preview preview-xs" style="width: 40px; height: 22.5px;"><img src="Cropper.js_files/picture.jpg" style="display: block; width: 64.3822px; height: 36.215px; min-width: 0px ! important; min-height: 0px ! important; max-width: none ! important; max-height: none ! important; image-orientation: 0deg ! important; margin-left: -17.6017px; margin-top: -7.22235px; transform: none;"></div>-->
                    </div>
                    <div class="mysite" style="width: 254.222px; height: 143px; display: none;">
                        <img id="clientImage" src="" style="display: block; width: 409.185px; height: 230.167px; min-width: 0px ! important; min-height: 0px ! important; max-width: none ! important; max-height: none ! important; image-orientation: 0deg ! important; margin-left: -111.869px; margin-top: -45.902px; transform: none;" />
                    </div>
                    <div class="docs-data" style="display: none;">
                        <div class="input-group input-group-sm">
                            <label class="input-group-addon" for="dataX">X</label>
                            <input class="form-control" id="dataX" placeholder="x" value="350" type="text">
                            <span class="input-group-addon">px</span>
                        </div>
                        <div class="input-group input-group-sm">
                            <label class="input-group-addon" for="dataY">Y</label>
                            <input class="form-control" id="dataY" placeholder="y" value="144" type="text">
                            <span class="input-group-addon">px</span>
                        </div>
                        <div class="input-group input-group-sm">
                            <label class="input-group-addon" for="dataWidth">Width</label>
                            <input class="form-control" id="dataWidth" placeholder="width" value="795" type="text">
                            <span class="input-group-addon">px</span>
                        </div>
                        <div class="input-group input-group-sm">
                            <label class="input-group-addon" for="dataHeight">Height</label>
                            <input class="form-control" id="dataHeight" placeholder="height" value="447" type="text">
                            <span class="input-group-addon">px</span>
                        </div>
                        <div class="input-group input-group-sm">
                            <label class="input-group-addon" for="dataRotate">Rotate</label>
                            <input class="form-control" id="dataRotate" placeholder="rotate" value="0" type="text">
                            <span class="input-group-addon">deg</span>
                        </div>
                        <div class="input-group input-group-sm">
                            <label class="input-group-addon" for="dataScaleX">ScaleX</label>
                            <input class="form-control" id="dataScaleX" placeholder="scaleX" value="1" type="text">
                        </div>
                        <div class="input-group input-group-sm">
                            <label class="input-group-addon" for="dataScaleY">ScaleY</label>
                            <input class="form-control" id="dataScaleY" placeholder="scaleY" value="1" type="text">
                        </div>
                    </div>

                    <div class="row" id="actions">
                        <div class="col-md-3 acp-ratios docs-toggles">
                            <!-- <h3 class="page-header">Toggles:</h3> -->
                            <div class="btn-group docs-aspect-ratios" data-toggle="buttons">
                                <h2>Aspect Ratios</h2>
                                <label class="ratios">
                                    <input class="sr-only" id="aspectRatio1" checked="checked" id="ratio1" name="aspectRatio" value="1.7777777777777777" type="radio" />
                                    <label for="aspectRatio1">16:9</label>

                                </label>
                                <label class="ratios">
                                    <input class="sr-only" id="aspectRatio2" name="aspectRatio" value="1.3333333333333333" type="radio" />
                                    <label for="aspectRatio2">4:3</label>
                                    <!--<span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="aspectRatio: 4 / 3">4:3-->
                                    <!--</span>-->
                                </label>
                                <label class="ratios">
                                    <input class="sr-only" id="aspectRatio3" name="aspectRatio" value="1" type="radio" />
                                    <label for="aspectRatio3">1:1</label>
                                </label>
                                <label class="ratios">
                                    <input class="sr-only" id="aspectRatio4" name="aspectRatio" value="0.6666666666666666" type="radio" />
                                    <label for="aspectRatio4">2:3</label>
                                </label>
                                <label class="ratios">
                                    <input class="sr-only" id="aspectRatio5" name="aspectRatio" value="NaN" type="radio" />
                                    <label for="aspectRatio5">Free</label>
                                </label>
                            </div>

                            <%--<div class="btn-group docs-view-modes" data-toggle="buttons">
                                                                <label class="btn btn-primary active">
                                                                    <input class="sr-only" id="viewMode0" name="viewMode" value="0" checked="checked" type="radio">
                                                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="View Mode 0">VM0
                                                                    </span>
                                                                </label>
                                                                <label class="btn btn-primary">
                                                                    <input class="sr-only" id="viewMode1" name="viewMode" value="1" type="radio">
                                                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="View Mode 1">VM1
                                                                    </span>
                                                                </label>
                                                                <label class="btn btn-primary">
                                                                    <input class="sr-only" id="viewMode2" name="viewMode" value="2" type="radio">
                                                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="View Mode 2">VM2
                                                                    </span>
                                                                </label>
                                                                <label class="btn btn-primary">
                                                                    <input class="sr-only" id="viewMode3" name="viewMode" value="3" type="radio">
                                                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="View Mode 3">VM3
                                                                    </span>
                                                                </label>
                                                            </div>--%>
                        </div>
                        <div class="col-md-9 crop-tools docs-buttons">
                            <h2>Image Adjustments</h2>
                            <!-- <h3 class="page-header">Toolbar:</h3> -->
                            <!--<div class="btn-group">-->
                            <!--&lt;!&ndash;<button type="button" class="btn btn-primary" data-method="setDragMode" data-option="move" title="Move">-->
                            <!--<span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.setDragMode(&quot;move&quot;)">-->
                            <!--<span class="fa fa-arrows"></span>-->
                            <!--</span>-->
                            <!--</button>-->
                            <!--<button type="button" class="btn btn-primary" data-method="setDragMode" data-option="crop" title="Crop">-->
                            <!--<span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.setDragMode(&quot;crop&quot;)">-->
                            <!--<span class="fa fa-crop"></span>-->
                            <!--</span>-->
                            <!--</button>&ndash;&gt;-->
                            <!--</div>-->

                            <div class="btn-group">
                                <button type="button" class="sfBtn smlbtn-primary" data-method="zoom" data-option="0.1" title="Zoom In">
                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.zoom(0.1)">
                                        <span class="fa fa-search-plus"></span>
                                    </span>
                                </button>
                                <button type="button" class="sfBtn smlbtn-primary" data-method="zoom" data-option="-0.1" title="Zoom Out">
                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.zoom(-0.1)">
                                        <span class="fa fa-search-minus"></span>
                                    </span>
                                </button>
                            </div>

                            <div class="btn-group">
                                <button type="button" class="sfBtn smlbtn-primary" data-method="move" data-option="-10" data-second-option="0" title="Move Left">
                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.move(-10, 0)">
                                        <span class="fa fa-arrow-left"></span>
                                    </span>
                                </button>
                                <button type="button" class="sfBtn smlbtn-primary" data-method="move" data-option="10" data-second-option="0" title="Move Right">
                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.move(10, 0)">
                                        <span class="fa fa-arrow-right"></span>
                                    </span>
                                </button>
                                <button type="button" class="sfBtn smlbtn-primary" data-method="move" data-option="0" data-second-option="-10" title="Move Up">
                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.move(0, -10)">
                                        <span class="fa fa-arrow-up"></span>
                                    </span>
                                </button>
                                <button type="button" class="sfBtn smlbtn-primary" data-method="move" data-option="0" data-second-option="10" title="Move Down">
                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.move(0, 10)">
                                        <span class="fa fa-arrow-down"></span>
                                    </span>
                                </button>
                            </div>
                            <div class="btn-group">
                                <button type="button" class="sfBtn smlbtn-primary" data-method="rotate" data-option="-45" title="Rotate Left">
                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.rotate(-45)">
                                        <span class="fa fa-rotate-left"></span>
                                    </span>
                                </button>
                                <button type="button" class="sfBtn smlbtn-primary" data-method="rotate" data-option="45" title="Rotate Right">
                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.rotate(45)">
                                        <span class="fa fa-rotate-right"></span>
                                    </span>
                                </button>
                            </div>

                            <div class="btn-group">
                                <button type="button" class="sfBtn smlbtn-primary" data-method="scaleX" data-option="-1" title="Flip Horizontal">
                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.scaleX(-1)">
                                        <span class="fa fa-arrows-h"></span>
                                    </span>
                                </button>
                                <button type="button" class="sfBtn smlbtn-primary" data-method="scaleY" data-option="-1" title="Flip Vertical">
                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.scaleY(-1)">
                                        <span class="fa fa-arrows-v"></span>
                                    </span>
                                </button>
                            </div>

                            <%--<div class="btn-group">
                                          <button type="button" class="btn btn-primary" data-method="crop" title="Crop">
                                                <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.crop()">
                                                    <span class="fa fa-check"></span>
                                                </span>
                                            </button>
                                            <button type="button" class="btn btn-primary" data-method="clear" title="Clear">
                                                <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.clear()">
                                                    <span class="fa fa-remove"></span>
                                                </span>
                                            </button>
                                        </div>

                                      <div class="btn-group">
                                            <button type="button" class="btn btn-primary" data-method="disable" title="Disable">
                                                <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.disable()">
                                                    <span class="fa fa-lock"></span>
                                                </span>
                                            </button>
                                            <button type="button" class="btn btn-primary" data-method="enable" title="Enable">
                                                <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.enable()">
                                                    <span class="fa fa-unlock"></span>
                                                </span>
                                            </button>
                                        </div>--%>

                            <div class="btn-group">
                                <button type="button" class="sfBtn smlbtn-primary" data-method="reset" title="Reset">
                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.reset()">
                                        <span class="fa fa-refresh"></span>
                                    </span>
                                </button>
                                <%--                        <label class="btn btn-primary btn-upload" for="inputImage" title="Upload image file">
                                                <input class="sr-only" id="inputImage" name="file" accept="image/*" type="file">
                                                <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="Import image with Blob URLs">
                                                    <span class="fa fa-upload"></span>
                                                </span>
                                            </label>--%>
                                <%--<button type="button" class="btn btn-primary" data-method="destroy" title="Destroy">
                                                <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.destroy()">
                                                    <span class="fa fa-power-off"></span>
                                                </span>
                                            </button>--%>
                            </div>
                            <div class="">

                                <span id="btnSaveCroppedImage" class="sfBtn smlbtn-succ icon-crop">Crop & save
                                </span>
                                <button id="btnCropped" style="display: none;" type="button" class="btn btn-primary" data-method="getCroppedCanvas">
                                    <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.getCroppedCanvas()">Crop
                                    </span>
                                </button>
                                <%--                        <button type="button" class="btn btn-primary" data-method="getCroppedCanvas" data-option="{ &quot;width&quot;: 160, &quot;height&quot;: 90 }">
                                                <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.getCroppedCanvas({ width: 160, height: 90 })">160×90
                                                </span>
                                            </button>
                                            <button type="button" class="btn btn-primary" data-method="getCroppedCanvas" data-option="{ &quot;width&quot;: 320, &quot;height&quot;: 180 }">
                                                <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.getCroppedCanvas({ width: 320, height: 180 })">320×180
                                                </span>
                                            </button>--%>
                            </div>

                            <!-- Show the cropped image in modal -->
                            <%--                    <div class="modal fade docs-cropped" id="getCroppedCanvasModal" role="dialog" aria-hidden="true" aria-labelledby="getCroppedCanvasTitle" tabindex="-1">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                        <h4 class="modal-title" id="getCroppedCanvasTitle">Cropped</h4>
                                                    </div>
                                                    <div class="modal-body"></div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                        <a class="btn btn-primary" id="download" href="javascript:void(0);" download="cropped.jpg">Download</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>--%>
                            <!-- /.modal -->

                            <%-- <button type="button" class="btn btn-primary" data-method="getData" data-option="" data-target="#putData">
                                            <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.getData()">Get Data
                                            </span>
                                        </button>
                                        <button type="button" class="btn btn-primary" data-method="setData" data-target="#putData">
                                            <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.setData(data)">Set Data
                                            </span>
                                        </button>
                                        <button type="button" class="btn btn-primary" data-method="getContainerData" data-option="" data-target="#putData">
                                            <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.getContainerData()">Get Container Data
                                            </span>
                                        </button>
                                        <button type="button" class="btn btn-primary" data-method="getImageData" data-option="" data-target="#putData">
                                            <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.getImageData()">Get Image Data
                                            </span>
                                        </button>
                                        <button type="button" class="btn btn-primary" data-method="getCanvasData" data-option="" data-target="#putData">
                                            <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.getCanvasData()">Get Canvas Data
                                            </span>
                                        </button>
                                        <button type="button" class="btn btn-primary" data-method="setCanvasData" data-target="#putData">
                                            <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.setCanvasData(data)">Set Canvas Data
                                            </span>
                                        </button>
                                        <button type="button" class="btn btn-primary" data-method="getCropBoxData" data-option="" data-target="#putData">
                                            <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.getCropBoxData()">Get Crop Box Data
                                            </span>
                                        </button>
                                        <button type="button" class="btn btn-primary" data-method="setCropBoxData" data-target="#putData">
                                            <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.setCropBoxData(data)">Set Crop Box Data
                                            </span>
                                        </button>
                                        <button type="button" class="btn btn-primary" data-method="moveTo" data-option="0">
                                            <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.moveTo(0)">0,0
                                            </span>
                                        </button>
                                        <button type="button" class="btn btn-primary" data-method="zoomTo" data-option="1">
                                            <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.zoomTo(1)">100%
                                            </span>
                                        </button>
                                        <button type="button" class="btn btn-primary" data-method="rotateTo" data-option="180">
                                            <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.rotateTo(180)">180°
                                            </span>
                                        </button>
                                        <input class="form-control" id="putData" placeholder="Get data to here or set data with this value" type="text">--%>
                        </div>
                        <!-- /.docs-buttons -->


                        <!-- /.docs-toggles -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
