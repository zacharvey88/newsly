import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
import moment from "moment";
import LoadingScreen from "../utilities/LoadingScreen";
import Modal from "react-modal"; // React Modal for edit

export default function UserDashboard() {
  const { user } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [articleSortBy, setArticleSortBy] = useState("created_at");
  const [articleSortOrder, setArticleSortOrder] = useState("desc");
  const [commentSortBy, setCommentSortBy] = useState("created_at");
  const [commentSortOrder, setCommentSortOrder] = useState("desc");

  const [articleDisplayCount, setArticleDisplayCount] = useState(10);
  const [commentDisplayCount, setCommentDisplayCount] = useState(10);

  const [editMode, setEditMode] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  const [editContent, setEditContent] = useState({
    title: "",
    body: "",
    article_img_url: ""
  });

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
      setErrorMessage(
        "There was a problem loading your dashboard. Please try refreshing the page."
      );
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
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await axios.delete(
          `https://nc-news-ngma.onrender.com/api/articles/${articleId}`
        );
        setArticles(
          articles.filter((article) => article.article_id !== articleId)
        );
      } catch (error) {
        setErrorMessage("Error deleting article.");
      }
    }
  };

  const handleDeleteAllArticles = async () => {
    if (window.confirm("Are you sure you want to delete all articles?")) {
      try {
        await Promise.all(
          articles.map((article) =>
            axios.delete(
              `https://nc-news-ngma.onrender.com/api/articles/${article.article_id}`
            )
          )
        );
        setArticles([]);
      } catch (error) {
        setErrorMessage("Error deleting all articles.");
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await axios.delete(
          `https://nc-news-ngma.onrender.com/api/comments/${commentId}`
        );
        setComments(
          comments.filter((comment) => comment.comment_id !== commentId)
        );
      } catch (error) {
        setErrorMessage("Error deleting comment.");
      }
    }
  };

  const handleDeleteAllComments = async () => {
    if (window.confirm("Are you sure you want to delete all comments?")) {
      try {
        await Promise.all(
          comments.map((comment) =>
            axios.delete(
              `https://nc-news-ngma.onrender.com/api/comments/${comment.comment_id}`
            )
          )
        );
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
      if (articleSortOrder === "asc") {
        return a[articleSortBy] > b[articleSortBy] ? 1 : -1;
      } else {
        return a[articleSortBy] < b[articleSortBy] ? 1 : -1;
      }
    });
  };

  const sortComments = (comments) => {
    return [...comments].sort((a, b) => {
      if (commentSortOrder === "asc") {
        return a[commentSortBy] > b[commentSortBy] ? 1 : -1;
      } else {
        return a[commentSortBy] < b[commentSortBy] ? 1 : -1;
      }
    });
  };

  const handleEditArticle = (article) => {
    setEditMode(true);
    setCurrentEdit(article);
    setEditContent({
      title: article.title,
      body: article.body,
      article_img_url: article.article_img_url
    });
  };

  const handleEditComment = (comment) => {
    setEditMode(true);
    setCurrentEdit(comment);
    setEditContent({
      body: comment.body
    });
  };

  const handleSaveEdit = async () => {
    try {
      if (currentEdit.article_id) {
        await axios.patch(
          `/api/articles/${currentEdit.article_id}`,
          editContent
        );
        fetchUserArticles();
      } else if (currentEdit.comment_id) {
        await axios.patch(`/api/comments/${currentEdit.comment_id}`, {
          body: editContent.body
        });
        fetchUserComments();
      }
      setEditMode(false);
      setCurrentEdit(null);
      alert("Changes saved successfully!");
    } catch (error) {
      setErrorMessage("Error saving changes.");
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setCurrentEdit(null);
  };

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="container dashboard-container">
      <Modal
        isOpen={editMode}
        onRequestClose={handleCancelEdit}
        ariaHideApp={false}
        className="edit-modal"
        overlayClassName="edit-modal-overlay"
      >
        <h5>Edit {currentEdit?.article_id ? "Article" : "Comment"}</h5>
        <form>
          {currentEdit?.article_id && (
            <>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={editContent.title}
                  onChange={(e) =>
                    setEditContent({ ...editContent, title: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  value={editContent.article_img_url}
                  onChange={(e) =>
                    setEditContent({
                      ...editContent,
                      article_img_url: e.target.value
                    })
                  }
                  className="form-control"
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label>Body</label>
            <textarea
              value={editContent.body}
              onChange={(e) =>
                setEditContent({ ...editContent, body: e.target.value })
              }
              className="form-control"
              rows="5"
            />
          </div>
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleSaveEdit}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary mt-3"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        </form>
      </Modal>

      <div className="row justify-content-center">
        <div className="col-lg-10">
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <div className="row">
            {/* Articles Section */}
            <div className="col-md-6">
              <h4>Your Articles</h4>
              {articles.length === 0 ? (
                <p>No articles found.</p>
              ) : (
                <ul className="list-group">
                  {sortArticles(articles)
                    .slice(0, articleDisplayCount)
                    .map((article) => (
                      <li key={article.article_id} className="list-group-item">
                        <h5>{article.title}</h5>
                        <p>{article.body.slice(0, 100)}...</p>
                        <small>
                          {moment(article.created_at).format("MMMM Do YYYY")}
                        </small>
                        <div className="mt-2">
                          <button
                            className="btn btn-primary btn-sm mr-2"
                            onClick={() => handleEditArticle(article)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteArticle(article.article_id)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
              {articles.length > articleDisplayCount && (
                <button
                  className="btn btn-secondary mt-3"
                  onClick={loadMoreArticles}
                >
                  Load More
                </button>
              )}
              <button
                className="btn btn-danger mt-3"
                onClick={handleDeleteAllArticles}
              >
                Delete All Articles
              </button>
            </div>

            {/* Comments Section */}
            <div className="col-md-6">
              <h4>Your Comments</h4>
              {comments.length === 0 ? (
                <p>No comments found.</p>
              ) : (
                <ul className="list-group">
                  {sortComments(comments)
                    .slice(0, commentDisplayCount)
                    .map((comment) => (
                      <li key={comment.comment_id} className="list-group-item">
                        <p>{comment.body}</p>
                        <small>
                          {moment(comment.created_at).format("MMMM Do YYYY")}
                        </small>
                        <div className="mt-2">
                          <button
                            className="btn btn-primary btn-sm mr-2"
                            onClick={() => handleEditComment(comment)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteComment(comment.comment_id)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
              {comments.length > commentDisplayCount && (
                <button
                  className="btn btn-secondary mt-3"
                  onClick={loadMoreComments}
                >
                  Load More
                </button>
              )}
              <button
                className="btn btn-danger mt-3"
                onClick={handleDeleteAllComments}
              >
                Delete All Comments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
