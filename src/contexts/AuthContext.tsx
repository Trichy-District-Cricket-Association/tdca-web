import firebase from 'firebase';
import React, { useState ,useEffect} from 'react';

import { auth,firestore } from '../firebase';
import { AuthData } from '../models/common_types';

const AuthContext = React.createContext<AuthData>(undefined!);

const AuthProvider= (props:any) => {
    const [authState, setAuthState] = useState<AuthData>({uid:null,role:null});
    useEffect(()=>{
        const listener = auth.onAuthStateChanged((user:firebase.User|null)=>{
        if(user==null){
            setAuthState({
                uid:null,
                role:null
            })
            return null;
        }
        const authData:AuthData = {
            uid:'',
            role:''
        };
        if(user!=null){
            authData.uid = user.uid;
           
            firestore.collection("users").doc(user.uid).get().then(
                (doc:firebase.firestore.DocumentSnapshot)=>{
                    authData.role=doc.data()?.roles;
                    setAuthState(authData);

                }
            ).catch((e)=>{
                console.log(e);
            });
        }
        return null;
    });
return ()=> {listener();};},[]);
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <AuthContext.Provider value={authState} {...props} />;
};



export {AuthProvider,AuthContext};