import { useState, useEffect } from 'react';
import { storage } from '../firebase';

const useStorage = (imageFile: any, pdfFile?: any, aadharFile?: any) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [avatarUrl, setavatarUrl] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');
    const [aadharUrl, setAadharUrl] = useState('');

    // runs every time the file value changes
    useEffect(() => {
        if (imageFile) {
            // storage refs
            const storageRef = storage.ref(imageFile.name);

            storageRef.put(imageFile).on(
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
        if (pdfFile) {
            // storage refs
            const storageRef = storage.ref(pdfFile.name);

            storageRef.put(pdfFile).on(
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
                    setPdfUrl(downloadUrl);
                },
            );
        }
        if (aadharFile) {
            // storage refs
            const storageRef = storage.ref(aadharFile.name);

            storageRef.put(aadharFile).on(
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
                    setAadharUrl(downloadUrl);
                },
            );
        }
    }, [imageFile, pdfFile, aadharFile]);

    return { progress, avatarUrl, error, pdfUrl, aadharUrl };
};

export default useStorage;
