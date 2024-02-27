var mousePosition;
var offset = [0,0];
var div;
var isDown = false;
var draggingItem;

chrome.storage.local.get("imageUrl", function(data) {
    if (data.imageUrl) {
      var container = document.getElementById("savedUrls");
      
      data.imageUrl.forEach((image) => {
        console.log('creating image for ' + image);
          var item = document.createElement("img");
          item.src = image;
          container.appendChild(item);
          item.addEventListener('mousedown', function(e) {
            isDown = true;
            draggingItem = item;

            if (item.style.left){
                var left = parseInt(item.style.left, 10); 
                var top = parseInt(item.style.top, 10); 
            }
            else{
                var left = 0;
                var top = 0;
            }

            offset = [
                left - e.clientX,
                top - e.clientY
            ];

            console.log(item.getBoundingClientRect().left);
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
    }
}, true);