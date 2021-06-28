import { useState, useEffect } from 'react';
import { Collections } from '../../../../../../enums/collection';
import { firestore } from '../../../../../../firebase';
import Ground from '../../../../../../models/Ground';
import "./GroundsOverview.scss"
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import { PageRoutes } from '../../../../../../enums/pageRoutes';
import { Link } from 'react-router-dom';

const GroundsOverview: React.FC<void> = (): JSX.Element => {
    const [groundDocs, setGroundDocs] = useState<Ground[] | undefined>();

    useEffect(() => {
        const unsub = firestore.collection(Collections.grounds).onSnapshot((snapshot) => {
            console.log(snapshot);
            if (snapshot.docs?.length > 0) {
                const grounds = snapshot.docs.map((doc) => Ground.fromFirestore(doc));
                setGroundDocs(grounds);
            }
        });
        return () => {
            unsub;
        };
    }, [groundDocs]);

    return (
        <div>
            {groundDocs != undefined ? (
                <LoadingComp />
            ) : (
                <div>
                    <Link to = {PageRoutes.adminGroundAdd} >
                    <button className = "groundAddBtn">
                        + Add Ground 
                    </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default GroundsOverview;
