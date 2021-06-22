import {useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import User from '../models/User';


const useAuth = ():User => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth can only be used inside AuthProvider');
    }
    return context;
};
export default useAuth;