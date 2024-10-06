import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
import moment from "moment";
import LoadingScreen from "../utilities/LoadingScreen";
import DOMPurify from "dompurify";
import DeleteConfirmation from "../utilities/DeleteModal"; 

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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");

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

const handleDeleteComment = async (commentId) => {
  try {
    await axios.delete(`https://nc-news-ngma.onrender.com/api/comments/${commentId}`);
    setComments(comments.filter((comment) => comment.comment_id !== commentId));
  } catch (error) {
    setErrorMessage("Error deleting comment.");
  }
};

const openDeleteModal = (type, id, message) => {
  setDeleteType(type);
  setDeleteId(id);
  setDeleteMessage(message);
  setShowDeleteModal(true);
};

const confirmDelete = (type, id) => {
  setShowDeleteModal(false); 
  if (type === 'article') {
    handleDeleteArticle(id);
  } else if (type === 'comment') {
    handleDeleteComment(id);
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
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        showModal={showDeleteModal}
        hideModal={() => setShowDeleteModal(false)}
        confirmModal={confirmDelete}
        id={deleteId}
        type={deleteType}
        message={deleteMessage}
      />

      {/* Edit Modal */}
      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Edit Article</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Modal content here */}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

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
                      onClick={() => handleDeleteAllArticles()}
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
                        <li><button className="dropdown-item" onClick={() => setArticleSortBy('comment_count')}>Comments {articleSortBy === 'comment_count' && <i className="fas fa-check"></i>}</button></li>
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
                        <div className="article-preview text-muted small"
                            dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(article.body.length > 150 ? article.body.substring(0, 150) + '...' : article.body),
                        }}>
                        </div>
                        <div className="mt-2 d-flex justify-content-between align-items-center">
                          <div>
                            <span className="me-3">
                              <i className="fas fa-message" style={{ color: '#345284' }}></i> {article.comment_count}
                              <i className="fas fa-thumbs-up ms-3" style={{ color: '#345284' }}></i> {article.votes}
                            </span>
                          </div>
                          <div>
                            <button
                              className="btn btn-outline-secondary btn-sm me-2"
                              data-bs-toggle="modal" data-bs-target="#exampleModalCenter"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => 
                                openDeleteModal('article', article.article_id, `Are you sure you want to delete the article "${article.title}"?`)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-muted">No articles available.</li>
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
                      onClick={() => handleDeleteAllComments()}
                    >
                      Delete All
                    </button>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary btn-sm dropdown-toggle"
                        type="button"
                        id="comment Dropdown"
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
                          <span className="text-muted small">Commented on {moment(comment.created_at).format("DD MMM YYYY")}</span>
                          <Link to={`/articles/${comment.article_id}`} className="ms-auto">
                            <i className="fas fa-link" style={{ color: '#345284' }}></i>
                          </Link>
                        </div>
                        <div>
                          {comment.body.length > 150 ? comment.body.substring(0, 150) + '...' : comment.body}
                        </div>
                        <div className="mt-2 d-flex justify-content-between align-items-center">
                          <div>
                            <span>
                              <i className="fas fa-thumbs-up" style={{ color: '#345284' }}></i> {comment.votes}
                            </span>
                          </div>
                          <div>
                            <button
                              className="btn btn-outline-secondary btn-sm me-2"
                              data-bs-toggle="modal" data-bs-target="#exampleModalCenter"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => 
                                openDeleteModal('comment', comment.comment_id, `Are you sure you want to delete this comment?`)
                              }
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-muted">No comments available.</li>
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
