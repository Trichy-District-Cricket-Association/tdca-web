import { useState, useEffect } from 'react';
import { Collections } from '../../../../../../enums/collection';
import { firestore } from '../../../../../../firebase';
import Team from '../../../../../../models/Team';
import './TeamsOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import { PageRoutes } from '../../../../../../enums/pageRoutes';
import { Link } from 'react-router-dom';
import TeamAdd from '../team_add/TeamAdd';
import TeamCard from '../team_card/TeamCard';

const TeamsOverview: React.FC<void> = (): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [teamDocs, setTeamDocs] = useState<Team[] | undefined>();

    useEffect(() => {
        const unsub = firestore.collection(Collections.teams).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setTeamDocs([]);
            if (snapshot.docs?.length > 0) {
                const teams = snapshot.docs.map((doc) => Team.fromFirestore(doc));
                setTeamDocs(teams);
            }
        });
        return () => unsub();
    }, []);

    return (
        <div>
            {teamDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div className="teamsOverview">
                    <Link to={PageRoutes.adminTeams} onClick={() => setModalOpen(true)}>
                        <button className="teamsOverview__teamAddBtn">+ Add Team</button>
                    </Link>
                    <div className="teamsOverview__teamCard">
                        {teamDocs?.map((teamDoc) => (
                            <TeamCard teamDoc={teamDoc} key={teamDoc.docId ?? ''} />
                        ))}
                    </div>
                    {isModalOpen ? <TeamAdd setModalOpen={setModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};

export default TeamsOverview;
