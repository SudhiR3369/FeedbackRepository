using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SageFrame.Web.Utilities;

namespace SageFrame.Core
{
   public class CardModuleProvider
    {
        internal List<CardModuleInfo> GetAllDeltedCardModule(string userName)
        {
            try
            {
                List<KeyValuePair<string, object>> InputParam = new List<KeyValuePair<string, object>>();
                InputParam.Add(new KeyValuePair<string, object>("@userName", userName));
                SQLHandler ObjSql = new SQLHandler();
                List<CardModuleInfo> lst = ObjSql.ExecuteAsList<CardModuleInfo>("[dbo].[usp_AdminCardModule_GetAllDelted]",InputParam);
                return lst;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        internal void DeleteAdminCardModule(int userModuleID)
        {
            try
            {
                List<KeyValuePair<string, object>> InputParam = new List<KeyValuePair<string, object>>();
                InputParam.Add(new KeyValuePair<string, object>("@userModuleID", userModuleID));
                SQLHandler ObjSql = new SQLHandler();
                ObjSql.ExecuteNonQuery("[dbo].[usp_AdminCardModule_Delete]", InputParam);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        internal void RestoreDeletedAdminCardModule(int userModuleID)
        {
            try
            {
                List<KeyValuePair<string, object>> InputParam = new List<KeyValuePair<string, object>>();
                InputParam.Add(new KeyValuePair<string, object>("@userModuleID", userModuleID));
                SQLHandler ObjSql = new SQLHandler();
                ObjSql.ExecuteNonQuery("[dbo].[usp_AdminCardModule_RestoreDeleted]", InputParam);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        internal void UpdateMinMaxDisplay(int userModuleID, string SuffixClass)
        {
            try
            {
                List<KeyValuePair<string, object>> InputParam = new List<KeyValuePair<string, object>>();
                InputParam.Add(new KeyValuePair<string, object>("@userModuleID", userModuleID));
                InputParam.Add(new KeyValuePair<string, object>("@SuffixClass", SuffixClass));

                SQLHandler ObjSql = new SQLHandler();
                ObjSql.ExecuteNonQuery("[dbo].[usp_AdminCardModule_UpdateDisplayStatus]", InputParam);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// UPDATE THE MODULE DISPLAY ORDER FOR ADMIN PAGE
        /// </summary>
        /// <param name="userModuleIDs">comma separed userModuleID</param>
        internal void UpdateDisplayOrder(string userModuleIDs)
        {
            try
            {
                List<KeyValuePair<string, object>> InputParam = new List<KeyValuePair<string, object>>();
                InputParam.Add(new KeyValuePair<string, object>("@UserModuleIDlst", userModuleIDs));
                SQLHandler ObjSql = new SQLHandler();
                ObjSql.ExecuteNonQuery("[dbo].[usp_AdminCardModule_UpdateDisplayOrder]", InputParam);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        internal List<CardModuleInfo> GetAllAdminCardModulePermission(string RoleID)
        {
            try
            {
                List<KeyValuePair<string, object>> InputParam = new List<KeyValuePair<string, object>>();
                InputParam.Add(new KeyValuePair<string, object>("@RoleID", RoleID));
                SQLHandler ObjSql = new SQLHandler();
                List<CardModuleInfo> lst= ObjSql.ExecuteAsList<CardModuleInfo>("[dbo].[usp_GetAllAdminCardModulePermissionByRoleID]", InputParam);
                return lst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        internal void UpdateCardModulePermission(CardModuleRoleSettingInfo objInfo)
        {
            try
            {
                List<KeyValuePair<string, object>> InputParam = new List<KeyValuePair<string, object>>();
                InputParam.Add(new KeyValuePair<string, object>("@RoleID", objInfo. RoleID));
                InputParam.Add(new KeyValuePair<string, object>("@UserName", objInfo.UserName));
                InputParam.Add(new KeyValuePair<string, object>("@IsRoleCreate", objInfo.IsRoleCreate));
                InputParam.Add(new KeyValuePair<string, object>("@UserModuleID", objInfo.UserModuleID));

                SQLHandler ObjSql = new SQLHandler();
                ObjSql.ExecuteNonQuery("[dbo].[usp_AdminCardModulePermissionDelCreate]", InputParam);
             
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
    }
}
