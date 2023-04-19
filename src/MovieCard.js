import "./styles.css";
import "./movieCard.css";
import { Link } from "react-router-dom";
import ProgressiveImage from "./ProgressiveImage";
import imageURL from "./imageURL";
export default function MovieCard({ props, genres }) {
  console.log("props at " + props.title);
  console.log(props);
  const averageExists = props.vote_average !== undefined;
  const genreExists = props.genre_ids !== undefined;
  const avg = averageExists ?
    props.vote_average.toFixed(2) - props.vote_average.toFixed(1) === 0
      ? props.vote_average.toFixed(1)
      : props.vote_average.toFixed(2) : "";
  let genreElements = []
  if (genreExists)
    genreElements = props.genre_ids.map((item) => {
      if (genres[item] !== undefined)
        return (
          <div className="genre-box">
            <p>{genres[item]}</p>
          </div>
        );
    });
  const fullImage = props.poster_path === undefined || props.poster_path === null ? "./default_movie_picture.png" :
    imageURL(props.poster_path, 780);
  const blurredImage = props.poster_path === undefined || props.poster_path === null ? "./default_movie_picture.png" :
    imageURL(props.poster_path, 200);
  return (
    <div className="container">
      <div className="image-container">
        <ProgressiveImage class_name="image" fullImg={fullImage} blurredImg={blurredImage} />

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
        <div className="title-container">
          <h4>
            <Link className="link" to={"/movies/" + props.id}>
              {props.title === null || props.title === undefined ? "No title available." : props.title}{" "}
            </Link>
          </h4>
        </div>
        <div className="genre-information">{genreElements}</div>
      </div>
    </div>
  );
}
