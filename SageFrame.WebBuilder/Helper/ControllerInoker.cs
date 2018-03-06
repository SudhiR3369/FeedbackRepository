using System;
using System.Collections.Generic;
using System.Reflection;
using System.Web;
using System.Linq;

namespace SageFrame.WebBuilder
{
    public class ControllerInoker
    {
        public object InvokeMethod(ControllerDetail objControll)
        {
            string dlllocation = HttpContext.Current.Server.MapPath(@"\bin\" + objControll.Namespaces + ".dll");
            Assembly myLibrary = Assembly.LoadFile(dlllocation);
            Type type = myLibrary.GetType(objControll.Namespaces + "." + objControll.ClassNames);
            object instance = Activator.CreateInstance(type, null);
            MethodInfo method = type.GetMethod(objControll.MethodNames);
            //return method.Invoke(instance, objControll.Args);
            return method.Invoke(instance, objControll.Args);
        }
        //without loading the dll
        //public object InvokeMethod(ControllerDetail objControll)
        //{
        //    Type type = Type.GetType(objControll.Namespaces + "." + objControll.ClassNames);
        //    object instance = Activator.CreateInstance(type, null);
        //    MethodInfo method = type.GetMethod(objControll.MethodNames);
        //    //return method.Invoke(instance, objControll.Args);
        //    return method.Invoke(instance, objControll.Args);

        //}
        public Dictionary<string, ControllerDetail> EditLoadAPI(string pageName, string[] urlParams)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            List<ControllerDetail> objControllersList = objDataProvider.GetAPIList(pageName);
            urlParams = urlParams.Skip(1).ToArray();
            return ResultInvoke(objControllersList, urlParams);
        }

        public Dictionary<string, ControllerDetail> ViewLoadAPI(string pageName, string[] urlParams)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            List<ControllerDetail> objControllersList = objDataProvider.GetAPIList(pageName);
            return ResultInvoke(objControllersList, urlParams);
        }
        public Dictionary<string, ControllerDetail> ViewLoadAPIPublished(string pageName, string[] urlParams)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            List<ControllerDetail> objControllersList = objDataProvider.GetAPIListPublished(pageName);
            return ResultInvoke(objControllersList, urlParams);
        }
        private Dictionary<string, ControllerDetail> ResultInvoke(List<ControllerDetail> objControllers, string[] urlParams)
        {
            Dictionary<string, ControllerDetail> result = new Dictionary<string, ControllerDetail>();
            foreach (ControllerDetail item in objControllers)
            {
                try
                {
                    switch (item.Type)
                    {
                        case "URL":
                            List<object> objList = new List<object>();
                            string[] para = item.Parameters.Split(',');
                            int urlLen = urlParams.Length;
                            int argLen = para.Length;
                            for (int i = 0; i < urlLen; i++)
                            {
                                for (int j = 0; j < argLen; j++)
                                {
                                    int position = -1;
                                    int.TryParse(para[j], out position);
                                    if (i == position)
                                    {
                                        objList.Add(urlParams[i]);
                                        break;
                                    }
                                }
                            }
                            item.Args = objList.ToArray();
                            break;
                        case "method":
                            object[] args = null;
                            args = item.Parameters.Split(',');
                            item.Args = args;
                            break;
                    }
                    object resultInvoke = InvokeMethod(item);
                    if (resultInvoke != null)
                    {
                        item.ErrorOccured = false;
                        item.Result = new object[1];
                        item.Result[0] = resultInvoke;
                    }
                    if (!result.ContainsKey(item.ComponentID.Trim()))
                        result.Add(item.ComponentID.Trim(), item);
                }
                catch (Exception ex)
                {
                    item.ErrorOccured = true;
                    item.Error = new object[1];
                    item.Error[0] = ex.ToString();
                    if (!result.ContainsKey(item.ComponentID.Trim()))
                        result.Add(item.ComponentID.Trim(), item);
                }
            }
            return result;
        }

    }

}
//examples
//https://stackoverflow.com/questions/801070/dynamically-invoking-any-function-by-passing-function-name-as-string
//public void Invokers()
//{
//    // Default constructor, void method
//    ControllerInoker.CreateAndInvoke("Test.Tester", null, "TestMethod", null);

//    // Constructor that takes a parameter
//    ControllerInoker.CreateAndInvoke("Test.Tester", new[] { "constructorParam" }, "TestMethodUsingValueFromConstructorAndArgs", new object[] { "moo", false });

//    // Constructor that takes a parameter, invokes a method with a return value
//    string result = (string)ControllerInoker.CreateAndInvoke("Test.Tester", new object[] { "constructorValue" }, "GetContstructorValue", null);
//    //Console.WriteLine("Expect [constructorValue], got:" + result);

//    // Console.ReadKey(true);
//}