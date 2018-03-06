<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SocialContactLinkEdit.ascx.cs" Inherits="Modules_SocialLink_SocialContactLinkEdit" %>
<script type="text/javascript">
    $(function () {
        $(this).SocialLinkEdit(
            {
                UserModuleID: '<%=userModuleID%>',
            });
    });
</script>


<div id="divFromWrapper" style="display: none;" class="sfFromWrapper">
    
        <div class="sfFieldset">
            <div class="formKey">
                <span class="sfFormlabel">Title</span>

            </div>
            <div class="formValue">
                <input type="text" id="txtTitle" name="LinkTitle" class="sfInputbox" />

            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey">
                <span class="sfFormlabel">URL*</span></div>
            <div class="formValue">
                <input type="text" id="txtUrl" name="linkUrl"  class="sfInputbox" /></div>
        </div>
        <div class="sfFieldset">
            
            <div class="formKey ">
                <input type="text" id="hdnIconClass" name="HiddenIconClass" style="width: 0px; height: 0px; opacity: 0" /></div>
        </div>
        <div class="sfFieldset">
            <div class="formKey">
                <span class="sfFormlabel">Icon*</span>

            </div>
            <div class="formValue">
                <div id="divServicesIconList" class="SevicesIconList">

                    <a class="iconList "><i class="fa fa-facebook" aria-hidden="true"></i>facebook</a>
                    <a class="iconList"><i class="fa fa-google-plus" aria-hidden="true"></i>google-plus</a>
                    <a class="iconList"><i class="fa fa-twitter" aria-hidden="true"></i>twitter</a>
                    <a class="iconList"><i class="fa fa-instagram" aria-hidden="true"></i>instagram</a>
                    <a class="iconList"><i class="fa fa-linkedin" aria-hidden="true"></i>linkedin</a>

                    <a class="iconList"><i class="fa fa-gitlab" aria-hidden="true"></i>gitlab</a>
                    <a class="iconList"><i class="fa fa-github" aria-hidden="true"></i>github</a>
                    <a class="iconList"><i class="fa fa-flickr" aria-hidden="true"></i>flickr</a>
                    <a class="iconList"><i class="fa fa-youtube" aria-hidden="true"></i>youtube</a>
                    <a class="iconList"><i class="fa fa-yahoo" aria-hidden="true"></i>yahoo</a>
                    <a class="iconList"><i class="fa fa-yelp" aria-hidden="true"></i>yelp</a>

                    <a class="iconList"><i class="fa fa-vine" aria-hidden="true"></i>vine</a>
                    <a class="iconList"><i class="fa fa-vimeo" aria-hidden="true"></i>vimeo</a>
                    <a class="iconList"><i class="fa fa-tumblr" aria-hidden="true"></i>tumblr</a>
                    <a class="iconList"><i class="fa fa-tripadvisor" aria-hidden="true"></i>tripadvisor</a>
                    <a class="iconList"><i class="fa fa-stumbleupon" aria-hidden="true"></i>stumbleupon</a>
                    <a class="iconList"><i class="fa fa-stack-overflow" aria-hidden="true"></i>stack-overflow</a>
                    <a class="iconList"><i class="fa fa-soundcloud" aria-hidden="true"></i>soundcloud</a>
                    <a class="iconList"><i class="fa fa-slideshare" aria-hidden="true"></i>slideshare</a>

                    <a class="iconList"><i class="fa fa-skyatlas" aria-hidden="true"></i>skyatlas</a>
                    <a class="iconList"><i class="fa fa-skype" aria-hidden="true"></i>skype</a>
                    <a class="iconList"><i class="fa fa-cloud" aria-hidden="true"></i>cloud</a>
                    <a class="iconList"><i class="fa fa-slack" aria-hidden="true"></i>slack</a>
                    <a class="iconList"><i class="fa fa-stack-exchange" aria-hidden="true"></i>stack-exchange</a>
                    <a class="iconList"><i class="fa fa-skyatlas" aria-hidden="true"></i>skyatlas</a>
                    <a class="iconList"><i class="fa fa-share-alt" aria-hidden="true"></i>share-alt</a>
                    <a class="iconList"><i class="fa fa-reddit-alien" aria-hidden="true"></i>reddit-alien</a>
                    <a class="iconList"><i class="fa fa-simplybuilt" aria-hidden="true"></i>simplybuilt</a>
                    <a class="iconList"><i class="fa fa-pinterest" aria-hidden="true"></i>pinterest</a>
                    <a class="iconList"><i class="fa fa-paypal" aria-hidden="true"></i>paypal</a>

                    <a class="iconList"><i class="fa fa-mixcloud" aria-hidden="true"></i>mixcloud</a>
                    <a class="iconList"><i class="fa fa-jsfiddle" aria-hidden="true"></i>jsfiddle</a>

                    <a class="iconList"><i class="fa fa-glide" aria-hidden="true"></i>glide</a>

                    <a class="iconList"><i class="fa fa-foursquare" aria-hidden="true"></i>foursquare</a>




                    <a class="iconList"><i class="fa fa-dribbble" aria-hidden="true"></i>dribbble</a>
                    <a class="iconList"><i class="fa fa-digg" aria-hidden="true"></i>digg</a>
                    <a class="iconList"><i class="fa fa-delicious" aria-hidden="true"></i>delicious</a>
                    <a class="iconList"><i class="fa fa-dropbox" aria-hidden="true"></i>dropbox</a>
                    <a class="iconList"><i class="fa fa-behance" aria-hidden="true"></i>behance</a>
                    <a class="iconList"><i class="fa fa-500px" aria-hidden="true"></i>500px</a>
                    <a class="iconList"><i class="fa fa-gg" aria-hidden="true"></i>gg</a>

                </div>
            </div>
        </div>

     
            <div class="sfButtonwrapper">
                <button id="btnSave" class="sfBtn icon-save smlbtn-succ">Save</button>
                <button id="BtnCancel" class="sfBtn icon-close smlbtn-danger">Cancel</button>
            </div>
       
   

</div>
<div id="divTblWrap">
    <button id="btnAddNewLink" class="icon-addnew sfBtn smlbtn-primary">Add</button>
    <div class="sfGridwrapper">
        <table id="tblSocialLinks">
        </table>
    </div>
</div>

