import { useState } from 'react';
import Modal from 'react-modal';
import { firestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import Ground from '../../../../../../models/Ground';
import InputBox from '../../../shared_components/input_box/InputBox';
import './GroundEdit.scss';
import { MdDelete } from 'react-icons/md';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';

type GroundEditProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    groundDoc: Ground;
};

const GroundEdit: React.FC<GroundEditProps> = ({ setModalOpen, groundDoc }): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ground, setGround] = useState<Ground>(new Ground(groundDoc));
    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newGround = new Ground({ ...ground });
        newGround.handleGround({ field: fieldName, value: e.target.value });
        setGround(newGround);
    };
    const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await firestore
            .collection(Collections.grounds)
            .doc(groundDoc.docId)
            .set(JSON.parse(JSON.stringify(ground)))
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
                .collection(Collections.grounds)
                .doc(groundDoc.docId)
                .delete()
                .then(() => setModalOpen(false));
        }
    };
    return (
        <Modal
            className="groundEdit"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            {isLoading ? (
                <LoadingComp />
            ) : (
                <form className="groundEditForm" onSubmit={submitForm}>
                    <div className="groundEditForm__general">
                        <div className="groundEditForm___general__header">
                            <h1 className="groundEditForm___general__header--text">General</h1>
                            <button className="groundEditForm___general__header--iconBtn" onClick={deleteForm}>
                                <i>
                                    <MdDelete />
                                </i>
                            </button>
                        </div>
                        <div className="groundEditForm__general--input">
                            <InputBox
                                title="Ground Id"
                                name="groundId"
                                type="text"
                                value={groundDoc.groundId}
                                textHandler={handleForm}
                            />
                            <InputBox
                                title="Ground Name"
                                name="groundName"
                                type="text"
                                value={groundDoc.groundName}
                                textHandler={handleForm}
                            />
                        </div>
                    </div>
                    <div className="groundEditForm__matchData">
                        <div className="groundEditForm___matchData__header">
                            <h1 className="groundEditForm___matchData__header--text">Match Details</h1>
                        </div>
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
                                value={groundDoc.divisionMatches?.one}
                            />
                            <InputBox
                                title="Division 2"
                                name="divisionMatches_two"
                                type="number"
                                textHandler={handleForm}
                                value={groundDoc.divisionMatches?.two}
                            />
                            <InputBox
                                title="Division 3"
                                name="divisionMatches_three"
                                type="number"
                                textHandler={handleForm}
                                value={groundDoc.divisionMatches?.three}
                            />
                            <InputBox
                                title="Division 4"
                                name="divisionMatches_four"
                                type="number"
                                textHandler={handleForm}
                                value={groundDoc.divisionMatches?.four}
                            />
                            <InputBox
                                title="Division 5"
                                name="divisionMatches_five"
                                type="number"
                                textHandler={handleForm}
                                value={groundDoc.divisionMatches?.five}
                            />
                            <InputBox
                                title="Inter District Match"
                                name="typeMatches_interDistrictMatch"
                                type="number"
                                textHandler={handleForm}
                                value={groundDoc.typeMatches?.interDistrictMatch}
                            />
                            <InputBox
                                title="KnockOut Matches"
                                name="typeMatches_knockoutMatch"
                                type="number"
                                textHandler={handleForm}
                                value={groundDoc.typeMatches?.knockoutMatch}
                            />
                            <InputBox
                                title="League Matches"
                                name="typeMatches_leagueMatch"
                                type="number"
                                textHandler={handleForm}
                                value={groundDoc.typeMatches?.leagueMatch}
                            />
                            <InputBox
                                title="School Matches"
                                name="typeMatches_schoolMatch"
                                type="number"
                                textHandler={handleForm}
                                value={groundDoc.typeMatches?.schoolMatch}
                            />
                        </div>
                    </div>
                    <div className="groundEditForm__btn">
                        <button className="groundEditForm__btn--cancel" onClick={() => setModalOpen(false)}>
                            Cancel
                        </button>
                        <button className="groundEditForm__btn--submit" type="submit" prevent-default>
                            Save
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default GroundEdit;
