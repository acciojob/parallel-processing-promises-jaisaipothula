document.getElementById('download-images-button').addEventListener('click', () => {
    const imageUrls = [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/200',
        'https://via.placeholder.com/250'
        // Add more URLs as needed
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
