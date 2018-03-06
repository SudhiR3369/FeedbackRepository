using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.Core
{
    public class CardModuleController
    {
        public List<CardModuleInfo> GetAllDeltedCardModule(string userName)
        {
            CardModuleProvider objProv = new CardModuleProvider();
            return objProv.GetAllDeltedCardModule(userName);
        }
        public void DeleteAdminCardModule(int userModuleID)
        {
            CardModuleProvider objProv = new CardModuleProvider();
            objProv.DeleteAdminCardModule(userModuleID);
        }
        public void RestoreDeletedAdminCardModule(int userModuleID)
        {
            CardModuleProvider objProv = new CardModuleProvider();
            objProv.RestoreDeletedAdminCardModule(userModuleID);
        }
        public void UpdateMinMaxDisplay(int userModuleID, string SuffixClass)
        {
            CardModuleProvider objProv = new CardModuleProvider();
            objProv.UpdateMinMaxDisplay(userModuleID, SuffixClass);
        }
        /// <summary>
        /// UPDATE THE MODULE DISPLAY ORDER FOR ADMIN PAGE
        /// </summary>
        /// <param name="userModuleIDs">comma separed userModuleID</param>
        public void UpdateDisplayOrder(string userModuleIDs)
        {
            CardModuleProvider objProv = new CardModuleProvider();
            objProv.UpdateDisplayOrder(userModuleIDs);
        }
        public List<CardModuleInfo> GetAllAdminCardModulePermission(string RoleID)
        {
            CardModuleProvider objProv = new CardModuleProvider();
            return objProv.GetAllAdminCardModulePermission(RoleID);
        }
        public void UpdateCardModulePermission(CardModuleRoleSettingInfo objInfo)
        {
            CardModuleProvider objProv = new CardModuleProvider();
            objProv.UpdateCardModulePermission(objInfo);
        }
    }
}
