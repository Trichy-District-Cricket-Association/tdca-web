import { useState, useEffect } from 'react';
import { storage } from '../firebase';


const  defaultAvatar =`${process.env.PUBLIC_URL}/assets/images/defaultAvatar.png`;

const useStorage = (file: any) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [avatarUrl, setavatarUrl] = useState(defaultAvatar);

    // runs every time the file value changes
    useEffect(() => {
        if (file) {
            // storage refs
            const storageRef = storage.ref(file.name);
            
            storageRef.put(file).on(
                'state_changed',
                (snap) => {
                    // track the upload progress
                    const percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                    setProgress(percentage);
                },
                () => setError(error),
                async () => {
                    // get the public download img url
                    const downloadUrl = await storageRef.getDownloadURL();
                    // save the url to local state
                    setavatarUrl(downloadUrl);
                },
            );
        }
    }, [file]);

    return { progress, avatarUrl, error};
};

export default useStorage;
