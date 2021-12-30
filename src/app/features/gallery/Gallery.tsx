import { useState, useEffect } from 'react';
import { Collections } from '../../../enums/collection';
import { firestore } from '../../../firebase';
import './Gallery.scss';
import LoadingComp from '../../shared_components/loading_comp/LoadingComp';
import Team from '../../../models/Team';
import Scorer from '../../../models/Scorer';
import Umpire from '../../../models/Umpire';
import Footer from '../../shared_components/Footer/Footer';
const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;
const kaveryLogo1 = `${process.env.PUBLIC_URL}/assets/images/kaveryHospital1.jpeg`;
const Gallery: React.FC<void> = (): JSX.Element => {
    const [scorerDocs, setScorerDocs] = useState<Scorer[] | undefined>();
    const [umpireDocs, setUmpireDocs] = useState<Umpire[] | undefined>();

    useEffect(() => {
        const unsubScorers = firestore.collection(Collections.scorers).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setScorerDocs([]);
            if (snapshot.docs?.length > 0) {
                const scorers = snapshot.docs.map((doc) => Scorer.fromFirestore(doc));
                setScorerDocs(scorers);
            }
        });
        const unsubUmpires = firestore.collection(Collections.umpires).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setUmpireDocs([]);
            if (snapshot.docs?.length > 0) {
                const umpires = snapshot.docs.map((doc) => Umpire.fromFirestore(doc));
                setUmpireDocs(umpires);
            }
        });
        return () => {
            unsubScorers();
            unsubUmpires();
        };
    }, []);

    return <div>{umpireDocs == undefined || scorerDocs == undefined ? <LoadingComp /> : null}</div>;
};

export default Gallery;
