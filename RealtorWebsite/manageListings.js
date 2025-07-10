// Import Firebase Firestore
import { initializeApp } from "firebaseapplink";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebaseapplink";

// Firebase config
const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  projectId: "projectId",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
  measurementId: "measurementId"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const IMGUR_ACCESS_TOKEN = "ImgurAccessToken"; 


// Form handling
document.getElementById('addListing').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = e.target.name.value.trim();
  const price = e.target.price.value.trim();
  const desc = e.target.description.value.trim();
  const images = e.target.image.files;

  const imageUrls = [];

  try {
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const formData = new FormData();

      // Appending the image file with title and description
      formData.append("image", file);
      formData.append("type", "file"); // Tell Imgur it's a file upload
      formData.append("title", name);
      formData.append("description", desc);

      const res = await fetch("imguruploadlink", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${IMGUR_ACCESS_TOKEN}`
        },
        body: formData
      });

      const data = await res.json();
      console.log("Imgur upload response:", data);

      if (data.success) {
        imageUrls.push(data.data.link);
      } else {
        console.error("Image upload failed:", data);
        alert("Failed to upload image.");
        return;
      }
    }

    // Store listing in Firestore
    await addDoc(collection(db, "listings"), {
      name,
      price,
      description: desc,
      imageUrls,
      timestamp: new Date()
    });

    alert("Listing submitted successfully!");
    e.target.reset();
    loadListings();

  } catch (error) {
    console.error("Error uploading listing:", error);
    alert("Error uploading listing: " + error.message);
  }
});

// Display and manage listings
async function loadListings() {
  const listingsList = document.getElementById("listingsList");
  listingsList.innerHTML = "";

  const snapshot = await getDocs(collection(db, "listings"));

  snapshot.forEach(docSnap => {
    const data = docSnap.data();

    const li = document.createElement("li");
    li.textContent = data.name + " ";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = async () => {
      const confirmDelete = confirm(`Delete listing "${data.name}"?`);
      if (!confirmDelete) return;

      try {
        await deleteDoc(doc(db, "listings", docSnap.id));
        alert("Listing deleted.");
        loadListings(); // Refresh
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete.");
      }
    };

    li.appendChild(deleteBtn);
    listingsList.appendChild(li);
  });
}

// Initial load
loadListings();