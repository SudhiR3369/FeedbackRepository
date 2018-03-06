namespace SageFrame.ReturnCode.Utilities
{
    public enum CodeDefinition : int
    {
        ClientError = -2,     // <--- Used for cases where client/developers is at fault [ Users Fault ]
        SystemError = -1,     // <---- Used for cases where the system is at fault [ Systems Fault ]
        Success1 = 1,         // <--- Used for primary success results like [ Insert, Delete ]
        Success2 = 2,         // <--- Used for secondary success results like [ Update ]
        Default = 0           // <--- Default Scenario
    }

}
