import { useState, useEffect } from 'react';
import { Collections } from '../../../enums/collection';
import { firestore } from '../../../firebase';
import Match from '../../../models/Match';
import './MatchesPage.scss';
import LoadingComp from '../../shared_components/loading_comp/LoadingComp';
const cricketBall = `${process.env.PUBLIC_URL}/assets/images/cricketBall.png`;
const MatchesPage: React.FC<void> = (): JSX.Element => {
    const [matchDocs, setMatchDocs] = useState<Match[] | undefined>();

    useEffect(() => {
        const unsub = firestore
            .collection(Collections.matches)
            .orderBy('date')
            .onSnapshot((snapshot) => {
                if (snapshot.docs?.length === 0) setMatchDocs([]);
                if (snapshot.docs?.length > 0) {
                    const matches = snapshot.docs.map((doc) => Match.fromFirestore(doc));
                    setMatchDocs(matches);
                }
            });
        return () => unsub();
    }, []);
    console.log(matchDocs);
    return (
        <div>
            {matchDocs == undefined ? (
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
                                    <label className="matchCard__container--label">Division</label>
                                    <p className="matchCard__container--text">Division {matchDoc.division}</p>
                                    <label className="matchCard__container--label">Match Type</label>
                                    <p className="matchCard__container--text">{matchDoc.type}</p>
                                    <label className="matchCard__container--label">Venue</label>
                                    <p className="matchCard__container--text">{matchDoc.venue}</p>
                                    <label className="matchCard__container--label">Time</label>
                                    <p className="matchCard__container--text">
                                        {matchDoc.date?.toISOString().substr(0, 16)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MatchesPage;
