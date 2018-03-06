using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SageFrame.WebBuilder.Helper
{
    public class BuildDynamicScript
    {
        List<MapTableInfo> objMapInfoList = new List<MapTableInfo>();
        DataSet dataSet = new DataSet();
        StringBuilder declareVariable = new StringBuilder();
        public string BuildInsertSQL(DataSet dataSets)
        {
            dataSet = dataSets;
            StringBuilder script = new StringBuilder();
            int datatableLength = dataSet.Tables.Count;
            if (datatableLength > 0)
            {
                DataTable MapTable = dataSet.Tables[0];
                objMapInfoList = MapTable.AsEnumerable().Select(dataRow => new MapTableInfo
                {
                    TableName = dataRow.Field<string>("TableName"),
                    ForeignTable = dataRow.Field<string>("ForeignTable"),
                    TableNo = dataRow.Field<int>("TableNo"),
                    Variable = dataRow.Field<string>("Variable"),
                    CompareColumn = dataRow.Field<int>("CompareColumn"),
                    DependentTable = dataRow.Field<int>("DependentTable"),
                    DependentTableColumn = dataRow.Field<int>("DependentTableColumn"),
                    ExistenceCheck = dataRow.Field<string>("ExistenceCheck"),
                    ExistenceCheckCol = dataRow.Field<string>("ExistenceCheckCol"),
                    Untouched = true,
                    AutoIncrement = true
                }).ToList();
                foreach (MapTableInfo objMap in objMapInfoList)
                {
                    if (objMap.Untouched)
                    {
                        script.Append(BuildInsert(dataSet.Tables[objMap.TableNo], objMap, "0", string.Empty, "0"));
                    }
                }
            }
            return declareVariable.ToString() + script.ToString();
        }
        private string BuildInsert(DataTable table, MapTableInfo objMap, string checkID, string newVariable, string parentCounter)
        {
            StringBuilder sql = new StringBuilder();
            sql.Append(InsertIntoScriptClose(InsertIntoScriptOpen(table.Columns, objMap), table.Columns, table.Rows, objMap, checkID, newVariable, parentCounter));
            return sql.ToString();
        }
        private string InsertIntoScriptOpen(DataColumnCollection dataColumn, MapTableInfo objMap)
        {
            StringBuilder sql = new StringBuilder("INSERT INTO " + objMap.TableName + " (");
            StringBuilder values = new StringBuilder("VALUES (");
            if (objMap.TableName == "UserModulePermission")
            {
                string test = string.Empty;
            }
            bool bFirst = true;
            int i = 0;
            if (objMap.AutoIncrement)
            {
                i = 1;
            }
            int colLen = dataColumn.Count;
            for (; i < colLen; i++)
            {
                if (bFirst)
                    bFirst = false;
                else
                {
                    sql.Append(", ");
                    values.Append(", ");
                }
                sql.Append(dataColumn[i].ColumnName);
            }
            sql.Append(") ");
            return sql.ToString();
        }
        private string InsertIntoScriptClose(string openScript, DataColumnCollection dataColumn, DataRowCollection dataRow, MapTableInfo objMap, string checkID, string newVariable, string parentCounter)
        {
            //Update the touched table in original list
            foreach (MapTableInfo item in objMapInfoList)
            {
                if (item.TableName == objMap.TableName)
                    item.Untouched = false;
            }
            StringBuilder values = new StringBuilder();
            int variableCounter = 0;
            foreach (DataRow row in dataRow)
            {
                bool moveFurther = false;
                if (checkID == "0")
                {
                    moveFurther = true;
                }
                else
                {
                    if (row.ItemArray[objMap.CompareColumn].ToString() == checkID)
                    {
                        moveFurther = true;
                    }
                }
                if (moveFurther)
                {
                    StringBuilder insert = new StringBuilder();
                    List<string> datatype = GetDataType(dataColumn);
                    insert.Append(openScript);
                    insert.Append("VALUES (");
                    int len = row.ItemArray.Length;
                    int i = 0;
                    string identityValue = string.Empty;

                    if (objMap.AutoIncrement)
                    {
                        i = 1;
                        identityValue = row.ItemArray[0].ToString();
                    }
                    List<string> valuesList = new List<string>();
                    for (; i < len; i++)
                    {
                        if (i == objMap.CompareColumn && checkID != "0")
                            valuesList.Add(newVariable);
                        else
                        {
                            valuesList.Add(changeDataType(row.ItemArray[i], datatype[i]));
                        }
                    }
                    insert.Append(string.Join(",", valuesList));

                    insert.Append(") ");
                    insert.Append(Environment.NewLine);
                    //values.Append(insert);
                    if (objMap.Variable != string.Empty)
                    {
                        string newVar = objMap.Variable + "_" + variableCounter + "_" + parentCounter;
                        //update if  one table has two table dependencies
                        if (objMap.DependentTable > 0)
                        {
                            UpdateDependenttable(objMap.DependentTable, objMap.DependentTableColumn, newVar, identityValue);
                        }
                        values.Append(CheckForExistency(insert.ToString(), newVar, objMap, row, datatype, newVariable));
                        if (newVar != string.Empty)
                        {
                            declareVariable.Append("Declare ");
                            declareVariable.Append(newVar);
                            declareVariable.Append(" int;");
                            declareVariable.Append(Environment.NewLine);
                        }
                        //getanotherTable
                        if (objMap.ForeignTable != string.Empty)
                        {
                            List<MapTableInfo> objMapLists = SearchTable(objMap.ForeignTable);
                            foreach (MapTableInfo objMapInfo in objMapLists)
                            {
                                values.Append(BuildInsert(dataSet.Tables[objMapInfo.TableNo], objMapInfo, identityValue, newVar, variableCounter + "_" + parentCounter));
                            }
                        }
                        variableCounter++;
                    }
                }
            }
            return values.ToString();
        }
        private void UpdateDependenttable(int tableNo, int colNo, string newVariable, string oldValue)
        {
            DataRowCollection rowCollection = dataSet.Tables[tableNo].Rows;
            int rowLength = rowCollection.Count;
            for (int i = 0; i < rowLength; i++)
            {
                if (rowCollection[i].ItemArray[colNo].ToString() == oldValue)
                {
                    dataSet.Tables[tableNo].Rows[i][colNo] = newVariable;
                    dataSet.Tables[tableNo].AcceptChanges();
                }
            }
        }
        private string CheckForExistency(string insertQuery, string newVariable, MapTableInfo objTable, DataRow row, List<string> datatype, string oldvar)
        {
            string condition = " WHERE " + GenerateCondition(objTable.ExistenceCheck, objTable.ExistenceCheckCol, row, datatype, oldvar);
            StringBuilder check = new StringBuilder();
            check.Append(Environment.NewLine);
            check.Append("IF(NOT EXISTS (SELECT 1 FROM ");
            check.Append(objTable.TableName);
            check.Append(condition);
            check.Append("))");
            check.Append("BEGIN ");
            check.Append(Environment.NewLine);
            check.Append(insertQuery);
            check.Append("Set " + newVariable + "= SCOPE_IDENTITY()");
            check.Append("END ");
            check.Append(Environment.NewLine);
            check.Append("ELSE ");
            check.Append(Environment.NewLine);
            check.Append("BEGIN ");
            //codition
            check.Append("SELECT " + newVariable + " = " + objTable.Variable.Substring(1) + " FROM " + objTable.TableName + " ");
            check.Append(condition);
            check.Append(Environment.NewLine);
            check.Append("END");
            check.Append(Environment.NewLine);
            return check.ToString();
        }
        private string GenerateCondition(string existenceCheck, string existenceCheckCol, DataRow row, List<string> datatype, string newVariable)
        {
            StringBuilder condition = new StringBuilder();
            string[] key = existenceCheck.Split(',');
            string[] value = existenceCheckCol.Split(',');
            int length = key.Length;
            for (int i = 0; i < length; i++)
            {
                if (i != 0)
                    condition.Append(" AND ");
                condition.Append(key[i]);
                condition.Append("=");
                object dynamicValue = string.Empty;
                int position = 0;
                string[] vars = value[i].Split('#');
                position = int.Parse(vars[0]);
                string dataType = "String";
                if (vars.Length > 1)
                {
                    dynamicValue = newVariable;
                }
                else
                {
                    dynamicValue = row.ItemArray[position];
                    dataType = datatype[position];
                }
                //newVariable replace
                condition.Append(changeDataType(dynamicValue, dataType));
            }
            return condition.ToString();
        }
        private List<string> GetDataType(DataColumnCollection dataColumn)
        {
            List<string> datatype = new List<string>();
            int colLen = dataColumn.Count;
            for (int i = 0; i < colLen; i++)
            {
                datatype.Add(dataColumn[i].DataType.Name.ToString());
            }
            return datatype;
        }
        private string changeDataType(dynamic value, string dataType)
        {
            if (value is System.DBNull)
            {
                value = "NULL";
            }
            else
            {
                try
                {
                    switch (dataType)
                    {
                        case "Boolean":
                            if (value == true)
                                value = "1";
                            else
                                value = "0";
                            break;
                        case "Guid":
                            value = "N'" + value + "'";
                            break;
                        case "String":
                            Regex regex = new Regex(@"@[A-Za-z]+(_+\d)+");
                            Match match = regex.Match(Convert.ToString(value));
                            if (!match.Success)
                                value = "N'" + value + "'";
                            break;
                        case "DateTime":
                            value = "GetDate()";
                            break;
                        case "Int16":
                        case "Int32":
                        case "Int64":
                        case "Decimal":
                            value = Convert.ToString(value);// value.toString();
                            break;
                    }
                }
                catch
                {
                    throw;
                }
            }
            //possible datata Types
            //Boolean,Byte,Char,DateTime,Decimal,Double,Int16,Int32,Int64,SByte,Single,String,TimeSpan,UInt16,UInt32,UInt64
            return value;
        }
        private List<MapTableInfo> SearchTable(string foreignTable)
        {
            List<MapTableInfo> objMapList = new List<MapTableInfo>();
            string[] tempTable = foreignTable.Split(',');
            foreach (MapTableInfo objMap in objMapInfoList)
            {
                foreach (string tblname in tempTable)
                {
                    if (objMap.TableName == tblname)
                    {
                        objMapList.Add(objMap);
                    }
                }
            }
            return objMapList;
        }

        public string BindExtraScript(string script, string applicationName)
        {
            StringBuilder scriptString = new StringBuilder();
            scriptString.Append("DECLARE @MaxPageID INT");
            scriptString.Append(Environment.NewLine);
            scriptString.Append("SELECT @MaxPageID = MAX(PageID) FROM Pages");
            scriptString.Append(Environment.NewLine);
            scriptString.Append(script);
            scriptString.Append(Environment.NewLine);
            scriptString.Append("DECLARE @PageList TABLE(PageID int)");
            scriptString.Append(Environment.NewLine);
            scriptString.Append("DECLARE @LinkID INT");
            scriptString.Append(Environment.NewLine);
            scriptString.Append("INSERT INTO @PageList ");
            scriptString.Append(Environment.NewLine);
            scriptString.Append("SELECT PageID FROM pages WHERE PageID NOT IN (SELECT PageID FROM dbo.PageMenu) AND PageID > @MaxPageID");
            scriptString.Append(Environment.NewLine);
            scriptString.Append("INSERT INTO dbo.DashboardLink ( LinkTitle ,PageID ,IsActive ,UserModuleID ,PortalID ,CultureCode ,DisplayOrder ,IsParent ,ParentLinkID)");
            scriptString.Append(Environment.NewLine);
            scriptString.Append("VALUES  ( N'");
            scriptString.Append(applicationName);
            scriptString.Append("',0 ,1 ,2310 , 1 , N'en-US', 0 , 1 ,0 )");
            scriptString.Append(Environment.NewLine);
            scriptString.Append("SET @LinkID = SCOPE_IDENTITY()");
            scriptString.Append(Environment.NewLine);
            scriptString.Append("UPDATE dbo.DashboardLink SET ParentLinkID = @LinkID WHERE PageID IN (SELECT PageID FROM @PageList)");
            scriptString.Append(Environment.NewLine);
            scriptString.Append("INSERT INTO dbo.PageMenu");
            scriptString.Append(Environment.NewLine);
            scriptString.Append("SELECT PageID,1,1,0,1 FROM pages WHERE PageID NOT IN (SELECT PageID FROM dbo.PageMenu) AND PageID > @MaxPageID");
            scriptString.Append(Environment.NewLine);
            scriptString.Append("INSERT INTO dbo.PagePreview");
            scriptString.Append(Environment.NewLine);
            scriptString.Append("SELECT PageID,NEWID() FROM pages WHERE PageID NOT IN (SELECT PageID FROM dbo.PagePreview) AND PageID > @MaxPageID");
            scriptString.Append(Environment.NewLine);
            return scriptString.ToString();
        }
    }
    public class MapTableInfo
    {
        public string TableName { get; set; }
        public string ForeignTable { get; set; }
        public int TableNo { get; set; }
        public bool Untouched { get; set; }
        public string Variable { get; set; }
        public bool AutoIncrement { get; set; }
        public int CompareColumn { get; set; }
        public int DependentTable { get; set; }
        public int DependentTableColumn { get; set; }
        public string ExistenceCheck { get; set; }
        public string ExistenceCheckCol { get; set; }

    }
}
