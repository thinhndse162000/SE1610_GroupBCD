         6       109StringToNumber,ParseUInt32,Read,GetCodeGenArgs,Main:FormatException:Input string was not in a correct format.         5      120111/03/2022 23:38:26.081: Using file D:\current\SWP391\workSpace\Clone for Git\Clone-1-11\SE1610_GroupBCD\SQL\sql_generator.py to communicate with the engine
11/03/2022 23:38:26.093: The expected arguments are: <localInstanceName> <dbid> <tableId> <remoteTableName> <jobType> <targetEditionType>
11/03/2022 23:38:26.102: FormatException:Input string was not in a correct format.
   at System.Number.StringToNumber(String str, NumberStyles options, NumberBuffer& number, NumberFormatInfo info, Boolean parseDecimal)
   at System.Number.ParseUInt32(String value, NumberStyles options, NumberFormatInfo numfmt)
   at Microsoft.SqlServer.Stretch.CodeGen.StretchCodeGenMessage.Read(StreamReader reader)
   at Microsoft.SqlServer.Stretch.CodeGen.Program.GetCodeGenArgs(String messageFileFullPath, Log log, String& localInstanceName, UInt64& dbId, Int64& tableId, String& remoteTableName, StretchCodeGenScriptGroupType& scriptGroupType, StretchCodeGenScriptTargetEditionType& targetEditionType)
   at Microsoft.SqlServer.Stretch.CodeGen.Program.Main(String[] args)
11/03/2022 23:38:26.102: The expected arguments are: <localInstanceName> <dbid> <tableId> <remoteTableName> <jobType> <targetEditionType>