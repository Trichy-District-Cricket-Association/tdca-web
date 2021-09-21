import { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import Modal from 'react-modal';
import { firestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import Umpire from '../../../../../../models/Umpire';
import InputBox from '../../../shared_components/input_box/InputBox';
import './UmpireEdit.scss';
import useStorage from '../../../../../../hooks/useStorage';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import SelectInputBox from '../../../shared_components/select_input_box/SelectInputBox';
const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;

type UmpireEditProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    umpireDoc: Umpire;
};

const UmpireEdit: React.FC<UmpireEditProps> = ({ setModalOpen, umpireDoc }): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [umpire, setUmpire] = useState<Umpire>(
        new Umpire({
            umpireId: umpireDoc.umpireId,
            umpireName: umpireDoc.umpireName,
            avatarUrl: umpireDoc.avatarUrl,
            emailId: umpireDoc.emailId,
            divisionMatches: umpireDoc.divisionMatches,
            typeMatches: umpireDoc.typeMatches,
            totalMatches: umpireDoc.totalMatches,
            panel: umpireDoc.panel,
            dateOfBirth: umpireDoc.dateOfBirth,
            primaryContact: umpireDoc.primaryContact,
            secondaryContact: umpireDoc.secondaryContact,
            payPhoneNumber: umpireDoc.payPhoneNumber,
            bankAccountNumber: umpireDoc.bankAccountNumber,
            bankName: umpireDoc.bankName,
            bankBranch: umpireDoc.bankBranch,
            bankIFSC: umpireDoc.bankIFSC,
            aadharNumber: umpireDoc.aadharNumber,
            address: umpireDoc.address,
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
        const newUmpire = new Umpire({ ...umpire });
        newUmpire.handleUmpire({ field: fieldName, value: e.target.value });
        setUmpire(newUmpire);
    };
    const handleSelectForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newUmpire = new Umpire({ ...umpire });
        newUmpire.handleUmpire({ field: fieldName, value: e.target.value });
        setUmpire(newUmpire);
    };
    const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (umpireDoc.avatarUrl) {
            umpire.setAvatar = umpireDoc.avatarUrl;
        }
        if (avatarUrl) {
            umpire.setAvatar = avatarUrl;
        }

        await firestore
            .collection(Collections.umpires)
            .doc(umpireDoc.docId)
            .set(JSON.parse(JSON.stringify(umpire)))
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
                .collection(Collections.umpires)
                .doc(umpireDoc.docId)
                .delete()
                .then(() => setModalOpen(false));
        }
    };
    return (
        <Modal
            className="umpireEdit"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            {isLoading ? (
                <LoadingComp />
            ) : (
                <form className="umpireEditForm" onSubmit={submitForm}>
                    <div className="umpireEditForm__general">
                        {/* error message */}
                        {<p>{error}</p>}
                        <div>
                            <img
                                src={
                                    umpire.avatarUrl == null
                                        ? defaultAvatar
                                        : avatarUrl
                                        ? avatarUrl
                                        : umpireDoc.avatarUrl
                                }
                                alt="profile"
                                className="umpireEditForm__general--avatar"
                            />
                            <div className="umpireEditForm__general--avatarOverlay">
                                <label>
                                    <input
                                        type="file"
                                        name="avatarUrl"
                                        className="umpireEditForm__general--uploadBtn"
                                        onChange={handleAvatarChange}
                                    />
                                    <MdEdit className="editIcon" />
                                </label>
                            </div>
                        </div>
                        <div className="umpireEditForm__general__header">
                            <h1 className="umpireEditForm__general__header--text">General</h1>
                            <button className="umpireEditForm__general__header--iconBtn" onClick={deleteForm}>
                                <i>
                                    <MdDelete />
                                </i>
                            </button>
                        </div>
                        <div className="umpireEditForm__general--input">
                            <InputBox
                                title="Umpire Id"
                                name="umpireId"
                                value={umpire.umpireId}
                                type="text"
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Umpire Name"
                                name="umpireName"
                                value={umpire.umpireName}
                                type="text"
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Email Id"
                                name="emailId"
                                type="text"
                                value={umpire.emailId}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Date of Birth"
                                name="dateOfBirth"
                                type="date"
                                value={umpire.dateOfBirth?.toISOString().substr(0, 10)}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Primary Contact"
                                name="primaryContact"
                                type="text"
                                value={umpire.primaryContact}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Secondary Contact"
                                name="secondaryContact"
                                type="text"
                                value={umpire.secondaryContact}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Address"
                                name="address"
                                type="text"
                                value={umpire.address}
                                textHandler={handleForm}
                            />
                            <SelectInputBox
                                title="Panel"
                                name="panel"
                                options={['TDCA', 'TNCA']}
                                value={umpire.panel}
                                textHandler={handleSelectForm}
                            />
                        </div>
                    </div>
                    <div className="umpireEditForm__personalData">
                        <div className="umpireEditForm__personalData__header">
                            <h1 className="umpireEditForm__personalData__header--text">Personal Details</h1>
                        </div>
                        <div className="umpireEditForm__personalData--input">
                            <InputBox
                                title="Aadhar Number"
                                name="aadharNumber"
                                type="text"
                                value={umpire.aadharNumber}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="GPay / PhonePay Number"
                                name="payPhoneNumber"
                                type="text"
                                value={umpire.payPhoneNumber}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Bank Account Number"
                                name="bankAccountNumber"
                                type="text"
                                value={umpire.bankAccountNumber}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Bank Name"
                                name="bankName"
                                type="text"
                                value={umpire.bankName}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Bank Branch"
                                name="bankBranch"
                                type="text"
                                value={umpire.bankBranch}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Bank IFSC Code"
                                name="bankIFSC"
                                type="text"
                                value={umpire.bankIFSC}
                                textHandler={handleForm}
                            />
                        </div>
                    </div>
                    <div className="umpireEditForm__matchData">
                        <div className="umpireEditForm__matchData__header">
                            <h1 className="umpireEditForm__matchData__header--text">Match Details</h1>
                        </div>
                        <div className="umpireEditForm__matchData--input">
                            <InputBox
                                title="Total Matches"
                                name="totalMatches"
                                type="number"
                                textHandler={handleForm}
                                value={umpire.totalMatches}
                            />
                            <InputBox
                                title="Division 1"
                                name="divisionMatches_one"
                                type="number"
                                textHandler={handleForm}
                                value={umpire.divisionMatches?.one}
                            />
                            <InputBox
                                title="Division 2"
                                name="divisionMatches_two"
                                type="number"
                                textHandler={handleForm}
                                value={umpire.divisionMatches?.two}
                            />
                            <InputBox
                                title="Division 3"
                                name="divisionMatches_three"
                                type="number"
                                textHandler={handleForm}
                                value={umpire.divisionMatches?.three}
                            />
                            <InputBox
                                title="Division 4"
                                name="divisionMatches_four"
                                type="number"
                                textHandler={handleForm}
                                value={umpire.divisionMatches?.four}
                            />
                            <InputBox
                                title="Division 5"
                                name="divisionMatches_five"
                                type="number"
                                textHandler={handleForm}
                                value={umpire.divisionMatches?.five}
                            />
                            <InputBox
                                title="Inter District Match"
                                name="typeMatches_interDistrictMatch"
                                type="number"
                                textHandler={handleForm}
                                value={umpire.typeMatches?.interDistrictMatch}
                            />
                            <InputBox
                                title="KnockOut Matches"
                                name="typeMatches_knockoutMatch"
                                type="number"
                                textHandler={handleForm}
                                value={umpire.typeMatches?.knockoutMatch}
                            />
                            <InputBox
                                title="League Matches"
                                name="typeMatches_leagueMatch"
                                type="number"
                                textHandler={handleForm}
                                value={umpire.typeMatches?.leagueMatch}
                            />
                            <InputBox
                                title="School Matches"
                                name="typeMatches_schoolMatch"
                                type="number"
                                textHandler={handleForm}
                                value={umpire.typeMatches?.schoolMatch}
                            />
                            <InputBox
                                title="TNCA Matches"
                                name="typeMatches_tncaMatch"
                                type="number"
                                textHandler={handleForm}
                                value={umpire.typeMatches?.tncaMatch}
                            />
                            <InputBox
                                title="Combined District Matches"
                                name="typeMatches_combinedDistrictMatch"
                                type="number"
                                textHandler={handleForm}
                                value={umpire.typeMatches?.combinedDistrictMatch}
                            />
                            <InputBox
                                title="InterDistrict Matches"
                                name="typeMatches_interDistrictMatch"
                                type="number"
                                textHandler={handleForm}
                                value={umpire.typeMatches?.interDistrictMatch}
                            />
                            <InputBox
                                title="Private Matches"
                                name="typeMatches_privateMatch"
                                type="number"
                                textHandler={handleForm}
                                value={umpire.typeMatches?.privateMatch}
                            />
                        </div>
                    </div>
                    <div className="umpireEditForm__btn">
                        <button className="umpireEditForm__btn--cancel" onClick={() => setModalOpen(false)}>
                            Cancel
                        </button>
                        <button className="umpireEditForm__btn--submit" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default UmpireEdit;
