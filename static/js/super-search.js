/* Super Search (safe, feed-first parser) */

(function () {
  var ROOT_SELECTOR = "#js-super-search, .super-search, #js-search, .search, .subpage-hero__search";
  var searchInputEl = document.querySelector("#js-super-search__input") ||
      document.querySelector(".super-search__input") ||
      document.querySelector("#js-search__input") ||
      document.querySelector("#search-input-subpage");
  var searchResultsEl = document.querySelector("#js-super-search__results") ||
      document.querySelector(".super-search__results") ||
      document.querySelector(".search__results") ||
      document.querySelector("#js-search__results") ||
      document.querySelector("#results-container-subpage");
  var searchEl = (searchInputEl && searchInputEl.closest(ROOT_SELECTOR)) ||
      (searchResultsEl && searchResultsEl.closest(ROOT_SELECTOR)) ||
      document.querySelector("#js-super-search") ||
      document.querySelector(".super-search") ||
      document.querySelector("#js-search") ||
      document.querySelector(".subpage-hero__search") ||
      document.querySelector(".search");
  var lastSearchResultHash = "";
  var posts = [];

  function getText(parent, tagName) {
    if (!parent) return "";
    var node = parent.getElementsByTagName(tagName)[0];
    return node && node.textContent ? node.textContent.trim() : "";
  }

  function normalizeLink(value) {
    if (!value) return "";

    try {
      var parsed = new URL(value, window.location.origin);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return "";
      return parsed.href;
    } catch (error) {
      return "";
    }
  }

  function parseFeed(xmlDoc) {
    var items = xmlDoc.getElementsByTagName("item");
    var result = [];

    for (var i = 0; i < items.length; i += 1) {
      var item = items[i];
      var title = getText(item, "title");
      var link = normalizeLink(getText(item, "link"));

      if (!title || !link) continue;

      result.push({
        title: title,
        description: getText(item, "description"),
        link: link,
        pubDate: getText(item, "pubDate")
      });
    }

    return result;
  }

  function parseSitemap(xmlDoc) {
    var urls = xmlDoc.getElementsByTagName("url");
    var result = [];

    for (var i = 0; i < urls.length; i += 1) {
      var url = urls[i];
      var link = normalizeLink(getText(url, "loc"));
      if (!link) continue;

      var pathname = "";
      try {
        pathname = new URL(link, window.location.origin).pathname;
      } catch (error) {
        pathname = link;
      }

      var slug = pathname.split("/").filter(Boolean).pop() || pathname;
      var title = decodeURIComponent(slug)
        .replace(/\.html$/i, "")
        .replace(/[-_]/g, " ")
        .trim();

      if (!title) continue;

      result.push({
        title: title,
        description: "",
        link: link,
        pubDate: getText(url, "lastmod")
      });
    }

    return result;
  }

  function loadPosts(url, onSuccess, onFailure) {
    var request = new XMLHttpRequest();

    request.open("GET", url);
    request.onreadystatechange = function () {
      if (request.readyState !== 4) return;
      if (request.status !== 200 && request.status !== 304) {
        if (onFailure) onFailure();
        return;
      }

      var xmlDoc = new DOMParser().parseFromString(request.responseText, "text/xml");
      if (!xmlDoc || !xmlDoc.documentElement) {
        if (onFailure) onFailure();
        return;
      }

      var parsed = parseFeed(xmlDoc);
      if (!parsed.length) {
        parsed = parseSitemap(xmlDoc);
      }

      onSuccess(parsed);
    };

    request.send();
  }

  function hideResults() {
    if (!searchResultsEl) return;
    searchResultsEl.classList.add("is-hidden");
    searchResultsEl.style.display = "none";
  }

  function setActive(isActive) {
    if (!searchEl || !searchEl.classList) return;
    searchEl.classList.toggle("is-active", !!isActive);
  }

  function formatDate(value) {
    if (!value) return "";
    var date = new Date(value);
    if (isNaN(date.getTime())) return "";
    return date.toUTCString().replace(/.*(\d{2})\s+(\w{3})\s+(\d{4}).*/, "$2 $1, $3");
  }

  function applyCompatibilityClasses() {
    if (searchEl && searchEl.classList) {
      if (!searchEl.classList.contains("search") && !searchEl.classList.contains("super-search") &&
          !searchEl.classList.contains("subpage-hero__search")) {
        searchEl.classList.add("search");
      }
    }

    if (searchInputEl && searchInputEl.classList) {
      if (!searchInputEl.classList.contains("super-search__input")) {
        searchInputEl.classList.add("super-search__input");
      }
    }

    if (searchResultsEl && searchResultsEl.classList) {
      if (!searchResultsEl.classList.contains("super-search__results") &&
          !searchResultsEl.classList.contains("search__results")) {
        searchResultsEl.classList.add("super-search__results");
      }
    }
  }

  function renderResults(matchingPosts) {
    if (!searchResultsEl) return;

    if (!matchingPosts.length) {
      hideResults();
      return;
    }

    var currentResultHash = matchingPosts.reduce(function (hash, post) {
      return hash + post.title;
    }, "");

    if (currentResultHash === lastSearchResultHash) return;

    setActive(true);
    searchResultsEl.classList.remove("is-hidden");
    searchResultsEl.style.display = "block";
    searchResultsEl.replaceChildren();
    matchingPosts.forEach(function (post) {
      var safeLink = normalizeLink(post.link);
      if (!safeLink) return;

      var resultItem = document.createElement("li");
      var resultLink = document.createElement("a");
      resultLink.href = safeLink;
      resultLink.textContent = post.title || "제목 없음";

      if (new URL(safeLink, window.location.origin).origin !== window.location.origin) {
        resultLink.target = "_blank";
        resultLink.rel = "noopener noreferrer";
      }

      resultItem.appendChild(resultLink);
      var dateLabel = formatDate(post.pubDate);
      if (dateLabel) {
        var dateElement = document.createElement("span");
        dateElement.className = "search__result-date super-search__result-date";
        dateElement.textContent = dateLabel;
        resultLink.appendChild(dateElement);
      }

      searchResultsEl.appendChild(resultItem);
    });

    lastSearchResultHash = currentResultHash;
  }

  function onInputChange() {
    var currentInputValue = (searchInputEl.value + "").toLowerCase().trim();

    if (!currentInputValue || currentInputValue.length < 3) {
      lastSearchResultHash = "";
      hideResults();
      return;
    }

    var matchingPosts = posts.filter(function (post) {
      var title = (post.title || "").toLowerCase();
      var description = (post.description || "").toLowerCase();
      return title.indexOf(currentInputValue) !== -1 || description.indexOf(currentInputValue) !== -1;
    });

    renderResults(matchingPosts);
  }

  window.toggleSearch = function toggleSearch() {
    if (!searchInputEl) return;

    var nextActive = !(searchEl && searchEl.classList && searchEl.classList.contains("is-active"));
    setActive(nextActive);

    if (nextActive) {
      searchInputEl.focus();
    } else {
      hideResults();
      searchInputEl.blur();
    }
  };

  function onGlobalKeyDown(event) {
    var target = event.target;
    var tagName = target && target.tagName ? target.tagName.toLowerCase() : "";
    var isTypingContext = tagName === "input" || tagName === "textarea" || target.isContentEditable;

    if (event.which === 27) {
      event.preventDefault();
      hideResults();
      setActive(false);
      if (searchInputEl) searchInputEl.blur();
      return;
    }

    if (!isTypingContext && event.which === 47) {
      event.preventDefault();
      setActive(true);
      searchInputEl.focus();
    }
  }

  function init() {
    if (!searchInputEl || !searchResultsEl) {
      return;
    }

    applyCompatibilityClasses();
    hideResults();
    searchInputEl.addEventListener("input", onInputChange);
    searchInputEl.addEventListener("click", function () {
      setActive(true);
    });
    searchInputEl.addEventListener("focus", function () {
      setActive(true);
    });
    document.addEventListener("click", function (event) {
      var root = searchEl || (searchInputEl && searchInputEl.closest(ROOT_SELECTOR));
      if (!root || !root.contains || root.contains(event.target)) return;
      hideResults();
      setActive(false);
    });
    window.addEventListener("keyup", onGlobalKeyDown);
    window.addEventListener("keypress", onGlobalKeyDown);

    loadPosts("/feed.xml", function (loadedPosts) {
      posts = loadedPosts;
    }, function () {
      loadPosts("/sitemap.xml", function (loadedPosts) {
        posts = loadedPosts;
      });
    });
  }

  init();
})();
