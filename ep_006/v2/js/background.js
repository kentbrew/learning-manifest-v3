// transform an image into very large pixels
const deRezz = (img, canvas) => {
  // how big will our squares be?
  const chunkSize = 20;
  // a canvas has several possible contexts; this is the one that will let us draw an image
  let context = canvas.getContext("2d");
  // disable image smoothing, which may give us different results for different browsers
  context.imageSmoothingEnabled = false;
  // draw the image full-size, to exactly fill canvas
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
  // convert what's on the canvas to an image data object
  let imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
  // for our demo: downsample into big blocks of color
  let row, column, pixel;
  for (row = 0; row < canvas.height; row = row + chunkSize) {
    for (col = 0; col < canvas.width; col = col + chunkSize) {
      pixel = (row * canvas.width + col) * 4;
      context.fillStyle =
        "#" +
        ("00" + imageData[pixel].toString(16)).substr(-2, 2) +
        ("00" + imageData[pixel + 1].toString(16)).substr(-2, 2) +
        ("00" + imageData[pixel + 2].toString(16)).substr(-2, 2);
      context.fillRect(col, row, chunkSize, chunkSize);
    }
  }
};

// convert an image URL into a data:URI
const getImageData = request => {
  // being able to wrap all of this in a single promise is super handy
  return new Promise(resolve => {
    // make a new image
    let img = new Image();
    // once the image has loaded, do all this
    img.onload = () => {
      // make a canvas
      let canvas = document.createElement("CANVAS");
      // set canvas dimensions to the image's real dimensions
      canvas.height = img.naturalHeight;
      canvas.width = img.naturalWidth;
      // run the image through a transformation function
      deRezz(img, canvas);
      // all done? resolve our promise
      resolve({
        status: "OK",
        oldImageSrc: request.oldImageSrc,
        newImageSrc: canvas.toDataURL("image/png")
      });
    };
    // this should never happen, since the image has already rendered to the browser
    img.onerror = function() {
      resolve({ status: "error", url: request.oldImageSrc });
    };
    // setup is complete; source the image to load
    img.src = request.oldImageSrc;
  });
};

// what to do when someone clicks our menu item
const handleMenuClick = (event, tabId) => {
  getImageData({ oldImageSrc: event.srcUrl }).then(result => {
    // our updated image has rendered
    // throw it back to the content script, which will render it in place of the original
    chrome.tabs.sendMessage(tabId, {
      // find this image
      oldImageSrc: result.oldImageSrc,
      // re-render it with this as its src
      newImageSrc: result.newImageSrc
    });
  });
};

// a list of commands we are willing to carry out when content scripts ask
const cmd = {
  // clear, add, and listen to new context menu (no args required)
  addMenu: () => {
    // don't try to duplicate this menu item
    chrome.contextMenus.removeAll();
    // create a menu
    chrome.contextMenus.create({
      id: "BaselineV2",
      title: "V2 Baseline",
      // show the menu over images
      contexts: ["image"],
      // old-school inline interaction handler
      onclick: event => {
        // because the click came from a global UI element we need to figure out which tab it came from
        chrome.tabs.query({ active: true, currentWindow: true }, function(
          tabs
        ) {
          // pass the event AND the tab ID, which should be in tabs[0]
          handleMenuClick(event, tabs[0].id);
        });
      }
    });
  },
  runLogic: (request, sender) => {
    chrome.tabs.executeScript(sender.tab.id, {
      file: "js/logic.js"
    });
  }
};

// listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.cmd) {
    // can we carry out this command?
    if (typeof cmd[request.cmd] === "function") {
      cmd[request.cmd](request, sender);
    }
  }
});
