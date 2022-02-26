import { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import Modal from 'react-modal';
import { firestore } from '../../../../../firebase';
import { Collections } from '../../../../../enums/collection';
import Player from '../../../../../models/Player';
import InputBox from '../../../admin_panel/shared_components/input_box/InputBox';
import './TeamPlayerEdit.scss';
import useStorage from '../../../../../hooks/useStorage';
import SelectInputBox from '../../../admin_panel/shared_components/select_input_box/SelectInputBox';
import Team from '../../../../../models/Team';
import LoadingComp from '../../../../shared_components/loading_comp/LoadingComp';
const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;

type TeamPlayerEditProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    playerDoc: Player;
};

const TeamPlayerEdit: React.FC<TeamPlayerEditProps> = ({ setModalOpen, playerDoc }): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [player, setPlayer] = useState<Player>(
        new Player({
            playerId: playerDoc.playerId,
            teamName: playerDoc.teamName,
            playerName: playerDoc.playerName,
            avatarUrl: playerDoc.avatarUrl,
            emailId: playerDoc.emailId,
            dateOfBirth: playerDoc.dateOfBirth,
            primaryContact: playerDoc.primaryContact,
            fatherName: playerDoc.fatherName,
            aadharNumber: playerDoc.aadharNumber,
            rationCardNumber: playerDoc.rationCardNumber,
            voterId: playerDoc.rationCardNumber,
            drivingLicense: playerDoc.drivingLicense,
            panCardNumber: playerDoc.panCardNumber,
            passport: playerDoc.passport,
            battingStats: playerDoc.battingStats,
            bowlingStats: playerDoc.bowlingStats,
        }),
    );

    // State to handle uploading files.
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    // Getting the progress and avatarUrl from the hook.
    const { url1 } = useStorage(file);
    const types = ['image/png', 'image/jpeg', 'image/jpg'];
    // Functions to check the type of file.
    const handleAvatarChange = (e: any) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            if (types.includes(selectedFile.type)) {
                setError('');
                setFile(selectedFile);
            } else {
                setFile(null);
                setError('Please select an image file (png or jpg)');
            }
        }
    };

    const [selectable, setSelectable] = useState<{ teams: Team[] } | undefined>();
    const fetchTeam = async (): Promise<void> => {
        const newSelectable: { teams: Team[] } = {
            teams: [],
        };
        await firestore
            .collection(Collections.teams)
            .get()
            .then((snapshot) => {
                newSelectable.teams = snapshot.docs.map((doc) => Team.fromFirestore(doc));
            });
        setSelectable(newSelectable);
    };

    useEffect(() => {
        fetchTeam();
    }, []);
    const handleInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newplayer = new Player({ ...player });
        newplayer.handlePlayer({ field: fieldName, value: e.target.value });
        setPlayer(newplayer);
    };
    const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        player.setAvatar = url1;
        await firestore
            .collection(Collections.players)
            .doc(playerDoc.docId)
            .set(JSON.parse(JSON.stringify(player)))
            .then((doc) => {
                console.log(doc);
            })
            .catch((e) => {
                console.log(e);
            });
        setModalOpen(false);
    };
    const deleteForm: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        const answer = window.confirm('Are you sure you want to delete?');
        if (answer) {
            setIsLoading(true);
            await firestore
                .collection(Collections.players)
                .doc(playerDoc.docId)
                .delete()
                .then(() => setModalOpen(false));
        }
    };
    return (
        <Modal
            className="playerEdit"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            {isLoading ? (
                <LoadingComp />
            ) : selectable ? (
                <form className="playerEditForm" onSubmit={submitForm}>
                    <div className="playerEditForm__general">
                        {/* error message */}
                        {<p>{error}</p>}
                        <div>
                            <img
                                src={playerDoc.avatarUrl == null ? defaultAvatar : url1 ? url1 : playerDoc.avatarUrl}
                                alt="profile"
                                className="playerEditForm__general--avatar"
                            />
                            <div className="playerEditForm__general--avatarOverlay">
                                <label>
                                    <input
                                        type="file"
                                        name="avatarUrl"
                                        className="playerEditForm__general--uploadBtn"
                                        onChange={handleAvatarChange}
                                    />
                                    <MdEdit className="editIcon" />
                                </label>
                            </div>
                        </div>
                        <div className="playerEditForm__general__header">
                            <h1 className="playerEditForm__general__header--text">General</h1>
                            <button className="playerEditForm__general__header--iconBtn" onClick={deleteForm}>
                                <i>
                                    <MdDelete />
                                </i>
                            </button>
                        </div>
                        <div className="playerEditForm__general--input">
                            <InputBox
                                title="player Name"
                                name="playerName"
                                type="text"
                                value={playerDoc.playerName}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="player Id"
                                name="playerId"
                                type="text"
                                value={playerDoc.playerId}
                                textHandler={handleInputForm}
                            />

                            <InputBox
                                title="Email Id"
                                name="emailId"
                                type="email"
                                value={playerDoc.emailId}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Father's Name"
                                name="fatherName"
                                type="text"
                                value={playerDoc.fatherName}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Date of Birth"
                                name="dateOfBirth"
                                type="date"
                                value={playerDoc.dateOfBirth?.toISOString().substr(0, 10)}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Primary Contact"
                                name="primaryContact"
                                type="text"
                                value={playerDoc.primaryContact}
                                textHandler={handleInputForm}
                            />
                        </div>
                    </div>
                    <div className="playerEditForm__personalData">
                        <div className="playerEditForm__personalData__header">
                            <h1 className="playerEditForm__personalData__header--text">Personal Details</h1>
                        </div>
                        <div className="playerEditForm__personalData--input">
                            <InputBox
                                title="Aadhar Number"
                                name="aadharNumber"
                                type="text"
                                value={playerDoc.aadharNumber}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Voter Id"
                                name="voterId"
                                type="text"
                                value={playerDoc.voterId}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Ration Card Number"
                                name="rationCardNumber"
                                type="text"
                                value={playerDoc.rationCardNumber}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Driving License"
                                name="drivingLicense"
                                type="text"
                                value={playerDoc.drivingLicense}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Pan Card Number"
                                name="panCardNumber"
                                type="text"
                                value={playerDoc.panCardNumber}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Passport"
                                name="passport"
                                type="text"
                                value={playerDoc.passport}
                                textHandler={handleInputForm}
                            />
                        </div>
                    </div>
                    {/* <div className="playerEditForm__stats">
                        <div className="playerEditForm__stats__header">
                            <h1 className="playerEditForm__stats__header--text">Statistics</h1>
                        </div>
                        <div>
                            <h1 className="playerEditForm__stats--header1">Batting Statistics</h1>
                            <div className="playerEditForm__stats--input">
                                <InputBox
                                    title="Number Of Matches"
                                    name="battingStats_numberOfMatches"
                                    type="number"
                                    value={playerDoc.battingStats?.numberOfMatches}
                                    textHandler={handleInputForm}
                                />
                                <InputBox
                                    title="Number Of Innings"
                                    name="battingStats_numberOfInnings"
                                    type="number"
                                    value={playerDoc.battingStats?.numberOfInnings}
                                    textHandler={handleInputForm}
                                />
                                <InputBox
                                    title="Total Runs"
                                    name="battingStats_totalRuns"
                                    type="number"
                                    value={playerDoc.battingStats?.totalRuns}
                                    textHandler={handleInputForm}
                                />
                                <InputBox
                                    title="Highest Score (HS)"
                                    name="battingStats_highestRuns"
                                    type="number"
                                    value={playerDoc.battingStats?.highestScore}
                                    textHandler={handleInputForm}
                                />
                                <InputBox
                                    title="Number Of Fifties"
                                    name="battingStats_numberOfFifties"
                                    type="number"
                                    value={playerDoc.battingStats?.numberOfFifties}
                                    textHandler={handleInputForm}
                                />
                                <InputBox
                                    title="Number Of Hundreds"
                                    name="battingStats_numberOfHundreds"
                                    type="number"
                                    value={playerDoc.battingStats?.numberOfHundreds}
                                    textHandler={handleInputForm}
                                />
                            </div>
                            <div>
                                <h1 className="playerEditForm__stats--header2">Bowling Statistics</h1>
                                <div className="playerEditForm__stats--input">
                                    <InputBox
                                        title="Number Of Overs"
                                        name="bowlingStats_numberOfOvers"
                                        type="number"
                                        value={playerDoc.bowlingStats?.numberOfOvers}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Number Of Maidens"
                                        name="bowlingStats_noOfMaidens"
                                        type="number"
                                        value={playerDoc.bowlingStats?.noOfMaidens}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Runs Given"
                                        name="bowlingStats_runsGiven"
                                        type="number"
                                        value={playerDoc.bowlingStats?.runsGiven}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Wickets Taken"
                                        name="bowlingStats_wicketsTaken"
                                        type="number"
                                        value={playerDoc.bowlingStats?.wicketsTaken}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Best Bowling / Runs Given"
                                        name="bowlingStats_bestBowling_runsGiven"
                                        type="number"
                                        value={playerDoc.bowlingStats?.bestBowling.runsGiven}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Best Bowling / Wickets Taken"
                                        name="bowlingStats_bestBowling_wicketsTaken"
                                        type="number"
                                        value={playerDoc.bowlingStats?.bestBowling.wicketsTaken}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Five Wicket Haul"
                                        name="bowlingStats_fiveWicketHaul"
                                        type="number"
                                        value={playerDoc.bowlingStats?.fiveWicketHaul}
                                        textHandler={handleInputForm}
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="playerStats">
                        <div className="playerStats__battingStats">
                            <h1 className="playerStats__battingStats--heading">Batting Stats</h1>
                            <label className="playerStats__battingStats--label">Matches Played</label>
                            <p className="playerStats__battingStats--text">{playerDoc.battingStats?.numberOfMatches}</p>
                            <label className="playerStats__battingStats--label">Innings Played</label>
                            <p className="playerStats__battingStats--text">{playerDoc.battingStats?.numberOfInnings}</p>
                            <label className="playerStats__battingStats--label">Total Runs</label>
                            <p className="playerStats__battingStats--text">{playerDoc.battingStats?.totalRuns}</p>
                            <label className="playerStats__battingStats--label">Highest Score</label>
                            <p className="playerStats__battingStats--text">{playerDoc.battingStats?.highestScore}</p>
                            <label className="playerStats__battingStats--label">Fifties</label>
                            <p className="playerStats__battingStats--text">{playerDoc.battingStats?.numberOfFifties}</p>
                            <label className="playerStats__battingStats--label">Hundreds</label>
                            <p className="playerStats__battingStats--text">
                                {playerDoc.battingStats?.numberOfHundreds}
                            </p>
                        </div>
                        <div className="playerStats__bowlingStats">
                            <h1 className="playerStats__bowlingStats--heading">Bowling Stats</h1>
                            <label className="playerStats__bowlingStats--label">Overs Bowled</label>
                            <p className="playerStats__bowlingStats--text">{playerDoc.bowlingStats?.numberOfOvers}</p>
                            <label className="playerStats__bowlingStats--label">Maidens</label>
                            <p className="playerStats__bowlingStats--text">{playerDoc.bowlingStats?.noOfMaidens}</p>
                            <label className="playerStats__bowlingStats--label">Wickets Taken</label>
                            <p className="playerStats__bowlingStats--text">{playerDoc.bowlingStats?.wicketsTaken}</p>
                            <label className="playerStats__bowlingStats--label">Runs Given</label>
                            <p className="playerStats__bowlingStats--text">{playerDoc.bowlingStats?.runsGiven}</p>

                            <label className="playerStats__bowlingStats--label">Best Bowling</label>
                            <p className="playerStats__bowlingStats--text">
                                {playerDoc.bowlingStats?.bestBowling.wicketsTaken}/
                                {playerDoc.bowlingStats?.bestBowling.runsGiven}
                            </p>

                            <label className="playerStats__bowlingStats--label">Five Wicket Haul</label>
                            <p className="playerStats__bowlingStats--text">{playerDoc.bowlingStats?.fiveWicketHaul}</p>
                        </div>
                    </div>

                    <div className="playerEditForm__btn">
                        <button className="playerEditForm__btn--cancel" onClick={() => setModalOpen(false)}>
                            Cancel
                        </button>
                        <button className="playerEditForm__btn--submit" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            ) : (
                <LoadingComp />
            )}
        </Modal>
    );
};

export default TeamPlayerEdit;
