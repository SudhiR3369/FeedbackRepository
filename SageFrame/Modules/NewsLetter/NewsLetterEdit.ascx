<%@ Control Language="C#" AutoEventWireup="true" CodeFile="NewsLetterEdit.ascx.cs"
    Inherits="Modules_NewsLetter_NewsLetterEdit" %>
<script type="text/javascript">
    var UserModuleID = '<%=UserModuleID %>';
    var PortalID = '<%=PortalID %>';
    var NewsLetterPath = '<%=ModulePath %>';
    var UserName = '<%=UserName %>';
    var CultureName = '<%=CultureName %>';
    var resolvedURL = '<%=resolvedURL %>';
    var PassURL = '<%=PassURL %>';
    var PageExtension = '<%=PageExtension %>';
        
</script>
<div class="sfAdminPanel">
    <%--<div class="main">
        <a href="#" class="cssClassActive" name="EmailSubsciption" id="aEmail">Email Subsciption</a>
        <%--<a href="#" id="aMobile" name="MobileSubscription">Mobile Subscription</a>
    </div>--%>
    <div id="Email">
        <div id="divNlEmailForm" class="sfFormwrapper">
           
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">
                            Message Template Type</span>
                    </div>
                   
                    <div class="formValue">
                        <select id="ddlMessageTemlate">
                        </select>
                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">
                            To</span>
                    </div>
                    
                    <div class="formValue">
                        <input type="checkbox" id="chkIsAllSubscriber" />
                         <label id="btnSubsciberAdd" class="sfAdd" for="chkIsAllSubscriber">
                                Select Subscriber</label>
                        <div id="trEmailScriber">
                        <div class="sfButtonwrapper sftype1">
                           
                        </div>
                        <textarea id="txtEmailList" name="emaillist" class="sfInputbox" rows="4" cols="40"></textarea>
                    </div>
                    </div>                    
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">
                            Subject</span>
                    </div>
                    
                    <div class="formValue">
                        <textarea id="txtSubject" name="subject" rows="2" cols="20" class="sfInputbox"></textarea>
                    </div>
                    <div style="display:none;">
                        <div class="sfButtonwrapper sftype1">
                            <label id="btnAddSubjectToken" class="sfAdd">
                                Add Subject Token</label>
                        </div>
                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <span class="sfFormlabel">
                            Message</span>
                    </div>
                    
                    <div class="">                     
                         <textarea id="txtBodyMsg" rows="5" cols="20" name="bodymsg" style="height: 450px; width:800px;"></textarea>
                    </div>
                    
                </div>            
           
            <div class="sfEmailsendDiv ">
                <a href="#" id="btnSendEmail" class="sfBtn smlbtn-succ icon-send">Send</a>
            </div>
        </div>
        <div id="divMessageListing" >
            <div id="MessageListing" class="sfGridwrapper">
            </div>
        </div>
    </div>
    <div id="PhoneMessage">
        <table>
            <tr>
                <td>
                    <label class="sfFormlabel">
                        Message</label>
                </td>
                <td>
                    :
                </td>
                <td>
                    <textarea id="txtMessage" cols="50" rows="5"></textarea>
                </td>
            </tr>
        </table>
          <div class="sfSmssendDiv">
                <a href="#" id="btnSendSms" class="sfsmsSend">Send</a>
            </div>
    </div>
</div>
<div id="TokenList" style="display: none;">
    <select id="lstMessageToken" multiple="multiple">
    </select>
    <div class="sfButtonwrapper">
        <label id="btnAddToken" class="sfBtn">
            Add
        </label>
    </div>
</div>
<div id="divMessageBodyTokenList" style="display: none;">
    <select id="lstMesageBodyToken" multiple="multiple">
    </select>
    <div class="sfButtonwrapper">
        <label id="btnAddBodyToken" class="sfBtn">
            Add
        </label>
    </div>
</div>
<div id="divSubscriberList" style="display:none;">


</div>
