using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace SageFrame.MediaManagement
{
    public class MediaHelper
    {
        static string serverRootPath = HttpContext.Current.Server.MapPath(@"~\");
        //static string[] systemDirectories = { "administrator" ,"app_images", "app_scripts", "bin", "config", "controls", "core", "css",
        // "editors,", "install","js","optimized","resources","sagin","services","temp","xmlmessage" }
        static string[] systemDirectories = { "" };
        public static bool CreateCategory(string destinationDirectory)
        {
            // MediaConst objMediaConst = new MediaConst();
            bool exists = true;
            try
            {
                destinationDirectory = serverRootPath + destinationDirectory;
                exists = CreateDirectory(destinationDirectory);
                //MediaConst = MediaConstantsKeys.Exists;
            }
            catch
            {

            }
            return exists;
        }
        public static void CreateCategoryWithFullPath(string destinationDirectoryfullPath)
        {
            try
            {
                CreateDirectory(destinationDirectoryfullPath);
            }
            catch { }
        }
        private static bool CreateDirectory(string destinationDirectory)
        {
            bool exists = true;
            if (!Directory.Exists(destinationDirectory))
            {
                Directory.CreateDirectory(destinationDirectory);
                exists = false;
            }
            else
                exists = true;
            return exists;

        }
        public static string[] ReadDirectory(string destinationDirectory)
        {
            destinationDirectory = serverRootPath + destinationDirectory;
            if (Directory.Exists(destinationDirectory))
            {
                string[] directoryList = Directory.GetDirectories(destinationDirectory).OrderByDescending(d => new FileInfo(d).CreationTime).ToArray();
                int dirCount = directoryList.Length;
                string[] newDirectoryList = new string[dirCount];
                for (int i = 0; i < dirCount; i++)
                {
                    newDirectoryList[i] = directoryList[i].Replace(serverRootPath, string.Empty);
                }
                return newDirectoryList;
            }
            else
            {
                return new string[0];
            }
        }
        public static string[] ReadDirectoryAndFiles(string destinationDirectory)
        {
            destinationDirectory = serverRootPath + destinationDirectory;
            if (Directory.Exists(destinationDirectory))
            {
                string[] directoryList = Directory.GetDirectories(destinationDirectory).OrderByDescending(d => new FileInfo(d).CreationTime).ToArray();
                string[] fileList = Directory.GetFiles(destinationDirectory).OrderByDescending(d => new FileInfo(d).CreationTime).ToArray();

                int dirCount = directoryList.Length;
                int fileCount = fileList.Length;
                int totalFilesAndFolder = dirCount + fileCount;
                string[] newDirectoryList = new string[totalFilesAndFolder];
                for (int i = 0; i < dirCount; i++)
                {
                    newDirectoryList[i] = directoryList[i].Replace(serverRootPath, string.Empty);
                }
                for (int i = 0; i < fileCount; i++)
                {
                    newDirectoryList[dirCount + i] = fileList[i].Replace(serverRootPath, string.Empty);
                }
                return newDirectoryList;
            }
            else
            {
                return new string[0];
            }
        }
        public static string[] FileterDirectoryAndFiles(string destinationDirectory, string filter)
        {
            destinationDirectory = serverRootPath + destinationDirectory;
            if (Directory.Exists(destinationDirectory))
            {
                string[] directoryList = Directory.GetDirectories(destinationDirectory, filter).OrderByDescending(d => new FileInfo(d).CreationTime).ToArray();
                string[] fileList = Directory.GetFiles(destinationDirectory, filter).OrderByDescending(d => new FileInfo(d).CreationTime).ToArray();

                int dirCount = directoryList.Length;
                int fileCount = fileList.Length;
                int totalFilesAndFolder = dirCount + fileCount;
                string[] newDirectoryList = new string[totalFilesAndFolder];
                for (int i = 0; i < dirCount; i++)
                {
                    newDirectoryList[i] = directoryList[i].Replace(serverRootPath, string.Empty);
                }
                for (int i = 0; i < fileCount; i++)
                {
                    newDirectoryList[dirCount + i] = fileList[i].Replace(serverRootPath, string.Empty);
                }
                return newDirectoryList;
            }
            else
            {
                return new string[0];
            }
        }
        public static string[] ReadDirectoryAndFiles(string destinationDirectory, string exceptFolders, string[] extensions)
        {
            destinationDirectory = serverRootPath + destinationDirectory;
            if (Directory.Exists(destinationDirectory))
            {
                string[] directoryList = Directory.GetDirectories(destinationDirectory).OrderByDescending(d => new FileInfo(d).CreationTime).ToArray();
                string[] fileList = Directory.GetFiles(destinationDirectory).OrderByDescending(d => new FileInfo(d).CreationTime).ToArray();
                int dirCount = directoryList.Length;
                int fileCount = fileList.Length;
                int totalFilesAndFolder = dirCount + fileCount;
                string[] newDirectoryList = new string[totalFilesAndFolder];
                for (int i = 0; i < dirCount; i++)
                {

                    newDirectoryList[i]= directoryList[i].Replace(serverRootPath, string.Empty);

                    //if we need to compare  not to create folder like temp, bin etc.
                    //bool dirNotExists = true;
                    //string dir = directoryList[i].Replace(serverRootPath, string.Empty);
                    //foreach (string systemDirectory in systemDirectories)
                    //{
                    //    if (dir.Contains(systemDirectory))
                    //    {
                    //        dirNotExists = false;
                    //    }
                    //}
                    //if (dirNotExists)
                    //{
                    //    newDirectoryList[i] = dir;
                    //}

                }
                for (int i = 0; i < fileCount; i++)
                {
                    foreach (string extension in extensions)
                    {
                        string filePath = fileList[i].Replace(serverRootPath, string.Empty);
                        string ext = GetFileExtension(filePath);
                        if (ext == extension)
                        {
                            newDirectoryList[dirCount + i] = fileList[i].Replace(serverRootPath, string.Empty);
                        }
                    }
                }
                return newDirectoryList;
            }
            else
            {
                return new string[0];
            }
        }
        public static string GetFileExtension(string fileName)
        {
            return Path.GetExtension(fileName).Replace(".", "");
        }
        private static void ReadDirectoryOnly(string destinationDirectory)
        {

        }
        public int DownloadAndSaveImage(string downloadUrl, string downLoadPath)
        {
            int result = 0;
            try
            {
                downLoadPath = serverRootPath + downLoadPath;
                bool folderExists = Directory.Exists(downLoadPath);
                if (!folderExists)
                    Directory.CreateDirectory(downLoadPath);
                string currentDateTime = DateTime.Now.ToString().Replace('/', '_').Replace(':', '_').Replace(' ', '_');
                var fileName = "Dload_" + currentDateTime + ".jpeg";
                string savePath = downLoadPath + "/" + fileName;
                using (WebClient client = new WebClient())
                {
                    client.DownloadFile(new Uri(downloadUrl), savePath);
                    result = 1;
                }
            }
            catch (Exception)
            {
                throw;
            }
            return result;
        }
        public static string GetDirHerarchy(string destinationDirectory)
        {
            StringBuilder html = new StringBuilder();
            destinationDirectory = serverRootPath + destinationDirectory;
            if (Directory.Exists(destinationDirectory))
            {
                html.Append("<ul class='mediaCategoryHierrarchy' style='display: none;'>");
                string[] directoryList = Directory.GetDirectories(destinationDirectory).OrderByDescending(d => new FileInfo(d).CreationTime).ToArray();
                int dirCount = directoryList.Length;
                string dirName = Path.GetFileName(destinationDirectory);
                if (dirCount == 0)
                {
                    html.Append("<li>");
                    html.Append("<span class='folderherarchy' data-path='" + dirName + "'>");
                    html.Append(dirName);
                    html.Append("</span>");
                    html.Append("</li>");
                }
                else
                {
                    html.Append("<li>");
                    html.Append("<span class='folderherarchy'  data-path='" + dirName + "'>");
                    html.Append(dirName);
                    html.Append("</span>");
                    html.Append("<ul>");
                    for (int i = 0; i < dirCount; i++)
                    {
                        html.Append(GetDirList(directoryList[i], dirName));
                    }
                    html.Append("</ul>");
                    html.Append("</li>");

                }
                html.Append("</ul>");
            }
            return html.ToString();
        }
        private static string GetDirList(string destinationDirectory, string dirName)
        {
            StringBuilder html = new StringBuilder();
            if (Directory.Exists(destinationDirectory))
            {
                string folderName = Path.GetFileName(destinationDirectory);
                string[] directoryList = Directory.GetDirectories(destinationDirectory).OrderByDescending(d => new FileInfo(d).CreationTime).ToArray();
                dirName = dirName + "/" + folderName;
                int dirCount = directoryList.Length;
                if (dirCount == 0)
                {
                    html.Append("<li>");
                    html.Append("<span class='folderherarchy' data-path='" + dirName + "'>");
                    html.Append(folderName);
                    html.Append("</span>");

                    html.Append("</li>");
                }
                else
                {
                    html.Append("<li>");
                    html.Append("<span class='folderherarchy'  data-path='" + dirName + "'>");
                    html.Append(folderName);
                    html.Append("</span>");
                    html.Append("<ul>");

                    for (int i = 0; i < dirCount; i++)
                    {
                        html.Append(GetDirList(directoryList[i], dirName));
                    }
                    html.Append("</ul>");
                    html.Append("</li>");
                }
            }
            return html.ToString();
        }
        public static string MoveMediaFile(string src, string dest)
        {
            src = serverRootPath + src;
            dest = serverRootPath + dest;
            string message = string.Empty;
            try
            {
                if (File.Exists(dest))
                {
                    string fileName = Path.GetFileName(dest);
                    string destDirName = Path.GetDirectoryName(dest) + "/";
                    string newFileName = NewFileName(fileName, destDirName);
                    dest = Path.Combine(destDirName, newFileName);
                }
                File.Move(src, dest);
            }
            catch (Exception ex)
            {
                message = ex.ToString();
            }
            return message;
        }
        public static string CopyMediaFile(string src, string dest)
        {
            src = serverRootPath + src;
            dest = serverRootPath + dest;
            string message = string.Empty;
            try
            {
                File.Copy(src, dest, true);
            }
            catch (Exception ex)
            {
                message = ex.ToString();
            }
            return message;
        }
        public static string DeleteMediaFile(string src)
        {
            string message = string.Empty;
            if (src.Length > 0)
            {
                src = serverRootPath + src;
                try
                {
                    File.Delete(src);
                }
                catch (Exception ex)
                {
                    message = ex.ToString();
                }
            }
            else
            {
                message = "path not available";
            }
            return message;
        }
        public static string DeleteMediaCategory(string src)
        {
            string message = string.Empty;
            if (src.Length > 0)
            {
                src = serverRootPath + src;
                try
                {
                    Directory.Delete(src, true);
                }
                catch (Exception ex)
                {
                    message = ex.ToString();
                }
            }
            else
            {
                message = "path not available";
            }
            return message;
        }
        public static string MoveMediaCategory(string src, string dest)
        {
            src = serverRootPath + src;
            dest = serverRootPath + dest;
            string message = string.Empty;
            try
            {
                if (Directory.Exists(src))
                {
                    if (Directory.Exists(dest))
                    {
                        DirectoryMerge(src, dest);
                        Directory.Delete(src, true);
                    }
                    else
                    {
                        Directory.Move(src, dest);
                    }
                }
            }
            catch (Exception ex)
            {
                message = ex.ToString();
            }
            return message;
        }
        public static string CopyMediaCategory(string src, string dest)
        {
            src = serverRootPath + src;
            dest = serverRootPath + dest;
            string message = string.Empty;
            try
            {
                if (Directory.Exists(src))
                {
                    if (!Directory.Exists(dest))
                    {
                        DirectoryCopy(src, dest, true);
                    }
                }
            }
            catch (Exception ex)
            {
                message = ex.ToString();
            }
            return message;
        }
        //taken from https://msdn.microsoft.com/en-us/library/bb762914(v=vs.110).aspx
        private static void DirectoryCopy(string sourceDirName, string destDirName, bool copySubDirs)
        {
            // Get the subdirectories for the specified directory.
            DirectoryInfo dir = new DirectoryInfo(sourceDirName);

            if (!dir.Exists)
            {
                throw new DirectoryNotFoundException(
                    "Source directory does not exist or could not be found: "
                    + sourceDirName);
            }

            DirectoryInfo[] dirs = dir.GetDirectories();
            // If the destination directory doesn't exist, create it.
            if (!Directory.Exists(destDirName))
            {
                Directory.CreateDirectory(destDirName);
            }
            // Get the files in the directory and copy them to the new location.
            FileInfo[] files = dir.GetFiles();
            foreach (FileInfo file in files)
            {
                string temppath = Path.Combine(destDirName, file.Name);
                file.CopyTo(temppath, false);
            }
            // If copying subdirectories, copy them and their contents to new location.
            if (copySubDirs)
            {
                foreach (DirectoryInfo subdir in dirs)
                {
                    string temppath = Path.Combine(destDirName, subdir.Name);
                    DirectoryCopy(subdir.FullName, temppath, copySubDirs);
                }
            }
        }
        private static void DirectoryMerge(string sourceDirName, string destDirName)
        {
            // Get the subdirectories for the specified directory.
            DirectoryInfo dir = new DirectoryInfo(sourceDirName);

            if (!dir.Exists)
            {
                throw new DirectoryNotFoundException(
                    "Source directory does not exist or could not be found: "
                    + sourceDirName);
            }

            // Get the files in the directory and copy them to the new location.
            FileInfo[] files = dir.GetFiles();
            foreach (FileInfo file in files)
            {
                string srcpath = Path.Combine(sourceDirName, file.Name);
                string destpath = Path.Combine(destDirName, file.Name);
                try
                {
                    if (File.Exists(destpath))
                    {
                        string newFileName = NewFileName(file.Name, destDirName + "/");
                        destpath = Path.Combine(destDirName, newFileName);
                    }
                    File.Move(srcpath, destpath);
                }
                catch { }
            }
            //move subdirectories 
            DirectoryInfo[] dirs = dir.GetDirectories();
            foreach (DirectoryInfo subdir in dirs)
            {
                string temppath = Path.Combine(destDirName, subdir.Name);
                DirectoryMerge(subdir.FullName, temppath);
            }
        }
        public static bool RenameCategory(string oldCategoryPath, string newCategoryPath)
        {
            bool status = false;
            try
            {
                Directory.Move(serverRootPath + oldCategoryPath, serverRootPath + newCategoryPath);
                status = true;
            }
            catch { }
            return status;
        }
        public static bool RenameFileName(string oldFilePath, string newFilePath)
        {
            bool status = false;
            try
            {
                File.Move(serverRootPath + oldFilePath, serverRootPath + newFilePath);
                status = true;
            }
            catch { }
            return status;
        }
        public static string NewFileName(string fileName, string strBaseLocation)
        {
            if (File.Exists(strBaseLocation + fileName))
            {
                string fileNameOnly = Path.GetFileNameWithoutExtension(fileName);
                string fileExtension = Path.GetExtension(fileName);
                fileName = RenameFile(fileNameOnly);
                fileName = fileName + fileExtension;
                if (File.Exists(strBaseLocation + fileName))
                {
                    fileName = NewFileName(fileName, strBaseLocation);
                }
            }
            return fileName;
        }
        public static string RenameFile(string fileName)
        {
            string[] names = fileName.Split('_');
            int count = 0;
            int length = names.Length;
            if (length > 1)
            {
                int.TryParse(names[length - 1], out count);
                count++;
                names[length - 1] = count.ToString();
                fileName = string.Join("_", names);
            }
            else
            {
                count++;
                fileName = fileName + "_" + count;
            }

            return fileName;
        }

    }
}