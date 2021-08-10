import { useState } from 'react';
import Match from '../../../../../../models/Match';
import MatchEdit from '../match_edit/MatchEdit';
import './MatchCard.scss';

const cricketBall = `${process.env.PUBLIC_URL}/assets/images/cricketBall.png`;
type MatchCardProps = {
    matchDoc: Match;
};
const MatchCard = ({ matchDoc }: MatchCardProps): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <div className="matchCard" onClick={() => setModalOpen(true)}>
                <div className="matchCard__header">
                    <p className="matchCard__header--title">{matchDoc.teamA?.teamName}</p>
                    <img src={cricketBall} alt="vs" className="matchCard__header--img" />
                    <p className="matchCard__header--title">{matchDoc.teamB?.teamName}</p>
                </div>
                <div className="matchCard__container">
                    <div className="matchCard__container__cloumn1">
                        <label className="matchCard__container--label">Match Id</label>
                        <p className="matchCard__container--text">Match Id{matchDoc.matchId}</p>
                        <label className="matchCard__container--label">Division</label>
                        <p className="matchCard__container--text">Division {matchDoc.division}</p>
                        <label className="matchCard__container--label">Match Type</label>
                        <p className="matchCard__container--text">{matchDoc.type}</p>
                    </div>
                    <div className="matchCard__container__column2">
                        <label className="matchCard__container--label">Venue</label>
                        <p className="matchCard__container--text">{matchDoc.venue?.groundName}</p>
                        <label className="matchCard__container--label">Date</label>
                        <p className="matchCard__container--text">{matchDoc.date?.toISOString().substr(0, 10)}</p>
                        <label className="matchCard__container--label">Time</label>
                        <p className="matchCard__container--text">{matchDoc.date?.toISOString().substr(11, 8)}</p>
                    </div>
                </div>
                <p className="matchCard__container--status">{matchDoc.status}</p>
            </div>
            {isModalOpen ? <MatchEdit setModalOpen={setModalOpen} matchDoc={matchDoc} /> : null}
        </div>
    );
};
export default MatchCard;
