using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Registration
{
  public  class RegistrationController
    {
        public void AddUpdateUsers(RegistrationEntity regObj)
        {
            try
            {
                RegistrationDataProvider regProvider = new RegistrationDataProvider();
                regProvider.AddUserDetails(regObj);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteUserByID(int UsersID)
        {
            try
            {
                RegistrationDataProvider regProvider = new RegistrationDataProvider();
                regProvider.DeleteUserByID(UsersID);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public List<RegistrationEntity> GetAllUsers(int PortalID, int UserModuleID, string CultureCode)
        {
            try
            {
                RegistrationDataProvider regProvider = new RegistrationDataProvider();
                return regProvider.GetAllUsers(PortalID, UserModuleID, CultureCode);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public RegistrationEntity GetUsersByID(int UsersID)
        {
            try
            {
                RegistrationDataProvider regProvider = new RegistrationDataProvider();
                return regProvider.GetUsersByID(UsersID);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
