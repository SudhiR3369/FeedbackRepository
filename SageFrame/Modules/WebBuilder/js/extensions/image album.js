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
        "beforedrop": function ($appendedparent, $appendLayer, dropped, duplicated) {
            //  console.log($appendLayer)

        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped, duplicated) {
            //console.log($appendedParent);
            var sweet = $appendLayer.parent();
            var domAlbum = EasyLibrary.ReadDOM('image album/albumList');// DOMCreate('div ', EasyLibrary.ReadDOM('image album/albumList'), 'sfCol_100', 'albumListing');
            var domImage = EasyLibrary.ReadDOM('image album/imageView');
            var imagePath, imageName, imageExtension;
            // ImageAlbum.UIEvents();


            FullPagePopup({
                data: domAlbum,
                heading: "Album List",
                showheading: true,
                width: "90%"
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
                SetViewImages: function () {
                    $('.slcForView').on('click', function () {
                        var albumID = $(this).attr('data-id');
                        ImageAlbum.GetImageList(albumID);
                    })
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

                AlbumSettingOpenEvent: function () {
                    $('.openAlbumSettings').off().on('click', function () {

                        var $this = $(this);

                        if ($this.hasClass('open')) {
                            $('.type-action.open').hide();
                            $('.type-action').removeClass('open');
                            $('.openAlbumSettings').removeClass('open');
                        }
                        else {
                            $('.type-action.open').hide();
                            $('.type-action').hide();
                            $('.type-action').removeClass('open');
                            $('.openAlbumSettings').removeClass('open');
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
                        $('.openAlbumSettings.open').removeClass('open');

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
                        $('.openAlbumSettings.open').removeClass('open');

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

                ImageListEvent: function () {
                    $('.album.noimage').find('img').dblclick(function () {
                        $('.albumPart').hide();
                        $('.imagePart').show();
                        $('.imageList').show();
                        var $this = $(this);
                        var id = $this.attr('data-id');

                        $('.imageList').attr('album-id', id);

                        ImageAlbum.GetImageList(id);
                        ImageEvents.AddImageEvent();
                        ImageEvents.ImageHover(id);
                        ImageEvents.ImageDeleteEvent(id);
                    });
                },

                AddImageEvent: function () {
                    $('.btnAddImages').off('click').on('click', function () {

                        var $this = $(this);
                        var id = $('.imagePart').find('.imageList').attr('album-id');
                        $this.SageMedia({
                            userModuleID: webBuilderUserModuleID,
                            onSelect: function (src, response, type, filename, extension) {
                                src = src.replace(/\\/g, '');
                                imagePath = src;
                                imageName = filename;
                                imageExtension = extension;

                                ImageAlbum.AddNewImage(id, imageName, imagePath, imageExtension);
                                ImageAlbum.GetImageList(id);
                                ImageEvents.ImageHover(id);
                                ImageEvents.ImageDeleteEvent(id);

                            },
                            mediaType: 'image',
                        });
                        $('.imageList').show();
                    });

                    $('.btnBackToAlbumList').on('click', function () {
                        $('.albumPart').show();
                        $('.imagePart').hide();
                        // ImageAlbum.GetAlbumList();
                    });
                },

                ImageDeleteEvent: function (albumID) {
                    $('.deleteImage').off('click').on('click', function (e) {
                        e.preventDefault();
                        var $this = $(this);
                        var ImgId = $this.attr('data-id');
                        SageConfirmDialog("Delete garesi farkera aaudaina hai maya!!").done(function () {
                            {
                                ImageAlbum.DeleteImage(ImgId);
                                ImageAlbum.GetImageList(albumID);
                                ImageEvents.ImageHover(albumID);

                            }
                        });
                    });

                },

                ImageHover: function (albumID) {
                    $('.listImage').mouseover(function () {
                        $(this).find('.deleteImage').show();
                        ImageEvents.ImageDeleteEvent(albumID);

                    });

                    $('.listImage').mouseout(function () {
                        $(this).find('.deleteImage').hide();
                    });
                },
                //ImageOpen: function (data) {
                //    $('.imageClass').on('click', function () {
                //        $('.imageList').hide();
                //        var id = $(this).attr('data-id');
                //        var src = $(this).attr('src');
                //        //var nextbtn = '<span class="next-btn imageNext"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>';
                //        //var prevbtn = '<span class="prev-btn"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>';
                //        var imgSlider = data.d;
                //        var prevClone = $('.previewImage').children().clone()
                //        console.log(prevClone);

                //        var html = '';
                //        if (imgSlider.length > 0) {
                //            $.each(imgSlider, function (index, item) {
                //                html += prevClone + '<img  src=' + item.ImagePath + ' width:600px; height:400px;/>';
                //            });                                
                //        }
                //        else {
                //            html += '<div><h2 align="center">**********No Image To Display**********</h2></div>';
                //        }
                //        $('#previewImage').html(html);

                //        $('.itemsWrapper').css("height", "400px");
                //        $('.ImageSliderWrapper').css("display", "");


                //        //debugger
                //        var findSliderWrapper = $('.previewImage').find('.ImageSliderWrapper');
                //        InitCarouselSlider(findSliderWrapper);



                //    });

                //    function PreviewImage(imageWrapper) {
                //        //$('.previewImage').html('<img class="closePreview" src="' + src + ' " width:90%; />').fadeIn(300);
                //        //var ImageClass = $appendedparent.find('.ImageSliderWrapper');
                //        //if (ImageClass.$appendedparent.hasClass('binded'))
                //        //{
                //        //    $appendedparent.removeClass('binded');
                //        //}
                //        InitCarouselSlider(imageWrapper);
                //    }



                //    $('.previewImage').find('.closePreview').dblclick(function () {
                //        $('.previewImage').hide();
                //        $('.imageList').show();
                //    });

                //  $('.next-btn.imageNext').on('click', function () {
                //      alert("register hune raicha!!");
                //  });

                //}
            }

            var ShowOnView = function () {
                if (dropped) {
                    if ($appendLayer.hasClass('site-body')) {
                        var $imageSlider = $('.ImageSliderWrapper');
                        $imageSlider.removeClass('binded');
                        $imageSlider.each(function (index, value) {
                            var carousel = new CarouselInit($(this));
                        });
                    } else {
                        $appendLayer.find('.ImageSliderWrapper').removeClass('binded');
                        var carousel = new CarouselInit($appendLayer);
                    }
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

                DeleteImage: function (id) {
                    this.config.method = "DeleteImage";
                    this.config.url = this.config.baseURL + this.config.method;
                    this.config.data = JSON.stringify({
                        ImageID: id
                    });
                    this.config.ajaxCallMode = 5;
                    this.ajaxCall(this.config);

                },


                BindAlbumList: function (data) {
                    var html = '';
                    var albumList = data.d;
                    if (albumList.length > 0) {
                        $.each(albumList, function (index, item) {
                            html += '<div  style="padding-top:10px; padding-left: 5px; padding-right: 5px;" class="album noimage sfCol_25 selectData"';
                            html += '<div class="field-row clearfix"  data-type="album">';
                            html += ' <div id="divAlbum" data-type="image" class="sfCol_100">';
                            html += ' <span><img style="border:5px solid black;" data-id=' + item.AlbumID + '  src="/Media/albumimg.jpg" class="editor-image sfCol_100"></span>'
                            html += '<div class="type-action" style="display:none;"> <ul class="type-action-list" >';
                            html += '<li data-id=' + item.AlbumID + ' class="slcForView actions"><span><i class="fa fa-eye" aria-hidden="true"></i>Select For View</span></li>';
                            html += '<li class="renamealbum actions"><span><i class="fa fa-font" aria-hidden="true"></i>Rename</span></li>';
                            html += '<li data-id=' + item.AlbumID + '  class="deleteMedia actions"><span class="delete-item"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span></li></ul></div>';
                            html += ' <span class="openAlbumSettings fa fa-ellipsis-h"></span></div>';
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

                    $('.openAlbumSettings').css({
                        "cursor": "pointer"
                    })
                    $('.album.noimage').find('img').css("cursor", "pointer");


                },

                BindImageList: function (data) {
                    var html = '';
                    var imageList = data.d;
                    var count = 0;

                    if (imageList.length > 0) {
                        $.each(imageList, function (index, item) {
                            //
                            //  html += '<div  style="padding-top:10px; padding-left: 5px; padding-right: 5px; width: 279px; height: 157px; display: block;" data-w="1920" data-h="1080" class="imageGrid sfCol_20 selectData">';                             

                            html += '<li data-type="image" class="listImage  sfCol_20" style="padding-top:20px; padding-left:5px; padding-right: 5px; width: 279px; height: 187px;">';
                            html += '<div class="sfCol_100" style="width:100%; height:100%; padding-top:20px; padding-left:5px; padding-right: 5px;" >'
                            html += '<span style="display:none; float:right;" data-id=' + item.ImageID + ' class="deleteImage"><i class="fa fa-trash-o" aria-hidden="true"></i></span>';
                            html += '<img data-id=' + item.ImageID + ' src="' + item.ImagePath + '" class="imageClass">';
                            html += '<div class="imageName"><label style="text-align:center;">"' + item.ImageName + '"</label></div></div></li>'

                            //html += ' <ul class="type-action-list" style="display:none;" >';                             
                            //html += '<li data-id=' + item.ImageID + '  class="deleteImage actions"><span class="delete-item"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span></li>';


                            //   html += '</div>';

                        });
                    }
                    else {
                        html += '<div><h2 align="center">**********No Image To Display**********</h2></div>';
                    }
                    $('.ulImage').html(html);

                    $('.imageGrid').find('img').css({
                        "cursor": "pointer"
                    })
                    // ImageEvents.ImageOpen(data);
                },
                BindImageToView: function (data) {
                    var html = '';
                    var imageList = data.d;                    

                    if (imageList.length > 0) {
                        $.each(imageList, function (index, item) {
                            html += '<li class="itemWrapper">'
                            html += '<img data-id=' + item.ImageID + ' src="' + item.ImagePath + '" class="imageClass"></li>';

                        });
                    }
                    else {
                        html += '<li class="itemWrapper"><h2 align="center">**********No Image To Display**********</h2></li>';
                    }
                    $appendLayer.find('.itemsWrapper.viewImages').html(html);
                    ShowOnView();
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
                            AlbumEvents.SetViewImages();
                            AlbumEvents.AlbumSettingOpenEvent();
                            ImageEvents.ImageListEvent();
                            break;

                        case 3:
                            //  alert('Updated Successfully');
                            ImageAlbum.GetAlbumList();
                            break;

                        case 4:
                            ImageAlbum.GetAlbumList();
                            break;

                        case 5:

                            break;

                        case 6:
                            ImageAlbum.BindImageList(data);
                            ImageEvents.ImageHover();
                            ImageAlbum.BindImageToView(data);
                            break;
                    }
                }

            }

        }
    }

}
