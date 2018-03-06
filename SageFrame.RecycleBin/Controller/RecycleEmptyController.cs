using SageFrame.RecycleBin.DataProvider;

namespace SageFrame.RecycleBin.Controller
{
    public class RecycleEmptyController
    {
        public bool EmptyRecycleBin()
        {
            RecycleEmptyProvider provider = new RecycleEmptyProvider();
            return provider.EmptyRecycleBin();
        }
    }
}
