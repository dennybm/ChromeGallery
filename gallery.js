var mousePosition;
var offset = [0,0];
var div;
var isDown = false;
var draggingItem;

chrome.storage.local.get("imageUrl", function(data) {
    if (data.imageUrl) {
      var container = document.getElementById("savedUrls");
      
      var i = 0;

      data.imageUrl.forEach((image) => {
          var imageContainer = document.createElement("div");
          var item = document.createElement("img");
          item.src = image;
          imageContainer.appendChild(item);
          container.appendChild(imageContainer);
          var column = i % 4;
          var row = Math.floor(i / 4);
          imageContainer.style.gridRow = row;
          imageContainer.style.gridColumn = column;
          i++;

          item.addEventListener('wheel', (event) => {
            event.preventDefault();
            const delta = -event.deltaY / 4;
            item.style.width = `${item.offsetWidth + delta}px`;
            item.style.height = `${item.offsetHeight + delta}px`;
          });

          imageContainer.addEventListener('mousedown', function(e) {
            isDown = true;
            draggingItem = imageContainer;

            if (imageContainer.style.left){
                var left = parseInt(imageContainer.style.left, 10); 
                var top = parseInt(imageContainer.style.top, 10); 
            }
            else{
                var left = 0;
                var top = 0;
            }

            offset = [
                left - e.clientX,
                top - e.clientY
            ];

        }, true);

        var trashCan = document.createElement("img");
        trashCan.src = "trash-can.png";
        trashCan.className = "trash-can"

        imageContainer.appendChild(trashCan);

        imageContainer.addEventListener("mouseover", () => {
            trashCan.style.display = "inline";
        });

        imageContainer.addEventListener("mouseout", () => {
            trashCan.style.display = "none";
        });

        trashCan.addEventListener("click", () => {
            imageContainer.parentNode.removeChild(imageContainer);
            var newImageUrls = data.imageUrl;
            newImageUrls.splice(data.imageUrl.indexOf(image), 1);

            // store now array of images.
            chrome.storage.local.set({ imageUrl: newImageUrls }, function() {
            });
        });
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