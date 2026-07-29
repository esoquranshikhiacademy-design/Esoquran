# PWA আপডেট ফাইল

## নতুন ফাইল (Create)

```
public/manifest.json                          (আগেও ছিল, এখন id/scope/lang যোগ হয়েছে — replace করো)
public/sw.js
public/offline.html
public/icons/icon-192.png
public/icons/icon-512.png
public/icons/icon-maskable-192.png
public/icons/icon-maskable-512.png
public/icons/apple-touch-icon.png
public/icons/favicon-32.png
src/components/pwa/ServiceWorkerRegistrar.tsx
src/components/pwa/InstallAppButton.tsx
```

## এডিট করা ফাইল (Overwrite)

```
src/app/layout.tsx                  — manifest/icon metadata + <ServiceWorkerRegistrar /> যোগ
src/app/(app)/settings/page.tsx     — <InstallAppButton /> যোগ
next.config.ts                      — sw.js/manifest.json এর no-cache header যোগ
```

এই ফাইলগুলো তোমার প্রজেক্টে একই পাথে বসিয়ে দিলেই PWA কাজ করবে। Deploy করার পর Chrome DevTools → Application ট্যাবে Manifest ও Service Worker চেক করে নিও।
