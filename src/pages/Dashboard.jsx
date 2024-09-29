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
    const confirmed = window.confirm("Are you sure you want to delete this article?");
    if (confirmed) {
      try {
        await axios.delete(`https://nc-news-ngma.onrender.com/api/articles/${articleId}`);
        setArticles(articles.filter((article) => article.article_id !== articleId));
      } catch (error) {
        setErrorMessage("Error deleting article.");
      }
    }
  };

  const handleDeleteAllArticles = async () => {
    const confirmed = window.confirm("Are you sure you want to delete all articles?");
    if (confirmed) {
      try {
        await Promise.all(articles.map(article => axios.delete(`https://nc-news-ngma.onrender.com/api/articles/${article.article_id}`)));
        setArticles([]);
      } catch (error) {
        setErrorMessage("Error deleting all articles.");
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");
    if (confirmed) {
      try {
        await axios.delete(`https://nc-news-ngma.onrender.com/api/comments/${commentId}`);
        setComments(comments.filter((comment) => comment.comment_id !== commentId));
      } catch (error) {
        setErrorMessage("Error deleting comment.");
      }
    }
  };

  const handleDeleteAllComments = async () => {
    const confirmed = window.confirm("Are you sure you want to delete all comments?");
    if (confirmed) {
      try {
        await Promise.all(comments.map(comment => axios.delete(`https://nc-news-ngma.onrender.com/api/comments/${comment.comment_id}`)));
        setComments([]);
      } catch (error) {
        setErrorMessage("Error deleting all comments.");
      }
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
                </div>
                <p className="text-muted small">Total Articles: {articles.length}</p>
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
                        {/* Article Title and Preview */}
                        <div className="article-title mb-1">{article.title}</div>
                        <div className="article-preview text-muted small">{article.body.slice(0, 100)}...</div>
                        {/* Votes and Comment Count */}
                        <div className="d-flex justify-content-end align-items-center mt-2">
                          <span className="me-3">
                            <i className="fas fa-thumbs-up"></i> {article.vote_count} votes
                          </span>
                          <span className="me-3">
                            <i className="fas fa-comments"></i> {article.comment_count} comments
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
                </div>
                <p className="text-muted small">Total Comments: {comments.length}</p>
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
                        {/* Votes Count */}
                        <div className="d-flex justify-content-end align-items-center">
                          <span>
                            <i className="fas fa-thumbs-up"></i> {comment.vote_count} votes
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
