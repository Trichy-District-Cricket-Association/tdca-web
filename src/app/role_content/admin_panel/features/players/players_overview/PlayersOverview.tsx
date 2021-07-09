import { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Collections } from '../../../../../../enums/collection';
import { firestore } from '../../../../../../firebase';
import Player from '../../../../../../models/Player';
import './PlayersOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import PlayerAdd from '../player_add/PlayerAdd';
import PlayerCard from '../player_card/PlayerCard';
import Team from '../../../../../../models/Team';

const PlayersOverview: React.FC<void> = (): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [playerDocs, setPlayerDocs] = useState<Player[] | undefined>();
    const [teamDocs, setTeamDocs] = useState<Team[] | undefined>();
    const [selectedTeamName, setSelectedTeamName] = useState<string | undefined>();
    const [selectedTeamPlayers, setSelectedTeamPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const PlayerDocs = firestore.collection(Collections.players).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setPlayerDocs([]);
            if (snapshot.docs?.length > 0) {
                const players = snapshot.docs.map((doc) => Player.fromFirestore(doc));
                setPlayerDocs(players);
            }
        });
        const TeamDocs = firestore.collection(Collections.teams).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setTeamDocs([]);
            if (snapshot.docs?.length > 0) {
                const teams = snapshot.docs.map((doc) => Team.fromFirestore(doc));
                setTeamDocs(teams);
            }
        });
        return () => {
            PlayerDocs();
            TeamDocs();
        };
    }, []);

    useEffect(() => {
        if (selectedTeamName) {
            const unsub = firestore
                .collection(Collections.players)
                .where('teamName', '==', selectedTeamName)
                .onSnapshot((snapshot) => {
                    if (snapshot?.docs?.length === 0) setSelectedTeamPlayers([]);
                    if (snapshot?.docs?.length > 0) {
                        const players = snapshot.docs.map((doc) => Player.fromFirestore(doc));
                        setSelectedTeamPlayers(players);
                    }
                });
            return () => {
                unsub();
            };
        }
    }, [selectedTeamName]);

    const SelectedTeamPlayers = async (e: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
        setSelectedTeamName(e.target.value);
    };

    const headers = [
        { label: 'PLAYER ID', key: 'playerId' },
        { label: 'PLAYER NAME', key: 'playerName' },
        { label: 'TEAM NAME', key: 'teamName' },
        { label: 'EMAIL', key: 'emailId' },
        { label: 'DATE OF BIRTH', key: 'dateOfBirth' },
        { label: `FATHER'S NAME`, key: 'fatherName' },
        { label: 'PRIMARY CONTACT', key: 'primaryContact' },
        { label: 'AADHAR NUMBER', key: 'drivingLicense' },
        { label: 'VOTER ID', key: 'voterId' },
        { label: 'RATION CARD NUMBER', key: 'rationCardNumber' },
        { label: 'PAN CARD NUMBER', key: 'panCardNumber' },
        { label: 'PASSPORT', key: 'passport' },
        { label: 'MATCHES PLAYED', key: 'battingStats.numberOfMatches' },
        { label: 'INNINGS PLAYED', key: 'battingStats.numberOfInnings' },
        { label: 'TOTAL RUNS', key: 'battingStats.totalRuns' },
        { label: 'HIGHEST SCORE (HS)', key: 'battingStats.highestScore' },
        { label: 'FIFTIES', key: 'battingStats.numberOfFifties' },
        { label: 'HUNDREDS', key: 'battingStats.numberOfHundreds' },
        { label: 'OVERS BOWLED', key: 'bowlingStats.numberOfOvers' },
        { label: 'NO. OF MAIDENS', key: 'bowlingStats.noOfMaidens' },
        { label: 'RUNS GIVEN', key: 'bowlingStats.runsGiven' },
        { label: 'WICKETS TAKEN', key: 'bowlingStats.wicketsTaken' },
        { label: 'BEST BOWLING / RUNS', key: 'bowlingStats.bestBowling.runsGiven' },
        { label: 'BEST BOWLING / WICKETS', key: 'bowlingStats.bestBowling.wicketsTaken' },
        { label: 'FIVE WICKET HAUL', key: 'bowlingStats.fiveWicketHaul' },
    ];

    return (
        <div>
            {playerDocs == undefined || teamDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div className="playersOverview">
                    <button className="playersOverview__playerAddBtn" onClick={() => setModalOpen(true)}>
                        + Add Player
                    </button>

                    <CSVLink
                        className="playersOverview__dataDownload"
                        data={JSON.parse(JSON.stringify(selectedTeamPlayers))}
                        headers={JSON.parse(JSON.stringify(headers))}
                    >
                        Download Data
                    </CSVLink>
                    {teamDocs.length !== 0 ? (
                        <div>
                            <select className="playersOverview__teamSelect" onChange={SelectedTeamPlayers}>
                                <option>Select Team</option>
                                {teamDocs.map((teamDoc) => (
                                    <option key={teamDoc.teamId} value={teamDoc.teamName}>
                                        {teamDoc.teamName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div />
                    )}

                    <div className="playersOverview__playerCard">
                        {selectedTeamPlayers.length === 0 ? (
                            <h2>No items here</h2>
                        ) : (
                            selectedTeamPlayers.map((playerDoc) => (
                                <PlayerCard playerDoc={playerDoc} key={playerDoc.docId ?? ''} />
                            ))
                        )}
                    </div>
                    {isModalOpen ? <PlayerAdd setModalOpen={setModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};

export default PlayersOverview;
