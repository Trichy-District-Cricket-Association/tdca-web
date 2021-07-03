import { useState } from 'react';
import Modal from 'react-modal';
import { firestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import Ground from '../../../../../../models/Ground';
import InputBox from '../../../shared_components/input_box/InputBox';
import './GroundEdit.scss';



const GroundEdit = (props: any) => {
    
    const groundDoc = props.groundDoc;
    const [ground, setGround] = useState<Ground>(new Ground(groundDoc));
    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newGround = new Ground({ ...ground });
        newGround.handleGround({ field: fieldName, value: e.target.value });
        setGround(newGround);
    };
    const submitForm = async (e: any) => {
        console.log(ground)
        e.preventDefault();
        await firestore
            .collection(Collections.grounds).doc(groundDoc.docId)
            .set(JSON.parse(JSON.stringify(ground)))
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
            className="groundEdit"
            isOpen={props.isOpen}
            onRequestClose={() => props.setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            <form className="groundEditForm" onSubmit={submitForm}>
                <div className="groundEditForm__general">
                    <h1 className="groundEditForm__general--header">General</h1>
                    <div className="groundEditForm__general--input">
                        <InputBox title="Ground Id" name="groundId" type="text" value = {groundDoc.groundId} textHandler={handleForm} />
                        <InputBox title="Ground Name" name="groundName" type="text" value = {groundDoc.groundName} textHandler={handleForm} />
                    </div>
                </div>
                <div className="groundEditForm__matchData">
                    <h1 className="groundEditForm__matchData--header">Match Details</h1>
                    <div className="groundEditForm__matchData--input">
                        <InputBox
                            title="Total Matches"
                            name="totalMatches"
                            type="number"
                            textHandler={handleForm}
                            value={groundDoc.totalMatches}

                        />
                        <InputBox
                            title="Division 1"
                            name="divisionMatches_one"
                            type="number"
                            textHandler={handleForm}
                            value={groundDoc.divisionMatches.one}
                        />
                        <InputBox
                            title="Division 2"
                            name="divisionMatches_two"
                            type="number"
                            textHandler={handleForm}
                            value={groundDoc.divisionMatches.two}
                        />
                        <InputBox
                            title="Division 3"
                            name="divisionMatches_three"
                            type="number"
                            textHandler={handleForm}
                            value={groundDoc.divisionMatches.three}
                        />
                        <InputBox
                            title="Division 4"
                            name="divisionMatches_four"
                            type="number"
                            textHandler={handleForm}
                            value={groundDoc.divisionMatches.four}
                        />
                        <InputBox
                            title="Division 5"
                            name="divisionMatches_five"
                            type="number"
                            textHandler={handleForm}
                            value={groundDoc.divisionMatches.five}
                        />
                        <InputBox
                            title="Inter District Match"
                            name="typeMatches_interDistrictMatch"
                            type="number"
                            textHandler={handleForm}
                            value={groundDoc.typeMatches.interDistrictMatch}
                        />
                        <InputBox
                            title="KnockOut Matches"
                            name="typeMatches_knockoutMatch"
                            type="number"
                            textHandler={handleForm}
                            value={groundDoc.typeMatches.knockoutMatch}
                        />
                        <InputBox
                            title="League Matches"
                            name="typeMatches_leagueMatch"
                            type="number"
                            textHandler={handleForm}
                            value={groundDoc.typeMatches.leagueMatch}
                        />
                        <InputBox
                            title="School Matches"
                            name="typeMatches_schoolMatch"
                            type="number"
                            textHandler={handleForm}
                            value={groundDoc.typeMatches.schoolMatch}
                        />
                    </div>
                </div>
                <div className="groundEditForm__btn">
                    <button className="groundEditForm__btn--cancel" onClick={() => props.setModalOpen(false)}>
                        Cancel
                    </button>
                    <button className="groundEditForm__btn--submit" type="submit" prevent-default>
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default GroundEdit;
