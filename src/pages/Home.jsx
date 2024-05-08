import FeaturedArticleLarge from "../components/FeaturedArticleLarge";
import FeaturedArticleSmall from "../components/FeaturedArticleSmall";
import RecentPosts from "../components/RecentPosts";
import SidebarCard from "../components/SidebarCard";
import Pagination from "../components/Pagination";
import ArticlesList from "../components/ArticlesList";
import axios from "axios";
import { useEffect, useState } from "react";

export default () => {

  const [articles, setArticles] = useState([])

  useEffect(()=>{
    axios.get("https://nc-news-ngma.onrender.com/api/articles?sort_by=votes")
    .then((response)=>{
      setArticles(response.data.articles)
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  return (
<main className="container">
  <FeaturedArticleLarge article={articles[0]}/>
  <FeaturedArticleSmall articles={articles.slice(1,3)}/>
  <div className="row g-5">
    <div className="col-md-8">
      <ArticlesList articles={articles.slice(3)}/>
      <Pagination />
    </div>
    <div className="col-md-4">
      <div className="position-sticky">
    <SidebarCard />
    <RecentPosts articles={articles}/>
      </div>
    </div>
  </div>
</main>
  )
}

