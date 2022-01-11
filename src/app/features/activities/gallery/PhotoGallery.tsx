import { useEffect, useState } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Collections } from '../../../../enums/collection';
import { firestore } from '../../../../firebase';
import Gallery from '../../../../models/Gallery';
import '../../../role_content/admin_panel/features/activities/gallery/photo_gallery/PhotoGallery.scss';

const PhotoGallery = () => {
    const [galleryDocs, setGalleryDocs] = useState<Gallery[] | undefined>();

    useEffect(() => {
        const unsub = firestore.collection(Collections.gallery).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setGalleryDocs([]);
            if (snapshot.docs?.length > 0) {
                const grounds = snapshot.docs.map((doc) => Gallery.fromFirestore(doc));
                setGalleryDocs(grounds);
            }
        });
        return () => unsub();
    }, []);
    {
        return <ImageGallery galleryDocs={galleryDocs} />;
    }
};

const ImageGallery: React.FC<any> = ({ galleryDocs }) => {
    const [imageToShow, setImageToShow] = useState('');
    const [lightboxDisplay, setLightBoxDisplay] = useState(false);

    //function to show a specific image in the lightbox, amd make lightbox visible
    const showImage = (image: any) => {
        setImageToShow(image);
        setLightBoxDisplay(true);
    };

    //hide lightbox
    const hideLightBox = () => {
        setLightBoxDisplay(false);
    };

    //show next image in lightbox
    const showNext = (e: any) => {
        e.stopPropagation();
        const currentIndex = galleryDocs.findIndex((galleryDoc: Gallery) => {
            return galleryDoc.photoUrl === imageToShow;
        });
        if (currentIndex >= galleryDocs.length - 1) {
            setLightBoxDisplay(false);
        } else {
            const nextImage = galleryDocs[currentIndex + 1].photoUrl;
            setImageToShow(nextImage);
        }
    };

    //show previous image in lightbox
    const showPrev = (e: any) => {
        e.stopPropagation();
        const currentIndex = galleryDocs.findIndex((galleryDoc: Gallery) => {
            return galleryDoc.photoUrl === imageToShow;
        });
        if (currentIndex <= 0) {
            setLightBoxDisplay(false);
        } else {
            const nextImage = galleryDocs[currentIndex - 1].photoUrl;
            setImageToShow(nextImage);
        }
    };

    return (
        <div className="photoGallery">
            <div>
                {/* looping through our galleryDocs array to create img elements */}
                {galleryDocs?.map((galleryDoc: Gallery) => (
                    <img
                        className="photoGallery__imageCard"
                        onClick={() => showImage(galleryDoc.photoUrl)}
                        key={galleryDoc.docId}
                        src={galleryDoc.photoUrl}
                    />
                ))}
            </div>

            {lightboxDisplay ? (
                <div className="photoGallery__lightbox" onClick={hideLightBox}>
                    <button className="photoGallery__lightbox--prevBtn" onClick={showPrev}>
                        <MdNavigateNext fontSize={'45px'} />
                    </button>
                    <img className="photoGallery__lightbox--img" src={imageToShow}></img>
                    <button className="photoGallery__lightbox--nextBtn" onClick={showNext}>
                        <MdNavigateBefore fontSize={'45px'} />
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default PhotoGallery;
