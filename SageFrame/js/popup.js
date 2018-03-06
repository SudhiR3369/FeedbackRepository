var popUpState = null;
$.fn.AddPopUP = function (data) {
    var $this = $(this);
    popUpState = $this;
    $this.append('<div class="popupWrap"><div class="popup-content"></div></div>');
    var $modelClass = $('.popupWrap');
    var $modelContainClass = $('.popup-content');
    data = '<span class="popUpClose"><i class="fa fa-times"></i></span>' + data;
    //33 is length of <span class="popUpClose">X</span> and nothing
    if (data.length == 33) {
        $modelContainClass.append($this);
    }
    else {
        $modelContainClass.append(data);
    }
    var $popUpClose = $(".popUpClose");
    $modelClass.css({
        'display': 'none', /* Hidden by default */
        'position': 'fixed', /* Stay in place */
        'z-index': '1', /* Sit on top */
        'left': '0',
        'top': '0',
        'width': '100%', /* Full width */
        'height': '100%', /* Full height */
        'overflow': 'auto', /* Enable scroll if needed */
        'background-color': 'rgb(0, 0, 0)', /* Fallback color */
        'background-color': 'rgba(0, 0, 0, 0.4)'/* Black w/ opacity */
    });
    /* Modal Content/Box */
    $modelContainClass.css({
        'background-color': '#fefefe',
        'margin': '15% auto', /* 15% from the top and centered */
        'padding': '20px',
        'border': '1px solid #888',
        'width': '80%' /* Could be more or less, depending on screen size */
    });
    
    $popUpClose.css({
        'color': '#aaa',
        'float': 'right',
        'font-size': '28px',
        'font-weight': 'bold',
        'cursor':'pointer'
    });
    $modelClass.show();    
    $popUpClose.on("click", function () {
        $modelClass.remove();
    });
    // When the user clicks anywhere outside of the modal, close it
    $(window).on("click", function (event) {
        if (event.target == $modelClass[0]) {
            $modelClass.remove();
        }
    });
}

$.fn.CancelPopUP = function () {
    var $this = $(this);
    popUpState = $this;
    var $modelClass = $('.popupWrap');
    $modelClass.remove();
}
