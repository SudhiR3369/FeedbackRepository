#region "Copyright"

/*
FOR FURTHER DETAILS ABOUT LICENSING, PLEASE VISIT "LICENSE.txt" INSIDE THE SAGEFRAME FOLDER
*/

#endregion

#region "References"

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Web.UI.WebControls;
using SageFrame.Setting;
using System.Drawing.Drawing2D;
using System.Text.RegularExpressions;

//using AjaxControlToolkit;

#endregion


namespace SageFrame.Web
{
    /// <summary>
    /// PictureManager class provides properties for  image manipulation
    /// </summary>
    public static class PictureManager
    {
        /// <summary>
        /// Returns image path including file name which is formed by combining image name with prefix provided.
        /// </summary>
        /// <param name="imageType">Image type.</param>
        /// <param name="prefix">File name prefix.</param>
        /// <param name="localImagePath">Local image Path.</param>
        /// <returns>New image path.</returns>
        public static string GetImagePathWithFileName(int imageType, string prefix, string localImagePath)
        {
            string SavePath = string.Empty;
            string localFilename = string.Empty;
            if (string.IsNullOrEmpty(prefix))
            {
                prefix = "img";
            }
            localFilename = prefix;
            switch (imageType)
            {
                case 1:
                    SavePath = Path.Combine(PictureManager.LocalMediumThumbImagePath, localFilename);
                    break;
                case 2:
                    SavePath = Path.Combine(localImagePath, localFilename);
                    break;
                case 3:
                    SavePath = Path.Combine(localImagePath, localFilename);
                    break;
            }

            return SavePath;
        }

        /// <summary>
        /// Returns unique File name for any give file name in the application.
        /// </summary>
        /// <param name="prefix">Prefix.</param>
        /// <returns>unique file name.</returns>
        public static string GetFileName(string prefix)
        {
            string strFileName = string.Empty;
            strFileName = prefix + "_" + DateTime.Now.ToString().Replace(" ", "").Replace("/", "").Replace(":", "");
            return strFileName;
        }

        /// <summary>
        /// Saves image for the given location.
        /// </summary>
        /// <param name="Fu">File Uploader.</param>
        /// <param name="prefix">Image prefix.</param>
        /// <param name="localImagePath">Local file path.</param>
        /// <returns>Returns the saved file path.</returns>
        public static string SaveImage(FileUpload Fu, string prefix, string localImagePath)
        {
            if (!Directory.Exists(localImagePath))
                Directory.CreateDirectory(localImagePath);
            string strImage = string.Empty;
            string SavePath = string.Empty;
            //SavePath = GetImagePathWithFileName(3, prefix, localImagePath);
            SavePath = localImagePath;
            SavePath += '\\' + prefix;
            Fu.SaveAs(SavePath);
            Fu.FileContent.Dispose();
            strImage = SavePath;
            //Fu.PostedFile.ContentLength
            return strImage;
        }
        public static void CreateThmnail(string strImage, int width, int height, string SavePath)
        {
            //Bitmap b = new Bitmap(strImage);
            //Size newSize = CalculateDimensions(b.Size, TargetSize);
            //if (newSize.Width < 1)
            //    newSize.Width = 1;
            //if (newSize.Height < 1)
            //    newSize.Height = 1;
            //b.Dispose();
            var newWidth = width;
            var newHeight = height;
            var thumbnailImg = new Bitmap(newWidth, newHeight);
            var thumbGraph = Graphics.FromImage(thumbnailImg);
            thumbGraph.CompositingQuality = CompositingQuality.HighQuality;
            thumbGraph.SmoothingMode = SmoothingMode.HighQuality;
            thumbGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;
            var imageRectangle = new Rectangle(0, 0, newWidth, newHeight);
            System.Drawing.Image image = System.Drawing.Image.FromFile(strImage);
            thumbGraph.DrawImage(image, imageRectangle);
            thumbnailImg.Save(SavePath, image.RawFormat);
            thumbnailImg.Dispose();
            thumbGraph.Dispose();
            image.Dispose();

        }
        /// <summary>
        /// Creats thumbnail for any image and returns 
        /// </summary>
        /// <param name="strImage">Local image full path upto image.</param>
        /// <param name="TargetSize">Targeted  file size.</param>
        /// <param name="SavePath">Save Path.</param>
        public static void CreateThmnail(string strImage, int TargetSize, string SavePath)
        {
            Bitmap b = new Bitmap(strImage);
            Size newSize = CalculateDimensions(b.Size, TargetSize);
            if (newSize.Width < 1)
                newSize.Width = 1;
            if (newSize.Height < 1)
                newSize.Height = 1;
            b.Dispose();
            var newWidth = (int)(newSize.Width);
            var newHeight = (int)(newSize.Height);
            var thumbnailImg = new Bitmap(newWidth, newHeight);
            var thumbGraph = Graphics.FromImage(thumbnailImg);
            thumbGraph.CompositingQuality = CompositingQuality.HighQuality;
            thumbGraph.SmoothingMode = SmoothingMode.HighQuality;
            thumbGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;
            var imageRectangle = new Rectangle(0, 0, newWidth, newHeight);
            System.Drawing.Image image = System.Drawing.Image.FromFile(strImage);
            thumbGraph.DrawImage(image, imageRectangle);
            thumbnailImg.Save(SavePath, image.RawFormat);
            thumbnailImg.Dispose();
            thumbGraph.Dispose();
            image.Dispose();

        }

        /// <summary>
        /// Calculates the targeted dimension of the image. The new size will be in proportion to targeted size.
        /// </summary>
        /// <param name="OriginalSize">Original size of the image.</param>
        /// <param name="TargetSize">Targeted size of the image</param>
        /// <returns></returns>
        public static Size CalculateDimensions(Size OriginalSize, int TargetSize)
        {
            Size newSize = new Size();
            if (OriginalSize.Height > OriginalSize.Width) // portrait 
            {
                newSize.Width = (int)(OriginalSize.Width * (float)(TargetSize / (float)OriginalSize.Height));
                newSize.Height = TargetSize;
            }
            else // landscape or square
            {
                newSize.Height = (int)(OriginalSize.Height * (float)(TargetSize / (float)OriginalSize.Width));
                newSize.Width = TargetSize;
            }
            return newSize;
        }

        /// <summary>
        /// Crop the image in the given height and width.
        /// </summary>
        /// <param name="strImage">Image full path.</param>
        /// <param name="dblImgHt">New image height.</param>
        /// <param name="dblImgWd">New image width.</param>
        /// <returns>Image in bitmap format.</returns>
        public static System.Drawing.Image ScaleByPercent(string strImage, double dblImgHt, double dblImgWd)
        {
            Bitmap imgRetPhoto = null;
            double dblWdRatio, dblHtRatio;

            try
            {
                imgRetPhoto = new Bitmap(strImage);
                if (imgRetPhoto.Height > Convert.ToInt32(dblImgHt) || imgRetPhoto.Width > Convert.ToInt32(dblImgWd))
                {
                    if (imgRetPhoto.Height > dblImgHt)
                    {
                        dblHtRatio = dblImgHt / Convert.ToDouble(imgRetPhoto.Height);
                        dblWdRatio = Convert.ToDouble(imgRetPhoto.Width) * dblHtRatio;
                        imgRetPhoto = new Bitmap(imgRetPhoto, Convert.ToInt32(dblWdRatio), Convert.ToInt32(dblImgHt));
                        imgRetPhoto.SetResolution(imgRetPhoto.HorizontalResolution, imgRetPhoto.VerticalResolution);
                    }

                    if (imgRetPhoto.Width > dblImgWd)
                    {
                        dblWdRatio = dblImgWd / Convert.ToDouble(imgRetPhoto.Width);
                        dblHtRatio = Convert.ToDouble(imgRetPhoto.Height) * dblWdRatio;
                        imgRetPhoto = new Bitmap(imgRetPhoto, Convert.ToInt32(dblImgWd), Convert.ToInt32(dblHtRatio));
                        imgRetPhoto.SetResolution(imgRetPhoto.HorizontalResolution, imgRetPhoto.VerticalResolution);
                    }
                    return imgRetPhoto;
                }
                else
                    return imgRetPhoto;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Only Scales an image by percentage of the original Image and saves to destination path
        /// </summary>
        /// <param name="imageSrcPath">Image full source Path</param>
        /// <param name="percentage">scaling Percentage between 0 and 100</param>
        /// <param name="imagSavePath">Image full SavePath</param>
        public static void ScaleImage(string imageSrcPath, double percentage, string imagSavePath)
        {
            try
            {
                Bitmap imgScalePhoto = new Bitmap(imageSrcPath);
                int originalImageHeight = imgScalePhoto.Size.Height;
                int originalImageWidth = imgScalePhoto.Size.Width;
                if (originalImageHeight > 0 && originalImageWidth > 0)
                {
                    int newImageHeight = Convert.ToInt32((originalImageHeight * percentage) / 100);
                    int newImageWidth = Convert.ToInt32((originalImageWidth * percentage) / 100);
                    Bitmap newImageScale = new Bitmap(imgScalePhoto, newImageWidth, newImageHeight);
                    int newResolutionHorizontal = Convert.ToInt32((imgScalePhoto.HorizontalResolution * percentage) / 100);
                    int newResolutionVertical = Convert.ToInt32((imgScalePhoto.VerticalResolution * percentage) / 100);
                    newImageScale.SetResolution(newResolutionHorizontal, newResolutionVertical);
                    newImageScale.Save(imagSavePath, imgScalePhoto.RawFormat);
                    newImageScale.Dispose();
                    imgScalePhoto.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        /// <summary>
        /// Scales an image by percentage of the original Image and saves to destination path optimizing with encoding quality
        /// </summary>
        /// <param name="imageSrcPath">Image full source path</param>
        /// <param name="imagSavePath">Image full savePath</param>
        /// <param name="percentage">Scaling percentage between 0 and 100</param>
        /// <param name="quality">Encoding value</param>
        public static void ScaleAndOptimizeImage(string imageSrcPath, string imagSavePath, double percentage, long quality)
        {
            try
            {
                Bitmap imgScalePhoto = new Bitmap(imageSrcPath);
                int originalImageHeight = imgScalePhoto.Size.Height;
                int originalImageWidth = imgScalePhoto.Size.Width;
                if (originalImageHeight > 0 && originalImageWidth > 0)
                {
                    int newImageHeight = Convert.ToInt32((originalImageHeight * percentage) / 100);
                    int newImageWidth = Convert.ToInt32((originalImageWidth * percentage) / 100);
                    Bitmap newImageScale = new Bitmap(imgScalePhoto, newImageWidth, newImageHeight);
                    int newResolutionHorizontal = Convert.ToInt32((imgScalePhoto.HorizontalResolution * percentage) / 100);
                    int newResolutionVertical = Convert.ToInt32((imgScalePhoto.VerticalResolution * percentage) / 100);
                    newImageScale.SetResolution(newResolutionHorizontal, newResolutionVertical);
                    EncoderParameters parameters = new EncoderParameters(1);
                    parameters.Param[0] = new EncoderParameter(Encoder.Quality, quality);
                    newImageScale.Save(imagSavePath, GetCodecInfo("image/jpeg"), parameters);
                    newImageScale.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        /// <summary>
        /// Optimize an image from a source to destination with encoding quality
        /// </summary>
        /// <param name="imageSrcPath">Image full source path</param>
        /// <param name="imgDestinationPath">Image full destination path</param>
        /// <param name="quality">Encoding value</param>
        public static void OptimizeImage(string imageSrcPath, string imgDestinationPath, long quality)
        {
            Bitmap imgScalePhoto = new Bitmap(imageSrcPath);
            CompressAndSaveImage(imgScalePhoto, imgDestinationPath, quality);
        }

        /// <summary>
        /// Optimize an Image object to destination with encoding quality
        /// </summary>
        /// <param name="img">on Instance of Image class</param>
        /// <param name="imgDestinationPath">Image full destination path</param>
        /// <param name="quality">Encoding value</param>
        public static void CompressAndSaveImage(System.Drawing.Image img, string imgDestinationPath, long quality)
        {
            try
            {
                EncoderParameters parameters = new EncoderParameters(1);
                parameters.Param[0] = new EncoderParameter(Encoder.Quality, quality);
                img.Save(imgDestinationPath, GetCodecInfo("image/jpeg"), parameters);
                img.Dispose();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public static ImageCodecInfo GetCodecInfo(string mimeType)
        {
            foreach (ImageCodecInfo encoder in ImageCodecInfo.GetImageEncoders())
                if (encoder.MimeType == mimeType)
                    return encoder;
            throw new ArgumentOutOfRangeException(
                string.Format("'{0}' not supported", mimeType));
        }

        public static Bitmap ScaleByPercent(string strImage, double percentage)
        {
            Bitmap imgRetPhoto = null;
            try
            {
                int newImageHeight = 0;
                int newImageWidth = 0;
                imgRetPhoto = new Bitmap(strImage);
                if (percentage > 0 && percentage < 0)
                {
                    newImageHeight = Convert.ToInt32((imgRetPhoto.Height * percentage) / 100);
                    newImageWidth = Convert.ToInt32((imgRetPhoto.Width * percentage) / 100);
                    imgRetPhoto = new Bitmap(imgRetPhoto, newImageWidth, newImageHeight);
                    imgRetPhoto.SetResolution(imgRetPhoto.HorizontalResolution, imgRetPhoto.VerticalResolution);
                }
                return imgRetPhoto;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public static Bitmap ScaleByPercent(Bitmap imgRetPhoto, int newImageWidth, int newImageHeight)
        {
            try
            {
                if (newImageWidth > 0 && newImageHeight > 0)
                {
                    imgRetPhoto = new Bitmap(imgRetPhoto, newImageWidth, newImageHeight);
                    imgRetPhoto.SetResolution(imgRetPhoto.HorizontalResolution, imgRetPhoto.VerticalResolution);
                }
                return imgRetPhoto;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Checks the extenstion of the icon
        /// </summary>
        /// <param name="extension">Extension.</param>
        /// <returns>True if the extension is valid icon extension.</returns>
        public static bool IsValidIconContentType(string extension)
        {
            // array of allowed file type extensions
            string[] validFileExtensions = { "jpg", "jpeg", "jpe", "gif", "bmp", "png", "swf", "ico" };
            var flag = false;
            // loop over the valid file extensions to compare them with uploaded file
            for (var index = 0; index < validFileExtensions.Length; index++)
            {
                if (extension.ToLower() == validFileExtensions[index].ToString().ToLower())
                {
                    flag = true;
                }
            }
            return flag;
        }

        /// <summary>
        /// Checks the image extension if it is valid to upload
        /// </summary>
        /// <param name="filename">Image name.</param>
        /// <returns>True if the file has valid extension.</returns>
        public static bool ValidImageExtension(string fileName)
        {
            return Regex.IsMatch(fileName.ToLower(), @"^.*\.(jpg|gif|jpeg|swf|ico|png|bmp)$");
        }

        /// <summary>
        /// Checks the file extension if it is valid to upload
        /// </summary>
        /// <param name="fileName">File name.</param>
        /// <returns>True if the file extension is valid.</returns>
        public static bool ValidFileExtension(string fileName)
        {
            return Regex.IsMatch(fileName.ToLower(), @"^.*\.(css|html|xml|ascx|js|config)$");
        }

        /// <summary>
        /// Checks the image mime type if the mime type is valid.
        /// </summary>
        /// <param name="extension">Mime type.</param>
        /// <returns>True if the mime type is valid.</returns>
        public static bool IsValidIImageTypeWitMime(string extension)
        {
            // array of allowed file type extensions
            string[] validFileExtensions = { "image/jpg", "image/jpeg", "image/jpe", "image/gif", "image/png" };
            var flag = false;
            // loop over the valid file extensions to compare them with uploaded file
            for (var index = 0; index < validFileExtensions.Length; index++)
            {
                if (extension.ToLower() == validFileExtensions[index].ToString().ToLower())
                {
                    flag = true;
                }
            }
            return flag;
        }

        /// <summary>
        ///  Checks if the image path has valid file extension.
        /// </summary>
        /// <param name="imagePath">Image path.</param>
        /// <returns>True if the image has valid extesion.</returns>
        public static bool IsVAlidImageContentType(string imagePath)
        {
            // extract and store the file extension into another variable
            // array of allowed file type extensions
            string[] validFileExtensions = { "jpg", "jpeg", "jpe", "gif", "bmp", "png", "swf", "ico" };
            var flag = false;
            //String fileExtension = imagePath.Substring(imagePath.Length - 3, 3);
            if (imagePath.Contains("."))
            {
                String fileExtension = imagePath.Substring(imagePath.LastIndexOf(".") + 1);
                // loop over the valid file extensions to compare them with uploaded file
                for (var index = 0; index < validFileExtensions.Length; index++)
                {
                    if (fileExtension.ToLower() == validFileExtensions[index].ToString().ToLower())
                    {
                        flag = true;
                    }
                }
            }
            return flag;
        }

        /// <summary>
        /// Gets a local medium thumb image path
        /// </summary>
        /// 
        public static string LocalMediumThumbImagePath
        {
            get
            {
                string path = HttpContext.Current.Request.PhysicalApplicationPath + "bdimages\\mediumthumb";
                return path;
            }
        }

        /// <summary>
        /// Gets a local small thumb image path
        /// </summary>
        public static string LocalSmallThumbImagePath
        {
            get
            {
                string path = HttpContext.Current.Request.PhysicalApplicationPath + "bdimages\\Smallthumbs";
                return path;
            }
        }

        /// <summary>
        /// Gets the local image path
        /// </summary>
        public static string LocalImagePath
        {
            get
            {
                string path = HttpContext.Current.Request.PhysicalApplicationPath + "bdimages";
                return path;
            }
            set
            {
                string path = value;

            }
        }

        /// <summary>
        /// Creates medium thumbnail.
        /// </summary>
        /// <param name="strImage">Image name.</param>
        /// <param name="PortalID">Portal ID.</param>
        /// <param name="prefix">Image Prefix.</param>
        /// <param name="localImagePath">Local image path.</param>
        /// <param name="imageSize">Image size.</param>
        /// <returns>Saved medium thumbnail path.</returns>
        public static string CreateMediumThumnail(string strImage, int PortalID, string prefix, string localImagePath, int imageSize)
        {
            if (!Directory.Exists(localImagePath))
                Directory.CreateDirectory(localImagePath);
            string SavePath = string.Empty;
            //SavePath = GetImagePathWithFileName(1, prefix, localImagePath);
            SavePath = localImagePath;
            SavePath += strImage.Substring(strImage.LastIndexOf("\\"));
            //int imageSize = 200;
            CreateThmnail(strImage, imageSize, SavePath);
            return SavePath;
        }

        /// <summary>
        /// Creates small thumbnail.
        /// </summary>
        /// <param name="strImage">Image name.</param>
        /// <param name="PortalID">Portal ID.</param>
        /// <param name="prefix">Image Prefix.</param>
        /// <param name="localImagePath">Local image path.</param>
        /// <param name="imageSize">Image size.</param>
        /// <returns>Saved medium thumbnail path.</returns>
        public static string CreateSmallThumnail(string strImage, int PortalID, string prefix, string localImagePath, int imageSize)
        {
            if (!Directory.Exists(localImagePath))
                Directory.CreateDirectory(localImagePath);
            string SavePath = string.Empty;
            //SavePath = GetImagePathWithFileName(2, prefix, localImagePath);
            SavePath = localImagePath;
            SavePath += strImage.Substring(strImage.LastIndexOf("\\"));
            //int imageSize = 125;
            CreateThmnail(strImage, imageSize, SavePath);
            return SavePath;
        }

        public static string SaveBase64Image(string filePath, string fileName, string base64Image)
        {
            try
            {
                string serverRootPath = HttpContext.Current.Server.MapPath(@"~\").ToLower();
                string baseLocation = serverRootPath + filePath;
                //System.Drawing.Image image = Base64ToImage(base64Image.Replace("data:image/jpeg;base64,", ""));
                //filePath += "/" + fileName;
                //image.Save(filePath);

                byte[] fileByte = Convert.FromBase64String(base64Image);
                using (FileStream _FileStream = new FileStream(baseLocation + fileName, FileMode.Create, FileAccess.Write))
                {
                    _FileStream.Write(fileByte, 0, fileByte.Length);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return filePath + fileName;
        }


        public static System.Drawing.Image Base64ToImage(string base64String)
        {
            // Convert base 64 string to byte[]
            byte[] imageBytes = Convert.FromBase64String(base64String);
            // Convert byte[] to Image
            using (var ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
            {
                System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
                return image;
            }
        }

        public static void DeleteImage(string filePath)
        {
            try
            {
                string serverRootPath = HttpContext.Current.Server.MapPath(@"~\").ToLower();
                string baseLocation = serverRootPath + filePath;
                if (File.Exists(baseLocation))
                {
                    File.Delete(baseLocation);
                }
            }
            catch { }
        }
        public static void DeleteImageByFullPath(string baseLocation)
        {
            try
            {
                if (File.Exists(baseLocation))
                {
                    File.Delete(baseLocation);
                }
            }
            catch { }
        }

        [Obsolete("Not in Use In SageFrame2.1")]
        public static string CreateCategoryMediumThumnail(string strImage, int PortalID, string prefix, string localImagePath)
        {
            string SavePath = string.Empty;
            SavePath = GetImagePathWithFileName(1, prefix, localImagePath);
            SavePath += strImage.Substring(strImage.LastIndexOf("."));
            //int imageSidge = Int32.Parse(dbSetting.sp_SettingPortalBySettingID((int)SettingKey.Media_Category_Medium_ThumbnailImageSize, PortalID).SingleOrDefault().Value);
            //CreateThmnail(strImage, imageSidge, SavePath);
            return SavePath;
        }

        //public static string NewFileName(string fileName, string strBaseLocation)
        //{
        //    string newFileName = fileName;
        //    if (DuplicateFolderName(fileName, strBaseLocation))
        //    {
        //        string fileNameOnly = Path.GetFileNameWithoutExtension(fileName);
        //        if (Regex.IsMatch(fileNameOnly, @"^[\w\-. ]+$") && fileNameOnly.Length < 50)
        //        {
        //            fileNameOnly += "_" + getDate();
        //        }
        //        else
        //        {
        //            fileNameOnly = "1_" + getDate();
        //        }
        //        newFileName = fileNameOnly + Path.GetExtension(fileName);
        //    }
        //    return newFileName;
        //}
        public static string NewFileName(string fileName, string strBaseLocation)
        {
            //making .png.png.png to _png_png_png
            string fileNameOnly = Path.GetFileNameWithoutExtension(fileName).Replace(".", "_");
            string fileExtension = Path.GetExtension(fileName);
            fileName = fileNameOnly + fileExtension;
            //If filename is longer 
            if (fileNameOnly.Length > 40)
            {
                fileNameOnly = fileNameOnly.Substring(0, 40);
                fileName = fileNameOnly + fileExtension;
            }
            //if File name already exists
            string folder = HttpContext.Current.Server.MapPath("~/" + strBaseLocation);
            if (File.Exists(folder + fileName))
            {
                fileName = RenameFile(fileNameOnly);
                fileName = fileName + fileExtension;
                if (File.Exists(folder + fileName))
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

        private static string getDate()
        {
            return DateTime.Now.ToString("yyyy_MM_dd_HH_mm_ss");
        }

        private static bool DuplicateFolderName(string fileName, string strBaseLocation)
        {
            string folder = HttpContext.Current.Server.MapPath("~/" + strBaseLocation);
            var file = Directory.GetFiles(folder, fileName, SearchOption.AllDirectories)
                        .FirstOrDefault();
            if (file == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        [Obsolete("Not in Use In SageFrame2.1")]
        public static string CreateCategorySmallThumnail(string strImage, int PortalID, string prefix, string localImagePath)
        {
            string SavePath = string.Empty;
            SavePath = GetImagePathWithFileName(2, prefix, localImagePath);
            SavePath += strImage.Substring(strImage.LastIndexOf("."));
            //int imageSidge = Int32.Parse(dbSetting.sp_SettingPortalBySettingID((int)SettingKey.Media_Category_Small_ThumbnailImageSize, PortalID).SingleOrDefault().Value);
            //CreateThmnail(strImage, imageSidge, SavePath);
            return SavePath;
        }
    }
}
