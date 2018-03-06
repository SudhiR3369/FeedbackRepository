using SageFrame.Web.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.DashboardLink
{
    class DashboardLinkProvider
    {
        internal List<DashboardLinkInfo> GetallLinks(int PortalID, int UserModuleID, string CultureCode)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
                param.Add(new KeyValuePair<string, object>("@UserModuleID", UserModuleID));
                param.Add(new KeyValuePair<string, object>("@CultureCode", CultureCode));
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsList<DashboardLinkInfo>("[dbo].[usp_DashboardLink_GetAll]", param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        internal void AddUpdateLink(DashboardLinkInfo objInfo)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@LinkID", objInfo.LinkID));
                param.Add(new KeyValuePair<string, object>("@LinkTitle", objInfo.LinkTitle));
                param.Add(new KeyValuePair<string, object>("@PageID", objInfo.PageID));
                param.Add(new KeyValuePair<string, object>("@IsParent", objInfo.IsParent));
                param.Add(new KeyValuePair<string, object>("@ParentLinkID", objInfo.ParentLinkID));
                param.Add(new KeyValuePair<string, object>("@IsActive", objInfo.IsActive));
                param.Add(new KeyValuePair<string, object>("@PortalID", objInfo.PortalID));
                param.Add(new KeyValuePair<string, object>("@UserModuleID", objInfo.UserModuleID));
                param.Add(new KeyValuePair<string, object>("@CultureCode", objInfo.CultureCode));
                SQLHandler sagesql = new SQLHandler();
                sagesql.ExecuteNonQuery("[dbo].[usp_DashboardLink_AddUpdate]", param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        internal void DeleteLinkByID(int LinkID)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@LinkID", LinkID));
                SQLHandler sagesql = new SQLHandler();
                sagesql.ExecuteNonQuery("[dbo].[usp_DashboardLink_DeleteByID]", param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        internal DashboardLinkInfo GetLinkByID(int LinkID)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
                param.Add(new KeyValuePair<string, object>("@LinkID", LinkID));
                SQLHandler sagesql = new SQLHandler();
                return sagesql.ExecuteAsObject<DashboardLinkInfo>("[dbo].[usp_DashboardLink_GetByID]", param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void SortLink(int LinkID, bool MoveUp)
        {
            try
            {
                List<KeyValuePair<string, object>> Parameter = new List<KeyValuePair<string, object>>();
                Parameter.Add(new KeyValuePair<string, object>("@LinkID", LinkID));
                Parameter.Add(new KeyValuePair<string, object>("@MoveUp", MoveUp));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[usp_DashboardLink_Sort]", Parameter);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DashboardLinkInfo> GetallLinksView(string roleID)
        {

            try
            {
                List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
                Param.Add(new KeyValuePair<string, object>("@RoleID", roleID));
                SQLHandler handler = new SQLHandler();
                
                List<DashboardLinkInfo> Menu = handler.ExecuteAsList<DashboardLinkInfo>("usp_DashboardLink_GetAllView",Param);
                
                return Menu;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
