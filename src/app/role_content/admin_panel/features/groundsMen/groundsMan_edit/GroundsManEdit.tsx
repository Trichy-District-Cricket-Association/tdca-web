import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import Modal from 'react-modal';
import { firestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import GroundsMan from '../../../../../../models/GroundsMan';
import InputBox from '../../../shared_components/input_box/InputBox';
import './GroundsManEdit.scss';
import useStorage from '../../../../../../hooks/useStorage';
const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;

type GroundsManEditProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    groundsManDoc: GroundsMan;
};

const GroundsManEdit: React.FC<GroundsManEditProps> = ({ setModalOpen, groundsManDoc }): JSX.Element => {
    const [groundsMan, setGroundsMan] = useState<GroundsMan>(
        new GroundsMan({
            groundsManId: groundsManDoc.groundsManId,
            groundsManName: groundsManDoc.groundsManName,
            avatarUrl: groundsManDoc.avatarUrl,
            emailId: groundsManDoc.emailId,
            dateOfBirth: groundsManDoc.dateOfBirth,
            primaryContact: groundsManDoc.primaryContact,
            secondaryContact: groundsManDoc.secondaryContact,
            payPhoneNumber: groundsManDoc.payPhoneNumber,
            bankAccountNumber: groundsManDoc.bankAccountNumber,
            bankName: groundsManDoc.bankName,
            bankBranch: groundsManDoc.bankBranch,
            bankIFSC: groundsManDoc.bankIFSC,
            aadharNumber: groundsManDoc.aadharNumber,
            address: groundsManDoc.address,
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
        const newGroundsMan = new GroundsMan({ ...groundsMan });
        newGroundsMan.handleGroundsMan({ field: fieldName, value: e.target.value });
        setGroundsMan(newGroundsMan);
    };
    const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        groundsMan.setAvatar = avatarUrl;
        await firestore
            .collection(Collections.groundsMen)
            .doc(groundsManDoc.docId)
            .set(JSON.parse(JSON.stringify(groundsMan)))
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
            className="groundsManEdit"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            <form className="groundsManEditForm" onSubmit={submitForm}>
                <div className="groundsManEditForm__general">
                    {/* error message */}
                    {<p>{error}</p>}

                    {/* image display */}

                    <div>
                        <img
                            src={
                                groundsManDoc.avatarUrl == null
                                    ? defaultAvatar
                                    : avatarUrl
                                    ? avatarUrl
                                    : groundsManDoc.avatarUrl
                            }
                            alt="profile"
                            className="groundsManEditForm__general--avatar"
                        />
                        <div className="groundsManEditForm__general--avatarOverlay">
                            <label>
                                <input
                                    type="file"
                                    name="avatarUrl"
                                    className="groundsManEditForm__general--uploadBtn"
                                    onChange={handleAvatarChange}
                                />
                                <MdEdit className="editIcon" />
                            </label>
                        </div>
                    </div>
                    <h1 className="groundsManEditForm__general--header">General</h1>
                    <div className="groundsManEditForm__general--input">
                        <InputBox
                            title="GroundsMan Name"
                            name="groundsManName"
                            type="text"
                            value={groundsManDoc.groundsManName}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="GroundsMan Id"
                            name="groundsManId"
                            type="text"
                            value={groundsManDoc.groundsManId}
                            textHandler={handleForm}
                        />

                        <InputBox
                            title="Email Id"
                            name="emailId"
                            type="text"
                            value={groundsManDoc.emailId}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Date of Birth"
                            name="dateOfBirth"
                            type="date"
                            value={groundsManDoc.dateOfBirth?.toISOString().substr(0, 10)}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Primary Contact"
                            name="primaryContact"
                            value={groundsManDoc.primaryContact}
                            type="text"
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Secondary Contact"
                            name="secondaryContact"
                            type="text"
                            value={groundsManDoc.secondaryContact}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Address"
                            name="address"
                            type="text"
                            value={groundsManDoc.address}
                            textHandler={handleForm}
                        />
                    </div>
                </div>
                <div className="groundsManEditForm__personalData">
                    <h1 className="groundsManEditForm__personalData--header">Personal Details</h1>
                    <div className="groundsManEditForm__personalData--input">
                        <InputBox
                            title="Aadhar Number"
                            name="aadharNumber"
                            type="text"
                            value={groundsManDoc.aadharNumber}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="GPay / PhonePay Number"
                            name="payPhoneNumber"
                            type="text"
                            value={groundsManDoc.payPhoneNumber}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Bank Account Number"
                            name="bankAccountNumber"
                            type="text"
                            value={groundsManDoc.bankAccountNumber}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Bank Name"
                            name="bankName"
                            type="text"
                            value={groundsManDoc.bankName}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Bank Branch"
                            name="bankBranch"
                            type="text"
                            value={groundsManDoc.bankBranch}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Bank IFSC Code"
                            name="bankIFSC"
                            type="text"
                            value={groundsManDoc.bankIFSC}
                            textHandler={handleForm}
                        />
                    </div>
                </div>

                <div className="groundsManEditForm__btn">
                    <button className="groundsManEditForm__btn--cancel" onClick={() => setModalOpen(false)}>
                        Cancel
                    </button>
                    <button className="groundsManEditForm__btn--submit" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default GroundsManEdit;
