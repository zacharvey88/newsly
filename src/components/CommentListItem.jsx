import React from 'react';
import moment from 'moment';

const CommentListItem = ({ comment, openDeleteModal, handleEdit }) => {
  const trimText = (text) => {
    if (text.length <= 100) return text;
    const trimmed = text.substring(0, 100);
    return trimmed.substring(0, trimmed.lastIndexOf(' ')) + '...';
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">
          {comment.article_title} by {comment.author}
        </div>
        <div dangerouslySetInnerHTML={{ __html: trimText(comment.body) }} />
        <small className="text-muted">
          Posted on {moment(comment.created_at).format('MMM Do YYYY')}
        </small>
      </div>
      <div className="d-flex gap-2">
        <button 
          className="btn btn-outline-primary btn-sm" 
          onClick={handleEdit}
          title="Edit"
        >
          <i className="bi bi-pencil"></i>
        </button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => openDeleteModal('comment', comment.comment_id, `Are you sure you want to delete this comment?`)}
          title="Delete"
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </li>
  );
};

export default CommentListItem;