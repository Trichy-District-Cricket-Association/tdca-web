import React, { useState } from 'react';
import Modal from 'react-modal';
import LoadingComp from '../../../../../../shared_components/loading_comp/LoadingComp';
import InputBox from '../../../../shared_components/input_box/InputBox';
import '../../Media.scss';
type VideoAddProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoAdd: React.FC<VideoAddProps> = ({ setModalOpen }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <Modal
            className="media"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="media__overlay"
        >
            {isLoading ? (
                <LoadingComp />
            ) : (
                <form className="mediaForm">
                    <div>
                        <h1 className="text">Enter Video Url</h1>
                        <div>
                            <InputBox title="Url" name="url" />
                        </div>
                        <h1 className="text">Enter Video Description</h1>
                        <div className="description">
                            <InputBox type="textarea" title="Description" name="desc" />
                        </div>
                        <div className="buttons">
                            <div></div>
                            <div>
                                <button className="submit" type="submit">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default VideoAdd;
