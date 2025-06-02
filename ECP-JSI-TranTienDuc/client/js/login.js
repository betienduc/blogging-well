import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "./firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginButton = document.querySelector(".login-btn");
const googleAuthentication = document.getElementById("google-authentication");

if (googleAuthentication) {
  googleAuthentication.addEventListener("click", () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log("Signed in as:", user.email);
        window.location.href = "success.html";
      })
      .catch((error) => {
        console.error("Google sign-in error:", error.message);
        alert("Google sign-in failed.");
      });
  });
}

async function login(username, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      username,
      password
    );
    const user = userCredential.user;

    if (user) {
      console.log("Signed in as:", user.displayName || user.email);
      alert("Welcome back! ", user.displayName || user.email);
      window.location.href = "success.html";
    } else {
      alert("Login failed: User not found.");
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Login failed:", errorCode, errorMessage);
    alert("Login failed: " + errorMessage);
  }
}

if (loginButton) {
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    if (!username.includes("@") || username.includes(" ")) {
      alert("Email must contain '@' and no spaces.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    loginButton.disabled = true;
    loginButton.textContent = "Logging in...";
    login(username, password).finally(() => {
      loginButton.disabled = false;
      loginButton.textContent = "Log In";
    });
  });
}
