import "./styles.css";
import "./movieCard.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export default function MovieCard({ props, genres }) {
  const avg =
    props.vote_average.toFixed(2) - props.vote_average.toFixed(1) === 0
      ? props.vote_average.toFixed(1)
      : props.vote_average.toFixed(2);
  const genreElements = props.genre_ids.map((item) => {
    return (
      <div className="genre-box">
        <p>{genres[item]}</p>
      </div>
    );
  });
  const image =
    "https://image.tmdb.org/t/p/w500/" +
    props.poster_path +
    "?api_key=00e98fcc934090f14015fd76e2cf801b";
  return (
    <div className="container">
      <div className="image-container">
        <img className="image" src={image} alt="arlind" />
        <div className="rating">
          <p>
            {avg}/10({props.vote_count})
          </p>
        </div>
        <div id="right" className="rating">
          <p>{props.release_date}</p>
        </div>
      </div>
      <div className="information-container">
        <div className="title-container">
          <h4>
            <Link className="link" to={"/movies/" + props.id}>
              {props.title}{" "}
            </Link>
          </h4>
        </div>
        <div className="genre-information">{genreElements}</div>
      </div>
    </div>
  );
}
