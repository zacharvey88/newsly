import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ArticlesList from "../components/ArticlesList";
import LoadingScreen from "../components/LoadingScreen";

export default () => {

  const [articles, setArticles] = useState([])
  const {topic} = useParams()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    axios.get(`https://nc-news-ngma.onrender.com/api/articles?topic=${topic}`)
    .then((response)=>{
      setArticles(response.data.articles)
      setIsLoading(false)
    })
    .catch((err)=>{
      console.log(err);
    })
  },[topic])

  return isLoading ? <LoadingScreen /> : <ArticlesList articles={articles}/>
}