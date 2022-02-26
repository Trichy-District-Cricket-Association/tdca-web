import { useState, useEffect } from 'react';
import { Collections } from '../../../../../../../enums/collection';
import firebase from 'firebase';
import { firestore } from '../../../../../../../firebase';
import OldMatch from '../../../../../../../models/OldMatch';
import './OldMatchesOverview.scss';
import LoadingComp from '../../../../../../shared_components/loading_comp/LoadingComp';
import OldMatchAdd from '../old_match_add/OldMatchAdd';
import OldMatchCard from '../old_match_card/OldMatchCard';
import { usePagination } from 'use-pagination-firestore';

const divisionTypes = [1, 2, 3, 4, 5];
const matchTypes = ['League Tournament', 'School Tournament', 'Knockout Tournament'];
const schoolMatchTypes = ['Below 8th Std', 'Below 10th Std', 'Below 12th Std'];

const baseMatchQuery = firestore.collection(Collections.oldMatches).orderBy('date', 'desc');

const OldMatchesOverview: React.FC<void> = (): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);

    const [query, setQuery] = useState<firebase.firestore.Query<firebase.firestore.DocumentData>>(baseMatchQuery);
    const { docs, isLoading, isStart, isEnd, getPrev, getNext } = usePagination<OldMatch>(query, {
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

    return (
        <div>
            {isLoading ? (
                <LoadingComp />
            ) : (
                <div className="oldMatchesOverview">
                    <button className="oldMatchesOverview__matchAddBtn" onClick={() => setModalOpen(true)}>
                        + Add Match
                    </button>
                    <div className="oldMatchesOverview__matchSelect">
                        <select
                            className="oldMatchesOverview__matchTypeSelect--btn"
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
                        {selectedMatchType == 'League Tournament' ? (
                            <select
                                className="oldMatchesOverview__matchDivisionSelect--btn"
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
                                className="oldMatchesOverview__matchSchoolSelect--btn"
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
                    <div className="oldMatchesOverview__matchCard">
                        {docs
                            .map((doc) => OldMatch.fromFirestore(doc))
                            ?.map((oldMatchDoc) => (
                                <OldMatchCard oldMatchDoc={oldMatchDoc} key={oldMatchDoc.oldMatchId} />
                            ))}
                    </div>
                    {docs.length !== 0 ? (
                        <div className="oldMatchesOverview__pagination">
                            {isStart ? null : (
                                <button className="oldMatchesOverview__pagination--btn" onClick={() => getPrev()}>
                                    Previous
                                </button>
                            )}
                            {isEnd ? null : (
                                <button className="oldMatchesOverview__pagination--btn" onClick={() => getNext()}>
                                    Next
                                </button>
                            )}
                        </div>
                    ) : null}

                    {isModalOpen ? <OldMatchAdd setModalOpen={setModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};

export default OldMatchesOverview;
