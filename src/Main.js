import "./styles.css";
import { useState, useEffect } from "react";
import MainContainer from "./MainContainer.js";
import Navbar from "./Navbar";
import DefaultURLs from "./DefaultURLs";
import PuginationContainer from "./PuginationContainer";
import initialize from "./initializeURL";
export default function Main() {
  initialize();
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  const page = searchParams.get("page");
  const priority = searchParams.get("priority");
  const genreIds = searchParams.get("genres");
  const [data, setData] = useState({ total_pages: 0, results: [], genreIds: {} });
  const [maxPages, setMaxPages] = useState(data.total_pages);
  const puginations = { 0: null, 1: null, 2: null, 3: null };

  puginations[maxPages] = null;

  puginations[maxPages - 1] = null;

  puginations[maxPages - 2] = null;

  puginations[Number(page)] = null;

  puginations[Number(Number(page) + 1)] = null;

  puginations[Number(page) - 1] = null;

  const u = new URL(DefaultURLs[priority]);
  const sP = u.searchParams;
  sP.set("page", page);
  if (searchParams.get("query") !== null)
    sP.set("query", searchParams.get("query"));
  if (genreIds)
    sP.set("with_genres", genreIds);
  console.log("genreIds length is " + genreIds.length)
  u.search = sP.toString();
  const currentUrl = u.href;
  console.log("currentURL is");
  console.log(currentUrl);
  const movieGenres =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=00e98fcc934090f14015fd76e2cf801b";
  const tvGenres = "https://api.themoviedb.org/3/genre/tv/list?api_key=00e98fcc934090f14015fd76e2cf801b&language=en-US";
  async function getData(url) {
    try {
      const moviesResponse = await fetch(url);
      const moviesJson = await moviesResponse.json();
      const genreResponse = await fetch(movieGenres);
      const genreJson = await genreResponse.json();
      const tvGenreResponse = await fetch(tvGenres);
      const tvGenreJson = await tvGenreResponse.json();
      const obj = {};
      for (const genre of genreJson.genres)
        obj[genre.id] = genre.name == "Science Fiction" ? "Sci-Fi" : genre.name;
      for (const genre of tvGenreJson.genres)
        obj[genre.id] = genre.name == "Science Fiction" ? "Sci-Fi" : genre.name;
      moviesJson["genreIds"] = obj;
      return moviesJson;
    } catch (error) {
      console.log(error);
    }
  }

  async function setComponents(url) {
    const data = await getData(url);
    setData(data);
    setMaxPages(Math.min(data.total_pages, 500));
  }
  useEffect(() => {
    setComponents(currentUrl);
  }, []);
  return (
    <div className="App">
      <div className="container-all">
        <Navbar genres={data.genreIds} />
        <MainContainer props={data} />
        <PuginationContainer
          currentUrl={currentUrl}
          pages={puginations}
          maxPages={maxPages}
        />
      </div>
    </div>
  );
}
