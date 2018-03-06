//for default image
const defaultImage = '<img  src="' + webbuildermodulepath + '/img/def1.jpg">';
//create a shortcut for  data
//class TypeCheck
//{
//    Check(data)
//    { 
//        return (typeof data !== "undefined"); 
//    }
//}

//let isDefinded = new TypeCheck();
//isDefinded.Check('isdefinde');
//TypeCheck.prototype.Check =

//is checked

function FindSpecificClass(container, regex) {

    var activeClass = '';
    container.each(function (i, v) {
        var $me = $(this);
        var $classes = $me.attr('class').match(regex);
        if ($classes != null) {
            activeClass = $classes[0]
        }
    });
    return activeClass;

}

function ReadOwnExternalFile() {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "footer.htm", false);
    ajax.send();
    document.body.innerHTML += ajax.responseText;
}

function GetAllpages() {

}
//default color for everything check and make as modular if possible

//global call function withinitself

var getActiveClass = GetLibrary("image link").GetActiveClass("dvfgrtg");
function GetLibrary(dataType) {
    return component[dataType]["library"];
}


//$('ul#fontIconCollection').html()




function generateMeta(type, title, description) {
    var meta = {
        "type": [
            ["id='TWITTERCARD'", "name='twitter:card'"],
            ["id='TYPE'", "name='type'"],
            ["id='OGTYPE'", "property='og:type'"]
        ],
        "title": [
            ["TWITTERTITLE", "name='twitter:title'"],
            ["TITLE", "name='title'"],
            ["OGTITLE", "property='og:title'"]
        ]
    }
    CreateIfNotExists(meta.type, type);
    CreateIfNotExists(meta.title, title);
}

function CreateIfNotExists(anything, value) {
    //get length
    var html = "";
    var metalength = anything.length;
    for (var i = 0; i < metalength; i++) {
        var meta = $('meta[' + anything[i][0] + '"]');
        if (meta.length > 0) {
            //apply value here
            $('meta[' + anything[i][0] + '"]').att('content', value);
        }
        else {
            html += '<meta ' + anything[i][0] + ' ' + anything[i][1] + ' content="' + value + '">';
        }
    }
}