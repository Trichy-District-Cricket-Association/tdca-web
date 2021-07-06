import { useState } from 'react';
import Umpire from '../../../../../../models/Umpire';
import UmpireEdit from '../umpire_edit/UmpireEdit';
import './UmpireCard.scss';
const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;
type UmpireCardProps = {
    umpireDoc: Umpire;
    key: string;
};
const umpireCard: React.FC<UmpireCardProps> = ({ umpireDoc, key }): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <div className="umpireCard" key={key} onClick={() => setModalOpen(true)}>
                <div className="umpireCard__header">
                    <img
                        src={umpireDoc.avatarUrl ? umpireDoc.avatarUrl : defaultAvatar}
                        alt="avatar"
                        className="umpireCard__header--img"
                    />
                </div>
                <div className="umpireCard__container">
                    <label className="umpireCard__container--label">umpire Name</label>
                    <p className="umpireCard__container--text">{umpireDoc.umpireName}</p>
                    <label className="umpireCard__container--label">Phone Number</label>
                    <p className="umpireCard__container--text">{umpireDoc.primaryContact}</p>
                    <label className="umpireCard__container--label">Total Matches</label>
                    <p className="umpireCard__container--text">{umpireDoc.totalMatches}</p>
                </div>
            </div>
            {isModalOpen ? <UmpireEdit setModalOpen={setModalOpen} umpireDoc={umpireDoc} /> : null}
        </div>
    );
};
export default umpireCard;
