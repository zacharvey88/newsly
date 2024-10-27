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

  // New state for modal editing
  const [showEditModal, setShowEditModal] = useState(false);
  const [editType, setEditType] = useState(null); // 'article' or 'comment'
  const [editData, setEditData] = useState(null); // Holds the current article/comment data

  useEffect(() => {
      fetchUserArticles();
      fetchUserComments();
  }, []);

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

  // Function to open edit modal and set the item to edit
  const openEditModal = (type, itemData) => {
    setEditType(type);
    setEditData(itemData);
    setShowEditModal(true);
  };

  // Function to handle form submission
  const handleSaveChanges = async () => {
    try {
      if (editType === "article") {
        await axios.patch(`https://nc-news-ngma.onrender.com/api/articles/${editData.article_id}`, {
          title: editData.title,
          body: editData.body,
          article_img_url: editData.article_img_url
        });
        fetchUserArticles();
      } else if (editType === "comment") {
        await axios.patch(`https://nc-news-ngma.onrender.com/api/comments/${editData.comment_id}`, {
          body: editData.body
        });
        fetchUserComments();
      }
      setShowEditModal(false);
    } catch (error) {
      setErrorMessage("Error updating the item.");
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="container dashboard-container">
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit {editType === "article" ? "Article" : "Comment"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                {editType === "article" ? (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editData.title || ""}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Body</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={editData.body || ""}
                        onChange={(e) => setEditData({ ...editData, body: e.target.value })}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image URL</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editData.article_img_url || ""}
                        onChange={(e) => setEditData({ ...editData, article_img_url: e.target.value })}
                      />
                    </div>
                  </>
                ) : (
                  <div className="mb-3">
                    <label className="form-label">Comment</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={editData.body || ""}
                      onChange={(e) => setEditData({ ...editData, body: e.target.value })}
                    ></textarea>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {/* Articles Section */}
        <div className="col-md-6">
          <h4>Your Articles</h4>
          <ul>
            {articles.map((article) => (
              <li key={article.article_id}>
                <div>
                  {article.title}
                  <button
                    onClick={() => openEditModal("article", article)}
                    data-bs-toggle="modal" data-bs-target="#editModal"
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Comments Section */}
        <div className="col-md-6">
          <h4>Your Comments</h4>
          <ul>
            {comments.map((comment) => (
              <li key={comment.comment_id}>
                <div>
                  {comment.body}
                  <button
                    onClick={() => openEditModal("comment", comment)}
                    data-bs-toggle="modal" data-bs-target="#editModal"
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
