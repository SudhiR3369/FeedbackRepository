<%@ Control Language="C#" AutoEventWireup="true" CodeFile="RatingSettings.ascx.cs" Inherits="Modules_PageRating_RatingSettings" %>
<script type="text/javascript">
    $(function () {
        $(this).RatingSettingViewManage({
            userModuleID:'<%=userModuleID%>'
        });
    });
</script>
<div class="divRatingSetting">
    <h2>Rating Setting</h2>
    <div class="divSettingWrap">
        <div class="form-warp">
            <label class="sfFormLable">Rating Title :</label>
            <input type="text" id="txtRatingTitle" name="txtRatingTitle" />
        </div>
        <div class="form-warp">
            <label class="sfFormLable">Rating Point :</label>
            <input type="text" id="txtRatingPoint" name="txtRatingPoint" />
        </div>        
        <div class="form-warp">
            <label class="sfFormLable">Enable Rating Edit</label>
            <input type="checkbox" id="chkEnableRatingEdit" />
        </div>
    </div>
    <div class="sfButtonwrapper sftype1">
        <label id="btnSaveRatingSetting" class="icon-save sfBtn">
            Save</label>
    </div>
</div>