import { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Collections } from '../../../../../../enums/collection';
import { firestore } from '../../../../../../firebase';
import Scorer from '../../../../../../models/Scorer';
import './ScorersOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import { PageRoutes } from '../../../../../../enums/pageRoutes';
import { Link } from 'react-router-dom';
import ScorerAdd from '../scorer_add/ScorerAdd';
import ScorerCard from '../scorer_card/ScorerCard';

const ScorersOverview: React.FC<void> = (): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [scorerDocs, setScorerDocs] = useState<Scorer[] | undefined>();

    useEffect(() => {
        const unsub = firestore.collection(Collections.scorers).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setScorerDocs([]);
            if (snapshot.docs?.length > 0) {
                const scorers = snapshot.docs.map((doc) => Scorer.fromFirestore(doc));
                setScorerDocs(scorers);
            }
        });
        return () => unsub();
    }, []);
    const headers = [
        { label: 'SCORER ID', key: 'scorerId' },
        { label: 'SCORER NAME', key: 'scorerName' },
        { label: 'PANEL', key: 'panel' },
        { label: 'DIVISION 1', key: 'divisionMatches.one' },
        { label: 'DIVISION 2', key: 'divisionMatches.two' },
        { label: 'DIVISION 3', key: 'divisionMatches.three' },
        { label: 'DIVISION 4', key: 'divisionMatches.four' },
        { label: 'DIVISION 5', key: 'divisionMatches.five' },
        { label: 'INTER DISTRICTS', key: 'typeMatches.interDistrictMatch' },
        { label: 'KNOCKOUT', key: 'typeMatches.knockoutMatch' },
        { label: 'LEAGUE', key: 'typeMatches.leagueMatch' },
        { label: 'SCHOOL', key: 'typeMatches.schoolMatch' },
        { label: 'TNCA', key: 'typeMatches.tncaMatch' },
        { label: 'PRIVATE', key: 'typeMatches.privateMatch' },
        { label: 'COMBINED DICTRICTS', key: 'typeMatches.combinedDistrictMatch' },
        { label: 'INSTITUTION', key: 'typeMatches.institutionMatch' },
        { label: 'EMAIL', key: 'emailId' },
        { label: 'DATE OF BIRTH', key: 'dateOfBirth' },
        { label: 'PRIMARY CONTACT', key: 'primaryContact' },
        { label: 'SECONDARY CONTACT', key: 'secondaryContact' },
        { label: 'ADDRESS', key: 'address' },
        { label: 'AADHAR NUMBER', key: 'aadharNumber' },
        { label: 'GPAY / PHONEPAY NUMBER', key: 'payPhoneNumber' },
        { label: 'BANK ACCOUNT NUMBER', key: 'bankAccountNumber' },
        { label: 'BANK NAME', key: 'bankName' },
        { label: 'BANK BRANCH', key: 'bankBranch' },
        { label: 'BANK IFSC', key: 'bankIFSC' },
    ];
    return (
        <div>
            {scorerDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div className="scorersOverview">
                    <button className="scorersOverview__scorerAddBtn" onClick={() => setModalOpen(true)}>
                        + Add Scorer
                    </button>

                    <CSVLink
                        className="scorersOverview__dataDownload"
                        data={JSON.parse(JSON.stringify(scorerDocs))}
                        headers={JSON.parse(JSON.stringify(headers))}
                    >
                        Download Data
                    </CSVLink>
                    <div className="scorersOverview__scorerCard">
                        {scorerDocs?.map((scorerDoc) => (
                            <ScorerCard scorerDoc={scorerDoc} key={scorerDoc.scorerId ?? ''} />
                        ))}
                    </div>
                    {isModalOpen ? <ScorerAdd setModalOpen={setModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};

export default ScorersOverview;
