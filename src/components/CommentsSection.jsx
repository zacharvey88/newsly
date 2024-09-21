import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

export function CommentsSection ({ article_id }) {
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  // const [isEmpty, setIsEmpty] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const { user } = useContext(UserContext);
  const [inProgress, setInProgress] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errMsg, setErrMsg] = useState("")

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

    if (!user.username) {
      setIsError(true)
      return setErrMsg("You must be logged in to comment")
    }
    else if (!commentBody) {
      setIsError(true)
      return setErrMsg("Please enter a comment")
    }

    setInProgress(true)
    setDisabled(true);

    const newComment = {
      username: user.username,
      body: commentBody,
    };

    axios
      .post(`https://nc-news-ngma.onrender.com/api/articles/${article_id}/comments`, newComment)
      .then((response) => {
        const newComment = {
          ...response.data.comment,
          avatar_url: user.avatar_url,
        };
        setComments((existingComments) => {
          return [newComment, ...existingComments];
        });
        setInProgress(false)
        setIsError(false)
        setDisabled(false);
        setCommentBody("");
      })
      .catch((err) => {
        console.log(err);
        setIsError(true)
        setErrMsg("Something went wrong. Please try again")
      })
    }

  const handleRemoveComment = (comment_id) => {
    const commentsBackup = [...comments]
    setComments((existingComments) => {
      return existingComments.filter((comment) => comment.comment_id !== comment_id);
    });
    axios.delete(`https://nc-news-ngma.onrender.com/api/comments/${comment_id}`)
    .then((response)=>{
      console.log(response.data);
    })
    .catch((err)=>{
      console.log(err);
      setIsError(true)
      setErrMsg("Something went wrong. Please try again")
      setComments(commentsBackup)
    })
  }

  return (
    <section className="mb-5">
      <div className="card bg-light">
        <div className="card-body">
          <form className="mb-4 comment-form" onSubmit={handleAddComment}>
            <textarea
              className={
                `form-control ${isError ? "warning-border" : null}`
              }
              rows="3"
              placeholder="Join the discussion! Leave a comment..."
              value={commentBody}
              onChange={(e) => {
                setCommentBody(e.target.value);
              }}
            ></textarea>
            <div className="comment-form-submit">
              <input
                type="submit"
                disabled={disabled}
                value={inProgress ? "In Progress..." : "Post Comment"}
                className="btn btn-sm btn-outline-secondary btn-comment"
              ></input>
              <p className={isError ? "warning" : "hidden"}>
                {errMsg}
              </p>
            </div>
          </form>
          {comments.length
            ? comments.map((comment) => {
                return (
                  <div key={comment.comment_id} className="d-flex">
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-circle"
                        src={comment.avatar_url}
                        alt="User avatar"
                      />
                    </div>
                    <div className="ms-3 comment">
                      <div className="fw-bold comment-meta">
                        <div>
                        {comment.author}
                        <span className="comment-date">
                          {comment.created_at.slice(0, 16)}
                        </span>
                        </div>
                        {comment.author === user.username ? 
                          <span className="delete-comment">
                            <i onClick={()=>{handleRemoveComment(comment.comment_id)}} className="fa-solid fa-trash delete-comment-icon"></i>
                          </span>
                        : null}
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
}
