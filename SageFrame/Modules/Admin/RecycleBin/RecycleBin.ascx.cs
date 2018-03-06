using SageFrame.RecycleBin.Entities;
using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.UI.WebControls;
using SageFrame.RecycleBin.Controller;
using System.Web.UI.HtmlControls;
using SageFrame.UserManagement;

public partial class Modules_Admin_RecycleBin_RecycleBin : BaseUserControl
{


    public string userModuleID = string.Empty;
    public string modulePath = string.Empty;
    public int portalID = 0;



    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            userModuleID = SageUserModuleID;
            portalID = GetPortalID;
            modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);

            IncludeCss("RecycleBin", "/Modules/Admin/RecycleBin/css/RecycleBin.css");
            IncludeJs("RecycleBin", "/Modules/Admin/RecycleBin/js/RecycleBin.js");


            try
            {
                BindDeletedRoles();
                BindDeletedUsers();
                BindDeletedPortals();
            }
            catch (Exception exc)
            {
                ProcessException(exc);
            }

        }



    }


    protected void imgEmptyRecycleBin_Click(object sender, EventArgs e)
    {
        RecycleEmptyController emptyRecycleBin = new RecycleEmptyController();
        bool isRecycleBinCleared = emptyRecycleBin.EmptyRecycleBin();

        ShowMessage("", GetSageMessage("RecycleBin", "RecycleBinEmptied"), "", SageMessageType.Success);
        BindDeletedPortals();
        BindDeletedRoles();
        BindDeletedUsers();
    }


    #region Roles

    protected void gdvRoles_RowDeleting(object sender, GridViewDeleteEventArgs e) { }

    protected void imgBtnRestoreSelectedRoles_Click(object sender, EventArgs e)
    {

        try
        {

            bool itemFound = false;
            for (int i = 0; i < gdvRoles.Rows.Count; i++)
            {
                HtmlInputCheckBox chkBoxItem = (HtmlInputCheckBox)gdvRoles.Rows[i].FindControl("chkBoxItemRoles");

                if (chkBoxItem.Checked == true)
                {
                    itemFound = true;
                    HiddenField hdnRoleID = (HiddenField)gdvRoles.Rows[i].FindControl("hdnRoleID");
                    string roleID = hdnRoleID.Value.Trim();
                    UndoRoleDelete(roleID);
                }
            }

            if (itemFound)
            {
                BindDeletedRoles();
                ShowMessage("", GetSageMessage("RecycleBin", "SelectedRolesAreRestoredSuccessfully"), "", SageMessageType.Success);
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }


    }


    protected void imgBtnDeleteSelectedRoles_Click(object sender, EventArgs e)
    {
        try
        {

            bool itemFound = false;
            for (int i = 0; i < gdvRoles.Rows.Count; i++)
            {
                HtmlInputCheckBox chkBoxItem = (HtmlInputCheckBox)gdvRoles.Rows[i].FindControl("chkBoxItemRoles");

                if (chkBoxItem.Checked == true)
                {
                    itemFound = true;
                    HiddenField hdnRoleID = (HiddenField)gdvRoles.Rows[i].FindControl("hdnRoleID");
                    HiddenField hdnRolePortal = (HiddenField)gdvRoles.Rows[i].FindControl("hdnRolePortalID");

                    string roleID = hdnRoleID.Value.Trim();
                    string portalID = hdnRolePortal.Value.Trim();

                    int portID = int.Parse(portalID);
                    DeleteRole(roleID, portID);
                }
            }

            if (itemFound)
            {
                BindDeletedRoles();
                ShowMessage("", GetSageMessage("RecycleBin", "SelectedRolesAreDeletedSuccessfully"), "", SageMessageType.Success);
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }




    protected void gdvRoles_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            HtmlInputCheckBox chkItem = (HtmlInputCheckBox)e.Row.FindControl("chkBoxItemRoles");
            chkItem.Attributes.Add("onclick", "javascript:Check(this,'cssCheckBoxHeader','" + gdvUser.ClientID +
                                   "','cssCheckBoxItem');");
        }
        else if (e.Row.RowType == DataControlRowType.Header)
        {
            HtmlInputCheckBox chkHeader = (HtmlInputCheckBox)e.Row.FindControl("chkBoxHeaderRoles");
            chkHeader.Attributes.Add("onclick", "javascript:SelectAllCheckboxesSpecific(this,'" + gdvUser.ClientID +
                                     "','cssCheckBoxItem');");
        }

    }
    protected void gdvRoles_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        try
        {
            string roleID = gdvRoles.DataKeys[int.Parse(e.CommandArgument.ToString())]["RoleID"].ToString();
            string roleName = gdvRoles.DataKeys[int.Parse(e.CommandArgument.ToString())]["RoleName"].ToString();
            string portID = gdvRoles.DataKeys[int.Parse(e.CommandArgument.ToString())]["PortalID"].ToString();

            int port_ID = int.Parse(portID);
            switch (e.CommandName.ToString())
            {
                case "Delete":
                    DeleteRole(roleID, port_ID);
                    ShowMessage(SageMessageTitle.Information.ToString(), GetSageMessage("RecycleBin", "RoleIsDeletedSuccessfully"), "", SageMessageType.Success);
                    break;

                case "Undo":
                    UndoRoleDelete(roleID);
                    ShowMessage(SageMessageTitle.Information.ToString(), GetSageMessage("RecycleBin", "RoleIsRestoredSuccessfully"), "", SageMessageType.Success);

                    break;
            }

            BindDeletedRoles();
            BindDeletedUsers();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private void DeleteRole(string roleID, int portID)
    {
        RecycleRolesController rolesController = new RecycleRolesController();
        Guid role = new Guid(roleID);
        rolesController.DeleteRole(role, portID);

    }

    private void UndoRoleDelete(string roleID)
    {
        RecycleRolesController rolesController = new RecycleRolesController();
        Guid role = new Guid(roleID);
        rolesController.RestorePortalRole(role);
    }



    #endregion

    #region  Users
    protected void gdvUser_RowCommand(object sender, GridViewCommandEventArgs e)
    {

        try
        {
            if (e != null && !string.IsNullOrEmpty(e.CommandName) && (e.CommandName == "Delete" || e.CommandName == "Undo"))
            {
                int rowIndex = int.Parse(e.CommandArgument.ToString());
                if (gdvUser.PageIndex > 0)
                {
                    rowIndex = int.Parse(e.CommandArgument.ToString()) - (gdvUser.PageSize * gdvUser.PageIndex);
                }

                string userName = gdvUser.DataKeys[rowIndex]["Username"].ToString();
                string userID = gdvUser.DataKeys[rowIndex]["UserId"].ToString();
                string portID = gdvUser.DataKeys[rowIndex]["PortalID"].ToString();

                int port_ID = int.Parse(portID);

                switch (e.CommandName.ToString())
                {
                    case "Delete":
                        DeleteUser(userID);
                        ShowMessage(SageMessageTitle.Information.ToString(), GetSageMessage("RecycleBin", "UserDeletedSuccessfully"), "", SageMessageType.Success);
                        break;

                    case "Undo":
                        UndoUserDelete(userName, port_ID);
                        ShowMessage(SageMessageTitle.Information.ToString(), GetSageMessage("RecycleBin", "UserRestoredSuccessfully"), "", SageMessageType.Success);
                        break;
                }

                BindDeletedUsers();
                BindDeletedRoles();
            }


        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }

    }

    protected void gdvUser_RowDeleting(object sender, GridViewDeleteEventArgs e) { }

    private bool DeleteUser(string userID)
    {
        RecycleUsersController userController = new RecycleUsersController();
        Guid userGUID = new Guid(userID);
        return userController.DeleteUser(userGUID);
    }

    private void UndoUserDelete(string userName, int portID)
    {
        RecycleUsersController userController = new RecycleUsersController();
        bool userRestored = userController.RestoreUser(userName, portID);
    }

    protected void gdvUser_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            HtmlInputCheckBox chkItem = (HtmlInputCheckBox)e.Row.FindControl("chkBoxItemUser");
            chkItem.Attributes.Add("onclick", "javascript:Check(this,'cssCheckBoxHeader','" + gdvUser.ClientID +
                                   "','cssCheckBoxItem');");
        }
        else if (e.Row.RowType == DataControlRowType.Header)
        {
            HtmlInputCheckBox chkHeader = (HtmlInputCheckBox)e.Row.FindControl("chkBoxHeaderUser");
            chkHeader.Attributes.Add("onclick", "javascript:SelectAllCheckboxesSpecific(this,'" + gdvUser.ClientID +
                                     "','cssCheckBoxItem');");
        }
    }

    protected void gdvUser_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        //gdvUser.PageIndex = e.NewPageIndex;
        //if (ViewState["FilteredUser"] != null)
        //{
        //    gdvUser.DataSource = ViewState["FilteredUser"];
        //}
        //else
        //{
        //    gdvUser.DataSource = ViewState["UserList"];
        //}
        //gdvUser.DataBind();

    }

    protected void imgBtnRestoreSelectedUsers_Click(object sender, EventArgs e)
    {
        try
        {


            bool itemFound = false;
            for (int i = 0; i < gdvUser.Rows.Count; i++)
            {
                HtmlInputCheckBox chkBoxItem = (HtmlInputCheckBox)gdvUser.Rows[i].FindControl("chkBoxItemUser");
                if (chkBoxItem.Checked == true)
                {
                    itemFound = true;
                    Label lnkUsername = (Label)gdvUser.Rows[i].FindControl("lnkUsernameUser");
                    HiddenField lnkPortalID = (HiddenField)gdvUser.Rows[i].FindControl("hndUserPortalID");
                    string userName = lnkUsername.Text.Trim();
                    string portalID = lnkPortalID.Value.Trim();

                    int portID = int.Parse(portalID);
                    UndoUserDelete(userName, portID);
                }
            }

            if (itemFound)
            {
                BindDeletedRoles();
                BindDeletedUsers();
                BindDeletedPortals();
                ShowMessage("", GetSageMessage("RecycleBin", "SelectedUsersAreRestoredSuccessfully"), "", SageMessageType.Success);
            }

        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    protected void imgBtnDeleteSelectedUsers_Click(object sender, EventArgs e)
    {
        try
        {
            bool itemFound = false;
            for (int i = 0; i < gdvUser.Rows.Count; i++)
            {
                HtmlInputCheckBox chkBoxItem = (HtmlInputCheckBox)gdvUser.Rows[i].FindControl("chkBoxItemUser");
                if (chkBoxItem.Checked == true)
                {
                    itemFound = true;
                    HiddenField hiddenField = (HiddenField)gdvUser.Rows[i].FindControl("hdnUserID");
                    string userID = hiddenField.Value.Trim();
                    DeleteUser(userID);
                }
            }

            if (itemFound)
            {
                BindDeletedUsers();
                BindDeletedRoles();
                ShowMessage("", GetSageMessage("RecycleBin", "SelectedUsersAreDeletedSuccessfully"), "", SageMessageType.Success);
            }

        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }




    #endregion


    #region Portals 
    protected void gdvPortal_RowCommand(object sender, GridViewCommandEventArgs e)
    {

        try
        {

            if (e != null && !string.IsNullOrEmpty(e.CommandName) && (e.CommandName == "Delete" || e.CommandName == "Undo"))
            {
                int rowIndex = Int32.Parse(e.CommandArgument.ToString());
                int portalID = int.Parse(gdvPortal.DataKeys[rowIndex]["PortalID"].ToString());
                string PortalName = gdvPortal.DataKeys[rowIndex]["Name"].ToString();
                bool IsParent = bool.Parse(gdvPortal.DataKeys[rowIndex]["IsParent"].ToString());

                switch (e.CommandName.ToString())
                {
                    case "Delete":
                        DeletePortal(portalID);
                        ShowMessage(SageMessageTitle.Information.ToString(), GetSageMessage("RecycleBin", "PortalRestoreSuccessfully"), "", SageMessageType.Success);
                        break;
                    case "Undo":
                        UndoPortalDelete(portalID);
                        ShowMessage(SageMessageTitle.Information.ToString(), GetSageMessage("RecycleBin", "PortalDeleteSuccessfully"), "", SageMessageType.Success);
                        break;
                }

                BindDeletedPortals();

            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }

    }
    protected void gdvPortal_RowDeleting(object sender, GridViewDeleteEventArgs e) { }
    protected void gdvPortal_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            HtmlInputCheckBox chkItem = (HtmlInputCheckBox)e.Row.FindControl("chkBoxItemPortal");
            chkItem.Attributes.Add("onclick", "javascript:Check(this,'cssCheckBoxHeader','" + gdvPortal.ClientID +
                                   "','cssCheckBoxItem');");
        }
        else if (e.Row.RowType == DataControlRowType.Header)
        {
            HtmlInputCheckBox chkHeader = (HtmlInputCheckBox)e.Row.FindControl("chkBoxHeaderPortal");
            chkHeader.Attributes.Add("onclick", "javascript:SelectAllCheckboxesSpecific(this,'" + gdvPortal.ClientID +
                                     "','cssCheckBoxItem');");
        }
    }

    private void UndoPortalDelete(int portID)
    {
        RecyclePortalController portalController = new RecyclePortalController();
        bool deleteSuccessfull = portalController.RestorePortal(portID, GetUsername);
    }

    private bool DeletePortal(int portID)
    {
        RecyclePortalController portalController = new RecyclePortalController();
        return portalController.DeletePortal(portID);
    }




    protected void imgBtnDeleteSelectedPortals_Click(object sender, EventArgs e)
    {
        try
        {

            bool itemFound = false;
            for (int i = 0; i < gdvPortal.Rows.Count; i++)
            {
                HtmlInputCheckBox chkBoxItem = (HtmlInputCheckBox)gdvPortal.Rows[i].FindControl("chkBoxItemPortal");
                if (chkBoxItem.Checked == true)
                {
                    itemFound = true;
                    HiddenField hiddenField = (HiddenField)gdvPortal.Rows[i].FindControl("hdnPortalID");
                    string portalID = hiddenField.Value.Trim();

                    int portID = int.Parse(portalID);
                    DeletePortal(portID);

                }
            }

            if (itemFound)
            {
                BindDeletedPortals();
                ShowMessage("", GetSageMessage("RecycleBin", "SelectedPortalsAreDeletedSuccessfully"), "", SageMessageType.Success);
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    protected void imgBtnRestoreSelectedPortals_Click(object sender, EventArgs e)
    {
        try
        {

            bool itemFound = false;
            for (int i = 0; i < gdvPortal.Rows.Count; i++)
            {
                HtmlInputCheckBox chkBoxItem = (HtmlInputCheckBox)gdvPortal.Rows[i].FindControl("chkBoxItemPortal");
                if (chkBoxItem.Checked == true)
                {
                    itemFound = true;
                    HiddenField hiddenField = (HiddenField)gdvPortal.Rows[i].FindControl("hdnPortalID");
                    string portalID = hiddenField.Value.Trim();

                    int portID = int.Parse(portalID);
                    UndoPortalDelete(portID);

                }
            }

            if (itemFound)
            {
                BindDeletedPortals();
                ShowMessage("", GetSageMessage("RecycleBin", "SelectedPortalsAreRestoredSuccessfully"), "", SageMessageType.Success);
            }

        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }


    private string GetSelectedPortals()
    {
        string selectedPortals = string.Empty;
        for (int i = 0; i < gdvUser.Rows.Count; i++)
        {
            HtmlInputCheckBox chkBoxItem = (HtmlInputCheckBox)gdvUser.Rows[i].FindControl("chkBoxItemPortal");
            if (chkBoxItem.Checked == true)
            {
                LinkButton lnkUsername = (LinkButton)gdvUser.Rows[i].FindControl("lnkUsernamePortal");
                if (!SystemSetting.SYSTEM_DEFAULT_USERS.Contains(lnkUsername.Text.Trim(), StringComparer.OrdinalIgnoreCase))
                {
                    selectedPortals += lnkUsername.Text.Trim() + ",";
                }

            }
        }
        if (selectedPortals.Length > 1)
        {
            selectedPortals = selectedPortals.Substring(0, selectedPortals.Length - 1);
        }
        return selectedPortals;
    }


    #endregion


    #region  --- BIND TO GRID VIEW

    private void BindDeletedRoles()
    {
        RecycleRolesController rolesController = new RecycleRolesController();
        List<RecycleRolesInfo> lstRecycleRolesInfo = rolesController.GetDeletedRoles();

        if (lstRecycleRolesInfo == null || lstRecycleRolesInfo.Count <= 0)
        {
            pnlRoles.Visible = false;
        }
        else
        {
            gdvRoles.DataSource = lstRecycleRolesInfo;
            gdvRoles.DataBind();
        }




    }


    private void BindDeletedPortals()
    {

        RecyclePortalController rolesController = new RecyclePortalController();
        List<RecyclePortalInfo> lstRecyclePortalInfo = rolesController.GetDeletedPortals();

        if (lstRecyclePortalInfo == null || lstRecyclePortalInfo.Count <= 0)
        {
            pnlPortals.Visible = false;
        }
        else
        {
            gdvPortal.DataSource = lstRecyclePortalInfo;
            gdvPortal.DataBind();

        }

    }


    private void BindDeletedUsers()
    {
        RecycleUsersController rolesController = new RecycleUsersController();
        List<RecycleUsesInfo> lstRecycleUserInfo = rolesController.GetDeletedUsers();

        if (lstRecycleUserInfo == null || lstRecycleUserInfo.Count <= 0)
        {
            pnlUsers.Visible = false;
        }
        else
        {
            gdvUser.DataSource = lstRecycleUserInfo;
            gdvUser.DataBind();
        }


    }


    #endregion

}