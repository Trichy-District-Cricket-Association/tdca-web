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
import { MdDelete } from 'react-icons/md';

type MatchEditProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    matchDoc: Match;
};

const MatchEdit: React.FC<MatchEditProps> = ({ setModalOpen, matchDoc }): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [match, setMatch] = useState<Match>(
        new Match({
            matchId: matchDoc.matchId,
            division: matchDoc.division,
            schoolMatchType: matchDoc.schoolMatchType,
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

    function IdAvatarSetter(newMatch: any, fieldName: string, value: string) {
        switch (fieldName) {
            case 'teamA_teamName':
                selectable?.teams.map((team) => {
                    if (team.teamName == value) {
                        newMatch.handleMatch({ field: 'teamA_teamId', value: `${team.teamId}` });
                        newMatch.handleMatch({ field: 'teamA_teamColor', value: `${team.teamColor}` });
                        match.setTeam1Logo = `${team.avatarUrl}`;
                    }
                });
                break;
            case 'teamB_teamName':
                selectable?.teams.map((team) => {
                    if (team.teamName == value) {
                        newMatch.handleMatch({ field: 'teamB_teamId', value: `${team.teamId}` });
                        newMatch.handleMatch({ field: 'teamB_teamColor', value: `${team.teamColor}` });
                        match.setTeam2Logo = `${team.avatarUrl}`;
                    }
                });
                break;
            case 'umpireA_umpireName':
                selectable?.umpires.map((umpire) => {
                    if (umpire.umpireName == value) {
                        newMatch.handleMatch({ field: 'umpire_umpireId', value: `${umpire.umpireId}` });
                        match.setUmpire1Avatar = `${umpire.avatarUrl}`;
                    }
                });
                break;
            case 'umpireB_umpireName':
                selectable?.umpires.map((umpire) => {
                    if (umpire.umpireName == value) {
                        newMatch.handleMatch({ field: 'umpireB_umpireId', value: `${umpire.umpireId}` });
                        match.setUmpire2Avatar = `${umpire.avatarUrl}`;
                    }
                });
                break;
            case 'scorer_scorerName':
                selectable?.scorers.map((scorer) => {
                    if (scorer.scorerName == value) {
                        newMatch.handleMatch({ field: 'scorer_scorerId', value: `${scorer.scorerId}` });
                        match.setScorerAvatar = `${scorer.avatarUrl}`;
                    }
                });
                break;
            case 'venue_groundName':
                selectable?.grounds.map((ground) => {
                    if (ground.groundName == value) {
                        newMatch.handleMatch({ field: 'ground_groundId', value: `${ground.groundId}` });
                        match.setGroundAvatar = `${ground.avatarUrl}`;
                    }
                });
                break;
        }
    }

    const handleInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newMatch = new Match({ ...match });
        newMatch.handleMatch({ field: fieldName, value: e.target.value });
        setMatch(newMatch);
    };
    const handleSelectForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newMatch = new Match({ ...match });
        IdAvatarSetter(newMatch, fieldName, e.target.value);
        newMatch.handleMatch({ field: fieldName, value: e.target.value });
        setMatch(newMatch);
    };
    const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true);
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
    const deleteForm: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        const answer = window.confirm('Are you sure you want to delete?');
        if (answer) {
            setIsLoading(true);
            await firestore
                .collection(Collections.matches)
                .doc(matchDoc.docId)
                .delete()
                .then(() => setModalOpen(false));
        }
    };
    return (
        <Modal
            className="matchEdit"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
            key={matchDoc.docId + 'editCard'}
        >
            {isLoading ? (
                <LoadingComp />
            ) : selectable ? (
                <form className="matchEditForm" onSubmit={submitForm}>
                    <div className="matchEditForm__matchData">
                        <div className="matchEditForm__matchData__header">
                            <h1 className="matchEditForm__matchData__header--text">Match Details</h1>
                            <button className="matchEditForm__matchData__header--iconBtn" onClick={deleteForm}>
                                <i>
                                    <MdDelete />
                                </i>
                            </button>
                        </div>
                        <div className="matchEditForm__matchData--input">
                            <InputBox
                                title="Match Id"
                                name="matchId"
                                type="text"
                                value={match.matchId}
                                textHandler={handleInputForm}
                            />
                            <SelectInputBox
                                title="Match Type"
                                name="type"
                                options={['League Tournament', 'School Tournament', 'Knockout Tournament']}
                                value={match.type}
                                textHandler={handleSelectForm}
                            />
                            {match.type == 'League Tournament' ? (
                                <SelectInputBox
                                    title="Division"
                                    name="division"
                                    options={[1, 2, 3, 4, 5]}
                                    textHandler={handleSelectForm}
                                    value={match.division}
                                />
                            ) : null}
                            {match.type == 'School Tournament' ? (
                                <SelectInputBox
                                    title="School Match Type"
                                    name="schoolMatchType"
                                    options={['Below 8th Std', 'Below 10th Std', 'Below 12th Std']}
                                    value={match.schoolMatchType}
                                    textHandler={handleSelectForm}
                                />
                            ) : null}
                            <SelectInputBox
                                title="Team A"
                                name="teamA_teamName"
                                options={selectable.teams.map((team) => team.teamName)}
                                value={match.teamA?.teamName}
                                textHandler={handleSelectForm}
                            />
                            <SelectInputBox
                                title="Team B"
                                name="teamB_teamName"
                                options={selectable.teams.map((team) => team.teamName)}
                                value={match.teamB?.teamName}
                                textHandler={handleSelectForm}
                            />
                            <SelectInputBox
                                title="Umpire I"
                                name="umpireA_umpireName"
                                options={selectable.umpires.map((umpire) => umpire.umpireName)}
                                value={match.umpireA?.umpireName}
                                textHandler={handleSelectForm}
                            />
                            <SelectInputBox
                                title="umpire II"
                                name="umpireB_umpireName"
                                options={selectable.umpires.map((umpire) => umpire.umpireName)}
                                value={match.umpireB?.umpireName}
                                textHandler={handleSelectForm}
                            />
                            <SelectInputBox
                                title="Scorer"
                                name="scorer_scorerName"
                                value={match.scorer?.scorerName}
                                options={selectable.scorers.map((scorer) => scorer.scorerName)}
                                textHandler={handleSelectForm}
                            />
                            <SelectInputBox
                                title="Venue"
                                name="venue"
                                options={selectable.grounds.map((ground) => ground.groundName)}
                                value={match.venue}
                                textHandler={handleSelectForm}
                            />
                            <InputBox
                                title="Date of Match"
                                name="date"
                                type="datetime-local"
                                value={match.date?.toISOString().substr(0, 16)}
                                textHandler={handleInputForm}
                            />
                            <InputBox
                                title="Status"
                                name="status"
                                type="text"
                                value={match.status}
                                textHandler={handleInputForm}
                            />
                        </div>
                        <div className="matchEditForm__feeStatus">
                            <div className="matchEditForm__feeStatus__header">
                                <h1 className="matchEditForm__feeStatus__header--text">Fee Status</h1>
                            </div>

                            <div className="matchEditForm__feeStatus--input">
                                <SelectInputBox
                                    title="Umpire I Fee Status"
                                    name="umpireA_umpireFeeStatus"
                                    options={['Not Paid', 'Paid']}
                                    value={match.umpireA?.umpireFeeStatus}
                                    textHandler={handleSelectForm}
                                />
                                <SelectInputBox
                                    title="Umpire II Fee Status"
                                    name="umpireB_umpireFeeStatus"
                                    options={['Not Paid', 'Paid']}
                                    value={match.umpireB?.umpireFeeStatus}
                                    textHandler={handleSelectForm}
                                />
                                <SelectInputBox
                                    title="Scorer Fee Status"
                                    name="scorer_scorerFeeStatus"
                                    options={['Not Paid', 'Paid']}
                                    value={match.scorer?.scorerFeeStatus}
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
