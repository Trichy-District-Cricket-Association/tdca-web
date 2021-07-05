import { useState } from 'react';
import Player from '../../../../../../models/Player';
import PlayerEdit from '../player_edit/PlayerEdit';
import './PlayerCard.scss';

type PlayerCardProps = {
    playerDoc: Player;
};

const PlayerCard: React.FC<PlayerCardProps> = ({ playerDoc }): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <div className="playerCard" onClick={() => setModalOpen(true)}>
                <div className="playerCard__header">
                    <img src={playerDoc.avatarUrl} alt="avatar" className="playerCard__header--img" />
                </div>
                <div className="playerCard__container">
                    <label className="playerCard__container--label">Player Name</label>
                    <p className="playerCard__container--text">{playerDoc.playerName}</p>
                    <label className="playerCard__container--label">Player Id</label>
                    <p className="playerCard__container--text">{playerDoc.playerId}</p>
                    <label className="playerCard__container--label">Date of Birth</label>
                    <p className="playerCard__container--text">{playerDoc.dateOfBirth?.toISOString().substr(0, 10)}</p>
                </div>
            </div>
            {isModalOpen ? <PlayerEdit setModalOpen={setModalOpen} playerDoc={playerDoc} /> : null}
        </div>
    );
};
export default PlayerCard;
