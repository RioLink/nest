let adsLoaded = false;
function loadAds() {
  if (adsLoaded) return;
  adsLoaded = true;
  const s = document.createElement("script");
  s.src =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6818700400318637";
  s.async = true;
  s.crossOrigin = "anonymous";
  document.head.appendChild(s);
  document.querySelectorAll(".ad-slot").forEach((slot, index) => {
    slot.innerHTML = `<div><strong>Reserved Ad Slot ${index + 1}</strong><br><span class="small">Layout-safe placeholder for AdSense / RSOC / sponsored search.</span></div>`;
    slot.setAttribute("data-ads-ready", "true");
  });
}
