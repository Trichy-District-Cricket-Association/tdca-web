import { useEffect, useState } from 'react';
import { Collections } from '../../../../enums/collection';
import { firestore } from '../../../../firebase';
import Umpire from '../../../../models/Umpire';
import LoadingComp from '../../../shared_components/loading_comp/LoadingComp';
import '../Staff.scss';

const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;
const kaveryLogo1 = `${process.env.PUBLIC_URL}/assets/images/kaveryHospital1.jpeg`;

const Umpires: React.FC<void> = (): JSX.Element => {
    const [umpireDocs, setUmpireDocs] = useState<Umpire[] | undefined>();

    useEffect(() => {
        const unsubUmpires = firestore.collection(Collections.umpires).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setUmpireDocs([]);
            if (snapshot.docs?.length > 0) {
                const umpires = snapshot.docs.map((doc) => Umpire.fromFirestore(doc));
                setUmpireDocs(umpires);
            }
        });
        return () => {
            unsubUmpires();
        };
    }, []);

    return (
        <div>
            {umpireDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div className="staffsPage">
                    <div className="staffsPage__header">
                        <div className="staffsPage__header__header1">
                            <img src={kaveryLogo1} className="staffsPage__header__header1--img" />
                            <h1 className="staffsPage__header__header1--text">Umpires</h1>
                        </div>
                        <div className="staffsPage__header__header2"></div>
                    </div>
                    <div className="staffsPage__staffCards">
                        {umpireDocs?.map((umpireDoc) => (
                            <div className="staffCard" key={umpireDoc.umpireId}>
                                <div className="staffCard__header">
                                    <img
                                        src={umpireDoc.avatarUrl ? umpireDoc.avatarUrl : defaultAvatar}
                                        alt="avatar"
                                        className="staffCard__header--img"
                                    />
                                </div>
                                <div className="staffCard__container">
                                    <div className="staffCard__container__overlay">
                                        <label className="staffCard__container__overlay--label">umpire Name</label>
                                        <p className="staffCard__container__overlay--text">{umpireDoc.umpireName}</p>
                                        <label className="staffCard__container__overlay--label">Total Matches</label>
                                        <p className="staffCard__container__overlay--text">{umpireDoc.totalMatches}</p>
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

export default Umpires;
