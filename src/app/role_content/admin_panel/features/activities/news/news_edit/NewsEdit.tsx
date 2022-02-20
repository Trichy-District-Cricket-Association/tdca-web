import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import Modal from 'react-modal';
import { Collections } from '../../../../../../../enums/collection';
import { firestore } from '../../../../../../../firebase';
import useStorage from '../../../../../../../hooks/useStorage';
import News from '../../../../../../../models/News';
import LoadingComp from '../../../../../../shared_components/loading_comp/LoadingComp';
import InputBox from '../../../../shared_components/input_box/InputBox';
import '../../Media.scss';
type NewsEditProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    newsDoc: News;
};

const NewsEdit: React.FC<NewsEditProps> = ({ setModalOpen, newsDoc }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [news, setNews] = useState<News>(
        new News({
            photoUrl: newsDoc.photoUrl,
            description: newsDoc.description,
            title: newsDoc.title,
            date: newsDoc.date,
            place: newsDoc.place,
            tag: newsDoc.tag,
        }),
    );
    // State to handle uploading files.
    const [imageFile, setImageFile] = useState(null);
    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    // Getting the progress and avatarUrl from the hook.
    const { url1 } = useStorage(imageFile);

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

    const handleInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newNews = new News({ ...news });
        newNews.handleNews({ field: fieldName, value: e.target.value });
        setNews(newNews);
    };
    const handleTextAreaForm = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newNews = new News({ ...news });
        newNews.handleNews({ field: fieldName, value: e.target.value });
        setNews(newNews);
    };

    const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (news.photoUrl) {
            news.setUrl = news.photoUrl;
        }
        if (url1) {
            news.setUrl = url1;
        }
        news.setUrl = url1;
        await firestore
            .collection(Collections.news)
            .doc(newsDoc.docId)
            .set(JSON.parse(JSON.stringify(news)))
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
                .collection(Collections.news)
                .doc(newsDoc.docId)
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
                            <h2 className="text">Enter News Headline</h2>
                            <div className="buttons">
                                <button className="deleteBtn" onClick={deleteForm}>
                                    <i>
                                        <MdDelete />
                                    </i>
                                </button>
                            </div>
                        </div>

                        <div>
                            <InputBox title="Title" name="title" value={news.title} textHandler={handleInputForm} />
                        </div>
                        <div className="date-place">
                            <div className="date">
                                <h2 className="text">Date:</h2>
                                <InputBox
                                    title="Date"
                                    name="date"
                                    value={news.date}
                                    type="date"
                                    textHandler={handleInputForm}
                                />
                            </div>
                            <div className="place">
                                <h2 className="text">Place:</h2>
                                <InputBox title="Place" name="place" value={news.place} textHandler={handleInputForm} />
                            </div>
                            <div className="tag">
                                <h2 className="text">Tag:</h2>
                                <InputBox title="Tag" name="tag" value={news.tag} textHandler={handleInputForm} />
                            </div>
                        </div>

                        <h1 className="text">Enter News Description</h1>

                        <div className="description">
                            <InputBox
                                value={news.description}
                                type="textarea"
                                title="Description"
                                name="description"
                                textAreaHandler={handleTextAreaForm}
                            />
                        </div>
                        <div className="buttons">
                            <div className="upload-btn-wrapper">
                                <input type="file" name="Photo" title="Add Photo" onChange={handlePhoto} />
                                <button className="photoBtn">
                                    {news.photoUrl || url1 ? 'Uploaded' : '+ Add Photo'}
                                </button>
                            </div>
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

export default NewsEdit;
