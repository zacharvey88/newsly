import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

export default ({ articles }) => {
  if (!articles) {
    return <h3>Loading...</h3>;
  }

  const getLimitedContent = (body) => {
    const cleanBody = DOMPurify.sanitize(body, { ALLOWED_TAGS: [] });
    const sentences = cleanBody.split(/(?<=\.)\s+/); 
    let limitedContent = "";
    let totalLength = 0;

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];
      if (totalLength + sentence.length > 500) {
        break; 
      }
      limitedContent += sentence + " ";
      totalLength += sentence.length;
    }

    return limitedContent.trim();
  };

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
                __html: DOMPurify.sanitize(getLimitedContent(article.body)),
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
