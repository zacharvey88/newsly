import FeaturedArticleLarge from "../components/FeaturedArticleLarge";
import FeaturedArticleSmall from "../components/FeaturedArticleSmall";
import RecentPosts from "../components/RecentPosts";
import SidebarCard from "../components/SidebarCard";
import ArticlesList from "../components/ArticlesList";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import LoadingScreen from "../utilities/LoadingScreen";
import Pagination from "../utilities/Pagination";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [articlesByVotes, setArticlesByVotes] = useState([]);
  const [articlesByCommentCount, setArticlesByCommentCount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);
  const limit = 10;

  const articlesListRef = useRef(null);

  useEffect(() => {
    axios
      .get(`https://nc-news-ngma.onrender.com/api/articles?sort_by=votes&limit=${limit}`)
      .then((response) => {
        setTotalArticles(response.data.total_count);
        setArticlesByVotes(response.data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://nc-news-ngma.onrender.com/api/articles?sort_by=comment_count&limit=3`)
      .then((response) => {
        setArticlesByCommentCount(response.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://nc-news-ngma.onrender.com/api/articles?sort_by=votes&limit=${limit}&offset=${offset}`)
      .then((response) => {
        setArticles(response.data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [offset]);

  const handleOffsetChange = (newOffset) => {
    if (newOffset >= 0 && newOffset < totalArticles) {
      setOffset(newOffset);
      if (articlesListRef.current) {
        articlesListRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <main className="container">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <FeaturedArticleLarge article={articlesByVotes[0]} />
          <FeaturedArticleSmall articles={articlesByVotes.slice(1, 3)} />
          <div className="row g-5">
            <div className="col-md-8">
              <div ref={articlesListRef}>
                <ArticlesList 
                  articles={articles.filter(
                    (article) =>
                      !articlesByVotes.slice(0, 3).map(topArticle => topArticle.article_id).includes(article.article_id) &&
                      !articlesByCommentCount.slice(0, 3).map(topArticle => topArticle.article_id).includes(article.article_id)
                  )}
                />
              </div>
              <Pagination
                currentOffset={offset}
                limit={limit}
                totalArticles={totalArticles}
                onOffsetChange={handleOffsetChange}
              />
            </div>
            <div className="col-md-4">
              <div className="position-sticky">
                <SidebarCard />
                <RecentPosts articles={articlesByCommentCount.slice(0, 3)} />
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
