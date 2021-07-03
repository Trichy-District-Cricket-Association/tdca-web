import { useState } from 'react';
import Modal from 'react-modal';
import { firestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import Team from '../../../../../../models/Team';
import InputBox from '../../../shared_components/input_box/InputBox';
import './TeamEdit.scss';

const TeamEdit = (props: any) => {
    const teamDoc = props.teamDoc;
    const [team, setTeam] = useState<Team>(
        new Team({
            teamId: teamDoc.teamId,
            teamName: teamDoc.teamName,
            emailId: teamDoc.emailId,
            division: teamDoc.division,
            numberOfMatches: teamDoc.numberOfMatches,
            won: teamDoc.won,
            lost: teamDoc.lost,
            draw: teamDoc.draw,
            tie: teamDoc.tie,
            noResult: teamDoc.noResult,
            totalPoints: teamDoc.totalPoints,
            walkover: teamDoc.walkover,
            conceed: teamDoc.conceed,
            refusal: teamDoc.refusal,
            penalty: teamDoc.penalty,
        }),
    );

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newTeam = new Team({ ...team });
        newTeam.handleTeam({ field: fieldName, value: e.target.value });
        setTeam(newTeam);
    };
    const submitForm = async (e: any) => {
        e.preventDefault();
        await firestore
            .collection(Collections.teams)
            .doc(teamDoc.docId)
            .set(JSON.parse(JSON.stringify(team)))
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
            className="teamEdit"
            isOpen={props.isOpen}
            onRequestClose={() => props.setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            <form className="teamEditForm" onSubmit={submitForm}>
                <div className="teamEditForm__general">
                    <h1 className="teamEditForm__general--header">General</h1>
                    <div className="teamEditForm__general--input">
                        <InputBox
                            title="Team Id"
                            name="teamId"
                            type="text"
                            value={teamDoc.teamId}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Team Name"
                            name="teamName"
                            type="text"
                            value={teamDoc.teamName}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Email Id"
                            name="emailId"
                            type="text"
                            value={teamDoc.emailId}
                            textHandler={handleForm}
                        />
                    </div>
                </div>
                <div className="teamEditForm__matchData">
                    <h1 className="teamEditForm__matchData--header">Match Details</h1>
                    <div className="teamEditForm__matchData--input">
                        <InputBox
                            title="Division"
                            name="division"
                            type="number"
                            value={teamDoc.division}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Matches Played"
                            name="numberOfMatches"
                            type="number"
                            value={teamDoc.numberOfMatches}
                            textHandler={handleForm}
                        />
                        <InputBox title="Won" name="won" type="number" value={teamDoc.won} textHandler={handleForm} />
                        <InputBox
                            title="Lost"
                            name="lost"
                            type="number"
                            value={teamDoc.lost}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Draw"
                            name="draw"
                            type="number"
                            value={teamDoc.draw}
                            textHandler={handleForm}
                        />
                        <InputBox title="Tie" name="tie" type="number" value={teamDoc.tie} textHandler={handleForm} />
                        <InputBox
                            title="No Result"
                            name="noResult"
                            type="number"
                            value={teamDoc.noResult}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Total Points"
                            name="totalPoints"
                            type="number"
                            textHandler={handleForm}
                            value={teamDoc.totalPoints}
                        />
                        <InputBox
                            title="Walkover"
                            name="walkover"
                            type="number"
                            value={teamDoc.walkover}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Conceed"
                            name="conceed"
                            type="number"
                            value={teamDoc.conceed}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Refusal"
                            name="refusal"
                            type="number"
                            value={teamDoc.refusal}
                            textHandler={handleForm}
                        />
                        <InputBox
                            title="Penalty"
                            name="penalty"
                            type="number"
                            value={teamDoc.penalty}
                            textHandler={handleForm}
                        />
                    </div>
                </div>
                <div className="teamEditForm__btn">
                    <button className="teamEditForm__btn--cancel" onClick={() => props.setModalOpen(false)}>
                        Cancel
                    </button>
                    <button className="teamEditForm__btn--submit" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default TeamEdit;
