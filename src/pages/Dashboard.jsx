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

  const [articleDisplayCount, setArticleDisplayCount] = useState(10);
  const [commentDisplayCount, setCommentDisplayCount] = useState(10);

  useEffect(() => {
    if (user) {
      fetchUserArticles();
      fetchUserComments();
    } 
    else {
      window.location.href = '/login'; 
    }
  }, [user]);


  const fetchUserArticles = async () => {
    try {
      const response = await axios.get(
        `https://nc-news-ngma.onrender.com/api/articles?author=${user.username}`
      );
      setArticles(response.data.articles);
    } catch (error) {
      setErrorMessage("There was a problem loading your dashboard. Please try refreshing the page.");
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

  const handleDeleteAllArticles = async () => {
    try {
      await Promise.all(articles.map(article => axios.delete(`https://nc-news-ngma.onrender.com/api/articles/${article.article_id}`)));
      setArticles([]);
    } catch (error) {
      setErrorMessage("Error deleting all articles.");
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

  const handleDeleteAllComments = async () => {
    try {
      await Promise.all(comments.map(comment => axios.delete(`https://nc-news-ngma.onrender.com/api/comments/${comment.comment_id}`)));
      setComments([]);
    } catch (error) {
      setErrorMessage("Error deleting all comments.");
    }
  };

  const loadMoreArticles = () => {
    setArticleDisplayCount(articleDisplayCount + 10);
  };

  const loadMoreComments = () => {
    setCommentDisplayCount(commentDisplayCount + 10);
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
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-danger btn-sm me-3"
                      onClick={handleDeleteAllArticles}
                    >
                      Delete All
                    </button>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary btn-sm dropdown-toggle"
                        type="button"
                        id="articleSortDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Sort By
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="articleSortDropdown">
                        <li><button className="dropdown-item" onClick={() => setArticleSortBy('created_at')}>Date {articleSortBy === 'created_at' && <i className="fas fa-check"></i>}</button></li>
                        <li><button className="dropdown-item" onClick={() => setArticleSortBy('votes')}>Likes {articleSortBy === 'votes' && <i className="fas fa-check"></i>}</button></li>
                        <div className="dropdown-divider"></div>
                        <li><button className="dropdown-item" onClick={() => setArticleSortOrder('asc')}>Ascending {articleSortOrder === 'asc' && <i className="fas fa-check"></i>}</button></li>
                        <li><button className="dropdown-item" onClick={() => setArticleSortOrder('desc')}>Descending {articleSortOrder === 'desc' && <i className="fas fa-check"></i>}</button></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <ul className="list-group list-group-flush">
                  {sortArticles(articles).slice(0, articleDisplayCount).length > 0 ? (
                    sortArticles(articles).slice(0, articleDisplayCount).map((article) => (
                      <li key={article.article_id} className="list-group-item">
                        <div className="article-meta mb-1 d-flex justify-content-between align-items-center">
                          <span className="text-muted small">Posted on {moment(article.created_at).format("DD MMM YYYY")}</span>
                          <Link to={`/articles/${article.article_id}`} className="ms-auto">
                            <i className="fas fa-link" style={{ color: '#345284' }}></i>
                          </Link>
                        </div>
                        <div>
                          {article.title}
                        </div>
                        <div className="article-preview text-muted small">
                          {article.body.length > 150 ? article.body.substring(0, 150) + '...' : article.body}
                        </div>
                        <div className="mt-2 d-flex justify-content-between align-items-center">
                          <div>
                            <span className="me-3">
                              <i className="fas fa-message" style={{ color: '#345284' }}></i> {article.comment_count}
                              <i className="fas fa-thumbs-up" style={{ color: '#345284' }}></i> {article.votes}
                            </span>
                          </div>
                          <div>
                            <button
                              className="btn btn-outline-secondary btn-sm me-2"
                              onClick={() => handleEditArticle(article)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDeleteArticle(article.article_id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item">You haven't posted any articles yet.</li>
                  )}
                </ul>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <span>Showing {Math.min(articleDisplayCount, articles.length)} of {articles.length} Articles</span>
                  {articles.length > articleDisplayCount && (
                    <button className="btn btn-primary" onClick={loadMoreArticles}>
                      Load More
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4>Your Comments</h4>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-danger btn-sm me-3"
                      onClick={handleDeleteAllComments}
                    >
                      Delete All
                    </button>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary btn-sm dropdown-toggle"
                        type="button"
                        id="commentSortDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Sort By
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="commentSortDropdown">
                        <li><button className="dropdown-item" onClick={() => setCommentSortBy('created_at')}>Date {commentSortBy === 'created_at' && <i className="fas fa-check"></i>}</button></li>
                        <li><button className="dropdown-item" onClick={() => setCommentSortBy('votes')}>Likes {commentSortBy === 'votes' && <i className="fas fa-check"></i>}</button></li>
                        <div className="dropdown-divider"></div>
                        <li><button className="dropdown-item" onClick={() => setCommentSortOrder('asc')}>Ascending {commentSortOrder === 'asc' && <i className="fas fa-check"></i>}</button></li>
                        <li><button className="dropdown-item" onClick={() => setCommentSortOrder('desc')}>Descending {commentSortOrder === 'desc' && <i className="fas fa-check"></i>}</button></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <ul className="list-group list-group-flush">
                  {sortComments(comments).slice(0, commentDisplayCount).length > 0 ? (
                    sortComments(comments).slice(0, commentDisplayCount).map((comment) => (
                      <li key={comment.comment_id} className="list-group-item">
                        <div className="article-meta mb-1 d-flex justify-content-between align-items-center">
                          <span className="text-muted small">Posted on {moment(comment.created_at).format("DD MMM YYYY")}</span>
                          <Link to={`/articles/${comment.article_id}`} className="ms-auto">
                            <i className="fas fa-link" style={{ color: '#345284' }}></i>
                          </Link>
                        </div>
                        <div className="article-preview text-muted small">{comment.body}</div>
                        <div className="mt-2 d-flex justify-content-between align-items-center">
                          <div>
                            <span className="me-3">
                              <i className="fas fa-thumbs-up" style={{ color: '#345284' }}></i> {comment.votes}
                            </span>
                          </div>
                          <div>
                            <button
                              className="btn btn-outline-secondary btn-sm me-2"
                              onClick={() => handleEditComment(comment)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDeleteComment(comment.comment_id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item">You haven't posted any comments yet.</li>
                  )}
                </ul>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <span>Showing {Math.min(commentDisplayCount, comments.length)} of {comments.length} Comments</span>
                  {comments.length > commentDisplayCount && (
                    <button className="btn btn-primary" onClick={loadMoreComments}>
                      Load More
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
