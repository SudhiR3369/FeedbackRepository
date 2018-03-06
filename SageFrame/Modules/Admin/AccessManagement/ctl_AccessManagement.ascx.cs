#region "Copyright"
/*
FOR FURTHER DETAILS ABOUT LICENSING, PLEASE VISIT "LICENSE.txt" INSIDE THE SAGEFRAME FOLDER
*/
#endregion

#region "References"
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Security;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.RolesManagement;
using SageFrame.Security;
using SageFrame.Security.Entities;
using SageFrame.Security.Helpers;
using System.Text;
using SageFrame.Pages;
#endregion

namespace SageFrame.Modules.Admin.UserManagement
{
    public partial class ctl_ManageRoles : BaseAdministrationUserControl
    {
        public int userModuleID = 0;
        public Guid RoleID;
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                userModuleID = int.Parse(SageUserModuleID);
                IncludeJs("PageRoleSettingsJS", "/Modules/Admin/AccessManagement/js/PageRoleSettings.js");
                IncludeCss("PageRoleSettings", "/Modules/Admin/UserManagement/css/managerole.css");
                BuildAccessControlledSelection();
                GetSuperRoleID();
                if (!IsPostBack)
                {
                    BindListBoxRole();
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }
        protected void BuildAccessControlledSelection()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<div class='sfRadiobutton'>");
            sb.Append("<label id='portalPages' class='sfActive'><input type='radio' id='rdbPortalPages' value='0' checked='checked' name='PageMode' style='display:none;'/>");
            sb.Append("Portal Pages</label>");
            sb.Append("<label id='adminPages'><input type='radio' id='rdbAdmin' name='PageMode' value='1' style='display:none;'/>");
            sb.Append("Admin Pages</label>");
            sb.Append("</div>");
            ltrPagesRadioButtons.Text = sb.ToString();
        }
        protected void GetSuperRoleID()
        {
            PageController objCon = new PageController();
            RoleID = objCon.GetSuperRoleID();
        }
        private void HideAllPanel()
        {
            panelDashboardRoles.Visible = false;
            pnlPageRoleSettings.Visible = false;
            pnlDashBrdCardModules.Visible = false;
            
        }






        protected void imbAdminCardModuleRoleSetting_Click(object sender, EventArgs e)
        {
            HideAllPanel();
            pnlDashBrdCardModules.Visible = true;
        }
        protected void imbPageRoleSettings_Click(object sender, EventArgs e)
        {
            try
            {
                HideAllPanel();
                pnlPageRoleSettings.Visible = true;
             
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }

        #region AdminRolemanagement

        protected void btnAddAllRole_Click(object sender, EventArgs e)
        {
            int count = lstUnselectedRoles.Items.Count;
            if (count > 0)
            {
                List<ListItem> addAllRoles = new List<ListItem>();
                for (int i = 0; i < count; i++)
                {
                    if (lstUnselectedRoles.Items[i].Text.ToLower() == "anonymous user")
                    {
                        ShowMessage("", GetSageMessage("UserManagement", "CannotSwitchAnonymousUser"), "", SageMessageType.Alert);
                    }
                    else
                    {
                        lstSelectedRoles.Items.Add(lstUnselectedRoles.Items[i]);
                        addAllRoles.Add(lstUnselectedRoles.Items[i]);
                    }
                }
                foreach (ListItem remRole in addAllRoles)
                {
                    lstUnselectedRoles.Items.Remove(remRole);
                }
            }
        }

        protected void btnAddRole_Click(object sender, EventArgs e)
        {
            try
            {
                if (lstUnselectedRoles.SelectedIndex != -1)
                {
                    int[] selectedIndexs = lstUnselectedRoles.GetSelectedIndices();
                    for (int i = selectedIndexs.Length - 1; i >= 0; i--)
                    {
                        if (lstUnselectedRoles.Items[selectedIndexs[i]].Text.ToLower() == "anonymous user")
                        {
                            ShowMessage("", GetSageMessage("UserManagement", "CannotSwitchAnonymousUser"), "", SageMessageType.Alert);
                        }
                        else
                        {
                            lstSelectedRoles.Items.Add(lstUnselectedRoles.Items[selectedIndexs[i]]);
                            lstUnselectedRoles.Items.Remove(lstUnselectedRoles.Items[selectedIndexs[i]]);
                        }
                    }
                    lstUnselectedRoles.SelectedIndex = -1;
                }
                else
                {
                    ShowMessage("", GetSageMessage("UserManagement", "selectarole"), "", SageMessageType.Alert);
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }

        protected void btnRemoveRole_Click(object sender, EventArgs e)
        {
            try
            {
                if (lstSelectedRoles.SelectedIndex != -1)
                {
                    int[] selectedIndexs = lstSelectedRoles.GetSelectedIndices();
                    for (int i = selectedIndexs.Length - 1; i >= 0; i--)
                    {
                        if (lstSelectedRoles.Items.Count > 0)
                        {
                            if (lstSelectedRoles.Items[selectedIndexs[i]].Text.ToLower() == "super user")
                            {
                                ShowMessage("", GetSageMessage("UserManagement", "CannotSwitchSuperUser"), "", SageMessageType.Alert);
                            }
                            else
                            {
                                lstUnselectedRoles.Items.Add(lstSelectedRoles.Items[selectedIndexs[i]]);
                                lstSelectedRoles.Items.Remove(lstSelectedRoles.Items[selectedIndexs[i]]);
                            }
                        }
                    }
                    lstSelectedRoles.SelectedIndex = -1;
                }
                else
                {
                    ShowMessage("", GetSageMessage("UserManagement", "selectarole"), "", SageMessageType.Alert);
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }

        protected void btnRemoveAllRole_Click(object sender, EventArgs e)
        {
            try
            {
                int Count = lstSelectedRoles.Items.Count;
                List<ListItem> remRoles = new List<ListItem>();
                for (int i = 0; i < Count; i++)
                {
                    if (lstSelectedRoles.Items[i].Text.ToLower() == "super user")
                    {
                        ShowMessage("", GetSageMessage("UserManagement", "CannotSwitchSuperUser"), "", SageMessageType.Alert);
                    }
                    else
                    {
                        lstUnselectedRoles.Items.Add(lstSelectedRoles.Items[i]);
                        remRoles.Add(lstSelectedRoles.Items[i]);
                    }
                }

                foreach (ListItem remRole in remRoles)
                {
                    lstSelectedRoles.Items.Remove(remRole);
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }

        protected void BindListBoxRole()
        {
            lstSelectedRoles.Items.Clear();
            lstUnselectedRoles.Items.Clear();
            RolesManagementController objRoleController = new RolesManagementController();
            List<RolesManagementInfo> objRoleList = objRoleController.DashboardRoleList(GetPortalID);
            foreach (RolesManagementInfo role in objRoleList)
            {
                if (role.IsActive == true)
                {
                    lstSelectedRoles.Items.Add(new ListItem(role.RoleName, role.RoleId.ToString()));
                }
                else
                {
                    lstUnselectedRoles.Items.Add(new ListItem(role.RoleName, role.RoleId.ToString()));
                }
            }
        }


        protected void imgManageRoleSave_Click(object sender, EventArgs e)
        {
            try
            {
                string selectedRoles = GetListBoxText(lstSelectedRoles);
                RolesManagementController objRoleController = new RolesManagementController();
                objRoleController.UpdateDashboardRoleList(GetPortalID, selectedRoles, GetUsername);
                BindListBoxRole();
                ShowMessage("", GetSageMessage("UserManagement", "SuccessfullyUpdatedDashboardRoles"), "", SageMessageType.Success);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ShowMessage("", GetSageMessage("UserManagement", "UnknownErrorOccur"), "", SageMessageType.Error);
            }
        }
        private string GetListBoxText(ListBox lstBox)
        {
            string selectedRoles = string.Empty;
            foreach (ListItem li in lstBox.Items)
            {
                string roleName = li.Value;
                if (SystemSetting.SYSTEM_ROLES.Contains(roleName, StringComparer.OrdinalIgnoreCase))
                {
                    selectedRoles += roleName + ",";
                }
                else
                {
                    selectedRoles += roleName + ",";
                }
            }
            if (selectedRoles.Length > 0)
            {
                selectedRoles = selectedRoles.Substring(0, selectedRoles.Length - 1);
            }
            return selectedRoles;
        }
        protected void imbDashboardRoleSettings_Click(object sender, EventArgs e)
        {
            try
            {
                HideAllPanel();
                panelDashboardRoles.Visible = true;
               
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }
        protected void imgManageRoleCancel_Click(object sender, EventArgs e)
        {
            try
            {
                HideAllPanel();
                pnlPageRoleSettings.Visible = true;
            
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }
        #endregion
    }
}