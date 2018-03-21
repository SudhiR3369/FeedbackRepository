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
            var dom = DOMCreate('div', EasyLibrary.ReadDOM('image album/albumList'), 'sfCol_100');
            FullPagePopup({
                data: dom,
                heading: "Album List",
                showheading: true,
                width: "75%"
            });
          
                $('#btnAddNewAlbum').on('click', function () {
                    $('.fullpage-popup-model-body').append(DOMCreate('div','<h1>Heading</h1>','sfCol_30'));
                    //alert('Read garyo ta soltaa!!');

                });

           
        }
        }
    
}