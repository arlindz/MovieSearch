import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./movie.css";
import ProgressiveImage from "./ProgressiveImage";
import imageURL from "./imageURL";
export default function Movie() {
  const [loaded, setLoaded] = useState(document.images.length === 0);
  useEffect(() => {
    const images = Array.from(document.images);
    let loadedImages = 0;

    console.log("images length" + images.length);
    const handleImageLoad = () => {
      loadedImages++;
      console.log("loaded images: " + loadedImages);
      if (loadedImages === images.length) {
        setLoaded(true);
      }
    };
    if (images.length === 0) setLoaded(true);
    images.forEach((image) => {
      if (image.complete) {
        handleImageLoad();
      } else {
        image.addEventListener('load', handleImageLoad);
      }
    });

    return () => {
      images.forEach((image) => {
        image.removeEventListener('load', handleImageLoad);
      });
    };
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const [data, setData] = useState({
    movieDetails: {},
    reviews: {},
    reccomend: {},
    genres: {}
  });
  const [clicked, setClicked] = useState(false);
  const styles = [
    { transform: clicked ? "rotate(0deg)" : "rotate(180deg)" },
    { "max-height": clicked ? "50%" : "0%" },
    {
      transition: clicked ? "all ease-in-out 1.2s" : "all 0.1s ease-in-out",
      opacity: clicked ? "1" : "0"
    }
  ];

  const [image, setImage] = useState("");
  const [reviewIndex, setReviewIndex] = useState(0);
  const genresURL =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=00e98fcc934090f14015fd76e2cf801b";
  const movieURL =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "?api_key=00e98fcc934090f14015fd76e2cf801b&language=en-US";
  const reviewsURL =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/reviews?api_key=00e98fcc934090f14015fd76e2cf801b&language=en-US";
  const reccomendURL =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/recommendations?api_key=00e98fcc934090f14015fd76e2cf801b&language=en-US&page=1";
  useEffect(() => {
    setComponents();
  }, []);

  function next() {
    if (data.reviews.results === undefined) return;
    setReviewIndex((prev) => {
      if (prev === data.reviews.results.length - 1) return 0;
      return prev + 1;
    });
  }
  function previous() {
    if (data.reviews.results === undefined) return;
    setReviewIndex((prev) => {
      if (prev === 0) return data.reviews.results.length - 1;
      return prev - 1;
    });
  }
  async function setComponents() {
    const movieRes = await fetch(movieURL);
    const movieJson = await movieRes.json();
    const reviewRes = await fetch(reviewsURL);
    const reviewJson = await reviewRes.json();
    const reccomendRes = await fetch(reccomendURL);
    const reccomendJson = await reccomendRes.json();
    const genresRes = await fetch(genresURL);
    const genresJson = await genresRes.json();
    const obj = {};
    for (const genre of genresJson.genres)
      obj[genre.id] = genre.name == "Science Fiction" ? "Sci-Fi" : genre.name;
    setData({
      movieDetails: movieJson,
      reviews: reviewJson,
      reccomend: reccomendJson,
      genres: obj
    });
    setImage(
      "https://image.tmdb.org/t/p/w1280/" +
      movieJson.poster_path +
      "?api_key=00e98fcc934090f14015fd76e2cf801b"
    );
  }

  function displayDescription() {
    setClicked((prev) => !prev);
  }
  const reviews = data.reviews.results;
  const reviewsExist =
    reviews === undefined ? false : reviews.length === 0 ? false : true;
  const recommendExists =
    data.reccomend.results === undefined
      ? false
      : data.reccomend.results.length === 0
        ? false
        : true;
  return (
    <div className="movie-all-container">
      <img src={image} className="movie-background-image" alt="" />
      <div style={styles[1]} className="movie-description-container">
        <p style={styles[2]} className="top-movie-description">
          {data.movieDetails.overview}
        </p>
      </div>
      <div onClick={displayDescription} className="movie-top-container">
        <h2>{data.movieDetails.title}</h2>
        <div className="movie-arrow-container">
          <p style={styles[0]} className="movie-arrow">
            ^
          </p>
        </div>
        <img src={image} className="movie-top-container-image" alt="" />
        <div className="movie-runtime">
          <p>{data.movieDetails.runtime} minutes</p>
        </div>
      </div>
      <div className="movie-main-container">
        {reviewsExist && (
          <div className="movie-review-container">
            <div className="movie-review-top-container">
              <h3>
                {reviews === undefined ? "" : reviews[reviewIndex].author}
              </h3>
              <h4>
                {reviews === undefined
                  ? ""
                  : reviews[reviewIndex].author_details.rating === null
                    ? "No rating"
                    : reviews[reviewIndex].author_details.rating + "/10"}
              </h4>
            </div>
            <div className="movie-review-content-container">
              <p className="movie-review-content">
                {reviews === undefined
                  ? ""
                  : reviews[reviewIndex].content.length < 220
                    ? reviews[reviewIndex].content
                    : reviews[reviewIndex].content.substring(0, 220) + "..."}
              </p>
            </div>
            <div className="review-buttons-container">
              <div onClick={previous} className="review-button">
                &lt;
              </div>
              <div onClick={next} className="review-button">
                &gt;
              </div>
            </div>
          </div>
        )}
        {recommendExists ? (
          <div className="movie-recommendations-container">
            <h3>You may also like</h3>
            <div className="movie-recommendations">
              {recommendExists &&
                data.reccomend.results.map((item) => {
                  return (
                    <a href={"/movies/" + item.id}>
                      <div className="movie-recommendation">
                        <ProgressiveImage class_name={"movie-recommendation-image"} fullImg={imageURL(item.poster_path, 500)} blurredImg={imageURL(item.poster_path, 200)} />

                        <div className="darkener">
                          {" "}
                          <p className="movie-recommendation-title">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                })}
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ marginTop: "10%" }}>No recommendations...</h2>
          </div>
        )}
      </div>
    </div>
  );
}