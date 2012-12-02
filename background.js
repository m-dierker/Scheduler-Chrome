// Changes the color of things on Facebook because I can

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(
      null, {file:"fb.js"});
});

chrome.browserAction.setBadgeBackgroundColor({color:[0, 200, 0, 100]});
