(function () {
  "use strict";

  var copyButton = document.querySelector("[data-copy-page-link]");
  var toast = document.getElementById("copy-toast");
  var toastTimer = null;

  if (!copyButton || !toast) return;

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.hidden = true;
    }, 2000);
  }

  function copyWithFallback(value) {
    var temporaryInput = document.createElement("textarea");
    temporaryInput.value = value;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";
    document.body.appendChild(temporaryInput);
    temporaryInput.select();

    var copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    temporaryInput.remove();
    return copied;
  }

  copyButton.addEventListener("click", function () {
    var value = copyButton.getAttribute("data-copy-page-link");
    if (!value) return;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(function () {
        showToast("Copied!");
      }).catch(function () {
        showToast(copyWithFallback(value) ? "Copied!" : "Copy failed");
      });
      return;
    }

    showToast(copyWithFallback(value) ? "Copied!" : "Copy failed");
  });
})();
