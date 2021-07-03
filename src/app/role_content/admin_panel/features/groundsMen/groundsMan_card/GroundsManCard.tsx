import { useState } from 'react';
import GroundsMan from '../../../../../../models/GroundsMan';
import GroundsManEdit from '../groundsMan_edit/GroundsManEdit';
import './GroundsManCard.scss';

type GroundsManCardProps = {
    groundsManDoc: GroundsMan;
    key: string;
};
const GroundsManCard: React.FC<GroundsManCardProps> = ({ groundsManDoc, key }): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <div className="groundsManCard" key={key} onClick={() => setModalOpen(true)}>
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
            {isModalOpen ? (
                <GroundsManEdit isOpen={true} setModalOpen={setModalOpen} groundsManDoc={groundsManDoc} />
            ) : null}
        </div>
    );
};
export default GroundsManCard;
