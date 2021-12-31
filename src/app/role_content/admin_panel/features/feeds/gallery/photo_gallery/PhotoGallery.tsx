import { useState } from 'react';
import { Collections } from '../../../../../../../enums/collection';
import { firestore } from '../../../../../../../firebase';
import Gallery from '../../../../../../../models/Gallery';
import './PhotoGallery.scss';

type PhotoGalleryProps = {
    galleryDoc: any;
};

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ galleryDoc }) => {
    // const [imageToShow, setImageToShow] = useState('');
    // const [lightboxDisplay, setLightBoxDisplay] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //function to show a specific image in the lightbox, amd make lightbox visible
    // const showImage = (image: any) => {
    //     setImageToShow(image);
    //     setLightBoxDisplay(true);
    // };

    //hide lightbox
    // const hideLightBox = () => {
    //     setLightBoxDisplay(false);
    // };

    //show next image in lightbox
    // const showNext = (e: any) => {
    //     e.stopPropagation();
    //     const currentIndex = galleryDocs.findIndex((galleryDoc: Gallery) => {
    //         return galleryDoc.photoUrl === imageToShow;
    //     });
    //     if (currentIndex >= galleryDocs.length - 1) {
    //         setLightBoxDisplay(false);
    //     } else {
    //         const nextImage = galleryDocs[currentIndex + 1].photoUrl;
    //         setImageToShow(nextImage);
    //     }
    // };

    //show previous image in lightbox
    // const showPrev = (e: any) => {
    //     e.stopPropagation();
    //     const currentIndex = galleryDocs.findIndex((galleryDoc: Gallery) => {
    //         return galleryDoc.photoUrl === imageToShow;
    //     });
    //     if (currentIndex <= 0) {
    //         setLightBoxDisplay(false);
    //     } else {
    //         const nextImage = galleryDocs[currentIndex - 1].photoUrl;
    //         setImageToShow(nextImage);
    //     }
    // };
    const deleteForm: React.MouseEventHandler<HTMLImageElement> = async (e) => {
        e.preventDefault();
        const answer = window.confirm('Are you sure you want to delete?');
        if (answer) {
            setIsLoading(true);
            await firestore
                .collection(Collections.gallery)
                .doc(galleryDoc.docId)
                .delete()
                .then(() => setModalOpen(false));
        }
    };

    return (
        <div className="photoGallery">
            <div>
                {/* looping through our galleryDocs array to create img elements */}
                <img
                    className="photoGallery__imageCard"
                    onClick={deleteForm}
                    key={galleryDoc.docId}
                    src={galleryDoc.photoUrl}
                />
            </div>
            {/* 
            {lightboxDisplay ? (
                <div className="photoGallery__lightbox" onClick={hideLightBox}>
                    <button onClick={showPrev}>⭠</button>
                    <img className="photoGallery__lightbox--img" src={imageToShow}></img>
                    <button onClick={showNext}>⭢</button>
                </div>
            ) : (
                null
            )} */}
        </div>
    );
};

export default PhotoGallery;
