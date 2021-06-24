import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import User from '../models/User';

const useAuth = (): User | undefined => {
    const context = useContext(AuthContext);
    return context;
};
export default useAuth;
