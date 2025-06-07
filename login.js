const firebaseConfig = {
  apiKey: "AIzaSyCsr7LLgKHLx_eJsRZVrTE2xBJ-qG3Sl4Q",
  authDomain: "project-606e4.firebaseapp.com",
  projectId: "project-606e4",
  storageBucket: "project-606e4.firebasestorage.app",
  messagingSenderId: "247449520566",
  appId: "1:247449520566:web:5ae6e0f33dc4eb4f2e1917",
  measurementId: "G-LL3X015YPQ"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login successful! Redirecting...");
            window.location.href = "dashboard.html"; // Change this to your dashboard or homepage
        })
        .catch((error) => {
            alert(error.message);
        });
});
