import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

// eslint-disable-next-line react/prop-types
const NewsBoard = ({category}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY; // Get API key
    if (!apiKey) {
      setError("API key is missing. Please check your environment configuration.");
      setLoading(false);
      return;
    }

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [category]);

  return (
    <div>
      <h2 className="text-center" style={{marginTop:"20px"}}>
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      {!loading && !error && articles.length === 0 && (
        <p className="text-center">No articles available at the moment.</p>
      )}
      <div className="d-flex flex-wrap justify-content-center">
        {articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsBoard;
