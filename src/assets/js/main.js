'use strict';

document.addEventListener('DOMContentLoaded', function () {
  /* ------------ Modal Wins ------------ */
  document.addEventListener('click', function (e) {
    let target = e.target;

    if (!target.closest('[data-modal-win-trigger]')) return;

    let winId = target.dataset.modalWinTrigger;

    let instance = new Modal({
      content: document.querySelector('[data-modal-win="' + winId + '"]'),
      className: '',
    });

    instance.open();

    e.preventDefault();
  });
  /* ------------ Modal Wins ------------ */

  /* ------------ Tabs ------------ */
  document.querySelectorAll('.tabs').forEach(function(item) {

    item.querySelectorAll('.tabs__link').forEach(function(item, i) {

      item.addEventListener('click', function(e) {
        let target = e.target;

        e.preventDefault();

        if ( target.classList.contains('is-active') ) return;

        let hash = target.getAttribute('href');
        if (hash != '#') {
          window.location.hash = hash;
        }

        let root = target.closest('.tabs');
        clearTabClasses(root, i);
      });

    });

  });

  function clearTabClasses(root, i) {
    root.querySelectorAll('.tabs__item').forEach(function(item) {
      item.querySelector('.tabs__link').classList.remove('is-active');
    });
    root.querySelectorAll('.tabs__tab-pane').forEach(function(item) {
      item.classList.remove('is-active');
    });

    root.querySelector('.tabs__item:nth-child(' + (i+1) + ') .tabs__link').classList.add('is-active');
    root.querySelector('.tabs__tab-pane:nth-child(' + (i+1) + ')').classList.add('is-active');

    initActiveCarousel();
  }

  let currentHash = window.location.hash;
  let hashTab = document.querySelector('.tabs__link[href="' + currentHash + '"]');
  if (hashTab) {
    let ev = new Event('click');
    hashTab.dispatchEvent(ev);
  }
  /* ------------ Tabs ------------ */

  /* ------------ Carousels ------------ */
  function initActiveCarousel() {
    const currentInstance = document.querySelector('.tabs__tab-pane.is-active .courses-carousel');

    if (!currentInstance) return;

    let loopInstance = false;
    const prev = currentInstance.parentNode.querySelector('.courses-carousel-prev');
    const next = currentInstance.parentNode.querySelector('.courses-carousel-next');
    const pagination = currentInstance.parentNode.querySelector('.courses-carousel-pagination');

    if ( currentInstance.querySelectorAll('.swiper-slide').length > 3 ) {
      loopInstance = true
    } else {
      currentInstance.classList.add('disabled');
    }

    new Swiper(currentInstance, {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 35,
      //loop: true,
      pagination: {
        el: pagination,
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          return '<span class="swiper-pagination-current">' + ('0' + current).slice(-2) + '</span> / <span class="swiper-pagination-total">' + ('0' + total).slice(-2) + '</span>';
        }
      },
      navigation: {
        prevEl: prev,
        nextEl: next,
      },
      breakpoints: {
        600: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        820: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        }
      },
    });
  }

  initActiveCarousel();
  /* ------------ Carousels ------------ */
});

svg4everybody({});
