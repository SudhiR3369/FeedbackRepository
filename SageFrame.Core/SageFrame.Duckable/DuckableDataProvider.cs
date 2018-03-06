using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Web.Utilities;

namespace SageFrame.Core
{
    public class DuckableDataProvider
    {
        public Duckable GetDuckableValue()
        {
            try
            {
                SQLHandler sqlHandler = new SQLHandler();
                return sqlHandler.ExecuteAsObject<Duckable>("[dbo].[usp_Duckable_Get]");
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void UpdateDuckableValue(Duckable objDuck)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Shown", objDuck.Shown));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Minimize", objDuck.Minimize));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@DragTop", objDuck.DragTop));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@DragLeft", objDuck.DragLeft));
                SQLHandler sq = new SQLHandler();
                sq.ExecuteNonQuery("[dbo].[usp_DuckableInsertPosition]", ParaMeterCollection);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
