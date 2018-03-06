using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SageFrame.Core
{
    public class DuckableController
    {
        public Duckable GetDuckableValue()
        {
            try
            {
                DuckableDataProvider objDuckableDataProvider = new DuckableDataProvider();
                return objDuckableDataProvider.GetDuckableValue();
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
                DuckableDataProvider objDuckableDataProvider = new DuckableDataProvider();
                objDuckableDataProvider.UpdateDuckableValue(objDuck);
            }
            catch (Exception e)
            {
            }
        }
    }
}
