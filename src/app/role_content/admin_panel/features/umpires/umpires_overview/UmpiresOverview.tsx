import { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Collections } from '../../../../../../enums/collection';
import { firestore } from '../../../../../../firebase';
import Umpire from '../../../../../../models/Umpire';
import './UmpiresOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import { PageRoutes } from '../../../../../../enums/pageRoutes';
import { Link } from 'react-router-dom';
import UmpireAdd from '../umpire_add/UmpireAdd';
import UmpireCard from '../umpire_card/UmpireCard';

const UmpiresOverview: React.FC<void> = (): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [umpireDocs, setUmpireDocs] = useState<Umpire[] | undefined>();

    useEffect(() => {
        const unsub = firestore.collection(Collections.umpires).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setUmpireDocs([]);
            if (snapshot.docs?.length > 0) {
                const umpires = snapshot.docs.map((doc) => Umpire.fromFirestore(doc));
                setUmpireDocs(umpires);
            }
        });
        return () => unsub();
    }, []);
    const headers = [
        { label: 'UMPIRE ID', key: 'umpireId' },
        { label: 'UMPIRE NAME', key: 'umpireName' },
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
            {umpireDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div className="umpiresOverview">
                    <button className="umpiresOverview__umpireAddBtn" onClick={() => setModalOpen(true)}>
                        + Add Umpire
                    </button>
                    <CSVLink
                        className="umpiresOverview__dataDownload"
                        data={JSON.parse(JSON.stringify(umpireDocs))}
                        headers={JSON.parse(JSON.stringify(headers))}
                    >
                        Download Data
                    </CSVLink>
                    <div className="umpiresOverview__umpireCard">
                        {umpireDocs?.map((umpireDoc) => (
                            <UmpireCard umpireDoc={umpireDoc} key={umpireDoc.docId ?? ''} />
                        ))}
                    </div>
                    {isModalOpen ? <UmpireAdd setModalOpen={setModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};

export default UmpiresOverview;
