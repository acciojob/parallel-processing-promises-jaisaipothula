document.addEventListener('DOMContentLoaded', () => {
  const imageUrls = [
    { url: 'https://via.placeholder.com/150', alt: 'Image 1' },
    { url: 'https://via.placeholder.com/200', alt: 'Image 2' },
    { url: 'https://via.placeholder.com/250', alt: 'Image 3' }
    // Add more image URLs as needed
  ];

  const outputDiv = document.getElementById('output');
  const downloadButton = document.getElementById('download-images-button');

  downloadButton.addEventListener('click', async () => {
    outputDiv.innerHTML = ''; // Clear previous images

    try {
      const images = await downloadImages(imageUrls);
      displayImages(images);
    } catch (error) {
      console.error('Error downloading images:', error);
    }
  });

  function downloadImages(imageUrls) {
    const promises = imageUrls.map(image => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
        img.src = image.url;
      });
    });

    return Promise.all(promises);
  }

  function displayImages(images) {
    images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.alt = image.alt;
      outputDiv.appendChild(imgElement);
    });
  }
});

