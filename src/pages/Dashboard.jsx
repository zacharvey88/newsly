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

  useEffect(() => {
    if (!user) {
      window.location.href = '/login'; // Redirect to login if user logs out
    }
  }, [user]);

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
                  <p>Total Articles: {articles.length}</p>
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
                        style={{ fontSize: '0.8rem' }}
                        type="button"
                        id="articleSortDropdown"  
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Sort By
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="articleSortDropdown">
                        <li><button className="dropdown-item" onClick={() => setArticleSortBy('created_at')}>Date {articleSortBy === 'created_at' && <i className="fas fa-check"></i>}</button></li>
                        <li><button className="dropdown-item" onClick={() => setArticleSortBy('title')}>Title {articleSortBy === 'title' && <i className="fas fa-check"></i>}</button></li>
                        <li><button className="dropdown-item" onClick={() => setArticleSortBy('topic')}>Topic {articleSortBy === 'topic' && <i className="fas fa-check"></i>}</button></li>
                        <li><button className="dropdown-item" onClick={() => setArticleSortBy('comment_count')}>Comments {articleSortBy === 'comment_count' && <i className="fas fa-check"></i>}</button></li>
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
                        {/* Article Topic and Date with Link Icon */}
                        <div className="article-meta mb-1 d-flex justify-content-between align-items-center">
                          <div>
                            <span className="badge bg-secondary text-decoration-none me-3">{article.topic}</span>
                            <span className="text-muted small">Posted on {moment(article.created_at).format("DD MMM YYYY")}</span>
                          </div>
                          <Link to={`/articles/${article.article_id}`} className="ms-auto">
                            <i className="fas fa-link"></i>
                          </Link>
                        </div>
                        {/* Article Title (no link) */}
                        <div className="article-title">{article.title}</div>
                        <div className="article-preview text-muted small">{article.body.slice(0, 100)}...</div>
                        {/* Comment and Like Count */}
                        <div className="d-flex justify-content-end align-items-center">
                          <span className="me-3">
                            <i className="fas fa-comments"></i> {article.comment_count} 
                          </span>
                          <span className="me-3">
                            <i className="fas fa-thumbs-up"></i> {article.votes}
                          </span>
                        </div>
                        {/* Edit and Delete Icons */}
                        <div className="mt-2 d-flex justify-content-end">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEditArticle(article.article_id)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteArticle(article.article_id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item">No articles available</li>
                  )}
                </ul>
                {articles.length > articleDisplayCount && (
                  <div className="card-footer">
                    <button className="btn btn-primary btn-sm" onClick={loadMoreArticles}>
                      Show More
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Comments Section */}
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4>Your Comments</h4>
                  <p>Total Comments: {comments.length}</p>
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
                        style={{ fontSize: '0.8rem' }}
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
                        <div className="comment-meta mb-1 d-flex justify-content-between align-items-center">
                          <span className="text-muted small">
                            {moment(comment.created_at).format("DD MMM YYYY")} on Article: <Link to={`/articles/${comment.article_id}`}>{comment.article_title}</Link>
                          </span>
                        </div>
                        <div className="comment-body">{comment.body}</div>
                        {/* Like Count */}
                        <div className="d-flex justify-content-end align-items-center">
                          <span>
                            <i className="fas fa-thumbs-up"></i> {comment.votes}
                          </span>
                        </div>
                        {/* Delete Icon */}
                        <div className="mt-2 d-flex justify-content-end">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteComment(comment.comment_id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item">No comments available</li>
                  )}
                </ul>
                {comments.length > commentDisplayCount && (
                  <div className="card-footer">
                    <button className="btn btn-primary btn-sm" onClick={loadMoreComments}>
                      Show More
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
