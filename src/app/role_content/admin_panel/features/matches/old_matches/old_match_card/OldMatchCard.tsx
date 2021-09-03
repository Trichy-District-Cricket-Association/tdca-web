import { useState } from 'react';
import OldMatch from '../../../../../../../models/OldMatch';
import OldMatchEdit from '../old_match_edit/OldMatchEdit';
import './OldMatchCard.scss';

const cricketBall = `${process.env.PUBLIC_URL}/assets/images/cricketBall.png`;
type OldMatchCardProps = {
    oldMatchDoc: OldMatch;
};
const MatchCard = ({ oldMatchDoc }: OldMatchCardProps): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <div className="oldMatchCard" onClick={() => setModalOpen(true)}>
                <div className="oldMatchCard__header">
                    <p className="oldMatchCard__header--title">{oldMatchDoc.teamA}</p>
                    <img src={cricketBall} alt="vs" className="oldMatchCard__header--img" />
                    <p className="oldMatchCard__header--title">{oldMatchDoc.teamB}</p>
                </div>
                <div className="oldMatchCard__container">
                    <div className="oldMatchCard__container__cloumn1">
                        <label className="oldMatchCard__container--label">Match Id</label>
                        <p className="oldMatchCard__container--text">{oldMatchDoc.oldMatchId}</p>
                        <label className="oldMatchCard__container--label">Match Type</label>
                        <p className="oldMatchCard__container--text">{oldMatchDoc.type}</p>
                    </div>
                    <div className="oldMatchCard__container__column2">
                        <label className="oldMatchCard__container--label">Venue</label>
                        <p className="oldMatchCard__container--text">{oldMatchDoc.venue}</p>
                        {/* <label className="oldMatchCard__container--label">Date</label>
                        <p className="oldMatchCard__container--text">{oldMatchDoc.date?.toISOString().substr(0, 10)}</p> */}
                    </div>
                </div>
                <p className="oldMatchCard__container--status">{oldMatchDoc.status}</p>
            </div>
            {isModalOpen ? <OldMatchEdit setModalOpen={setModalOpen} oldMatchDoc={oldMatchDoc} /> : null}
        </div>
    );
};
export default MatchCard;
