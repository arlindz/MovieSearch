import "./styles.css";
import "./movieCard.css";
import { Link } from "react-router-dom";
import ProgressiveImage from "./ProgressiveImage";
import imageURL from "./imageURL";
import { useState } from "react";
export default function MovieCard({ props, genres }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const averageExists = props.vote_average !== undefined;
  const genreExists = props.genre_ids !== undefined;
  const avg = averageExists ?
    props.vote_average.toFixed(2) - props.vote_average.toFixed(1) === 0
      ? props.vote_average.toFixed(1)
      : props.vote_average.toFixed(2) : "";
  let genreElements = []
  function selectGenre(id) {
    console.log(id);
    console.log("...");
    const url = new URL(window.location.href);
    const search = url.searchParams;
    search.set("priority", "discover");
    search.set("page", "1");
    search.set("genres", Number(id));
    url.search = search.toString();
    window.location.href = url.href;
  }
  if (genreExists)
    genreElements = props.genre_ids.map((item) => {
      if (genres[item] !== undefined)
        return (
          <div onClick={() => {
            selectGenre(item);
          }} name="name" className="genre-box">
            <p>{genres[item]}</p>
          </div>
        );
    });
  function setImage() {
    console.log("image loaded");
    setImageLoaded(true);
  }
  const fullImage = props.poster_path === undefined || props.poster_path === null ? "./default_movie_picture.png" :
    imageURL(props.poster_path, 1280);
  const blurredImage = props.poster_path === undefined || props.poster_path === null ? "./default_movie_picture.png" :
    imageURL(props.poster_path, 200);
  return (
    <div className="container">
      <div style={imageLoaded ? {} : { height: "300px" }} className="image-container">
        <ProgressiveImage setImage={setImage} fullImg={fullImage} blurredImg={blurredImage} class_name="image" />
        {averageExists && <div className="rating">
          <p>
            {avg}/10({props.vote_count})
          </p>
        </div>}
        {props.release_date !== undefined && <div id="right" className="rating">
          <p>{props.release_date}</p>
        </div>}
      </div>
      <div className="information-container">
        <Link className="title-container" to={"/movies/" + props.id}>
          <h4>
            {props.title === null || props.title === undefined ? "No title available." : props.title}{" "}
          </h4>
          <div className="title-box title-box-1">
          </div>
          <div className="title-box title-box-2">
          </div>
        </Link>
        <div className="genre-information">{genreElements}</div>
      </div>
    </div>
  );
}
