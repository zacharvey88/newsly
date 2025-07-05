import { useParams, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ArticlesList from "../components/ArticlesList";
import LoadingScreen from "../utilities/LoadingScreen";
import ResultsHeader from "../components/ResultsHeader";
import queryString from 'query-string';

export default () => {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [toggled, setToggled] = useState(false);
  const [isError, setIsError] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");

  useEffect(() => {
    let query = `https://newsly-piuq.onrender.com/api/articles`;

    if (topic) {
      query += `?topic=${topic}`;
    } else if (searchTerm) {
      query += `?search=${searchTerm}`; 
    }

    if (sortBy) {
      query += `&sort_by=${sortBy}`;
    }

    if (toggled) {
      query += `&sort_dir=asc`;
    }

    axios
      .get(query)
      .then((response) => {
        setArticles(response.data.articles);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        console.log(err);
        err.response?.status === 404 ? setIsError(true) : null;
      });

    const urlParams = { sort_by: sortBy, sort_dir: toggled ? 'asc' : 'desc' };
    const url = queryString.stringify(urlParams);
    window.history.replaceState({}, '', `/${topic || "search"}${url ? `?${url}` : ''}`);
  }, [topic, sortBy, toggled, searchTerm]);

  return isError ? (
    <Navigate to="/not-found" state={"topic"} />
  ) : (
    isLoading ? (
      <LoadingScreen />
    ) : (
      <section className="container">
        <ResultsHeader
          articles={articles}
          sortBy={sortBy}
          setSortBy={setSortBy}
          toggled={toggled}
          setToggled={setToggled}
          searchTerm={searchTerm}
        />
        <ArticlesList articles={articles} />
      </section>
    )
  );
};
