include('jquery.Jquery', function(){
/*
*	+++ ITS TABS +++
*	@author: AKondratiev
*
*/
(function($) {
	$.fn.itstabs = function(opt) {
		var opt = $.extend({
		  activeTab: 1,	// номер активного таба
		  activeTabClass: 'current',	// css-класс активного таба
		  skinName: 'ibris-tabs'	// css-класс внешнего вида табов
		}, opt),
		
		make = function() {
			var that = $(this),
				dt = that.find('dt'),
				act_tab = (opt.activeTab > 0) ? --opt.activeTab: 0,
				act_class = opt.activeTabClass;
			
			that.addClass(opt.skinName);
			
			dt.next('dd').andSelf().removeClass(act_class);
			dt.eq(act_tab).next('dd').andSelf().addClass(act_class);
			
			dt.on('click', function(e){
				$(this).siblings().removeClass(act_class).end()
					.next('dd').andSelf().addClass(act_class);
			});
		};
		
		return this.each(make); 
	}
})(jQuery);
})