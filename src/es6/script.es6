jQuery(document).ready(function ($) {

    $('.menu-wrapper').css({ 'height': $('.is-sticky').height() });

    var toggle = $('#menu-toggle');
    var menu = $('aside.menu');

    toggle.click(function () {
        $(this).toggleClass('is-active');
        menu.toggleClass('slideInLeft slideOutLeft')
        if (!menu.hasClass('is-hidden')) {
            $('html').removeClass('is-not-scrollable')
            $('#content-wrapper').toggleClass('is-hidden');
            setTimeout(function() {
                menu.toggleClass('is-hidden');
            }, 1000);
        }
        else {
            menu.toggleClass('is-hidden');
            $('html').addClass('is-not-scrollable')
            setTimeout(function () {
                $('#content-wrapper').toggleClass('is-hidden');
            }, 1000);
        }

    });

    $('.dropdown-icon').click(function (event) {
        event.preventDefault()
        $(this).toggleClass('fa-caret-down fa-caret-up');
        $(this.parentNode.parentNode.parentNode).find('ul').toggle(400);
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

});

$('.from-url').change(function() {
    $('.dest-url').val($(this).val())
})

$(window).scroll(function (e) {
    var sticky = $('.is-sticky');
    if (sticky[0]) {
        var isPositionFixed = sticky.hasClass('is-fixed');
        if ($(this).scrollTop() > sticky.offset().top +
            48 &&
            !isPositionFixed) {
            $('.nav-wrapper').css({ "height": sticky.parent().height() + "px" })
            sticky.addClass('is-fixed');
        }
        if ($(this).scrollTop() < sticky.parent().offset().top +
            48 &&
            isPositionFixed) {
            $('.nav-wrapper').css({ "height": "auto" });
            sticky.removeClass('is-fixed');
        }
    }
});