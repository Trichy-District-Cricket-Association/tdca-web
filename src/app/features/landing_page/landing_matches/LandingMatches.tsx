import { useEffect, useState } from 'react';
import Match from '../../../../models/Match';
import { firestore } from '../../../../firebase';
import { Collections } from '../../../../enums/collection';
import './LandingMatches.scss';

const cricketBall = `${process.env.PUBLIC_URL}/assets/images/cricketBall.png`;
const LandingMatches: React.FC<any> = (): JSX.Element => {
    const [matchDocs, setMatchDocs] = useState<Match[] | undefined>();

    useEffect(() => {
        const unsub = firestore
            .collection(Collections.matches)
            .orderBy('date', 'desc')
            .limit(5)
            .onSnapshot((snapshot) => {
                if (snapshot.docs?.length === 0) setMatchDocs([]);
                if (snapshot.docs?.length > 0) {
                    const match = snapshot.docs.map((doc) => Match.fromFirestore(doc));
                    setMatchDocs(match);
                }
            });
        return () => unsub();
    }, []);
    return (
        <div className="matches">
            <div className="matches__header">
                <h1 className="matches__header--text">Recent Matches</h1>
            </div>
            {matchDocs == undefined ? null : (
                <div className="matches__matchCards">
                    {matchDocs?.map((matchDoc) => (
                        <div className="matchCard" key={matchDoc.matchId}>
                            <div className="matchCard__header">
                                <p className="matchCard__header--title">{matchDoc.teamA?.teamName}</p>
                                <img src={cricketBall} alt="vs" className="matchCard__header--img" />
                                <p className="matchCard__header--title">{matchDoc.teamB?.teamName}</p>
                            </div>
                            <div className="matchCard__container">
                                <div className="matchCard__container__cloumn1">
                                    <label className="matchCard__container--label">Division</label>
                                    <p className="matchCard__container--text">Division {matchDoc.division}</p>
                                    <label className="matchCard__container--label">Match Type</label>
                                    <p className="matchCard__container--text">{matchDoc.type}</p>
                                    <label className="matchCard__container--label">Date</label>
                                    <p className="matchCard__container--text">
                                        {matchDoc.date?.toISOString().substr(0, 10)}
                                    </p>
                                </div>
                                <div className="matchCard__container__column2">
                                    <label className="matchCard__container--label">Venue</label>
                                    <p className="matchCard__container--text">{matchDoc.venue}</p>

                                    <label className="matchCard__container--label">Time</label>
                                    <p className="matchCard__container--text">
                                        {matchDoc.date?.toISOString().substr(11, 8)}
                                    </p>
                                </div>
                            </div>
                            <p className="matchCard__container--status">{matchDoc.status}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LandingMatches;
