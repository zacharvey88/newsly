import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ArticlesList from "../components/ArticlesList";
import LoadingScreen from "../utilities/LoadingScreen";
import ResultsHeader from "../components/ResultsHeader";
import queryString from 'query-string';

export default () => {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [toggled, setToggled] = useState(false);
  const urlParams = {};
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    let query = `https://nc-news-ngma.onrender.com/api/articles?topic=${topic}`;

    if (sortBy) {
      query += `&sort_by=${sortBy}`;
      urlParams.sort_by = sortBy;
    }

    if (toggled) {
      query += `&sort_dir=asc`;
      urlParams.sort_dir = 'asc';
    }

    axios
      .get(query)
      .then((response) => {
        setArticles(response.data.articles);
        setIsLoading(false);
        setIsError(false)
      })
      .catch((err) => {
        console.log(err);
        err.response.status === 404 ? setIsError(true) : null
      })

      const url = queryString.stringify(urlParams);
      window.history.pushState({}, '', `/${topic}/articles${url ? `?${url}` : ''}`);

  }, [topic, sortBy, toggled]);

  return isError ? <Navigate to="/not-found" state={"topic"}/> : ( 
      isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <ResultsHeader
            articles={articles}
            sortBy={sortBy}
            setSortBy={setSortBy}
            toggled={toggled}
            setToggled={setToggled}
          />
          <ArticlesList articles={articles} />
        </>
      )
    )
};
