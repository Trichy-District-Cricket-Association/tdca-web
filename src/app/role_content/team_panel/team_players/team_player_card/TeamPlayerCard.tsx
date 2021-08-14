import { useState } from 'react';
import Player from '../../../../../models/Player';
import TeamPlayerEdit from '../team_player_edit/TeamPlayerEdit';
import './TeamPlayerCard.scss';
const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;
type TeamPlayerCardProps = {
    playerDoc: Player;
};

const TeamPlayerCard: React.FC<TeamPlayerCardProps> = ({ playerDoc }): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <div className="playerCard" onClick={() => setModalOpen(true)}>
                <div className="playerCard__header">
                    <img
                        src={playerDoc.avatarUrl ? playerDoc.avatarUrl : defaultAvatar}
                        alt="avatar"
                        className="playerCard__header--img"
                    />
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
            {isModalOpen ? <TeamPlayerEdit setModalOpen={setModalOpen} playerDoc={playerDoc} /> : null}
        </div>
    );
};
export default TeamPlayerCard;
