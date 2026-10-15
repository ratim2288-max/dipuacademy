// Clean up any registered service workers
if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (var reg of registrations) {
      reg.unregister();
    }
  }).catch(function() {});
}
