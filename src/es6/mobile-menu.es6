$(document).ready(() => {

    var toggle = $('#menu-toggle');
    var menu = $('aside.menu');

    toggle.click(function () {
        $(this).toggleClass('is-active');
        menu.toggleClass('slideInLeft slideOutLeft')
        if (!menu.hasClass('is-hidden')) {
            //$('html').removeClass('is-not-scrollable')
            $('#content-wrapper').toggleClass('is-hidden');
            setTimeout(function () {
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

});