import { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Collections } from '../../../../../../enums/collection';
import firebase from 'firebase';
import { firestore } from '../../../../../../firebase';
import Team from '../../../../../../models/Team';
import './TeamsOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import TeamAdd from '../team_add/TeamAdd';
import TeamCard from '../team_card/TeamCard';
import { usePagination } from 'use-pagination-firestore';
import PointsTable from '../points_table/PointsTable';

const teamTypes = ['League Team', 'School Team', 'Knockout Team'];
const baseTeamQuery = firestore.collection(Collections.teams);

const TeamsOverview: React.FC<void> = (): JSX.Element => {
    const [isTeamModalOpen, setTeamModalOpen] = useState(false);
    const [isStandingsModalOpen, setStandingsModalOpen] = useState(false);

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
    const headers = [
        { label: 'TEAM ID', key: 'teamId' },
        { label: 'TEAM NAME', key: 'teamName' },
        { label: 'EMAIL', key: 'emailId' },
        { label: 'DIVISION', key: 'division' },
        { label: 'MATCHES PLAYED', key: 'numberOfMatches' },
        { label: 'WON', key: 'won' },
        { label: 'LOST', key: 'lost' },
        { label: 'DRAW', key: 'draw' },
        { label: 'TIE', key: 'tie' },
        { label: 'NO RESULT', key: 'noResult' },
        { label: 'TOTAL POINTS', key: 'totalPoints' },
        { label: 'WALKOVER', key: 'walkover' },
        { label: 'CONCEED', key: 'conceed' },
        { label: 'REFUSAL', key: 'refusal' },
        { label: 'PENALTY', key: 'penalty' },
    ];
    return (
        <div>
            {isLoading ? (
                <LoadingComp />
            ) : (
                <div className="teamsOverview">
                    <button className="teamsOverview__teamAddBtn" onClick={() => setTeamModalOpen(true)}>
                        + Add Team
                    </button>

                    <CSVLink
                        className="teamsOverview__dataDownload"
                        data={JSON.parse(JSON.stringify(docs.map((doc) => Team.fromFirestore(doc))))}
                        headers={JSON.parse(JSON.stringify(headers))}
                    >
                        Download Data
                    </CSVLink>
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
                        {selectedTeamType == 'League Team' ? (
                            <button className="teamsOverview__pointsTable" onClick={() => setStandingsModalOpen(true)}>
                                Points Table
                            </button>
                        ) : null}
                    </div>
                    <div className="teamsOverview__teamCard">
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
                    {isTeamModalOpen ? <TeamAdd setModalOpen={setTeamModalOpen} /> : null}
                    {isStandingsModalOpen ? <PointsTable setModalOpen={setStandingsModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};

export default TeamsOverview;
