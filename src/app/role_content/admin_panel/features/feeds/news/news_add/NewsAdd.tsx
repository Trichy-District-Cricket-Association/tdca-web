import React, { useState } from 'react';
import Modal from 'react-modal';
import { Collections } from '../../../../../../../enums/collection';
import { firestore } from '../../../../../../../firebase';
import useStorage from '../../../../../../../hooks/useStorage';
import News from '../../../../../../../models/News';
import LoadingComp from '../../../../../../shared_components/loading_comp/LoadingComp';
import InputBox from '../../../../shared_components/input_box/InputBox';
import '../../Media.scss';
type NewsAddProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewsAdd: React.FC<NewsAddProps> = ({ setModalOpen }): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [news, setNews] = useState<News>(new News({}));
    // State to handle uploading files.
    const [imageFile, setImageFile] = useState(null);
    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    // Getting the progress and avatarUrl from the hook.
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
        news.setUrl = avatarUrl;
        await firestore
            .collection(Collections.news)
            .add(JSON.parse(JSON.stringify(news)))
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
                        <h2 className="text">News Headline</h2>
                        <div>
                            <InputBox title="Title" name="title" textHandler={handleInputForm} />
                        </div>
                        <div className="date-place">
                            <div className="date">
                                <h2 className="text">Date:</h2>
                                <InputBox title="Date" name="date" type="date" textHandler={handleInputForm} />
                            </div>
                            <div className="place">
                                <h2 className="text">Place:</h2>
                                <InputBox title="Place" name="place" textHandler={handleInputForm} />
                            </div>
                        </div>

                        <h2 className="text">News Description</h2>
                        <div className="description">
                            <InputBox
                                type="textarea"
                                title="Description"
                                name="description"
                                textAreaHandler={handleTextAreaForm}
                            />
                        </div>
                        <div className="buttons">
                            <div className="upload-btn-wrapper">
                                <input type="file" name="Photo" title="Add Photo" onChange={handlePhoto} />
                                <button className="photoBtn"> {avatarUrl ? 'Uploaded' : '+ Add Photo'}</button>
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

export default NewsAdd;
