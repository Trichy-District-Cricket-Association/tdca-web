import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Collections } from '../../../../enums/collection';
import { firestore } from '../../../../firebase';
import Team from '../../../../models/Team';
import LoadingComp from '../../../shared_components/loading_comp/LoadingComp';

import './PointsTable.scss';

type PointsTableProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PointsTable: React.FC<PointsTableProps> = ({ setModalOpen }): JSX.Element => {
    const [teamDocs, setTeamDocs] = useState<Team[] | undefined>();
    useEffect(() => {
        const unsub = firestore
            .collection(Collections.teams)
            .where('type', '==', 'League Team')

            .orderBy('totalPoints', 'desc')

            .onSnapshot((snapshot) => {
                if (snapshot.docs?.length === 0) setTeamDocs([]);
                if (snapshot.docs?.length > 0) {
                    const teams = snapshot.docs.map((doc) => Team.fromFirestore(doc));
                    setTeamDocs(teams);
                }
            });
        return () => unsub();
    }, []);
    return (
        <Modal
            className="pointsTable"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            {teamDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div>
                    <h1 className="pointsTable--header">Standings</h1>
                    <div className="pointsTable__table">
                        <table className="rwd-table">
                            <tr>
                                <th>Teams</th>
                                <th>Matches</th>
                                <th>Won</th>
                                <th>Lost</th>
                                <th>Tied</th>
                                <th>Draw</th>
                                <th>No Result</th>
                                <th>Walkover</th>
                                <th>Conceed</th>
                                <th>Refusal</th>
                                <th>Penalty</th>
                                <th>Total Points</th>
                                <th>NRR</th>
                            </tr>
                            {teamDocs?.map((teamDoc) => (
                                <tr key={teamDoc.teamId}>
                                    <td>{teamDoc.teamName}</td>
                                    <td>{teamDoc.numberOfMatches}</td>
                                    <td>{teamDoc.won}</td>
                                    <td>{teamDoc.lost}</td>
                                    <td>{teamDoc.tie}</td>
                                    <td>{teamDoc.draw}</td>
                                    <td>{teamDoc.noResult}</td>
                                    <td>{teamDoc.walkover}</td>
                                    <td>{teamDoc.conceed}</td>
                                    <td>{teamDoc.refusal}</td>
                                    <td>{teamDoc.penalty}</td>
                                    <td>{teamDoc.totalPoints}</td>
                                    <td>{teamDoc.runRate}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default PointsTable;
