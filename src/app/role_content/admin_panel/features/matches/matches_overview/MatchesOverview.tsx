import { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Collections } from '../../../../../../enums/collection';
import { firestore } from '../../../../../../firebase';
import Match from '../../../../../../models/Match';
import './MatchesOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import { PageRoutes } from '../../../../../../enums/pageRoutes';
import { Link } from 'react-router-dom';
import MatchAdd from '../match_add/MatchAdd';
import MatchCard from '../match_card/MatchCard';
import { usePagination } from 'use-pagination-firestore';

const MatchesOverview: React.FC<void> = (): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { docs, isLoading, isStart, isEnd, getPrev, getNext } = usePagination<Match>(
        firestore.collection(Collections.matches).orderBy('date', 'desc'),
        {
            limit: 10,
        },
    );
    const [matchDocs, setMatchDocs] = useState<Match[]>([]);
    const [selectedDivision, setSelectedDivision] = useState<number | undefined>();
    const [selectedMatchDivision, setSelectedMatchDivision] = useState<Match[]>([]);

    useEffect(() => {
        const newMatches = docs.map((doc) => Match.fromFirestore(doc));
        setMatchDocs(newMatches);
    }, [docs]);

    const SelectedDivision = async (e: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
        setSelectedDivision(parseInt(e.target.value));
    };

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

    const headers = [
        { label: 'MATCH ID', key: 'matchId' },
        { label: 'DIVISION', key: 'division' },
        { label: 'MATCH TYPE', key: 'type' },
        { label: 'TEAM A NAME', key: 'teamA.teamName' },
        { label: 'TEAM A ID', key: 'teamA.teamId' },
        { label: 'TEAM B NAME', key: 'teamB.teamName' },
        { label: 'TEAM B ID', key: 'teamB.teamId' },
        { label: 'UMPIRE A NAME', key: 'umpireA.umpireName' },
        { label: 'UMPIRE A ID', key: 'umpireA.umpireId' },
        { label: 'UMPIRE A FEE STATUS', key: 'umpireA.umpireFeeStatus' },
        { label: 'UMPIRE B NAME', key: 'umpireB.umpireName' },
        { label: 'UMPIRE B ID', key: 'umpireB.umpireId' },
        { label: 'UMPIRE B FEE STATUS', key: 'umpireB.umpireFeeStatus' },
        { label: 'SCORER NAME', key: 'scorer.scorerName' },
        { label: 'SCORER ID', key: 'scorer.scorerId' },
        { label: 'SCORER FEE STATUS', key: 'scorer.scorerFeeStatus' },
        { label: 'DATE AND TIME OF MATCH', key: 'date' },
        { label: 'VENUE', key: 'venue' },
        { label: 'STATUS', key: 'status' },
    ];

    return (
        <div>
            {isLoading ? (
                <LoadingComp />
            ) : (
                <div className="matchOverview">
                    <Link to={PageRoutes.adminMatches} onClick={() => setModalOpen(true)}>
                        <button className="matchOverview__matchAddBtn">+ Add Match</button>
                    </Link>
                    <CSVLink data={JSON.parse(JSON.stringify(matchDocs))} headers={JSON.parse(JSON.stringify(headers))}>
                        Download Data
                    </CSVLink>
                    <div>
                        <select className="matchesPage__matchDivisionSelect" onChange={SelectedDivision}>
                            <option>Select Division</option>
                            {[1, 2, 3, 4, 5].map((division) => (
                                <option key={division} value={division}>
                                    Division {division}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="matchOverview__matchCard">
                        {selectedMatchDivision?.map((matchDoc) => (
                            <MatchCard matchDoc={matchDoc} key={matchDoc.docId ?? ''} />
                        ))}
                    </div>
                    <div className="matchOverview__matchPageSelect">
                        {isStart || matchDocs.length < 10 ? null : (
                            <button className="matchOverview__matchPageSelect--btn" onClick={() => getPrev()}>
                                Previous
                            </button>
                        )}
                        {isEnd ? null : (
                            <button className="matchOverview__matchPageSelect--btn" onClick={() => getNext()}>
                                Next
                            </button>
                        )}
                    </div>
                    {isModalOpen ? <MatchAdd setModalOpen={setModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};

export default MatchesOverview;
