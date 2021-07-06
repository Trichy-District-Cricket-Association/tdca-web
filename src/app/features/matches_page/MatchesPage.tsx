import { useState, useEffect } from 'react';
import { Collections } from '../../../enums/collection';
import { firestore } from '../../../firebase';
import Match from '../../../models/Match';
import './MatchesPage.scss';
import LoadingComp from '../../shared_components/loading_comp/LoadingComp';
import { usePagination } from 'use-pagination-firestore';
const cricketBall = `${process.env.PUBLIC_URL}/assets/images/cricketBall.png`;

const MatchesPage: React.FC<void> = (): JSX.Element => {
    const { docs, isLoading, isStart, isEnd, getPrev, getNext } = usePagination<Match>(
        firestore.collection(Collections.matches).orderBy('date', 'desc'),
        {
            limit: 5,
        },
    );
    const [matchDocs, setMatchDocs] = useState<Match[]>([]);

    const [selectedDivision, setSelectedDivision] = useState<number | undefined>();
    const [selectedMatchDivision, setSelectedMatchDivision] = useState<Match[]>([]);

    // const [selectedType, setSelectedType] = useState<string | undefined>();
    // const [selectedMatchType, setSelectedMatchType] = useState<Match[]>([]);

    useEffect(() => {
        const newMatches = docs.map((doc) => Match.fromFirestore(doc));
        setMatchDocs(newMatches);
    }, [docs]);

    const SelectedDivision = async (e: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
        setSelectedDivision(parseInt(e.target.value));
    };

    // const SelectedType = async (e: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    //     setSelectedType(e.target.value);
    //     console.log(e.target.value);
    // };
    useEffect(() => {
        if (selectedDivision) {
            const unsub = firestore
                .collection(Collections.matches)
                .where('division', '==', selectedDivision)
                .onSnapshot((snapshot) => {
                    if (snapshot?.docs?.length === 0) setSelectedMatchDivision([]);
                    if (snapshot?.docs?.length > 0) {
                        const matches = snapshot.docs.map((doc) => Match.fromFirestore(doc));
                        setSelectedMatchDivision(matches);
                    }
                });
            return () => {
                unsub();
            };
        }
    }, [selectedDivision]);
    // useEffect(() => {
    //     if (selectedType) {
    //         const unsub = firestore
    //             .collection(Collections.matches)
    //             .where('type', '==', selectedType)
    //             .where('division', '==', selectedDivision)
    //             .onSnapshot((snapshot) => {
    //                 if (snapshot?.docs?.length === 0) setSelectedMatchType([]);
    //                 if (snapshot?.docs?.length > 0) {
    //                     const matches = snapshot.docs.map((doc) => Match.fromFirestore(doc));
    //                     setSelectedMatchType(matches);
    //                 }
    //             });
    //         return () => {
    //             unsub();
    //         };
    //     }
    // }, [selectedType]);
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
                        <select className="matchesPage__matchDivisionSelect" onChange={SelectedDivision}>
                            <option>Select Division</option>
                            {[1, 2, 3, 4, 5].map((division) => (
                                <option key={division} value={division}>
                                    Division {division}
                                </option>
                            ))}
                        </select>
                        {/* <select className="matchesPage__matchTypeSelect" onChange={SelectedType}>
                            <option>Select Type</option>
                            {['leagueMatch', 'knockOutMatch', 'schoolMatch'].map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select> */}
                    </div>
                    <div className="matchesPage__matchCards">
                        {selectedMatchDivision?.map((matchDoc) => (
                            <div className="matchCard" key={matchDoc.matchId}>
                                <div className="matchCard__header">
                                    <p className="matchCard__header--title">{matchDoc.teamA?.teamName}</p>
                                    <img src={cricketBall} alt="vs" className="matchCard__header--img" />
                                    <p className="matchCard__header--title">{matchDoc.teamB?.teamName}</p>
                                </div>
                                <div className="matchCard__container">
                                    <div>
                                        <label className="matchCard__container--label">Match Id</label>
                                        <p className="matchCard__container--text">Match Id{matchDoc.matchId}</p>
                                        <label className="matchCard__container--label">Division</label>
                                        <p className="matchCard__container--text">Division {matchDoc.division}</p>
                                        <label className="matchCard__container--label">Match Type</label>
                                        <p className="matchCard__container--text">{matchDoc.type}</p>
                                        <label className="matchCard__container--label">Venue</label>
                                        <p className="matchCard__container--text">{matchDoc.venue}</p>
                                    </div>
                                    <div>
                                        <label className="matchCard__container--label">Time</label>
                                        <p className="matchCard__container--text">
                                            {matchDoc.date?.toISOString().substr(0, 16)}
                                        </p>
                                        <label className="matchCard__container--label">Status</label>
                                        <p className="matchCard__container--text">{matchDoc.status}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="matchesPage__matchPageSelect">
                        {isStart || matchDocs.length == 0 ? null : (
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
