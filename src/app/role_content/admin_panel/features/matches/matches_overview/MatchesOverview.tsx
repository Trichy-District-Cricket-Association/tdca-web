import { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Collections } from '../../../../../../enums/collection';
import firebase from 'firebase';
import { firestore } from '../../../../../../firebase';
import Match from '../../../../../../models/Match';
import './MatchesOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import MatchAdd from '../match_add/MatchAdd';
import MatchCard from '../match_card/MatchCard';
import { usePagination } from 'use-pagination-firestore';

const divisions = [1, 2, 3, 4, 5];
const matchTypes = ['leagueMatch', 'schoolMatch', 'knockoutMatch'];
const baseMatchQuery = firestore.collection(Collections.matches).orderBy('date', 'desc');

const MatchesOverview: React.FC<void> = (): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);

    const [query, setQuery] = useState<firebase.firestore.Query<firebase.firestore.DocumentData>>(baseMatchQuery);
    const { docs, isLoading, isStart, isEnd, getPrev, getNext } = usePagination<Match>(query, {
        limit: 10,
    });

    const [selectedDivision, setSelectedDivision] = useState<number | undefined>();
    const [selectedMatchType, setSelectedMatchType] = useState<string | undefined>();

    const switchDivision = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDivision(parseInt(e.target.value));
    };
    const switchMatchType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMatchType(e.target.value);
        setSelectedDivision(undefined);
    };
    //  Callback to change the query based on the selected type.
    useEffect(() => {
        if (selectedMatchType) {
            let newQuery = baseMatchQuery.where('type', '==', selectedMatchType);
            if (selectedDivision) {
                newQuery = newQuery.where('division', '==', selectedDivision);
            }
            setQuery(newQuery);
        }
    }, [selectedMatchType, selectedDivision]);

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
                <div className="matchesOverview">
                    <button className="matchesOverview__matchAddBtn" onClick={() => setModalOpen(true)}>
                        + Add Match
                    </button>
                    <CSVLink
                        className="matchesOverview__dataDownload"
                        data={JSON.parse(JSON.stringify(docs.map((doc) => Match.fromFirestore(doc))))}
                        headers={JSON.parse(JSON.stringify(headers))}
                    >
                        Download Data
                    </CSVLink>
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
                        {selectedMatchType == 'leagueMatch' ? (
                            <select
                                className="matchesOverview__matchDivisionSelect--btn"
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
                        ) : null}
                    </div>
                    <div className="matchesOverview__matchCard">
                        {docs
                            .map((doc) => Match.fromFirestore(doc))
                            ?.map((matchDoc) => (
                                <MatchCard matchDoc={matchDoc} key={matchDoc.matchId + 'card'} />
                            ))}
                    </div>
                    <div className="matchesOverview__pagination">
                        {isStart || docs.length < 10 ? null : (
                            <button className="matchesOverview__pagination--btn" onClick={() => getPrev()}>
                                Previous
                            </button>
                        )}
                        {isEnd ? null : (
                            <button className="matchesOverview__pagination--btn" onClick={() => getNext()}>
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
