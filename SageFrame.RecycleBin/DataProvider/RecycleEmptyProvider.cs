using SageFrame.Web.Utilities;

namespace SageFrame.RecycleBin.DataProvider
{
    public class RecycleEmptyProvider
    {
        internal bool EmptyRecycleBin()
        {

            try
            {
                string sp = "[dbo].[usp_RecycleBin_EmptyAll]";
                string outputParam = "@ReturnCode";
                SQLHandler sagesql = new SQLHandler();
                int output= sagesql.ExecuteNonQuery(sp, outputParam);
                if (output == 1) return true;
                else return false;

            }
            catch
            {
                return false;
            }

        }
    }
}
