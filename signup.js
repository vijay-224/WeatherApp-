// Firebase config (same as your dashboard's if reused)
const firebaseConfig = {
  apiKey: "AIzaSyCsr7LLgKHLx_eJsRZVrTE2xBJ-qG3Sl4Q",
  authDomain: "project-606e4.firebaseapp.com",
  projectId: "project-606e4",
  storageBucket: "project-606e4.appspot.com",
  messagingSenderId: "247449520566",
  appId: "1:247449520566:web:5ae6e0f33dc4eb4f2e1917",
  measurementId: "G-LL3X015YPQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("full-name").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const dob = document.getElementById("dob").value;
  const address = document.getElementById("address").value.trim();

  try {
    // Check if email or username already exists
    const usernameQuery = await db.collection("users").where("username", "==", username).get();
    if (!usernameQuery.empty) {
      alert("Username already exists.");
      return;
    }

    // Create user in Firebase Auth
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Save extra user details in Firestore
    await db.collection("users").doc(user.uid).set({
      fullName,
      username,
      email,
      phone,
      dob,
      address
    });

    alert("Signup successful!");
    window.location.href = "login.html";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("Email already registered.");
    } else {
      alert("Signup error: " + error.message);
    }
  }
});
