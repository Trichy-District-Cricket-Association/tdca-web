import React, { useState } from 'react';
import Modal from 'react-modal';
import LoadingComp from '../../../../../../shared_components/loading_comp/LoadingComp';
import '../../News-Video.scss';
type VideoAddProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoAdd: React.FC<VideoAddProps> = ({ setModalOpen }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <Modal
            className="news"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="news__overlay"
        >
            {isLoading ? <LoadingComp /> : <form className=""></form>}
        </Modal>
    );
};

export default VideoAdd;
