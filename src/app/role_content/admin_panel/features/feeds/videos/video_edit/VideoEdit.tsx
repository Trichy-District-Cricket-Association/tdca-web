import React, { useState } from 'react';
import Modal from 'react-modal';
import LoadingComp from '../../../../../../shared_components/loading_comp/LoadingComp';
import '../../Media.scss';
type VideoEditProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoEdit: React.FC<VideoEditProps> = ({ setModalOpen }) => {
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

export default VideoEdit;
