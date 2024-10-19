import FeaturedArticleLarge from "../components/FeaturedArticleLarge";
import FeaturedArticleSmall from "../components/FeaturedArticleSmall";
import RecentPosts from "../components/RecentPosts";
import SidebarCard from "../components/SidebarCard";
import ArticlesList from "../components/ArticlesList";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingScreen from "../utilities/LoadingScreen";
import Pagination from "../utilities/Pagination";

export default function ArticlesPage() {  
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0); 
  const [totalArticles, setTotalArticles] = useState(0);
  const limit = 10; 

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://nc-news-ngma.onrender.com/api/articles?sort_by=votes&limit=${limit}&offset=${offset}`)
      .then((response) => {
        setArticles(response.data.articles);
        setTotalArticles(response.data.total_count);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [offset]); 

  const handleOffsetChange = (newOffset) => {
    // Ensure the new offset is within valid boundaries
    if (newOffset >= 0 && newOffset < totalArticles) {
      setOffset(newOffset);
    }
  };

  return (
    <main className="container">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <FeaturedArticleLarge article={articles[0]} />
          <FeaturedArticleSmall articles={articles.slice(1, 3)} />
          <div className="row g-5">
            <div className="col-md-8">
              <ArticlesList articles={articles.slice(3)} />
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
                <RecentPosts articles={articles} />
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
