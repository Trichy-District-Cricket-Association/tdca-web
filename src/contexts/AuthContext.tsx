import firebase from 'firebase';
import React, { useState, useEffect } from 'react';

import { auth, firestore } from '../firebase';
import User from '../models/User';
import { Collections } from '../enums/collection';
import { UserRoles } from '../enums/auth';

const AuthContext = React.createContext<User | undefined>(undefined);

const AuthProvider = (props: any) => {
    const [authState, setAuthState] = useState<User | undefined | null>(undefined);
    useEffect(() => {
        const listener = auth.onAuthStateChanged((user: firebase.User | null) => {
            if (user == null) {
                setAuthState(null);
                return;
            }
            firestore
                .collection(Collections.users)
                .doc(user.uid)
                .get()
                .then((doc: firebase.firestore.DocumentSnapshot) => {
                    setAuthState(User.fromFirestore(doc));
                })
                .catch((e) => {
                    console.log(e);
                });
        });
        return () => {
            listener();
        };
    }, []);
    return <AuthContext.Provider value={authState} {...props} />;
};

export { AuthProvider, AuthContext };
