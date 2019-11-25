# Testing Cross-Origin Fetch from Service Workers

I am reliably informed by the inimitable [PhistucK](https://github.com/phistuck) that V3 extensions should be able to load all resources via the `fetch` API if the correct `host_permissions` are given.  Save it as `manifest.json`:

````
{
  "name": "CORTester",
  "version": "0.0.0.1",
  "description": "Test Cross Origin Fetch from Service Workers",
  "host_permissions": ["<all_urls>"],
  "background": { "service_worker": "stub.js" },
  "manifest_version": 3
}
````

Here's the service worker, which does nothing but confirm it has loaded. Save it as `stub.js`, in the root directory with `manifest.json`:

````
console.log("Service worker has loaded.");
````

In theory it should be possible to fetch any resource with this extension.  How to try it out:

- Open `chrome://serviceworker-internals`.
- Open `chrome://extensions` in a new tab.
- Load CORTester by dragging its parent folder into `chrome://extensions`.
- Note your new extension ID, which will be a long string of lower-case letters like `deadbeefdeadbeefdeadbeefdeadbeef`.
- Switch to `chrome://serviceworker-internals`.
- Find the service worker that matches your ID
- If it's not running, click Start.
- Once it's running, click Inspect.  A pop-up inspector should open.
- Switch to the Console tab in the pop-up inspector and observe that "Service worker has loaded" is present.
- At the Console prompt, paste this:

````
fetch("https://phistuck-app.appspot.com").then(r=>r.arrayBuffer()).then(console.log);
````

### Expected: 

A Promise {<pending>} note and then the text of the reply, which will be HTML, starting with this:

````
<!doctype html>
<html>
 <head>
  <title>PhistucK App</title>
````

### Output:

````
Access to fetch at 'https://phistuck-app.appspot.com/' from origin 'chrome-extension://deadbeefdeadbeefdeadbeefdeadbeef' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

Uncaught (in promise) TypeError: Failed to fetch
````

## Test with a CORS-wrapped resource:

````
fetch("https://widgets.pinterest.com/v1/urls/count.json?url=https%3A%2F%2Fwww.flickr.com%2Fphotos%2Fkentbrew%2F6851755809%2F").then(r=>r.text()).then(console.log);
````

### Output:

````
receiveCount({"url":"https://www.flickr.com/photos/kentbrew/6851755809/","count":65326})
````

