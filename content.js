console.log("CONTENT");
chrome.storage.local.get(["gallery"]).then((result) => {
    console.log("Value is " + result.key);
  });
  console.log("CONTENT");
