using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.WebBuilder
{
    public class EasyPackage
    {
        public string Name { get; set; }
        public string Sql { get; set; }
        public string Storeprocedure { get; set; }
        public Dictionary<string,string> ParamkeyAndValue { get; set; }
        public string Result { get; set; }
    }
}
