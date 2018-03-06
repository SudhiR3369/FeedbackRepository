using SageFrame.ReturnCode.Utilities;

namespace SageFrame.ReturnCode.Entities
{
    public class MessageCode : IMessageCode
    {
        public string Message { get; set; } = string.Empty;

        public int Code { get; set; } = (int)CodeDefinition.Default;

    }
}
