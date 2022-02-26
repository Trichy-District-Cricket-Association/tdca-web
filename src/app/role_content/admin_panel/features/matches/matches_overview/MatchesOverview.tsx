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
import { PageRoutes } from '../../../../../../enums/pageRoutes';
import { Link } from 'react-router-dom';

const divisionTypes = [1, 2, 3, 4, 5];
const matchTypes = ['League Tournament', 'School Tournament', 'Knockout Tournament'];
const schoolMatchTypes = ['Below 8th Std', 'Below 10th Std', 'Below 12th Std'];

const baseMatchQuery = firestore.collection(Collections.matches).orderBy('date', 'desc');

const MatchesOverview: React.FC<void> = (): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);

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
        if (selectedMatchType == 'Select Type') {
            window.location.reload();
        }
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
        { label: 'VENUE', key: 'venue.groundName' },
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
                    <Link to={PageRoutes.adminOldMatches} className="matchesOverview__oldMatches">
                        Old Matches
                    </Link>
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
                        {selectedMatchType == 'League Tournament' ? (
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
                        {selectedMatchType == 'School Tournament' ? (
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
                    <div className="matchesOverview__matchCard">
                        {docs
                            .map((doc) => Match.fromFirestore(doc))
                            ?.map((matchDoc) => (
                                <MatchCard matchDoc={matchDoc} key={matchDoc.matchId + 'card'} />
                            ))}
                    </div>
                    {docs.length !== 0 ? (
                        <div className="matchesOverview__pagination">
                            {isStart ? null : (
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
                    ) : null}

                    {isModalOpen ? <MatchAdd setModalOpen={setModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};

export default MatchesOverview;
