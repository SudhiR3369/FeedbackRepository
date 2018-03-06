<%@ Control Language="C#" AutoEventWireup="true" CodeFile="NewsLetterSetting.ascx.cs"
    Inherits="Modules_NewsLetter_NewsLetterSetting" %>
    <script type="text/javascript">
        var UserModuleID = '<%=UserModuleID %>';
        var PortalID = '<%=PortalID %>';
        var NewsLetterPath = '<%=ModulePath %>';
        var UserName = '<%=UserName %>';
        
    </script>
<div id="divSetting" class="sfFormwrapper">
    
        <div class="sfFieldset">
            <div class="formKey">
                <span class="sfFormlabel">
                    Module Header</span>
            </div>
         
            <div class="formValue">
                <input id="txtNewsLetterHeader" name="Header" type="text" class="sfInputbox" />
            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey">
                <span class="sfFormlabel">
                    Module Description</span>
            </div>
            
            <div class="formValue">
                <input type="text" name="Description" id="txtNLDescription" class="sfInputbox" />
            </div>
        </div>
        <div class="sfFieldset">
        <div class="formKey"><span class="sfFormlabel">UnSubscribe Page Name</span></div>
   
        <div class="formValue"><input type="text" name="pagename" id="txtPageName" class="sfInputbox" /></div>
        </div>
        <div class="sfFieldset" >
            <div class="formKey">
                 <input value="ByMobile" name="ByMobile" type="checkbox" id="chkByMobile" />
                <label for="chkByMobile">
                    Subscription by mobile also</label>
            </div>
           
            
        </div>
  
    <div class="sfButtonwrapper sftype1 ">
        <label id="btnSaveNLSetting" class="sfSave smlbtn-succ sfBtn icon-save">
            Save</label>
    </div>
</div>
