import { useState, useEffect } from 'react';
import { Collections } from '../../../enums/collection';
import firebase from 'firebase';
import { firestore } from '../../../firebase';
import './TeamsPage.scss';
import LoadingComp from '../../shared_components/loading_comp/LoadingComp';
import Team from '../../../models/Team';
import TeamCard from './team_card/TeamCard';
import { usePagination } from 'use-pagination-firestore';

const teamTypes = ['League Team', 'School Team', 'Knockout Team'];
const baseTeamQuery = firestore.collection(Collections.teams);

const TeamsPage: React.FC<void> = (): JSX.Element => {
    const [query, setQuery] = useState<firebase.firestore.Query<firebase.firestore.DocumentData>>(baseTeamQuery);
    const { docs, isLoading, isStart, isEnd, getPrev, getNext } = usePagination<Team>(query, {
        limit: 10,
    });
    const [selectedTeamType, setSelectedTeamType] = useState<string | undefined>();

    const switchSelectedTeamType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTeamType(e.target.value);
    };
    useEffect(() => {
        if (selectedTeamType == 'Select Type') {
            window.location.reload();
        }
        if (selectedTeamType) {
            const newQuery = baseTeamQuery.where('type', '==', selectedTeamType);
            setQuery(newQuery);
        }
    }, [selectedTeamType]);

    return (
        <div>
            {isLoading ? (
                <LoadingComp />
            ) : (
                <div className="teamsPage">
                    <div className="teamsPage__header">
                        <div className="teamsPage__header__header1">
                            <h1 className="teamsPage__header__header1--text">Teams Details</h1>
                        </div>
                        <div className="teamsPage__header__header2"></div>
                    </div>
                    <div className="teamsOverview__teamSelect">
                        <select
                            className="teamsOverview__teamTypeSelect--btn"
                            value={selectedTeamType}
                            onChange={switchSelectedTeamType}
                        >
                            <option selected>Select Type</option>
                            {teamTypes.map((teamType) => (
                                <option key={teamType} value={teamType}>
                                    {teamType}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="teamsPage__teamCards">
                        {docs
                            .map((doc) => Team.fromFirestore(doc))
                            ?.map((teamDoc) => (
                                <TeamCard teamDoc={teamDoc} key={teamDoc.teamId ?? ''} />
                            ))}
                    </div>
                    {/* <div className="teamsOverview__pagination">
                        {isStart ? null : (
                            <button className="teamsOverview__pagination--btn" onClick={() => getPrev()}>
                                Previous
                            </button>
                        )}
                        {isEnd ? null : (
                            <button className="teamsOverview__pagination--btn" onClick={() => getNext()}>
                                Next
                            </button>
                        )}
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default TeamsPage;
