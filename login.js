// This is a work in progress, do not expect any of these features to work.
// - cobblesteve01

function displayLogin() {
  const loginForm = document.getElementById("login");
  const registerForm = document.getElementById("register");
  loginForm.style.display = "block";
  registerForm.style.display = "none";
}

function displayRegister() {
  const loginForm = document.getElementById("login");
  const registerForm = document.getElementById("register");
  loginForm.style.display = "none";
  registerForm.style.display = "block";
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyCaQhCh3NMAZ9evrxGzx_ifbX_xJngifxU",
    authDomain: "classplay-login.firebaseapp.com",
    projectId: "classplay-login",
    storageBucket: "classplay-login.firebasestorage.app",
    messagingSenderId: "648989613074",
    appId: "1:648989613074:web:6f641d0b151712c7e48ccb",
    measurementId: "G-2F1WPF3JPK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

async function registerUser() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;
  const pseudoEmail = `${username}@yourapp.com`;

  const usernameRef = db.collection("usernames").doc(username);
  const doc = await usernameRef.get();

  if (doc.exists) {
    window.alert("Username is already taken. Please choose another.");
    return;
  }

  auth.createUserWithEmailAndPassword(pseudoEmail, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Save username to Firestore
      usernameRef.set({ uid: user.uid });
      db.collection("users").doc(user.uid).set({ username: username, createdAt: new Date() });

      window.alert("Registration successful!");
      showLogout();
    })
    .catch((error) => {
      window.alert("Error during registration: " + error.message);
    });
}

function loginUser() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const pseudoEmail = `${username}@yourapp.com`;
    
  auth.signInWithEmailAndPassword(pseudoEmail, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.alert("Login successful!");
      showLogout();
    })
     .catch((error) => {
      window.alert("Error during login: " + error.message);
    });
}

function logoutUser() {
  auth.signOut().then(() => {
    window.alert("You have been logged out successfully!");
    showLogin();
  }).catch((error) => {
    window.alert("Error during logout: " + error.message);
  });
}

function showLogout() {
  document.getElementById('register').style.display = 'none';
  document.getElementById('login').style.display = 'none';
  document.getElementById('logout').style.display = 'block';
}

auth.onAuthStateChanged((user) => {
  if (user) {
    showLogout();
  } else {
    displayLogin();
  }
});