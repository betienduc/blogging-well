const displayName = document.getElementById("display-name");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const signupConfirmPassword = document.getElementById(
  "signup-confirm-password"
);
const signupButton = document.querySelector(".signup-btn");

function signup(username, password) {
  firebase
    .auth()
    .signUpWithEmailAndPassword(username, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      window.location.href = "success.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

signupButton.addEventListener("click", (e) => {
  e.preventDefault();
  username = signupEmail.value.trim();
  password = loginPassword.value.trim();
  confirmPassword = loginConfirmPassword.value.trim();

  if (password != confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  let has_alt = false;
  for (let i = 0; i < username.length; i++) {
    if (username[i] == "@") {
      has_alt = true;
    }
    if (username[i] == " ") {
      alert("Email cannot contain spaces");
      return;
    }
  }

  if (!has_alt) {
    alert("Email must contain @");
    return;
  }

  let has_special_char = false,
    has_number = false,
    has_uppercase = false,
    has_lowercase = false;

  for (let i = 0; i < password.length; i++) {
    has_lowercase = username[i] >= "a" && username[i] <= "z";
    has_uppercase = username[i] >= "A" && username[i] <= "Z";
    has_number = username[i] >= "0" && username[i] <= "9";
    has_special_char = username[i] >= "!" && username[i] <= "/";
    if (username[i] == " ") {
      alert("Password cannot contain spaces");
      return;
    }
  }

  if (
    !has_special_char ||
    !has_number ||
    !has_uppercase ||
    !has_lowercase ||
    username.length < 8
  ) {
    alert(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character."
    );
    return;
  }

  signup(username, password);
});
