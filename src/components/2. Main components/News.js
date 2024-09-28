const defaultImageUrl = "default_image_url";

export default function News({ news }) {
  console.log("News component rendered with news:", news);
  return (
    <div className="news-container">
      {news.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
}

function NewsCard({ article }) {
  return (
    <div className="news-card">
      <img
        src={article.thumbnail || defaultImageUrl}
        alt={article.snippet || "News Image"}
        className="card-img-top"
      />
      <h2>{article.title}</h2>
      <p>{article.snippet}</p>
      <a href={article.link} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
}
