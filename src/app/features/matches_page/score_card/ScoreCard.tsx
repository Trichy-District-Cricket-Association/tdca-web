import { useState } from 'react';
import Match from '../../../../models/Match';
import Modal from 'react-modal';
import './ScoreCard.scss';

type ScoreCardProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    matchDoc: Match;
};
const ScoreCard = ({ setModalOpen }: ScoreCardProps): JSX.Element => {
    return (
        <Modal
            className="playerView"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        ></Modal>
    );
};
export default ScoreCard;
