import { useState } from 'react';
import Modal from 'react-modal';
import { firestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import Ground from '../../../../../../models/Ground';
import InputBox from '../../../shared_components/input_box/InputBox';
import './GroundAdd.scss';
import firebase from 'firebase';

type GroundAddProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const GroundAdd: React.FC<GroundAddProps> = ({ setModalOpen }): JSX.Element => {
    const [ground, setGround] = useState<Ground>(new Ground({}));

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newGround = new Ground({ ...ground });
        newGround.handleGround({ field: fieldName, value: e.target.value });
        setGround(newGround);
    };
    const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await firestore
            .collection(Collections.grounds)
            .add(JSON.parse(JSON.stringify(ground)))
            .then(async (doc) => {
                await firestore
                    .collection('counter')
                    .doc(Collections.grounds)
                    .update({ count: firebase.firestore.FieldValue.increment(1) });
                console.log(doc);
            })
            .catch((e) => {
                console.log(e);
            });
        setModalOpen(false);
    };

    return (
        <Modal
            className="groundAdd"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="groundAdd__overlay"
        >
            <form className="groundAddForm" onSubmit={submitForm}>
                <div className="groundAddForm__general">
                    <h1 className="groundAddForm__general--header">General</h1>
                    <div className="groundAddForm__general--input">
                        <InputBox title="Ground Id" name="groundId" type="text" textHandler={handleForm} />
                        <InputBox title="Ground Name" name="groundName" type="text" textHandler={handleForm} />
                    </div>
                </div>
                <div className="groundAddForm__matchData">
                    <h1 className="groundAddForm__matchData--header">Match Details</h1>
                    <div className="groundAddForm__matchData--input">
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
                    </div>
                </div>
                <div className="groundAddForm__btn">
                    <button className="groundAddForm__btn--cancel" onClick={() => setModalOpen(false)}>
                        Cancel
                    </button>
                    <button className="groundAddForm__btn--submit" type="submit" prevent-default>
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default GroundAdd;
