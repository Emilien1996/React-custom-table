import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  DocumentData,
  collection,
  CollectionReference,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'react-test-project-ab2e8.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_Sender_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: 'G-19EM5F10RB',
}

const firebaseApp = initializeApp(firebaseConfig)
const firestoreDB = getFirestore(firebaseApp)
export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestoreDB, collectionName) as CollectionReference<T>
}
