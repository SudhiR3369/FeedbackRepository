﻿var image_album = {
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
                console.log($appendLayer)
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


                    //$albumDOM.find('.editableFolderName').show();
                    //$albumDOM.find('.openfolder.folderName').hide().text(name);
                    //        // ImageAlbum.AddNewAlbum(name, rootfolderPath);
                    //$albumDOM.find('.txtEditableFolderName').focus().select().val(name);
                    //$albumDOM.find('.txtEditableFolderName').attr('data-oldname', name);
                    //$albumDOM.find('.txtEditableFolderName').attr('data-changed', 'ongoing');                         
                    //ImageAlbum.SettingOpenEvent();
                    //ImageAlbum.RenameAlbum();
                    //ImageAlbum.GetAlbumList();

                });

                $('#btnGetAlbumList').on('click', function () {
                    //$albumDOM.find('.openfolder.folderName').hide().text(name);
                    //// ImageAlbum.AddNewAlbum(name, rootfolderPath);
                    //$albumDOM.find('.txtEditableFolderName').focus().select().val(name);
                    //$albumDOM.find('.txtEditableFolderName').attr('data-oldname', name);
                    //$albumDOM.find('.txtEditableFolderName').attr('data-changed', 'ongoing');
                    ImageAlbum.GetAlbumList();
                    ImageAlbum.SettingOpenEvent();
                    ImageAlbum.RenameAlbum();
                });




                //DOM felaa pareko chaina
                var $open = $('#divAlbumList').find('#clickme');


                $('.album.noimage').on('click', function () {
                    alert('Kehi ta hola jasto cha');
                });

                //$('.renamefolder').off('click').on('click', function () {
                //    debugger;
                //    var $this = $(this);
                //    var $albumDOM = $this.parents('.album.noimage')
                //    var albumName = $albumDOM.find('.openfolder.folderName').text().trim();
                //    var $txtEditableAlbum = $albumDOM.find('.txtEditableFolderName');
                //    $txtEditableAlbum.attr('data-oldname', albumName);
                //    $albumDOM.find('.txtEditableFolderName').attr('data-changed', 'ongoing');
                //    $txtEditableAlbum.val(albumName);
                //    $('.type-action.open').removeClass('open');
                //    $('.openSettings.open').removeClass('open');
                //    ImageAlbum.RenameAlbumEvent();
                //    setTimeout(function () {
                //        $txtEditableAlbum.focus();
                //        $txtEditableAlbum.select();
                //    }, 200);
                //});


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
                        ajaxCallMode: '',
                        AlbumId: ''
                    },

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

                    GetAlbumList: function () {

                        this.config.method = "GetAllAlbum";
                        // this.config.type = 'GET';
                        this.config.url = this.config.baseURL + this.config.method;
                        //this.config.data = this.config.data;
                        this.config.async = false;
                        this.config.ajaxCallMode = 2;
                        this.ajaxCall(this.config);
                    },

                    BindAlbumList: function (data) {
                        var html = '';
                        var albumList = data.d;
                        if (albumList.length > 0) {
                            $.each(albumList, function (index, item) {
                                html += '<div data-id class="album noimage sfCol_20 selectData"';
                                html += '<div class="field-row clearfix"  data-type="album">';
                                html += ' <div id="divAlbum" class="sfCol_100">';
                                html += ' <span><img id="clickme" src="/Media/album.png" class="editor-image sfCol_100"></span>'
                                html += '<div class="type-action" style="display:none;"> <ul class="type-action-list">';
                                html += '<li class="selectFolder actions"><span><i class="fa fa-folder-open-o" aria-hidden="true"></i>Open</span></li>';
                                html += '<li class="renamefolder actions" data-id=' + item.AlbumID + '><span><i class="fa fa-font" aria-hidden="true"></i>Rename</span></li>';
                                html += '<li class="deleteMedia actions"><span class="delete-item"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span></li></ul></div>';
                                html += ' <span class="openSettings fa fa-ellipsis-h"></span></div>';
                                html += '<span class="openfolder folderName">' + item.AlbumName + '</span>';
                                html += '<span class="editableFolderName" style="display:none;">';
                                html += '<input value="New Album" type="text" class="txtEditableFolderName" /></span>';
                                html += '</div>';

                            });
                        }
                        else {
                            html += '<div><h2>No Data To Display</h2></div>';
                        }
                        $('#divAlbumList').prepend(html);

                    },

                    RenameAlbum: function () {
                        $('.renamefolder').off('click').on('click', function () {
                            var $this = $(this);
                            var $albumDOM = $this.parents('.album.noimage')
                            var albumName = $albumDOM.find('.openfolder.folderName').text().trim();
                            var $txtEditableAlbum = $albumDOM.find('.txtEditableFolderName');
                            $txtEditableAlbum.attr('data-oldname', albumName);
                            $albumDOM.find('.txtEditableFolderName').attr('data-changed', 'ongoing');
                            $txtEditableAlbum.val(albumName);
                            $('.type-action.open').removeClass('open');
                            $('.openSettings.open').removeClass('open');
                            ImageAlbum.RenameAlbumEvent();
                            setTimeout(function () {
                                $txtEditableAlbum.focus();
                                $txtEditableAlbum.select();
                            }, 200);
                        });
                    },
                    RenameAlbumEvent: function () {
                        $('.txtEditableFoldername').off('keyup').on('keyup', function (e) {
                            var $this = $(this);
                            $this.focus();
                            $this.attr('data-changed', 'ongoing');
                            Media.RenameFolder($this, e);
                        });
                        $('.txtEditableFolderName').off('blur').on('blur', function (e) {
                            var $this = $(this);
                            var changed = $this.attr('data-changed');
                            var newname = $this.val().trim();
                            var id = $('.renamefolder').attr('data-id');
                            ImageAlbum.UpdateAlbumName(newname, id);

                        });
                    },

                    UpdateAlbumName: function (newname, id) {
                        var objAlbum = {
                            AlbumName: newname,
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



                    AddNewAlbum: function (albumName, rootfolderPath) {
                        var objAlbum = {
                            AlbumName: albumName
                           // AlbumPath: rootfolderPath + '\\' + albumName
                        };
                        this.config.method = "AddNewAlbum";
                        this.config.url = this.config.baseURL + this.config.method;
                        this.config.data = JSON.stringify({
                            objAlbum: objAlbum
                        });
                        this.config.ajaxCallMode = 1;
                        this.ajaxCall(this.config);

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
                                break;

                            case 2:
                                alert("List aauna lagyo hai!!");
                                ImageAlbum.BindAlbumList(data);
                                break;

                            case 3:
                                alert
                        }
                    }

                }



            }
        }
    }
}
               