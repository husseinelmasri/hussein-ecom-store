import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBv1DdBew8mSF2nsrS49iApNinHK3wtFVs',
  authDomain: 'hussein-ecom-app.firebaseapp.com',
  projectId: 'hussein-ecom-app',
  storageBucket: 'hussein-ecom-app.firebasestorage.app',
  messagingSenderId: '254395264756',
  appId: '1:254395264756:web:c9df0e4b0099cc7037f8a1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
export default app;
