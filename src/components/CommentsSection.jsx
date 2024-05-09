import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

export default ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(
        `https://nc-news-ngma.onrender.com/api/articles/${article_id}/comments`
      )
      .then((response) => {
        setComments(response.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [article_id]);

  const handleAddComment = (e) => {
    e.preventDefault();

    if (!commentBody) {
      setIsEmpty(false);
      return;
    } else {
      setIsEmpty(true);
      setDisabled(true);

      const newComment = {
        username: user.username,
        body: commentBody,
      };

      axios
        .post(
          `https://nc-news-ngma.onrender.com/api/articles/${article_id}/comments`,
          newComment
        )
        .then((response) => {
          const newComment = {
            ...response.data.comment,
            avatar_url: user.avatar_url,
          };
          setComments((existingComments) => {
            return [...existingComments, newComment];
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setDisabled(false);
        });

      setCommentBody("");
    }
  };

  return (
    <section className="mb-5">
      <div className="card bg-light">
        <div className="card-body">
          <form className="mb-4 comment-form" onSubmit={handleAddComment}>
            <textarea
              className={
                isEmpty ? "form-control" : "form-control warning-border"
              }
              rows="3"
              placeholder="Join the discussion and leave a comment!"
              value={commentBody}
              onChange={(e) => {
                setCommentBody(e.target.value);
              }}
            ></textarea>
            <div className="comment-form-submit">
              <input
                type="submit"
                disabled={disabled}
                value="Post Comment"
                className="btn btn-sm btn-outline-secondary btn-comment"
              ></input>
              <p className={isEmpty && user ? "hidden" : "warning"}>
                <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                {user.username
                  ? "Please enter a comment"
                  : "You need to log in to leave a comment"}
              </p>
            </div>
          </form>
          {comments.length
            ? comments.map((comment) => {
                return (
                  <div key={comment.comment_id} className="d-flex comment">
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-circle"
                        src={comment.avatar_url}
                      />
                    </div>
                    <div className="ms-3">
                      <div className="fw-bold">
                        {comment.author}
                        <span className="comment-date">
                          {comment.created_at.slice(0, 16)}
                        </span>
                      </div>
                      {comment.body}
                    </div>
                  </div>
                );
              })
            : "There are no comments on this article yet."}
        </div>
      </div>
    </section>
  );
};
