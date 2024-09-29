import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
import moment from "moment";
import LoadingScreen from "../utilities/LoadingScreen";

export default function UserDashboard() {
  const { user } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [articleSortBy, setArticleSortBy] = useState('created_at');
  const [articleSortOrder, setArticleSortOrder] = useState('desc');
  const [commentSortBy, setCommentSortBy] = useState('created_at');
  const [commentSortOrder, setCommentSortOrder] = useState('desc');

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

  const sortArticles = (articles) => {
    return [...articles].sort((a, b) => {
      if (articleSortOrder === 'asc') {
        return a[articleSortBy] > b[articleSortBy] ? 1 : -1;
      } else {
        return a[articleSortBy] < b[articleSortBy] ? 1 : -1;
      }
    });
  };

  const sortComments = (comments) => {
    return [...comments].sort((a, b) => {
      if (commentSortOrder === 'asc') {
        return a[commentSortBy] > b[commentSortBy] ? 1 : -1;
      } else {
        return a[commentSortBy] < b[commentSortBy] ? 1 : -1;
      }
    });
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="container dashboard-container">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <div className="row">
            {/* Articles Section */}
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4>Your Articles</h4>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="articleSortDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sort By
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="articleSortDropdown">
                      <li><button className="dropdown-item" onClick={() => setArticleSortBy('created_at')}>Date</button></li>
                      <li><button className="dropdown-item" onClick={() => setArticleSortBy('title')}>Title</button></li>
                      <li><button className="dropdown-item" onClick={() => setArticleSortBy('topic')}>Topic</button></li>
                      <div className="dropdown-divider"></div>
                      <li><button className="dropdown-item" onClick={() => setArticleSortOrder('asc')}>Ascending</button></li>
                      <li><button className="dropdown-item" onClick={() => setArticleSortOrder('desc')}>Descending</button></li>
                    </ul>
                  </div>
                </div>
                <ul className="list-group list-group-flush">
                  {sortArticles(articles).length > 0 ? (
                    sortArticles(articles).map((article) => (
                      <li key={article.article_id} className="list-group-item">
                        {/* Article Topic and Date */}
                        <div className="article-meta mb-1" >
                          <span className="badge bg-secondary text-decoration-none me-3">{article.topic}</span>
                          <span className="text-muted small">Posted on {moment(article.created_at).format("DD MMM YYYY")}</span>
                        </div>
                        {/* Article Title */}
                        <Link to={`/articles/${article.article_id}`} className="article-title">
                          {article.title}
                        </Link>
                        {/* Edit and Delete Buttons */}
                        <div className="mt-2 d-flex justify-content-end">
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
            </div>

            {/* Comments Section */}
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4>Your Comments</h4>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="commentSortDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sort By
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="commentSortDropdown">
                      <li><button className="dropdown-item" onClick={() => setCommentSortBy('created_at')}>Date</button></li>
                      <li><button className="dropdown-item" onClick={() => setCommentSortBy('article_id')}>Article</button></li>
                      <div className="dropdown-divider"></div>
                      <li><button className="dropdown-item" onClick={() => setCommentSortOrder('asc')}>Ascending</button></li>
                      <li><button className="dropdown-item" onClick={() => setCommentSortOrder('desc')}>Descending</button></li>
                    </ul>
                  </div>
                </div>
                <ul className="list-group list-group-flush">
                  {sortComments(comments).length > 0 ? (
                    sortComments(comments).map((comment) => (
                      <li key={comment.comment_id} className="list-group-item">
                        {/* Comment Date and Article */}
                        <div className="comment-meta mb-1">
                          <span>Posted on {moment(comment.created_at).format("DD MMM YYYY")}</span>{" "}
                          <Link to={`/articles/${comment.article_id}`} className="article-name">
                            in {comment.article_title}
                          </Link>
                        </div>
                        {/* Comment Body */}
                        <span>{comment.body}</span>
                        {/* Edit and Delete Buttons */}
                        <div className="mt-2 d-flex justify-content-end">
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
      </div>
    </div>
  );
}
