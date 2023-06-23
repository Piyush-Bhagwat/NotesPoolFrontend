import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, doc, getDoc, addDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

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
const storage = getStorage(app);

const dataRef = collection(db, "data");
const holdRef = collection(db, "hold");

const googleProvider = new GoogleAuthProvider();

const loginToGoogle = () => {
    return signInWithPopup(auth, googleProvider);
};

const getData = async (cls, sub) => { //gets the main Notes Data 
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

const getSingleNote = async (id) => { //gets a single note based on ID provided
    const noteRef = doc(db, "data", id);
    const note = await(getDoc(noteRef));

    const noteToUpload = { ...note.data(), id: note.id };

    return noteToUpload;
};

const readHoldCollection = async () => {
    const data = await getDocs(holdRef);
    return data.docs.map((dat) => {
        return { ...dat.data(), id: dat.id };
    });
};

const readDataCollection = async () => {
    const data = await getDocs(dataRef);
    return data.docs.map((dat) => {
        return { ...dat.data(), id: dat.id };
    });
};

const userData = async (userID)=>{ //gets all the user upload
    var dataOnHold = [];
    var dataUploaded = [];

    await readHoldCollection().then((data) => {
        data.map((note) => {
            if(note.uid === userID){
                dataOnHold.push(note);
            } 
        })
        
    });
    await readDataCollection().then((data) => {
        data.map((note) => {
            if(note.uid === userID){
                dataUploaded.push(note);
            } 
        })
        
    });

    return {hold: dataOnHold, uploaded: dataUploaded};
}

const addToHold = async (data) => { //Add document to hold collection
    await addDoc(holdRef, data);
};


const uploadFile = async (file, name, cls, sub, userName, uid, format) => { //Upload file to Storage and Add its info to collections
    const date = new Date();

    const storageName = date.getTime() + "_" + name.toLowerCase().replace(/\s/g, "_");

    const createdOn = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    const savePath = `/data/${cls}/${sub}/${storageName}`;

    const sourceRef = ref(storage, savePath);
    await uploadBytes(sourceRef, file);
    const downloadLink = await getDownloadURL(sourceRef);

    await addToHold({
        createdOn,
        name,
        class: cls,
        subject: sub,
        link: downloadLink,
        userName,
        uid,
        format,
        fileLocation: savePath,
    });

    console.log(name, "Uploaded");
};

export { loginToGoogle, db, getData, getSingleNote, userData, uploadFile};
