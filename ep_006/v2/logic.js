// listen for messages from the background
chrome.runtime.onMessage.addListener(message => {
  // should we render our converted image?
  if (message.oldImageSrc) {
    // filter an array of all images on the page
    Array.from(document.getElementsByTagName("IMG")).filter(img => {
      // find all images matching the source of the one we right-clicked
      if (img.src && img.src === message.oldImageSrc) {
        // swap in the updated source
        img.src = message.newImageSrc;
      }
    });
  }
});
