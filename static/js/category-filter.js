/**
 * Category Filter — Vanilla JS (no jQuery dependency)
 * Filters blog post cards by category tab selection.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var filterContainer = document.querySelector('.category-filter');
    if (!filterContainer) return;

    var buttons = filterContainer.querySelectorAll('.category-filter__btn');
    var cards = document.querySelectorAll('.blog-section .post-card');
    var featuredCard = document.querySelector('.blog-section .post-card--featured');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var category = this.getAttribute('data-filter');

        // Update active state
        buttons.forEach(function (b) { b.classList.remove('category-filter__btn--active'); });
        this.classList.add('category-filter__btn--active');

        // Filter cards
        cards.forEach(function (card) {
          if (category === 'all') {
            card.style.display = '';
          } else {
            var cardCat = (card.getAttribute('data-category') || '').toLowerCase();
            card.style.display = (cardCat === category.toLowerCase()) ? '' : 'none';
          }
        });

        // Filter featured card
        if (featuredCard) {
          if (category === 'all') {
            featuredCard.style.display = '';
          } else {
            var featuredCat = (featuredCard.getAttribute('data-category') || '').toLowerCase();
            featuredCard.style.display = (featuredCat === category.toLowerCase()) ? '' : 'none';
          }
        }
      });
    });
  });
})();
