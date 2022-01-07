import React, { useState } from 'react';
import Modal from 'react-modal';
import { Collections } from '../../../../../../../enums/collection';
import { firestore } from '../../../../../../../firebase';
import Video from '../../../../../../../models/Video';
import LoadingComp from '../../../../../../shared_components/loading_comp/LoadingComp';
import InputBox from '../../../../shared_components/input_box/InputBox';
import '../../Media.scss';
type VideoAddProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoAdd: React.FC<VideoAddProps> = ({ setModalOpen }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [video, setVideo] = useState<Video>(new Video({}));

    const handleInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newVideo = new Video({ ...video });
        newVideo.handleVideo({ field: fieldName, value: e.target.value });
        setVideo(newVideo);
    };
    const handleTextAreaForm = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newVideo = new Video({ ...video });
        newVideo.handleVideo({ field: fieldName, value: e.target.value });
        setVideo(newVideo);
    };

    const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await firestore
            .collection(Collections.videos)
            .add(JSON.parse(JSON.stringify(video)))
            .then(async (doc) => {
                console.log(doc);
            })
            .catch((e) => {
                console.log(e);
            });
        setModalOpen(false);
    };
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
                <form className="mediaForm" onSubmit={submitForm}>
                    <div>
                        <h1 className="text">Enter Video Url</h1>
                        <div>
                            <InputBox title="Youtube Url" name="videoUrl" textHandler={handleInputForm} />
                        </div>
                        <h1 className="text">Enter Video Description</h1>
                        <div className="description">
                            <InputBox
                                type="textarea"
                                textAreaHandler={handleTextAreaForm}
                                title="Description"
                                name="description"
                            />
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
