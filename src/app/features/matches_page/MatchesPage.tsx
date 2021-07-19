import { useState, useEffect } from 'react';
import { Collections } from '../../../enums/collection';
import firebase from 'firebase';
import { firestore } from '../../../firebase';
import Match from '../../../models/Match';
import './MatchesPage.scss';
import LoadingComp from '../../shared_components/loading_comp/LoadingComp';
import { usePagination } from 'use-pagination-firestore';
const cricketBall = `${process.env.PUBLIC_URL}/assets/images/cricketBall.png`;

const divisionTypes = [1, 2, 3, 4, 5];
const matchTypes = ['League Match', 'School Match', 'Knockout Match'];
const schoolMatchTypes = ['Below 8th Std', 'Below 10th Std', 'Below 12th Std'];

const baseMatchQuery = firestore.collection(Collections.matches).orderBy('date', 'desc');

const MatchesPage: React.FC<void> = (): JSX.Element => {
    const [query, setQuery] = useState<firebase.firestore.Query<firebase.firestore.DocumentData>>(baseMatchQuery);
    const { docs, isLoading, isStart, isEnd, getPrev, getNext } = usePagination<Match>(query, {
        limit: 10,
    });

    const [selectedMatchType, setSelectedMatchType] = useState<string | undefined>();
    const [selectedDivisionType, setSelectedDivisionType] = useState<number | undefined>();
    const [selectedSchoolMatchType, setSelectedSchoolMatchType] = useState<string | undefined>();

    const switchDivisionType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDivisionType(parseInt(e.target.value));
    };
    const switchMatchType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMatchType(e.target.value);
        setSelectedDivisionType(undefined);
        setSelectedSchoolMatchType(undefined);
    };
    const switchSchoolMatchType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSchoolMatchType(e.target.value);
    };
    //  Callback to change the query based on the selected type.
    useEffect(() => {
        if (selectedMatchType) {
            let newQuery = baseMatchQuery.where('type', '==', selectedMatchType);
            if (selectedDivisionType) {
                newQuery = newQuery.where('division', '==', selectedDivisionType);
            }
            if (selectedSchoolMatchType) {
                newQuery = newQuery.where('schoolMatchType', '==', selectedSchoolMatchType);
            }
            setQuery(newQuery);
        }
    }, [selectedMatchType, selectedDivisionType, selectedSchoolMatchType]);

    return (
        <div>
            {isLoading ? (
                <LoadingComp />
            ) : (
                <div className="matchesPage">
                    <div className="matchesPage__header">
                        <div className="matchesPage__header__header1">
                            <h1 className="matchesPage__header__header1--text">Match Details</h1>
                        </div>
                        <div className="matchesPage__header__header2"></div>
                    </div>
                    <div className="matchesOverview__matchSelect">
                        <select
                            className="matchesOverview__matchTypeSelect--btn"
                            value={selectedMatchType}
                            onChange={switchMatchType}
                        >
                            <option selected>Select Type</option>
                            {matchTypes.map((matchType) => (
                                <option key={matchType} value={matchType}>
                                    {matchType}
                                </option>
                            ))}
                        </select>
                        {selectedMatchType == 'League Match' ? (
                            <select
                                className="matchesOverview__matchDivisionSelect--btn"
                                value={selectedDivisionType}
                                onChange={switchDivisionType}
                            >
                                <option>Select Division</option>
                                {divisionTypes.map((division) => (
                                    <option key={division} value={division}>
                                        Division {division}
                                    </option>
                                ))}
                            </select>
                        ) : null}
                        {selectedMatchType == 'School Match' ? (
                            <select
                                className="matchesOverview__matchSchoolSelect--btn"
                                value={selectedSchoolMatchType}
                                onChange={switchSchoolMatchType}
                            >
                                <option>Select Type</option>
                                {schoolMatchTypes.map((schoolMatchType) => (
                                    <option key={schoolMatchType} value={schoolMatchType}>
                                        {schoolMatchType}
                                    </option>
                                ))}
                            </select>
                        ) : null}
                    </div>
                    <div className="matchesPage__matchCards">
                        {docs
                            .map((doc) => Match.fromFirestore(doc))
                            ?.map((matchDoc) => (
                                <div className="matchCard" key={matchDoc.docId + 'card'}>
                                    <div className="matchCard__header">
                                        <p className="matchCard__header--title">{matchDoc.teamA?.teamName}</p>
                                        <img src={cricketBall} alt="vs" className="matchCard__header--img" />
                                        <p className="matchCard__header--title">{matchDoc.teamB?.teamName}</p>
                                    </div>
                                    <div className="matchCard__container">
                                        <div className="matchCard__container__cloumn1">
                                            <label className="matchCard__container--label">Division</label>
                                            <p className="matchCard__container--text">Division {matchDoc.division}</p>
                                            <label className="matchCard__container--label">Match Type</label>
                                            <p className="matchCard__container--text">{matchDoc.type}</p>
                                            <label className="matchCard__container--label">Date</label>
                                            <p className="matchCard__container--text">
                                                {matchDoc.date?.toISOString().substr(0, 10)}
                                            </p>
                                        </div>
                                        <div className="matchCard__container__column2">
                                            <label className="matchCard__container--label">Venue</label>
                                            <p className="matchCard__container--text">{matchDoc.venue}</p>

                                            <label className="matchCard__container--label">Time</label>
                                            <p className="matchCard__container--text">
                                                {matchDoc.date?.toISOString().substr(11, 8)}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="matchCard__container--status">{matchDoc.status}</p>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="matchesPage__matchPageSelect">
                        {isStart || docs.length < 10 ? null : (
                            <button className="matchesPage__matchPageSelect--btn" onClick={() => getPrev()}>
                                Previous
                            </button>
                        )}
                        {isEnd ? null : (
                            <button className="matchesPage__matchPageSelect--btn" onClick={() => getNext()}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MatchesPage;
