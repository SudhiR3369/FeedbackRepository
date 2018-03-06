<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ToolboxItems.ascx.cs" Inherits="Modules_Admin_MessageManagement_SampleTemplate_ToolboxItems" %>
<div id="tempSampleList" class="templateTollbox">
    <h3>Template Toolbox</h3>
    <%-- Add More component in same pattern and add your markup in MsgCmpArray 
                            in MessageTemp.js(Note: array index in JS and data-postion component html  
                            shoud be same)--%>
    <div class="componentContainer">
        <h4>Email Samples</h4>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="MailSample1" data-content="Sample" draggable="true">
            <span>HTML Email Template </span>
        </div>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="MailSample2" data-content="Sample" draggable="true">
            <span>Newsletter Template </span>
        </div>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="MailSample3" data-content="Sample" draggable="true">
            <span>Corporate Email Template</span>
        </div>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="MailSample4" data-content="Sample" draggable="true">
            <span>Two-column Template</span>
        </div>
        <h4>Content</h4>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="AdminLogo" data-content="Sample" draggable="true">
            <span>Logo</span>
        </div>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="Paragraph" data-content="Sample" draggable="true">
            <span>Paragraph</span>
        </div>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="Salutations" data-content="Sample" draggable="true">
            <span>Salutations</span>
        </div>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="Endingline" data-content="Sample" draggable="true">
            <span>Ending Line</span>
        </div>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="emailDisclaimer" data-content="Sample" draggable="true">
            <span>Email Disclaimer</span>
        </div>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="LinkButton" data-content="component" draggable="true">
            <span>Link Button</span>
        </div>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="LinkContent" data-content="component" draggable="true">
            <span>Link</span>
        </div>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="ImagePopUp" data-content="component" draggable="true">
            <span>Image</span>
        </div>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="Address" data-content="sample" draggable="true">
            <span>Address Sample</span>
        </div>
        <h4>Tokens</h4>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="UserName" data-content="component" draggable="true">
            <span>UserName</span>
        </div>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="UserFName" data-content="component" draggable="true">
            <span>User First Name</span>
        </div>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="UserLName" data-content="component" draggable="true">
            <span>User Last Name</span>
        </div>
        <div class="component" title="Drag and Drop in to Editor Text Area" data-dropid="UserEmail" data-content="component" draggable="true">
            <span>User Email</span>
        </div>
    </div>
</div>
