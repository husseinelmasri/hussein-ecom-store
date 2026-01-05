import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_API_KEY || 'AIzaSyBv1DdBew8mSF2nsrS49iApNinHK3wtFVs',
  authDomain:
    process.env.REACT_APP_AUTH_DOMAIN || 'hussein-ecom-app.firebaseapp.com',

  projectId: process.env.REACT_APP_PROJECT_ID || 'hussein-ecom-app',
  storageBucket:
    process.env.REACT_APP_STORAGE_BUCKET ||
    'hussein-ecom-app.firebasestorage.app',

  messagingSenderId:
    process.env.REACT_APP_MESSAGING_SENDER_ID ||
    '1:254395264756:web:c9df0e4b0099cc7037f8a1',

  appId:
    process.env.REACT_APP_ID || '1:254395264756:web:c9df0e4b0099cc7037f8a1',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
export default app;
