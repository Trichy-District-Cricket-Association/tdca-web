import { useState } from 'react';
import Modal from 'react-modal';
import { firestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import Team from '../../../../../../models/Team';
import InputBox from '../../../shared_components/input_box/InputBox';
import './TeamEdit.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import { MdDelete, MdEdit } from 'react-icons/md';
import useStorage from '../../../../../../hooks/useStorage';
import SelectInputBox from '../../../shared_components/select_input_box/SelectInputBox';
const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/teamAvatar.png`;

type TeamEditProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    teamDoc: Team;
};

const TeamEdit: React.FC<TeamEditProps> = ({ setModalOpen, teamDoc }): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [team, setTeam] = useState<Team>(
        new Team({
            teamId: teamDoc.teamId,
            teamName: teamDoc.teamName,
            type: teamDoc.type,
            avatarUrl: teamDoc.avatarUrl,
            emailId: teamDoc.emailId,
            division: teamDoc.division,
            numberOfMatches: teamDoc.numberOfMatches,
            won: teamDoc.won,
            lost: teamDoc.lost,
            draw: teamDoc.draw,
            tie: teamDoc.tie,
            noResult: teamDoc.noResult,
            totalPoints: teamDoc.totalPoints,
            walkover: teamDoc.walkover,
            conceed: teamDoc.conceed,
            refusal: teamDoc.refusal,
            penalty: teamDoc.penalty,
            active: teamDoc.active,
        }),
    );
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

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newTeam = new Team({ ...team });
        newTeam.handleTeam({ field: fieldName, value: e.target.value });
        setTeam(newTeam);
    };
    const handleSelectForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newTeam = new Team({ ...team });
        newTeam.handleTeam({ field: fieldName, value: e.target.value });
        setTeam(newTeam);
    };

    const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (teamDoc.avatarUrl) {
            team.setAvatar = teamDoc.avatarUrl;
        }
        if (avatarUrl) {
            team.setAvatar = avatarUrl;
        }

        await firestore
            .collection(Collections.teams)
            .doc(teamDoc.docId)
            .set(JSON.parse(JSON.stringify(team)))
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
                .collection(Collections.teams)
                .doc(teamDoc.docId)
                .delete()
                .then(() => setModalOpen(false));
        }
    };
    return (
        <Modal
            className="teamEdit"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            {isLoading ? (
                <LoadingComp />
            ) : (
                <form className="teamEditForm" onSubmit={submitForm}>
                    <div className="teamEditForm__general">
                        {/* error message */}
                        {<p>{error}</p>}

                        {/* image display */}

                        <div>
                            <img
                                src={team.avatarUrl == null ? defaultAvatar : avatarUrl ? avatarUrl : team.avatarUrl}
                                alt="Team Profile"
                                className="teamEditForm__general--avatar"
                            />

                            <div className="teamEditForm__general--avatarOverlay">
                                <label>
                                    <input
                                        type="file"
                                        name="avatarUrl"
                                        className="teamEditForm__general--uploadBtn"
                                        onChange={handleAvatarChange}
                                    />
                                    <MdEdit className="editIcon" />
                                </label>
                            </div>
                        </div>
                        <div className="teamEditForm__general__header">
                            <h1 className="teamEditForm__general__header--text">General</h1>
                            <button className="teamEditForm__general__header--iconBtn" onClick={deleteForm}>
                                <i>
                                    <MdDelete />
                                </i>
                            </button>
                        </div>

                        <div className="teamEditForm__general--input">
                            <InputBox
                                title="Team Id"
                                name="teamId"
                                type="text"
                                value={team.teamId}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Team Name"
                                name="teamName"
                                type="text"
                                value={team.teamName}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Email Id"
                                name="emailId"
                                type="email"
                                value={team.emailId}
                                textHandler={handleForm}
                            />
                            <SelectInputBox
                                title="Team Type"
                                name="type"
                                options={['League Team', 'School Team', 'Knockout Team']}
                                textHandler={handleSelectForm}
                                value={team.type}
                            />
                            <InputBox
                                title="Team Colour"
                                name="teamColor"
                                type="color"
                                value={team.teamColor}
                                textHandler={handleForm}
                            />
                            <SelectInputBox
                                title="Active"
                                name="active"
                                options={['Yes', 'No']}
                                value={team.active}
                                textHandler={handleSelectForm}
                            />
                        </div>
                    </div>
                    <div className="teamEditForm__matchData">
                        <div className="teamEditForm__general__header">
                            <h1 className="teamEditForm__general__header--text">Match Details</h1>
                        </div>
                        <div className="teamEditForm__matchData--input">
                            {team.type == 'League Team' ? (
                                <InputBox
                                    title="Division"
                                    name="division"
                                    type="number"
                                    value={team.division}
                                    textHandler={handleForm}
                                />
                            ) : null}

                            <InputBox
                                title="Matches Played"
                                name="numberOfMatches"
                                type="number"
                                value={team.numberOfMatches}
                                textHandler={handleForm}
                            />
                            <InputBox title="Won" name="won" type="number" value={team.won} textHandler={handleForm} />
                            <InputBox
                                title="Lost"
                                name="lost"
                                type="number"
                                value={team.lost}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Draw"
                                name="draw"
                                type="number"
                                value={team.draw}
                                textHandler={handleForm}
                            />
                            <InputBox title="Tie" name="tie" type="number" value={team.tie} textHandler={handleForm} />
                            <InputBox
                                title="No Result"
                                name="noResult"
                                type="number"
                                value={team.noResult}
                                textHandler={handleForm}
                            />
                            {team.type == 'League Team' ? (
                                <InputBox
                                    title="Total Points"
                                    name="totalPoints"
                                    type="number"
                                    textHandler={handleForm}
                                    value={team.totalPoints}
                                />
                            ) : null}

                            {team.type == 'League Team' || team.type == 'Knockout Team' ? (
                                <InputBox
                                    title="Walkover"
                                    name="walkover"
                                    type="number"
                                    value={team.walkover}
                                    textHandler={handleForm}
                                />
                            ) : null}
                            {team.type == 'League Team' || team.type == 'Knockout Team' ? (
                                <InputBox
                                    title="Conceed"
                                    name="conceed"
                                    type="number"
                                    value={team.conceed}
                                    textHandler={handleForm}
                                />
                            ) : null}
                            {team.type == 'League Team' || team.type == 'Knockout Team' ? (
                                <InputBox
                                    title="Refusal"
                                    name="refusal"
                                    type="number"
                                    value={team.refusal}
                                    textHandler={handleForm}
                                />
                            ) : null}

                            {team.type == 'League Team' ? (
                                <InputBox
                                    title="Penalty"
                                    name="penalty"
                                    type="number"
                                    value={team.penalty}
                                    textHandler={handleForm}
                                />
                            ) : null}
                        </div>
                    </div>
                    <div className="teamEditForm__btn">
                        <button className="teamEditForm__btn--cancel" onClick={() => setModalOpen(false)}>
                            Cancel
                        </button>
                        <button className="teamEditForm__btn--submit" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default TeamEdit;
