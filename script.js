document.addEventListener('DOMContentLoaded', () => {
  const imageUrls = [
    'https://via.placeholder.com/150',
    'https://picsum.photos/id/237/200/300',
    'https://via.placeholder.com/200'
    // Add more image URLs as needed
  ];

  const downloadImagesButton = document.getElementById('download-images-button');
  const outputDiv = document.getElementById('output');

  downloadImagesButton.addEventListener('click', () => {
    // Map each image URL to a promise that resolves when the image is loaded
    const promises = imageUrls.map(url => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image's URL: ${url}`));
      img.src = url;
    }));

    // Use Promise.all to wait for all images to be downloaded
    Promise.all(promises)
      .then(images => {
        // Clear existing content in output div
        outputDiv.innerHTML = '';

        // Append each image to the output div
        images.forEach(img => {
          const imageItem = document.createElement('div');
          imageItem.classList.add('image-item');
          imageItem.appendChild(img);
          outputDiv.appendChild(imageItem);
        });
      })
      .catch(error => {
        console.error('Error downloading images:', error);
        outputDiv.innerHTML = `<p>Error downloading images: ${error.message}</p>`;
      });
  });
});
