"use strict";

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + (exdays === null ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function putCookie() {
    setCookie('braunaviso', '1', 365);
    document.getElementById("acookies").style.display = "none";
}

$(document).ready(function () {
    if (getCookie('braunaviso') != "1") {
        document.getElementById("acookies").style.display = "block";
    }
});
'use strict';

function toggleOnForm(elem) {
    if (!$(elem).hasClass('is-active')) {
        $(elem).addClass('is-active');
        $('.modal-card').addClass('animated flipInY');
        $('.modal-background').addClass('animated fadeIn');
        $('html').addClass('is-not-scrollable');
        setTimeout(function () {
            $('.modal-card').removeClass('animated flipInY');
            $('.modal-background').removeClass('animated fadeIn');
        }, 1000);
    }
}

function toggleOffForm(elem) {
    if ($(elem).hasClass('is-active')) {
        $('.modal-card').addClass('animated flipOutY');
        $('.modal-background').addClass('animated fadeOut');
        setTimeout(function () {
            $(elem).removeClass('is-active');
            $('.modal-card').removeClass('animated flipOutY');
            $('.modal-background').removeClass('animated fadeOut');
            $('html').removeClass('is-not-scrollable');
            $(elem).find('.field, button.is-success').removeClass('is-hidden');
            $(elem).find('.modal-card-body .send-ok').addClass('is-hidden');
        }, 1000);
    }
}

function newsletterCookie() {
    setCookie('newsletter', '1', 30);
}

function newsletterSessionCookie() {
    setCookie('newsletter', '1');
}

$(document).ready(function () {

    $('.toggle-on-form').click(function () {
        toggleOnForm('#modal-form');
    });
    $('.toggle-off-form').click(function () {
        toggleOffForm('#modal-form');
    });

    $('.toggle-on-jobform').click(function () {
        toggleOnForm('#modal-jobform');
    });
    $('.toggle-off-jobform').click(function () {
        toggleOffForm('#modal-jobform');
    });

    var newsletterTimeout = null;

    if (getCookie('newsletter') != "1") {
        newsletterTimeout = setTimeout(function () {
            return toggleOnForm('#modal-newsletterform');
        }, 60000);
    }

    $('.toggle-on-newsletterform').click(function () {
        if (newsletterTimeout) {
            clearTimeout(newsletterTimeout);
        }
        toggleOnForm('#modal-newsletterform');
    });
    $('.toggle-off-newsletterform').click(function () {
        if (getCookie('newsletter') != "1") {
            newsletterSessionCookie();
        }
        toggleOffForm('#modal-newsletterform');
    });

    $('.inputfile').change(function (e) {
        var fileName = void 0;
        var $span = $(this).parent().parent().find('span.validation');
        if (this.files && this.files.length > 1) {
            fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        } else {
            fileName = e.target.value.split('\\').pop();
        }
        if (!fileName) {
            $span.text('(Adjunta un archivo)');
            $(this).next().addClass('is-danger');
            $(this).next().removeClass('is-primary is-success');
            $(this).next().find('span').html('Adjunta tu CV');
            this.setCustomValidity('');
        } else if (this.files[0].type !== 'application/pdf') {
            $span.text('(Debe ser un archivo PDF)');
            $(this).next().addClass('is-danger');
            $(this).next().removeClass('is-primary is-success');
            $(this).next().find('span').html('Adjunta tu CV');
            this.setCustomValidity("Debe ser un archivo PDF");
        } else {
            $span.text('');
            $(this).next().find('span').html(fileName);
            $(this).next().removeClass('is-primary is-danger');
            $(this).next().addClass('is-success');
            this.setCustomValidity('');
        }
    });

    $('input[name=nombre], input[name=NAME]').change(function (e) {
        var value = $(this).val();
        var $span = $(this).parent().parent().find('span.validation');
        if (this.validity.valueMissing) {
            $span.text('(Escribe un nombre)');
            $(this).addClass('is-danger');
            this.setCustomValidity('');
        } else if (this.validity.patternMismatch) {
            $span.text('(Solo puede contener letras y espacios)');
            $(this).addClass('is-danger');
            this.setCustomValidity('Solo puede contener letras y espacios');
        } else if (this.validity.valid) {
            $span.text('');
            $(this).removeClass('is-danger');
            this.setCustomValidity('');
        }
    });

    $('input[name=empresa]').change(function (e) {
        var value = $(this).val();
        var $span = $(this).parent().parent().find('span.validation');
        if (this.validity.valueMissing) {
            $span.text('(Escribe el nombre de la empresa)');
            $(this).addClass('is-danger');
        } else if (this.validity.valid) {
            $span.text('');
            $(this).removeClass('is-danger');
        }
    });

    $('input[name=telefono]').change(function (e) {
        var value = $(this).val();
        var $span = $(this).parent().parent().find('span.validation');
        if (this.validity.valueMissing) {
            $span.text('(Escribe un teléfono)');
            $(this).addClass('is-danger');
        } else if (!this.validity.valid) {
            $span.text('(No es un teléfono válido)');
            $(this).addClass('is-danger');
        } else if (this.validity.valid) {
            $span.text('');
            $(this).removeClass('is-danger');
        }
    });

    $('input[name=url]').change(function (e) {
        var value = $(this).val();
        var $span = $(this).parent().parent().find('span.validation');
        if (this.validity.valueMissing) {
            $span.text('(Escribe una URL)');
            $(this).addClass('is-danger');
        } else if (!this.validity.valid) {
            $span.text('(No es una URL válida)');
            $(this).addClass('is-danger');
        } else if (this.validity.valid) {
            $span.text('');
            $(this).removeClass('is-danger');
        }
    });

    $('input[name=email], input[name=EMAIL]').change(function (e) {
        var value = $(this).val();
        var $span = $(this).parent().parent().find('span.validation');
        if (this.validity.valueMissing) {
            $span.text('(Escribe un email)');
            $(this).addClass('is-danger');
        } else if (!this.validity.valid) {
            $span.text('(No es un email válido)');
            $(this).addClass('is-danger');
        } else if (this.validity.valid) {
            $span.text('');
            $(this).removeClass('is-danger');
        }
    });

    $('textarea[name=motivos]').change(function (e) {
        var value = $(this).val();
        var $span = $(this).parent().parent().find('span.validation');
        if (this.validity.valueMissing) {
            $span.text('(Escribe tus motivos)');
            $(this).addClass('is-danger');
        } else if (this.validity.valid) {
            $span.text('');
            $(this).removeClass('is-danger');
        }
    });
});

$('.from-url').change(function () {
    $('.dest-url').val($(this).val());
});

$('form[name=auditoria]').submit(function (event) {
    event.preventDefault();

    var $form = $(this),
        url = $form.attr("action"),
        form = {
        url: $form.find("input[name='url']").val(),
        nombre: $form.find("input[name='nombre']").val(),
        empresa: $form.find("input[name='empresa']").val(),
        email: $form.find("input[name='email']").val(),
        telefono: $form.find("input[name='telefono']").val(),
        sugerencia: $form.find("textarea[name='sugerencia']").val()
    };

    $form.find('button.is-success').addClass('is-loading');
    $form.find('button.is-success').prop('disabled', true);

    $.ajax({
        type: 'POST',
        url: url,
        data: form,

        success: function success(data, textStatus, request) {
            $form.find('.field, button.is-success').addClass('is-hidden');
            $form.find('.modal-card-body .send-ok').removeClass('is-hidden');
            // Facebook pixel event
            fbq('track', 'CompleteRegistration', {
                value: 0,
                currency: '€'
            });
            // ga.send
            setTimeout(function () {
                $form.find('button.is-success').removeClass('is-loading');
                $form.find('button.is-success').prop('disabled', false);
                toggleOffForm($('#modal-form'));
            }, 3000);
        },
        error: function error(request, textStatus, errorThrown) {
            $form.find('.field, button.is-success').addClass('is-hidden');
            $form.find('.modal-card-body .send-fail').removeClass('is-hidden');
            // ga.send
            setTimeout(function () {
                $form.find('button.is-success').removeClass('is-loading');
                $form.find('button.is-success').prop('disabled', false);
                $form.find('.field, button.is-success').removeClass('is-hidden');
                $form.find('.modal-card-body .send-fail').addClass('is-hidden');
            }, 3000);
        }
    });
});

$('form[name=trabaja]').submit(function (event) {
    event.preventDefault();

    var $form = $(this);
    var url = $form.attr("action");
    var form = new FormData();
    form.append('nombre', $form.find("input[name='nombre']").val());
    form.append('email', $form.find("input[name='email']").val());
    form.append('telefono', $form.find("input[name='telefono']").val());
    form.append('motivos', $form.find("textarea[name='motivos']").val());
    form.append('file', $form.find("input[name='file']")[0].files[0]);

    $form.find('button.is-success').addClass('is-loading');
    $form.find('button.is-success').prop('disabled', true);

    $.ajax({
        type: 'POST',
        url: url,
        data: form,
        cache: false,
        contentType: false,
        processData: false,

        success: function success(data, textStatus, request) {
            $form.find('.field, button.is-success').addClass('is-hidden');
            $form.find('.modal-card-body .send-ok').removeClass('is-hidden');
            // ga.send
            setTimeout(function () {
                $form.find('button.is-success').removeClass('is-loading');
                $form.find('button.is-success').prop('disabled', false);
                toggleOffForm($('#modal-jobform'));
            }, 3000);
        },
        error: function error(request, textStatus, errorThrown) {
            $form.find('.field, button.is-success').addClass('is-hidden');
            $form.find('.modal-card-body .send-fail').removeClass('is-hidden');
            // ga.send
            setTimeout(function () {
                $form.find('button.is-success').removeClass('is-loading');
                $form.find('button.is-success').prop('disabled', false);
                $form.find('.field, button.is-success').removeClass('is-hidden');
                $form.find('.modal-card-body .send-fail').addClass('is-hidden');
            }, 3000);
        }
    });
});

$('form[name=llamamos]').submit(function (event) {
    event.preventDefault();

    var $form = $(this);
    var url = $form.attr("action");
    var breadcrumbs = $('.menu-list').find('.is-active').map(function (i, elem) {
        return elem.text;
    });
    var form = new FormData();
    form.append('nombre', $form.find("input[name='nombre']").val());
    form.append('email', $form.find("input[name='email']").val());
    form.append('telefono', $form.find("input[name='telefono']").val());
    form.append('categoria', breadcrumbs[0]);
    form.append('servicio', breadcrumbs[1]);

    $form.find('button.is-success').addClass('is-loading');
    $form.find('button.is-success').prop('disabled', true);

    $.ajax({
        type: 'POST',
        url: url,
        data: form,
        cache: false,
        contentType: false,
        processData: false,

        success: function success(data, textStatus, request) {
            $form.parent().children(':not(.hero.send-ok)').addClass('is-hidden');
            $form.parent().children('.hero.send-ok').removeClass('is-hidden');
            // ga.send
            setTimeout(function () {
                $form.find('button.is-success').removeClass('is-loading');
                $form.find('button.is-success').prop('disabled', false);
                $form.parent().children(':not(.hero)').removeClass('is-hidden');
                $form.parent().children('.hero').addClass('is-hidden');
            }, 3000);
        },
        error: function error(request, textStatus, errorThrown) {
            $form.parent().children(':not(.hero.send-fail)').addClass('is-hidden');
            $form.parent().children('.hero.send-fail').removeClass('is-hidden');
            // ga.send
            setTimeout(function () {
                $form.find('button.is-success').removeClass('is-loading');
                $form.find('button.is-success').prop('disabled', false);
                $form.parent().children(':not(.hero)').removeClass('is-hidden');
                $form.parent().children('.hero').addClass('is-hidden');
            }, 3000);
        }
    });
});

$('form[name=newsletter]').submit(function (event) {
    event.preventDefault();

    var $form = $(this);
    var url = $form.attr("action");

    $form.find('button.is-success').addClass('is-loading');
    $form.find('button.is-success').prop('disabled', true);

    $.ajax({
        type: 'POST',
        url: url,
        data: $form.serialize(),
        dataType: 'jsonp',

        success: function success(data, textStatus, request) {
            $form.find('.field, button.is-success').addClass('is-hidden');
            $form.find('.modal-card-body .send-ok').removeClass('is-hidden');
            newsletterCookie();
            // Facebook pixel event
            // fbq('track', 'CompleteRegistration', {
            // 	value: 0,
            // 	currency: '€'
            // });
            // ga.send
            setTimeout(function () {
                $form.find('button.is-success').removeClass('is-loading');
                $form.find('button.is-success').prop('disabled', false);
                toggleOffForm($('#modal-newsletterform'));
            }, 3000);
        },
        error: function error(request, textStatus, errorThrown) {
            $form.find('.field, button.is-success').addClass('is-hidden');
            $form.find('.modal-card-body .send-fail').removeClass('is-hidden');
            // ga.send
            setTimeout(function () {
                $form.find('button.is-success').removeClass('is-loading');
                $form.find('button.is-success').prop('disabled', false);
                $form.find('.field, button.is-success').removeClass('is-hidden');
                $form.find('.modal-card-body .send-fail').addClass('is-hidden');
            }, 3000);
        }
    });
});
'use strict';

$('.card.quote').matchHeight({
  remove: true
});
$.fn.matchHeight._maintainScroll = true;

var owlNews = $('.news.owl-carousel');
var owlOptionsNews = {
  loop: true,
  margin: 15,
  autoplay: true,
  autoplayTimeout: 4000,
  autoplayHoverPause: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: false,
      dots: false
    },
    768: {
      items: 3,
      nav: false,
      dots: true
    }
  }
};
var owlTestimonios = $('.testimonios.owl-carousel');
var owlOptionsTestimonios = {
  loop: true,
  margin: 15,
  autoplay: true,
  autoplayTimeout: 4000,
  autoplayHoverPause: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: false,
      dots: false
    },
    768: {
      items: 2,
      nav: false,
      dots: true
    }
  },
  onRefresh: function onRefresh() {
    $('.card.quote').matchHeight({ remove: true });
  },
  onRefreshed: function onRefreshed() {
    $.fn.matchHeight._apply('.card.quote', { remove: true });
  }

  // $('.play').on('click', function () {
  //   owlNews.trigger('play.owlNews.autoplay', [3000])
  // })
  // $('.stop').on('click', function () {
  //   owlNews.trigger('stop.owlNews.autoplay')
  // })

};if ($(window).width() > 768) {
  var owlActiveNews = owlNews.owlCarousel(owlOptionsNews);
  var owlActiveTestimonios = owlTestimonios.owlCarousel(owlOptionsTestimonios);
} else {
  owlNews.addClass('off');
  owlTestimonios.addClass('off');
}

$(window).resize(function () {
  if ($(window).width() > 768) {
    if ($('.news.owl-carousel').hasClass('off')) {
      var _owlActiveNews = owlNews.owlCarousel(owlOptionsNews);
      owlNews.removeClass('off');
    }
    if ($('.testimonios.owl-carousel').hasClass('off')) {
      var _owlActiveTestimonios = owlTestimonios.owlCarousel(owlOptionsTestimonios);
      owlTestimonios.removeClass('off');
    }
  } else {
    if (!$('.news.owl-carousel').hasClass('off')) {
      owlNews.addClass('off').trigger('destroy.owlNews.carousel');
      owlNews.find('.owl-stage-outer').children(':eq(0)').unwrap();
    }
    if (!$('.testimonios.owl-carousel').hasClass('off')) {
      owlTestimonios.addClass('off').trigger('destroy.owlTestimonios.carousel');
      owlTestimonios.find('.owl-stage-outer').children(':eq(0)').unwrap();
    }
  }
});
'use strict';

function loadMap() {
    initMap('#map-granada', { lat: 37.171637, lng: -3.588889 }, 'Braun Marketing & Consulting - Granada', 'https://www.google.es/maps/place/Braun+Marketing+%26+Consulting/@37.171637,-3.5910777,17z/data=!3m1!4b1!4m5!3m4!1s0xd71fcb0e2876f73:0xcfe1ba01baba8a7!8m2!3d37.171637!4d-3.588889');
    initMap('#map-marbella', { lat: 36.498222, lng: -4.798239 }, 'Braun Marketing & Consulting - Marbella', 'https://www.google.es/maps/place/Braun+Marketing+%26+Consulting/@36.49822,-4.798237,15z/data=!4m2!3m1!1s0x0:0xa8a293b9db9562e?sa=X&ved=0ahUKEwiVibG3wo3WAhUFPFAKHU5lB6EQ_BIIoAEwCg');
}

function initMap(mapSelector, position, text, url) {
    var divMap = $(mapSelector)[0];
    var initPosition = new google.maps.LatLng(position.lat, position.lng);
    var coords = [initPosition];
    var map = new google.maps.Map(divMap, {
        center: initPosition,
        zoom: 15,
        disableDefaultUI: false, //true,
        styles: [{
            "featureType": "all",
            "stylers": [{
                "saturation": 0
            }, {
                "hue": "#e7ecf0"
            }]
        }, {
            "featureType": "road",
            "stylers": [{
                "saturation": -70
            }]
        }, {
            "featureType": "transit",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "saturation": -60
            }]
        }]
    });

    var marker = new google.maps.Marker({
        position: initPosition,
        title: text,
        map: map,
        icon: {
            url: '/test-web-npm-tasks-automation/img/pin.png',
            scaledSize: new google.maps.Size(48, 48), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(24, 48)
        },
        animation: google.maps.Animation.DROP
    });

    var infowindow = new google.maps.InfoWindow({
        content: '<a href="' + url + '" rel="nofollow" target="_blank">' + text + '</a>'
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
}
'use strict';

$(document).ready(function () {

    var toggle = $('#menu-toggle');
    var menu = $('aside.menu');

    toggle.click(function () {
        $(this).toggleClass('is-active');
        menu.toggleClass('slideInLeft slideOutLeft');
        if (!menu.hasClass('is-hidden')) {
            //$('html').removeClass('is-not-scrollable')
            $('#content-wrapper').toggleClass('is-hidden');
            setTimeout(function () {
                menu.toggleClass('is-hidden');
            }, 1000);
        } else {
            menu.toggleClass('is-hidden');
            //$('html').addClass('is-not-scrollable')
            setTimeout(function () {
                $('#content-wrapper').toggleClass('is-hidden');
            }, 1000);
        }
    });

    $('.dropdown-icon').click(function (event) {
        event.preventDefault();
        $(this).find('.fa').toggleClass('fa-caret-down fa-caret-up');
        $(this.parentNode.parentNode).find('ul').toggle(400);
    });
});
'use strict';

$(document).ready(function () {
    var offset = $(window).width() <= 980 ? 12 : $('#nav-services').height() + 12;
    $('.sticky-item').stick_in_parent({
        offset_top: offset,
        parent: '.sticky-parent',
        inner_scrolling: true
    });
    $('.menu-wrapper').css({ 'height': $('.is-sticky').height() });

    var sticky = $('.is-sticky');
    if (sticky[0] && $(window).width() <= 980 && sticky.is("#nav-categories")) {
        sticky.find('.tabs').addClass('is-boxed');
        sticky.find('.tabs').removeClass('is-toggle');
    }
});

$(window).resize(function (e) {
    var offset = $(window).width() <= 980 ? 12 : $('#nav-services').height() + 12;
    $('.sticky-item').stick_in_parent({
        offset_top: offset,
        parent: '.sticky-parent',
        inner_scrolling: true
    });
    var sticky = $('.is-sticky');
    if (sticky[0] && $(window).width() <= 980) {
        sticky.removeClass('is-fixed');
        $('.nav-wrapper').height('inherit');
        if (sticky.is("#nav-categories")) {
            sticky.find('.tabs').addClass('is-boxed');
            sticky.find('.tabs').removeClass('is-toggle is-fixed');
        }
    }
});

$(window).scroll(function (e) {
    var sticky = $('.is-sticky');
    if (sticky[0]) {
        var isPositionFixed = sticky.hasClass('is-fixed');
        var scrollPos = $(this).scrollTop();
        var top = sticky.parent().offset().top;
        if (scrollPos > top && !isPositionFixed && $(window).width() > 980) {
            $('.nav-wrapper').css({ "height": sticky.parent().height() + "px" });
            sticky.addClass('is-fixed');
            if (sticky.is("#nav-categories")) {
                sticky.find('.tabs').addClass('is-boxed');
                sticky.find('.tabs').removeClass('is-toggle');
            }
        }
        if (scrollPos < top && isPositionFixed) {
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
            });
        }
        if (scrollPos > top + 150) {
            $('.category-icon').css({
                "width": 48,
                "margin": 4
            });
        }
        if (scrollPos > top && scrollPos < top + 150 && isPositionFixed) {
            $('.category-icon').css({
                "width": 96 - (scrollPos - top) / 150 * (96 - 48),
                "margin": 16 - (scrollPos - top) / 150 * (16 - 4)
            });
        }
    }
});
'use strict';

$('.faq').click(function (a) {
    $(this).find('.toggle-faq .icon i').toggleClass('fa-caret-down fa-caret-up');
    $(this).find('.answer').toggle(function () {
        $(this).find('.answer').slideUp('2000');
    }, function () {
        $(this).find('.answer').slideDown('200');
    });
});