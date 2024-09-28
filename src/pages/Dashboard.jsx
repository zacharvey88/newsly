import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/User";
import LoadingScreen from "../utilities/LoadingScreen";

export default function UserDashboard() {
  const { user } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      fetchUserArticles();
      fetchUserComments();
    }
  }, [user]);

  const fetchUserArticles = async () => {
    try {
      const response = await axios.get(
        `https://nc-news-ngma.onrender.com/api/articles?author=${user.username}`
      );
      setArticles(response.data.articles);
    } catch (error) {
      setErrorMessage("Error fetching your articles.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserComments = async () => {
    try {
      const response = await axios.get(
        `https://nc-news-ngma.onrender.com/api/users/${user.username}/comments`
      );
      setComments(response.data.comments);
    } catch (error) {
      setErrorMessage("Error fetching your comments.");
    }
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      await axios.delete(`https://nc-news-ngma.onrender.com/api/articles/${articleId}`);
      setArticles(articles.filter((article) => article.article_id !== articleId));
    } catch (error) {
      setErrorMessage("Error deleting article.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`https://nc-news-ngma.onrender.com/api/comments/${commentId}`);
      setComments(comments.filter((comment) => comment.comment_id !== commentId));
    } catch (error) {
      setErrorMessage("Error deleting comment.");
    }
  };

  const handleEditArticle = (articleId) => {

  };

  const handleEditComment = (commentId) => {

  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <div className="card mb-4">
            <div className="card-header">
              <h4>Your Articles</h4>
            </div>
            <ul className="list-group list-group-flush">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <li key={article.article_id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{article.title}</span>
                    <div>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEditArticle(article.article_id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteArticle(article.article_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="list-group-item">You haven't written any articles yet.</li>
              )}
            </ul>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <h4>Your Comments</h4>
            </div>
            <ul className="list-group list-group-flush">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <li key={comment.comment_id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{comment.body}</span>
                    <div>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEditComment(comment.comment_id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteComment(comment.comment_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="list-group-item">You haven't left any comments yet.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
