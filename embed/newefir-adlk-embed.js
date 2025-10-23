(function (win, doc) {
  var cfg = win.NEWEFIR_ADLK || {};
  var containerId   = cfg.containerId   || "adlk-embed";
  var width         = cfg.width         || 300;
  var height        = cfg.height        || 250;
  var host          = cfg.host          || 2243;
  var playMode      = cfg.playMode      || "autoplay-visible";
  var collapse      = cfg.collapse      || "none";
  var infinity      = cfg.infinity !== false;
  var infinityTimer = cfg.infinityTimer || 1;
  var maxWaitMs     = cfg.maxWaitMs     || 10000;
  var start         = Date.now();

  function ensureContainer() {
    var el = doc.getElementById(containerId);
    if (!el) {
      el = doc.createElement("div");
      el.id = containerId;
      el.style.width = width + "px";
      el.style.height = height + "px";
      el.style.margin = "0 auto";
      doc.body.appendChild(el);
    }
    return el;
  }

  function loadScript(src, cb) {
    var s = doc.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = cb;
    s.onerror = cb;
    (doc.head || doc.documentElement).appendChild(s);
  }

  function tryInit() {
    if (win.UTInventoryCore) {
      ensureContainer();
      new win.UTInventoryCore({
        type: "embed",
        host: host,
        content: false,
        container: containerId,
        width: width,
        height: height,
        playMode: playMode,
        collapse: collapse,
        infinity: infinity,
        infinityTimer: infinityTimer,
      });
      return true;
    }
    return false;
  }

  (function boot() {
    if (tryInit()) return;

    // Опционально загружаем ядро, если указан URL (см. iframe ниже)
    var coreUrl = cfg.coreUrl || win.UT_CORE_URL;
    if (coreUrl && !boot._requested) {
      boot._requested = true;
      loadScript(coreUrl, function () { setTimeout(boot, 50); });
      return;
    }

    if (Date.now() - start < maxWaitMs) {
      setTimeout(boot, 100);
    } else {
      // Фолбэк: скрываем контейнер, чтобы не оставлять "пустой" блок
      var el = ensureContainer();
      el.innerHTML = "";
      el.style.display = "none";
    }
  })();
})(window, document);
