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
    <div className="article-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Body:
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </label>
        <label>
          Topic:
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          >
            <option value="">Select a topic</option>
            {topics.map((topicItem) => (
              <option key={topicItem.slug} value={topicItem.slug}>
                {topicItem.slug}
              </option>
            ))}
          </select>
        </label>
        <label>
          Article Image URL (optional):
          <input
            type="url"
            value={articleImgUrl}
            onChange={(e) => setArticleImgUrl(e.target.value)}
          />
        </label>
        <input
          type="submit"
          className={"btn btn-sm btn-outline-secondary"}
          value="Submit Article"
          disabled={loading}
        ></input>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};
