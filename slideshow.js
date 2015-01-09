/*
 * Simple jQuery Slideshow by Philip Andersson
 * Creates a slideshow with images marked with class='slideshow_img'
 */
(function($) {

    $.fn.slideShow = function (options) {
        'use strict';

        var options = $.extend({}, $.fn.slideShow.defaults, options);
        console.log(options);
        var curr_img;
        var numberImages;
        var interval;

        var next = function () {
            'use strict';
            $('.slideshow_img')
                .eq(curr_img)
                .fadeOut('slow', function () {
                    $(this)
                        .css('z-index', 0)
                        .fadeIn(0)
                        .siblings().each(function () {
                            var z = (parseInt($(this).css('z-index'), 10));
                            $(this).css('z-index', z + 1);
                        });
                });
            curr_img = (curr_img + 1) % numberImages;

        };
        numberImages = $(".slideshow_img").length;

        var init = function () {
            var zindex = numberImages - 1;
            $(".slideshow_img")
                .each(function () {
                    $(this).css('z-index', zindex);
                    curr_img = zindex;
                    zindex -= 1;
                })
                .click(function () {
                    next();
                    clearInterval(interval);
                    interval = setInterval(next, options.timestep);
                });
            interval = setInterval(next, options.timestep);
        }
        init();
        console.log('Added function slideShow() to jQuery object as plugin.');
    };

    //Default values for plugin
    $.fn.slideShow.defaults = {
      'timestep': 5000, 
    }

})(jQuery);

$(document).ready(function () {
    'use strict';

    $('body').slideShow( {
        'timestep': 5000
    });

}); 