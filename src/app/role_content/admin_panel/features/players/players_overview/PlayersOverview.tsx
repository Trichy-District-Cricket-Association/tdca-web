import { useState, useEffect } from 'react';
import { Collections } from '../../../../../../enums/collection';
import { firestore } from '../../../../../../firebase';
import Player from '../../../../../../models/Player';
import './PlayersOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import { PageRoutes } from '../../../../../../enums/pageRoutes';
import { Link } from 'react-router-dom';
import PlayerAdd from '../player_add/PlayerAdd';
import PlayerCard from '../player_card/PlayerCard';
import Team from '../../../../../../models/Team';


const PlayersOverview: React.FC<void> = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [playerDocs, setPlayerDocs] = useState<Player[] | undefined>();
    const [teamDocs, setTeamDocs] = useState<Team[] | undefined>();
    const [selectedTeamPlayers, setSelectedTeamPlayers] = useState<
    { players: Player[];  }>();
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
        return () => {PlayerDocs(); TeamDocs();}
    }, []);
        const SelectedTeamPlayers = async (e: React.ChangeEvent<HTMLSelectElement>): Promise<void> =>{
           
            const newSelectedTeamPlayers: { players: Player[]; } = {
                players: [],
                
            };
            await firestore
                .collection(Collections.players).where("teamName", "==", `${e.target.value}`)
                .get().then
                ((snapshot) => {
                    newSelectedTeamPlayers.players = snapshot.docs.map((doc) => Player.fromFirestore(doc));
                });
                setSelectedTeamPlayers(newSelectedTeamPlayers);
    }

    return (
        <div>
            {playerDocs == undefined || teamDocs == undefined? (
                <LoadingComp />
            ) : (
                <div className="playersOverview">
                    <Link to={PageRoutes.adminPlayers} onClick={() => setModalOpen(true)}>
                        <button className="playersOverview__playerAddBtn">+ Add Player</button>
                    </Link>
                    {teamDocs.length !== 0 ? (
                        <div>
                            <h2>Select Team</h2>
                            <select className="playersOverview__teamSelect" onChange = {SelectedTeamPlayers}>
                                <option>Select</option>
                                {teamDocs.map((teamDoc) => (
                                    <option key={teamDoc.teamId} value= {teamDoc.teamName}>{teamDoc.teamName}</option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div />
                    )}

                    <div className="playersOverview__playerCard">
                        {selectedTeamPlayers?.players?.map((playerDoc) => (
                            <PlayerCard playerDoc={playerDoc} key={playerDoc.docId ?? ''} />
                            
                        ))}
                    </div>
                    {isModalOpen ? <PlayerAdd isOpen={true} setModalOpen={setModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};

export default PlayersOverview;
