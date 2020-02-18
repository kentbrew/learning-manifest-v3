Good news! This seems to be [fixed as of 2020-02-07](https://bugs.chromium.org/p/chromium/issues/detail?id=661827). I'll leave this here in case of regression.

# Inconsistent fetch API behavior

In a previous post from November I reported difficulties using the fetch API under Manifest V3 to load cross-domain resouces with `"<all_urls>"` or `"*://*/*"`.

As of now I think it's a service worker problem and not a manifest v3 problem.

## Code

### `background.js` is identical for both tests:

```
fetch("https://www.example.com/")
  .then(r => r.text())
  .then(console.log);
```

### Background script version, `manifest.json`:

```
{
  "name": "BG Fetch",
  "description": "Background Script Fetch Test",
  "version": "0.1.1",
  "permissions": ["<all_urls>"],
  "background": {
    "scripts": ["background.js"]
  },
  "manifest_version": 2
}
```

### Service worker version, `manifest.json`:

```
{
  "name": "SW Fetch",
  "description": "Service Worker Fetch Test",
  "version": "0.1.1",
  "permissions": ["<all_urls>"],
  "background": {
    "service_worker": "background.js"
  },
  "manifest_version": 2
}
```

## Results

The background version successfully fetches example.com; the service worker version fails on CORS policy.

Testing on Chrome Canary Version 80.0.3987.0; on stable you'll get an error saying background.service_worker is not ready for prime time.

Looks like this may be a very old known bug:  https://bugs.chromium.org/p/chromium/issues/detail?id=661827
