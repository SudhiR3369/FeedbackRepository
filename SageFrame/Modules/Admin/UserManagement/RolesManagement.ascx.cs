using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.Security.Entities;
using System.Web.Security;
using SageFrame.Security;
using SageFrame.Security.Helpers;
using System.Data;
using SageFrame.RolesManagement;

public partial class Modules_Admin_UserManagement_RolesManagement : BaseAdministrationUserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        BindRoles();
    }
    private void AddDeleteCommandFieldInGrid()
    {
        CommandField field = new CommandField();
        field.ButtonType = ButtonType.Image;
        field.DeleteImageUrl = GetTemplateImageUrl("imgdelete.png", true);
        field.ShowDeleteButton = true;
        field.ShowHeader = false;
        gdvRoles.Columns.Add(field);
        gdvRoles.DataBind();
    }
    string newRoleID = string.Empty;
    protected void imgAdd_Click(object sender, EventArgs e)
    {
        try
        {
            if (txtRole.Text.Trim().Length > 0)
            {
                string rolePrefix = GetPortalSEOName + "_";
                RoleInfo objRole = new RoleInfo();
                objRole.ApplicationName = Membership.ApplicationName;
                objRole.RoleName = txtRole.Text.Trim();
                objRole.PortalID = GetPortalID;
                objRole.IsActive = 1;
                objRole.AddedOn = DateTime.Now;
                objRole.AddedBy = GetUsername;
                string roleID = hdnRoleID.Value.ToString();
                if (txtRole.Text.ToLower().Equals("superuser"))
                {
                    ShowMessage(SageMessageTitle.Notification.ToString(), GetSageMessage("UserManagement", "ThisRoleAlreadyExists"), "", SageMessageType.Error);
                }
                else
                {
                    RoleController r = new RoleController();
                    RoleCreationStatus status = new RoleCreationStatus();
                    r.CreateRole(objRole, roleID, out status);
                    if (status == RoleCreationStatus.DUPLICATE_ROLE)
                    {
                        ShowMessage(SageMessageTitle.Notification.ToString(), GetSageMessage("UserManagement", "ThisRoleAlreadyExists"), "", SageMessageType.Error);
                    }
                    else if (status == RoleCreationStatus.SUCCESS)
                    {
                        BindRoles();
                        pnlRoleForm.Visible = false;
                        pnlRoles.Visible = true;
                        ShowMessage(SageMessageTitle.Information.ToString(), GetSageMessage("UserManagement", "RoleSavedSuccessfully"), "", SageMessageType.Success);
                    }
                }
            }
            else
            {
                ShowMessage(SageMessageTitle.Notification.ToString(), GetSageMessage("UserManagement", "RoleRequired"), "", SageMessageType.Error);

            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }

    }
    private void BindRoles()
    {
        try
        {
            DataTable dtRoles = new DataTable();
            dtRoles.Columns.Add("Role");
            dtRoles.Columns.Add("RoleID");
            dtRoles.AcceptChanges();
            RolesManagementController objController = new RolesManagementController();
            List<RolesManagementInfo> objRoles = objController.PortalRoleList(GetPortalID, true, GetUsername);
            foreach (RolesManagementInfo role in objRoles)
            {
                string roleName = role.RoleName;
                if (SystemSetting.SYSTEM_ROLES.Contains(roleName, StringComparer.OrdinalIgnoreCase))
                {
                    DataRow dr = dtRoles.NewRow();
                    dr["Role"] = roleName;
                    dr["RoleID"] = role.RoleId;
                    dtRoles.Rows.Add(dr);
                }
                else
                {
                    string rolePrefix = GetPortalSEOName + "_";
                    roleName = roleName.Replace(rolePrefix, "");
                    DataRow dr = dtRoles.NewRow();
                    dr["Role"] = roleName;
                    dr["RoleID"] = role.RoleId;
                    dtRoles.Rows.Add(dr);
                }
            }
            gdvRoles.DataSource = dtRoles;
            gdvRoles.DataBind();
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    private void EditRole(string role, string roleID)
    {

        if (SystemSetting.SYSTEM_ROLES.Contains(role, StringComparer.OrdinalIgnoreCase))
        {
            ShowMessage(SageMessageTitle.Notification.ToString(), GetSageMessage("UserManagement", "ThisIsSystemRoleAndCannotBeEdited"), "", SageMessageType.Alert);
        }
        else
        {
            try
            {
                txtRole.Text = role;
                hdnRoleID.Value = roleID;
                pnlRoleForm.Visible = true;
                pnlRoles.Visible = false;
            
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }
    }

    protected void imbAddNewRole_Click(object sender, EventArgs e)
    {
        try
        {
            hdnRoleID.Value = string.Empty;
            txtRole.Text = "";
            pnlRoleForm.Visible = true;
            pnlRoles.Visible = false;
         
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    protected void gdvRoles_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        try
        {
            string RoleID = gdvRoles.DataKeys[int.Parse(e.CommandArgument.ToString())]["RoleID"].ToString();
            string Role = gdvRoles.DataKeys[int.Parse(e.CommandArgument.ToString())]["Role"].ToString();
            switch (e.CommandName.ToString())
            {
                case "Delete":
                    DeleteRole(Role, RoleID);
                    break;
                case "Edit":
                    EditRole(Role, RoleID);
                    break;
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    private void DeleteRole(string role, string roleid)
    {
        try
        {
            if (SystemSetting.SYSTEM_ROLES.Contains(role, StringComparer.OrdinalIgnoreCase))
            {
                ShowMessage(SageMessageTitle.Notification.ToString(), GetSageMessage("UserManagement", "ThisIsSystemRoleAndCannotBeDeleted"), "", SageMessageType.Alert);
            }
            else
            {
                Guid RoleID = new Guid(roleid);
                RoleController roleObj = new RoleController();
                roleObj.DeleteRole(RoleID, GetPortalID);
                BindRoles();
             
                ShowMessage(SageMessageTitle.Information.ToString(), GetSageMessage("UserManagement", "RoleIsDeletedSuccessfully"), "", SageMessageType.Success);
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
            ShowMessage(SageMessageTitle.Notification.ToString(), GetSageMessage("UserManagement", "RoleCannnotBeDeleted"), "", SageMessageType.Error);
        }
    }
    protected void imgCancel_Click(object sender, EventArgs e)
    {
        try
        {

            hdnRoleID.Value = string.Empty;
            txtRole.Text = "";
            pnlRoleForm.Visible = false;
            pnlRoles.Visible = true;
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }
    protected void gdvRoles_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {

    }

    protected void gdvRoles_RowEditing(object sender, GridViewEditEventArgs e)
    {

    }
    protected void gdvRoles_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            if (SystemSetting.SYSTEM_ROLES.Contains(e.Row.Cells[0].Text, StringComparer.OrdinalIgnoreCase))
            {
                LinkButton btnDelete = (LinkButton)e.Row.FindControl("imbDelete");
                btnDelete.Visible = false;

                LinkButton btnEdit = (LinkButton)e.Row.FindControl("imbEdit");
                btnEdit.Visible = false;
            }
            else
            {
                LinkButton btnDelete = (LinkButton)e.Row.FindControl("imbDelete");
                btnDelete.Attributes.Add("onclick", "javascript:return confirm('" + GetSageMessage("UserManagement", "AreYouSureToDelete") + "')");

                LinkButton btnEdit = (LinkButton)e.Row.FindControl("imbEdit");
                //btnEdit.Attributes.Add("onclick", "javascript:return confirm('" + GetSageMessage("UserManagement", "AreYouSureToDelete") + "')");
            }
        }
    }

}