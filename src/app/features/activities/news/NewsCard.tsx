import React from 'react';
import News from '../../../../models/News';
import LoadingComp from '../../../shared_components/loading_comp/LoadingComp';
import '../../../role_content/admin_panel/features/activities/news/news_card/NewsCard.scss';

type NewsCardProps = {
    newsDoc: News;
};

const NewsCard: React.FC<NewsCardProps> = ({ newsDoc }) => {
    return (
        <div>
            {newsDoc == undefined ? (
                <LoadingComp />
            ) : (
                <div>
                    <ul className="cardUl" key={newsDoc.docId ?? ''}>
                        <li className="card">
                            <p className="featured-image" style={{ backgroundImage: `url(${newsDoc.photoUrl})` }}></p>
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
                                    <p className="chip">{newsDoc.tag}</p>
                                    <p className="chip">TDCA</p>
                                </div>
                            </article>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};
export default NewsCard;
