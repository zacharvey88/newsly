import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/User";

export default () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const [articleImgUrl, setArticleImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [topics, setTopics] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("https://nc-news-ngma.onrender.com/api/topics")
      .then((response) => {
        setTopics(response.data.topics);
      })
      .catch((error) => {
        setErrorMessage("Error fetching topics.");
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const articleData = {
      title,
      author: user.username,
      body,
      topic,
      article_img_url: articleImgUrl ? articleImgUrl : null,
    };

    axios
      .post("https://nc-news-ngma.onrender.com/api/articles", articleData)
      .then((response) => {
        setLoading(false);
        setSuccessMessage("Article posted successfully!");
        setTitle("");
        setBody("");
        setTopic("");
        setArticleImgUrl("");
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage("Error posting article. Please try again.");
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center p-4"
      style={{ height: "100vh" }}
    >
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm"
        style={{ width: "100%", maxWidth: "600px" }} 
      >
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Body:</label>
          <textarea
            className="form-control"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            style={{ minHeight: "250px" }} 
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Topic:</label>
          <select
            className="form-control form-control-sm"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          >
            <option value="">Select a topic</option>
            {topics.map((topicItem) => (
              <option key={topicItem.slug} value={topicItem.slug}>
                {topicItem.slug.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Article Image URL (optional):</label>
          <input
            type="url"
            className="form-control form-control-sm"
            value={articleImgUrl}
            onChange={(e) => setArticleImgUrl(e.target.value)}
          />
        </div>

        <div className="text-center">
          <input
            type="submit"
            className="btn btn-sm btn-outline-secondary w-auto" 
            value="Submit Article"
            disabled={loading}
          />
        </div>

        {successMessage && <p className="text-success mt-3">{successMessage}</p>}
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
      </form>
    </div>
  );
};
