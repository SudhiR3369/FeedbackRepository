<%@ Control Language="C#" AutoEventWireup="true" CodeFile="RegistrationEdit.ascx.cs" Inherits="Modules_Registration_RegistrationEdit" %>

<script type="text/javascript">
    $(function () {
        $(this).RegistrationEdit(
            {
                UserModuleID: '<%=userModuleID%>',
                CultureCode: '<%=GetCurrentCultureName%>'
            });
    });
</script>


<%--Registered Users List--%>
<div id="divUsersList" class="sfRegistrationList">
   
        <div>
            <h3>Registered Users </h3>
            <button id="btnAddNewUsers" type="button" class="sfBtn icon-addnew">Add New</button>
        </div>
        <div id="divRegistrationListTableWrap" class="sfGridwrapper">
            <table>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>User Name</th>
                        <th>EmailID</th>
                        <th>Password</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="tblBdyUsersList">

                </tbody>
            </table>
        </div>

</div>




<%--Registration Form--%>
<div id="divRegistrationForm" style="display: none;" class="sfFromWrapper" >
     
   <div>
     <h3 id="headingRegistrationForm">ADD NEW USERS</h3>

    <table>
        <tr>
            <td>
                <label class="sfFormlabel">User Name </label>
            </td>
            <td>
                <input type="text" id="txtUserName" name="UserName" class="sfInputbox" /></td>
        </tr>
        <tr>
            <td>
                <label class="sfFormlabel">EmailID </label>
            </td>
            <td>
                <input type="text" id="txtEmailID" name="EmailID" class="sfInputbox" /></td>
        </tr>
        <tr>
            <td>
                <label typeof="password" class="sfFormlabel">Password </label>
            </td>
            <td>
                <input type="text" id="txtPassword"  name="Password" class="sfInputbox" /></td>
        </tr>

        <tr>
            <td></td>
            <td>
                <button id="btnSaveUser" type="button" class="sfBtn icon-save">Save</button>
                <button id="btnCancelUser" type="button" class="sfBtn icon-close">Cancel</button>
            </td>
        </tr>
    </table>
       </div>
           
</div>


























