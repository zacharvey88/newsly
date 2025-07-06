import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 

export default function ArticleForm({
  initialData = {},
  onSubmit,
  isEditMode = false,
  contentType = "article",
  isSubmitting = false,
}) {
  const [title, setTitle] = useState(initialData.title || "");
  const [body, setBody] = useState(initialData.body || "");
  const [topic, setTopic] = useState(initialData.topic || "");
  const [articleImgUrl, setArticleImgUrl] = useState(initialData.article_img_url || initialData.articleImgUrl || "");
  const [topics, setTopics] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (contentType === "article") {
      axios
        .get("https://newsly-piuq.onrender.com/api/topics")
        .then((response) => setTopics(response.data.topics))
        .catch(() => console.error("Error fetching topics."));
    }
  }, [contentType]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      return;
    }

    const cleanedBody = body.replace(/<p><br><\/p>/g, "").replace(/<p>\s*<\/p>/g, "");

    const formData = {
      title: contentType === "article" ? title : undefined,
      author: user.username,
      body: cleanedBody,
      topic: contentType === "article" ? topic : undefined,
      article_img_url: contentType === "article" ? (articleImgUrl || null) : undefined,
    };

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="border p-4 rounded shadow-sm" style={{ width: "100%", maxWidth: "600px" }}>
      {contentType === "article" && (
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Body:</label>
        <ReactQuill
          theme="snow"
          value={body}
          onChange={setBody}
          className="quill-editor"
          readOnly={isSubmitting}
        />
      </div>

      {contentType === "article" && (
        <>
          <div className="mb-3">
            <label className="form-label">Topic:</label>
            <select
              className="form-control form-control-sm"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              disabled={isSubmitting}
            >
              <option value="">Select a topic</option>
              {topics.map((topicItem) => (
                <option key={topicItem.slug} value={topicItem.slug}>
                  {`${topicItem.slug.charAt(0).toUpperCase()}${topicItem.slug.slice(1)}`}
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
              disabled={isSubmitting}
            />
          </div>
        </>
      )}

      <div>
        <button type="submit" className="btn btn-sm btn-outline-secondary w-auto" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : (isEditMode ? "Save Changes" : "Submit Article")}
        </button>
      </div>
    </form>
  );
}
