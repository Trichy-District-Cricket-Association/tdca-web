import firebase from 'firebase';
import React, { useState, useEffect } from 'react';

import { auth, firestore } from '../firebase';
import User, { userFromFirestore } from '../models/User';

const AuthContext = React.createContext<User>(undefined!);

const AuthProvider = (props: any) => {
    const [authState, setAuthState] = useState<User>({});
    useEffect(() => {
        const listener = auth.onAuthStateChanged((user: firebase.User | null) => {
            if (user == null) {
                setAuthState({});
                return null;
            }
            console.log(user.uid);
            firestore
                .collection('users')
                .doc(user.uid)
                .get()
                .then((doc: firebase.firestore.DocumentSnapshot) => {
                    setAuthState(userFromFirestore(doc));
                })
                .catch((e) => {
                    console.log(e);
                });
            return null;
        });
        return () => {
            listener();
        };
    }, []);
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <AuthContext.Provider value={authState} {...props} />;
};

export { AuthProvider, AuthContext };
