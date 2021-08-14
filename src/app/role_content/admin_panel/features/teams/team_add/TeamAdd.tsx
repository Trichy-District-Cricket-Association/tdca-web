import { useState } from 'react';
import Modal from 'react-modal';
import { dummyAuth, dummyFirestore, firestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import Team from '../../../../../../models/Team';
import InputBox from '../../../shared_components/input_box/InputBox';
import './TeamAdd.scss';
import User from '../../../../../../models/User';
import { UserRoles } from '../../../../../../enums/auth';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import firebase from 'firebase';
import useStorage from '../../../../../../hooks/useStorage';
import { MdEdit } from 'react-icons/md';
const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/teamAvatar.png`;

type TeamAddProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TeamAdd: React.FC<TeamAddProps> = ({ setModalOpen }): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [team, setTeam] = useState<Team>(new Team({}));
    const [user, setUser] = useState<{ email: string; password: string }>({
        email: '',
        password: '',
    });

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
    const handleUserForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = `${e.target.name}` as const;
        if (fieldName == 'email') {
            setUser({ ...user, email: e.target.value });
        } else if (fieldName == 'password') {
            setUser({ ...user, password: e.target.value });
        }
    };

    const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        team.setAvatar = avatarUrl;
        await firestore
            .collection(Collections.teams)
            .add(JSON.parse(JSON.stringify(team)))
            .then(async (doc) => {
                await firestore
                    .collection('counter')
                    .doc(Collections.teams)
                    .update({ count: firebase.firestore.FieldValue.increment(1) });
                console.log(doc);
            })
            .catch((e) => {
                console.log(e);
            });

        await dummyAuth.createUserWithEmailAndPassword(user.email, user.password).then(async () => {
            await dummyFirestore
                .collection(Collections.users)
                .doc(dummyAuth.currentUser?.uid)
                .set(
                    JSON.parse(
                        JSON.stringify(
                            new User({
                                email: user.email,
                                id: team.teamId,
                                role: UserRoles.team,
                                name: team.teamName,
                            }),
                        ),
                    ),
                )
                .then(async () => await dummyAuth.signOut())
                .finally(() => setModalOpen(false));
        });
    };

    return (
        <Modal
            className="teamAdd"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            {isLoading ? (
                <LoadingComp />
            ) : (
                <form className="teamAddForm" onSubmit={submitForm}>
                    <div className="teamAddForm__general">
                        {/* error message */}
                        {<p>{error}</p>}

                        {/* image display */}

                        <div>
                            <img
                                src={avatarUrl ? avatarUrl : defaultAvatar}
                                alt="Team Profile"
                                className="teamAddForm__general--avatar"
                            />
                            <div className="teamAddForm__general--avatarOverlay">
                                <label>
                                    <input
                                        type="file"
                                        name="avatarUrl"
                                        className="teamAddForm__general--uploadBtn"
                                        onChange={handleAvatarChange}
                                    />
                                    <MdEdit className="editIcon" />
                                </label>
                            </div>
                        </div>
                        <h1 className="teamAddForm__general--header">General</h1>
                        <div className="teamAddForm__general--input">
                            <InputBox title="Team Id" name="teamId" type="text" textHandler={handleForm} />
                            <InputBox title="Team Name" name="teamName" type="text" textHandler={handleForm} />
                            <InputBox title="Email Id" name="emailId" type="text" textHandler={handleForm} />
                            <InputBox title="Team Colour" name="teamColor" type="color" textHandler={handleForm} />
                        </div>
                    </div>
                    <div className="teamAddForm__matchData">
                        <h1 className="teamAddForm__matchData--header">Match Details</h1>
                        <div className="teamAddForm__matchData--input">
                            <InputBox
                                title="Division"
                                name="division"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox
                                title="Matches Played"
                                name="numberOfMatches"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox title="Won" name="won" type="number" textHandler={handleForm} value={0} />
                            <InputBox title="Lost" name="lost" type="number" textHandler={handleForm} value={0} />
                            <InputBox title="Draw" name="draw" type="number" textHandler={handleForm} value={0} />
                            <InputBox title="Tie" name="tie" type="number" textHandler={handleForm} value={0} />
                            <InputBox
                                title="No Result"
                                name="noResult"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox
                                title="Total Points"
                                name="totalPoints"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox
                                title="League Matches"
                                name="typeMatches_leagueMatch"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox
                                title="Walkover"
                                name="walkover"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox title="Conceed" name="conceed" type="number" textHandler={handleForm} value={0} />
                            <InputBox title="Refusal" name="refusal" type="number" textHandler={handleForm} value={0} />
                            <InputBox title="Penalty" name="penalty" type="number" textHandler={handleForm} value={0} />
                        </div>
                    </div>
                    <div className="teamAddForm__createAccount">
                        <h1 className="teamAddForm__createAccount--header">Create Account</h1>
                        <div className="teamAddForm__createAccount--input">
                            <InputBox title="Team Email" name="email" type="text" textHandler={handleUserForm} />
                            <InputBox title="Password" name="password" type="text" textHandler={handleUserForm} />
                        </div>
                    </div>

                    <div className="teamAddForm__btn">
                        <button className="teamAddForm__btn--cancel" onClick={() => setModalOpen(false)}>
                            Cancel
                        </button>
                        <button className="teamAddForm__btn--submit" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default TeamAdd;
