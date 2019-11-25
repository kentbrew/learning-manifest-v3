# Learning Manifest V3

At long last it's time to get serious about Manifest V3:

https://developer.chrome.com/extensions/migrating_to_manifest_v3

https://developer.chrome.com/extensions/migrating_to_service_workers

## The Show So Far

✅ *[Canary Setup](https://github.com/kentbrew/learning-manifest-v3/blob/master/canary_setup.md)*<br>
If you're like me, you a) dislike the taste of coal dust and therefore b) have never even tried Chrome Canary.

⚠️ *[Episode One: Initializing Some Things and our First Nasty Surprise](https://github.com/kentbrew/learning-manifest-v3/blob/master/ep_001.md)*<br>
Well ... crap. There's an Errors button in the UI bar.

✅ *[Episode Two: Permission to Run](https://github.com/kentbrew/learning-manifest-v3/blob/master/ep_002.md)*<br>
Site permissions and API permissions are now two distinct things.

💩 *[Episode Three: Browser Button and Default Pop-Up](https://github.com/kentbrew/learning-manifest-v3/blob/master/ep_003.md)*<br>
`'action' requires trunk channel or newer, but this is the canary channel`

⚠️ *[Episode Four: ~~Executing Scripts~~ Service Workers](https://github.com/kentbrew/learning-manifest-v3/blob/master/ep_004.md)*<br>
This episode started off being about executing content scripts, but we have to deal with service workers first.

✅ *[Episode Five: Context Menus](https://github.com/kentbrew/learning-manifest-v3/blob/master/ep_005.md)*<br>
The old-school inline `onclick` handler won't do, because our service worker is not a persistent background script.

⚠️ *[Episode Six: Convert Any Image URL to Data](https://github.com/kentbrew/learning-manifest-v3/blob/master/ep_006.md)*<br>
This is hairy. Manifest V3 has no DOM in the background, so no more drawing to `canvas` after `img.onload`.  (Updated: this may be a bug. Here's [Testing Cross-Origin Fetch from Service Workers](https://github.com/kentbrew/learning-manifest-v3/blob/master/CORtest.md), to help figure it out.)
