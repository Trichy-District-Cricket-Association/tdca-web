import { useState } from 'react';
import Ground from '../../../../../../models/Ground';
import GroundEdit from '../ground_edit/GroundEdit';
import './GroundCard.scss';

type GroundCardProps = {
    groundDoc: Ground;
    key: string;
};

const GroundCard: React.FC<GroundCardProps> = ({ groundDoc, key }): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <div className="groundCard" key={key} onClick={() => setModalOpen(true)}>
                <div className="groundCard__container">
                    <label className="groundCard__container--label">Ground Name</label>
                    <p className="groundCard__container--text">{groundDoc.groundName}</p>
                    <label className="groundCard__container--label">Ground Id</label>
                    <p className="groundCard__container--text">{groundDoc.groundId}</p>
                    <label className="groundCard__container--label">Matches Played</label>
                    <p className="groundCard__container--text">{groundDoc.totalMatches}</p>
                </div>
            </div>
            {isModalOpen ? <GroundEdit setModalOpen={setModalOpen} groundDoc={groundDoc} /> : null}
        </div>
    );
};
export default GroundCard;
