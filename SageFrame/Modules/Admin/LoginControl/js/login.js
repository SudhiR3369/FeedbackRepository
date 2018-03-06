$(function () {
    $('.sfFormwrapper .formValue select').each(function () {
			var isMultiple = $(this).attr('multiple');
			if (isMultiple == null || isMultiple == undefined || isMultiple != 'multiple')
				$(this).parent().parent().children('.formKey').addClass('selectKey');
		});
		$('.sfFormwrapper .formValue input[type="text"]').each(function () {
			$(this).parent().parent().children('.formKey').addClass('textType');
			if ($(this).val() != "") {
				$(this).parent().parent().addClass('fieldComplete');
			}
			else if ($(this).is(":focus")) {
			    $(this).parent().parent().addClass('fieldActive');
			}
		});
        $('.sfFormwrapper .formValue input[type="password"]').each(function () {           
            $(this).parent().parent().children('.formKey').addClass('textType');
            if ($(this).val() != "") {
                $(this).parent().parent().addClass('fieldComplete');
            }
        });
        $('.formKey').on('click', '.sfFormlabel', function () {
			$(this).parent().next().children('input[type="text"],input[type="password"]').focus();
		});

		$('.sfFormwrapper .formValue input[type="text"] ,input[type="password"]').focusin(function () {
			$(this).parent().parent().addClass('fieldActive');
		});
		$('.sfFormwrapper .formValue input[type="text"],input[type="password"]').focusout(function () {
			var ThatInput = this;
			setTimeout(function () {
			    CompleteField(ThatInput);
			}, 200);
		});
		$('.formValue input[type="text"],input[type="password"]').on('keyup', function () {
		    CompleteField(this);
		});
		
		$('.formValue input[type="text"],input[type="password"]').on('change',function () {
		    CompleteField(this);
		});
		function CompleteField(ThatInput) {
		    if ($(ThatInput).val() != "")
		        $(ThatInput).parent().parent().addClass('fieldComplete');
		    else {
		        $(ThatInput).parent().parent().removeClass('fieldComplete');
		        $(ThatInput).parent().parent().removeClass('fieldActive');
		    }
		}
});
