include('jquery.Jquery', function(){
/*
*	+++ IBRIS USERMENU +++
*	@author: AKondratiev
*
*/
(function($) {
	jQuery.fn.usermenu = function(opt) {
	    var user_menu = $(this),
	        model = {
				show: function($node) {
					$node.show();
				},
				hide: function($node) {
					$node.hide();
				},
				replaceSymbol: function($from, $to) {
					var container = $('<span />');
					container.attr('data-id', $from.attr('id')).html($from.html());
					$to.html(container);
				}
			},
			controller = {
				buttonClick: function(e) {
					var that = $(this),
						all_buttons = that.parents('ul.horlist').find('li > span.button'),
						all_sub_menus = all_buttons.next();
						
						all_buttons.removeClass('selected');
						model.hide(all_sub_menus);
						
					if ( !that.hasClass('selected') ) {
						that.addClass('selected');
						model.show(that.next());
					} else {
						that.removeClass('selected');
					}
					// user_menu.trigger('usermenu.click');
					return false;
				},
				closeButtonClick: function(e) {
					var that = $(this),
						sub_menu = that.parents('.sub_menu');
					
					sub_menu.siblings('span.button').removeClass('selected');
					model.hide(sub_menu);
					return false;
				},
				selectedSymbolClick: function(e) {
					var that = $(this),
						all_buttons = that.parents('ul.horlist').find('li > span.button'),
						all_sub_menus = all_buttons.next();
					
					all_buttons.removeClass('selected');
					model.hide(all_sub_menus);
					
					if ( !that.hasClass('selected') ) {
						all_buttons.eq(0).addClass('selected');
						model.show(all_sub_menus.eq(0));
					} else {
						that.removeClass('selected');
					}
						
					return false;
				},
				chooseSymbol: function(e) {
					var that = $(this),
						symbols = that.parents('.symbols_map').find('a.symbol');
						
					symbols.removeClass('active');
					that.addClass('active');
					model.replaceSymbol(that, $('#selected_symbol'));
					
					user_menu.trigger('usermenu.choose_symbol', [this]);
					return false;
				},
				chooseElements: function(e) {
				    var $target = $(e.target);
				    if ($target.hasClass('elem')) {
				        
    					var that = $(this),
    					    //PBelugin: ищем элементы от контейнера вкладки.
    						elems = that.parents('.sub_menu').find('a.elem');
    						elems.removeClass('selected');
    						that.addClass('selected');
    						
    						user_menu.trigger('usermenu.choose_elems', [this]);
				    } else if($target.hasClass('del_button')) {
    					user_menu.trigger('usermenu.delete', [e.target]);
				    }
				    
					return false;
				},
				deleteElement: function(e) {
				    //TODO неодбходи сделать динамическое изменение списка
					user_menu.trigger('usermenu.delete', [this]);
					return false;
				}
			},
			opt = $.extend({
			  
			}, opt),
			
			make = function() {
				var that = $(this),
					menu_list = that.find('ul.horlist').find('li > span.button'),
					close_buttons = that.find('.close_button, .button.close'),
					symbols = that.find('.symbols_map').find('a.symbol'),
					selected_symbol = $('#selected_symbol'),
					sub_menu = that.find('.sub_menu');
				
				menu_list.click(controller.buttonClick);
				close_buttons.click(controller.closeButtonClick);
				selected_symbol.click(controller.selectedSymbolClick);
				
				model.replaceSymbol(symbols.filter('.active'), selected_symbol);
				symbols.click(controller.chooseSymbol);
				// AKondratiev: пример события
				//symbols.on('usermenu.choose', function(){ alert('Символ ' + $(this).html() + ' выбран');});
                
                //PBelugin: события на динамично построенный список
                sub_menu.on('click', 'a.elem, input.elem', controller.chooseElements);
                sub_menu.on('click', 'b.del_button', controller.deleteElement);
			};
		
		return this.each(make); 
	}
})(jQuery);
});