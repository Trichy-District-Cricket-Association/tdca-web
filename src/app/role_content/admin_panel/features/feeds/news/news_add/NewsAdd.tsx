import React, { useState } from 'react';
import Modal from 'react-modal';
import LoadingComp from '../../../../../../shared_components/loading_comp/LoadingComp';
import InputBox from '../../../../shared_components/input_box/InputBox';
import '../../Media.scss';
type NewsAddProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewsAdd: React.FC<NewsAddProps> = ({ setModalOpen }): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // State to handle uploading files.
    const [imageFile, setImageFile] = useState(null);
    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg'];

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
                <form className="mediaForm">
                    <div>
                        <h1 className="text">Enter News Headline</h1>
                        <div>
                            <InputBox title="Headline" name="headline" />
                        </div>
                        <h1 className="text">Enter News Description</h1>
                        <div className="description">
                            <InputBox type="textarea" title="Description" name="desc" />
                        </div>
                        <div className="buttons">
                            <div className="upload-btn-wrapper">
                                <input type="file" name="Photo" title="Add Photo" />
                                <button className="photoBtn"> + Add Photo</button>
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
