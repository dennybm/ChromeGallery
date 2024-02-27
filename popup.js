var mousePosition;
var offset = [0,0];
var div;
var isDown = false;
var draggingItem;

chrome.storage.local.get("imageUrl", function(data) {
    if (data.imageUrl) {
      var container = document.getElementById("savedUrls");
      
      data.imageUrl.forEach((image) => {
          var item = document.createElement("img");
          item.src = image;
          container.appendChild(item);
          item.addEventListener('mousedown', function(e) {
            isDown = true;
            draggingItem = item;
            offset = [
                item.offsetLeft - e.clientX,
                item.offsetTop - e.clientY
            ];
        }, true);
      })
    }
  });

  document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {
    
            x : event.clientX,
            y : event.clientY
    
        };
        draggingItem.style.left = (mousePosition.x + offset[0]) + 'px';
        draggingItem.style.top  = (mousePosition.y + offset[1]) + 'px';
        console.log("dragged" + draggingItem.src);
        console.log("dragged left" + draggingItem.style.left);
        console.log("dragged top" + draggingItem.style.top);
    }
}, true);