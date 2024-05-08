import axios from "axios";
import { useEffect, useState } from "react";

export default ({article_id}) => {

  const [comments, setComments] = useState([])

useEffect(()=>{
  axios.get(`https://nc-news-ngma.onrender.com/api/articles/${article_id}/comments`)
  .then((response)=>{
    setComments(response.data.comments)
  })
  .catch((err)=>{
    console.log(err);
  })
})

  return (
    <section className="mb-5">
      <div className="card bg-light">
          <div className="card-body">
              <form className="mb-4"><textarea className="form-control" rows="3" placeholder="Join the discussion and leave a comment!"></textarea></form>
              {comments.map((comment)=>{
                return (
                  <div key={comment.comment_id} className="d-flex comment">
                    <div className="flex-shrink-0"><img className="rounded-circle" src={comment.avatar_url} /></div>
                    <div className="ms-3">
                        <div className="fw-bold">{comment.author}<span className="comment-date">{comment.created_at.slice(0,16)}</span></div>
                        {comment.body}
                    </div>
                  </div>
                )
              })}
          </div>
      </div>
    </section>
  )
}