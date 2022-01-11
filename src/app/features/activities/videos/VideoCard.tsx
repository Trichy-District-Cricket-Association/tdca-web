import React from 'react';
import ReactPlayer from 'react-player/youtube';
import Video from '../../../../models/Video';
import LoadingComp from '../../../shared_components/loading_comp/LoadingComp';
import '../../../role_content/admin_panel/features/activities/videos/video_card/VideoCard.scss';

type VideoCardProps = {
    videoDoc: Video;
};

const VideoCard: React.FC<VideoCardProps> = ({ videoDoc }) => {
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
                                    <div className="videoCard__card__content">
                                        <p className="videoCard__card--text">{videoDoc.description}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};
export default VideoCard;
