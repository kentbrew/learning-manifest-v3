// let us know we're running
console.log("Background script has loaded via Manifest V2.");

// clear, add, and listen to new context menu
const handleContextMenus = () => {
  // don't try to duplicate this menu item
  chrome.contextMenus.removeAll();

  // create a menu
  chrome.contextMenus.create({
    id: "BaselineV2",
    title: "V2 Baseline",
    // show the menu over everything
    contexts: ["all"],

    // old-school inline interaction handler
    onclick: () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          msg: "Greetings from your Baseline V2 context menu"
        });
      });
    }
  });
};

// listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // log the message
  console.log("Message received!", request);

  // has the content script asked to us execute our business logic?
  if (request.cmd === "runLogic") {
    chrome.tabs.executeScript(sender.tab.id, {
      file: "js/logic.js"
    });
  }

  // has our business logic asked us to add a menu?
  if (request.cmd === "addMenu") {
    handleContextMenus();
  }
});
