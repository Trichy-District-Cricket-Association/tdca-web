import firebase from 'firebase';
import { firebaseConfig } from './config/firebase_config';

const app = firebase.initializeApp(firebaseConfig);

export const storage = app.storage();
export const auth = app.auth();
export const firestore = app.firestore();

export default app;
