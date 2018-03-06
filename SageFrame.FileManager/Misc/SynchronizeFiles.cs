using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;


namespace SageFrame.FileManager
{
    
    public class SynchronizeFiles
    {
        #region "Declaration"
        public static string UserName { get; set; }
        public static int PortalID { get; set; }
        public static string absolutePath { get; set; }
        #endregion

        /// <summary>
        /// The list of folders in the database is fetched at once into this
        /// </summary>
        public static List<Folder> lstFolders { get; set; }
        
        /// <summary>
        /// Gets or sets file extensions.
        /// </summary>
        public static string extensions { get; set; }
        /// <summary>
        /// Gets or sets for valid extension.
        /// </summary>
        /// <param name="ext">ext</param>
        /// <returns>True if extension is valid.</returns>
        public static bool IsExtensionValid(string ext)
        {
            string[] arrExt = extensions.Split(',');
            if (arrExt.Contains(ext) || arrExt.Contains(ext.Substring(1,ext.Length-1)))
                return true;
            else return false;
        }

      
        public  static string GetFolderPath(string folderPath)
        {
            return(FileManagerHelper.ReplaceBackSlash(folderPath.Replace(absolutePath,"")));
            
        }
    }
}
