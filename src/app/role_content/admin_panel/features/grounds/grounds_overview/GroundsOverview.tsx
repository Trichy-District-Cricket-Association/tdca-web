import { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Collections } from '../../../../../../enums/collection';
import { firestore } from '../../../../../../firebase';
import Ground from '../../../../../../models/Ground';
import './GroundsOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import GroundAdd from '../ground_add/GroundAdd';
import GroundCard from '../ground_card/GroundCard';

const GroundsOverview: React.FC<void> = (): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [groundDocs, setGroundDocs] = useState<Ground[] | undefined>();

    useEffect(() => {
        const unsub = firestore.collection(Collections.grounds).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setGroundDocs([]);
            if (snapshot.docs?.length > 0) {
                const grounds = snapshot.docs.map((doc) => Ground.fromFirestore(doc));
                setGroundDocs(grounds);
            }
        });
        return () => unsub();
    }, []);
    const headers = [
        { label: 'GROUND ID', key: 'groundId' },
        { label: 'GROUND NAME', key: 'groundName' },
        { label: 'PANEL', key: 'panel' },
        { label: 'DIVISION 1', key: 'divisionMatches.one' },
        { label: 'DIVISION 2', key: 'divisionMatches.two' },
        { label: 'DIVISION 3', key: 'divisionMatches.three' },
        { label: 'DIVISION 4', key: 'divisionMatches.four' },
        { label: 'DIVISION 5', key: 'divisionMatches.five' },
        { label: 'KNOCKOUT', key: 'typeMatches.knockoutMatch' },
        { label: 'LEAGUE', key: 'typeMatches.leagueMatch' },
        { label: 'SCHOOL', key: 'typeMatches.schoolMatch' },
    ];
    return (
        <div>
            {groundDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div className="groundsOverview">
                    <button className="groundsOverview__groundAddBtn" onClick={() => setModalOpen(true)}>
                        + Add Ground
                    </button>
                    <CSVLink
                        className="groundsOverview__dataDownload"
                        data={JSON.parse(JSON.stringify(groundDocs))}
                        headers={JSON.parse(JSON.stringify(headers))}
                    >
                        Download Data
                    </CSVLink>
                    <div className="groundsOverview__groundCard">
                        {groundDocs?.map((groundDoc) => (
                            <GroundCard groundDoc={groundDoc} key={groundDoc.docId ?? ''} />
                        ))}
                    </div>
                    {isModalOpen ? <GroundAdd setModalOpen={setModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};

export default GroundsOverview;
