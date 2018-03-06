#region "Copyright"
/*
FOR FURTHER DETAILS ABOUT LICENSING, PLEASE VISIT "LICENSE.txt" INSIDE THE SAGEFRAME FOLDER
*/
#endregion

#region "References"
using System;
using System.Linq;
using System.Collections.Generic;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.Dashboard;
using SageFrame.Framework;
using System.Text;
using SageFrame.Security;
#endregion

namespace SageFrame.Modules.DashBoard
{
    public partial class DashBoard : BaseAdministrationUserControl
    {
        public string Extension;
        public int userModuleID = 0;
        bool superuserRole = false;
        string dragClass = "pagelist";
        string groupHolder = "GroupHolder";
        protected void Page_Load(object sender, EventArgs e)
        {
            CheckSuperuserRole();
            IncludeJs("quickmanage", "/Modules/DashBoard/js/Quickview.js","/Modules/DashBoard/js/AdminCardModule.js");
            IncludeCss("quickmanagecss", "/Modules/DashBoard/css/quickview.css");
            Extension = SageFrameSettingKeys.PageExtension;
            SageFrameConfig sfConf = new SageFrameConfig();
            string PortalLogoTemplate = sfConf.GetSettingValueByIndividualKey(SageFrameSettingKeys.PortalLogoTemplate);
            if (SageFrameSettingKeys.PortalLogoTemplate.ToString() != string.Empty)
            {
                lblSfInfo.Text = PortalLogoTemplate.ToString();
            }
            if (!Page.IsPostBack)
            {
                DashBoardView();
            }
        }

        public void CheckSuperuserRole()
        {
            RoleController _role = new RoleController();
            string[] roles = _role.GetRoleNames(GetUsername, GetPortalID).ToLower().Split(',');

            if (roles.Contains(SystemSetting.SUPER_ROLE[0].ToLower()))
            {
                divAddGroup.Visible = true;
                superuserRole = true;
            }
            else
            {
                divAddGroup.Visible = false;
                expandList.Visible = false;
                superuserRole = false;
                dragClass = "pagelists";
                groupHolder = "groupHolders";
            }
        }
        protected void imbAdmin_Click(object sender, ImageClickEventArgs e)
        {
        }
        private void DashBoardView()
        {
            try
            {
                string PageSEOName = string.Empty;
                if (Request.QueryString["pgnm"] != null)
                {
                    PageSEOName = Request.QueryString["pgnm"].ToString();
                }
                else
                {
                    PageBase pb = new PageBase();
                    SageUserControl SageUser = new SageUserControl();
                    PageSEOName = pb.GetPageSEOName(SageUser.PagePath);
                }
                DashboardController objController = new DashboardController();
                List<DashboardInfo> lstDashboard = objController.DashBoardView(PageSEOName, GetUsername, GetPortalID);

                GroupItemInfo objbnInfo = new GroupItemInfo();
                //objbnInfo.PortalID = portalID;
                List<GroupItemInfo> objGroupItem = objController.GroupGetAll(GetPortalID, PageSEOName, GetUsername);
                if (objGroupItem.Count > 0)
                    BindGroups(objGroupItem);
                StringBuilder html = new StringBuilder();
                html.Append("<ul  class='" + dragClass + " storePages clearfix' data-groupid='0'>");
                foreach (DashboardInfo objDashboard in lstDashboard)
                {
                    html.Append("<li class='page' data-pageID='" + objDashboard.PageID + "' data-itemid='0'>");
                    objDashboard.IconFile = "<i class='icon-" + objDashboard.PageName.Replace(" ", "-").ToLower() + "'></i>";
                    objDashboard.Url = objDashboard.Url + Extension;
                    html.Append("<a href=" + objDashboard.Url + "><span class='sfModuleicon'>");
                    html.Append(objDashboard.IconFile);
                    html.Append("</span>");
                    html.Append("<span  class='sfModulename'>" + objDashboard.PageName + "</span>");
                    html.Append("</a>");
                    html.Append("</li>");
                }
                html.Append("</ul>");
                ltradminPageList.Text = html.ToString();
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }

        private void BindGroups(List<GroupItemInfo> objGroupItemList)
        {
            StringBuilder html = new StringBuilder();
            html.Append("<div class='"+ groupHolder + "'>");
            int groupID = 0;
            foreach (GroupItemInfo objGroupInfo in objGroupItemList)
            {
                if (groupID != objGroupInfo.GroupID)
                {
                    if (groupID != 0)
                    {
                        html.Append(BindFooter());
                    }
                    html.Append(BindHeader(objGroupInfo.GroupName, objGroupInfo.GroupID, objGroupInfo.GroupOrder));
                }
                groupID = objGroupInfo.GroupID;
                if (objGroupInfo.ItemID > 0)
                    html.Append(BindGroup(objGroupInfo.PageID, objGroupInfo.PageName, objGroupInfo.URL + Extension, objGroupInfo.ItemID, objGroupInfo.ItemOrder));
            }
            html.Append(BindFooter());
            html.Append("</div>");
            ltrGroupBox.Text = html.ToString();
        }
        private string BindGroup(int pageID, string pageName, string url, int itemID, int itemOrder)
        {
            StringBuilder html = new StringBuilder();
            html.Append("<li class='page' data-pageid='" + pageID + "' data-itemid='" + itemID + "' style=''>");
            html.Append("<a href='" + url + "'><span class='sfModuleicon'>");
            html.Append("<i class='icon-" + pageName.ToLower().Replace(" ", "-") + "'></i></span>");
            html.Append("<span class='sfModulename'>" + pageName + "</span>");
            html.Append("</a>");
            html.Append("</li>");
            return html.ToString();
        }

        private string BindHeader(string title, int groupID, int itemOrder)
        {
            StringBuilder html = new StringBuilder();
            html.Append("<div class='window-box'>");
            html.Append("<div class='box-head clearfix'>");
            html.Append("<div class='head-left'><i class='fa fa-check-square-o' aria-hidden='true'></i><span>");
            html.Append(title);
            html.Append("</span></div>");
            html.Append("<div class='head-right'>");
            if (superuserRole)
            {
                html.Append("<span><i class='fa fa-edit editGroup' aria-hidden='true'></i></span>");
                html.Append("<span><i class='fa fa-arrows dragGroup' aria-hidden='true'></i></span>");
                html.Append("<span><i class='fa fa-times deleteGroup' aria-hidden='true'></i></span>");
            }
            html.Append("</div>");
            html.Append("</div>");
            html.Append("<div class='box-content'>");
            html.Append("<div class='group'>");
            html.Append("<ul class='" + dragClass + " clearfix ui-sortable' data-grouporder=" + itemOrder + " data-groupid='" + groupID + "'>");
            return html.ToString();
        }

        private string BindFooter()
        {
            StringBuilder html = new StringBuilder();
            html.Append("</ul>");
            html.Append("</div>");
            html.Append("</div>");
            html.Append("</div>");
            return html.ToString();
        }
        protected void rptDashBoard_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {

        }

        #region SageFrameRoute Members

        #endregion
    }
}
