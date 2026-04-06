function hideBanner() {
  const b = document.getElementById("cookie-banner");
  if (b) b.classList.remove("is-visible");
}
function showBanner() {
  const b = document.getElementById("cookie-banner");
  if (b) b.classList.add("is-visible");
}
document.addEventListener("DOMContentLoaded", () => {
  const c = localStorage.getItem("cookieConsent");
  if (c === "granted") {
    if (typeof loadAds === "function") loadAds();
    hideBanner();
  } else if (c === "denied") {
    hideBanner();
  } else {
    showBanner();
  }
  document.querySelectorAll("[data-cookie-accept]").forEach((btn) =>
    btn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "granted");
      if (typeof loadAds === "function") loadAds();
      hideBanner();
      const m = document.getElementById("cookie-modal");
      if (m) m.classList.remove("is-visible");
    }),
  );
  document.querySelectorAll("[data-cookie-reject]").forEach((btn) =>
    btn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "denied");
      hideBanner();
      const m = document.getElementById("cookie-modal");
      if (m) m.classList.remove("is-visible");
    }),
  );
});
