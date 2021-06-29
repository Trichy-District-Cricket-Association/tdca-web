import { useState, useEffect } from 'react';
import { Collections } from '../../../../../../enums/collection';
import { firestore } from '../../../../../../firebase';
import Match from '../../../../../../models/Match';
import './MatchesOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import { PageRoutes } from '../../../../../../enums/pageRoutes';
import { Link } from 'react-router-dom';
import MatchAdd from '../match_add/MatchAdd'

const MatchesOverview: React.FC<void> = (): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [matchDocs, setMatchDocs] = useState<Match[] | undefined>();

    useEffect(() => {
        const unsub = firestore.collection(Collections.matches).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setMatchDocs([]);
            if (snapshot.docs?.length > 0) {
                const matches = snapshot.docs.map((doc) => Match.fromFirestore(doc));
                setMatchDocs(matches);
            }
        });
        return () => unsub();
    }, []);

    return (
        <div>
            {matchDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div>
                    <Link to={PageRoutes.adminMatches} onClick={() => setModalOpen(true)}>
                        <button className="matchAddBtn">+ Add Match</button>
                    </Link>
                    {isModalOpen ?<MatchAdd isOpen={true} setModalOpen={setModalOpen} />:null}
                    
                </div>
            )}
        </div>
    );
};

export default MatchesOverview;
