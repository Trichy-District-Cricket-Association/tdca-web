import { useState, useEffect } from 'react';
import { Collections } from '../../../../../../enums/collection';
import { firestore } from '../../../../../../firebase';
import Match from '../../../../../../models/Match';
import './MatchesOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import { PageRoutes } from '../../../../../../enums/pageRoutes';
import { Link } from 'react-router-dom';
import MatchAdd from '../match_add/MatchAdd';
import MatchCard from '../match_card/MatchCard';
import { usePagination } from 'use-pagination-firestore';

const MatchesOverview: React.FC<void> = (): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { docs, isLoading, isStart, isEnd, getPrev, getNext } = usePagination<Match>(
        firestore.collection(Collections.matches).orderBy('date', 'desc'),
        {
            limit: 10,
        },
    );
    const [matchDocs, setMatchDocs] = useState<Match[]>([]);

    useEffect(() => {
        const newMatches = docs.map((doc) => Match.fromFirestore(doc));
        setMatchDocs(newMatches);
    }, [docs]);

    return (
        <div>
            {isLoading ? (
                <LoadingComp />
            ) : (
                <div className="matchOverview">
                    <Link to={PageRoutes.adminMatches} onClick={() => setModalOpen(true)}>
                        <button className="matchOverview__matchAddBtn">+ Add Match</button>
                    </Link>
                    <div className="matchOverview__matchCard">
                        {matchDocs?.map((matchDoc) => (
                            <MatchCard matchDoc={matchDoc} key={matchDoc.docId ?? ''} />
                        ))}
                    </div>
                    <div className="matchOverview__matchPageSelect">
                        {isStart || matchDocs.length < 10 ? null : (
                            <button className="matchOverview__matchPageSelect--btn" onClick={() => getPrev()}>
                                Previous
                            </button>
                        )}
                        {isEnd ? null : (
                            <button className="matchOverview__matchPageSelect--btn" onClick={() => getNext()}>
                                Next
                            </button>
                        )}
                    </div>
                    {isModalOpen ? <MatchAdd setModalOpen={setModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};

export default MatchesOverview;
