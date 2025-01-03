import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8utqskc_sJyYlkpUGnJh19MQylPwW2iQ",
  authDomain: "user-registeration-gaming.firebaseapp.com",
  databaseURL: "https://user-registeration-gaming-default-rtdb.firebaseio.com",
  projectId: "user-registeration-gaming",
  storageBucket: "user-registeration-gaming.firebasestorage.app",
  messagingSenderId: "7224002483",
  appId: "1:7224002483:web:f956df4015d0c784c26dc6",
  measurementId: "G-GGSBV2VJTM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app); // Declare 'db' only once

document
  .getElementById("registrationForm1")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email1").value;
    const password = document.getElementById("password1").value;
    const name = document.getElementById("name1").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        saveUserData(user.uid, name, email);
        console.log("User 1 registered:", user);
      })
      .catch((error) => {
        console.error("Error registering user 1:", error.message);
      });
  });

document
  .getElementById("registrationForm2")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email2").value;
    const password = document.getElementById("password2").value;
    const name = document.getElementById("name2").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        saveUserData(user.uid, name, email);
        console.log("User 2 registered:", user);
      })
      .catch((error) => {
        console.error("Error registering user 2:", error.message);
      });
  });

function saveUserData(userId, name, email) {
  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
  });
}

//
//
//

// Variables to track registration status
let user1Registered = false;
let user2Registered = false;

// Function to show game buttons if both users are registered
function checkAndShowGameButtons() {
  if (user1Registered && user2Registered) {
    document.getElementById("gameButtons").style.display = "block";
  }
}
// Handle User 1 Registration
document
  .getElementById("registrationForm1")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get user inputs
    const name1 = document.getElementById("name1").value;
    const email1 = document.getElementById("email1").value;
    const password1 = document.getElementById("password1").value;

    // Simulate saving user data (e.g., to Firebase)
    console.log("User 1 Registered:", { name1, email1, password1 });

    // Mark User 1 as registered
    user1Registered = true;

    // Check if both users are registered
    checkAndShowGameButtons();
  });

// Handle User 2 Registration
document
  .getElementById("registrationForm2")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get user inputs
    const name2 = document.getElementById("name2").value;
    const email2 = document.getElementById("email2").value;
    const password2 = document.getElementById("password2").value;

    // Simulate saving user data (e.g., to Firebase)
    console.log("User 2 Registered:", { name2, email2, password2 });

    // Mark User 2 as registered
    user2Registered = true;

    // Check if both users are registered
    checkAndShowGameButtons();
  });

// Function to start the game
function startGame(gameLink) {
  console.log(`Starting game: ${gameLink}`);
  window.open(gameLink, "_blank"); // Open the game in a new tab
}

// Attach startGame to the global scope so it works with the HTML
window.startGame = startGame;

document.getElementById("registrationForm1").addEventListener("submit", (e) => {
  e.preventDefault();
  const name1 = document.getElementById("name1").value;
  localStorage.setItem("user1", name1);
});

document.getElementById("registrationForm2").addEventListener("submit", (e) => {
  e.preventDefault();
  const name2 = document.getElementById("name2").value;
  localStorage.setItem("user2", name2);
});

//functions to save user data in Firebase Realtime Database:

//var db = firebase.database();

auth.onAuthStateChanged((user) => {
  if (user) {
    var userId = user.uid;
    var email = user.email;
    var name1 = document.getElementById("name1").value;
    var name2 = document.getElementById("name2").value;

    // Save user data upon registration
    saveUserData(userId, name1 || name2, email);
  }
});
