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
                var imagePath;
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

                $('#btnAddNewAlbum').on('click', function () {

                    //var rootfolderPath = $('#albumListing').attr('data-rootfolder');

                    //var $albumDOM = $('<div data-id class="album noimage sfCol_20 selectData" data-path="' + rootfolderPath + '\\' + name + '">' + albumDOM + '</div>');

               
                    
                    var name = AlbumEvents.GetUniqueName('New Album');
                    ImageAlbum.AddNewAlbum(name);

                });

                $('#btnGetAlbumList').on('click', function () {
                    ImageAlbum.GetAlbumList();
                })


                var AlbumEvents = {
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
                                name = AlbumEvents.GetUniqueName(name);
                            }
                        });
                        return name;
                    },

                    SetAlbumName: function () {
                     


                        $('.openfolder.folderName').hide();
                        $('.editableFolderName').show();
                        //  $('.txtEditableFolderName').select();
                        //  $('.txtEditableFolderName').focus().select();
                        $('.txtEditableFolderName').off('blur').on('blur', function (data) {
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
                        
                        $('.renamefolder').off('click').on('click', function () {
                            $('.type-action.open').hide();
                            $('.type-action.open').removeClass('open');
                            $('.openSettings.open').removeClass('open');

                            var $this = $(this);
                           // var id = $this.attr('data-id');
                            var $albumDOM = $this.parents('.album.noimage');
                            var $txtEditableAlbum = $albumDOM.find('.txtEditableFolderName');                         
                                                                
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
                        $('img').on('click', function () {

                            $('.albumPart').hide();
                            $('.imagePart').show();
                            //FullPagePopup({
                            //    data: domImage,
                            //    heading: "Album List",
                            //    showheading: true,
                            //    width: "85%"
                            //});                         
                        });

                        $('#btnAddImages').on('click', function () {
                            var $this = $(this);
                            $this.SageMedia({
                                userModuleID: webBuilderUserModuleID,
                                onSelect: function (src, response, type, filename, extension) {
                                    src = src.replace(/\\/g, '');
                                    imagePath = src;

                                    //$this.attr('src', src);
                                    //$img.attr('src', src);
                                    alert(imagePath);
                                    ImageAlbum.AddNewImage(imagePath);
                                },
                                mediaType: 'image',
                                
                                
                            });
                           // ImageAlbum.AddNewImage(imagePath);
                            
                        });


                    


                    }
                }
                    //SageMdia: function () {
                    //    $('#btnAddImages').on('click', function () {
                    //        var $this = $(this);
                    //        $this.SageMedia({
                    //            userModuleID: webBuilderUserModuleID,
                    //            onSelect: function (src, response, type, filename, extension) {
                    //                src = src.replace(/\\/g, '');
                    //                $this.attr('src', src);
                    //                $img.attr('src', src);
                    //            },
                    //            mediaType: 'image'
                    //        });
                    //    })
                    //}
                

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
                            //  AlbumPath: rootfolderPath + '\\' + albumName
                        };
                        this.config.method = "AddNewAlbum";
                        this.config.url = this.config.baseURL + this.config.method;
                        this.config.data = JSON.stringify({
                            objAlbum: objAlbum
                        });
                        this.config.ajaxCallMode = 1;
                        this.ajaxCall(this.config);

                    },

                    AddNewImage:function(imageName,imagePath,id){
                        var objImage = {
                            ImageName: imageName,
                            ImagePath: imagePath,
                            AlbumID: id
                        }
                        this.config.method = "AddImages";
                        this.config.url = this.config.baseURL + this.config.method;
                        this.config.data = JSON.stringify({
                            objImage: objImage
                        });
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
                            AlbumID:  id
                        });
                        this.config.ajaxCallMode = 4;
                        this.ajaxCall(this.config);
                       
                    },


                    BindAlbumList: function (data) {
                        var html = '';
                        var albumList = data.d;
                        if (albumList.length > 0) {
                            $.each(albumList, function (index, item) {
                                html += '<div  style="padding-top:5px; padding-left: 5px; padding-right: 5px;" class="album noimage sfCol_20 selectData"';
                                html += '<div class="field-row clearfix"  data-type="album">';
                                html += ' <div id="divAlbum" class="sfCol_100">';
                                html += ' <span><img data-id='+item.AlbumID+'  src="/Media/albumimg.jpg" class="editor-image sfCol_100"></span>'
                                html += '<div class="type-action" style="display:none;"> <ul class="type-action-list" >';
                             //   html += '<li class="selectFolder actions"><span><i class="fa fa-folder-open-o" aria-hidden="true"></i>Open</span></li>';
                                html += '<li class="renamefolder actions"><span><i class="fa fa-font" aria-hidden="true"></i>Rename</span></li>';
                                html += '<li data-id=' + item.AlbumID + '  class="deleteMedia actions"><span class="delete-item"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span></li></ul></div>';
                                html += ' <span class="openSettings fa fa-ellipsis-h"></span></div>';
                                html += '<span class="openfolder folderName">' + item.AlbumName + '</span>';
                                html += '<span class="editableFolderName" style="display:none;">';
                                html += '<input data-id=' + item.AlbumID + ' value="' + item.AlbumName + '" type="text" class="txtEditableFolderName" /></span>';
                                html += '</div>';
                            });
                        }
                        else {
                            html += '<div><h2>No Data To Display</h2></div>';
                        }
                        $('#divAlbumList').html(html);                    

                        $('.openSettings').css({
                            "cursor":"pointer"
                        })
                        $('img').css({
                            "cursor": "pointer"
                        })
                       
                    },              



                    CalculateDimension: function () {
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
                        }
                    }

                }



            }
        }
    }

}