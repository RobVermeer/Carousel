/**
 * Carousel plugin for jQuery
 * Version: 2.0.0
 * http://vermeertech.nl
 * Copyright (c) 2012 Rob Vermeer
 * http://vermeertech.nl
 * 27 December, 2012
 */
;
(function ($) {
    $.fn.carousel = function (options) {
        var defaults = {
            container: 'carousel-items',
            item: 'carousel-item',
            prev: 'prev',
            next: 'next',
            items_per_click: 3,
			auto_slide: false
        };
        var opts = $.extend(defaults, options);
        return this.each(function () {
			$.doTimeout( 'auto_slide' );
            var items = $("." + opts.item).size();
			if (items <= opts.items_per_click) return;
			var $container = $("." + opts.container);
            if (items < (opts.items_per_click * 3))
                $container.append($container.clone().html())
            if (items > opts.items_per_click) {
                carousel_prepend_items();
                $("." + opts.prev).show().click(function (e) {
					$.doTimeout( 'auto_slide' );
					slide('prev');
                    e.preventDefault()
                });
                $("." + opts.next).show().click(function (e) {
					$.doTimeout( 'auto_slide' );
					slide('next');
                    e.preventDefault()
                });
				if(opts.auto_slide) {
					$.doTimeout( 'auto_slide', opts.auto_slide, function() {
						slide('next');
						return true;
					});
				}
            }
        });
		
		function slide(dir) {
			if(dir === 'next') {
				var left_indent = - $("." + opts.container + " ." + opts.item + ":nth-child(" + ( ( opts.items_per_click * 2 ) + 1 ) + ")").position().left;
				$("." + opts.container).not(':animated').animate({
					'left': left_indent
				}, 400, function () {
					carousel_append_items()
				});
			} else {
				$("." + opts.container).not(':animated').animate({
					'left': 0
				}, 400, function () {
					carousel_prepend_items()
				});
			}
		}
        function carousel_prepend_items() {
            for (i = 1; i <= opts.items_per_click; i++) {
                $("." + opts.container).prepend($("." + opts.item).last())
            }
            $("." + opts.container).css({
                'left': - $("." + opts.container + " ." + opts.item + ":nth-child(" + ( opts.items_per_click + 1 ) + ")").position().left
            })
        }
        function carousel_append_items() {
            for (i = 1; i <= opts.items_per_click; i++) {
                $("." + opts.container).append($("." + opts.item).first())
            }
            $("." + opts.container).css({
                'left': - $("." + opts.container + " ." + opts.item + ":nth-child(" + ( opts.items_per_click + 1 ) + ")").position().left
            })
        }
    }
})(jQuery);