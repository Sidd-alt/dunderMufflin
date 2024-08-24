import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  writeBatch,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { SignInCredsState } from "../Pages/AuthPage/Components/SignIn";

const firebaseConfig = {
  apiKey: "AIzaSyB1VP0NFKjAJWxS2rnaNNmY9mb2D4u-_wo",
  authDomain: "e-commerce-db-4eb64.firebaseapp.com",
  projectId: "e-commerce-db-4eb64",
  storageBucket: "e-commerce-db-4eb64.appspot.com",
  messagingSenderId: "867694980260",
  appId: "1:867694980260:web:12a726cf0227e93f468a31",
};

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const dataBase = getFirestore();

provider.setCustomParameters({
  prompt: "select_account",
  login_hint: "user@example.com",
});

export const signInGooglePopUp = () => signInWithPopup(auth, provider);

export const signUpUsingEmailAndPassword = ({
  email,
  password,
}: SignInCredsState) => createUserWithEmailAndPassword(auth, email, password);

export const signInUsingEmailAndPassword = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const createUserDocumentFromAuth = async (
  userAuth: User,
  displayName?: string
) => {
  const userDocRef = doc(dataBase, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("Error creating the user", error);
    }
  }
  return userDocRef;
};

type ItemType = any; // Replace 'any' with the actual type of your items if known.

type CategoryMap = {
  [key: string]: ItemType[];
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(dataBase, "categories");
  const q = query(collectionRef);
  const querySnapShot = await getDocs(q);
  const categoryMap = querySnapShot.docs.reduce(
    (acc: CategoryMap, docSnapShot) => {
      const { title, items } = docSnapShot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    },
    {} as CategoryMap
  );

  return categoryMap;
};
