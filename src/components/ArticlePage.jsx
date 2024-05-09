import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentsSection from "./CommentsSection";

export default () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [liked, setLiked] = useState(false);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    const storedLike = JSON.parse(localStorage.getItem(`liked_${article_id}`));
    if (storedLike !== null) {
      setLiked(storedLike);
    }

    axios
      .get(`https://nc-news-ngma.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data.article);
        setVotes(response.data.article.votes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [article_id]);

  const handleLike = () => {
    setLiked(true);
    setVotes(votes + 1);
    localStorage.setItem(`liked_${article_id}`, JSON.stringify(true));
    axios
      .patch(`https://nc-news-ngma.onrender.com/api/articles/${article_id}`, {
        inc_votes: votes + 1,
      })
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnlike = () => {
    setLiked(false);
    setVotes(votes - 1);
    localStorage.setItem(`liked_${article_id}`, JSON.stringify(false));
    axios
      .patch(`https://nc-news-ngma.onrender.com/api/articles/${article_id}`, {
        inc_votes: votes - 1,
      })
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8">
          <article>
            <header className="mb-4">
              <h1 className="fw-bolder mb-1">{article.title}</h1>
              <div className="text-muted fst-italic mb-2">
                Posted on {article.created_at} by {article.author}
              </div>
              <a
                className="badge bg-secondary text-decoration-none link-light"
                href="#!"
              >
                {article.topic}
              </a>
            </header>
            <figure className="mb-4">
              <img
                className="img-fluid rounded article-page-img"
                src={article.article_img_url}
              />
            </figure>
            <p className="likes">
              <i
                className={
                  liked
                    ? "like-btn fa-solid fa-heart disabled"
                    : "like-btn fa-regular fa-heart"
                }
                onClick={liked ? handleUnlike : handleLike}
              ></i>{" "}
              {votes}
            </p>
            <section className="mb-5">
              <p className="fs-5 mb-4">{article.body}</p>
            </section>
          </article>
          <CommentsSection article_id={article.article_id} />
        </div>
      </div>
    </div>
  );
};
