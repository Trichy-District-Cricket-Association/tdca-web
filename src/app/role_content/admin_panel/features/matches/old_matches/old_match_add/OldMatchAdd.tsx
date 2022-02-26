import { useState } from 'react';
import Modal from 'react-modal';
import { firestore } from '../../../../../../../firebase';
import { Collections } from '../../../../../../../enums/collection';
import '../OldMatch.scss';
import InputBox from '../../../../shared_components/input_box/InputBox';
import LoadingComp from '../../../../../../shared_components/loading_comp/LoadingComp';
import OldMatch from '../../../../../../../models/OldMatch';
import SelectInputBox from '../../../../shared_components/select_input_box/SelectInputBox';

type OldMatchAddProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const OldMatchAdd: React.FC<OldMatchAddProps> = ({ setModalOpen }): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [oldMatch, setOldMatch] = useState<OldMatch>(new OldMatch({}));

    const handleInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newOldMatch = new OldMatch({ ...oldMatch });
        newOldMatch.handleOldMatch({ field: fieldName, value: e.target.value });
        setOldMatch(newOldMatch);
    };

    const handleSelectForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newOldMatch = new OldMatch({ ...oldMatch });
        newOldMatch.handleOldMatch({ field: fieldName, value: e.target.value });
        setOldMatch(newOldMatch);
    };

    const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await firestore
            .collection(Collections.oldMatches)
            .add(JSON.parse(JSON.stringify(oldMatch)))
            .then(async (doc) => {
                console.log(doc);
            })
            .catch((e) => {
                console.log(e);
            });
        setModalOpen(false);
    };

    return (
        <Modal
            className="oldMatch"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            {isLoading ? (
                <LoadingComp />
            ) : (
                <form className="oldMatchForm" onSubmit={submitForm}>
                    <div className="oldMatchForm__matchData">
                        <h1 className="oldMatchForm__matchData--header">Match Details</h1>
                        <div className="oldMatchForm__matchData--input">
                            <InputBox
                                title="Old Match Id"
                                name="oldMatchId"
                                type="text"
                                textHandler={handleInputForm}
                            />
                            <SelectInputBox
                                title="Match Type"
                                name="type"
                                options={['League Tournament', 'School Tournament', 'Knockout Tournament']}
                                textHandler={handleSelectForm}
                            />
                            {oldMatch.type == 'League Tournament' ? (
                                <SelectInputBox
                                    title="Division"
                                    name="division"
                                    options={[1, 2, 3, 4, 5]}
                                    textHandler={handleSelectForm}
                                />
                            ) : null}
                            {oldMatch.type == 'School Tournament' ? (
                                <SelectInputBox
                                    title="School Match Type"
                                    name="schoolMatchType"
                                    options={['Below 8th Std', 'Below 10th Std', 'Below 12th Std']}
                                    textHandler={handleSelectForm}
                                />
                            ) : null}
                            <InputBox title="Team A" name="teamA" type="text" textHandler={handleInputForm} />
                            <InputBox title="Team B" name="teamB" type="text" textHandler={handleInputForm} />

                            <InputBox title="Venue" name="venue" type="text" textHandler={handleInputForm} />

                            <InputBox title="Date of Match" name="date" type="date" textHandler={handleInputForm} />
                            <InputBox
                                title="Status"
                                name="status"
                                type="text"
                                value="Toss not Done"
                                textHandler={handleInputForm}
                            />
                        </div>
                        <div className="oldMatchForm__scorecard">
                            <h1 className="oldMatchForm__scorecard--header">Scoreboard</h1>
                            <div className="oldMatchForm__scorecard--input">
                                <InputBox
                                    title="Total Overs"
                                    name="totalOvers"
                                    type="number"
                                    textHandler={handleInputForm}
                                    value={0}
                                />
                                <InputBox
                                    title="Team A Score"
                                    name="teamAScore"
                                    type="text"
                                    textHandler={handleInputForm}
                                    value="0/0"
                                />
                                <InputBox
                                    title="Team B Score"
                                    name="teamBScore"
                                    type="text"
                                    textHandler={handleInputForm}
                                    value="0/0"
                                />
                                <InputBox
                                    title="Team A Overs"
                                    name="teamAOvers"
                                    type="number"
                                    textHandler={handleInputForm}
                                    value={0}
                                />
                                <InputBox
                                    title="Team B Overs"
                                    name="teamBOvers"
                                    type="number"
                                    textHandler={handleInputForm}
                                    value={0}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="oldMatchForm__btn">
                        <button className="oldMatchForm__btn--cancel" onClick={() => setModalOpen(false)}>
                            Cancel
                        </button>
                        <button className="oldMatchForm__btn--submit" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default OldMatchAdd;
