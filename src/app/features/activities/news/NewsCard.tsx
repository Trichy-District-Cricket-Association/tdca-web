import React, { useState } from 'react';
import News from '../../../../models/News';
import LoadingComp from '../../../shared_components/loading_comp/LoadingComp';
import '../../../role_content/admin_panel/features/activities/news/news_card/NewsCard.scss';
import NewsDetails from './NewsDetails';
const cricket = `${process.env.PUBLIC_URL}/assets/images/cricket.png`;
type NewsCardProps = {
    newsDoc: News;
};

const NewsCard: React.FC<NewsCardProps> = ({ newsDoc }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div>
            {newsDoc == undefined ? (
                <LoadingComp />
            ) : (
                <div>
                    <ul className="cardUl" key={newsDoc.docId ?? ''} onClick={() => setModalOpen(true)}>
                        <li className="card">
                            <p
                                className="featured-image"
                                style={{ backgroundImage: `url(${newsDoc.photoUrl ? newsDoc.photoUrl : cricket})` }}
                            ></p>
                            <article className="card-body">
                                <header>
                                    <div>
                                        <div className="top">
                                            <span className="pre-heading">Blog</span>
                                        </div>
                                        <div className="title">
                                            <h3 className="titleHeading">{newsDoc.title}</h3>
                                        </div>
                                        <p className="meta">
                                            <span className="author">{newsDoc.place}</span>
                                            <span> | </span>
                                            <time className="updated">{newsDoc.date}</time>
                                        </p>
                                    </div>
                                </header>
                                <div className="chips">
                                    {newsDoc.tag ? <p className="chip">{newsDoc.tag}</p> : null}
                                    <p className="chip">TDCA</p>
                                </div>
                            </article>
                        </li>
                    </ul>
                    {isModalOpen ? <NewsDetails news={newsDoc} setModalOpen={setModalOpen} /> : null}
                </div>
            )}
        </div>
    );
};
export default NewsCard;
