import { useState, useEffect } from 'react';
import { Collections } from '../../../enums/collection';
import { firestore } from '../../../firebase';
import './TeamsPage.scss';
import LoadingComp from '../../shared_components/loading_comp/LoadingComp';
import Team from '../../../models/Team';

const TeamsPage: React.FC<void> = (): JSX.Element => {
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
                <div className="teamsPage">
                    <div className="teamsPage__header">
                        <div className="teamsPage__header__header1">
                            <h1 className="teamsPage__header__header1--text">Teams Details</h1>
                        </div>
                        <div className="teamsPage__header__header2"></div>
                    </div>
                    <div className="teamsPage__teamCards">
                        {teamDocs?.map((teamDoc) => (
                            <div className="teamCard" key={teamDoc.teamId}>
                                <div className="teamCard__container">
                                    <label className="teamCard__container--label">Team Name</label>
                                    <p className="teamCard__container--text">{teamDoc.teamName}</p>
                                    <label className="teamCard__container--label">Team Id</label>
                                    <p className="teamCard__container--text">{teamDoc.teamId}</p>
                                    <label className="teamCard__container--label">Matches Played</label>
                                    <p className="teamCard__container--text">{teamDoc.numberOfMatches}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamsPage;
