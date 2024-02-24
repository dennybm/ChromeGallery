console.log('Hello World')

chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const tab = tabs[0];
      chrome.tabs.executeScript(tab.id, { file: "content.js" });
    });
  });