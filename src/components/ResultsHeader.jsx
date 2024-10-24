import ToggleButton from "../utilities/ToggleButton";

export default ({ articles, sortBy, setSortBy, toggled, setToggled, searchTerm }) => {
  return (
    <div className="results-header">
      Showing {articles.length} of {articles.length} results
      {searchTerm && ` for '${searchTerm}'`}
      <div className="results-header-sorting">
        <p className="toggle-text">{toggled ? "ASC" : "DESC"}</p>
        <ToggleButton toggled={toggled} setToggled={setToggled} />
        <select
          className="dropdown-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option className="dropdown-item" value="" disabled>
            Sort Articles
          </option>
          <option className="dropdown-item" value="created_at">
            Date
          </option>
          <option className="dropdown-item" value="votes">
            Likes
          </option>
          <option className="dropdown-item" value="comment_count">
            Comments
          </option>
        </select>
      </div>
    </div>
  );
};
