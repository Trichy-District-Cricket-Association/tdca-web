import { useState, useEffect } from 'react';
import { storage } from '../firebase';

const useStorage = (file1: any, file2?: any, file3?: any, file4?: any, file5?: any) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [url1, setUrl1] = useState('');
    const [url2, setUrl2] = useState('');
    const [url3, setUrl3] = useState('');
    const [url4, setUrl4] = useState('');
    const [url5, setUrl5] = useState('');

    // runs every time the file value changes
    useEffect(() => {
        if (file1) {
            // storage refs
            const storageRef = storage.ref(file1.name);

            storageRef.put(file1).on(
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
                    setUrl1(downloadUrl);
                },
            );
        }
        if (file2) {
            // storage refs
            const storageRef = storage.ref(file2.name);

            storageRef.put(file2).on(
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
                    setUrl2(downloadUrl);
                },
            );
        }
        if (file3) {
            // storage refs
            const storageRef = storage.ref(file3.name);

            storageRef.put(file3).on(
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
                    setUrl3(downloadUrl);
                },
            );
        }
        if (file4) {
            // storage refs
            const storageRef = storage.ref(file4.name);

            storageRef.put(file4).on(
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
                    setUrl4(downloadUrl);
                },
            );
        }
        if (file5) {
            // storage refs
            const storageRef = storage.ref(file5.name);

            storageRef.put(file5).on(
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
                    setUrl5(downloadUrl);
                },
            );
        }
    }, [file1, file2, file3, file4, file5]);

    return { progress, error, url1, url2, url3, url4, url5 };
};

export default useStorage;
