using SageFrame.ReturnCode.Entities;
using SageFrame.ReturnCode.Utilities;

namespace SageFrame.ReturnCode.Example
{

    /// <summary>
    /// Example on using the MessageCode
    /// [ To be followed for maintaining a common return code standards ]
    /// </summary>
    public class SampleCode
    {
        /// <summary>
        /// MessageCode implementation for Insert commands
        /// </summary>
        /// <returns></returns>
        public MessageCode InserSomeData()
        {
            bool success = true;
            if (success)
            {
                return new MessageCode() { Code = CodeType.InsertSuccess, Message = "YOUR--RETURN---MESSAGE" };
            }
            else
            {
                bool usersFault = true;
                if (usersFault)
                    return new MessageCode() { Code = CodeType.InvalidData, Message = "YOUR--RETURN---MESSAGE" };
                else
                    return new MessageCode() { Code = CodeType.SystemError, Message = "YOUR--RETURN---MESSAGE" };
            }
        }


        /// <summary>
        /// MessageCode implementation for Update commands
        /// </summary>
        /// <returns></returns>
        public MessageCode UpdateSomeData()
        {
            bool success = true;
            if (success)
            {
                return new MessageCode() { Code = CodeType.UpdateSuccess, Message = "YOUR--RETURN---MESSAGE" };
            }
            else
            {

                bool usersFault = true;
                if (usersFault)
                    return new MessageCode() { Code = CodeType.InvalidData, Message = "YOUR--RETURN---MESSAGE" };
                else
                    return new MessageCode() { Code = CodeType.SystemError, Message = "YOUR--RETURN---MESSAGE" };
            }
        }


        /// <summary>
        /// MessageCode implementation for Delete commands
        /// </summary>
        /// <returns></returns>
        public MessageCode DeleteSomeData()
        {
            bool success = true;
            if (success)
            {
                return new MessageCode() { Code = CodeType.DeleteSuccess, Message = "YOUR--RETURN---MESSAGE" };
            }
            else
            {
                bool usersFault = true;
                if (usersFault)
                    return new MessageCode() { Code = CodeType.InvalidData, Message = "YOUR--RETURN---MESSAGE" };
                else
                    return new MessageCode() { Code = CodeType.SystemError, Message = "YOUR--RETURN---MESSAGE" };
            }
        }



    }


}
