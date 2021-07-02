import Scorer from '../../../../../../models/Scorer';
import './ScorerCard.scss';

type ScorerCardProps = {
    scorerDoc: Scorer;
    key: string;
};
const scorerCard: React.FC<ScorerCardProps> = ({ scorerDoc, key }): JSX.Element => {
    return (
        <div className="scorerCard" key={key}>
            <div className="scorerCard__header">
                <img src={scorerDoc.avatarUrl} alt="avatar" className="scorerCard__header--img" />
            </div>
            <div className="scorerCard__container">
                <label className="scorerCard__container--label">scorer Name</label>
                <p className="scorerCard__container--text">{scorerDoc.scorerName}</p>
                <label className="scorerCard__container--label">scorer Id</label>
                <p className="scorerCard__container--text">{scorerDoc.scorerId}</p>
                <label className="scorerCard__container--label">Total Matches</label>
                <p className="scorerCard__container--text">{scorerDoc.totalMatches}</p>
                <label className="scorerCard__container--label">Phone Number</label>
                <p className="scorerCard__container--text">{scorerDoc.primaryContact}</p>
            </div>
        </div>
    );
};
export default scorerCard;
