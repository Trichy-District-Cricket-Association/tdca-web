import { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import Modal from 'react-modal';
import { firestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import Scorer from '../../../../../../models/Scorer';
import InputBox from '../../../shared_components/input_box/InputBox';
import './ScorerEdit.scss';
import useStorage from '../../../../../../hooks/useStorage';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import SelectInputBox from '../../../shared_components/select_input_box/SelectInputBox';
const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;

type ScorerEditProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    scorerDoc: Scorer;
};

const ScorerEdit: React.FC<ScorerEditProps> = ({ setModalOpen, scorerDoc }): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [scorer, setScorer] = useState<Scorer>(
        new Scorer({
            scorerId: scorerDoc.scorerId,
            scorerName: scorerDoc.scorerName,
            avatarUrl: scorerDoc.avatarUrl,
            emailId: scorerDoc.emailId,
            divisionMatches: scorerDoc.divisionMatches,
            typeMatches: scorerDoc.typeMatches,
            panel: scorerDoc.panel,
            totalMatches: scorerDoc.totalMatches,
            dateOfBirth: scorerDoc.dateOfBirth,
            primaryContact: scorerDoc.primaryContact,
            secondaryContact: scorerDoc.secondaryContact,
            payPhoneNumber: scorerDoc.payPhoneNumber,
            bankAccountNumber: scorerDoc.bankAccountNumber,
            bankName: scorerDoc.bankName,
            bankBranch: scorerDoc.bankBranch,
            bankIFSC: scorerDoc.bankIFSC,
            aadharNumber: scorerDoc.aadharNumber,
            address: scorerDoc.address,
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
    const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (scorerDoc.avatarUrl) {
            scorer.setAvatar = scorerDoc.avatarUrl;
        }
        if (avatarUrl) {
            scorer.setAvatar = avatarUrl;
        }
        await firestore
            .collection(Collections.scorers)
            .doc(scorerDoc.docId)
            .set(JSON.parse(JSON.stringify(scorer)))
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
                .collection(Collections.scorers)
                .doc(scorerDoc.docId)
                .delete()
                .then(() => setModalOpen(false));
        }
    };
    return (
        <Modal
            className="scorerEdit"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            {isLoading ? (
                <LoadingComp />
            ) : (
                <form className="scorerEditForm" onSubmit={submitForm}>
                    <div className="scorerEditForm__general">
                        {/* error message */}
                        {<p>{error}</p>}

                        {/* image display */}

                        <div>
                            <img
                                src={
                                    scorer.avatarUrl == null
                                        ? defaultAvatar
                                        : avatarUrl
                                        ? avatarUrl
                                        : scorerDoc.avatarUrl
                                }
                                alt="profile"
                                className="scorerEditForm__general--avatar"
                            />

                            <div className="scorerEditForm__general--avatarOverlay">
                                <label>
                                    <input
                                        type="file"
                                        name="avatarUrl"
                                        className="scorerEditForm__general--uploadBtn"
                                        onChange={handleAvatarChange}
                                    />
                                    <MdEdit className="editIcon" />
                                </label>
                            </div>
                        </div>
                        <div className="scorerEditForm__general__header">
                            <h1 className="scorerEditForm__general__header--text">General</h1>
                            <button className="scorerEditForm__general__header--iconBtn" onClick={deleteForm}>
                                <i>
                                    <MdDelete />
                                </i>
                            </button>
                        </div>
                        <div className="scorerEditForm__general--input">
                            <InputBox
                                title="Scorer Id"
                                name="scorerId"
                                value={scorer.scorerId}
                                type="text"
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Scorer Name"
                                name="scorerName"
                                value={scorer.scorerName}
                                type="text"
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Email Id"
                                name="emailId"
                                type="text"
                                value={scorer.emailId}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Date of Birth"
                                name="dateOfBirth"
                                type="date"
                                value={scorer.dateOfBirth?.toISOString().substr(0, 10)}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Primary Contact"
                                name="primaryContact"
                                type="text"
                                value={scorer.primaryContact}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Secondary Contact"
                                name="secondaryContact"
                                type="text"
                                value={scorer.secondaryContact}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Address"
                                name="address"
                                type="text"
                                value={scorer.address}
                                textHandler={handleForm}
                            />
                            <SelectInputBox
                                title="Panel"
                                name="panel"
                                options={['TDCA', 'TNCA']}
                                value={scorer.panel}
                                textHandler={handleSelectForm}
                            />
                        </div>
                    </div>
                    <div className="scorerEditForm__personalData">
                        <div className="scorerEditForm__personalData__header">
                            <h1 className="scorerEditForm__personalData__header--text">Personal Details</h1>
                        </div>
                        <div className="scorerEditForm__personalData--input">
                            <InputBox
                                title="Aadhar Number"
                                name="aadharNumber"
                                type="text"
                                value={scorer.aadharNumber}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="GPay / PhonePay Number"
                                name="payPhoneNumber"
                                type="text"
                                value={scorer.payPhoneNumber}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Bank Account Number"
                                name="bankAccountNumber"
                                type="text"
                                value={scorer.bankAccountNumber}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Bank Name"
                                name="bankName"
                                type="text"
                                value={scorer.bankName}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Bank Branch"
                                name="bankBranch"
                                type="text"
                                value={scorer.bankBranch}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Bank IFSC Code"
                                name="bankIFSC"
                                type="text"
                                value={scorer.bankIFSC}
                                textHandler={handleForm}
                            />
                        </div>
                    </div>
                    <div className="scorerEditForm__matchData">
                        <div className="scorerEditForm__matchData__header">
                            <h1 className="scorerEditForm__matchData__header--text">Personal Details</h1>
                        </div>
                        <div className="scorerEditForm__matchData--input">
                            <InputBox
                                title="Total Matches"
                                name="totalMatches"
                                type="number"
                                textHandler={handleForm}
                                value={scorer.totalMatches}
                            />
                            <InputBox
                                title="Division 1"
                                name="divisionMatches_one"
                                type="number"
                                textHandler={handleForm}
                                value={scorer.divisionMatches?.one}
                            />
                            <InputBox
                                title="Division 2"
                                name="divisionMatches_two"
                                type="number"
                                textHandler={handleForm}
                                value={scorer.divisionMatches?.two}
                            />
                            <InputBox
                                title="Division 3"
                                name="divisionMatches_three"
                                type="number"
                                textHandler={handleForm}
                                value={scorer.divisionMatches?.three}
                            />
                            <InputBox
                                title="Division 4"
                                name="divisionMatches_four"
                                type="number"
                                textHandler={handleForm}
                                value={scorer.divisionMatches?.four}
                            />
                            <InputBox
                                title="Division 5"
                                name="divisionMatches_five"
                                type="number"
                                textHandler={handleForm}
                                value={scorer.divisionMatches?.five}
                            />
                            <InputBox
                                title="Inter District Match"
                                name="typeMatches_interDistrictMatch"
                                type="number"
                                textHandler={handleForm}
                                value={scorer.typeMatches?.interDistrictMatch}
                            />
                            <InputBox
                                title="KnockOut Matches"
                                name="typeMatches_knockoutMatch"
                                type="number"
                                textHandler={handleForm}
                                value={scorer.typeMatches?.knockoutMatch}
                            />
                            <InputBox
                                title="League Matches"
                                name="typeMatches_leagueMatch"
                                type="number"
                                textHandler={handleForm}
                                value={scorer.typeMatches?.leagueMatch}
                            />
                            <InputBox
                                title="School Matches"
                                name="typeMatches_schoolMatch"
                                type="number"
                                textHandler={handleForm}
                                value={scorer.typeMatches?.schoolMatch}
                            />
                            <InputBox
                                title="TNCA Matches"
                                name="typeMatches_tncaMatch"
                                type="number"
                                textHandler={handleForm}
                                value={scorer.typeMatches?.tncaMatch}
                            />
                            <InputBox
                                title="Combined District Matches"
                                name="typeMatches_combinedDistrictMatch"
                                type="number"
                                textHandler={handleForm}
                                value={scorer.typeMatches?.combinedDistrictMatch}
                            />
                            <InputBox
                                title="InterDistrict Matches"
                                name="typeMatches_interDistrictMatch"
                                type="number"
                                textHandler={handleForm}
                                value={scorer.typeMatches?.interDistrictMatch}
                            />
                            <InputBox
                                title="Private Matches"
                                name="typeMatches_privateMatch"
                                type="number"
                                textHandler={handleForm}
                                value={scorer.typeMatches?.privateMatch}
                            />
                        </div>
                    </div>

                    <div className="scorerEditForm__btn">
                        <button className="scorerEditForm__btn--cancel" onClick={() => setModalOpen(false)}>
                            Cancel
                        </button>
                        <button className="scorerEditForm__btn--submit" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default ScorerEdit;
