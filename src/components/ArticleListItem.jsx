import React from 'react';
import moment from 'moment';

const ArticleListItem = ({ article, openDeleteModal, openEditModal }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">{article.title}</div>
        <small className="text-muted">Published on {moment(article.created_at).format('MMM Do YYYY')}</small>
      </div>
      <div>
        <button className="btn btn-outline-primary btn-sm me-2" onClick={openEditModal}>
          Edit
        </button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => openDeleteModal('article', article.article_id, `Are you sure you want to delete the article "${article.title}"?`)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ArticleListItem;
