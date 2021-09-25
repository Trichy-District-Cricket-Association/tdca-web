import { useState, useEffect } from 'react';
import { Collections } from '../../../enums/collection';
import { firestore } from '../../../firebase';
import './StaffsPage.scss';
import LoadingComp from '../../shared_components/loading_comp/LoadingComp';
import Team from '../../../models/Team';
import Scorer from '../../../models/Scorer';
import Umpire from '../../../models/Umpire';
import Footer from '../../shared_components/Footer/Footer';
const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;
const StaffsPage: React.FC<void> = (): JSX.Element => {
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

    return (
        <div>
            {umpireDocs == undefined || scorerDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div className="staffsPage">
                    <div className="staffsPage__header">
                        <div className="staffsPage__header__header1">
                            <h1 className="staffsPage__header__header1--text">Staffs Details</h1>
                        </div>
                        <div className="staffsPage__header__header2"></div>
                    </div>
                    {umpireDocs.length !== 0 ? <h1 className="staffsPage__title">Umpires</h1> : null}

                    <div className="staffsPage__umpireCards">
                        {umpireDocs?.map((umpireDoc) => (
                            <div className="umpireCard" key={umpireDoc.umpireId}>
                                <div className="umpireCard__header">
                                    <img
                                        src={umpireDoc.avatarUrl ? umpireDoc.avatarUrl : defaultAvatar}
                                        alt="avatar"
                                        className="umpireCard__header--img"
                                    />
                                </div>
                                <div className="umpireCard__container">
                                    <div className="umpireCard__container__overlay">
                                        <label className="umpireCard__container__overlay--label">umpire Name</label>
                                        <p className="umpireCard__container__overlay--text">{umpireDoc.umpireName}</p>
                                        <label className="umpireCard__container__overlay--label">Total Matches</label>
                                        <p className="umpireCard__container__overlay--text">{umpireDoc.totalMatches}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {scorerDocs.length !== 0 ? <h1 className="staffsPage__title">Scorers</h1> : null}

                    <div className="staffsPage__scorerCards">
                        {scorerDocs?.map((scorerDoc) => (
                            <div className="scorerCard" key={scorerDoc.scorerId}>
                                <div className="scorerCard__header">
                                    <img
                                        src={scorerDoc.avatarUrl ? scorerDoc.avatarUrl : defaultAvatar}
                                        alt="avatar"
                                        className="scorerCard__header--img"
                                    />
                                </div>
                                <div className="scorerCard__container">
                                    <div className="scorerCard__container__overlay">
                                        <label className="scorerCard__container__overlay--label">scorer Name</label>
                                        <p className="scorerCard__container__overlay--text">{scorerDoc.scorerName}</p>
                                        <label className="scorerCard__container__overlay--label">Total Matches</label>
                                        <p className="scorerCard__container__overlay--text">{scorerDoc.totalMatches}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    );
};

export default StaffsPage;
