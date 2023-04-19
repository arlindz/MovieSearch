import "./styles.css";
import { useState } from "react";
import Loading from "./Loading";
import MovieCard from "./MovieCard";
export default function MainContainer({ props }) {

  const data = props.results.map((item) => (
    <MovieCard props={item} genres={props.genreIds} />
  ));
  return (<div className="main-container">{data}</div>);
}
