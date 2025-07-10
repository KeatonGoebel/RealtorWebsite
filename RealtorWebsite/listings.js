// Firebase setup
import { initializeApp } from "firebaseapplink";
import {
  getFirestore,
  collection,
  getDocs
} from "firebaseapplink";

const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  projectId: "projectId",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
  measurementId: "measurementId"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const listingsContainer = document.getElementById("listingsContainer");

async function renderListings() {
  const querySnapshot = await getDocs(collection(db, "listings"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    // listing-card is the structure for the card
    const listingCard = document.createElement("div");
    listingCard.classList.add("listing-card");

    // Title
    const title = document.createElement("h2");
    title.textContent = data.name;

    // Divider
    const divider = document.createElement("div");
    divider.classList.add("divider");

    // Image count display
    const countText = document.createElement("p");
    countText.classList.add("image-count");
    const imageCount = Array.isArray(data.imageUrls) ? data.imageUrls.length : 0;
    countText.textContent = `Images: ${imageCount}`;
    countText.style.fontSize = "0.9rem";
    countText.style.color = "gray";
    countText.style.marginBottom = "4px";

    // Image gallery container
    const imageGallery = document.createElement("div");
    imageGallery.classList.add("image-gallery");

    console.log("Image URLS: ", data.imageUrls);

    if (Array.isArray(data.imageUrls)) {
      data.imageUrls.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = `${data.name} photo`;
        img.classList.add("listing-img");
        img.referrerPolicy = "no-referrer";

        // Error handler for image load failure
        img.onerror = () => {
          console.error("Image failed to load (403 or other error):", url);
          img.alt = "Image failed to load";
          img.style.border = "2px solid red"; 
        };

        imageGallery.appendChild(img);
      });
    } else {
      console.warn("No imageUrls array found for listing:", data.name);
    }

    // Description
    const description = document.createElement("p");
    description.textContent = data.description;
    description.classList.add("listing-description");

    // Price
    const price = document.createElement("p");
    price.textContent = `Price: $${data.price}`;
    price.classList.add("listing-price");

    // Append elements in order
    listingCard.appendChild(title);
    listingCard.appendChild(divider);
    listingCard.appendChild(countText);
    listingCard.appendChild(imageGallery);
    listingCard.appendChild(description);
    listingCard.appendChild(price);

    listingsContainer.appendChild(listingCard);
  });
}

renderListings();
