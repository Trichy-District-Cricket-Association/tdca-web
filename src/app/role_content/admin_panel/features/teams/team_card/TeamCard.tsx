import { useState } from 'react';
import Team from '../../../../../../models/Team';
import TeamEdit from '../team_edit/TeamEdit';
import './TeamCard.scss';

type TeamCardProps = {
    teamDoc: Team;
    key: string;
};
const TeamCard: React.FC<TeamCardProps> = ({ teamDoc, key }): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <div className="teamCard" key={key} onClick={() => setModalOpen(true)}>
                <div className="teamCard__container">
                    <label className="teamCard__container--label">Team Name</label>
                    <p className="teamCard__container--text">{teamDoc.teamName}</p>
                    <label className="teamCard__container--label">Team Id</label>
                    <p className="teamCard__container--text">{teamDoc.teamId}</p>
                    <label className="teamCard__container--label">Matches Played</label>
                    <p className="teamCard__container--text">{teamDoc.numberOfMatches}</p>
                </div>
            </div>
            {isModalOpen ? <TeamEdit isOpen={true} setModalOpen={setModalOpen} teamDoc={teamDoc} /> : null}
        </div>
    );
};
export default TeamCard;
