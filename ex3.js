const images = [
  "https://picsum.photos/5000?random=1",
  "https://picsum.photos/5000?random=2",
  "https://picsum.photos/5000?random=3",
  "https://picsum.photos/5000?random=4",
];

const buttonsContainer = document.getElementById("buttons-container");
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
const errorDiv = document.getElementById("error");

function getImageElementWhenLoaded(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = imageUrl;

    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", () => reject("Failed to load image."));
  });
}

let currentImage = null;

function showImage(imageUrl) {
  errorDiv.textContent = "";
  loader.style.display = "block";

  getImageElementWhenLoaded(imageUrl).then((newImage) => {
    newImage.classList.add("visible");
    imageContainer.appendChild(newImage);

    if (currentImage) {
        currentImage.classList.remove("visible");
        setTimeout(() => {
            currentImage?.remove();
            currentImage = newImage;
        }, 1000);
    } else {
        currentImage = newImage;
    }
  })
  .catch(error => {
    errorDiv.textContent = error;
  })
  .finally( () => {
    loader.style.display = "none";
  });
}

images.forEach((imageUrl, index) => {
  const button = document.createElement("button");
  button.textContent = `${index + 1}`;
  button.addEventListener("click", () => showImage(imageUrl));
  buttonsContainer.appendChild(button);
});
