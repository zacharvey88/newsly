import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ArticleListItem = ({ article, openDeleteModal, openEditModal }) => {
  const trimText = (text) => {
    if (text.length <= 100) return text;
    const trimmed = text.substring(0, 100);
    return trimmed.substring(0, trimmed.lastIndexOf(' ')) + '...';
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <Link to={`/articles/${article.article_id}`} className="fw-bold text-decoration-none">
          {article.title}
        </Link>
        <div>{trimText(article.body)}</div>
        <div className="d-flex justify-content-between mt-1">
          <small className="text-muted">
            Published on {moment(article.created_at).format('MMM Do YYYY')}
          </small>
          <small className="text-muted">
            <span className="me-3">
              <i className="bi bi-heart me-1"></i>
              {article.votes || 0}
            </span>
            <span>
              <i className="bi bi-chat me-1"></i>
              {article.comment_count || 0}
            </span>
          </small>
        </div>
      </div>
      <div className="d-flex gap-2">
        <button 
          className="btn btn-outline-primary btn-sm" 
          onClick={openEditModal}
          title="Edit"
        >
          <i className="bi bi-pencil"></i>
        </button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => openDeleteModal('article', article.article_id, `Are you sure you want to delete the article "${article.title}"?`)}
          title="Delete"
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </li>
  );
};

export default ArticleListItem;