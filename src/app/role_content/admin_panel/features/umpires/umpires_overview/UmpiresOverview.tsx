import { useState, useEffect } from 'react';
import { Collections } from '../../../../../../enums/collection';
import { firestore } from '../../../../../../firebase';
import Umpire from '../../../../../../models/Umpire';
import './UmpiresOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import { PageRoutes } from '../../../../../../enums/pageRoutes';
import { Link } from 'react-router-dom';
import UmpireAdd from '../umpire_add/UmpireAdd'

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

    return (
        <div>
            {umpireDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div>
                    <Link to={PageRoutes.adminUmpires} onClick={() => setModalOpen(true)}>
                        <button className="umpireAddBtn">+ Add Umpire</button>
                    </Link>
                    {isModalOpen ? <UmpireAdd isOpen={true} setModalOpen={setModalOpen} /> : null}
                    
                </div>
            )}
        </div>
    );
};

export default UmpiresOverview;
