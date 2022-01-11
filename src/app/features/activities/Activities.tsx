import { useState, useEffect } from 'react';
import { Collections } from '../../../enums/collection';
import { firestore } from '../../../firebase';
import Gallery from '../../../models/Gallery';
import News from '../../../models/News';
import Video from '../../../models/Video';
import PhotoGallery from './gallery/PhotoGallery';
import '../../role_content/admin_panel/features/activities/Activities.scss';
import NewsCard from './news/NewsCard';
import VideoCard from './videos/VideoCard';

const data = [
    { id: '1', tabTitle: 'News' },
    { id: '2', tabTitle: 'Videos' },
    { id: '3', tabTitle: 'Gallery' },
];

const Activities: React.FC<void> = () => {
    // states to set data from firebase
    const [galleryDocs, setGalleryDocs] = useState<Gallery[] | undefined>();
    const [newsDocs, setNewsDocs] = useState<News[] | undefined>();
    const [videoDocs, setVideoDocs] = useState<Video[] | undefined>();

    // states to handle modal open
    const [isNewsModalOpen, setNewsModalOpen] = useState(false);

    const [visibleTab, setVisibleTab] = useState(data[0].id);

    const media = async (): Promise<void> => {
        firestore.collection(Collections.news).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setNewsDocs([]);
            if (snapshot.docs?.length > 0) {
                const news = snapshot.docs.map((doc) => News.fromFirestore(doc));
                setNewsDocs(news);
            }
        });
        firestore.collection(Collections.gallery).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setGalleryDocs([]);
            if (snapshot.docs?.length > 0) {
                const gallery = snapshot.docs.map((doc) => Gallery.fromFirestore(doc));
                setGalleryDocs(gallery);
            }
        });

        firestore.collection(Collections.videos).onSnapshot((snapshot) => {
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
                    {newsDocs?.map((newsDoc) => (
                        <NewsCard newsDoc={newsDoc} key={newsDoc.docId} />
                    ))}
                </div>
            ) : null}
            {item.tabTitle == 'Videos' ? (
                <div className="videoCards">
                    {videoDocs?.map((videoDoc) => (
                        <VideoCard videoDoc={videoDoc} key={videoDoc.docId} />
                    ))}
                </div>
            ) : null}
            {item.tabTitle == 'Gallery' ? (
                <div className="photoGallery">
                    <PhotoGallery />
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
        </div>
    );
};
export default Activities;
