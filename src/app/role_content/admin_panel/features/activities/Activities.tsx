import React, { useState, useEffect } from 'react';
import { Collections } from '../../../../../enums/collection';
import { firestore } from '../../../../../firebase';
import useStorage from '../../../../../hooks/useStorage';
import Gallery from '../../../../../models/Gallery';
import News from '../../../../../models/News';
import Office from '../../../../../models/Office';
import Video from '../../../../../models/Video';
import './Activities.scss';
import PhotoGallery from './gallery/photo_gallery/PhotoGallery';
import NewsAdd from './news/news_add/NewsAdd';
import NewsCard from './news/news_card/NewsCard';
import VideoAdd from './videos/video_add/VideoAdd';
import VideoCard from './videos/video_card/VideoCard';

const data = [
    { id: '1', tabTitle: 'News' },
    { id: '2', tabTitle: 'Videos' },
    { id: '3', tabTitle: 'Gallery' },
    { id: '4', tabTitle: 'Office' },
];
const pdfTypes = ['application/pdf'];
const imageTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const Activities: React.FC<void> = () => {
    const [photo, setPhoto] = useState<Gallery>(new Gallery({}));
    const [office, setOffice] = useState<Office>(new Office({}));

    // states to set data from firebase
    const [galleryDocs, setGalleryDocs] = useState<Gallery[] | undefined>();
    const [newsDocs, setNewsDocs] = useState<News[] | undefined>();
    const [videoDocs, setVideoDocs] = useState<Video[] | undefined>();
    const [officeDocs, setOfficeDocs] = useState<Office[] | undefined>();

    // states to handle modal open
    const [isNewsModalOpen, setNewsModalOpen] = useState(false);
    const [isVideoModalOpen, setVideoModalOpen] = useState(false);

    const [visibleTab, setVisibleTab] = useState(data[0].id);

    // State to handle uploading files.
    const [imageFile, setImageFile] = useState(null);
    const [pdfFile1, setPdfFile1] = useState(null);
    const [pdfFile2, setPdfFile2] = useState(null);
    const [pdfFile3, setPdfFile3] = useState(null);
    const [pdfFile4, setPdfFile4] = useState(null);

    const { url1, url2, url3, url4, url5, progress } = useStorage(imageFile, pdfFile1, pdfFile2, pdfFile3, pdfFile4);

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
    const handlePdf = (e: any) => {
        const selectedPdfFile = e.target.files[0];
        if (selectedPdfFile) {
            if (pdfTypes.includes(selectedPdfFile.type)) {
                if (e.target.name == 'bylaws') setPdfFile1(selectedPdfFile);
                if (e.target.name == 'lr') setPdfFile2(selectedPdfFile);
                if (e.target.name == 'kr') setPdfFile3(selectedPdfFile);
                if (e.target.name == 'accounts') setPdfFile4(selectedPdfFile);
            } else {
                setPdfFile1(null);
                setPdfFile2(null);
                setPdfFile3(null);
                setPdfFile4(null);

                window.alert('Format not supported');
            }
        }
    };

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
        firestore.collection(Collections.office).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setOfficeDocs([]);
            if (snapshot.docs?.length > 0) {
                const office = snapshot.docs.map((doc) => Office.fromFirestore(doc));
                setOfficeDocs(office);
            }
        });
    };
    useEffect(() => {
        media();
    }, []);
    // Upload image for gallery
    const uploadImage: React.FormEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        if (url1 != '') {
            photo.setPhoto = url1;
            await firestore
                .collection(Collections.gallery)
                .add(JSON.parse(JSON.stringify(photo)))
                .then((doc) => {
                    console.log(doc);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            window.alert('Please Upload an Image');
        }
    };
    const uploadpdf: React.FormEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        if (url2) office.setByLawsPdf = url2;
        if (url3) office.setKnockoutRulesPdf = url3;
        if (url4) office.setLeagueRulesPdf = url4;
        if (url5) office.setAccountsPdf = url5;
        await firestore
            .collection(Collections.office)
            .doc('liDc2hUXdGpFYXbdH75d')
            .set(JSON.parse(JSON.stringify(office)))
            .then((doc) => {
                console.log(doc);
            })
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
                <div>
                    <div className="upload">
                        <div className="upload-btn-wrapper">
                            <input type="file" name="Photo" title="Add Photo" onChange={handlePhoto} />
                            <button className="photoBtn">
                                {progress > 0 && progress < 100 ? 'Uploading' : '+ Add Photo'}
                            </button>
                        </div>
                        <div>
                            <button className="submit" type="submit" onClick={uploadImage}>
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="photoGallery">
                        {galleryDocs?.map((galleryDoc) => (
                            <PhotoGallery key={galleryDoc.docId} galleryDoc={galleryDoc} />
                        ))}
                    </div>
                </div>
            ) : null}
            {item.tabTitle == 'Office' ? (
                <div>
                    {officeDocs ? (
                        <div>
                            <div className="upload">
                                <p className="upload--title">By Laws: </p>
                                <div className="upload-btn-wrapper">
                                    <input type="file" name="bylaws" title="By Laws" onChange={handlePdf} />
                                    <button className="photoBtn">
                                        {officeDocs[0].byLawsPdf || url2 ? 'Uploaded' : '+ By Laws'}
                                    </button>
                                </div>
                                {officeDocs[0].byLawsPdf ? (
                                    <a
                                        className="upload--view"
                                        href={officeDocs[0].byLawsPdf}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Click to View
                                    </a>
                                ) : url2 ? (
                                    <a className="upload--view" href={url2} target="_blank" rel="noreferrer">
                                        Click to View
                                    </a>
                                ) : null}
                            </div>
                            <div className="upload">
                                <p className="upload--title">League Rules:</p>
                                <div className="upload-btn-wrapper">
                                    <input type="file" name="lr" title="League Rules" onChange={handlePdf} />
                                    <button className="photoBtn">
                                        {officeDocs[0].leagueRulesPdf || url3 ? 'Uploaded' : '+ League Rules'}
                                    </button>
                                </div>
                                {officeDocs[0].leagueRulesPdf ? (
                                    <a
                                        className="upload--view"
                                        href={officeDocs[0].leagueRulesPdf}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Click to View
                                    </a>
                                ) : url3 ? (
                                    <a className="upload--view" href={url3} target="_blank" rel="noreferrer">
                                        Click to View
                                    </a>
                                ) : null}
                            </div>
                            <div className="upload">
                                <p className="upload--title">Knockout Rules:</p>
                                <div className="upload-btn-wrapper">
                                    <input type="file" name="kr" title="Knockout Rules" onChange={handlePdf} />
                                    <button className="photoBtn">
                                        {officeDocs[0].knockoutRulesPdf || url4 ? 'Uploaded' : '+ Knockout Rules'}
                                    </button>
                                </div>
                                {officeDocs[0].knockoutRulesPdf ? (
                                    <a
                                        className="upload--view"
                                        href={officeDocs[0].knockoutRulesPdf}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Click to View
                                    </a>
                                ) : url4 ? (
                                    <a className="upload--view" href={url4} target="_blank" rel="noreferrer">
                                        Click to View
                                    </a>
                                ) : null}
                            </div>
                            <div className="upload">
                                <p className="upload--title">Accounts:</p>
                                <div className="upload-btn-wrapper">
                                    <input type="file" name="accounts" title="Accounts" onChange={handlePdf} />
                                    <button className="photoBtn">
                                        {officeDocs[0].accountsPdf || url5 ? 'Uploaded' : '+ Accounts'}
                                    </button>
                                </div>
                                {officeDocs[0].accountsPdf ? (
                                    <a
                                        className="upload--view"
                                        href={officeDocs[0].accountsPdf}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Click to View
                                    </a>
                                ) : url5 ? (
                                    <a className="upload--view" href={url5} target="_blank" rel="noreferrer">
                                        Click to View
                                    </a>
                                ) : null}
                            </div>
                            <button className="submit" type="submit" onClick={uploadpdf}>
                                Submit
                            </button>
                            {/* <div className="photoGallery">
                                <Official officeDoc={officeDocs[0]} />
                            </div> */}
                        </div>
                    ) : null}
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
export default Activities;
