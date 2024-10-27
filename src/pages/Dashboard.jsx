import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import moment from "moment";
import LoadingScreen from "../utilities/LoadingScreen";
import DOMPurify from "dompurify";
import DeleteConfirmation from "../utilities/DeleteModal";
import { useModal } from "../contexts/ModalContext"; 

export default function UserDashboard() {
  const { user } = useContext(UserContext);
  const { openModal } = useModal(); 
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [articleSort, setArticleSort] = useState({ by: 'created_at', order: 'desc', displayCount: 10 });
  const [commentSort, setCommentSort] = useState({ by: 'created_at', order: 'desc', displayCount: 10 });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isDeleteAll, setIsDeleteAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchUserArticles(), fetchUserComments()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchUserArticles = async () => {
    try {
      const response = await axios.get(`https://nc-news-ngma.onrender.com/api/articles?author=${user.username}`);
      setArticles(response.data.articles);
    } catch (error) {
      setErrorMessage("There was a problem loading your dashboard. Please try refreshing the page.");
    }
  };

  const fetchUserComments = async () => {
    try {
      const response = await axios.get(`https://nc-news-ngma.onrender.com/api/users/${user.username}/comments`);
      setComments(response.data.comments);
    } catch (error) {
      setErrorMessage("Error fetching your comments.");
    }
  };

  const handleEdit = (article, type) => {
    openModal(article, type, true);
  };

  const handleDelete = async (type, id) => {
    try {
      const url = type === 'article' ? `https://nc-news-ngma.onrender.com/api/articles/${id}` : `https://nc-news-ngma.onrender.com/api/comments/${id}`;
      await axios.delete(url);
      if (type === 'article') {
        setArticles(articles.filter((article) => article.article_id !== id));
      } else {
        setComments(comments.filter((comment) => comment.comment_id !== id));
      }
    } catch (error) {
      setErrorMessage(`Error deleting ${type}.`);
    }
  };

  const handleDeleteAll = async (type) => {
    try {
      const ids = type === 'article' ? articles.map(article => article.article_id) : comments.map(comment => comment.comment_id);
      await Promise.all(ids.map(id => handleDelete(type, id)));
      if (type === 'article') {
        setArticles([]);
      } else {
        setComments([]);
      }
    } catch (error) {
      setErrorMessage(`Error deleting all ${type}s.`);
    }
  };

  const openDeleteModal = (type, id, message, isDeleteAll = false) => {
    setDeleteType(type);
    setDeleteId(id);
    setDeleteMessage(message);
    setIsDeleteAll(isDeleteAll);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    if (isDeleteAll) {
      await handleDeleteAll(deleteType);
    } else {
      await handleDelete(deleteType, deleteId);
    }
  };

  const loadMore = (type) => {
    if (type === 'article') {
      setArticleSort(prev => ({ ...prev, displayCount: prev.displayCount + 10 }));
    } else {
      setCommentSort(prev => ({ ...prev, displayCount: prev.displayCount + 10 }));
    }
  };

  const sortItems = (items, { by, order }) => {
    return [...items].sort((a, b) => {
      const comparison = order === 'asc' ? a[by] > b[by] : a[by] < b[by];
      return comparison ? 1 : -1;
    });
  };

  const sortedArticles = sortItems(articles, articleSort).slice(0, articleSort.displayCount);
  const sortedComments = sortItems(comments, commentSort).slice(0, commentSort.displayCount);

  if (loading) return <LoadingScreen />;

  return (
    <div className="container dashboard-container">
      <DeleteConfirmation
        showModal={showDeleteModal}
        hideModal={() => setShowDeleteModal(false)}
        confirmModal={confirmDelete}
        id={deleteId}
        type={deleteType}
        message={deleteMessage}
        isDeleteAll={isDeleteAll}
      />

      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="row">

            {/* Articles Section */}
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4>Your Articles</h4>
                  <div className="d-flex align-items-center">
                    {articles.length > 0 && (
                      <button className="btn btn-outline-danger btn-sm me-3" onClick={() => openDeleteModal('article', null, <>Are you sure you want to delete <strong>ALL</strong> articles?</>, true)}>
                        Delete All
                      </button>
                    )}
                    <SortDropdown setSort={setArticleSort} sortState={articleSort} type="article" />
                  </div>
                </div>
                <ul className="list-group list-group-flush">
                  {sortedArticles.length > 0 ? (
                    sortedArticles.map((article) => (
                      <ArticleListItem 
                        key={article.article_id} 
                        article={article} 
                        openDeleteModal={openDeleteModal} 
                        openEditModal={() => handleEdit(article, 'article')} // Pass the article data
                      />
                    ))
                  ) : (
                    <li className="list-group-item text-muted">No articles available.</li>
                  )}
                </ul>
                <CardFooter displayCount={articleSort.displayCount} totalCount={articles.length} loadMore={() => loadMore('article')} />
              </div>
            </div>

            {/* Comments Section */}
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4>Your Comments</h4>
                  <div className="d-flex align-items-center">
                    {comments.length > 0 && (
                      <button className="btn btn-outline-danger btn-sm me-3" onClick={() => openDeleteModal('comment', null, <>Are you sure you want to delete <strong>ALL</strong> comments?</>, true)}>
                        Delete All
                      </button>
                    )}
                    <SortDropdown setSort={setCommentSort} sortState={commentSort} type="comment" />
                  </div>
                </div>
                <ul className="list-group list-group-flush">
                  {sortedComments.length > 0 ? (
                    sortedComments.map((comment) => (
                      <CommentListItem 
                        key={comment.comment_id} 
                        comment={comment} 
                        openDeleteModal={openDeleteModal} 
                        handleEdit={() => handleEdit(comment, 'comment')} 
                      />
                    ))
                  ) : (
                    <li className="list-group-item text-muted">No comments available.</li>
                  )}
                </ul>
                <CardFooter displayCount={commentSort.displayCount} totalCount={comments.length} loadMore={() => loadMore('comment')} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}