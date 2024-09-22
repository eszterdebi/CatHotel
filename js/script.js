(function ($) {

  var initScrollNav = function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
      $('.navbar.fixed-top').addClass("bg-gray-100");
    } else {
      $('.navbar.fixed-top').removeClass("bg-gray-100");
    }
  }

  $(window).scroll(function () {
    initScrollNav();
  });


  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }

  "use strict";

  $(document).ready(function () {

    initChocolat();

    var swiper = new Swiper(".product-swiper", {
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        nextEl: ".icon-arrow-right",
        prevEl: ".icon-arrow-left",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        901: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 5,
        },
      },
    });
  });
})(jQuery);