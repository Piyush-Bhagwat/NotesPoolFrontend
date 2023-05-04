import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAPlQPQ9SJY9RkgKD77Na7PLAXOaKIgQAg",
    authDomain: "notespool-8c992.firebaseapp.com",
    projectId: "notespool-8c992",
    storageBucket: "notespool-8c992.appspot.com",
    messagingSenderId: "482174397556",
    appId: "1:482174397556:web:f253f019f64e8e34157521"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const loginToGoogle = async () => {
    await signInWithPopup(auth, googleProvider).then((res) =>{
        localStorage.setItem("name", res.user.displayName);
        localStorage.setItem("email", res.user.email);
        localStorage.setItem("dpURL", res.user.photoURL);
        localStorage.setItem("uid", res.user.uid);
    });

    window.location.reload();
};

export { loginToGoogle };
