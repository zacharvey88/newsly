import { Link } from "react-router-dom";

export default function ArticlesList({ articles }) {
  if (!articles) {
    return <h3>Loading...</h3>;
  }

  return (
    <ul className="row mb-2 featured-articles">
      {articles.map((article, index) => (
        <li key={index} className="col-md-6 featured-articles-item">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">
                {article.topic}
              </strong>
              <h3 className="mb-0">
                {article.title.length > 45
                  ? `${article.title.slice(0, 45)}...`
                  : article.title}
              </h3>
              <div className="mb-1 text-body-secondary">
                {article.created_at.slice(0, 10)}
              </div>
              <p className="card-text mb-auto">{article.body.slice(0, 80)}</p>
              <Link
                to={`/articles/${article.article_id}`}
                className="icon-link gap-1 icon-link-hover stretched-link"
              >
                Continue reading
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <div className="featured-article-img-container">
                <img
                  className="featured-article-img"
                  src={article.article_img_url}
                  alt="Article picture"
                />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
