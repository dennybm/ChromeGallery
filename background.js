chrome.runtime.onInstalled.addListener(() => {
    console.log("hello")

    //create context menu
    chrome.contextMenus.create({
        id: "wikipedia",
        title: "Add to gallery", 
        contexts: ["image"], 
    })
});

//listener for context menu
chrome.contextMenus.onClicked.addListener(function(info, tab){

    let images = [];

    chrome.storage.local.get(["gallery"]).then((result) => {
        images = result;
      });

    images.push(info.srcUrl);

    chrome.storage.local.set({ gallery: 'images' }).then(() => {
        console.log("Value is set");

        chrome.storage.session.get(['gallery']).then((result) => {
            console.log("Value retrieved: " + result.gallery);
        });

      });

    chrome.storage.session.get(["gallery"]).then((result) => {
        console.log("Value retrieved: " + result.gallery);
    });

    images.forEach(image => {
        chrome.tabs.create({ url: image });
    })
})
