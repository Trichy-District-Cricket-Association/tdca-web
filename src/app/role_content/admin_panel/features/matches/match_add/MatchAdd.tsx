import { useState } from 'react';
import Modal from 'react-modal';
import { firestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import Match from '../../../../../../models/Match';
import InputBox from '../../../shared_components/input_box/InputBox';
import './MatchAdd.scss';



const MatchAdd = (props: any) => {
    const [match, setMatch] = useState<Match>(new Match({}));

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newMatch = new Match({ ...match });
        newMatch.handleMatch({ field: fieldName, value: e.target.value});
        setMatch(newMatch);
    };
    const submitForm = async (e: any) => {
        e.preventDefault();
        await firestore
            .collection(Collections.matches)
            .add(JSON.parse(JSON.stringify(match)))
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
            className="matchAdd"
            isOpen={props.isOpen}
            onRequestClose={() => props.setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            <form className="matchAddForm" onSubmit={submitForm}>
                <div className="matchAddForm__matchData">
                    <h1 className="matchAddForm__matchData--header">Match Details</h1>
                    <div className="matchAddForm__matchData--input">
                    <InputBox title="Match Id" name="matchId" type="text" textHandler={handleForm} />
                        <InputBox
                            title="Team A"
                            name="teamA_teamName"
                            type="text"
                            textHandler={handleForm}
                        />
                          <InputBox
                            title="Team A Id"
                            name="teamA_teamId"
                            type="text"
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Team B"
                            name="TeamB_teamName"
                            type="number"
                            textHandler={handleForm}
                            value={0}
                        />
                          <InputBox
                            title="Team B Id"
                            name="teamB_teamId"
                            type="text"
                            textHandler={handleForm}
                        />
                    </div>
                </div>
                <div className="matchAddForm__btn">
                    <button className="matchAddForm__btn--cancel" onClick={() => props.setModalOpen(false)}>
                        Cancel
                    </button>
                    <button className="matchAddForm__btn--submit" type="submit" prevent-default>
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default MatchAdd;
