import "./pugination.css";
import Pugination from "./Pugination.js";
import { useRef } from "react";
export default function PuginationContainer({ pages, setUrl, maxPages }) {
  const sortedKeys = Object.keys(pages).sort((a, b) => {
    return pages[a] - pages[b];
  });
  const puginations = [];
  for (const key of sortedKeys) {
    if (key > 0 && key <= maxPages) {
      if (!(key - 1 in pages))
        puginations.push(
          <p style={{ marginLeft: "5px", marginRight: "5px" }}> ..... </p>
        );
      puginations.push(<Pugination page={key} setUrl={setUrl} />);
    }
  }
  const index = useRef();

  function handleClick() {
    console.log(index.current.value);
    if (index.current.value < 1 || index.current.value > maxPages) return;
    const url = new URL(window.location.href);
    const search = url.searchParams;
    search.set("page", index.current.value);
    url.search = search;
    window.location.href = url.href;
  }
  return (
    <div className="bottom-container">
      <div className="pugination-container">{puginations}</div>
      <div className="search-index-container">
        <input ref={index} type="number" class="search-index" />
        <div
          style={{ transform: "translateX(80%)" }}
          onClick={handleClick}
          className="search-button"
        >
          <img
            class="search-image"
            src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-21.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
