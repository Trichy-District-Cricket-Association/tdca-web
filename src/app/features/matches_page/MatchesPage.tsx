import { useState, useEffect } from 'react';
import { Collections } from '../../../enums/collection';
import { firestore } from '../../../firebase';
import Match from '../../../models/Match';
import './MatchesPage.scss';
import LoadingComp from '../../shared_components/loading_comp/LoadingComp';
import { usePagination } from 'use-pagination-firestore';
const cricketBall = `${process.env.PUBLIC_URL}/assets/images/cricketBall.png`;

const MatchesPage: React.FC<void> = (): JSX.Element => {
    const { docs, isLoading, isStart, isEnd, getPrev, getNext } = usePagination<Match>(
        firestore.collection(Collections.matches).orderBy('date', 'desc'),
        {
            limit: 5,
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
                <div className="matchesPage">
                    <div className="matchesPage__header">
                        <div className="matchesPage__header__header1">
                            <h1 className="matchesPage__header__header1--text">Match Details</h1>
                        </div>
                        <div className="matchesPage__header__header2"></div>
                    </div>
                    <div className="matchesPage__matchCards">
                        {matchDocs?.map((matchDoc) => (
                            <div className="matchCard" key={matchDoc.matchId}>
                                <div className="matchCard__header">
                                    <p className="matchCard__header--title">{matchDoc.teamA?.teamName}</p>
                                    <img src={cricketBall} alt="vs" className="matchCard__header--img" />
                                    <p className="matchCard__header--title">{matchDoc.teamB?.teamName}</p>
                                </div>
                                <div className="matchCard__container">
                                    <div>
                                        <label className="matchCard__container--label">Match Id</label>
                                        <p className="matchCard__container--text">Match Id{matchDoc.matchId}</p>
                                        <label className="matchCard__container--label">Division</label>
                                        <p className="matchCard__container--text">Division {matchDoc.division}</p>
                                        <label className="matchCard__container--label">Match Type</label>
                                        <p className="matchCard__container--text">{matchDoc.type}</p>
                                        <label className="matchCard__container--label">Venue</label>
                                        <p className="matchCard__container--text">{matchDoc.venue}</p>
                                    </div>
                                    <div>
                                        <label className="matchCard__container--label">Time</label>
                                        <p className="matchCard__container--text">
                                            {matchDoc.date?.toISOString().substr(0, 16)}
                                        </p>
                                        <label className="matchCard__container--label">Status</label>
                                        <p className="matchCard__container--text">{matchDoc.status}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="matchesPage__matchPageSelect">
                        {isStart || matchDocs.length == 0 ? null : (
                            <button className="matchesPage__matchPageSelect--btn" onClick={() => getPrev()}>
                                Previous
                            </button>
                        )}
                        {isEnd ? null : (
                            <button className="matchesPage__matchPageSelect--btn" onClick={() => getNext()}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MatchesPage;
