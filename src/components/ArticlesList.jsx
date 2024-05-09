import { Link } from "react-router-dom";

export default ({ articles }) => {
  if (!articles) {
    return <h3>Loading...</h3>;
  }

  return articles.map((article) => {
    return (
      <article key={article.article_id} className="blog-post">
        <Link to={`/articles/${article.article_id}`}>
          <h3 className="link-body-emphasis mb-1">{article.title}</h3>
        </Link>
        <p className="blog-post-meta">
          {article.created_at.slice(0, 10)} by {article.author}
        </p>
        <p>{article.body.slice(0, 500)}</p>
        <div className="article-stats">
          <p>
            <i className="fa-solid fa-heart"></i> {article.votes}
          </p>
          <p>
            <i className="fa-solid fa-message"></i> {article.comment_count}
          </p>
        </div>
        <hr />
      </article>
    );
  });
};
