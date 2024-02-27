document.getElementById("open-new-page").addEventListener("click", function() {
    chrome.tabs.create({ url: "gallery.html" });
  });