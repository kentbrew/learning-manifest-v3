  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received!");
  console.log("request: ", request);
  console.log("sender: ", sender);
  if (request.cmd === "runLogic") {
    chrome.scripting.executeScript(
      {
        target: {tabId: sender.tab.id},
      files: ["js/logic.js"]
    },
    () => { });
  }
});
