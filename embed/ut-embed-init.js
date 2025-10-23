// embed/ut-embed-init.js
(function UTCoreInitialization() {
  try {
    if (window.UTInventoryCore) {
      // ИНИЦИАЛИЗАЦИЯ: значения из вашего примера (560x315, host: 2243)
      new window.UTInventoryCore({
        type: "embed",
        host: 2243,
        content: false,
        container: "ut-embed",
        width: 560,
        height: 315,
        playMode: "autoplay-visible",
        collapse: "none"
      });
      return;
    }
  } catch (e) {
    // На всякий случай, чтобы видеть ошибку в консоли
    console.error("[UT] init error:", e);
  }
  setTimeout(UTCoreInitialization, 100);
})();
