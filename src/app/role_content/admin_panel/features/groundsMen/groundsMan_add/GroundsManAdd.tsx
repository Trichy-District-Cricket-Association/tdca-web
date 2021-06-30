import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import Modal from 'react-modal';
import { firestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import GroundsMan from '../../../../../../models/GroundsMan';
import InputBox from '../../../shared_components/input_box/InputBox';
import './GroundsManAdd.scss';
import useStorage from '../../../../../../hooks/useStorage';

const GroundsManAdd = (props: any) => {
    const [groundsMan, setGroundsMan] = useState<GroundsMan>(new GroundsMan({}));

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
    const submitForm = async (e: any) => {
        e.preventDefault();
        groundsMan.setAvatar = avatarUrl;
        await firestore
            .collection(Collections.groundsMen)
            .add(JSON.parse(JSON.stringify(groundsMan)))
            .then((doc) => {
                console.log(doc);
            })
            .catch((e) => {
                console.log(e);
            });
        props.setModalOpen(false);
    };
    return (
        <Modal
            className="groundsManAdd"
            isOpen={props.isOpen}
            onRequestClose={() => props.setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            <form className="groundsManAddForm" onSubmit={submitForm}>
                <div className="groundsManAddForm__general">
                    {/* error message */}
                    {<p>{error}</p>}

                    {/* image display */}

                    <div>
                    <img src={avatarUrl} alt="profile" className="groundsManAddForm__general--avatar" />
                        <div className="groundsManAddForm__general--avatarOverlay">
                            <label>
                            <input type="file" name="avatarUrl" className="groundsManAddForm__general--uploadBtn"  onChange= {handleAvatarChange}/>
                            <MdEdit className="editIcon" />
                            </label>
                        </div>
                    </div>
                    <h1 className="groundsManAddForm__general--header">General</h1>
                    <div className="groundsManAddForm__general--input">
                        <InputBox title="GroundsMan Id" name="groundsManId" type="text" textHandler={handleForm} />
                        <InputBox title="GroundsMan Name" name="groundsManName" type="text" textHandler={handleForm} />
                        <InputBox title="Email Id" name="email Id" type="text" textHandler={handleForm} />
                        <InputBox title="Date of Birth" name="dateOfBirth" type="date" textHandler={handleForm} />
                        <InputBox title="Primary Contact" name="primaryContact" type="text" textHandler={handleForm} />
                        <InputBox
                            title="Secondary Contact"
                            name="secondaryContact"
                            type="text"
                            textHandler={handleForm}
                        />
                        <InputBox title="Address" name="address" type="text" textHandler={handleForm} />
                    </div>
                </div>
                <div className="groundsManAddForm__personalData">
                    <h1 className="groundsManAddForm__personalData--header">Personal Details</h1>
                    <div className="groundsManAddForm__personalData--input">
                        <InputBox title="Aadhar Number" name="aadharNumber" type="text" textHandler={handleForm} />
                        <InputBox
                            title="GPay / PhonePay Number"
                            name="payPhoneNumber"
                            type="text"
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Bank Account Number"
                            name="bankAccountNumber"
                            type="text"
                            textHandler={handleForm}
                        />
                        <InputBox title="Bank Name" name="bankName" type="text" textHandler={handleForm} />
                        <InputBox title="Bank Branch" name="bankBranch" type="text" textHandler={handleForm} />
                        <InputBox title="Bank IFSC Code" name="bankIFSC" type="text" textHandler={handleForm} />
                    </div>
                </div>

                <div className="groundsManAddForm__btn">
                    <button className="groundsManAddForm__btn--cancel" onClick={() => props.setModalOpen(false)}>
                        Cancel
                    </button>
                    <button className="groundsManAddForm__btn--submit" type="submit"  >
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default GroundsManAdd;
