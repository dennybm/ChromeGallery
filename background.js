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

    // get current array of images
    chrome.storage.local.get("imageUrl", function(data) {
        if (data.imageUrl) {
            console.log("got img urls " + data.imageUrl);
            images = data.imageUrl;

            // push new img to array of images
            images.push(info.srcUrl );

            // store now array of images.
            chrome.storage.local.set({ imageUrl: images }, function() {
                console.log("Image URL saved:", images);
            });
        }
    })
})
