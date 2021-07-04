import { useState, useEffect } from 'react';
import { Collections } from '../../../../../../enums/collection';
import { firestore } from '../../../../../../firebase';
import GroundsMan from '../../../../../../models/GroundsMan';
import './GroundsMenOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import { PageRoutes } from '../../../../../../enums/pageRoutes';
import { Link } from 'react-router-dom';
import GroundsManAdd from '../groundsMan_add/GroundsManAdd';
import GroundsManCard from '../groundsMan_card/GroundsManCard';

const GroundsMenOverview: React.FC<void> = (): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [groundsManDocs, setGroundsManDocs] = useState<GroundsMan[] | undefined>();

    useEffect(() => {
        const unsub = firestore.collection(Collections.groundsMen).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setGroundsManDocs([]);
            if (snapshot.docs?.length > 0) {
                const groundsMen = snapshot.docs.map((doc) => GroundsMan.fromFirestore(doc));
                setGroundsManDocs(groundsMen);
            }
        });
        return () => unsub();
    }, []);

    return (
        <div>
            {groundsManDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div className="groundsMenOverview">
                    <Link to={PageRoutes.adminGroundsMen} onClick={() => setModalOpen(true)}>
                        <button className="groundsMenOverview__groundsManAddBtn">+ Add GroundsMan</button>
                    </Link>
                    <div className="groundsMenOverview__groundsManCard">
                        {groundsManDocs?.map((groundsManDoc) => (
                            <GroundsManCard groundsManDoc={groundsManDoc} key={groundsManDoc.docId ?? ''} />
                        ))}
                    </div>
                    {isModalOpen ? <GroundsManAdd setModalOpen={setModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};

export default GroundsMenOverview;
