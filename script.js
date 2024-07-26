document.getElementById('download-images-button').addEventListener('click', () => {
    const imageUrls = [
        'https://picsum.photos/id/237/200/300',
        'https://picsum.photos/id/238/200/300',
        'https://picsum.photos/id/239/200/300'
    ];

    function downloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image's URL: ${url}`));
            img.src = url;
        });
    }

    function displayImages(images) {
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = ''; // Clear any existing content
        images.forEach(img => {
            outputDiv.appendChild(img);
        });
    }

    Promise.all(imageUrls.map(url => downloadImage(url)))
        .then(images => {
            displayImages(images);
        })
        .catch(error => {
            console.error(error.message);
            alert(error.message);
        });
});
