import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import Modal from 'react-modal';
import { firestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import Umpire from '../../../../../../models/Umpire';
import InputBox from '../../../shared_components/input_box/InputBox';
import './UmpireAdd.scss';
import useStorage from '../../../../../../hooks/useStorage';

const UmpireAdd = (props: any) => {
    const [umpire, setUmpire] = useState<Umpire>(new Umpire({}));

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
    const submitForm = async (e: any) => {
        e.preventDefault();
        umpire.setAvatar = avatarUrl;
        await firestore
            .collection(Collections.umpires)
            .add(JSON.parse(JSON.stringify(umpire)))
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
            className="umpireAdd"
            isOpen={props.isOpen}
            onRequestClose={() => props.setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            <form className="umpireAddForm" onSubmit={submitForm}>
                <div className="umpireAddForm__general">
                    {/* error message */}
                    {<p>{error}</p>}

                    {/* image display */}

                    <div>
                        <img src={avatarUrl} alt="profile" className="umpireAddForm__general--avatar" />
                        <div className="umpireAddForm__general--avatarOverlay">
                            <label>
                                <input
                                    type="file"
                                    name="avatarUrl"
                                    className="umpireAddForm__general--uploadBtn"
                                    onChange={handleAvatarChange}
                                />
                                <MdEdit className="editIcon" />
                            </label>
                        </div>
                    </div>
                    <h1 className="umpireAddForm__general--header">General</h1>
                    <div className="umpireAddForm__general--input">
                        <InputBox title="Umpire Id" name="umpireId" type="text" textHandler={handleForm} />
                        <InputBox title="Umpire Name" name="umpireName" type="text" textHandler={handleForm} />
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
                <div className="umpireAddForm__personalData">
                    <h1 className="umpireAddForm__personalData--header">Personal Details</h1>
                    <div className="umpireAddForm__personalData--input">
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
                <div className="umpireAddForm__matchData">
                    <h1 className="umpireAddForm__matchData--header">Match Details</h1>
                    <div className="umpireAddForm__matchData--input">
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
                <div className="umpireAddForm__btn">
                    <button className="umpireAddForm__btn--cancel" onClick={() => props.setModalOpen(false)}>
                        Cancel
                    </button>
                    <button className="umpireAddForm__btn--submit" type="submit"  >
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default UmpireAdd;
