(function () {
  "use strict";

  function getFilename(url) {
    if (!url) return "";

    try {
      var parsed = new URL(url, window.location.origin);
      return parsed.pathname.split("/").pop().toLowerCase();
    } catch (error) {
      return url.split("?")[0].split("#")[0].split("/").pop().toLowerCase();
    }
  }

  function hideBrokenFeaturedImage() {
    var featuredImage = document.querySelector(".post-article__featured-image img");
    if (!featuredImage) return;

    featuredImage.addEventListener("error", function () {
      var container = featuredImage.closest(".post-article__featured-image");
      if (container) container.hidden = true;
    }, { once: true });
  }

  function removeDuplicateLeadImage() {
    var featuredImage = document.querySelector(".post-article__featured-image img");
    var contentRoot = document.querySelector(".post-article__content");

    if (!featuredImage || !contentRoot) return;

    var firstContentImage = contentRoot.querySelector("picture img, img");
    if (!firstContentImage) return;

    var featuredName = getFilename(featuredImage.currentSrc || featuredImage.src);
    var contentName = getFilename(firstContentImage.currentSrc || firstContentImage.src);

    if (!featuredName || featuredName !== contentName) return;

    var removable = firstContentImage.closest("p, figure") || firstContentImage.closest("picture");

    if (removable) {
      removable.remove();
    } else {
      firstContentImage.remove();
    }
  }

  function init() {
    hideBrokenFeaturedImage();
    removeDuplicateLeadImage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
