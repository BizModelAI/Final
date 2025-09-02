// Clear cache and reload
console.log("Clearing browser cache...");

// Clear localStorage
localStorage.clear();

// Clear sessionStorage
sessionStorage.clear();

// Clear service worker cache if present
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}

// Clear browser cache programmatically
if ("caches" in window) {
  caches.keys().then(function (names) {
    for (let name of names) {
      caches.delete(name);
    }
  });
}

console.log("Cache cleared, reloading...");
const reloadTimeout = setTimeout(() => {
  window.location.reload(true);
}, 1000);

// Cleanup function to prevent memory leaks
const cleanup = () => {
  if (reloadTimeout) {
    clearTimeout(reloadTimeout);
  }
};

// Clean up if the script is unloaded before timeout completes
window.addEventListener('beforeunload', cleanup);

// Clean up the event listener when possible
const cleanupEventListeners = () => {
  window.removeEventListener('beforeunload', cleanup);
};

// Try to clean up on page unload (though this may not always work)
window.addEventListener('unload', cleanupEventListeners);
