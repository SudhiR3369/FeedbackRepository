var image_album = {
    "image album": {
        "componentname": "image album",
        "category": "pro",
        "icon": "fas fa-images",
        "row": true,
        "hidden": false,
        "collection": false,
        "type": "image album",
        "defaultdata": EasyLibrary.ReadDOM('image album/imageAlbumView'),
        "beforedrop": function ($appendedparent, $appendLayer, dropped) {
            var dom = DOMCreate('div data-rootfolder= "Media" data-mediareadlocation="medialocation" data-parentfolder', EasyLibrary.ReadDOM('image album/albumList'), 'sfCol_100', 'albumListing');
           
           // ImageAlbum.UIEvents();
            FullPagePopup({
                data: dom,
                heading: "Album List",
                showheading: true,
                width: "75%"
            });
            var albumDOM = EasyLibrary.ReadDOM('image album/album');

            $('#btnAddNewAlbum').on('click', function () {
                var rootfolderPath = $('#albumListing').attr('data-rootfolder');
                var name = ImageAlbum.GetUniqueName('New Album');
                var $albumDOM = $('<div class="album noimage sfCol_20" data-path="' + rootfolderPath + '\\' + name + '">' + albumDOM + '</div>');

               // if('.')

                $('#divAlbumList').prepend($albumDOM);                
                $albumDOM.find('.editableFolderName').show();
                $albumDOM.find('.openfolder.folderName').hide().text(name);
               // ImageAlbum.AddNewAlbum(name, rootfolderPath);
                $albumDOM.find('.txtEditableFolderName').focus().select().val(name);
                $albumDOM.find('.txtEditableFolderName').attr('data-oldname', name);
                $albumDOM.find('.txtEditableFolderName').attr('data-changed', 'ongoing');
               // ImageAlbum.GetAlbumHerarchy();



            });

            
            var ImageAlbum={
                 config : {
                    method: '',
                    url: '',
                    baseURL:SageFrameAppPath + "/Modules/WebBuilder/services/ImageAlbum.asmx/",
                    type: 'POST',
                    data: '{}',
                    ajaxSuccess: '',
                    ajaxFailure: '',
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    ajaxCallMode:''
                },

               //  UIEvents: function () {
                    

               //  },
                 GetUniqueName: function (name) {
                     $('.folderName').each(function (i, v) {
                         var fName = $(this).text().trim();
                         if (fName.trim().toLowerCase() === name.trim().toLowerCase()) {
                             var names = name.split('_');
                             if (names.length > 1) {
                                 count = parseInt(names[1]);
                                 count++;
                             }
                             else {
                                 count = 1;
                             }
                             name = names[0] + "_" + count;
                             name = ImageAlbum.GetUniqueName(name);
                         }
                     });
                     return name;
                 },

                 GetAlbumList: function (albumName, rootfolderPath) {
                     var obj =
                         {
                             AlbumName: albumName,
                             AlbumPath: rootfolderPath,
                             
                         };
                     this.config.method = "GetAllAlbum";
                     this.config.url = this.config.baseURL + this.config.method;
                     this.config.data = this.config.data;
                     this.config.async = false;
                     this.config.ajaxCallMode = 2;
                     this.ajaxCall(this.config);
                 },

                 AddNewAlbum:function(albumName,rootfolderPath){
                     var objAlbum = {
                         AlbumName: albumName,
                         AlbumPath: rootfolderPath + '\\' + albumName
                     };
                     this.config.method = "AddNewAlbum";
                     this.config.url = this.config.baseURL + this.config.method;
                     this.config.data = JSON.stringify({
                         objAlbum: objAlbum
                     });
                     this.config.ajaxCallMode = 1;
                     this.ajaxCall(this.config);

                 },

                 SettingOpenEvent: function () {
                     $('.openSettings').off().on('click', function () {
                         var $this = $(this);
                         $('.move-target-wrap').hide();
                         if ($this.hasClass('open')) {
                             $('.type-action').removeClass('open');
                             $('.type-action.open').hide();
                             $('.openSettings').removeClass('open');
                         }
                         else {
                             $('.type-action.open').hide();
                             $('.type-action').removeClass('open');
                             $('.openSettings').removeClass('open');
                             var $prev = $this.prev();
                             $prev.show().addClass('open');
                             $this.addClass('open');
                         }
                     });
                 },

                 CalculateDimension:function(){
                     var perRow = 5;
                     var length = $('.noimage').length;
                     var remaining = length % perRow;
                     var width = $('.noimage').width();
                     var margin = 0;
                     if (remaining != 0)
                         margin = (perRow - remaining) * width;
                     $('.noimage').last().css({
                         'margin-right': margin
                     });
                 },


                 ajaxCall: function (config) {
                     $.ajax({
                         type: ImageAlbum.config.type,
                         contentType: ImageAlbum.config.contentType,
                         async: ImageAlbum.config.async,
                         cache: ImageAlbum.config.cache,
                         url: ImageAlbum.config.url,
                         data: ImageAlbum.config.data,
                         dataType: ImageAlbum.config.dataType,
                         success: ImageAlbum.ajaxSuccess,
                         error: ImageAlbum.ajaxFailure
                     });
                 },
                 ajaxFailure:function(){
                     alert('Kuch toh gadhbadh hai Daya!!');
                 },

                 ajaxSuccess: function (data) {
                     switch (ImageAlbum.config.ajaxCallMode) {
                         case 1:
                             //$('.spnDupCategory').hide();
                             //if (!data.d || data.d == 'false') {
                             //    var rootFolderPath = $('#albumListing').attr('data-rootfolder');
                             //    if (rootFolderPath.length > 0) {
                             //        Media.SelectImage();
                             //        $('#ulCategory').remove();
                             //        Media.CalculateDimension();
                             //    }
                             //}
                             //else {
                             //    $('.spnDupCategory').show();
                             //}
                             
                             alert("Album Added Successfully.");
                            
                     }
                 }                

            }
            
        }
    }

}