export default ({ articles }) => {
  if (!articles) {
    return <h3>Loading...</h3>;
  }

  return (
    <ul className="articles-list">
      {articles.map((article, index) => {
        const isLastArticle = index === articles.length - 1;

        return (
          <li key={article.article_id} className="articles-list-item">
            <Link to={`/articles/${article.article_id}`}>
              <h3 className="link-body-emphasis mb-1">{article.title}</h3>
            </Link>
            <p className="blog-post-meta">
              {article.created_at.slice(0, 10)} by {article.author}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article.body.slice(0, 500)),
              }}
            ></div>
            <div className="article-stats">
              <p>
                <i className="fa-solid fa-heart"></i> {article.votes}
              </p>
              <p>
                <i className="fa-solid fa-message"></i> {article.comment_count}
              </p>
            </div>
            {!isLastArticle && <hr />}
          </li>
        );
      })}
    </ul>
  );
};
