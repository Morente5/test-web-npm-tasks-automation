$(document).ready(() => {
    let offset = $(window).width() <= 980 ? 12 : $('#nav-services').height() + 12;
    $('.sticky-item').stick_in_parent(
        {
            offset_top: offset,
            parent: '.sticky-parent',
            inner_scrolling: true
        }
    );
    $('.menu-wrapper').css({ 'height': $('.is-sticky').height() });



    var sticky = $('.is-sticky')
    if (sticky[0] && $(window).width() <= 980 && sticky.is("#nav-categories")) {
        sticky.find('.tabs').addClass('is-boxed');
        sticky.find('.tabs').removeClass('is-toggle');
    }
});


$(window).resize(function (e) {
    let offset = $(window).width() <= 980 ? 12 : $('#nav-services').height() + 12;
    $('.sticky-item').stick_in_parent(
        {
            offset_top: offset,
            parent: '.sticky-parent',
            inner_scrolling: true
        }
    );
    var sticky = $('.is-sticky')
    if (sticky[0] && $(window).width() <= 980) {
        sticky.removeClass('is-fixed');
        $('.nav-wrapper').height('inherit')
        if (sticky.is("#nav-categories")) {
            sticky.find('.tabs').addClass('is-boxed');
            sticky.find('.tabs').removeClass('is-toggle is-fixed');
        }
    }
})

$(window).scroll(function (e) {
    let sticky = $('.is-sticky')
    if (sticky[0]) {
        let isPositionFixed = sticky.hasClass('is-fixed')
        let scrollPos = $(this).scrollTop()
        let top = sticky.parent().offset().top
        if (scrollPos > top && !isPositionFixed && $(window).width() > 980) {
            $('.nav-wrapper').css({ "height": sticky.parent().height() + "px" })
            sticky.addClass('is-fixed');
            if (sticky.is("#nav-categories")) {
                sticky.find('.tabs').addClass('is-boxed');
                sticky.find('.tabs').removeClass('is-toggle');
            }
        }
        if (scrollPos < top &&
            isPositionFixed) {
            $('.nav-wrapper').css({ "height": "auto" });
            sticky.removeClass('is-fixed');
            if (sticky.is("#nav-categories")) {
                sticky.find('.tabs').removeClass('is-boxed');
                sticky.find('.tabs').addClass('is-toggle');
            }
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
                "width": 96 - ((scrollPos - top)) / 150 * (96 - 48),
                "margin": 16 - ((scrollPos - top)) / 150 * (16 - 4)
            })
        }
    }
});
