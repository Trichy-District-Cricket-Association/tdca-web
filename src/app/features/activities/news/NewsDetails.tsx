import Modal from 'react-modal';
import News from '../../../../models/News';
import './NewsDetails.scss';
type NewsDetailsProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    news: News;
};

const NewsDetails: React.FC<NewsDetailsProps> = ({ setModalOpen, news }): JSX.Element => {
    return (
        <Modal
            className="newsDetails"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            <div>
                <header className="newsDetails__header">tdca cricket</header>
                <div className="newsDetails__subhead">
                    <p className="newsDetails__subhead--place">{news.place}</p>
                    <p className="newsDetails__subhead--date">{news.date}</p>
                </div>
                <div className="newsDetails__items">
                    {news.photoUrl ? <img src={news.photoUrl} className="newsDetails__items--photo" /> : null}

                    <div className="newsDetails__subitems">
                        <h3 className="newsDetails__subitems--title">{news.title}</h3>
                        {news.tag ? <p className="newsDetails__subitems--tag">{news.tag}</p> : null}
                        <p className="newsDetails__subitems--description">{news.description}</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default NewsDetails;
