(function($){
  jQuery.fn.apparatus = function(opt){
	  
	 var opt = $.extend({
		minValue : 1,
		maxValue : 10,
		oneStep: 1
    }, opt);
	
		var make = function(){
		var confButton = $(this).find('.change'),
			confDisplay = $(this).find('.change-display').find('input');
			
		
		confButton.on('click', function() {
			var confInput = $(this).siblings('.change-display').find('input'),
			 	confValue = confInput.val(),
			 	realValue = parseInt(confValue);
				if($(this).hasClass('change-down') && realValue > opt.minValue && realValue <= opt.maxValue) {
					confInput.val(realValue - opt.oneStep);
				} else if($(this).hasClass('change-up') && realValue >= opt.minValue && realValue < opt.maxValue)  {
					confInput.val(realValue + opt.oneStep);	
				}
				confInput.trigger('change');
		});
		var previous 
		confDisplay.focus(function(){ 
			previous = parseInt($(this).val()); 
		})
		.on('change', function() {
			var changeValue =  parseInt($(this).val());
			if(changeValue > opt.maxValue) {
				$(this).val(opt.maxValue);
			} else if(changeValue < opt.minValue) {
				$(this).val(opt.minValue);
			} else if(isNaN($(this).val())) {
				$(this).val(previous);
			}
		});

    };
 
    return this.each(make); 
  };
})(jQuery); 







