import PropTypes from "prop-types";
import image from '../assets/news.jpg';

const NewsItem = ({ title, description, src, url }) => {
  return (
    <div 
      className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" 
      style={{ maxWidth: "345px", margin: "10px auto" }}
    >
      <img 
        src={src?src:image} 
        className="card-img-top" 
        alt={title || "News Image"} 
        style={{ objectFit: "cover", height: "200px", width: "100%" }}
      />
      <div className="card-body">
        <h5 className="card-title">{title ? title.slice(0, 50) : "This Title not Available"}</h5>
        <p className="card-text">
          {description ? description.slice(0, 90) : "This description not available"}
        </p>
        <a 
          href={url || "#"} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary"
          aria-label={`Read more about ${title || "this news"}`}
        >
          Read More
        </a>
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  src: PropTypes.string,
  url: PropTypes.string,
};

export default NewsItem;
