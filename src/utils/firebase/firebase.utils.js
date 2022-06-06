import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBO7oW-q8Zi2amQUrU-r8zK540JzwCTjGY',
  authDomain: 'crwn-clothing-db-85ce9.firebaseapp.com',
  projectId: 'crwn-clothing-db-85ce9',
  storageBucket: 'crwn-clothing-db-85ce9.appspot.com',
  messagingSenderId: '36546085298',
  appId: '1:36546085298:web:355e858ec876ea8f41a4ab',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userDocRef;
  // if user data exists
  // create/set the document with the data from userAuth in my collection

  // return userDocRef
};
