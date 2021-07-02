import GroundsMan from '../../../../../../models/GroundsMan';
import './GroundsManCard.scss';

type GroundsManCardProps = {
    groundsManDoc: GroundsMan;
    key: string;
};
const GroundsManCard: React.FC<GroundsManCardProps> = ({ groundsManDoc, key }): JSX.Element => {
    return (
        <div className="groundsManCard" key={key}>
            <div className="groundsManCard__header">
                <img src={groundsManDoc.avatarUrl} alt="avatar" className="groundsManCard__header--img" />
            </div>
            <div className="groundsManCard__container">
                <label className="groundsManCard__container--label">GroundsMan Name</label>
                <p className="groundsManCard__container--text">{groundsManDoc.groundsManName}</p>
                <label className="groundsManCard__container--label">GroundsMan Id</label>
                <p className="groundsManCard__container--text">{groundsManDoc.groundsManId}</p>
                <label className="groundsManCard__container--label">Phone Number</label>
                <p className="groundsManCard__container--text">{groundsManDoc.primaryContact}</p>
            </div>
        </div>
    );
};
export default GroundsManCard;
