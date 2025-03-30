import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .get("https://newsly-piuq.onrender.com/api/topics")
      .then((response) => {
        setTopics(response.data.topics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formattedTopics = topics.map((topic)=>{
    const splitTopic = topic.slug.split("-").map((word)=>{
      return `${word[0].toUpperCase()}${word.slice(1,word.length)}`
    })
    return {...topic, nav: splitTopic.join(" ")}
  })

  return (
    <div className="nav-scroller py-1 mb-3 border-bottom">
      <nav className="nav nav-underline justify-content-between">
        <Link className="nav-item nav-link link-body-emphasis active" to="/">
          All
        </Link>
        {formattedTopics.map((topic) => {
          return (
            <Link
              key={topic.slug}
              className="nav-item nav-link link-body-emphasis"
              to={`/${topic.slug}/articles`}
            >
              {topic.nav}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
