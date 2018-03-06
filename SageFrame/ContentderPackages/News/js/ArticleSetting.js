var ArticleSetting = {};
var ArticleMasterSettings = null;


(function () {
    if (ArticleMasterSettings == null) {
        ArticleMasterSettings = {
            dateSetting: "DD, dd MM, yy ",
            nameSetting: "1",
            detailPageSetting: "",
            authorProfilePage:""
        };
    }
    ArticleSetting = {
        ChangeDateFormat: function (date) {

            var date = $.datepicker.formatDate(ArticleMasterSettings.dateSetting, new Date(date));
            return date;
        },
        ChangeAuthorNameFormat: function (authorName) {
            var authorName = authorName.split(',');
            var name = "";
            var newAuthName = [];
            var condition = parseInt(ArticleMasterSettings.nameSetting);
            switch (condition) {
                case 0:
                    if (authorName != null) {
                        $.each(authorName, function (key, value) {
                            name = value.split('#');
                            name = name[0] + " " + name[1];
                            newAuthName.push(name);
                        });
                    }
                    break;
                case 1:
                    if (authorName != null) {
                        $.each(authorName, function (key, value) {
                            name = value.split('#');
                            name = name[1] + " " + name[0];
                            newAuthName.push(name);
                        });
                    }
                    break;
                default:
                    if (authorName != null) {
                        $.each(authorName, function (key, value) {
                            name = value.split('#');
                            name = name[0] + " " + name[1];
                            newAuthName.push(name);
                        });
                    }
                    break;
            }
            return newAuthName.join();
        },
        AuthorProfileLink: function (userName)
        {
            if (EditorMode)
                return SageFrameHostURL + "/WebBuilder/" + ArticleMasterSettings.authorProfilePage + "/author/" + userName;
            else
                return SageFrameHostURL + "/" + ArticleMasterSettings.authorProfilePage + "/author/" + userName;
        },
        GetDetailsURL: function (articleID, title) {
            var slug = ArticleSetting.stringToSlug(title);
            if(EditorMode)
               return SageFrameHostURL + '/WebBuilder/' + ArticleMasterSettings.detailPageSetting + '/article/' + articleID + '/' + slug;
            else
                return SageFrameHostURL + '/' + ArticleMasterSettings.detailPageSetting + '/article/' + articleID + '/' + slug;
        },

        stringToSlug: function (title) {
            return title.toLowerCase().trim()
                .replace(/\s+/g, '-')          
                .replace(/&/g, '-and-')         
                .replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'‘’<>,.\/? ])+/g, '-') 
                .replace(/\-\-+/g, '-')        
        }
    }

})();
function SetNewsSettingData() {
    var data = GetSingleAPIResult("NewsSettings");
    if (data != null && data.length>0) {
       data = JSON2.parse(data);
       $.extend(ArticleMasterSettings, data);
    }
}