import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import {getDownloadURL,getStorage,ref,uploadBytesResumable} from "firebase/storage";

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
 
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db,storage };

export const uploadMedia = async (media, path) => {
    try {
      await uploadBytesResumable(ref(storage, `${path}/${media.name}`), media);
      const getMedia = await ref(storage, `${path}/${media.name}`);
      const mediaLink = await getDownloadURL(getMedia);
      return mediaLink;
    } catch (err) {
      console.log("Err: ", err);
    }
  };