$('.card.quote').matchHeight(
  {
    remove: true
  }
);
$.fn.matchHeight._maintainScroll = true;

let owlNews = $('.news.owl-carousel');
let owlOptionsNews = {
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
let owlTestimonios = $('.testimonios.owl-carousel');
let owlOptionsTestimonios = {
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
  onRefresh: function () {
    $('.card.quote').matchHeight({ remove: true });
  },
  onRefreshed: function () {
    $.fn.matchHeight._apply('.card.quote', { remove: true })
  }
}

// $('.play').on('click', function () {
//   owlNews.trigger('play.owlNews.autoplay', [3000])
// })
// $('.stop').on('click', function () {
//   owlNews.trigger('stop.owlNews.autoplay')
// })

if ($(window).width() > 768) {
  let owlActiveNews = owlNews.owlCarousel(owlOptionsNews);
  let owlActiveTestimonios = owlTestimonios.owlCarousel(owlOptionsTestimonios);
} else {
  owlNews.addClass('off');
  owlTestimonios.addClass('off');
}

$(window).resize(function () {
  if ($(window).width() > 768) {
    if ($('.news.owl-carousel').hasClass('off')) {
      let owlActiveNews = owlNews.owlCarousel(owlOptionsNews);
      owlNews.removeClass('off');
    }
    if ($('.testimonios.owl-carousel').hasClass('off')) {
      let owlActiveTestimonios = owlTestimonios.owlCarousel(owlOptionsTestimonios);
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
