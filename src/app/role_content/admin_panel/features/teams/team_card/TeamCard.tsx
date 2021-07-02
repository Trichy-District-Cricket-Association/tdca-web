import Team from '../../../../../../models/Team';
import './TeamCard.scss';

type TeamCardProps ={
    teamDoc:Team;
    key:string;
};
const TeamCard: React.FC<TeamCardProps> = ({teamDoc,key}):JSX.Element => {
    return (
          <div className="teamCard" key={key}>
        {/* <div className="TeamCard__header">
            <img src = {Team} alt = 'Team' className="TeamCard__header--img"/>
            </div> */}
            <div className= 'teamCard__container'>
            <label className="teamCard__container--label">Team Name</label>
            <p className="teamCard__container--text">{teamDoc.teamName}</p>
            <label className="teamCard__container--label">Team Id</label>
            <p className="teamCard__container--text">{teamDoc.teamId}</p>
            <label  className="teamCard__container--label">Matches Played</label>
            <p className="teamCard__container--text">{teamDoc.numberOfMatches}</p>
            </div>
    </div>
    );
};
export default TeamCard;
