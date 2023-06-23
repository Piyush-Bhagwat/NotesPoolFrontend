import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAPlQPQ9SJY9RkgKD77Na7PLAXOaKIgQAg",
    authDomain: "notespool-8c992.firebaseapp.com",
    projectId: "notespool-8c992",
    storageBucket: "notespool-8c992.appspot.com",
    messagingSenderId: "482174397556",
    appId: "1:482174397556:web:f253f019f64e8e34157521",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const dataRef = collection(db, "data");

const googleProvider = new GoogleAuthProvider();

const loginToGoogle = () => {
    return signInWithPopup(auth, googleProvider)
};

const getData = async (cls, sub) => {
    const data = await getDocs(dataRef);

    const notesToSend = data.docs.filter((dat) => {
        return (
            dat.data().class === cls &&
            (dat.data().subject === sub || sub === "all")
        );
    });
   
    return notesToSend.map((dat) => {
        return { ...dat.data(), id: dat.id };
    });
};

export { loginToGoogle, db, getData };
