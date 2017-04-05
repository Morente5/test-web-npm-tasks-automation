'use strict';

jQuery(document).ready(function ($) {

    $('.menu-wrapper').css({ 'height': $('.is-sticky').height() });

    var $toggle = $('#menu-toggle');
    var $menu = $('aside.menu');

    $toggle.click(function () {
        $(this).toggleClass('is-active');
        $menu.toggleClass('is-hidden');
        $('#content-wrapper').toggleClass('is-hidden');
    });

    $('.dropdown-icon').click(function () {
        $(this).toggleClass('fa-caret-down fa-caret-up');
        $(this.parentNode.parentNode.parentNode).find('ul').toggle(400);
    });
});

$(window).scroll(function (e) {
    var sticky = $('.is-sticky');
    var isPositionFixed = sticky.hasClass('is-fixed');
    if ($(this).scrollTop() > $('header.hero').height() - $('header .hero-footer').height() && !isPositionFixed) {
        sticky.addClass('is-fixed');
    }
    if ($(this).scrollTop() < $('header.hero').height() - $('header .hero-footer').height() && isPositionFixed) {
        sticky.removeClass('is-fixed');
    }
});