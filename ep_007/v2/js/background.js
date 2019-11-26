// Initialize click counter
let clickCounter = 0;
// let us know it worked
console.log("V2 Baseline: initialized test click counter to 0");

// create a menu item
chrome.contextMenus.create({
  id: "BaselineV2",
  title: "V2 Baseline",
  // show the menu over everything
  contexts: ["all"]
});

// what to do when our menu is clicked
chrome.contextMenus.onClicked.addListener(event => {
  // bump the count
  clickCounter = clickCounter + 1;
  // let us know it worked
  console.log("V2 Baseline: updated baseline click counter to " + clickCounter);
});
