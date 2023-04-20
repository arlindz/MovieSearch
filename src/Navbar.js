import "./navbar.css";
import { useRef } from "react";
import Genres from "./Genres";
export default function Navbar({ genres }) {
  const query = useRef();
  function handleClick() {
    const q =
      query.current.value.length === 0 ? "" : "&query=" + query.current.value;
    const url = new URL(window.location.href);
    const search = url.searchParams;
    search.set("priority", "baseSearch");
    search.set("page", "1");
    search.set("query", q);
    search.delete("genres");
    url.search = search.toString();
    window.location.href = url.href;
  }
  function handleChange(e) {
    const option = e.target.value;
    e.target.value = e.target.value + "P";
    const url = new URL(window.location.href);
    const search = url.searchParams;
    search.set("priority", option);
    search.set("page", "1");
    search.delete("query");
    search.delete("genres");
    url.search = search.toString();
    window.location.href = url.href;
  }
  return (
    <div className="top-container">
      <div className="top-left-container">
        <div className="search-container">
          <input
            class="search-bar"
            ref={query}
            placeholder="Search"
            type="text"
          />
          <div onClick={handleClick} className="search-button">
            <img
              class="search-image"
              src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-21.png"
              alt=""
            />
          </div>
        </div>
        <div className="filter-container">
          <p>Get</p>
          <select onChange={handleChange} className="filter">
            <option class="hide" value="mostPopularP">
              most popular
            </option>
            <option value="mostPopular">Most popular</option>
            <option value="topRated">Top rated</option>
            <option value="trending">Trending</option>

            <option class="hide" value="topRatedP">
              top rated
            </option>
            <option class="hide" value="trendingP">
              trending
            </option>
          </select>
        </div>
      </div>
      <div className="genres">
        <Genres genres={genres} /></div>
    </div>
  );
}
