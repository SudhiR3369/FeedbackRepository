using SageFrame.Web.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Registration
{
    public class RegistrationDataProvider
    {
        public void AddUserDetails(RegistrationEntity regObj)
        {
            try
            {
                SQLHandler sqlh = new SQLHandler();
                List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
                Param.Add(new KeyValuePair<string, object>("@UserID", regObj.UserID));
                Param.Add(new KeyValuePair<string, object>("@UserName", regObj.Name));
                Param.Add(new KeyValuePair<string, object>("@EmailID", regObj.EmailID));
                Param.Add(new KeyValuePair<string, object>("@Password", regObj.Password));
                Param.Add(new KeyValuePair<string, object>("@UserModuleID", regObj.UserModuleID));
                Param.Add(new KeyValuePair<string, object>("@PortalID", regObj.PortalID));
                Param.Add(new KeyValuePair<string, object>("@CultureCode", regObj.CultureCode));
                sqlh.ExecuteNonQuery("usp_Registration_AddUpdate", Param);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public List<RegistrationEntity> GetAllUsers(int PortalID, int UserModuleID, string CultureCode)
        {
            try
            {
                SQLHandler sqLH = new SQLHandler();
                List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
                Param.Add(new KeyValuePair<string, object>("@UserModuleID", UserModuleID));
                Param.Add(new KeyValuePair<string, object>("@PortalID", PortalID));
                Param.Add(new KeyValuePair<string, object>("@CultureCode", CultureCode));
                return sqLH.ExecuteAsList<RegistrationEntity>("usp_Registration_GetAllUsers", Param);
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

        public RegistrationEntity GetUsersByID(int UserID)
        {
            try
            {
                SQLHandler sqlh = new SQLHandler();
                List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
                Param.Add(new KeyValuePair<string, object>("@UserID", UserID));

                return sqlh.ExecuteAsObject<RegistrationEntity>("usp_Registration_GetUsersByID", Param);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteUserByID(int UsersID)
        {
            SQLHandler sqlh = new SQLHandler();
            List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
            Param.Add(new KeyValuePair<string, object>("@UserID", UsersID));
            sqlh.ExecuteNonQuery("usp_Registration_DeleteUserByID", Param);
        }

    }
}
