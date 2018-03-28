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
            if (dropped) {
                //  console.log($appendLayer)
                var domAlbum = EasyLibrary.ReadDOM('image album/albumList');// DOMCreate('div ', EasyLibrary.ReadDOM('image album/albumList'), 'sfCol_100', 'albumListing');
                var domImage = EasyLibrary.ReadDOM('image album/imageView');
                var imagePath, imageName, imageExtension;
                // ImageAlbum.UIEvents();

                FullPagePopup({
                    data: domAlbum,
                    heading: "Album List",
                    showheading: true,
                    width: "75%"
                });

                var albumDOM = EasyLibrary.ReadDOM('image album/album');

                $('.fullpage-popup-model-body').css({
                    "background-color": "#33ccff"
                });

                $('.btnAddNewAlbum').on('click', function () {

                    var name = AlbumEvents.GetUniqueName('New Album');
                    ImageAlbum.AddNewAlbum(name);

                });

                $('.btnGetAlbumList').on('click', function () {
                    ImageAlbum.GetAlbumList();
                })


                var AlbumEvents = {
                    GetUniqueName: function (name) {
                        $('.albumName').each(function (i, v) {
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
                                name = AlbumEvents.GetUniqueName(name);
                            }
                        });
                        return name;
                    },

                    SetAlbumName: function () {

                        $('.openalbum.albumName').hide();
                        $('.editableAlbumName').show();
                        //  $('.txtEditablealbumName').select();
                        //  $('.txtEditablealbumName').focus().select();
                        $('.txtEditableAlbumName').off('blur').on('blur', function (data) {
                            var albumList = data.d;
                            var $this = $(this);
                            var changedName = $this.val();
                            var id = $this.attr('data-id');
                            if (changedName != undefined && changedName != "") {
                                ImageAlbum.UpdateAlbumName(changedName, id);
                            }
                            else {
                                alert("Album Name is required.");
                            }
                        });
                    },

                    SettingOpenEvent: function () {
                        $('.openSettings').off().on('click', function () {

                            var $this = $(this);

                            if ($this.hasClass('open')) {
                                $('.type-action.open').hide();
                                $('.type-action').removeClass('open');
                                $('.openSettings').removeClass('open');
                            }
                            else {
                                $('.type-action.open').hide();
                                $('.type-action').hide();
                                $('.type-action').removeClass('open');
                                $('.openSettings').removeClass('open');
                                var $prev = $this.prev();
                                $prev.show().addClass('open');
                                $this.addClass('open');
                            }
                        });

                        AlbumEvents.RenameAlbum();
                        AlbumEvents.DeleteAlbumEvent();
                    },

                    RenameAlbum: function () {

                        $('.renamealbum').off('click').on('click', function () {
                            $('.type-action.open').hide();
                            $('.type-action.open').removeClass('open');
                            $('.openSettings.open').removeClass('open');

                            var $this = $(this);
                            // var id = $this.attr('data-id');
                            var $albumDOM = $this.parents('.album.noimage');
                            var $txtEditableAlbum = $albumDOM.find('.txtEditableAlbumName');

                            setTimeout(function () {
                                $txtEditableAlbum.focus();
                                $txtEditableAlbum.select();
                            }, 200);

                        });
                    },

                    DeleteAlbumEvent: function () {
                        $('.deleteMedia').off('click').on('click', function () {

                            $('.type-action.open').hide();
                            $('.type-action.open').removeClass('open');
                            $('.openSettings.open').removeClass('open');

                            var $this = $(this);
                            var id = $this.attr('data-id');

                            //jConfirm("Are you sure you want to delete?", 'Delete Album', function (r) {
                            //    if (r) {
                            //        ImageAlbum.DeleteAlbum(id);
                            //    }
                            //});

                            SageConfirmDialog("Delete garesi farkera aaudaina hai maya!!").done(function () {
                                {

                                    ImageAlbum.DeleteAlbum(id);
                                }
                            });
                        });

                    }
                }
                
                var ImageEvents = {
                    GetImagePart: function () {
                        $('.album.noimage').find('img').dblclick(function () {

                            $('.albumPart').hide();
                            $('.imagePart').show();
                            $('.imageList').show();
                            var $this = $(this);
                            var id = $this.attr('data-id');

                            $('.imageList').attr('album-id', id);
                            ImageAlbum.GetImageList(id);
                            ImageEvents.ImageOpen();
                            //FullPagePopup({
                            //    data: domImage,
                            //    heading: "Album List",
                            //    showheading: true,
                            //    width: "85%"
                            //});                         
                        });

                        $('.btnAddImages').off('click').on('click', function () {
                            var $this = $(this);
                            var id = $('.divbtnImage').next('div').attr('album-id');
                            $this.SageMedia({
                                userModuleID: webBuilderUserModuleID,
                                onSelect: function (src, response, type, filename, extension) {
                                    src = src.replace(/\\/g, '');
                                    imagePath = src;
                                    imageName = filename;
                                    imageExtension = extension;

                                    ImageAlbum.AddNewImage(id, imageName, imagePath,imageExtension);
                                    ImageAlbum.GetImageList(id);

                                },
                                mediaType: 'image',
                            });



                        });

                        $('.btnBackToAlbumList').on('click', function () {
                            $('.albumPart').show();
                            $('.imagePart').hide();
                           // ImageAlbum.GetAlbumList();
                        });
                    },
                    ImageOpen: function () {
                        $('.imageClass').one('click', function () {
                            $('.imageList').hide();
                            var id = $(this).attr('data-id');
                            var src = $(this).attr('src');
                            var nextbtn = '<span class="next-btn imageNext"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>';
                            var prevbtn = '<span class="prev-btn"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>';
                           
                            PreviewImage(src, nextbtn, prevbtn);
                            
                        });

                        function PreviewImage(src,nextbtn,prevbtn) {
                            $('.previewImage').load(prevbtn + '<img class="closePreview" src="' + src + ' " width:90%; />' + nextbtn).fadeIn(300);

                        }



                      $('.enlargeImage').find('.closePreview').dblclick(function () {
                            $('.enlargeImage').hide();
                            $('.imageList').show();
                        });

                      $('.next-btn.imageNext').on('click', function () {
                          alert("register hune raicha!!");
                      });

                    }
                }


                var ImageAlbum = {
                    config: {
                        method: '',
                        url: '',
                        baseURL: SageFrameAppPath + "/Modules/WebBuilder/services/ImageAlbum.asmx/",
                        type: 'POST',
                        data: '{}',
                        ajaxSuccess: '',
                        ajaxFailure: '',
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",
                        ajaxCallMode: ''
                    },

                    AddNewAlbum: function (albumName) {
                        var objAlbum = {
                            AlbumName: albumName
                            //  AlbumPath: rootalbumPath + '\\' + albumName
                        };
                        this.config.method = "AddNewAlbum";
                        this.config.url = this.config.baseURL + this.config.method;
                        this.config.data = JSON.stringify({
                            objAlbum: objAlbum
                        });
                        this.config.ajaxCallMode = 1;
                        this.ajaxCall(this.config);

                    },

                    AddNewImage: function (id, imageName, imagePath, imageExtension) {
                        var objImage = {
                            ImageName: imageName,
                            ImagePath: imagePath,
                            ImageExtension: imageExtension,
                            AlbumID: id
                        }
                        this.config.method = "AddImages";
                        this.config.url = this.config.baseURL + this.config.method;
                        this.config.data = JSON.stringify({
                            objImage: objImage
                        });
                        this.config.ajaxCallMode = 5;
                        this.ajaxCall(this.config);
                    },

                    GetAlbumList: function () {

                        this.config.method = "GetAllAlbum";
                        // this.config.type = 'GET';
                        this.config.url = this.config.baseURL + this.config.method;
                        //this.config.data = this.config.data;
                        this.config.async = false;
                        this.config.ajaxCallMode = 2;
                        this.ajaxCall(this.config);
                    },

                    GetImageList: function (id) {
                        this.config.method = "GetImages";
                        this.config.url = this.config.baseURL + this.config.method;
                        this.config.data = JSON.stringify({
                            AlbumID: id
                        });
                        this.config.async = false;
                        this.config.ajaxCallMode = 6;
                        this.ajaxCall(this.config);
                    },


                    UpdateAlbumName: function (changedName, id) {
                        var objAlbum = {
                            AlbumName: changedName,
                            AlbumID: id
                        }
                        this.config.method = 'UpdateAlbum';
                        this.config.url = this.config.baseURL + this.config.method;
                        this.config.data = JSON.stringify({
                            objAlbum: objAlbum
                        });
                        this.config.ajaxCallMode = 3;
                        this.ajaxCall(this.config);

                    },


                    DeleteAlbum: function (id) {
                        this.config.method = "DeleteAlbum";
                        this.config.url = this.config.baseURL + this.config.method;
                        this.config.data = JSON.stringify({
                            AlbumID: id
                        });
                        this.config.ajaxCallMode = 4;
                        this.ajaxCall(this.config);

                    },


                    BindAlbumList: function (data) {
                        var html = '';
                        var albumList = data.d;
                        if (albumList.length > 0) {
                            $.each(albumList, function (index, item) {
                                html += '<div  style="padding-top:10px; padding-left: 5px; padding-right: 5px;" class="album noimage sfCol_20 selectData"';
                                html += '<div class="field-row clearfix"  data-type="album">';
                                html += ' <div id="divAlbum" class="sfCol_100">';
                                html += ' <span><img style="border:5px solid black;" data-id=' + item.AlbumID + '  src="/Media/albumimg.jpg" class="editor-image sfCol_100"></span>'
                                html += '<div class="type-action" style="display:none;"> <ul class="type-action-list" >';
                                //   html += '<li class="selectalbum actions"><span><i class="fa fa-album-open-o" aria-hidden="true"></i>Open</span></li>';
                                html += '<li class="renamealbum actions"><span><i class="fa fa-font" aria-hidden="true"></i>Rename</span></li>';
                                html += '<li data-id=' + item.AlbumID + '  class="deleteMedia actions"><span class="delete-item"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span></li></ul></div>';
                                html += ' <span class="openSettings fa fa-ellipsis-h"></span></div>';
                                html += '<span class="openalbum albumName">' + item.AlbumName + '</span>';
                                html += '<span class="editableAlbumName" style="display:none;">';
                                html += '<input data-id=' + item.AlbumID + ' value="' + item.AlbumName + '" type="text" class="txtEditableAlbumName" /></span>';
                                html += '</div>';
                            });
                        }
                        else {
                            html += '<div><h2 align="center">**********No Album To Display**********</h2></div>';
                        }
                        $('.albumList').html(html);

                        $('.openSettings').css({
                            "cursor": "pointer"
                        })
                        $('.album.noimage').find('img').css({
                            "cursor": "pointer"
                        })

                    },

                    BindImageList: function (data) {
                        var html = '';
                        var imageList = data.d;

                        if (imageList.length > 0) {
                            $.each(imageList, function (index, item) {
                                html += '<div  style="padding-top:5px; padding-left: 5px; padding-right: 5px;" class="imageGrid  sfCol_20 selectData"';
                                html += '<div class="field-row clearfix"  data-type="album">';
                                html += ' <div data-type="image" class="frame type-img">';
                                html += ' <span><img data-id=' + item.ImageID + '  src="' + item.ImagePath + '" class="imageClass editor-image sfCol_100"></span></div></div>'
                                html += '</div>';
                            });
                        }
                        else {
                            html += '<div><h2 align="center">**********No Image To Display**********</h2></div>';
                        }
                        $('.imageList').html(html);

                        $('.imageGrid').find('img').css({
                            "cursor":"pointer"
                        })
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
                    ajaxFailure: function () {
                        alert('Kuch toh gadhbadh hai Daya!!');
                    },

                    ajaxSuccess: function (data) {
                        switch (ImageAlbum.config.ajaxCallMode) {
                            case 1:
                                ImageAlbum.GetAlbumList();
                                break;

                            case 2:
                                //alert("List aauna lagyo hai!!");
                                ImageAlbum.BindAlbumList(data);
                                AlbumEvents.SetAlbumName(data);
                                AlbumEvents.SettingOpenEvent();
                                ImageEvents.GetImagePart();
                                break;

                            case 3:
                                //  alert('Updated Successfully');
                                ImageAlbum.GetAlbumList();
                                break;

                            case 4:
                                ImageAlbum.GetAlbumList();
                                break;

                            case 5:
                               // alert('Image Added Successfully!!!');
                                break;

                            case 6:
                                ImageAlbum.BindImageList(data);
                                break;

                        }
                    }

                }



            }
        }
    }

}
