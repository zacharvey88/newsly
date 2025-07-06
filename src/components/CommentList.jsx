import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const CommentList = ({ article, comments, openDeleteModal, handleEdit }) => {
  const trimText = (text) => {
    if (text.length <= 100) return text;
    const trimmed = text.substring(0, 100);
    return trimmed.substring(0, trimmed.lastIndexOf(' ')) + '...';
  };

  return (
    <li className="list-group-item">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <Link 
                to={`/articles/${article.article_id}`} 
                className="fw-bold text-decoration-none fs-5"
              >
                {article.title}
              </Link>
              <div className="text-muted">
                by {article.author}
              </div>
            </div>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-primary btn-sm"
                onClick={() => handleEdit({ article_id: article.article_id, title: article.title }, 'article_comments')}
                title="Edit Comments"
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button 
                className="btn btn-outline-danger btn-sm"
                onClick={() => openDeleteModal(
                  'article_comments',
                  article.article_id,
                  <>Are you sure you want to delete <strong>ALL</strong> comments for "{article.title}"?</>,
                  true
                )}
                title="Delete All Comments"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
          <ul className="list-group list-group-flush">
            {comments.map(comment => (
              <li key={comment.comment_id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="me-auto">
                    trimText(comment.body)
                    <small className="text-muted">
                      Posted on {moment(comment.created_at).format('MMM Do YYYY')}
                    </small>
                  </div>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-outline-primary btn-sm" 
                      onClick={() => handleEdit(comment, 'comment')}
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => openDeleteModal(
                        'comment', 
                        comment.comment_id, 
                        `Are you sure you want to delete this comment?`
                      )}
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default CommentList;