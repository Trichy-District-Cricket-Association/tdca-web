import React, { useState, useEffect } from 'react';
import { Collections } from '../../../../../enums/collection';
import { firestore } from '../../../../../firebase';
import useStorage from '../../../../../hooks/useStorage';
import Gallery from '../../../../../models/Gallery';
import News from '../../../../../models/News';
import Video from '../../../../../models/Video';
import './Feeds.scss';
import NewsAdd from './news/news_add/NewsAdd';
import NewsCard from './news/news_card/NewsCard';
import VideoAdd from './videos/video_add/VideoAdd';
import VideoCard from './videos/video_card/VideoCard';

const data = [
    { id: '1', tabTitle: 'News' },
    { id: '2', tabTitle: 'Videos' },
    { id: '3', tabTitle: 'Gallery' },
];

const Feeds: React.FC<void> = (): JSX.Element => {
    const [photo, setPhoto] = useState<Gallery>(new Gallery({}));

    // states to set data from firebase
    const [galleryDocs, setGalleryDocs] = useState<Gallery[] | undefined>();
    const [newsDocs, setNewsDocs] = useState<News[] | undefined>();
    const [videoDocs, setVideoDocs] = useState<Video[] | undefined>();

    // states to handle modal open
    const [isNewsModalOpen, setNewsModalOpen] = useState(false);
    const [isVideoModalOpen, setVideoModalOpen] = useState(false);

    const [visibleTab, setVisibleTab] = useState(data[0].id);
    const [upload, setUpload] = useState<boolean>(false);

    // State to handle uploading files.
    const [imageFile, setImageFile] = useState(null);
    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const { avatarUrl } = useStorage(imageFile);

    const handlePhoto = (e: any) => {
        const selectedImageFile = e.target.files[0];
        if (selectedImageFile) {
            if (imageTypes.includes(selectedImageFile.type)) {
                setImageFile(selectedImageFile);
            } else {
                setImageFile(null);
                window.alert('Please select an image file (png or jpg)');
            }
        }
    };

    const media = async (): Promise<void> => {
        await firestore.collection(Collections.news).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setNewsDocs([]);
            if (snapshot.docs?.length > 0) {
                const news = snapshot.docs.map((doc) => News.fromFirestore(doc));
                setNewsDocs(news);
            }
        });
        await firestore.collection(Collections.gallery).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setGalleryDocs([]);
            if (snapshot.docs?.length > 0) {
                const gallery = snapshot.docs.map((doc) => Gallery.fromFirestore(doc));
                setGalleryDocs(gallery);
            }
        });

        await firestore.collection(Collections.videos).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setVideoDocs([]);
            if (snapshot.docs?.length > 0) {
                const videos = snapshot.docs.map((doc) => Video.fromFirestore(doc));
                setVideoDocs(videos);
            }
        });
    };
    useEffect(() => {
        media();
    }, []);
    // Upload image for gallery
    const uploadImage: React.FormEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        photo.setPhoto = avatarUrl;
        setUpload(true);
        await firestore
            .collection(Collections.gallery)
            .add(JSON.parse(JSON.stringify(photo)))
            .then((doc) => {
                console.log(doc);
            })
            .then(() => setUpload(false))
            .catch((e) => {
                console.log(e);
            });
    };

    const listTitles = data?.map((item) => (
        <li
            key={item.id}
            onClick={() => setVisibleTab(item.id)}
            className={visibleTab === item.id ? 'tab-title tab-title--active' : 'tab-title'}
        >
            {item.tabTitle}
        </li>
    ));
    const listContent = data.map((item) => (
        <div key={item.id} style={visibleTab === item.id ? {} : { display: 'none' }}>
            {item.tabTitle == 'News' ? (
                <div>
                    <button className="feeds__NewsAddBtn" onClick={() => setNewsModalOpen(true)}>
                        + Add News
                    </button>
                    {newsDocs?.map((newsDoc) => (
                        <NewsCard newsDoc={newsDoc} key={newsDoc.docId} />
                    ))}
                </div>
            ) : null}
            {item.tabTitle == 'Videos' ? (
                <div>
                    <button className="feeds__VideoAddBtn" onClick={() => setVideoModalOpen(true)}>
                        + Add Video
                    </button>
                    <div className="videoCards">
                        {videoDocs?.map((videoDoc) => (
                            <VideoCard videoDoc={videoDoc} key={videoDoc.docId} />
                        ))}
                    </div>
                </div>
            ) : null}
            {item.tabTitle == 'Gallery' ? (
                <div className="buttons">
                    <div className="upload-btn-wrapper">
                        <input type="file" name="Photo" title="Add Photo" onChange={handlePhoto} />
                        <button className="photoBtn">{upload ? 'Uploading' : 'Upload'}</button>
                    </div>
                    <div>
                        <button className="submit" type="submit" onClick={uploadImage}>
                            Submit
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    ));
    return (
        <div className="feeds">
            <ul className="tabs-titles">{listTitles}</ul>
            <div className="tabs-contents">
                <div className="tab-content">{listContent}</div>
            </div>
            {isNewsModalOpen ? <NewsAdd setModalOpen={setNewsModalOpen} /> : null}
            {isVideoModalOpen ? <VideoAdd setModalOpen={setVideoModalOpen} /> : null}
        </div>
    );
};
export default Feeds;
