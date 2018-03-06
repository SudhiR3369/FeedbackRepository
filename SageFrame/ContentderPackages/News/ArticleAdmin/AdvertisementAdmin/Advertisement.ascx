<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Advertisement.ascx.cs" Inherits="Modules_ArticleAdmin_AdvertisementAdmin_Advertisement" %>
<script type="text/javascript">
    var UserModuleID = '<%=UserModuleID %>';
    var resolvedUrl = '<%=resolvedUrl%>';
    var SiteID = '<%=SiteID %>';
    $(function () {
        $(this).CallAdvertisementConfig();
    });
</script> 
<div id="MainGrid" style="display: block;">
    <h2 class="box-title">Advertisement Management</h2>
    <div class="sfButtonwrapper sfButtonwrapper--right mt-0">
        <a class="sfBtn smlbtn-primary icon-addnew" id="btnAddNewAdvertisement">Add</a>
        <a class="sfBtn smlbtn-safe icon-selectall" id="btnSelectAll">Select all</a>
        <a class="sfBtn smlbtn-danger icon-delete" id="btnSelectDelete">Delete</a>
        <a id="btnOpenFilter" class="sfBtn smlbtn-filter filter-btn icon-filter">Filter
        </a>
    </div>
    <div id="filterDiv" style="display:none;">
        <div class="sfFormwrapper sfFormwrapper--check ">
            <div class="sfFieldset ">
                <span class="formKey textType">
                    <span class="sfFormLabel">Brand</span>
                </span>
                <span class="formValue ">
                    <select class="sfListmenu " id="ddlSearch">
                        <option value="0">Select Brand</option>
                    </select>
                </span>
            </div>

            <div class="sfFieldset ">
                <span class="formKey textType">
                    <span class="sfFormLabel">Category </span>
                </span>
                <span class="formValue " id="CategoryListFilter"></span>
            </div>

            <div class="sfFieldset">
				 <span class="formKey textType selectKey">
					<span class="sfFormLabel">From</span>
				</span>
				<div class="twoCol_inputdate">
					<div class="control-wrap-datefields float-none">
					   
						<div class="custom-inputbox  datepicker-input-box">
							<input type="hidden" name="dateFormat" id="dateFormat" />
							<input type="text" class="filter_field" id="txtDateFrom">
							<label class="sfError" id="dateFromError"></label>
						</div>
					</div>
					<div class="control-wrap-datefields float-none">
						
						<div class="custom-inputbox datepicker-input-box">
							<input type="text" class="filter_field" id="txtDateTo">
							<label class="sfError" id="dateToError"></label>
						</div>
					</div>
				</div>

            </div>

        </div>
        <div class="sfButtonwrapper ">
            <a class="sfBtn smlbtn-primary icon-search" id="btnDateSearch">Search</a>
            <a class="sfBtn smlbtn-danger icon-refresh" id="btnReset">Reset</a>

        </div>

    </div>


    <div class="data-views clearfix">
        <div class="sfGridwrapper">
            <div class="titleandfilter ">
            </div>  
            <div class="grid_header">
                <div class="grid_header--check"></div>
                <div class="grid_header--detail">Detail</div>
                 <div class="grid_header--image">Image</div>
                <div class="grid_header--action">Action</div>
            </div>
            <div id="adList">
            </div>
        </div>
        <div class="sfPagination" id="adPagi">
      
        </div>
    </div>
</div>
<div id="MainForm" style="display: none;">
    <div class="box-heading">
        <h2 class="box-title">Advertisement Management</h2>
    </div>
    <div class="two-col-form">
        <div class="main-left sfCol_70">
            <div class="sfFormwrapper  sfFormwrapper--custom">
                <div class="sfFieldset">
                    <span class="formKey textType selectKey">
                        <span class="sfFormLabel">Brand</span>
                    </span>
                    <span class="formValue ">
                        <select class="sfListmenu " id="ddlBrand">
                            <option value="0">Select Brand</option>
                        </select>
                        <label class="sfError" id="brandError"></label>
                    </span>
                </div>
                <div class="multipleadsizes">
					<div class="wrapads">
						<div class="sfFieldset">
							<span class="formKey textType selectKey">
								<span class="sfFormLabel">Web View</span>
							</span>
							<span class="formValue ">
								<select class="sfListmenu " id="ddlSize">
									<option value="0" data-mob="Select Mobile Size">Select Size</option>								
								</select>
								<label class="sfError" id="sizeError"></label>

							</span>
							<div class=" dropzone">
								<div class=" dropzone--media">
									<div class="dropzone_mediaupload">

										<div class="formValue">
											<span class="fileUploader " id="fileUploaderDef"></span>
										</div>
									</div>

								</div>
							</div>
						</div>
						<div class="sfFieldset">
							<span class="formKey textType selectKey">
								<span class="sfFormLabel">Mobile View</span>
							</span>
							<span class="formValue ">
								<select class="sfListmenu " id="ddlMobSize">
									<option value="0">Select Mobile Size</option>					
								</select>
								<label class="sfError" id="mobsizeError"></label>
							</span>

							<div class=" dropzone">
								<div class=" dropzone--media">
									<div class="dropzone_mediaupload">

										<div class="formValue">
											<span class="fileUploader " id="fileUploaderMob"></span>
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
                </div>
                <div class="multipleadsizes">
                    
                </div>

                <div class="sfFieldset float-left">
                    <div class="xsmall-wrap">
                        <div class="xsmall-group">
                            <span class="formKey textType">
                                <span class="sfFormLabel">Start Date</span>
                            </span>

                            <div class="formValue ">
                                <div class="custom-inputbox datepicker-input-box">
                                    <input class="filter_field " id="txtStartDate" type="text" readonly="readonly">
                                </div>
                            </div>
                            <label class="sfError" id="startDateError"></label>
                        </div>
                        <div class="xsmall-group">
							
                            <span class="formKey textType selectKey">
									<input id="rdbDuration" value="normal" name="rdbSelect" class="layoutType" type="radio">
                                    <label for="rdbDuration"></label>
                                <span class="sfFormLabel">Duration</span>
                            </span>

                            <span class="formValue">
                                <span class="sfRadiobutton sfRadioHidden checkareas duration">
                                    
                                    <select class="sfListmenu " id="ddlDuration" name="ddlDuration">
                                        <option value="1">Select Year</option>
                                        <option value="2">1 Year</option>
                                        <option value="3">2 Years</option>
                                        <option value="4">3 Years</option>
                                        <option value="5">4 Years</option>
                                        <option value="6">5 Years</option>
                                    </select>
                                    <select class="sfListmenu " id="ddlDuration2" name="ddlDuration">
                                        <option value="1">Select Month</option>
                                        <option value="2">1 Month</option>
                                        <option value="3">2 Months</option>
                                        <option value="4">3 Months</option>
                                        <option value="5">4 Months</option>
                                        <option value="6">5 Months</option>
                                        <option value="7">6 Months</option>
                                        <option value="8">7 Months</option>
                                        <option value="9">8 Months</option>
                                        <option value="10">9 Months</option>
                                        <option value="11">10 Months</option>
                                        <option value="12">11 Months</option>
                                    </select>
                                    <select class="sfListmenu " id="ddlDuration4" name="ddlDuration">
                                        <option value="1">Select Days</option>
                                        <option value="2">1 Day</option>
                                        <option value="3">2 Days</option>
                                        <option value="4">3 Days</option>
                                        <option value="5">4 Days</option>
                                        <option value="6">5 Days</option>
                                        <option value="7">6 Days</option>
                                        <option value="8">7 Days</option>
                                        <option value="9">8 Days</option>
                                        <option value="10">9 Days</option>
                                        <option value="11">10 Days</option>
                                        <option value="12">11 Day</option>
                                        <option value="13">12 Days</option>
                                        <option value="14">13 Days</option>
                                        <option value="15">14 Days</option>
                                        <option value="16">15 Days</option>
                                        <option value="17">16 Days</option>
                                        <option value="18">17 Days</option>
                                        <option value="19">18 Days</option>
                                        <option value="20">19 Days</option>
                                        <option value="21">20 Days</option>
                                        <option value="22">21 Day</option>
                                        <option value="23">22 Days</option>
                                        <option value="24">23 Days</option>
                                        <option value="25">24 Days</option>
                                        <option value="26">25 Days</option>
                                        <option value="27">26 Days</option>
                                        <option value="28">27 Days</option>
                                        <option value="29">28 Days</option>
                                        <option value="30">29 Days</option>
                                    </select>
                                </span>
                            </span>
                            <label class="sfError" id="durationError"></label>
                        </div>
                        <div class="xsmall-group">
                            <span class="formKey textType">
							<input id="rdbEndDate" value="normal" name="rdbSelect" class="layoutType" type="radio">
                                    <label for="rdbEndDate"></label>
                                <span class="sfFormLabel">End Date</span>
                            </span>
                            <div class="formValue">
                                <div class="sfRadiobutton sfRadioHidden checkareas">

                                    
                                    <div class="custom-inputbox datepicker-input-box">
                                        <input class="filter_field" id="txtEndDate" type="text" readonly="readonly">
                                    </div>
                                </div>

                            </div>
                            <label class="sfError" id="endDateError"></label>
                        </div>

                        <div class="xsmall-group">
                            <div class="sfFieldset cl-both">
                                <span class="formValue">
                                    <span class="sfRadiobutton sfRadioHidden">
                                        <input id="rdbNoExpiry" value="normal" name="rdbSelect" class="layoutType" type="radio">
                                        <label for="rdbNoExpiry"></label>
										<span class="sfFormLabel">No Expiry Date</span>
                                    </span>

                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="sfFieldset clearfix" style="clear: both">
                    <span class="formKey textType">
                        <span class="sfFormLabel">
                            <label>Detail Link</label></span>
                    </span>
                    <span class="formValue ">
                        <input id="txtAdvId" type="hidden">
                        <input class="sfInputbox" id="txtLink" type="text">
                        <label class="sfError" id="linkError"></label>
                    </span>
                </div>
                <div class="sfFieldset ">
                    <span class="formKey">
                        <span class="sfFormLabel">Remarks</span>
                    </span>
                    <span class="formValue ">
                        <textarea class="sfInputbox" id="txtRemarks"></textarea>
                        <label class="sfError" id="remarksError"></label>
                    </span>
                </div>
            </div>
        </div>
        <div class="main-right sfCol_30">
            <div class="sfFormwrapper sfFormwrapper--check">
                <div class="sfFieldset ">
                    <span class="formKey textType">
                        <span class="sfFormLabel">Category</span>
                    </span>
                    <span class="formValue " id="CategoryList"></span>
                </div>
            </div>
        </div>
        <div class="sfButtonwrapper">
            <a class="sfBtn smlbtn-succ icon-save" id="btnSave">Save</a>
            <a class="sfBtn smlbtn-danger icon-cross" id="btnCancel">Cancel</a>
        </div>
    </div>
</div>
<div id="cropperDiv" class="PopupContent--cropper" style="display: none;">
     <div class="crop-pop-model">
        <div class="  popupfullpage_model_header">
           <span class="header_title"> Create Advertisement Picture</span>
<span class="f-right fullpage-close-model" id="closeCropImageDef"><i class="fa fa-times" aria-hidden="true"></i></span>
        </div>
           
    <div id='croppingImage'>
            <div class="image-editor">
                <div class="cropit-preview"></div>
                <div class="crop--resizer">
                    <div class="image-size-label">
                        Resize image
                    </div>
                    <span class="min" title="Zoom out"></span>
                    <input type="range" class="cropit-image-zoom-input">
                      <span class="max" title="Zoom In"></span>
                </div>
            </div>   
        </div>
        <div class="cropper--footer">
            <div class="cropper--tools">
            </div>
            <div class="sfButtonwrapper ">
                <a class="sfBtn smlbtn-succ icon-save" id="btnSaveCropper">Save</a>
                <a class="sfBtn smlbtn-danger icon-cross" id="btncloseCropper">Close</a>
            </div>

        </div>
    </div>
</div>
<div id="cropperDivMob" class="PopupContent--cropper" style="display: none;">
     <div class="crop-pop-model">
        <div class="  popupfullpage_model_header">
           <span class="header_title"> Create Advertisement Picture</span>
  <span class="f-right fullpage-close-model" id="closeCropImageMob"><i class="fa fa-times" aria-hidden="true"></i></span>
      </div>            
        <div id='croppingImageMob'>
            <div class="image-editorMob">
                <div class="cropit-preview"></div>
                <div class="crop--resizer">
                    <div class="image-size-label">
                        Resize image
                    </div>
                        <span class="min"></span>
                    <input type="range" class="cropit-image-zoom-input">
                      <span class="max"></span>
                </div>
            </div>
        </div>
        <div class="cropper--footer">
            <div class="cropper--tools">
            </div>
            <div class="sfButtonwrapper ">
                <a class="sfBtn smlbtn-succ icon-save" id="btnSaveCropperMob">Save</a>
                <a class="sfBtn smlbtn-danger icon-cross" id="btncloseCropperMob">Close</a>
            </div>

        </div>
    </div>
</div>
<div id="prevDefModal" class="PopupContent--preview" style="display: none">
     <span class="close-model" id="closePreviewImageDef"><i class="fa fa-times" aria-hidden="true"></i></span>
               <div class="adsPreview">
                   Image Size:
                    
                         <label id="lblDefImgSize"></label>
                   
                </div>
    <div class="crop-pop-model" id="prevDefPopModal">
        <img src="#" id="defPrevImgs">       
    </div>
</div>
<div id="prevMobModal" class="PopupContent--preview" style="display: none">
     <span class="close-model" id="closePreviewImageMob"><i class="fa fa-times" aria-hidden="true"></i></span>
      <div class="adsPreview">
                  Image Size
                         <label id="lblMobImgSize"></label>
                   
                </div>
    <div class="crop-pop-model" id="prevMobPopModal">
        <img src="#" id="mobPrevImgs">       
    </div>
</div>
