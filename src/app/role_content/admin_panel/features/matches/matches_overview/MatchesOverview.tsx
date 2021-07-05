import { useState, useEffect } from 'react';
import { Collections } from '../../../../../../enums/collection';
import { firestore } from '../../../../../../firebase';
import Match from '../../../../../../models/Match';
import './MatchesOverview.scss';
import LoadingComp from '../../../../../shared_components/loading_comp/LoadingComp';
import { PageRoutes } from '../../../../../../enums/pageRoutes';
import { Link } from 'react-router-dom';
import MatchAdd from '../match_add/MatchAdd';
import MatchCard from '../match_card/MatchCard';
import ReactPaginate from 'react-paginate';

const MatchesOverview: React.FC<void> = (): JSX.Element => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [matchDocs, setMatchDocs] = useState<Match[] | undefined>();
    const [totalMatches, setTotalMatches] = useState<number>(1);
    const [pageNum, setPageNum] = useState<number>(0);

    useEffect(() => {
        const unsub = firestore
            .collection('counter')
            .doc(Collections.matches)
            .onSnapshot((snapshot) => {
                if (snapshot.data()) setTotalMatches(snapshot.data()?.count);
            });
        return () => unsub();
    }, []);
    const pageChange = async () => {
        await firestore
            .collection(Collections.matches)
            .orderBy('date')
            .startAt(matchDocs && matchDocs.length > 0 ? matchDocs[matchDocs.length - 1].date?.toISOString() : 0)
            .limit(5)
            .get()
            .then((snapshot) => {
                if (snapshot.docs?.length === 0) setMatchDocs([]);
                if (snapshot.docs?.length > 0) {
                    const matches = snapshot.docs.map((doc) => Match.fromFirestore(doc));
                    setMatchDocs(matches);
                    console.log(matchDocs);
                }
            });
    };
    useEffect(() => {
        console.log(`pageNum  = ${pageNum}`);
        pageChange();
    }, [pageNum]);

    return (
        <div>
            {matchDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div className="matchOverview">
                    <Link to={PageRoutes.adminMatches} onClick={() => setModalOpen(true)}>
                        <button className="matchOverview__matchAddBtn">+ Add Match</button>
                    </Link>
                    <div className="matchOverview__matchCard">
                        {matchDocs?.map((matchDoc) => (
                            <MatchCard matchDoc={matchDoc} key={matchDoc.docId ?? ''} />
                        ))}
                    </div>
                    <ReactPaginate
                        previousLabel={'← Previous'}
                        nextLabel={'Next →'}
                        pageCount={Math.ceil(totalMatches / 5)}
                        onPageChange={({ selected }) => {
                            console.log(selected);
                            setPageNum(selected);
                        }}
                        // containerClassName={'pagination'}
                        // previousLinkClassName={'pagination__link'}
                        // nextLinkClassName={'pagination__link'}
                        // disabledClassName={'pagination__link--disabled'}
                        // activeClassName={'pagination__link--active'}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                    />
                    {isModalOpen ? <MatchAdd setModalOpen={setModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};

export default MatchesOverview;
