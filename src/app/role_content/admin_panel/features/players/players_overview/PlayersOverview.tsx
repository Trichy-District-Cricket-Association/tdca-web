import { useState, useEffect } from 'react';
import { Collections } from '../../../../../../enums/collection';
import { firestore } from '../../../../../../firebase';
import Player from '../../../../../../models/Player';
import './PlayersOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import { PageRoutes } from '../../../../../../enums/pageRoutes';
import { Link } from 'react-router-dom';
import PlayerAdd from '../player_add/PlayerAdd'
// import PlayerCard from '../player_card/PlayerCard';

const PlayersOverview: React.FC<void> = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [playerDocs, setPlayerDocs] = useState<Player[] | undefined>();
    useEffect(() => {
        const unsub = firestore.collection(Collections.players).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setPlayerDocs([]);
            if (snapshot.docs?.length > 0) {
                const players = snapshot.docs.map((doc) => Player.fromFirestore(doc));
                setPlayerDocs(players);
            }
        });
        return () => unsub();
    }, []);

    return (
        <div>
            {playerDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div className="playersOverview">
                    <Link to={PageRoutes.adminPlayers} onClick={() => setModalOpen(true)}>
                        <button className="playersOverview__playerAddBtn">+ Add Player</button>
                    </Link>
                    <div className="playersOverview__PlayerCard">
                        {/* {playerDocs?.map((playerDoc) => (
                            <PlayerCard PlayerDoc={playerDoc} key={playerDoc.docId ?? ''} />
                        ))} */}
                    </div>
                    {isModalOpen ? <PlayerAdd isOpen={true} setModalOpen={setModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};

export default PlayersOverview;
