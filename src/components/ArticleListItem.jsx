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
    <li className="list-group-item">
      <div className="row align-items-start">
        <div className="col">
          <Link to={`/articles/${article.article_id}`} className="fw-bold text-decoration-none">
            {article.title}
          </Link>
          <div>{trimText(article.body)}</div>
        </div>
        <div className="col-auto">
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
        </div>
      </div>
      <div className="d-flex justify-content-between mt-2">
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
    </li>
  );
};

export default ArticleListItem;