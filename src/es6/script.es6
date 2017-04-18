jQuery(document).ready(function ($) {

    $('.menu-wrapper').css({ 'height': $('.is-sticky').height() });

    var toggle = $('#menu-toggle');
    var menu = $('aside.menu');

    toggle.click(function () {
        $(this).toggleClass('is-active');
        menu.toggleClass('slideInLeft slideOutLeft')
        if (!menu.hasClass('is-hidden')) {
            //$('html').removeClass('is-not-scrollable')
            $('#content-wrapper').toggleClass('is-hidden');
            setTimeout(function() {
                menu.toggleClass('is-hidden');
            }, 1000);
        }
        else {
            menu.toggleClass('is-hidden');
            //$('html').addClass('is-not-scrollable')
            setTimeout(function () {
                $('#content-wrapper').toggleClass('is-hidden');
            }, 1000);
        }

    });

    $('.dropdown-icon').click(function (event) {
        event.preventDefault()
        $(this).find('.fa').toggleClass('fa-caret-down fa-caret-up');
        $(this.parentNode.parentNode).find('ul').toggle(400);
    });

    $('.toggle-on-form').click(function() {
        if (!$('#modal-form').hasClass('is-active')) {
            $('#modal-form').addClass('is-active')
            $('.modal-card').addClass('animated flipInY')
            $('.modal-background').addClass('animated fadeIn')
            $('html').addClass('is-not-scrollable')
            setTimeout(function () {
                $('.modal-card').removeClass('animated flipInY')
                $('.modal-background').removeClass('animated fadeIn')
            }, 1000);
        }
    });
    $('.toggle-off-form').click(function() {
        if ($('#modal-form').hasClass('is-active')) {
            $('.modal-card').addClass('animated flipOutY')
            $('.modal-background').addClass('animated fadeOut')
            setTimeout(function () {
                $('#modal-form').removeClass('is-active')
                $('.modal-card').removeClass('animated flipOutY')
                $('.modal-background').removeClass('animated fadeOut')
                $('html').removeClass('is-not-scrollable')
            }, 1000);
        }
    });

    var sticky = $('.is-sticky')
    if (sticky[0] && $(window).width() <= 980) {
        sticky.find('.tabs').addClass('is-boxed');
        sticky.find('.tabs').removeClass('is-toggle');
    }

});

$('.from-url').change(function() {
    $('.dest-url').val($(this).val())
})
$(window).resize(function(e) {
    var sticky = $('.is-sticky')
    if (sticky[0] && $(window).width() <= 980) {
        sticky.find('.tabs').addClass('is-boxed');
        sticky.find('.tabs').removeClass('is-toggle');
    }
})
var timeoutIn = 0
var timeoutOut = 0

function hideNav() {
    if (!$('#nav-services').hasClass('is-hidden-initial') && $(window).width() > 980) {
        if (timeoutOut) {
            clearTimeout(timeoutOut)
            timeoutOut = 0
            $('#nav-services').removeClass('animated fadeInRight')
        }
        $('#nav-services').addClass('animated fadeOutRight is-hidden-initial')
        timeoutIn = setTimeout(function () {
            $('#nav-services').addClass('is-hidden')
            $('#nav-services').removeClass('animated fadeOutRight')
        }, 1000);
    }
}
function showNav() {
    if ($('#nav-services').hasClass('is-hidden-initial') && $(window).width() > 980) {
        if (timeoutIn) {
            clearTimeout(timeoutIn)
            timeoutOut = 0
            $('#nav-services').addClass('is-hidden')
            $('#nav-services').removeClass('animated fadeOutRight')
        }
        $('#nav-services').addClass('animated fadeInRight')
        $('#nav-services').removeClass('is-hidden is-hidden-initial')
        timeoutOut = setTimeout(function () {
            $('#nav-services').removeClass('animated fadeInRight')
        }, 1000);
    }
}
$(window).scroll(function (e) {
    let titleSticky = $('.is-service-sticky')
    if (titleSticky[0] && $(window).width() > 980) {
        let isPositionFixed = titleSticky.hasClass('is-fixed')
        let scrollPos = $(this).scrollTop()
        let top = titleSticky.parent().offset().top
        if (scrollPos > top && !isPositionFixed) {
            $('.services-wrapper').css({ "height": titleSticky.parent().height() + "px" })
            titleSticky.addClass('is-fixed');
        }
        if (scrollPos < top &&
            isPositionFixed) {
            $('.services-wrapper').css({ "height": "auto" });
            titleSticky.removeClass('is-fixed');
        }
        //max padding
        if (scrollPos < top) {
            $('.hero-title').css({
                "padding": "48px 24px",
                "opacity": 1
            })
            $('#nav-services').css({
                "padding-bottom": 48,
                //"left": 0
            })
        }
        //min padding
        if (scrollPos > top + 200 && $(window).width() > 980) {
            $('.hero-title').css({
                "padding": "12px 24px",
                "opacity": 0.9
            })
            $('#nav-services').css({
                "padding-bottom": 12,
                //"left": window.innerWidth
            })
            hideNav()
        }
        if (scrollPos < top + 200) {
            showNav()
        }
        if (scrollPos > top &&
            scrollPos < top + 200 &&
            isPositionFixed) {
            $('.hero-title').css({
                "padding-top": 48 - ((scrollPos - top)) / 200 * (48 - 12),
                "padding-bottom": 48 - ((scrollPos - top)) / 200 * (48 - 12),
                "opacity": 1 - ((scrollPos - top)) / 200 * (1 - 0.9)
            })
            $('#nav-services').css({
                "padding-bottom": 48 - ((scrollPos - top)) / 200 * (48 - 12),
                //"left": ((scrollPos - top)) / 250 * window.innerWidth
            })
        }

    }
    let sticky = $('.is-sticky')
    if (sticky[0]) {
        let isPositionFixed = sticky.hasClass('is-fixed')
        let scrollPos = $(this).scrollTop()
        let top = sticky.parent().offset().top
        if (scrollPos > top && !isPositionFixed && $(window).width() > 980) {
            $('.nav-wrapper').css({ "height": sticky.parent().height() + "px" })
            sticky.addClass('is-fixed');
            sticky.find('.tabs').addClass('is-boxed');
            sticky.find('.tabs').removeClass('is-toggle');
        }
        if (scrollPos < top &&
            isPositionFixed) {
            $('.nav-wrapper').css({ "height": "auto" });
            sticky.removeClass('is-fixed');
            sticky.find('.tabs').removeClass('is-boxed');
            sticky.find('.tabs').addClass('is-toggle');
        }
        if (scrollPos < top) {
            $('.category-icon').css({
                "width": 96,
                "margin": 16
            })
        }
        if (scrollPos > top + 150) {
            $('.category-icon').css({
                "width": 48,
                "margin": 4
            })
        }
        if (scrollPos > top &&
            scrollPos < top + 150 &&
            isPositionFixed) {
                $('.category-icon').css({
                    "width": 96 - ((scrollPos - top))/150 * (96-48),
                    "margin": 16 - ((scrollPos - top))/150 * (16-4)
                })
        }
    }
});

$('.title-wrapper').mouseenter(
    () => {
        let titleSticky = $('.is-service-sticky')
        if (titleSticky[0] && $(window).width() > 980) {
            let scrollPos = $(window).scrollTop()
            let top = titleSticky.parent().offset().top
            if (scrollPos > top + 200) showNav()
        }
    }
)
$('.is-service-sticky').mouseleave(
    () => {
        let titleSticky = $('.is-service-sticky')
        if (titleSticky[0] && $(window).width() > 980) {
            let scrollPos = $(window).scrollTop()
            let top = titleSticky.parent().offset().top
            if (scrollPos > top + 200) hideNav()
        }
    }
)