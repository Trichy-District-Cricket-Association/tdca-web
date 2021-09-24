import { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import Modal from 'react-modal';
import { firestore, storage } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import Player from '../../../../../../models/Player';
import InputBox from '../../../shared_components/input_box/InputBox';
import './PlayerAdd.scss';
import useStorage from '../../../../../../hooks/useStorage';
import SelectInputBox from '../../../shared_components/select_input_box/SelectInputBox';
import Team from '../../../../../../models/Team';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;
type PlayerAddProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlayerAdd: React.FC<PlayerAddProps> = ({ setModalOpen }): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [player, setPlayer] = useState<Player>(new Player({}));

    // State to handle uploading files.
    const [imageFile, setImageFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

    // Getting the progress and avatarUrl from the hook.
    const { avatarUrl, pdfUrl } = useStorage(imageFile, pdfFile);
    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const pdfTypes = ['application/pdf'];
    // Functions to check the type of file.
    const handleAvatarChange = (e: any) => {
        const selectedImageFile = e.target.files[0];
        if (selectedImageFile) {
            if (imageTypes.includes(selectedImageFile.type)) {
                setImageFile(selectedImageFile);
            } else {
                setImageFile(null);
                window.alert('Please select an image file (png or jpg)');
            }
        }
    };
    const handlePdfChange = (e: any) => {
        const selectedPdfFile = e.target.files[0];
        if (selectedPdfFile) {
            if (pdfTypes.includes(selectedPdfFile.type)) {
                setPdfFile(selectedPdfFile);
            } else {
                setPdfFile(null);
                window.alert('Please select an pdf file');
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
    const handleSelectForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newPlayer = new Player({ ...player });
        if (fieldName == 'teamName') {
            selectable?.teams.map((team) => {
                if (team.teamName == e.target.value) {
                    newPlayer.handlePlayer({ field: 'teamId', value: `${team.teamId}` });
                }
            });
        }
        newPlayer.handlePlayer({ field: fieldName, value: e.target.value });
        setPlayer(newPlayer);
    };
    const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        player.setAvatar = avatarUrl;
        player.setPdf = pdfUrl;
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
                            <SelectInputBox
                                title="Team Name"
                                name="teamName"
                                options={selectable.teams.map((team) => team.teamName)}
                                textHandler={handleSelectForm}
                            />
                            <InputBox
                                title="Primary Contact"
                                name="primaryContact"
                                type="text"
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Date of Registeration"
                                name="dateOfRegisteration"
                                type="date"
                                textHandler={handleInputForm}
                            />
                            <SelectInputBox
                                title="Registeration Fee"
                                name="registerationFee"
                                options={['Not Paid', 'Paid']}
                                textHandler={handleSelectForm}
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
                            <div className="upload-btn-wrapper">
                                <input type="file" name="pdfUrl" title="Upload Aadhar" onChange={handlePdfChange} />
                                <button className="aadharBtn">{pdfUrl ? 'Uploaded' : 'Upload Aadhar'}</button>
                            </div>
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

export default PlayerAdd;
