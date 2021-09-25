import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import Modal from 'react-modal';
import { dummyAuth, firestore, dummyFirestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import Scorer from '../../../../../../models/Scorer';
import InputBox from '../../../shared_components/input_box/InputBox';
import './ScorerAdd.scss';
import useStorage from '../../../../../../hooks/useStorage';
import User from '../../../../../../models/User';
import { UserRoles } from '../../../../../../enums/auth';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import SelectInputBox from '../../../shared_components/select_input_box/SelectInputBox';
const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;
type ScorerAddProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ScorerAdd: React.FC<ScorerAddProps> = ({ setModalOpen }): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [scorer, setScorer] = useState<Scorer>(new Scorer({}));
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
        const newScorer = new Scorer({ ...scorer });
        newScorer.handleScorer({ field: fieldName, value: e.target.value });
        setScorer(newScorer);
    };
    const handleSelectForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newScorer = new Scorer({ ...scorer });
        newScorer.handleScorer({ field: fieldName, value: e.target.value });
        setScorer(newScorer);
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
        scorer.setAvatar = avatarUrl;
        await firestore
            .collection(Collections.scorers)
            .add(JSON.parse(JSON.stringify(scorer)))
            .then(async (doc) => {
                console.log(doc);
            })
            .catch((e) => {
                console.log(e);
            })
            .then(
                async () =>
                    await dummyAuth.createUserWithEmailAndPassword(user.email, user.password).then(async () => {
                        await dummyFirestore
                            .collection(Collections.users)
                            .doc(dummyAuth.currentUser?.uid)
                            .set(
                                JSON.parse(
                                    JSON.stringify(
                                        new User({
                                            email: user.email,
                                            id: scorer.scorerId,
                                            role: UserRoles.scorer,
                                            name: scorer.scorerName,
                                        }),
                                    ),
                                ),
                            )
                            .catch((e) => {
                                console.log(e);
                            })
                            .then(async () => await dummyAuth.signOut())
                            .finally(() => setModalOpen(false));
                    }),
            );
    };

    return (
        <Modal
            className="scorerAdd"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            {isLoading ? (
                <LoadingComp />
            ) : (
                <form className="scorerAddForm" onSubmit={submitForm}>
                    <div className="scorerAddForm__general">
                        {/* error message */}
                        {<p>{error}</p>}

                        {/* image display */}

                        <div>
                            <img
                                src={avatarUrl ? avatarUrl : defaultAvatar}
                                alt="profile"
                                className="scorerAddForm__general--avatar"
                            />
                            <div className="scorerAddForm__general--avatarOverlay">
                                <label>
                                    <input
                                        type="file"
                                        name="avatarUrl"
                                        className="scorerAddForm__general--uploadBtn"
                                        onChange={handleAvatarChange}
                                    />
                                    <MdEdit className="editIcon" />
                                </label>
                            </div>
                        </div>
                        <h1 className="scorerAddForm__general--header">General</h1>
                        <div className="scorerAddForm__general--input">
                            <InputBox title="Scorer Id" name="scorerId" type="text" textHandler={handleForm} />
                            <InputBox title="Scorer Name" name="scorerName" type="text" textHandler={handleForm} />
                            <InputBox title="Email Id" name="emailId" type="email" textHandler={handleForm} />
                            <InputBox title="Date of Birth" name="dateOfBirth" type="date" textHandler={handleForm} />
                            <InputBox
                                title="Primary Contact"
                                name="primaryContact"
                                type="number"
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Secondary Contact"
                                name="secondaryContact"
                                type="number"
                                textHandler={handleForm}
                            />
                            <InputBox title="Address" name="address" type="text" textHandler={handleForm} />
                            <SelectInputBox
                                title="Panel"
                                name="panel"
                                options={['TDCA', 'TNCA']}
                                textHandler={handleSelectForm}
                            />
                        </div>
                    </div>
                    <div className="scorerAddForm__personalData">
                        <h1 className="scorerAddForm__personalData--header">Personal Details</h1>
                        <div className="scorerAddForm__personalData--input">
                            <InputBox title="Aadhar Number" name="aadharNumber" type="text" textHandler={handleForm} />
                            <InputBox
                                title="GPay / PhonePay Number"
                                name="payPhoneNumber"
                                type="number"
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Bank Account Number"
                                name="bankAccountNumber"
                                type="number"
                                textHandler={handleForm}
                            />
                            <InputBox title="Bank Name" name="bankName" type="text" textHandler={handleForm} />
                            <InputBox title="Bank Branch" name="bankBranch" type="text" textHandler={handleForm} />
                            <InputBox title="Bank IFSC Code" name="bankIFSC" type="text" textHandler={handleForm} />
                        </div>
                    </div>
                    <div className="scorerAddForm__matchData">
                        <h1 className="scorerAddForm__matchData--header">Match Details</h1>
                        <div className="scorerAddForm__matchData--input">
                            <InputBox
                                title="Total Matches"
                                name="totalMatches"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox
                                title="Division 1"
                                name="divisionMatches_one"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox
                                title="Division 2"
                                name="divisionMatches_two"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox
                                title="Division 3"
                                name="divisionMatches_three"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox
                                title="Division 4"
                                name="divisionMatches_four"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox
                                title="Division 5"
                                name="divisionMatches_five"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox
                                title="Inter District Match"
                                name="typeMatches_interDistrictMatch"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox
                                title="KnockOut Matches"
                                name="typeMatches_knockoutMatch"
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
                                title="School Matches"
                                name="typeMatches_schoolMatch"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox
                                title="TNCA Matches"
                                name="typeMatches_tncaMatch"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox
                                title="Combined District Matches"
                                name="typeMatches_combinedDistrictMatch"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox
                                title="InterDistrict Matches"
                                name="typeMatches_interDistrictMatch"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                            <InputBox
                                title="Private Matches"
                                name="typeMatches_privateMatch"
                                type="number"
                                textHandler={handleForm}
                                value={0}
                            />
                        </div>
                    </div>
                    <div className="scorerAddForm__createAccount">
                        <h1 className="scorerAddForm__createAccount--header">Create Account</h1>
                        <div className="scorerAddForm__createAccount--input">
                            <InputBox title="Scorer Email" name="email" type="email" textHandler={handleUserForm} />
                            <InputBox title="Password" name="password" type="text" textHandler={handleUserForm} />
                        </div>
                    </div>

                    <div className="scorerAddForm__btn">
                        <button className="scorerAddForm__btn--cancel" onClick={() => setModalOpen(false)}>
                            Cancel
                        </button>
                        <button className="scorerAddForm__btn--submit" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default ScorerAdd;
