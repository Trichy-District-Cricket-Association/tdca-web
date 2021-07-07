import { useState, useEffect } from 'react';
import { Collections } from '../../../enums/collection';
import firebase from 'firebase';
import { firestore } from '../../../firebase';
import Match from '../../../models/Match';
import './MatchesPage.scss';
import LoadingComp from '../../shared_components/loading_comp/LoadingComp';
import { usePagination } from 'use-pagination-firestore';
const cricketBall = `${process.env.PUBLIC_URL}/assets/images/cricketBall.png`;

const divisions = [1, 2, 3, 4, 5];
const matchTypes = ['leagueMatch', 'schoolMatch', 'knockoutMatch'];
const baseMatchQuery = firestore.collection(Collections.matches).orderBy('date', 'desc');

const MatchesPage: React.FC<void> = (): JSX.Element => {
    const [query, setQuery] = useState<firebase.firestore.Query<firebase.firestore.DocumentData>>(baseMatchQuery);
    const { docs, isLoading, isStart, isEnd, getPrev, getNext } = usePagination<Match>(query, {
        limit: 10,
    });

    const [selectedDivision, setSelectedDivision] = useState<number | undefined>();
    const [selectedMatchType, setSelectedMatchType] = useState<string | undefined>();

    const switchDivision = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDivision(parseInt(e.target.value));
        setSelectedMatchType(undefined);
    };
    const switchMatchType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMatchType(e.target.value);
    };

    //  Callback to change the query based on the selected type.
    useEffect(() => {
        if (selectedDivision) {
            let newQuery = baseMatchQuery.where('division', '==', selectedDivision);
            if (selectedMatchType) {
                newQuery = newQuery.where('type', '==', selectedMatchType);
            }
            setQuery(newQuery);
        }
    }, [selectedDivision, selectedMatchType]);
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
                    <div>
                        <select
                            className="matchesPage__matchDivisionSelect"
                            value={selectedDivision}
                            onChange={switchDivision}
                        >
                            <option>Select Division</option>
                            {divisions.map((division) => (
                                <option key={division} value={division}>
                                    Division {division}
                                </option>
                            ))}
                        </select>
                        {selectedDivision ? (
                            <select
                                className="matchesPage__matchDivisionSelect"
                                value={selectedMatchType}
                                onChange={switchMatchType}
                            >
                                <option>Select Type</option>
                                {matchTypes.map((matchType) => (
                                    <option key={matchType} value={matchType}>
                                        {matchType}
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
                                        <div>
                                            <label className="matchCard__container--label">Division</label>
                                            <p className="matchCard__container--text">Division {matchDoc.division}</p>
                                            <label className="matchCard__container--label">Match Type</label>
                                            <p className="matchCard__container--text">{matchDoc.type}</p>
                                        </div>
                                        <div>
                                            <label className="matchCard__container--label">Time</label>
                                            <p className="matchCard__container--text">
                                                {matchDoc.date?.toISOString().substr(0, 16)}
                                            </p>
                                            <label className="matchCard__container--label">Venue</label>
                                            <p className="matchCard__container--text">{matchDoc.venue}</p>
                                        </div>
                                    </div>
                                    <p className="matchCard__container--status">{matchDoc.status}</p>
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
