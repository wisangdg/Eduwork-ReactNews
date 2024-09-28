export default function Search({ query, setQuery }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="search for news here"
        aria-label="Search for news"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        display={query === "lastestnews" ? "none" : "block"}
      />
    </div>
  );
}
