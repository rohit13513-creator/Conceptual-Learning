// Loaded before the app. If the app fails to start (script error, blocked file, very slow phone
// connection), replace the loading text with a clear message and a reload button instead of leaving
// a blank page.
(function () {
  var shown = false;
  function fail(reason) {
    if (shown) return;
    var boot = document.getElementById('boot');
    if (!boot) return; // the app has already replaced the loading text
    shown = true;
    boot.innerHTML =
      '<div style="max-width:320px;text-align:center;line-height:1.5">' +
      '<p style="font-weight:700;font-size:16px;margin:0 0 8px">The page did not finish loading</p>' +
      '<p style="margin:0 0 16px;opacity:.8">Please check your internet connection and try again. If it keeps happening, tell your teacher which phone and browser you use.</p>' +
      '<button id="boot-reload" style="background:#22d3ee;color:#0f172a;border:0;border-radius:10px;padding:10px 20px;font-weight:700;font-size:14px">Reload</button>' +
      '<p style="margin:14px 0 0;font-size:10px;opacity:.5">' + String(reason || '').slice(0, 120) + '</p></div>';
    var b = document.getElementById('boot-reload');
    if (b) b.onclick = function () { location.reload(); };
  }
  window.addEventListener('error', function (e) {
    var t = e && e.target;
    if (t && t.src && t.src.indexOf('accounts.google.com') > -1) return; // Google sign-in script being blocked is not an app failure
    fail((e && e.message) || 'script error');
  }, true);
  window.addEventListener('unhandledrejection', function (e) { fail('startup error'); });
  setTimeout(function () { fail('still loading after 25 seconds'); }, 25000);
})();
