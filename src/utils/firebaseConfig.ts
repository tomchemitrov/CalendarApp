import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { createAsyncStorage } from '@react-native-async-storage/async-storage';


export const firebaseConfig = {
  apiKey: "AIzaSyBIDM3TdQgoDVO6-gC3MTNJgT39aEnf4t8",
  authDomain: "calendar-app-97cb0.firebaseapp.com",
  projectId: "calendar-app-97cb0",
  storageBucket: "calendar-app-97cb0.firebasestorage.app",
  messagingSenderId: "704824593142",
  appId: "1:704824593142:web:24bba4b0c430dbec123ad7"
};

const app = initializeApp(firebaseConfig);

const appStorage = createAsyncStorage('app');

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(appStorage),
});
export const db = getFirestore(app);