import firebase from 'firebase';
import { firebaseConfig } from './config/firebase_config';

const app = firebase.initializeApp(firebaseConfig);
const dummyApp = firebase.initializeApp(firebaseConfig, "dummyApp");

export const storage = app.storage();
export const auth = app.auth();
export const firestore = app.firestore();

export const dummyFirestore = dummyApp.firestore();
export const dummyAuth = dummyApp.auth();

export default app;
