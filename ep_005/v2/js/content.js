// let us know we're running
console.log("Content script has loaded via Manifest V2.");

// send a message to the background requesting our business logic
chrome.runtime.sendMessage({
  cmd: "runLogic"
});
