<%@ Control Language="C#" AutoEventWireup="true" CodeFile="UserMangement.ascx.cs" Inherits="Modules_ArticleAdmin_UserMangement_UserMangement" %>
<script type="text/javascript">
    var UserModuleID = '<%=UserModuleID %>';
    var PortalID = '<%=PortalID%>';
    var ApplicationName = '<%=ApplicationName%>';
    var CurrentTimeUtc = '<%=CurrentTimeUtc %>';
    var CreatedDate = '<%=CreatedDate %>';
    var AddedOn = '<%=AddedOn%>';
    var UserID = '<%=UserID %>';
    var StoreID = '<%=StoreID%>';
    var CustomerID = '<%=CustomerID%>';
    var PasswordFormat = '<%=PasswordFormat%>';
    $(function () {
        $(this).CallArticleConfig();  
    });
</script>         
 <h2 class="box-title">User Management</h2>
<div id="divChooseTab" style="display:none;">
  <ul class="tab-nav clearfix">
    <li id="userTab" class="sfDefault ">
      <label class="sfFormlabel">User</label>
    </li>
    <li id="chgPassTab" class="">
      <label class="sfFormlabel">Change Password</label>
    </li>
  </ul>
</div>
<!--user grid-->  
<div class="main-one-col " id="userGrid">
   <%-- <h2 class="box-title">User Management</h2>--%>
      <div class="sfButtonwrapper sfButtonwrapper--right mt-0">
            <a id="btnAdd" class="sfBtn smlbtn-primary icon-addnew">Add</a>
            <a class="sfBtn smlbtn-safe icon-selectall" id="selectAll">Select all</a>
            <a class="sfBtn smlbtn-danger icon-delete" id="selectedDelete">Delete</a>
			  <a id ="btnOpenFilter" class="sfBtn smlbtn-def filter-btn icon-filter">
                       Filter  
                    </a>
        </div>
    <div class="sfModulecontent clearfix">
 
  
               <%--For Filtration--%>
<div id="filterDiv" style="display:none;">			
			<div class="sfFormwrapper ">
						<div class="sfFieldset ">
							<span class="formKey textType">
								<span class="sfFormLabel">Username</span>
							</span>
							
							<span class="formValue ">
								<input type="text" class="sfInputbox" id="txtSearchUser">
							</span>
						</div>
						<div class="sfFieldset ">
									<span class="formKey textType selectKey">
										<span class="sfFormLabel">Roles</span>
									</span>
									<span class="formValue">
										<select class="sfListmenu " id="cmbType">											
											
										</select>
									</span>
						</div>
						<div class="sfFieldset">
							<span class="formKey textType selectKey">
								<span class="sfFormLabel">Date</span>
							</span>
							<div class="twoCol_inputdate ">
								<div class="control-wrap-datefields">
									
									<div class="custom-inputbox  datepicker-input-box">
                                        <input type="hidden" name="dateFormat" id="dateFormat" />
										<input type="text" class="filter_field" id="txtDateFrom" placeholder="From">
                                          <label class="sfError" id="dateFromError"></label>
									</div>
								</div>
								<div class="control-wrap-datefields">
									
									 <div class="custom-inputbox datepicker-input-box">
										<input type="text" class="filter_field" id="txtDateTo" placeholder="To">
                                             <label class="sfError" id="dateToError"></label>
									</div>
								</div>
							</div>
							</div>	
						
        </div>
		<div class="sfButtonwrapper" style="margin-top:45px;">
							<a class="sfBtn smlbtn-primary icon-search" id="btnDateSearch">Search</a>
							<a class="sfBtn smlbtn-danger icon-refresh" id="btnReset">Reset</a>

						</div>
	
</div>
    <div class="data-views clearfix">
     
<div class="sfGridwrapper">   
<div class="titleandfilter ">
	<!--<h2>Drafts</h2>-->
	 <!--  <div class="dashboard-filter">
                    <span id ="btnOpenFilter" class="filter-btn icon-filter">
                        <label class="label-filter">Filter</label>
                    </span>

                 <span class="dashboard-sort">
                        <label class="label-sort">Sort by:</label>
                        <select class="selectpicker">
                            <option>All</option>
                            <option>Date</option>
                            <option>Most Viewed</option>

                        </select>
                    </span>     
    </div>-->
</div>    
       
			<div class="grid_header">
				<div class="grid_header--check"></div>
				<!--<div class="grid_header--sn">SN</div>-->
					<div class="grid_header--detail">Detail</div>
                   <div class="grid_header--status">Status</div>
				<div class="grid_header--action">Action</div>
			</div>
    <div id="userList">
             </div>

</div>
</div>
</div>
  <div class="sfPagination" id="userPagi">
      
        </div>
</div>
<div class="sfFormwrapper twoColForm clearfix" id="userAdd" style="display:none;margin-top:25px;">
<%--          <div class="box-heading">
        <h2 class="box-title">User Management</h2>
    </div>--%>
        <div class="sfFieldset ">
            <span class="formKey textType">
                <span class="sfFormLabel"><label id="lblUserName">Username</label></span>
            </span>
            <span class="formValue ">
                <input type="hidden" id="txtUserID" />
                <input type="text" id="txtUserName" class="sfInputbox">
                <label class="sfError" id="userNameError"></label>
            </span>
        </div>
        <div class="sfFieldset ">
            <span class="formKey textType">
                <span class="sfFormLabel">Email Address</span>
            </span>
            <span class="formValue ">
                <input type="text" id="txtEmail" class="sfInputbox">
                <label class="sfError" id="emailError"></label>
            </span>
        </div>
        <div class="sfFieldset ">
            <span class="formKey textType">
                <span class="sfFormLabel">First Name</span>
            </span>
            <span class="formValue ">
                <input type="text" id="txtFirstName" class="sfInputbox">
                <label class="sfError" id="firstNameError"></label>
            </span>
        </div>
        <div class="sfFieldset ">
            <span class="formKey textType">
                <span class="sfFormLabel">Last Name</span>
            </span>
            <span class="formValue ">
                <input type="text" id="txtLastName" class="sfInputbox">
                <label class="sfError" id="lastNameError"></label>
            </span>
        </div>
        <div class="sfFieldset ">
            <span class="formKey textType">
                <span class="sfFormLabel">
                    <label id="lblPassword">Password</label></span>
            </span>
            <span class="formValue ">
                <input type="hidden" id="hdnPassword" />
                <input type="password" id="txtPassword" class="sfInputbox password">
                <label class="sfError" id="passwordErrors"></label>
            </span>
        </div>
        <div class="sfFieldset ">
            <span class="formKey textType">
                <span class="sfFormLabel">
                    <label id="lblRetypePassword">Retype Password</label></span>
            </span>
            <span class="formValue ">
                <input type="password" class="sfInputbox password" id="txtRetypePassword">
                <label class="sfError" id="reTypePasswordErrors"></label>
            </span>
        </div>
		<div class="sfFieldset rolesvalue">
        <ul class="select-shift clearfix">
            <li>
            <span class="formKey textType">
                <span class="sfFormLabel" id="unselectedRoles">Select Roles</span>
            </span>
            <span class="formValue ">
                <select size="10" class="sfListmenu multipleselect" multiple="multiple" id="ddlRoles">               
                </select>
                   <label class="sfError" id="rolesError"></label>
                </span>
                </li>
             <li class="shift-arrows">
                  <div class="sfFieldset" id="arrowsIcon">
                                <label class="icon-arrow-slimdouble-e sfBtn" id="lblAddAllRole"></label>
                                <label class="icon-arrow-slim-e sfBtn" id ="lblAddRole"></label>
                                <label class="icon-arrow-slim-w sfBtn" id="lblRemoveRole"></label>
                                <label class=" icon-arrow-slimdouble-w sfBtn" id="lblRemoveAllRole"></label>
                            </div>
                 </li>
             <li>
                  <span class="formKey textType">
                <span class="sfFormLabel" id="selectedRoles">Selected Roles</span>
            </span>
                  <span class="formValue ">
                 <select size="10" class="sfListmenu multipleselect" multiple="multiple" id="ddlRolesSelected">
                 </select>
                      </span>
                  </li>  
        </ul> 
	</div>		
        <div class="sfButtonwrapper">
            <a class="sfBtn smlbtn-succ icon-save" id="btnUserSave">Save</a>
            <a class="sfBtn smlbtn-danger icon-cross" id="btnUserCancel">Cancel</a>
        </div>
    </div>
<div id="passwordChange" class="sfFormwrapper twoColForm" style="display:none;margin-top:25px;">
         <div class="sfFieldset ">
            <span class="formKey textType">
                <span class="sfFormLabel">
                    <label id="lblNewPassword">New Password: </label></span>
            </span>
            <span class="formValue">
                <input type="hidden" id="hdnNewPassword" />
                <input type="password" id="txtNewPassword" class="sfInputbox password">               
                <label class="sfError" id="newPasswordErrors"></label>
            </span>
        </div>
        <div class="sfFieldset ">
            <span class="formKey textType">
                <span class="sfFormLabel">
                    <label id="lblRetypeNewPassword">Retype New Password: </label></span>
            </span>
            <span class="formValue ">
                <input type="password" class="sfInputbox password" id="txtRetypeNewPassword">
                <label class="sfError" id="reTypeNewPasswordErrors"></label>
            </span>
        </div>
          <div class="sfButtonwrapper">
            <a class="sfBtn smlbtn-succ icon-save" id="btnPassUpdate">Update</a>
              <a class="sfBtn smlbtn-default  icon-refresh" id="btnResetPass">Reset</a>
            <a class="sfBtn smlbtn-danger icon-cross" id="btnPassCancel">Cancel</a>
        </div>
    </div>