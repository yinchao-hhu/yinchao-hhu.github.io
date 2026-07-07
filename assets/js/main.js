(function () {
  function setLanguage(mode) {
    document.documentElement.dataset.lang = mode;
    document.documentElement.lang = mode === "en" ? "en" : "zh-CN";

    document.querySelectorAll("[data-lang-filter]").forEach(function (button) {
      var isActive = button.dataset.langFilter === mode;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    try {
      window.localStorage.setItem("homepage-language", mode);
    } catch (error) {
      // Local storage may be disabled in some browsers; the page still works without it.
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var savedLanguage = "all";

    try {
      savedLanguage = window.localStorage.getItem("homepage-language") || "all";
    } catch (error) {
      savedLanguage = "all";
    }

    if (!["all", "zh", "en"].includes(savedLanguage)) {
      savedLanguage = "all";
    }

    document.querySelectorAll("[data-lang-filter]").forEach(function (button) {
      button.addEventListener("click", function () {
        setLanguage(button.dataset.langFilter);
      });
    });

    setLanguage(savedLanguage);

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  });
})();
