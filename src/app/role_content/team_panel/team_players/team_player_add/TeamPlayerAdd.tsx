import { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import Modal from 'react-modal';
import { firestore } from '../../../../../firebase';
import { Collections } from '../../../../../enums/collection';
import Player from '../../../../../models/Player';
import InputBox from '../../../admin_panel/shared_components/input_box/InputBox';
import './TeamPlayerAdd.scss';
import useStorage from '../../../../../hooks/useStorage';
import Team from '../../../../../models/Team';
import LoadingComp from '../../../../shared_components/loading_comp/LoadingComp';
const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;
type TeamPlayerAddProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    teamId: string;
    teamName: string;
};

const TeamPlayerAdd: React.FC<TeamPlayerAddProps> = ({ setModalOpen, teamId, teamName }): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [player, setPlayer] = useState<Player>(new Player({ teamName: teamName, teamId: teamId }));

    // State to handle uploading files.
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    // Getting the progress and avatarUrl from the hook.
    const { avatarUrl } = useStorage(file);
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
        player.setAvatar = avatarUrl;
        setIsLoading(true);
        await firestore
            .collection(Collections.players)
            .add(JSON.parse(JSON.stringify(player)))
            .then((doc) => {
                console.log(doc);
            })
            .catch((e) => {
                console.log(e);
            });
        setModalOpen(false);
    };
    return (
        <Modal
            className="playerAdd"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            {isLoading ? (
                <LoadingComp />
            ) : selectable ? (
                <form className="playerAddForm" onSubmit={submitForm}>
                    <div className="playerAddForm__general">
                        {/* error message */}
                        {<p>{error}</p>}

                        {/* image display */}

                        <div>
                            <img
                                src={avatarUrl ? avatarUrl : defaultAvatar}
                                alt="profile"
                                className="playerAddForm__general--avatar"
                            />
                            <div className="playerAddForm__general--avatarOverlay">
                                <label>
                                    <input
                                        type="file"
                                        name="avatarUrl"
                                        className="playerAddForm__general--uploadBtn"
                                        onChange={handleAvatarChange}
                                    />
                                    <MdEdit className="editIcon" />
                                </label>
                            </div>
                        </div>
                        <h1 className="playerAddForm__general--header">General</h1>
                        <div className="playerAddForm__general--input">
                            <InputBox title="player Name" name="playerName" type="text" textHandler={handleInputForm} />
                            <InputBox title="player Id" name="playerId" type="text" textHandler={handleInputForm} />

                            <InputBox title="Email Id" name="emailId" type="email" textHandler={handleInputForm} />
                            <InputBox
                                title="Father's Name"
                                name="fatherName"
                                type="text"
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Date of Birth"
                                name="dateOfBirth"
                                type="date"
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Primary Contact"
                                name="primaryContact"
                                type="text"
                                textHandler={handleInputForm}
                            />
                        </div>
                    </div>
                    <div className="playerAddForm__personalData">
                        <h1 className="playerAddForm__personalData--header">Personal Details</h1>
                        <div className="playerAddForm__personalData--input">
                            <InputBox
                                title="Aadhar Number"
                                name="aadharNumber"
                                type="text"
                                textHandler={handleInputForm}
                            />
                            <InputBox title="Voter Id" name="voterId" type="text" textHandler={handleInputForm} />
                            <InputBox
                                title="Ration Card Number"
                                name="rationCardNumber"
                                type="text"
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Driving License"
                                name="drivingLicense"
                                type="text"
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Pan Card Number"
                                name="panCardNumber"
                                type="text"
                                textHandler={handleInputForm}
                            />
                            <InputBox title="Passport" name="passport" type="text" textHandler={handleInputForm} />
                        </div>
                    </div>
                    <div className="playerAddForm__stats">
                        <h1 className="playerAddForm__stats--header">Statistics</h1>
                        <div>
                            <h1 className="playerAddForm__stats--header1">Batting Statistics</h1>
                            <div className="playerAddForm__stats--input">
                                <InputBox
                                    title="Number Of Matches"
                                    name="battingStats_numberOfmatches"
                                    type="number"
                                    value={0}
                                    textHandler={handleInputForm}
                                />
                                <InputBox
                                    title="Number Of Innings"
                                    name="battingStats_numberOfInnings"
                                    type="number"
                                    value={0}
                                    textHandler={handleInputForm}
                                />
                                <InputBox
                                    title="Total Runs"
                                    name="battingStats_totalRuns"
                                    type="number"
                                    value={0}
                                    textHandler={handleInputForm}
                                />
                                <InputBox
                                    title="Highest Score (HS)"
                                    name="battingStats_highestRuns"
                                    type="number"
                                    value={0}
                                    textHandler={handleInputForm}
                                />
                                <InputBox
                                    title="Number Of Fifties"
                                    name="battingStats_numberOfFifties"
                                    type="number"
                                    value={0}
                                    textHandler={handleInputForm}
                                />
                                <InputBox
                                    title="Number Of Hundreds"
                                    name="battingStats_numberOfHundreds"
                                    type="number"
                                    value={0}
                                    textHandler={handleInputForm}
                                />
                            </div>
                            <div>
                                <h1 className="playerAddForm__stats--header2">Bowling Statistics</h1>
                                <div className="playerAddForm__stats--input">
                                    <InputBox
                                        title="Number Of Overs"
                                        name="bowlingStats_numberOfOvers"
                                        type="number"
                                        value={0}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Number Of Maidens"
                                        name="bowlingStats_noOfMaidens"
                                        type="number"
                                        value={0}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Runs Given"
                                        name="bowlingStats_runsGiven"
                                        type="number"
                                        value={0}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Wickets Taken"
                                        name="bowlingStats_wicketsTaken"
                                        type="number"
                                        value={0}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Best Bowling / Runs Given"
                                        name="bowlingStats_bestBowling_runsGiven"
                                        type="number"
                                        value={0}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Best Bowling / Wickets Taken"
                                        name="bowlingStats_bestBowling_wicketsTaken"
                                        type="number"
                                        textHandler={handleInputForm}
                                        value={0}
                                    />
                                    <InputBox
                                        title="Five Wicket Haul"
                                        name="bowlingStats_fiveWicketHaul"
                                        type="number"
                                        textHandler={handleInputForm}
                                        value={0}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="playerAddForm__btn">
                        <button className="playerAddForm__btn--cancel" onClick={() => setModalOpen(false)}>
                            Cancel
                        </button>
                        <button className="playerAddForm__btn--submit" type="submit">
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

export default TeamPlayerAdd;
