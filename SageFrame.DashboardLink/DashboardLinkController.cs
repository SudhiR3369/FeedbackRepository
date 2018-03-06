using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.DashboardLink
{
    public class DashboardLinkController
    {
        public List<DashboardLinkInfo> GetallLinks(int PortalID, int UserModuleID, string CultureCode)
        {
            try
            {
                DashboardLinkProvider objProv = new DashboardLinkProvider();
                List<DashboardLinkInfo> lst = objProv.GetallLinks(PortalID, UserModuleID, CultureCode);
                return lst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void AddUpdateLink(DashboardLinkInfo objInfo)
        {
            try
            {
                DashboardLinkProvider objProv = new DashboardLinkProvider();
                objProv.AddUpdateLink(objInfo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void DeleteLinkByID(int LinkID)
        {
            try
            {
                DashboardLinkProvider objProv = new DashboardLinkProvider();
                objProv.DeleteLinkByID(LinkID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public DashboardLinkInfo GetLinkByID(int LinkID)
        {
            try
            {
                DashboardLinkProvider objProv = new DashboardLinkProvider();
                DashboardLinkInfo objInfo = objProv.GetLinkByID(LinkID);
                return objInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void SortLink(int LinkID, bool MoveUp)
        {
            DashboardLinkProvider objProv = new DashboardLinkProvider();
            objProv.SortLink(LinkID, MoveUp);
        }

        public List<DashboardLinkInfo> GetallLinksView(string roleID)
        {
            DashboardLinkProvider providerObj = new DashboardLinkProvider();
            return providerObj.GetallLinksView(roleID);
        }
    }
}
