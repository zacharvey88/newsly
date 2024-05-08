import { Link } from "react-router-dom";

export default ({ article }) => {

  if (!article) {
    return <h3>Loading...</h3>
  }

  return (
    <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-featured-article" style={{backgroundImage: `url(${article.article_img_url})`}}>
      <div className="col-lg-6 px-0">
        <h1 className="display-4">{article.title}</h1>
        <p className="lead my-3">{article.body.split(".").slice(0,2).join(".")}</p>
        <p className="lead mb-0"><Link to={`/articles/${article.article_id}`} className="text-body-emphasis fw-bold">Continue reading...</Link></p>
      </div>
    </div>
  );
};
