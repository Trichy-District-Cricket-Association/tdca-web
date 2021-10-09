import { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaFileDownload } from 'react-icons/fa';
FaFileDownload;
import Modal from 'react-modal';
import { firestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import Player from '../../../../../../models/Player';
import InputBox from '../../../shared_components/input_box/InputBox';
import { PDFDownloadLink } from '@react-pdf/renderer';
import './PlayerEdit.scss';
import useStorage from '../../../../../../hooks/useStorage';
import SelectInputBox from '../../../shared_components/select_input_box/SelectInputBox';
import Team from '../../../../../../models/Team';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import PrintPlayer from './PrintPlayer';
const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;

type PlayerEditProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    playerDoc: Player;
};

const PlayerEdit: React.FC<PlayerEditProps> = ({ setModalOpen, playerDoc }): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [player, setPlayer] = useState<Player>(
        new Player({
            playerId: playerDoc.playerId,
            teamName: playerDoc.teamName,
            playerName: playerDoc.playerName,
            avatarUrl: playerDoc.avatarUrl,
            pdfUrl: playerDoc.pdfUrl,
            aadharUrl: playerDoc.aadharUrl,
            emailId: playerDoc.emailId,
            dateOfBirth: playerDoc.dateOfBirth,
            primaryContact: playerDoc.primaryContact,
            registerationFee: playerDoc.registerationFee,
            dateOfRegisteration: playerDoc.dateOfRegisteration,
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
    const [imageFile, setImageFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [aadharFile, setAadharFile] = useState(null);
    // Getting the progress and avatarUrl from the hook.
    const { avatarUrl, pdfUrl, aadharUrl } = useStorage(imageFile, pdfFile, aadharFile);
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
    const handleAadharChange = (e: any) => {
        const selectedAadharFile = e.target.files[0];
        if (selectedAadharFile) {
            if (pdfTypes.includes(selectedAadharFile.type)) {
                setAadharFile(selectedAadharFile);
            } else {
                setAadharFile(null);
                window.alert('Please select an pdf file');
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
        newPlayer.handlePlayer({ field: fieldName, value: e.target.value });
        setPlayer(newPlayer);
    };
    {
        console.log(playerDoc.pdfUrl);
    }
    const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (playerDoc.avatarUrl) {
            player.setAvatar = playerDoc.avatarUrl;
        }
        if (avatarUrl) {
            player.setAvatar = avatarUrl;
        }
        if (playerDoc.pdfUrl) {
            player.setPdf = playerDoc.pdfUrl;
        }
        if (pdfUrl) {
            player.setPdf = pdfUrl;
        }
        if (playerDoc.aadharUrl) {
            player.setAadhar = playerDoc.aadharUrl;
        }
        if (aadharUrl) {
            player.setAadhar = aadharUrl;
        }
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
                        <div>
                            <img
                                src={
                                    player.avatarUrl == null ? defaultAvatar : avatarUrl ? avatarUrl : player.avatarUrl
                                }
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
                            <div>
                                <button className="playerEditForm__general__header--iconBtn" onClick={deleteForm}>
                                    <i>
                                        <MdDelete />
                                    </i>
                                </button>
                                <PDFDownloadLink
                                    className="playerEditForm__general__header--dataDownload"
                                    document={<PrintPlayer player={player} />}
                                    fileName={`${player.playerName}.pdf`}
                                >
                                    {({ loading }) => (loading ? '' : <FaFileDownload />)}
                                </PDFDownloadLink>
                            </div>
                        </div>
                        <div className="playerEditForm__general--input">
                            <InputBox
                                title="player Name"
                                name="playerName"
                                type="text"
                                value={player.playerName}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="player Id"
                                name="playerId"
                                type="text"
                                value={player.playerId}
                                textHandler={handleInputForm}
                            />

                            <InputBox
                                title="Email Id"
                                name="emailId"
                                type="email"
                                value={player.emailId}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Father's Name"
                                name="fatherName"
                                type="text"
                                value={player.fatherName}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Date of Birth"
                                name="dateOfBirth"
                                type="date"
                                value={player.dateOfBirth?.toISOString().substr(0, 10)}
                                textHandler={handleInputForm}
                            />
                            <SelectInputBox
                                title="Team Name"
                                name="teamName"
                                options={selectable.teams.map((team) => team.teamName)}
                                value={player.teamName}
                                textHandler={handleSelectForm}
                            />
                            <InputBox
                                title="Primary Contact"
                                name="primaryContact"
                                type="number"
                                value={player.primaryContact}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Date of Registeration"
                                name="dateOfRegisteration"
                                type="date"
                                value={player.dateOfRegisteration?.toISOString().substr(0, 10)}
                                textHandler={handleInputForm}
                            />
                            <SelectInputBox
                                title="Registeration Fee"
                                name="registerationFee"
                                options={['Not Paid', 'Paid']}
                                value={player.registerationFee}
                                textHandler={handleSelectForm}
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
                                type="number"
                                value={player.aadharNumber}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Voter Id"
                                name="voterId"
                                type="text"
                                value={player.voterId}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Ration Card Number"
                                name="rationCardNumber"
                                type="text"
                                value={player.rationCardNumber}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Driving License"
                                name="drivingLicense"
                                type="text"
                                value={player.drivingLicense}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Pan Card Number"
                                name="panCardNumber"
                                type="text"
                                value={player.panCardNumber}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Passport"
                                name="passport"
                                type="text"
                                value={player.passport}
                                textHandler={handleInputForm}
                            />
                        </div>
                    </div>

                    <div className="upload">
                        <div className="upload__btnWrapper">
                            <input type="file" name="aadharUrl" title="Upload Aadhar" onChange={handleAadharChange} />
                            <button className="upload--aadharBtn">
                                {player.aadharUrl || aadharUrl ? 'Uploaded' : 'Upload Aadhar'}
                            </button>
                        </div>
                        {player.aadharUrl ? (
                            <a className="upload--view" href={player.aadharUrl} target="_blank" rel="noreferrer">
                                Click to View
                            </a>
                        ) : aadharUrl ? (
                            <a className="upload--view" href={aadharUrl} target="_blank" rel="noreferrer">
                                Click to View
                            </a>
                        ) : null}
                        <div className="upload__btnWrapper">
                            <input type="file" name="pdfUrl" title="Upload File" onChange={handlePdfChange} />
                            <button className="upload--pdfBtn">
                                {player.pdfUrl || pdfUrl ? 'Uploaded' : 'Upload File'}
                            </button>
                        </div>
                        {player.pdfUrl ? (
                            <a className="upload--view" href={player.pdfUrl} target="_blank" rel="noreferrer">
                                Click to View
                            </a>
                        ) : pdfUrl ? (
                            <a className="upload--view" href={pdfUrl} target="_blank" rel="noreferrer">
                                Click to View
                            </a>
                        ) : null}
                    </div>

                    <div className="playerEditForm__stats">
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
                                    value={player.battingStats?.numberOfMatches}
                                    textHandler={handleInputForm}
                                />
                                <InputBox
                                    title="Number Of Innings"
                                    name="battingStats_numberOfInnings"
                                    type="number"
                                    value={player.battingStats?.numberOfInnings}
                                    textHandler={handleInputForm}
                                />
                                <InputBox
                                    title="Total Runs"
                                    name="battingStats_totalRuns"
                                    type="number"
                                    value={player.battingStats?.totalRuns}
                                    textHandler={handleInputForm}
                                />
                                <InputBox
                                    title="Highest Score (HS)"
                                    name="battingStats_highestRuns"
                                    type="number"
                                    value={player.battingStats?.highestScore}
                                    textHandler={handleInputForm}
                                />
                                <InputBox
                                    title="Number Of Fifties"
                                    name="battingStats_numberOfFifties"
                                    type="number"
                                    value={player.battingStats?.numberOfFifties}
                                    textHandler={handleInputForm}
                                />
                                <InputBox
                                    title="Number Of Hundreds"
                                    name="battingStats_numberOfHundreds"
                                    type="number"
                                    value={player.battingStats?.numberOfHundreds}
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
                                        value={player.bowlingStats?.numberOfOvers}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Number Of Maidens"
                                        name="bowlingStats_noOfMaidens"
                                        type="number"
                                        value={player.bowlingStats?.noOfMaidens}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Runs Given"
                                        name="bowlingStats_runsGiven"
                                        type="number"
                                        value={player.bowlingStats?.runsGiven}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Wickets Taken"
                                        name="bowlingStats_wicketsTaken"
                                        type="number"
                                        value={player.bowlingStats?.wicketsTaken}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Best Bowling / Runs Given"
                                        name="bowlingStats_bestBowling_runsGiven"
                                        type="number"
                                        value={player.bowlingStats?.bestBowling.runsGiven}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Best Bowling / Wickets Taken"
                                        name="bowlingStats_bestBowling_wicketsTaken"
                                        type="number"
                                        value={player.bowlingStats?.bestBowling.wicketsTaken}
                                        textHandler={handleInputForm}
                                    />
                                    <InputBox
                                        title="Five Wicket Haul"
                                        name="bowlingStats_fiveWicketHaul"
                                        type="number"
                                        value={player.bowlingStats?.fiveWicketHaul}
                                        textHandler={handleInputForm}
                                    />
                                </div>
                            </div>
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

export default PlayerEdit;
