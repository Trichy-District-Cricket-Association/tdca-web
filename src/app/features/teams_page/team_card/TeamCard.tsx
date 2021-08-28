import { useState } from 'react';
import Team from '../../../../models/Team';

import './TeamCard.scss';
import PlayersView from '../players_view/PlayersView';

type TeamCardProps = {
    teamDoc: Team;
    key: string;
};

const TeamCard: React.FC<TeamCardProps> = ({ teamDoc, key }): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <div
                className="teamCard"
                // style={{ backgroundColor: `${teamDoc.teamColor}` }}
                key={key}
                onClick={() => setModalOpen(true)}
            >
                <div className="teamCard__container">
                    <label className="teamCard__container--label">Team Name</label>
                    <p className="teamCard__container--text">{teamDoc.teamName}</p>
                    <label className="teamCard__container--label">Matches Played</label>
                    <p className="teamCard__container--text">{teamDoc.numberOfMatches}</p>
                    <label className="teamCard__container--label">Matches Won</label>
                    <p className="teamCard__container--text">{teamDoc.won}</p>
                </div>
            </div>
            {isModalOpen ? <PlayersView setModalOpen={setModalOpen} teamDoc={teamDoc} /> : null}
        </div>
    );
};
export default TeamCard;
