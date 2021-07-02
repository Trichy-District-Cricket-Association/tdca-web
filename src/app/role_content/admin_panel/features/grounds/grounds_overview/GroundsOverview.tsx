import { useState, useEffect } from 'react';
import { Collections } from '../../../../../../enums/collection';
import { firestore } from '../../../../../../firebase';
import Ground from '../../../../../../models/Ground';
import './GroundsOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import { PageRoutes } from '../../../../../../enums/pageRoutes';
import { Link } from 'react-router-dom';
import GroundAdd from '../ground_add/GroundAdd';
import GroundCard from '../ground_card/GroundCard';

const GroundsOverview: React.FC<void> = () => {
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

    return (
        <div>
            {groundDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div className="groundsOverview">
                    <Link to={PageRoutes.adminGrounds} onClick={() => setModalOpen(true)}>
                        <button className="groundsOverview__groundAddBtn">+ Add Ground</button>
                    </Link>
                    <div className="groundsOverview__groundCard">
                        {groundDocs?.map((groundDoc) => (
                            <GroundCard groundDoc={groundDoc} key={groundDoc.docId ?? ''} />
                        ))}
                    </div>
                    {isModalOpen ? <GroundAdd isOpen={true} setModalOpen={setModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};

export default GroundsOverview;
