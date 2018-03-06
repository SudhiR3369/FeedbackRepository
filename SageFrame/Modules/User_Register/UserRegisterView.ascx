<%@ Control Language="C#" AutoEventWireup="true" CodeFile="UserRegisterView.ascx.cs" Inherits="Modules_User_Register_UserRegisterView" %>

<%--<script>
    $(document).ready(function () {
          $(function () {
        var fun = $(this).User({
            UserModuleId:<%=UserModuleId%>,
            
        })
    });
    });
  
</script>--%>
<div>
    <h3>This is a Test View Pagebvdf brtfbrtgbrtfgbgbfgbfgbfgbfgbfgbfgbfgbfgbfgbfgbgf
    </h3>
    <h1>Hello</h1>
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

<div>
    <asp:Literal ID="ltrUser" runat="server"></asp:Literal>
</div>

</div>
