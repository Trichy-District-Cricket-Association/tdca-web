import { useState } from 'react';
import Match from '../../../../models/Match';
import ScoreboardOverview from '../score_card/ScoreboardOverview';
import './MatchCard.scss';

const cricketBall = `${process.env.PUBLIC_URL}/assets/images/cricketBall.png`;
type MatchCardHomeProps = {
    matchDoc: Match;
};
const MatchCardHome = ({ matchDoc }: MatchCardHomeProps): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <div className="matchCardHome" onClick={() => setModalOpen(true)}>
                <div className="matchCardHome__header">
                    <p className="matchCardHome__header--title">{matchDoc.teamA?.teamName}</p>
                    <img src={cricketBall} alt="vs" className="matchCardHome__header--img" />
                    <p className="matchCardHome__header--title">{matchDoc.teamB?.teamName}</p>
                </div>
                <div className="matchCardHome__container">
                    <div className="matchCardHome__container__cloumn1">
                        <label className="matchCardHome__container--label">Match Type</label>
                        <p className="matchCardHome__container--text">{matchDoc.type}</p>
                        <label className="matchCardHome__container--label">Date</label>
                        <p className="matchCardHome__container--text">{matchDoc.date?.toISOString().substr(0, 10)}</p>
                    </div>
                    <div className="matchCardHome__container__column2">
                        <label className="matchCardHome__container--label">Venue</label>
                        <p className="matchCardHome__container--text">{matchDoc.venue?.groundName}</p>

                        <label className="matchCardHome__container--label">Time</label>
                        <p className="matchCardHome__container--text">{matchDoc.date?.toISOString().substr(11, 8)}</p>
                    </div>
                </div>
                <p className="matchCardHome__container--status">{matchDoc.status}</p>
            </div>
            {isModalOpen ? <ScoreboardOverview setModalOpen={setModalOpen} matchDoc={matchDoc} /> : null}
        </div>
    );
};
export default MatchCardHome;
