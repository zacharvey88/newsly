import FeaturedArticleLarge from "../components/FeaturedArticleLarge";
import FeaturedArticleSmall from "../components/FeaturedArticleSmall";
import RecentPosts from "../components/RecentPosts";
import SidebarCard from "../components/SidebarCard";
import ArticlesList from "../components/ArticlesList";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import LoadingScreen from "../utilities/LoadingScreen";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [articlesByVotes, setArticlesByVotes] = useState([]);
  const [articlesByCommentCount, setArticlesByCommentCount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const limit = 10;
  const articlesListRef = useRef(null);

  useEffect(() => {
    axios
      .get(`https://newsly-piuq.onrender.com/api/articles?limit=${limit}`)
      .then((response) => {
        setTotalArticles(response.data.total_count);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://newsly-piuq.onrender.com/api/articles?sort_by=votes&limit=3`)
      .then((response) => {
        setArticlesByVotes(response.data.articles);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://newsly-piuq.onrender.com/api/articles?sort_by=comment_count&limit=3`)
      .then((response) => {
        setArticlesByCommentCount(response.data.articles);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (offset === 0) {
      setIsLoading(true);
    } else {
      setIsLoadMoreLoading(true);
    }

    axios
      .get(`https://newsly-piuq.onrender.com/api/articles?limit=${limit}&offset=${offset}`)
      .then((response) => {
        setArticles((prevArticles) => [...prevArticles, ...response.data.articles]);
        setIsLoading(false);
        setIsLoadMoreLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setIsLoadMoreLoading(false);
      });
  }, [offset]);

  const handleLoadMore = () => {
    const newOffset = offset + limit;
    if (newOffset < totalArticles) {
      setOffset(newOffset);
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

              {articles.length < totalArticles && (
                <div className="d-flex justify-content-start mb-2">
                  <button
                    className="btn btn-primary load-more-btn"
                    onClick={handleLoadMore}
                    disabled={isLoadMoreLoading}
                    style={{
                      backgroundColor: "rgb(52, 82, 132)",
                      borderColor: "rgb(52, 82, 132)",
                    }}
                  >
                    {isLoadMoreLoading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
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
