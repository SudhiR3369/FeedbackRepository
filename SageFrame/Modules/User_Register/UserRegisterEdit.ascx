<%@ Control Language="C#" AutoEventWireup="true" CodeFile="UserRegisterEdit.ascx.cs" Inherits="Modules_User_Register_UserRegisterEdit" %>

<script type="text/javascript">
    $(function () {
        $(this).UserEdit(
            {
                UserModuleId: '<%=UserModuleId%>',
                CultureCode: '<%=GetCurrentCultureName%>>'
            });
    });
</script>


<div id="divUsersList" class="sfRegistrationList">
   
        <div>
            <h3>Registered Users </h3>
            <button id="btnAddUser" type="button" class="sfBtn icon-addnew">Add New User</button>
        </div>
        <div id="divRegistrationListTableWrap" class="sfGridwrapper">
            <table>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Name</th>
                        <th>Email</th>
                        <!--<th>Password</th>-->
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="tblBdyUsersList">

                </tbody>
            </table>
        </div>

</div>

<div id="divRegistrationForm" style="display: none;" class="sfFromWrapper" >
     
   <div>
     <h3 id="headingRegistrationForm">ADD NEW USERS</h3>

    <table>
        <tr>
            <td>
                <label class="sfFormlabel">Name</label>
            </td>
            <td>
                <input type="text" id="txtName" name="Name" class="sfInputbox" /></td>
        </tr>
        <tr>
            <td>
                <label class="sfFormlabel">EmailID </label>
            </td>
            <td>
                <input type="Email" id="txtEmail" name="EmailId" class="sfInputbox" /></td>
        </tr>
        <tr>
            <td>
                <label class="sfFormlabel">Password </label>
            </td>
            <td>
                <input type="password" id="txtPass"  name="Password" class="sfInputbox" /></td>
        </tr>
        <tr>
            <td>
                <label class="sfFormlabel">Confirm Password </label>
            </td>
            <td>
                <input type="password" id="txtPass2"  name="Password2" class="sfInputbox" /></td>
        </tr>

        <tr>
            <td></td>
            <td>
                <button id="btnSave" type="button" class="sfBtn icon-save">Save</button>
                <button id="btnCancelUser" type="button" class="sfBtn icon-close">Cancel</button>
            </td>
        </tr>
    </table>
       </div>
           
</div>

