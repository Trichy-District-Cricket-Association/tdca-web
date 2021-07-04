import { useState } from 'react';
import Scorer from '../../../../../../models/Scorer';
import ScorerEdit from '../scorer_edit/ScorerEdit';
import './ScorerCard.scss';

type ScorerCardProps = {
    scorerDoc: Scorer;
    key: string;
};

const scorerCard: React.FC<ScorerCardProps> = ({ scorerDoc, key }): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <div className="scorerCard" key={key} onClick={() => setModalOpen(true)}>
                <div className="scorerCard__header">
                    <img src={scorerDoc.avatarUrl} alt="avatar" className="scorerCard__header--img" />
                </div>
                <div className="scorerCard__container">
                    <label className="scorerCard__container--label">scorer Name</label>
                    <p className="scorerCard__container--text">{scorerDoc.scorerName}</p>
                    <label className="scorerCard__container--label">Phone Number</label>
                    <p className="scorerCard__container--text">{scorerDoc.primaryContact}</p>
                    <label className="scorerCard__container--label">Total Matches</label>
                    <p className="scorerCard__container--text">{scorerDoc.totalMatches}</p>
                </div>
            </div>
            {isModalOpen ? <ScorerEdit setModalOpen={setModalOpen} scorerDoc={scorerDoc} /> : null}
        </div>
    );
};
export default scorerCard;
