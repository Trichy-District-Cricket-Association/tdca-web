import { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Collections } from '../../../../../enums/collection';
import { firestore } from '../../../../../firebase';
import Player from '../../../../../models/Player';
import './TeamPlayersOverview.scss';
import LoadingComp from '../../../../shared_components/loading_comp/LoadingComp';
import TeamPlayerAdd from '../team_player_add/TeamPlayerAdd';
import TeamPlayerCard from '../team_player_card/TeamPlayerCard';
import useAuth from '../../../../../hooks/useAuth';

const TeamPlayersOverview = (): JSX.Element => {
    const authData = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);
    const [playerDocs, setPlayerDocs] = useState<Player[] | undefined>();

    useEffect(() => {
        const unsub = firestore
            .collection(Collections.players)
            .where('teamId', '==', authData?.id)
            .onSnapshot((snapshot) => {
                if (snapshot?.docs?.length === 0) setPlayerDocs([]);
                if (snapshot?.docs?.length > 0) {
                    const players = snapshot.docs.map((doc) => Player.fromFirestore(doc));
                    setPlayerDocs(players);
                }
            });
        return () => {
            unsub();
        };
    }, []);

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
            {playerDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div className="teamPlayersOverview">
                    <div className="teamPlayersOverview__header">
                        <div className="teamPlayersOverview__header__header1">
                            <h1 className="teamPlayersOverview__header__header1--text">{authData?.name}</h1>
                        </div>
                        <div className="matchesPage__header__header2"></div>
                    </div>

                    {/* <button className="teamPlayersOverview__playerAddBtn" onClick={() => setModalOpen(true)}>
                        + Add Player
                    </button>

                    <CSVLink
                        className="teamPlayersOverview__dataDownload"
                        data={JSON.parse(JSON.stringify(playerDocs))}
                        headers={JSON.parse(JSON.stringify(headers))}
                    >
                        Download Data
                    </CSVLink> */}
                    <div className="teamPlayersOverview__playerCard">
                        {playerDocs.length === 0 ? (
                            <h2>No items here</h2>
                        ) : (
                            playerDocs.map((playerDoc) => (
                                <TeamPlayerCard playerDoc={playerDoc} key={playerDoc.docId ?? ''} />
                            ))
                        )}
                    </div>
                    {/* {isModalOpen ? (
                        <TeamPlayerAdd
                            teamName={authData?.name ?? ''}
                            teamId={authData?.id ?? ''}
                            setModalOpen={setModalOpen}
                        />
                    ) : null} */}
                </div>
            )}
        </div>
    );
};

export default TeamPlayersOverview;
