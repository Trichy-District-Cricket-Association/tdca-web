import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { firestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import Match from '../../../../../../models/Match';
import InputBox from '../../../shared_components/input_box/InputBox';
import './MatchEdit.scss';
import Team from '../../../../../../models/Team';
import Scorer from '../../../../../../models/Scorer';
import Umpire from '../../../../../../models/Umpire';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import SelectInputBox from '../../../shared_components/select_input_box/SelectInputBox';
import Ground from '../../../../../../models/Ground';

type MatchEditProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    matchDoc: Match;
};

const MatchEdit: React.FC<MatchEditProps> = ({ setModalOpen, matchDoc }): JSX.Element => {
    const [match, setMatch] = useState<Match>(
        new Match({
            matchId: matchDoc.matchId,
            division: matchDoc.division,
            teamA: matchDoc.teamA,
            teamB: matchDoc.teamB,
            umpireA: matchDoc.umpireA,
            umpireB: matchDoc.umpireB,
            scorer: matchDoc.scorer,
            type: matchDoc.type,
            date: matchDoc.date,
            venue: matchDoc.venue,
        }),
    );
    const [selectable, setSelectable] = useState<
        { teams: Team[]; scorers: Scorer[]; umpires: Umpire[]; grounds: Ground[] } | undefined
    >();
    const fetchSelectable = async (): Promise<void> => {
        const newSelectable: { teams: Team[]; scorers: Scorer[]; umpires: Umpire[]; grounds: Ground[] } = {
            teams: [],
            scorers: [],
            umpires: [],
            grounds: [],
        };
        await firestore
            .collection(Collections.teams)
            .get()
            .then((snapshot) => {
                newSelectable.teams = snapshot.docs.map((doc) => Team.fromFirestore(doc));
            });
        await firestore
            .collection(Collections.scorers)
            .get()
            .then((snapshot) => {
                newSelectable.scorers = snapshot.docs.map((doc) => Scorer.fromFirestore(doc));
            });

        await firestore
            .collection(Collections.umpires)
            .get()
            .then((snapshot) => {
                newSelectable.umpires = snapshot.docs.map((doc) => Umpire.fromFirestore(doc));
            });

        await firestore
            .collection(Collections.grounds)
            .get()
            .then((snapshot) => {
                newSelectable.grounds = snapshot.docs.map((doc) => Ground.fromFirestore(doc));
            });

        setSelectable(newSelectable);
    };

    useEffect(() => {
        fetchSelectable();
    }, []);

    const handleInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newMatch = new Match({ ...match });
        newMatch.handleMatch({ field: fieldName, value: e.target.value });
        setMatch(newMatch);
    };
    const handleSelectForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newMatch = new Match({ ...match });
        newMatch.handleMatch({ field: fieldName, value: e.target.value });
        setMatch(newMatch);
    };
    const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await firestore
            .collection(Collections.matches)
            .doc(matchDoc.docId)
            .set(JSON.parse(JSON.stringify(match)))
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
            className="matchEdit"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            {selectable ? (
                <form className="matchEditForm" onSubmit={submitForm}>
                    <div className="matchEditForm__matchData">
                        <h1 className="matchEditForm__matchData--header">Match Details</h1>
                        <div className="matchEditForm__matchData--input">
                            <InputBox
                                title="Match Id"
                                name="matchId"
                                type="text"
                                value={matchDoc.matchId}
                                textHandler={handleInputForm}
                            />
                            <SelectInputBox
                                title="Match Type"
                                name="type"
                                options={['leagueMatch', 'schoolMatch', 'knockoutMatch']}
                                value={matchDoc.type}
                                textHandler={handleSelectForm}
                            />
                            <SelectInputBox
                                title="Division"
                                name="division"
                                options={[1, 2, 3, 4, 5]}
                                value={matchDoc.division}
                                textHandler={handleSelectForm}
                            />
                            <SelectInputBox
                                title="Team A"
                                name="teamA_teamName"
                                options={selectable.teams.map((team) => team.teamName)}
                                value={matchDoc.teamA?.teamName}
                                textHandler={handleSelectForm}
                            />
                            <SelectInputBox
                                title="Team B"
                                name="teamB_teamName"
                                options={selectable.teams.map((team) => team.teamName)}
                                value={matchDoc.teamB?.teamName}
                                textHandler={handleSelectForm}
                            />
                            <SelectInputBox
                                title="Umpire I"
                                name="umpireA_umpireName"
                                options={selectable.umpires.map((umpire) => umpire.umpireName)}
                                value={matchDoc.umpireA?.umpireName}
                                textHandler={handleSelectForm}
                            />
                            <SelectInputBox
                                title="umpire II"
                                name="umpireB_umpireName"
                                options={selectable.umpires.map((umpire) => umpire.umpireName)}
                                value={matchDoc.umpireB?.umpireName}
                                textHandler={handleSelectForm}
                            />
                            <SelectInputBox
                                title="Scorer"
                                name="scorer_scorerName"
                                value={matchDoc.scorer?.scorerName}
                                options={selectable.scorers.map((scorer) => scorer.scorerName)}
                                textHandler={handleSelectForm}
                            />
                            <SelectInputBox
                                title="Venue"
                                name="venue"
                                options={selectable.grounds.map((ground) => ground.groundName)}
                                value={matchDoc.venue}
                                textHandler={handleSelectForm}
                            />
                            <InputBox
                                title="Date of Match"
                                name="date"
                                type="datetime-local"
                                value={matchDoc.date?.toISOString().substr(0, 16)}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Status"
                                name="status"
                                type="text"
                                value={matchDoc.status}
                                textHandler={handleInputForm}
                            />
                        </div>
                        <div className="matchEditForm__feeStatus">
                            <h1 className="matchEditForm__feeStatus--header">Fee Status</h1>
                            <div className="matchEditForm__feeStatus--input">
                                <SelectInputBox
                                    title="Umpire I Fee Status"
                                    name="umpireA_umpireFeeStatus"
                                    options={['Not Paid', 'Paid']}
                                    value={matchDoc.umpireA?.umpireFeeStatus}
                                    textHandler={handleSelectForm}
                                />
                                <SelectInputBox
                                    title="Umpire II Fee Status"
                                    name="umpireFeeStatus"
                                    options={['Not Paid', 'Paid']}
                                    value={matchDoc.umpireB?.umpireFeeStatus}
                                    textHandler={handleSelectForm}
                                />
                                <SelectInputBox
                                    title="Scorer Fee Status"
                                    name="scorer_scorerFeeStatus"
                                    options={['Not Paid', 'Paid']}
                                    value={matchDoc.scorer?.scorerFeeStatus}
                                    textHandler={handleSelectForm}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="matchEditForm__btn">
                        <button className="matchEditForm__btn--cancel" onClick={() => setModalOpen(false)}>
                            Cancel
                        </button>
                        <button className="matchEditForm__btn--submit" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            ) : (
                <LoadingComp />
            )}
        </Modal>
    );
};

export default MatchEdit;
