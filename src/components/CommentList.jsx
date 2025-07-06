import React from 'react';
import moment from 'moment';
import DOMPurify from "dompurify"; 
import { Link } from 'react-router-dom';

const CommentList = ({ article, comments, openDeleteModal, handleEdit }) => {
  const trimText = (text) => {
    if (text.length <= 100) return text;
    const trimmed = text.substring(0, 100);
    return trimmed.substring(0, trimmed.lastIndexOf(' ')) + '...';
  };

  return (
    <li className="list-group-item">
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
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
          <div>
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
              Delete All
            </button>
          </div>
        </div>
        
        {comments.map(comment => (
          <div key={comment.comment_id} className="border-bottom pb-2 mb-2">
            <div className="d-flex justify-content-between align-items-start">
              <div className="me-auto">
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(trimText(comment.body)) }} />
                <small className="text-muted">
                  Posted on {moment(comment.created_at).format('MMM Do YYYY')}
                </small>
              </div>
              <div className="d-flex gap-1">
                <button 
                  className="btn btn-outline-primary btn-xs" 
                  onClick={() => handleEdit(comment, 'comment')}
                  title="Edit"
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-outline-danger btn-xs"
                  onClick={() => openDeleteModal(
                    'comment', 
                    comment.comment_id, 
                    `Are you sure you want to delete this comment?`
                  )}
                  title="Delete"
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </li>
  );
};

export default CommentList;