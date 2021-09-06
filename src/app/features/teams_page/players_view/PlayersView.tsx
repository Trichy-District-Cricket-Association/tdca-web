import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { firestore } from '../../../../firebase';
import Player from '../../../../models/Player';
import './PlayersView.scss';
import LoadingComp from '../../../shared_components/loading_comp/LoadingComp';
import Team from '../../../../models/Team';
import { Collections } from '../../../../enums/collection';
import Collapsible from 'react-collapsible';
import { MdClose } from 'react-icons/md';
const defaultTeamAvatar = `${process.env.PUBLIC_URL}/assets/images/teamAvatar.png`;
const defaultProfileAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;
type PlayersViewProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    teamDoc: Team;
};

const PlayersView: React.FC<PlayersViewProps> = ({ setModalOpen, teamDoc }): JSX.Element => {
    const [playerDocs, setPlayerDocs] = useState<Player[] | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        firestore
            .collection(Collections.players)
            .where('teamName', '==', teamDoc.teamName)
            .get()
            .then((snapshot) => {
                if (snapshot.docs?.length === 0) setPlayerDocs([]);
                if (snapshot.docs?.length > 0) {
                    const players = snapshot.docs.map((doc) => Player.fromFirestore(doc));
                    setPlayerDocs(players);
                }
                setIsLoading(false);
            });
    }, []);

    return (
        <Modal
            className="playerView"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            <div className="playerView__modalClose" onClick={() => setModalOpen(false)}>
                <MdClose />
            </div>
            <div>
                <h1 className="playerView__teamName">{teamDoc.teamName}</h1>
                <img
                    className="playerView__teamLogo"
                    src={teamDoc.avatarUrl ? teamDoc.avatarUrl : defaultTeamAvatar}
                    alt={teamDoc.teamName}
                />
            </div>
            {isLoading ? (
                <LoadingComp />
            ) : (
                <div className="playerView__stats">
                    {playerDocs?.map((playerDoc) => (
                        <Collapsible
                            trigger={playerDoc.playerName ?? ''}
                            key={playerDoc.playerId}
                            transitionTime={260}
                            triggerStyle={{
                                background: '#4562BA',
                                color: '#fff',
                                margin: '.5rem 0',
                                borderRadius: '0.5rem',
                                boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.25)',
                                padding: '0 2rem 0.5rem 1rem',
                                minHeight: '3rem',
                                lineHeight: '1.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                position: 'relative',
                                cursor: 'pointer',
                                fontSize: '18px',
                                letterSpacing: '.5px',
                            }}
                        >
                            <div className="playerView__items">
                                <div className="playerView__items__image">
                                    <img
                                        src={playerDoc.avatarUrl ? playerDoc.avatarUrl : defaultProfileAvatar}
                                        className="playerView__items__image--img"
                                    />
                                </div>
                                <div className="playerView__items__body">
                                    <div className="playerView__items__body__battingStats">
                                        <h1 className="playerView__items__body__battingStats--heading">
                                            Batting Stats
                                        </h1>
                                        <label className="playerView__items__body__battingStats--label">
                                            Matches Played
                                        </label>
                                        <p className="playerView__items__body__battingStats--text">
                                            {playerDoc.battingStats?.numberOfMatches}
                                        </p>
                                        <label className="playerView__items__body__battingStats--label">
                                            Innings Played
                                        </label>
                                        <p className="playerView__items__body__battingStats--text">
                                            {playerDoc.battingStats?.numberOfInnings}
                                        </p>
                                        <label className="playerView__items__body__battingStats--label">
                                            Total Runs
                                        </label>
                                        <p className="playerView__items__body__battingStats--text">
                                            {playerDoc.battingStats?.totalRuns}
                                        </p>
                                        <label className="playerView__items__body__battingStats--label">
                                            Highest Score
                                        </label>
                                        <p className="playerView__items__body__battingStats--text">
                                            {playerDoc.battingStats?.highestScore}
                                        </p>
                                        <label className="playerView__items__body__battingStats--label">Fifties</label>
                                        <p className="playerView__items__body__battingStats--text">
                                            {playerDoc.battingStats?.numberOfFifties}
                                        </p>
                                        <label className="playerView__items__body__battingStats--label">Hundreds</label>
                                        <p className="playerView__items__body__battingStats--text">
                                            {playerDoc.battingStats?.numberOfHundreds}
                                        </p>
                                    </div>
                                    <div className="playerView__items__body__bowlingStats">
                                        <h1 className="playerView__items__body__bowlingStats--heading">
                                            Bowling Stats
                                        </h1>
                                        <label className="playerView__items__body__bowlingStats--label">
                                            Overs Bowled
                                        </label>
                                        <p className="playerView__items__body__bowlingStats--text">
                                            {playerDoc.bowlingStats?.numberOfOvers}
                                        </p>
                                        <label className="playerView__items__body__bowlingStats--label">Maidens</label>
                                        <p className="playerView__items__body__bowlingStats--text">
                                            {playerDoc.bowlingStats?.noOfMaidens}
                                        </p>
                                        <label className="playerView__items__body__bowlingStats--label">
                                            Wickets Taken
                                        </label>
                                        <p className="playerView__items__body__bowlingStats--text">
                                            {playerDoc.bowlingStats?.wicketsTaken}
                                        </p>
                                        <label className="playerView__items__body__bowlingStats--label">
                                            Runs Given
                                        </label>
                                        <p className="playerView__items__body__bowlingStats--text">
                                            {playerDoc.bowlingStats?.runsGiven}
                                        </p>

                                        <label className="playerView__items__body__bowlingStats--label">
                                            Best Bowling
                                        </label>
                                        <p className="playerView__items__body__bowlingStats--text">
                                            {playerDoc.bowlingStats?.bestBowling.wicketsTaken}/
                                            {playerDoc.bowlingStats?.bestBowling.runsGiven}
                                        </p>

                                        <label className="playerView__items__body__bowlingStats--label">
                                            Five Wicket Haul
                                        </label>
                                        <p className="playerView__items__body__bowlingStats--text">
                                            {playerDoc.bowlingStats?.fiveWicketHaul}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Collapsible>
                    ))}
                </div>
            )}
        </Modal>
    );
};

export default PlayersView;
