import React, { useState } from 'react';
import './VideoCard.scss';
import ReactPlayer from 'react-player/youtube';
import Video from '../../../../../../../models/Video';
import LoadingComp from '../../../../../../shared_components/loading_comp/LoadingComp';
import VideoEdit from '../video_edit/VideoEdit';

type VideoCardProps = {
    videoDoc: Video;
};

const VideoCard: React.FC<VideoCardProps> = ({ videoDoc }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div>
            {videoDoc == undefined ? (
                <LoadingComp />
            ) : (
                <div className="videoCard">
                    <div className="videoCard__container">
                        <ul className="videoCard__cards">
                            <li className="videoCard__cards--item" key={videoDoc.docId ?? ''}>
                                <div className="videoCard__card">
                                    <div>
                                        <ReactPlayer width={'450px'} url={`${videoDoc.videoUrl}`} />
                                    </div>
                                    <div className="videoCard__card__content" onClick={() => setModalOpen(true)}>
                                        <p className="videoCard__card--text">{videoDoc.description}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {isModalOpen ? <VideoEdit setModalOpen={setModalOpen} videoDoc={videoDoc} /> : null}
                </div>
            )}
        </div>
    );
};
export default VideoCard;
