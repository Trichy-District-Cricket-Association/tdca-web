import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import Modal from 'react-modal';
import { Collections } from '../../../../../../../enums/collection';
import { firestore } from '../../../../../../../firebase';
import Video from '../../../../../../../models/Video';
import LoadingComp from '../../../../../../shared_components/loading_comp/LoadingComp';
import InputBox from '../../../../shared_components/input_box/InputBox';
import '../../Media.scss';
type VideoEditProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    videoDoc: Video;
};

const VideoEdit: React.FC<VideoEditProps> = ({ setModalOpen, videoDoc }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [video, setVideo] = useState<Video>(
        new Video({
            description: videoDoc.description,
            videoUrl: videoDoc.videoUrl,
        }),
    );
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
            .doc(videoDoc.docId)
            .set(JSON.parse(JSON.stringify(video)))
            .then(async (doc) => {
                console.log(doc);
            })
            .catch((e) => {
                console.log(e);
            });
        setModalOpen(false);
    };
    const deleteForm: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        const answer = window.confirm('Are you sure you want to delete?');
        if (answer) {
            setIsLoading(true);
            await firestore
                .collection(Collections.videos)
                .doc(videoDoc.docId)
                .delete()
                .then(() => setModalOpen(false));
        }
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
                        <div className="top">
                            <h1 className="text">Enter Video Url</h1>
                            <div className="buttons">
                                <button className="deleteBtn" onClick={deleteForm}>
                                    <i>
                                        <MdDelete />
                                    </i>
                                </button>
                            </div>
                        </div>
                        <div>
                            <InputBox
                                title="Video Url"
                                name="videoUrl"
                                value={video.videoUrl}
                                textHandler={handleInputForm}
                            />
                        </div>
                        <h1 className="text">Enter Video Description</h1>
                        <div className="description">
                            <InputBox
                                value={video.description}
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

export default VideoEdit;
