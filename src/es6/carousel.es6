let owl = $('.owl-carousel');
let owlOptions = {
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
}

// $('.play').on('click', function () {
//   owl.trigger('play.owl.autoplay', [3000])
// })
// $('.stop').on('click', function () {
//   owl.trigger('stop.owl.autoplay')
// })

if ($(window).width() > 768) {
  var owlActive = owl.owlCarousel(owlOptions);
} else {
  owl.addClass('off');
}

$(window).resize(function () {
  if ($(window).width() > 768) {
    if ($('.owl-carousel').hasClass('off')) {
      var owlActive = owl.owlCarousel(owlOptions);
      owl.removeClass('off');
    }
  } else {
    if (!$('.owl-carousel').hasClass('off')) {
      owl.addClass('off').trigger('destroy.owl.carousel');
      owl.find('.owl-stage-outer').children(':eq(0)').unwrap();
    }
  }
});