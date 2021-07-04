import { useState, useEffect } from 'react';
import { Collections } from '../../../../../../enums/collection';
import { firestore } from '../../../../../../firebase';
import Scorer from '../../../../../../models/Scorer';
import './ScorersOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import { PageRoutes } from '../../../../../../enums/pageRoutes';
import { Link } from 'react-router-dom';
import ScorerAdd from '../scorer_add/ScorerAdd';
import ScorerCard from '../scorer_card/ScorerCard';

const ScorersOverview: React.FC<void> = (): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [scorerDocs, setScorerDocs] = useState<Scorer[] | undefined>();

    useEffect(() => {
        const unsub = firestore.collection(Collections.scorers).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setScorerDocs([]);
            if (snapshot.docs?.length > 0) {
                const scorers = snapshot.docs.map((doc) => Scorer.fromFirestore(doc));
                setScorerDocs(scorers);
            }
        });
        return () => unsub();
    }, []);

    return (
        <div>
            {scorerDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div className="scorersOverview">
                    <Link to={PageRoutes.adminScorers} onClick={() => setModalOpen(true)}>
                        <button className="scorersOverview__scorerAddBtn">+ Add Scorer</button>
                    </Link>
                    <div className="scorersOverview__scorerCard">
                        {scorerDocs?.map((scorerDoc) => (
                            <ScorerCard scorerDoc={scorerDoc} key={scorerDoc.docId ?? ''} />
                        ))}
                    </div>
                    {isModalOpen ? <ScorerAdd setModalOpen={setModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};

export default ScorersOverview;
