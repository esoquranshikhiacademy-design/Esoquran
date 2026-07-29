// এসো কুরআন শিখি একাডেমি — সার্ভিস ওয়ার্কার
// রানটাইম ক্যাশিং: স্ট্যাটিক অ্যাসেট cache-first, পেজ/API network-first
// (ফায়ারবেজ থেকে ডাইনামিক ডেটা আসে বলে বিল্ড-টাইমে সব রুট প্রি-ক্যাশ করা হচ্ছে না)

const CACHE_VERSION = "eqs-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGE_CACHE = `${CACHE_VERSION}-pages`;
const OFFLINE_URL = "/offline.html";

const PRECACHE_URLS = [
  "/",
  OFFLINE_URL,
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !key.startsWith(CACHE_VERSION))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    /\.(png|jpg|jpeg|svg|webp|woff2?|css|ico)$/.test(url.pathname)
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // শুধু নিজেদের অরিজিনের রিকোয়েস্ট হ্যান্ডল করা — Firebase/থার্ড-পার্টি রিকোয়েস্ট ব্রাউজারের হাতে ছেড়ে দেওয়া
  if (url.origin !== self.location.origin) return;
  if (request.method !== "GET") return;

  // স্ট্যাটিক অ্যাসেট: cache-first
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const clone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // পেজ নেভিগেশন: network-first, ব্যর্থ হলে ক্যাশ, তাও না থাকলে অফলাইন পেজ
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(PAGE_CACHE).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // বাকি সব (API-জাতীয়): network-first, ক্যাশে ফলব্যাক
  event.respondWith(
    fetch(request)
      .then((response) => {
        const clone = response.clone();
        caches.open(PAGE_CACHE).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() => caches.match(request))
  );
});
