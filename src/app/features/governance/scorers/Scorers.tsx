import { useState, useEffect } from 'react';
import { Collections } from '../../../../enums/collection';
import { firestore } from '../../../../firebase';
import Scorer from '../../../../models/Scorer';
import LoadingComp from '../../../shared_components/loading_comp/LoadingComp';
import '../Staff.scss';

const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;
const kaveryLogo1 = `${process.env.PUBLIC_URL}/assets/images/kaveryHospital1.jpeg`;

const Scorers: React.FC<void> = (): JSX.Element => {
    const [scorerDocs, setScorerDocs] = useState<Scorer[] | undefined>();

    useEffect(() => {
        const unsubScorers = firestore.collection(Collections.scorers).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setScorerDocs([]);
            if (snapshot.docs?.length > 0) {
                const scorers = snapshot.docs.map((doc) => Scorer.fromFirestore(doc));
                setScorerDocs(scorers);
            }
        });

        return () => {
            unsubScorers();
        };
    }, []);

    return (
        <div>
            {scorerDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div className="staffsPage">
                    <div className="staffsPage__header">
                        <div className="staffsPage__header__header1">
                            <img src={kaveryLogo1} className="staffsPage__header__header1--img" />
                            <h1 className="staffsPage__header__header1--text">Scorers</h1>
                        </div>
                        <div className="staffsPage__header__header2"></div>
                    </div>

                    <div className="staffsPage__staffCards">
                        {scorerDocs?.map((scorerDoc) => (
                            <div className="staffCard" key={scorerDoc.scorerId}>
                                <div className="staffCard__header">
                                    <img
                                        src={scorerDoc.avatarUrl ? scorerDoc.avatarUrl : defaultAvatar}
                                        alt="avatar"
                                        className="staffCard__header--img"
                                    />
                                </div>
                                <div className="staffCard__container">
                                    <div className="staffCard__container__overlay">
                                        <label className="staffCard__container__overlay--label">scorer Name</label>
                                        <p className="staffCard__container__overlay--text">{scorerDoc.scorerName}</p>
                                        <label className="staffCard__container__overlay--label">Total Matches</label>
                                        <p className="staffCard__container__overlay--text">{scorerDoc.totalMatches}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Scorers;
