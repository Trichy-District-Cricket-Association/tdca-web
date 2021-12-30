import React from 'react';
import { useState } from 'react';
import { Collections } from '../../../../../enums/collection';
import { firestore } from '../../../../../firebase';
import useStorage from '../../../../../hooks/useStorage';
import Gallery from '../../../../../models/Gallery';
import './Feeds.scss';
import NewsAdd from './news/news_add/NewsAdd';
import VideoAdd from './videos/video_add/VideoAdd';

const data = [
    { id: '1', tabTitle: 'News' },
    { id: '2', tabTitle: 'Videos' },
    { id: '3', tabTitle: 'Gallery' },
];

const Feeds: React.FC<void> = (): JSX.Element => {
    const [gallery, setGallery] = useState<Gallery>(new Gallery({}));
    const [isNewsModalOpen, setNewsModalOpen] = useState(false);
    const [isVideoModalOpen, setVideoModalOpen] = useState(false);
    const [visibleTab, setVisibleTab] = useState(data[0].id);
    const [upload, setUpload] = useState<boolean>(false);

    // State to handle uploading files.
    const [imageFile, setImageFile] = useState(null);
    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const { avatarUrl, progress } = useStorage(imageFile);

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

    // Upload image for gallery
    const uploadImage: React.FormEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        gallery.setPhoto = avatarUrl;
        setUpload(true);
        await firestore
            .collection(Collections.gallery)
            .add(JSON.parse(JSON.stringify(gallery)))
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
        <p key={item.id} style={visibleTab === item.id ? {} : { display: 'none' }}>
            {item.tabTitle == 'News' ? (
                <div>
                    <button className="feeds__NewsAddBtn" onClick={() => setNewsModalOpen(true)}>
                        + Add News
                    </button>
                </div>
            ) : null}
            {item.tabTitle == 'Videos' ? (
                <div>
                    <button className="feeds__VideoAddBtn" onClick={() => setVideoModalOpen(true)}>
                        + Add Video
                    </button>
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
        </p>
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
