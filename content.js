console.log("lets go");

function addClickHandlerToAllImages() {
    // Get the border style
    const originalBorder = document.body.style.border;

    // Get all images on the page
    const images = document.querySelectorAll('img');

      // Store initial border states for each image
    const imageBorders = {};
    images.forEach(image => {
        imageBorders[image.src] = image.style.border;
    });

      // Function to revert border to its previous state
    function revertBorder(image) {
        image.style.border = imageBorders[image.src];
    }
  
    // Store the original click handler function
    const originalClickListener = (ev) => {
      ev.preventDefault();
      console.log('Image clicked:', event.target.src);
      return false;
    };
  
    // Add a click event listener to each image
    images.forEach(image => {
      image.addEventListener('contextmenu', originalClickListener);
      image.style.border = "2px solid red";
    });
  
    // Function to remove click handler from all images
    function removeClickHandler() {
      images.forEach(image => {
        image.removeEventListener('contextmenu', originalClickListener);
        revertBorder(image);
      });
        // Add the red border initially when the function is called
        document.body.style.border = originalBorder;
    }
  
    // Add another event listener to document to listen for any click
    document.addEventListener('contextmenu', () => {
      removeClickHandler();
    });
  }
  
  // Call the function to add click handlers to all images
  addClickHandlerToAllImages();
  