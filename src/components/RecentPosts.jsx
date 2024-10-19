import { Link } from "react-router-dom";

export default ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h4 className="fst-italic">Most Commented Posts</h4>
      <ul className="list-unstyled">
        {articles.map((article) => (
          <li key={article.article_id}>
            <Link
              to={`/articles/${article.article_id}`}
              className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"
            >
              <img
                className="recent-article-img"
                width="100%"
                height="96"
                src={article.article_img_url}
                alt="Article picture"
              />
              <div className="col-lg-8">
                <h6 className="mb-0">{article.title}</h6>
                <small className="text-body-secondary">
                  {article.created_at.slice(0, 10)}
                </small>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
