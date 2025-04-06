import React from 'react';
import moment from 'moment';

const CommentListItem = ({ comment, openDeleteModal, handleEdit }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div dangerouslySetInnerHTML={{ __html: comment.body }} />
        <small className="text-muted">Posted on {moment(comment.created_at).format('MMM Do YYYY')}</small>
      </div>
      <div>
        <button className="btn btn-outline-primary btn-sm me-2" onClick={handleEdit}>
          Edit
        </button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => openDeleteModal('comment', comment.comment_id, `Are you sure you want to delete this comment?`)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default CommentListItem;
