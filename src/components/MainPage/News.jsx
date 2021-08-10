import React from 'react';
import Requests from '../../http/axios-requests';

const News = () => {
  const [news, setNews] = React.useState();

  React.useEffect(() => {
    Requests.fetchNews().then((res) => {
      setNews(res.data);
    });
  }, []);
  return (
    <section className="news-reviews">
      <div className="news-reviews-content">
        <p className="main-news-reviews-title">Новости и обзоры</p>
        <div className="news-reviews-blocks">
          {news &&
            news.map((item) => {
              return (
                <div className="news-reviews-block">
                  <p className="news-reviews-date">{news && item.news_title}</p>
                  <p style={{ display: 'none' }} className="news-reviews-title">
                    У нас появилась доставка!
                  </p>
                  <p className="news-reviews-text">{news && item.news_description}</p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default News;
