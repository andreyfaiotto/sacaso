(function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
    };
})(jQuery);

$(window).scroll(function() {
    var el = $("#bncc-section > div.green-wave > div.bottom-text");
    var top_of_element = el.offset().top;
    var bottom_of_element = el.offset().top + el.outerHeight();
    var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
    var top_of_screen = $(window).scrollTop();
    if(parseInt($('#info1').text()) < 50){
        if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
            $('#info1').countTo({
                from: 50,
                to: 1600,
                speed: 2000,
                refreshInterval: 50
            });
            $('#info2').countTo({
                from: 50,
                to: 1600,
                speed: 1700,
                refreshInterval: 50
            });
            $('#info3').countTo({
                from: 0,
                to: 500,
                speed: 1500,
                refreshInterval: 50
            });
            $('#info4').countTo({
                from: 10,
                to: 2000,
                speed: 1600,
                refreshInterval: 50
            });
        } else {
            // the element is not visible, do something else
        }
    }
    
});

$(document).ready(function(){
    //clone components
    $('#navmenu-mobile').html($('#navmenu').html())
    $('.box-plans-mobile').html($('.box-plans').html())
    

    if($(window).width() < 900){
        $('.box-plans-mobile .box-list').slick({
            dots:true,
            centerPadding: '40px',
            mobileFirst:true,
            initialSlide:1,
            infinite:false,
            centerMode: true
        })
    }

    $('.hambunger-menu').click(function(){
        $('#navmenu-mobile').slideToggle();
    })
    
    $('#navmenu a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var id = $(this).attr('href'),
                targetOffset = $(id).offset().top;
                
        $('html, body').animate({ 
            scrollTop: targetOffset - 100
        }, 500);
    });
    
    $('.parallax-fx > div').each(function(){
         var $obj = $(this);

         $(window).scroll(function() {
            var yPos = -($(window).scrollTop() / $obj.data('speed')); 
    
            var bgpos = '50% '+ yPos + 'px';
    
            $obj.css('background-position', bgpos );
    
        });
    });  
    
 });

 $(window).resize(function(){
	if($(window).width() > 900){
        $('#navmenu-mobile').hide()
    }
})
