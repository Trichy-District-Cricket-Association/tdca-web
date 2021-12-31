import React, { useState } from 'react';
import News from '../../../../../../../models/News';
import LoadingComp from '../../../../../../shared_components/loading_comp/LoadingComp';
import NewsEdit from '../news_edit/NewsEdit';
import './NewsCard.scss';

type NewsCardProps = {
    newsDoc: News;
};

const NewsCard: React.FC<NewsCardProps> = ({ newsDoc }): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div>
            {newsDoc == undefined ? (
                <LoadingComp />
            ) : (
                <div>
                    <ul key={newsDoc.docId ?? ''} onClick={() => setModalOpen(true)}>
                        <li className="card">
                            <p className="featured-image" style={{ backgroundImage: `url(${newsDoc.photoUrl})` }}></p>
                            <article className="card-body">
                                <header>
                                    <div>
                                        <div className="top">
                                            <span className="pre-heading">Blog</span>
                                        </div>
                                        <div className="title">
                                            <h3>{newsDoc.title}</h3>
                                        </div>
                                        <p className="meta">
                                            <span className="author">{newsDoc.place}</span>
                                            <span> | </span>
                                            <time className="updated">{newsDoc.date}</time>
                                        </p>
                                    </div>
                                </header>
                                <div className="chips">
                                    <a className="chip">TDCA</a>
                                    <a className="chip">Cricket</a>
                                </div>
                            </article>
                        </li>
                    </ul>
                    {isModalOpen ? <NewsEdit setModalOpen={setModalOpen} newsDoc={newsDoc} /> : null}
                </div>
            )}
        </div>
    );
};
export default NewsCard;
