import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  setDoc,
  doc,
} from "./firebase-config.js";

const emailInput = document.getElementById("signup-email");
const displayNameInput = document.getElementById("display-name");
const passwordInput = document.getElementById("signup-password");
const confirmPasswordInput = document.getElementById("signup-confirm-password");
const signupBtn = document.querySelector(".signup-btn");
const googleBtn = document.getElementById("google-authentication");

googleBtn.addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      console.log(result.user);
      window.location.href = "success.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});

async function signup(inputEmail, inputPassword, inputDisplayName) {
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      inputEmail,
      inputPassword
    );
    await updateProfile(userCred.user, {
      displayName: inputDisplayName || inputEmail,
    });

    await setDoc(doc(db, "users", userCred.user.uid), {
      email: inputEmail,
      displayName: inputDisplayName || inputEmail,
      uid: userCred.user.uid,
      role: "user",
      createdAt: new Date().toISOString(),
    });
    alert("Signed up successfully!");
    window.location.href = "success.html";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("Email already in use. Please use a different email.");
    } else if (error.code === "auth/invalid-email") {
      alert("Invalid email format. Please enter a valid email address.");
    } else {
      alert(error.message);
    }
    signupBtn.disabled = false;
    signupBtn.textContent = "Sign Up";
  }
}

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  const displayName = displayNameInput.value.trim();

  if (!displayName) {
    alert("Please enter your display name.");
    return;
  }

  if (!email.includes("@") || email.includes(" ")) {
    alert("Invalid email format.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  let hasLower = false,
    hasUpper = false,
    hasNumber = false,
    hasSpecial = false;

  for (let char of password) {
    if (/[a-z]/.test(char)) hasLower = true;
    else if (/[A-Z]/.test(char)) hasUpper = true;
    else if (/[0-9]/.test(char)) hasNumber = true;
    else if ("!@#$%^&*-_=+".includes(char)) hasSpecial = true;
    else if (char === " " || /[<>[\]{}()~`|\\/:;"']/.test(char)) {
      alert("Password contains invalid characters.");
      return;
    }
  }

  if (
    !hasLower ||
    !hasUpper ||
    !hasNumber ||
    !hasSpecial ||
    password.length < 8
  ) {
    alert(
      "Password must have 8+ characters, upper & lower case, number & special character."
    );
    return;
  }

  signupBtn.disabled = true;
  signupBtn.textContent = "Signing up...";

  signup(email, password, displayName);
});
